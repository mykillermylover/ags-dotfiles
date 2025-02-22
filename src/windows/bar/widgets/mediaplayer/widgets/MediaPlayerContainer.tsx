import { Binding } from 'astal';

interface MediaPlayerContainerProps {
  children?: JSX.Element | JSX.Element[];
  coverArt?: Binding<string>;
}
export function MediaPlayerContainer({
  children,
  coverArt,
}: MediaPlayerContainerProps) {
  return (
    <box className="mediaplayer-container">
      <box css={coverArt} className="mediaplayer-cover">
        <box className="mediaplayer-tint">
          <box className="mediaplayer-content" vertical>
            {children}
          </box>
        </box>
      </box>
    </box>
  );
}
