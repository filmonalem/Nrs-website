"use client";

import { useState } from 'react';
import Header from './Header';

export default function Dashboard() {
  const [activePage, setActivePage] = useState('dashboard');
  const [sidebarOpen, setSidebarOpen] = useState(false);

  const stats = [
    { title: 'Active Projects', value: '18', change: '+12%', icon: '📊', description: 'Ongoing client projects' },
    { title: 'Inventory Systems', value: '24', change: '+8%', icon: '📦', description: 'Managed systems' },
    { title: 'Monthly Revenue', value: '$45,241', change: '+23%', icon: '💰', description: 'Current month earnings' },
    { title: 'Client Satisfaction', value: '98%', change: '+2%', icon: '⭐', description: 'Average rating' },
  ];

  const projectStatus = [
    { status: 'Planning', count: 4, color: 'bg-blue-500' },
    { status: 'Development', count: 8, color: 'bg-yellow-500' },
    { status: 'Testing', count: 3, color: 'bg-purple-500' },
    { status: 'Deployed', count: 7, color: 'bg-green-500' },
  ];

  const recentActivities = [
    { user: 'TechCorp Inc.', action: 'signed new contract', time: '2 hours ago', icon: '📝' },
    { user: 'Inventory Solutions LLC', action: 'system upgrade completed', time: '1 day ago', icon: '✅' },
    { user: 'Global Retail', action: 'requested consultation', time: '2 days ago', icon: '🛎️' },
    { user: 'Warehouse Pro', action: 'project delivered', time: '3 days ago', icon: '📦' },
  ];

  const upcomingConsultations = [
    { client: 'TechCorp Inc.', date: 'Today, 2:00 PM', type: 'System Review' },
    { client: 'Retail World', date: 'Tomorrow, 10:00 AM', type: 'Implementation' },
    { client: 'Logistics Co.', date: 'Aug 12, 1:30 PM', type: 'Consultation' },
  ];

  return (
    <div className="flex h-screen bg-gray-100">
      <div className="flex-1 flex flex-col overflow-hidden">
 

        <main className="flex-1 overflow-y-auto p-6 bg-gray-100">
          <div className="mb-6">
            <h1 className="text-2xl font-bold text-gray-900">System Overview</h1>
            <p className="text-gray-600">Welcome back! Here's what's happening with your inventory management systems.</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
            {stats.map((stat, index) => (
              <div key={index} className="bg-white rounded-xl shadow-sm p-6 flex justify-between items-start">
                <div>
                  <p className="text-sm font-medium text-gray-600">{stat.title}</p>
                  <h3 className="text-2xl font-bold text-gray-900 mt-1">{stat.value}</h3>
                  <p className={`text-sm mt-2 ${stat.change.includes('+') ? 'text-green-600' : 'text-red-600'}`}>
                    {stat.change} from last month
                  </p>
                  <p className="text-xs text-gray-500 mt-2">{stat.description}</p>
                </div>
                <div className="bg-orange-100 p-3 rounded-lg text-2xl">{stat.icon}</div>
              </div>
            ))}
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            <div className="bg-white rounded-xl shadow-sm p-6 lg:col-span-1">
              <h3 className="text-lg font-semibold text-gray-900 mb-4">Project Status</h3>
              <div className="space-y-4">
                {projectStatus.map((item, index) => (
                  <div key={index}>
                    <div className="flex justify-between mb-1">
                      <span className="text-sm font-medium text-gray-700">{item.status}</span>
                      <span className="text-sm font-medium text-gray-700">{item.count}</span>
                    </div>
                    <div className="w-full bg-gray-200 rounded-full h-2">
                      <div className={`${item.color} h-2 rounded-full`} style={{ width: `${(item.count / 22) * 100}%` }}></div>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            <div className="bg-white rounded-xl shadow-sm p-6 lg:col-span-2">
              <h3 className="text-lg font-semibold text-gray-900 mb-4">Recent Activities</h3>
              <ul className="space-y-4">
                {recentActivities.map((activity, index) => (
                  <li key={index} className="flex items-start">
                    <div className="flex-shrink-0 h-10 w-10 rounded-full bg-gray-100 flex items-center justify-center text-lg mr-3">{activity.icon}</div>
                    <div>
                      <p className="text-sm font-medium text-gray-900">{activity.user} <span className="font-normal text-gray-700">{activity.action}</span></p>
                      <p className="text-xs text-gray-500">{activity.time}</p>
                    </div>
                  </li>
                ))}
              </ul>
            </div>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mt-6">
            <div className="bg-white rounded-xl shadow-sm p-6 lg:col-span-1">
              <div className="flex justify-between items-center mb-4">
                <h3 className="text-lg font-semibold text-gray-900">Upcoming Consultations</h3>
                <button className="text-sm text-orange-600 hover:text-orange-700 font-medium">View all</button>
              </div>
              <div className="space-y-4">
                {upcomingConsultations.map((consultation, index) => (
                  <div key={index} className="flex items-start p-3 bg-gray-50 rounded-lg">
                    <div className="flex-1 min-w-0">
                      <p className="text-sm font-medium text-gray-900 truncate">{consultation.client}</p>
                      <p className="text-sm text-gray-500 truncate">{consultation.type}</p>
                    </div>
                    <div className="text-xs text-gray-500 whitespace-nowrap">{consultation.date}</div>
                  </div>
                ))}
              </div>
            </div>

            <div className="bg-white rounded-xl shadow-sm p-6 lg:col-span-2">
              <h3 className="text-lg font-semibold text-gray-900 mb-4">Quick Actions</h3>
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                <button className="flex flex-col items-center justify-center p-4 border border-gray-200 rounded-lg hover:bg-gray-50 transition-colors">
                  <span className="text-2xl mb-2">📝</span>
                  <span className="text-sm">Create Project</span>
                </button>
                <button className="flex flex-col items-center justify-center p-4 border border-gray-200 rounded-lg hover:bg-gray-50 transition-colors">
                  <span className="text-2xl mb-2">📦</span>
                  <span className="text-sm">Inventory Audit</span>
                </button>
                <button className="flex flex-col items-center justify-center p-4 border border-gray-200 rounded-lg hover:bg-gray-50 transition-colors">
                  <span className="text-2xl mb-2">📊</span>
                  <span className="text-sm">Generate Report</span>
                </button>
                <button className="flex flex-col items-center justify-center p-4 border border-gray-200 rounded-lg hover:bg-gray-50 transition-colors">
                  <span className="text-2xl mb-2">👥</span>
                  <span className="text-sm">Client Management</span>
                </button>
              </div>
            </div>
          </div>
        </main>
      </div>
    </div>
  );
}
