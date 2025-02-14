import { getFirstPlayingPlayer } from '@bar/components/mediaplayer/helpers';
import { mprisService } from '@shared/globals';
import { bind, GObject, property, register } from 'astal';
import Mpris from 'gi://AstalMpris';
const { PLAYING } = Mpris.PlaybackStatus;

@register({ GTypeName: 'MediaPlayerService' })
export default class MediaPlayerService extends GObject.Object {
  static instance: MediaPlayerService;

  static get_default() {
    if (!this.instance) {
      this.instance = new MediaPlayerService();
    }

    return this.instance;
  }

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

  get isCurrentPlaying() {
    return this.#current?.playback_status === PLAYING;
  }

  private readonly playerSubs = new Map<string, () => void>();

  constructor() {
    super();

    this.#players = mprisService.players;
    this.notify('players');

    this.setCurrentPlayer();

    for (const player of this.players) {
      const playerBind = bind(player, 'metadata').as(() => player);

      this.playerSubs.set(
        playerBind.get().busName,
        playerBind.subscribe(this.playerChanged),
      );
    }

    mprisService.connect('player-added', this.addPlayer);
    mprisService.connect('player-closed', this.deletePlayer);
  }

  private haveOtherPlayingPlayers(player: Mpris.Player) {
    return this.#players.some(
      (otherPlayer) =>
        otherPlayer.playback_status === PLAYING &&
        otherPlayer.busName !== player.busName,
    );
  }

  private isLastPausedPlayer(player: Mpris.Player) {
    return (
      player.playback_status !== PLAYING &&
      !this.haveOtherPlayingPlayers(player)
    );
  }

  private readonly playerChanged = (player: Mpris.Player) => {
    if (this.isLastPausedPlayer(player) || this.isCurrentPlaying) {
      return;
    }

    this.setCurrentPlayer();
  };

  private readonly setCurrentPlayer = (deletingCurrent = false) => {
    this.#current = getFirstPlayingPlayer(
      this.#players,
      deletingCurrent ? undefined : this.#current,
    );
    this.notify('current');
  };

  private readonly addPlayer = (_: unknown, player: Mpris.Player) => {
    const newBind = bind(player, 'metadata').as(() => player);

    this.playerSubs.set(player.busName, newBind.subscribe(this.playerChanged));

    this.#players.unshift(player);
    this.notify('players');

    this.playerChanged(player);
  };

  private readonly deletePlayer = (_: unknown, player: Mpris.Player) => {
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
}
