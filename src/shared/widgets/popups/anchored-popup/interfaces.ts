export enum CHILD_POSITION {
  TOP = 'top',
  TOP_CENTER = 'top_center',
  TOP_LEFT = 'top_left',
  TOP_RIGHT = 'top_right',
  BOTTOM = 'bottom',
  BOTTOM_CENTER = 'bottom_center',
  BOTTOM_LEFT = 'bottom_left',
  BOTTOM_RIGHT = 'bottom_right',
}

export interface PopupProps {
  name: string;
  position?: CHILD_POSITION;
}

export interface LayoutProps extends Pick<PopupProps, 'position'> {
  child?: JSX.Element;
}
