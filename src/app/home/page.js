"use client";

import { useState } from 'react';
import Sidebar from '@/components/Sidebar';
import Header from '@/components/Header';
import Dashboard from '@/components/Dashboard';
// import ManageServices from '@/components/ManageServices';
import ContactsPage from './contact/page';
import NewsForm from './news/page';
import { ProtectedRoute } from '../store/auth/auth.slice';
import store from '../store/store';
import { Provider } from 'react-redux';
import Account from './account/page';

export default function AdminPanel() {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [activePage, setActivePage] = useState('dashboard');

  const renderContent = () => {
    switch(activePage) {
      case 'dashboard':
        return <Dashboard />;
      case 'news':
        return <NewsForm />;
      case 'contact':
        return <ContactsPage />;
      case 'account':
        return <Account />;
      default:
        return <Dashboard />;
    }
  };

  return (
       <ProtectedRoute>
    <Provider store={store}>
    <div className="flex h-screen bg-gray-100">
      {/* Sidebar */}
      <Sidebar 
        activePage={activePage} 
        setActivePage={setActivePage} 
        sidebarOpen={sidebarOpen} 
        setSidebarOpen={setSidebarOpen}
      />
      
      {/* Main content */}
      <div className="flex flex-col flex-1 overflow-hidden">
        <Header 
          sidebarOpen={sidebarOpen} 
          setSidebarOpen={setSidebarOpen}
          activePage={activePage}
        />
        
        <main className="flex-1 overflow-y-auto p-4 md:p-6">
          {renderContent()}
        </main>
      </div>
    </div>
     </Provider>

       </ProtectedRoute>
  );
}