const icons = {
  missing: 'image-missing-symbolic',
  app: {
    terminal: 'terminal-symbolic',
  },
  fallback: {
    executable: 'application-x-executable',
    notification: 'dialog-information-symbolic',
    video: 'video-x-generic-symbolic',
    audio: 'audio-x-generic-symbolic',
  },
  ui: {
    close: 'window-close-symbolic',
    colorpicker: 'color-select-symbolic',
    info: 'info-symbolic',
    link: 'external-link-symbolic',
    lock: 'system-lock-screen-symbolic',
    menu: 'open-menu-symbolic',
    refresh: 'view-refresh-symbolic',
    search: 'system-search-symbolic',
    settings: 'emblem-system-symbolic',
    themes: 'preferences-desktop-theme-symbolic',
    tick: 'object-select-symbolic',
    time: 'hourglass-symbolic',
    toolbars: 'toolbars-symbolic',
    warning: 'dialog-warning-symbolic',
    minimize: 'window-minimize-symbolic',
    arrow: {
      pan: {
        right: 'pan-end-symbolic',
        left: 'pan-start-symbolic',
        down: 'pan-down-symbolic',
        up: 'pan-up-symbolic',
      },
      draw: {
        right: 'draw-arrow-forward-symbolic',
        left: 'draw-arrow-back-symbolic',
        down: 'draw-arrow-down-symbolic',
        up: 'draw-arrow-up-symbolic',
      },
    },
  },
  audio: {
    mic: {
      muted: 'microphone-disabled-symbolic',
      low: 'microphone-sensitivity-low-symbolic',
      medium: 'microphone-sensitivity-medium-symbolic',
      high: 'microphone-sensitivity-high-symbolic',
    },
    volume: {
      muted: 'audio-volume-muted-symbolic',
      low: 'audio-volume-low-symbolic',
      medium: 'audio-volume-medium-symbolic',
      high: 'audio-volume-high-symbolic',
      overamplified: 'audio-volume-overamplified-symbolic',
    },
    type: {
      headset: 'audio-headphones-symbolic',
      speaker: 'audio-speakers-symbolic',
      card: 'audio-card-symbolic',
    },
    mixer: 'mixer-symbolic',
  },
  powerprofile: {
    balanced: 'power-profile-balanced-symbolic',
    'power-saver': 'power-profile-power-saver-symbolic',
    performance: 'power-profile-performance-symbolic',
  },
  asusctl: {
    profile: {
      Balanced: 'power-profile-balanced-symbolic',
      Quiet: 'power-profile-power-saver-symbolic',
      Performance: 'power-profile-performance-symbolic',
    },
    mode: {
      Integrated: 'processor-symbolic',
      Hybrid: 'controller-symbolic',
    },
  },
  battery: {
    charging: {
      empty: 'battery-empty-symbolic',
      caution: 'battery-caution-charging-symbolic',
      low: 'battery-low-charging-symbolic',
      good: 'battery-good-charging-symbolic',
      full: 'battery-full-charging-symbolic',
    },
    noCharging: {
      empty: 'battery-empty-symbolic',
      caution: 'battery-caution-symbolic',
      low: 'battery-low-symbolic',
      good: 'battery-good-symbolic',
      full: 'battery-full-symbolic',
    },
  },
  bluetooth: {
    type: {
      mouse: 'input-mouse-symbolic',
      headset: 'audio-headset-symbolic',
      headphones: 'audio-headset-symbolic',
    },
    enabled: 'bluetooth-active-symbolic',
    disabled: 'bluetooth-disabled-symbolic',
  },
  brightness: {
    indicator: 'display-brightness-symbolic',
    keyboard: 'keyboard-brightness-symbolic',
    screen: 'display-brightness-symbolic',
  },
  powermenu: {
    sleep: 'weather-clear-night-symbolic',
    reboot: 'system-reboot-symbolic',
    logout: 'system-log-out-symbolic',
    shutdown: 'system-shutdown-symbolic',
  },
  recorder: {
    recording: 'media-record-symbolic',
  },
  notifications: {
    noisy: 'notification-symbolic',
    silent: 'notification-disabled-symbolic',
    message: 'notification-new-symbolic',
  },
  trash: {
    full: 'user-trash-full-symbolic',
    empty: 'user-trash-symbolic',
  },
  mpris: {
    shuffle: {
      enabled: 'media-playlist-shuffle-symbolic',
      disabled: 'media-playlist-consecutive-symbolic',
    },
    loop: {
      none: 'media-playlist-repeat-symbolic',
      track: 'media-playlist-repeat-song-symbolic',
      playlist: 'media-playlist-repeat-symbolic',
    },
    playing: 'media-playback-pause-symbolic',
    paused: 'media-playback-start-symbolic',
    stopped: 'media-playback-start-symbolic',
    prev: 'media-skip-backward-symbolic',
    next: 'media-skip-forward-symbolic',
  },
  system: {
    cpu: 'org.gnome.SystemMonitor-symbolic',
    ram: 'drive-harddisk-solidstate-symbolic',
    temp: 'temperature-symbolic',
  },
  color: {
    dark: 'dark-mode-symbolic',
    light: 'light-mode-symbolic',
  },
};

export type Icons = typeof icons;
export default icons;
