import { Routes, Route } from 'react-router-dom';
import Layout from './components/Layout';
import Dashboard from './pages/Dashboard';
import Nodes from './pages/Nodes';
import Apps from './pages/Apps';
import Catalog from './pages/Catalog';
import RoutesPage from './pages/Routes';
import Secrets from './pages/Secrets';
import Jobs from './pages/Jobs';
import Audit from './pages/Audit';

function App() {
  return (
    <Layout>
      <Routes>
        <Route path="/" element={<Dashboard />} />
        <Route path="/nodes" element={<Nodes />} />
        <Route path="/apps" element={<Apps />} />
        <Route path="/catalog" element={<Catalog />} />
        <Route path="/routes" element={<RoutesPage />} />
        <Route path="/secrets" element={<Secrets />} />
        <Route path="/jobs" element={<Jobs />} />
        <Route path="/audit" element={<Audit />} />
      </Routes>
    </Layout>
  );
}

export default App;
