import { exec } from 'astal';

export function PowerMenu() {
  const onClicked = () => exec('wlogout');
  return (
    <button
      className="PowerMenu"
      cursor="pointer"
      label=""
      onClicked={onClicked}
    />
  );
}
