// components/Header.js
export default function Header({ sidebarOpen, setSidebarOpen, activePage }) {
  const pageTitles = {
    dashboard: 'Dashboard',
    news: 'Manage News',
    services: 'Manage Services',
    about: 'About Settings',
    contact: 'Contact Messages',
    settings: 'Settings'
  };

  return (
    <header className="bg-white shadow">
      <div className="flex items-center justify-between px-4 py-3 md:px-6">
        <div className="flex items-center">
          <button 
            className="md:hidden mr-4"
            onClick={() => setSidebarOpen(!sidebarOpen)}
          >
            ☰
          </button>
          <h1 className="text-xl font-semibold">{pageTitles[activePage]}</h1>
        </div>
        
        <div className="flex items-center space-x-4">
          <div className="relative">
            <button className="p-2 rounded-full hover:bg-gray-100">
              <span className="sr-only">Notifications</span>
              <span className="absolute top-0 right-0 h-3 w-3 bg-red-500 rounded-full"></span>
              🔔
            </button>
          </div>
          
          <div className="relative">
            <input 
              type="text" 
              placeholder="Search..." 
              className="pl-4 pr-10 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            />
            <span className="absolute right-3 top-2.5">🔍</span>
          </div>
        </div>
      </div>
    </header>
  );
}