import { Astal, Gdk } from 'astal/gtk3';

const { UP, DOWN } = Gdk.ScrollDirection;

type PRIMARY_BUTTON = Astal.MouseButton.PRIMARY;
const PRIMARY_BUTTON = Astal.MouseButton.PRIMARY;

type SECONDARY_BUTTON = Astal.MouseButton.SECONDARY;
const SECONDARY_BUTTON = Astal.MouseButton.SECONDARY;

type MIDDLE_BUTTON = Astal.MouseButton.MIDDLE;
const MIDDLE_BUTTON = Astal.MouseButton.MIDDLE;

// eslint-disable-next-line prettier/prettier
export function isLeftClick(button: Astal.MouseButton): button is PRIMARY_BUTTON;
export function isLeftClick(event: Gdk.Event | Astal.ClickEvent): boolean;
export function isLeftClick(
  eventOrButton: Gdk.Event | Astal.ClickEvent | Astal.MouseButton,
) {
  if (eventOrButton instanceof Astal.ClickEvent) {
    return eventOrButton.button === PRIMARY_BUTTON;
  } else if (eventOrButton instanceof Gdk.Event) {
    return eventOrButton.get_button()[1] === PRIMARY_BUTTON;
  }
  return eventOrButton === PRIMARY_BUTTON;
}

export function isRightClick(
  button: Astal.MouseButton,
): button is SECONDARY_BUTTON;
export function isRightClick(event: Gdk.Event | Astal.ClickEvent): boolean;
export function isRightClick(
  eventOrButton: Gdk.Event | Astal.ClickEvent | Astal.MouseButton,
) {
  if (eventOrButton instanceof Astal.ClickEvent) {
    return eventOrButton.button === SECONDARY_BUTTON;
  } else if (eventOrButton instanceof Gdk.Event) {
    return eventOrButton.get_button()[1] === SECONDARY_BUTTON;
  }
  return eventOrButton === SECONDARY_BUTTON;
}

export function isMiddleClick(
  button: Astal.MouseButton,
): button is MIDDLE_BUTTON;
export function isMiddleClick(event: Astal.ClickEvent): boolean;
export function isMiddleClick(
  eventOrButton: Astal.ClickEvent | Astal.MouseButton,
) {
  if (eventOrButton instanceof Astal.ClickEvent) {
    return eventOrButton.button === MIDDLE_BUTTON;
  }
  return eventOrButton === MIDDLE_BUTTON;
}

export function getScrollDirection(
  event: Gdk.Event | Astal.ScrollEvent,
): Gdk.ScrollDirection {
  let direction: Gdk.ScrollDirection;
  let deltaY: number;

  if (event instanceof Astal.ScrollEvent) {
    // astal scrollEvent provide wrong direction
    deltaY = event.delta_y;
  } else {
    direction = event.get_scroll_direction()[1];
    deltaY = event.get_scroll_deltas()[2];
  }

  // eslint-disable-next-line @typescript-eslint/ban-ts-comment
  // @ts-expect-error
  if (direction) {
    return direction;
  }

  if (deltaY) {
    return deltaY < 0 ? UP : DOWN;
  }

  return DOWN;
}

export function onScroll(
  event: Gdk.Event | Astal.ScrollEvent,
  { onScrollUp, onScrollDown }: OnScrollProps,
) {
  const direction = getScrollDirection(event);

  switch (direction) {
    case UP: {
      if (onScrollUp) {
        onScrollUp();
      }
      break;
    }
    case DOWN: {
      if (onScrollDown) {
        onScrollDown();
      }
      break;
    }
  }
}

interface OnScrollProps {
  onScrollUp?: () => void;
  onScrollDown?: () => void;
}
