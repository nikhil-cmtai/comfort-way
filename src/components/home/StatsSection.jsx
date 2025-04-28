import React, { useEffect, useRef, useState } from 'react';
import { FiUsers, FiTool, FiStar, FiSmile } from 'react-icons/fi';

const stats = [
  {
    label: 'Happy Customers',
    value: 2500,
    icon: <FiSmile className="w-10 h-10 text-indigo-500" />,
    glow: 'from-indigo-100 to-blue-100',
  },
  {
    label: 'Appliances Repaired',
    value: 7800,
    icon: <FiTool className="w-10 h-10 text-green-500" />,
    glow: 'from-green-100 to-blue-100',
  },
  {
    label: '5-Star Reviews',
    value: 1200,
    icon: <FiStar className="w-10 h-10 text-yellow-400" />,
    glow: 'from-yellow-100 to-indigo-100',
  },
  {
    label: 'Expert Technicians',
    value: 40,
    icon: <FiUsers className="w-10 h-10 text-purple-500" />,
    glow: 'from-purple-100 to-blue-100',
  },
];

const formatNumber = (num) => num.toLocaleString();

const useCountUpOnView = (end, duration = 1200, trigger) => {
  const [count, setCount] = useState(0);
  const frame = useRef();

  useEffect(() => {
    if (!trigger) return;
    let startTimestamp;
    const step = (timestamp) => {
      if (!startTimestamp) startTimestamp = timestamp;
      const progress = Math.min((timestamp - startTimestamp) / duration, 1);
      setCount(Math.floor(progress * end));
      if (progress < 1) {
        frame.current = requestAnimationFrame(step);
      } else {
        setCount(end);
      }
    };
    frame.current = requestAnimationFrame(step);
    return () => cancelAnimationFrame(frame.current);
  }, [end, duration, trigger]);
  return count;
};

const StatsSection = () => {
  const sectionRef = useRef();
  const [inView, setInView] = useState(false);

  useEffect(() => {
    const observer = new window.IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) setInView(true);
      },
      { threshold: 0.3 }
    );
    if (sectionRef.current) observer.observe(sectionRef.current);
    return () => observer.disconnect();
  }, []);

  const counts = stats.map((stat) => useCountUpOnView(stat.value, 1200, inView));

  return (
    <section ref={sectionRef} className="py-16 bg-gradient-to-br from-indigo-50 to-blue-50">
      <div className="max-w-6xl mx-auto px-4">
        <h2 className="text-2xl md:text-3xl font-bold text-gray-800 text-center mb-3">Our Impact in Numbers</h2>
        <p className="text-gray-500 text-center mb-12 text-base md:text-lg">Trusted by thousands of happy customers across Mumbai. Here's why people choose ComfortWay.</p>
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-8 md:gap-12">
          {stats.map((stat, idx) => (
            <div
              key={stat.label}
              className="flex flex-col items-center justify-center"
            >
              <div className={`w-20 h-20 rounded-full bg-gradient-to-br ${stat.glow} flex items-center justify-center mb-4 shadow-lg animate-fade-in`}>{stat.icon}</div>
              <div className="text-3xl md:text-4xl font-extrabold text-blue-700 mb-1 transition-transform duration-300" style={{transitionDelay: `${idx * 100}ms`}}>
                {formatNumber(counts[idx])}+
              </div>
              <div className="text-sm md:text-base font-semibold text-gray-800 text-center mt-1">{stat.label}</div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default StatsSection; 