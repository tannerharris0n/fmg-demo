import { Outlet } from 'react-router-dom';
import { NavTree } from './NavTree';
import { TopBar } from './TopBar';
import { CommandPalette } from './CommandPalette';
import { KeyboardShortcutsOverlay } from './KeyboardShortcutsOverlay';
import { ToastContainer } from '../common/Toast';
import { useKeyboardShortcuts } from '../../hooks/useKeyboardShortcuts';

function GlobalKeyboard() {
  useKeyboardShortcuts();
  return null;
}

export function AppShell() {
  return (
    <div className="h-full flex bg-surface-950">
      <GlobalKeyboard />
      <NavTree />
      <div className="flex-1 min-w-0 flex flex-col">
        <TopBar />
        <main className="canvas flex-1 overflow-y-auto px-6 py-5">
          <div className="mx-auto w-full max-w-[1480px]">
            <Outlet />
          </div>
        </main>
      </div>
      <CommandPalette />
      <KeyboardShortcutsOverlay />
      <ToastContainer />
    </div>
  );
}
