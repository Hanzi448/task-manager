import React, { useEffect, useState } from 'react';
import api from '../services/api';
import {
  PieChart, Pie, Cell,
  BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend,
  ResponsiveContainer
} from 'recharts';

const COLORS = ['#0088FE', '#00C49F', '#FFBB28', '#FF8042'];

function Dashboard() {
  const [statusData, setStatusData] = useState([]);
  const [weeklyData, setWeeklyData] = useState([]);

  useEffect(() => {
    fetchAnalytics();
  }, []);

  const fetchAnalytics = async () => {
    try {
      const response = await api.get('/tasks/analytics');
      const { statusCounts, tasksPerWeek } = response.data;

      const formattedStatus = Object.entries(statusCounts).map(([status, count]) => ({
        name: status,
        value: count,
      }));

      const formattedWeek = Object.entries(tasksPerWeek).map(([week, count]) => ({
        week,
        count,
      }));

      setStatusData(formattedStatus);
      setWeeklyData(formattedWeek);
    } catch (err) {
      console.error('Error fetching analytics:', err);
    }
  };

  return (
    <div>
      <h3 className="text-success mb-4">📊 Analytics Dashboard</h3>
      <div className="row">
        <div className="col-md-6 mb-4">
          <h5 className="text-center">Task Status Distribution</h5>
          <ResponsiveContainer width="100%" height={300}>
            <PieChart>
              <Pie
                data={statusData}
                dataKey="value"
                nameKey="name"
                cx="50%"
                cy="50%"
                outerRadius={100}
                fill="#8884d8"
                label
              >
                {statusData.map((entry, index) => (
                  <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                ))}
              </Pie>
              <Tooltip />
            </PieChart>
          </ResponsiveContainer>
        </div>

        <div className="col-md-6 mb-4">
          <h5 className="text-center">Tasks Created Per Week</h5>
          <ResponsiveContainer width="100%" height={300}>
            <BarChart data={weeklyData}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="week" />
              <YAxis allowDecimals={false} />
              <Tooltip />
              <Legend />
              <Bar dataKey="count" fill="#82ca9d" />
            </BarChart>
          </ResponsiveContainer>
        </div>
      </div>
    </div>
  );
}

export default Dashboard;
