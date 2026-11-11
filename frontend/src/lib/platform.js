/** Platform helpers for keyboard hints. */
export const isMac =
  typeof navigator !== 'undefined' &&
  /Mac|iPhone|iPad|iPod/i.test(navigator.platform || navigator.userAgent || '');

/** Label for the primary modifier key: ⌘ on macOS, Ctrl elsewhere. */
export const modKey = isMac ? '⌘' : 'Ctrl';
