// components/Footer.js
export default function Footer() {
  return (
    <footer className="bg-gray-800 text-white py-12 px-4">
      <div className="max-w-6xl mx-auto grid md:grid-cols-4 gap-8">
        <div>
          <h3 className="text-xl font-bold mb-4">Nicolas Robinson School</h3>
          <p className="text-gray-400">
            Providing quality education since 1995. Empowering students to excel academically, socially, and personally.
          </p>
        </div>
        
        <div>
          <h3 className="text-xl font-bold mb-4">Quick Links</h3>
          <ul className="space-y-2">
            <li><a href="#hero" className="text-gray-400 hover:text-white transition">Home</a></li>
            <li><a href="#about" className="text-gray-400 hover:text-white transition">About</a></li>
            <li><a href="#services" className="text-gray-400 hover:text-white transition">Services</a></li>
            <li><a href="#gallery" className="text-gray-400 hover:text-white transition">Gallery</a></li>
          </ul>
        </div>
        
        <div>
          <h3 className="text-xl font-bold mb-4">Resources</h3>
          <ul className="space-y-2">
            <li><a href="#" className="text-gray-400 hover:text-white transition">Academic Calendar</a></li>
            <li><a href="#" className="text-gray-400 hover:text-white transition">Student Portal</a></li>
            <li><a href="#" className="text-gray-400 hover:text-white transition">Parent Resources</a></li>
            <li><a href="#" className="text-gray-400 hover:text-white transition">Faculty Directory</a></li>
          </ul>
        </div>
        
        <div>
          <h3 className="text-xl font-bold mb-4">Contact Info</h3>
          <address className="not-italic text-gray-400">
            <p>123 Education Street</p>
            <p>City, State 12345</p>
            <p className="mt-2">Phone: (123) 456-7890</p>
            <p>Email: info@ourschool.edu</p>
          </address>
        </div>
      </div>
      
      <div className="max-w-6xl mx-auto mt-12 pt-8 border-t border-gray-700 text-center text-gray-400">
        <p>&copy; {new Date().getFullYear()} Nicolas Robinson School. All rights reserved.</p>
      </div>
    </footer>
  );
}