import React, { useEffect, useState } from 'react';
import { Navigate } from 'react-router-dom';
import StatsCard from './components/StatsCard';
import RecentActivity from './components/RecentActivity';
import UserTable from './components/UserTable';
import Loader from '../components/Loader';
import './AdminDashboard.css';

// Mock Authentication Check
const isAdmin = true; // Replace with real authentication logic

const AdminDashboard = () => {
  const [dashboardData, setDashboardData] = useState(null);
  const [loading, setLoading] = useState(true);

  // Fetch Dashboard Data
  useEffect(() => {
    const fetchDashboardData = async () => {
      try {
        const response = await fetch('/api/admin/dashboard');
        const data = await response.json();
        setDashboardData(data);
      } catch (error) {
        console.error('Error fetching dashboard data:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchDashboardData();
  }, []);

  // Redirect non-admin users
  if (!isAdmin) {
    return <Navigate to="/login" />;
  }

  return (
    <div className="admin-dashboard">
      <header className="dashboard-header">
        <h1>Admin Dashboard</h1>
        <p>Manage users, monitor activity, and control the platform.</p>
      </header>

      {loading ? (
        <Loader />
      ) : (
        <div className="dashboard-content">
          <div className="stats-container">
            <StatsCard title="Total Users" value={dashboardData.totalUsers} icon="👥" />
            <StatsCard title="Active Sessions" value={dashboardData.activeSessions} icon="⚡" />
            <StatsCard title="Revenue" value={`$${dashboardData.revenue}`} icon="💰" />
            <StatsCard title="Server Status" value={dashboardData.serverStatus} icon="🖥️" />
          </div>

          <div className="activity-section">
            <RecentActivity activities={dashboardData.recentActivities} />
            <UserTable users={dashboardData.latestUsers} />
          </div>
        </div>
      )}
    </div>
  );
};

export default AdminDashboard;
