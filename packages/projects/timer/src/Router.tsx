import { Route, Routes } from 'react-router-dom';
import { DefaultLayout } from './layouts/Default';
import { HomePage } from './pages/Home';
import { HistoryPage } from './pages/History';

export function Router() {
  return (
    <Routes>
      <Route path="/" element={<DefaultLayout />}>
        <Route path="/" element={<HomePage />} />
        <Route path="/history" element={<HistoryPage />} />
      </Route>
    </Routes>
  );
}
