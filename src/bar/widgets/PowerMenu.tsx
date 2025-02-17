import { exec } from 'astal';

export function PowerMenu() {
  const onClicked = () => exec('wlogout');
  return (
    <button
      className="txt-icon module-item"
      cursor="pointer"
      label=""
      onClicked={onClicked}
    />
  );
}
