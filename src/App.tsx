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

// Навбар з активними посиланнями
const Navbar: React.FC = () => {
  const location = useLocation();

  return (
    <nav
      className="navbar is-light is-fixed-top is-mobile has-shadow"
      data-cy="Nav"
    >
      <div className="container">
        <div className="navbar-brand">
          <Link
            to="/"
            className={`navbar-item ${location.pathname === '/' ? 'is-active' : ''}`}
          >
            Home
          </Link>

          <Link
            to="/tabs"
            className={`navbar-item ${
              location.pathname.startsWith('/tabs') ? 'is-active' : ''
            }`}
          >
            Tabs
          </Link>
        </div>
      </div>
    </nav>
  );
};

// Головна сторінка
const HomePage: React.FC = () => <h1 className="title">Home page</h1>;

// Сторінка з табами
const TabsPage: React.FC = () => {
  const { tabId } = useParams<{ tabId?: string }>();
  const activeTab = tabs.find(tab => tab.id === tabId);

  return (
    <>
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
    </>
  );
};

// 404 сторінка
const NotFoundPage: React.FC = () => <h1 className="title">Page not found</h1>;

export const App: React.FC = () => {
  return (
    <>
      <Navbar />

      <div className="section" style={{ paddingTop: '4.5rem' }}>
        <div className="container">
          <Routes>
            <Route path="/" element={<HomePage />} />
            <Route path="/home" element={<Navigate to="/" replace />} />

            <Route path="/tabs">
              <Route index element={<TabsPage />} />
              <Route path=":tabId" element={<TabsPage />} />
            </Route>

            <Route path="*" element={<NotFoundPage />} />
          </Routes>
        </div>
      </div>
    </>
  );
};
