import { openPopup } from '@shared/utils';
import { getPlayerIcon } from '@windows/bar/popups/mediaplayer/player-widget/helpers';
import { Binding } from 'astal';
import Mpris from 'gi://AstalMpris';

interface MediaButtonProps {
  player: Mpris.Player;
  tooltip?: Binding<string>;
}

export function MediaButton({ player, tooltip }: MediaButtonProps) {
  return (
    <button
      cursor="pointer"
      className="txt-icon module-item"
      onClick={(self) => openPopup(self, 'mediaplayer')}
      tooltipText={tooltip}
      label={getPlayerIcon(player)}
    />
  );
}
