import { useEffect, useState } from 'react';
import Layout from '../../components/common/Layout';
import StatsCard from '../../components/dashboard/StatsCard';
import { getSchools } from '../../utils/api';

export default function SuperAdminDashboard() {
  const [stats, setStats] = useState({ totalSchools: 0, activeSubscriptions: 0 });
  useEffect(() => {
    getSchools().then(data => setStats({ totalSchools: data.length, activeSubscriptions: data.filter(s => s.status === 'active').length }));
  }, []);
  return (
    <Layout>
      <h1>Super Admin Dashboard</h1>
      <div style={{ display: 'flex', gap: 20 }}>
        <StatsCard title="Total Schools" value={stats.totalSchools} />
        <StatsCard title="Active Subscriptions" value={stats.activeSubscriptions} />
      </div>
    </Layout>
  );
}// Placeholder: super-admin.tsx
