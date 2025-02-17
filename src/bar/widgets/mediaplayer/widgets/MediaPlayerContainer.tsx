import { BoxProps } from 'astal/gtk3/widget';

interface MediaPlayerContainerProps {
  children?: JSX.Element | JSX.Element[];
}
export function MediaPlayerContainer({
  children,
  ...props
}: MediaPlayerContainerProps & BoxProps) {
  return <box {...props}>{children}</box>;
}
