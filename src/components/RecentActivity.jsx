import React from 'react';
import './RecentActivity.css';

const RecentActivity = ({ activities }) => {
  return (
    <div className="recent-activity">
      <h2>Recent Activity</h2>
      <ul>
        {activities.map((activity, index) => (
          <li key={index}>
            <strong>{activity.user}</strong> {activity.action} at{' '}
            {new Date(activity.timestamp).toLocaleTimeString()}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default RecentActivity;
