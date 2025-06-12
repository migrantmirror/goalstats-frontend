import React from 'react';
import { Link, useLocation } from 'react-router-dom';

const NavTabs = () => {
  const { pathname } = useLocation();
  const tabs = [
    { label: 'Live Matches', path: '/' },
    { label: 'Team Stats', path: '/team-stats' },
    { label: 'Correct Score', path: '/correct-score' },
  ];

  return (
    <nav className="flex space-x-4 bg-white shadow p-4" role="navigation" aria-label="Main navigation">
      {tabs.map((tab) => (
        <Link
          key={tab.path}
          to={tab.path}
          className={`px-4 py-2 rounded ${
            pathname === tab.path ? 'bg-blue-600 text-white' : 'bg-gray-200'
          }`}
          aria-current={pathname === tab.path ? 'page' : undefined}
        >
          {tab.label}
        </Link>
      ))}
    </nav>
  );
};

export default NavTabs;
