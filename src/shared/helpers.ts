import { Astal } from 'astal/gtk3';

type PRIMARY_BUTTON = Astal.MouseButton.PRIMARY;
const PRIMARY_BUTTON = Astal.MouseButton.PRIMARY;

type SECONDARY_BUTTON = Astal.MouseButton.SECONDARY;
const SECONDARY_BUTTON = Astal.MouseButton.SECONDARY;

type MIDDLE_BUTTON = Astal.MouseButton.MIDDLE;
const MIDDLE_BUTTON = Astal.MouseButton.MIDDLE;

// eslint-disable-next-line prettier/prettier
export function isLeftClick(button: Astal.MouseButton): button is PRIMARY_BUTTON;
export function isLeftClick(event: Astal.ClickEvent): boolean;
export function isLeftClick(
  eventOrButton: Astal.ClickEvent | Astal.MouseButton,
) {
  if (eventOrButton instanceof Astal.ClickEvent) {
    return eventOrButton.button === PRIMARY_BUTTON;
  }
  return eventOrButton === PRIMARY_BUTTON;
}

export function isRightClick(
  button: Astal.MouseButton,
): button is SECONDARY_BUTTON;
export function isRightClick(event: Astal.ClickEvent): boolean;
export function isRightClick(
  eventOrButton: Astal.ClickEvent | Astal.MouseButton,
) {
  if (eventOrButton instanceof Astal.ClickEvent) {
    return eventOrButton.button === SECONDARY_BUTTON;
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
