import { useEffect, useCallback } from 'react';
import { LogOut } from 'lucide-react';

export default function QuickExitButton() {
  const handleQuickExit = useCallback(() => {
    window.location.replace('https://www.google.com');
  }, []);

  useEffect(() => {
    const onKeyDown = (event) => {
      if (event.key === 'Escape') {
        handleQuickExit();
      }
    };
    window.addEventListener('keydown', onKeyDown);
    return () => window.removeEventListener('keydown', onKeyDown);
  }, [handleQuickExit]);

  return (
    <button
      type="button"
      onClick={handleQuickExit}
      aria-label="Hızlı Çıkış — Google sayfasına yönlendir (ESC)"
      title="Hızlı Çıkış (ESC)"
      className="fixed right-4 top-4 z-50 inline-flex min-h-[38px] items-center gap-1.5 rounded-full border border-hairline bg-canvas/95 px-3.5 py-1.5 text-xs font-medium tracking-wide text-muted backdrop-blur-sm transition-colors hover:border-ink/40 hover:text-ink focus:outline-none focus-visible:ring-2 focus-visible:ring-ribbon"
    >
      <LogOut className="h-3.5 w-3.5" aria-hidden="true" />
      <span>Hızlı Çıkış</span>
      <span className="hidden border-l border-hairline pl-1.5 text-[10px] uppercase tracking-wider text-muted/70 sm:inline">
        ESC
      </span>
    </button>
  );
}
