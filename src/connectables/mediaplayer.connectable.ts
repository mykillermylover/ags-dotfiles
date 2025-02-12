import { getFirstPlayingPlayer } from '@bar/modules/left/player/helpers';
import { bind, Binding, GObject, property, register } from 'astal';
import Mpris from 'gi://AstalMpris';

const mpris = Mpris.get_default();

@register({ GTypeName: 'MediaPlayerService' })
export default class MediaPlayerService extends GObject.Object {
  #current: Mpris.Player | undefined;

  @property(Mpris.Player)
  get current() {
    return this.#current;
  }

  readonly #players: Mpris.Player[];

  @property()
  get players() {
    return this.#players;
  }

  private readonly playerBinds: Binding<Mpris.Player>[];

  private readonly playerSubs = new Map<string, () => void>();

  constructor() {
    super();

    this.#players = mpris.players;
    this.notify('players');
    this.setCurrentPlayer();
    this.notify('current');

    this.playerBinds = this.#players.map((player) =>
      bind(player, 'metadata').as(() => player),
    );

    for (const playerBind of this.playerBinds) {
      this.playerSubs.set(
        playerBind.get().busName,
        playerBind.subscribe(this.playerChanged),
      );
    }

    mpris.connect('player-added', this.addPlayer);
    mpris.connect('player-closed', this.deletePlayer);
  }

  private readonly playerChanged = (player: Mpris.Player) => {
    if (player.busName === this.#current?.busName) return;

    this.setCurrentPlayer();
  };

  private readonly setCurrentPlayer = (deletingCurrent = false) => {
    if (this.#players.length === 0) {
      this.#current = undefined;
      this.notify('current');
      return;
    }

    this.#current = getFirstPlayingPlayer(
      this.#players,
      deletingCurrent ? undefined : this.#current,
    );
    this.notify('current');
  };

  private readonly addPlayer = (_: unknown, player: Mpris.Player) => {
    const newBind = bind(player, 'metadata').as(() => player);
    this.playerBinds.push(newBind);

    this.playerSubs.set(player.busName, newBind.subscribe(this.playerChanged));

    this.#players.unshift(player);
    this.notify('players');

    this.setCurrentPlayer();
  };

  private readonly deletePlayer = (_: unknown, player: Mpris.Player) => {
    this.playerBinds.splice(
      this.playerBinds.findIndex(
        (item) => item.get().busName === player.busName,
      ),
      1,
    );

    const unsub = this.playerSubs.get(player.busName);

    if (!unsub) return;

    unsub();

    this.playerSubs.delete(player.busName);

    this.#players.splice(
      this.#players.findIndex((item) => item.busName === player.busName),
      1,
    );

    this.notify('players');
    this.setCurrentPlayer(player.busName === this.#current?.busName);
  };

  static instance: MediaPlayerService;

  static get_default() {
    if (!this.instance) {
      this.instance = new MediaPlayerService();
    }

    return this.instance;
  }
}
