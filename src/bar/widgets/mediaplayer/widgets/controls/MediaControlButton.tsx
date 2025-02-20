import { ButtonProps } from 'astal/gtk3/widget';

import { songControlsItemClass } from './index';

interface ControlButtonProps {
  child?: JSX.Element | JSX.Element[];
}

export function MediaControlButton({
  child,
  ...props
}: ControlButtonProps & ButtonProps) {
  return (
    <box>
      <button className={songControlsItemClass} cursor="pointer" {...props}>
        {child}
      </button>
    </box>
  );
}
