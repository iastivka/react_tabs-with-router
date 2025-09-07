// src/App.tsx
import 'bulma/css/bulma.css';
import '@fortawesome/fontawesome-free/css/all.css';
import './App.scss';

import React from 'react';
import {
  Routes,
  Route,
  Link,
  useLocation,
  useParams,
  Navigate,
} from 'react-router-dom';
import { Tab } from './types/Tab';

const tabs: Tab[] = [
  { id: 'tab-1', title: 'Tab 1', content: 'Some text 1' },
  { id: 'tab-2', title: 'Tab 2', content: 'Some text 2' },
  { id: 'tab-3', title: 'Tab 3', content: 'Some text 3' },
];

/** Navbar — Cypress очікує is-active саме на <a.navbar-item> */
const Navbar: React.FC = () => {
  const location = useLocation();
  const pathname = location.pathname || '/';

  return (
    <nav
      className="navbar is-light is-fixed-top is-mobile has-shadow"
      data-cy="Nav"
    >
      <div className="container">
        <div className="navbar-brand">
          <Link
            to="/"
            data-cy="NavHome"
            className={`navbar-item ${pathname === '/' ? 'is-active' : ''}`}
          >
            Home
          </Link>

          <Link
            to="/tabs"
            data-cy="NavTabs"
            className={`navbar-item ${
              pathname === '/tabs' || pathname.startsWith('/tabs/')
                ? 'is-active'
                : ''
            }`}
          >
            Tabs
          </Link>
        </div>
      </div>
    </nav>
  );
};

const HomePage: React.FC = () => (
  <div className="section" style={{ paddingTop: '4.5rem' }}>
    <div className="container">
      <h1 className="title">Home page</h1>
    </div>
  </div>
);

/** TabsPage — читає tabId з URL і показує вміст або повідомлення */
const TabsPage: React.FC = () => {
  const { tabId } = useParams<{ tabId?: string }>();
  const activeTab = tabId ? tabs.find(t => t.id === tabId) : undefined;

  return (
    <div className="section" style={{ paddingTop: '4.5rem' }}>
      <div className="container">
        <h1 className="title">Tabs page</h1>

        <div className="tabs is-boxed">
          <ul>
            {tabs.map(tab => (
              <li
                key={tab.id}
                data-cy="Tab"
                className={tab.id === tabId ? 'is-active' : ''}
              >
                <Link to={`/tabs/${tab.id}`}>{tab.title}</Link>
              </li>
            ))}
          </ul>
        </div>

        <div className="block" data-cy="TabContent">
          {tabId
            ? activeTab
              ? activeTab.content
              : 'Please select a tab'
            : 'Please select a tab'}
        </div>
      </div>
    </div>
  );
};

const NotFoundPage: React.FC = () => (
  <div className="section" style={{ paddingTop: '4.5rem' }}>
    <div className="container">
      <h1 className="title">Page not found</h1>
    </div>
  </div>
);

/** Головний компонент App */
export const App: React.FC = () => {
  return (
    <>
      <Navbar />

      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/home" element={<Navigate to="/" replace />} />

        <Route path="tabs">
          <Route index element={<TabsPage />} />
          <Route path=":tabId" element={<TabsPage />} />
        </Route>

        <Route path="*" element={<NotFoundPage />} />
      </Routes>
    </>
  );
};
