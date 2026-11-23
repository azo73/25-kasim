import { useEffect, useMemo, useState } from 'react';
import { AnimatePresence } from 'framer-motion';
import IntroSplash from './components/IntroSplash';
import SolidarityBanner from './components/SolidarityBanner';
import RandomAwarenessCards from './components/RandomAwarenessCards';
import SupportFooter from './components/SupportFooter';
import ReportDashboard from './components/ReportDashboard';
import {
  fetchRibbonCount,
  getLocationTag,
  subscribeToRibbons,
} from './lib/analyticsService';

function isReportLocation() {
  const path = window.location.pathname.replace(/\/+$/, '');
  const hash = window.location.hash.replace(/\/+$/, '');
  return path === '/rapor' || hash === '#/rapor';
}

export default function App() {
  const [isReportRoute, setIsReportRoute] = useState(() => isReportLocation());
  const [showSplash, setShowSplash] = useState(() => !isReportLocation());
  const [ribbonCount, setRibbonCount] = useState(null);

  const locationTag = useMemo(() => getLocationTag(), []);

  useEffect(() => {
    const syncRoute = () => {
      const reportNow = isReportLocation();
      setIsReportRoute(reportNow);
      if (reportNow) setShowSplash(false);
    };
    window.addEventListener('popstate', syncRoute);
    window.addEventListener('hashchange', syncRoute);
    return () => {
      window.removeEventListener('popstate', syncRoute);
      window.removeEventListener('hashchange', syncRoute);
    };
  }, []);

  useEffect(() => {
    let active = true;

    fetchRibbonCount().then((count) => {
      if (active) setRibbonCount(count);
    });

    const unsubscribe = subscribeToRibbons((latestCount) => {
      if (active) setRibbonCount(latestCount);
    });

    return () => {
      active = false;
      unsubscribe();
    };
  }, []);

  const handleExitReport = () => {
    if (window.location.hash === '#/rapor') {
      window.location.hash = '';
    }
    if (window.location.pathname === '/rapor') {
      window.history.pushState({}, '', '/');
    }
    setIsReportRoute(false);
  };

  return (
    <div className="flex min-h-dvh flex-col bg-canvas text-ink">
      <AnimatePresence>
        {showSplash && !isReportRoute && (
          <IntroSplash onFinish={() => setShowSplash(false)} />
        )}
      </AnimatePresence>

      {isReportRoute ? (
        <ReportDashboard onBackToApp={handleExitReport} />
      ) : (
        <>
          <main className="flex-1">
            <SolidarityBanner
              ribbonCount={ribbonCount}
              onRibbonCountChange={setRibbonCount}
              locationTag={locationTag}
            />
            <RandomAwarenessCards locationTag={locationTag} />
          </main>

          <SupportFooter />
        </>
      )}
    </div>
  );
}
