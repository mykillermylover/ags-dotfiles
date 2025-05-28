import { Variable } from 'astal';

interface Config {
  idleInhibit: Variable<boolean>;
}

export class ConfigService {
  static #instance: ConfigService;
  public static get instance() {
    this.init();
    return this.#instance;
  }

  public static init() {
    if (!this.#instance) {
      this.#instance = new ConfigService();
    }
  }

  readonly #config: Config;

  constructor() {
    this.#config = {
      idleInhibit: Variable(true),
    };
  }

  get(): Config;
  get<T extends keyof Config>(key: T): Config[T];
  get<T extends keyof Config>(key?: T): Config | Config[T] {
    if (!key) {
      return this.#config;
    }

    return this.#config[key];
  }
}
