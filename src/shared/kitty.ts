import { exec, execAsync } from 'astal';

export const execKitty = (args: string) => exec(`kitty "${args}"`);
export const execKittyAsync = (args: string) => execAsync(`kitty "${args}"`);
