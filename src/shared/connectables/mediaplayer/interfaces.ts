export type PlayerAction = 'play-pause' | 'previous' | 'next';
export type MediaPlayer = Record<PlayerAction, () => void>;
