# Git Branch-wise Session

An Extension to keep Tabs for each Git branch.

## See It in Action

### Save and Restore Tabs on Git Branch Basis

![Manual Save and Restore for Current Branch](./assets/save-and-restore.gif)

You can manually save opened Tabs for current Git Branch, so that you can restore tabs when you switch back later.

### Restore Sessions Automatically on Git Branch Switches

![Auto Restore on Branch Switches](./assets/auto-restore.gif)

The Extension automatically restores the saved Session for you whenever you switch to another Git Branch. If no saved sessions are available, the Extension simply ignores.

To enable this feature, you should configure `git-branch-wise-session.shouldAutoRestoreOnBranchSwitches` to `true`. See `Configurations`.

## How to Use

- Save Current Session: `Ctrl + P` / `Cmd + P` → Type `> Save Session for Current Branch`
- Restore Session for Current Branch: `Ctrl + P` / `Cmd + P` → Type `> Restore Saved Session for Current Branch`
- Configure Extension: `Ctrl + P` / `Cmd + P` → Type `> Open Settings` → Choose settings to configure.

## Prerequisites

- You **must** enable [`vscode.git`](vscode:extension/vscode.git) Extension beforehand.
  - This Extension is **one of VSCode builtin Extensions**, so you don't need to install this. You have already enabled it, unless you had disabled it.

## Configurations

### `git-branch-wise-session.shouldAutoRestoreOnBranchSwitches`

![Settings](./assets/settings.png)

- `type`: `boolean`
- `default`: `false`

You should enable this option to restore sessions automatically on Git branch switches.
