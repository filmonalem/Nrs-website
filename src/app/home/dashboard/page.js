"use client";

import { useState } from 'react';

// Sidebar Component (copied from your code)
function Sidebar({ activePage, setActivePage, sidebarOpen, setSidebarOpen }) {
  const menuItems = [
    { id: 'dashboard', label: 'Dashboard', icon: '📊' },
    { id: 'account', label: 'Account', icon: '👤' },
    { id: 'news', label: 'Manage News', icon: '📰' },
    { id: 'services', label: 'Manage Services', icon: '🛠️' },
    { id: 'about', label: 'About Settings', icon: 'ℹ️' },
    { id: 'contact', label: 'Contact', icon: '✉️' },
    { id: 'settings', label: 'Settings', icon: '⚙️' },
  ];

  return (
    <>
      {/* Overlay for mobile */}
      {sidebarOpen && (
        <div 
          className="fixed inset-0 bg-gray-50 bg-opacity-50 z-20 md:hidden"
          onClick={() => setSidebarOpen(false)}
        ></div>
      )}
      
      {/* Sidebar */}
      <aside className={`fixed inset-y-0 left-0 transform ${sidebarOpen ? 'translate-x-0' : '-translate-x-full'} md:translate-x-0 transition duration-300 ease-in-out z-30 w-64 bg-gray-50  text-black min-h-screen p-6 md:relative md:flex md:flex-col shadow-xl`}>
        <div className="flex items-center justify-between mb-10">
          <div className="flex items-center">
            <div className="w-8 h-8 bg-orange-500 rounded-lg flex items-center justify-center mr-3">
              <span className="text-black font-bold text-lg">L</span>
            </div>
            <h2 className="text-xl font-bold">Loop Tech</h2>
          </div>
          <button 
            className="md:hidden p-1 rounded hover:bg-gray-700 transition"
            onClick={() => setSidebarOpen(false)}
          >
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
        </div>
        
        <nav className="space-y-1 flex-1">
          {menuItems.map((item) => (
            <button
              key={item.id}
              className={`flex items-center w-full px-4 py-3 rounded-lg transition-all ${activePage === item.id ? 'bg-[#d97706] text-white shadow-md' : 'text-gray-900 hover:bg-gray-700 hover:text-white'}`}
              onClick={() => {
                setActivePage(item.id);
                setSidebarOpen(false);
              }}
            >
              <span className="mr-3 text-lg">{item.icon}</span>
              <span className="font-medium">{item.label}</span>
              {activePage === item.id && (
                <span className="ml-auto w-2 h-2 bg-[#d97706] rounded-full"></span>
              )}
            </button>
          ))}
        </nav>
        
        <div className="pt-6 mt-6 border-t border-gray-700">
          <button className="w-full mt-4 py-2 px-4 bg-red-600 hover:bg-red-500 rounded-lg text-sm transition-all flex items-center justify-center">
            <svg className="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1" />
            </svg>
            Logout
          </button>
        </div>
      </aside>
    </>
  );
}

// Main Dashboard Component
export default function Dashboard() {
  const [activePage, setActivePage] = useState('dashboard');
  const [sidebarOpen, setSidebarOpen] = useState(false);

  // Stats for inventory management consulting business
  const stats = [
    { 
      title: 'Active Projects', 
      value: '18', 
      change: '+12%', 
      icon: '📊',
      description: 'Ongoing client projects'
    },
    { 
      title: 'Inventory Systems', 
      value: '24', 
      change: '+8%', 
      icon: '📦',
      description: 'Managed systems'
    },
    { 
      title: 'Monthly Revenue', 
      value: '$45,241', 
      change: '+23%', 
      icon: '💰',
      description: 'Current month earnings'
    },
    { 
      title: 'Client Satisfaction', 
      value: '98%', 
      change: '+2%', 
      icon: '⭐',
      description: 'Average rating'
    },
  ];

  // Project status data
  const projectStatus = [
    { status: 'Planning', count: 4, color: 'bg-blue-500' },
    { status: 'Development', count: 8, color: 'bg-yellow-500' },
    { status: 'Testing', count: 3, color: 'bg-purple-500' },
    { status: 'Deployed', count: 7, color: 'bg-green-500' },
  ];

  // Recent activities for the business
  const recentActivities = [
    { 
      user: 'TechCorp Inc.', 
      action: 'signed new contract', 
      time: '2 hours ago', 
      icon: '📝' 
    },
    { 
      user: 'Inventory Solutions LLC', 
      action: 'system upgrade completed', 
      time: '1 day ago', 
      icon: '✅' 
    },
    { 
      user: 'Global Retail', 
      action: 'requested consultation', 
      time: '2 days ago', 
      icon: '🛎️' 
    },
    { 
      user: 'Warehouse Pro', 
      action: 'project delivered', 
      time: '3 days ago', 
      icon: '📦' 
    },
  ];

  // Upcoming consultations
  const upcomingConsultations = [
    { client: 'TechCorp Inc.', date: 'Today, 2:00 PM', type: 'System Review' },
    { client: 'Retail World', date: 'Tomorrow, 10:00 AM', type: 'Implementation' },
    { client: 'Logistics Co.', date: 'Aug 12, 1:30 PM', type: 'Consultation' },
  ];

  return (
    <div className="flex h-screen bg-gray-100">
      <Sidebar 
        activePage={activePage} 
        setActivePage={setActivePage} 
        sidebarOpen={sidebarOpen} 
        setSidebarOpen={setSidebarOpen} 
      />
      
      {/* Main content */}
      <div className="flex-1 flex flex-col overflow-hidden">
        {/* Header */}
        <header className="bg-white shadow-sm z-10">
          <div className="flex items-center justify-between p-4">
            <button 
              className="md:hidden p-2 rounded-md text-gray-700"
              onClick={() => setSidebarOpen(true)}
            >
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
              </svg>
            </button>
            
            <div className="flex items-center space-x-4">
              <h1 className="text-xl font-bold text-gray-800">Inventory Management Dashboard</h1>
              
              <div className="relative">
                <svg className="w-5 h-5 text-gray-500 absolute left-3 top-2.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                </svg>
                <input 
                  type="text" 
                  placeholder="Search..." 
                  className="pl-10 pr-4 py-2 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-orange-500 focus:border-transparent"
                />
              </div>
            </div>
            
            <div className="flex items-center space-x-4">
              <button className="p-2 rounded-full bg-gray-200 text-gray-700">
                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 17h5l-1.405-1.405A2.032 2.032 0 0118 14.158V11a6.002 6.002 0 00-4-5.659V5a2 2 0 10-4 0v.341C7.67 6.165 6 8.388 6 11v3.159c0 .538-.214 1.055-.595 1.436L4 17h5m6 0v1a3 3 0 11-6 0v-1m6 0H9" />
                </svg>
              </button>
              
              <div className="flex items-center">
                <img 
                  src="https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80" 
                  alt="User profile" 
                  className="w-10 h-10 rounded-full"
                />
                <span className="ml-2 text-gray-700">Admin</span>
              </div>
            </div>
          </div>
        </header>

        {/* Dashboard content */}
        <main className="flex-1 overflow-y-auto p-6 bg-gray-100">
          <div className="mb-6">
            <h1 className="text-2xl font-bold text-gray-900">System Overview</h1>
            <p className="text-gray-600">Welcome back! Here's what's happening with your inventory management systems.</p>
          </div>

          {/* Stats cards */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
            {stats.map((stat, index) => (
              <div key={index} className="bg-white rounded-xl shadow-sm p-6">
                <div className="flex justify-between items-start">
                  <div>
                    <p className="text-sm font-medium text-gray-600">{stat.title}</p>
                    <h3 className="text-2xl font-bold text-gray-900 mt-1">{stat.value}</h3>
                    <p className={`text-sm mt-2 ${stat.change.includes('+') ? 'text-green-600' : 'text-red-600'}`}>
                      {stat.change} from last month
                    </p>
                    <p className="text-xs text-gray-500 mt-2">{stat.description}</p>
                  </div>
                  <div className="bg-orange-100 p-3 rounded-lg">
                    <span className="text-2xl">{stat.icon}</span>
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* Charts and activities */}
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            {/* Project status */}
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
                      <div 
                        className={`${item.color} h-2 rounded-full`} 
                        style={{ width: `${(item.count / 22) * 100}%` }}
                      ></div>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Recent activities */}
            <div className="bg-white rounded-xl shadow-sm p-6 lg:col-span-2">
              <h3 className="text-lg font-semibold text-gray-900 mb-4">Recent Activities</h3>
              <ul className="space-y-4">
                {recentActivities.map((activity, index) => (
                  <li key={index} className="flex items-start">
                    <div className="flex-shrink-0 h-10 w-10 rounded-full bg-gray-100 flex items-center justify-center text-lg mr-3">
                      {activity.icon}
                    </div>
                    <div>
                      <p className="text-sm font-medium text-gray-900">
                        {activity.user} <span className="font-normal text-gray-700">{activity.action}</span>
                      </p>
                      <p className="text-xs text-gray-500">{activity.time}</p>
                    </div>
                  </li>
                ))}
              </ul>
            </div>
          </div>

          {/* Upcoming consultations and quick actions */}
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mt-6">
            {/* Upcoming consultations */}
            <div className="bg-white rounded-xl shadow-sm p-6 lg:col-span-1">
              <div className="flex justify-between items-center mb-4">
                <h3 className="text-lg font-semibold text-gray-900">Upcoming Consultations</h3>
                <button className="text-sm text-orange-600 hover:text-orange-700 font-medium">
                  View all
                </button>
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

            {/* Quick Actions */}
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