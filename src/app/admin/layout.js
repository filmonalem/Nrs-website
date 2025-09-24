import Sidebar from "@/components/Sidebar";
import "../globals.css";

export const metadata = {
  title: "Admin Panel",
  description: "Manage school website content",
};

export default function AdminLayout({ children }) {
  return (
    <html lang="en">
      <body className="flex font-sans bg-gray-100">
        {/* Sidebar */}
        <Sidebar />

        {/* Main Admin Content */}
        <main className="flex-grow p-6">{children}</main>
      </body>
    </html>
  );
}
