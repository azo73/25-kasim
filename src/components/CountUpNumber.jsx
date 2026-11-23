import { useEffect, useState } from 'react';
import { animate } from 'framer-motion';

export default function CountUpNumber({
  value,
  duration = 0.85,
  prefix = '',
  suffix = '',
  className = '',
}) {
  const [displayValue, setDisplayValue] = useState(0);

  useEffect(() => {
    const target = Number(value) || 0;
    const controls = animate(0, target, {
      duration,
      ease: [0.16, 1, 0.3, 1],
      onUpdate: (latest) => {
        setDisplayValue(Math.round(latest));
      },
    });
    return () => controls.stop();
  }, [value, duration]);

  return (
    <span className={`tabular-nums ${className}`}>
      {prefix}
      {displayValue.toLocaleString('tr-TR')}
      {suffix}
    </span>
  );
}
