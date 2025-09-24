"use client";

import { useState, useEffect, useRef } from "react";
import Image from "next/image";
import Link from "next/link";

export default function Navbar({ activeSection }) {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [openDropdown, setOpenDropdown] = useState(null);
  const dropdownRef = useRef(null);

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setOpenDropdown(null);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const dropdownItems = {
    about: [
      { name: "History", href: "#history" },
      { name: "Leadership", href: "#leadership" },
      { name: "Faculty", href: "#faculty" },
      { name: "Testimonials", href: "#testimonials" },
    ],
    academics: [
      { name: "Curriculum", href: "#curriculum" },
      { name: "Departments", href: "#departments" },
      { name: "Programs", href: "#programs" },
      { name: "Academic Calendar", href: "#calendar" },
    ],
    admissions: [
      { name: "Apply Now", href: "#apply" },
      { name: "Requirements", href: "#requirements" },
      { name: "Tuition & Fees", href: "#tuition" },
      { name: "Scholarships", href: "#scholarships" },
    ],
  };

  const toggleDropdown = (dropdownName) => {
    setOpenDropdown(openDropdown === dropdownName ? null : dropdownName);
  };

  const closeMobileMenu = () => {
    setIsMenuOpen(false);
    setOpenDropdown(null);
  };

  const navItems = [
    { href: "#about", label: "About", dropdown: "about" },
    { href: "#services", label: "Services" },
    { href: "#academics", label: "Academics", dropdown: "academics" },
    { href: "#gallery", label: "Gallery" },
    { href: "#news", label: "News", route: "/news" },
    { href: "#admissions", label: "Admissions", dropdown: "admissions" },
    { href: "#contact", label: "Contact" },
  ];

  return (
    <nav className="fixed top-0 w-full bg-[var(--background)]/95 backdrop-blur-lg border-b border-gray-200 dark:border-gray-700 shadow-sm z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          {/* Logo */}
          <Link href="/" className="flex items-center space-x-3 group">
            <div className="w-10 h-10 sm:w-12 sm:h-12 relative flex-shrink-0">
              <Image
                src="/images/logo.jpg"
                alt="Nicolas Robinson School Logo"
                fill
                className="object-contain rounded-lg group-hover:scale-105 transition-transform duration-300 ease-out"
                sizes="(max-width: 640px) 40px, 48px"
                priority
              />
            </div>
            <div className="hidden sm:block">
              <h1 className="text-lg font-bold text-[var(--foreground)] tracking-tight">
                Nicolas Robinson School
              </h1>
              <p className="text-xs text-gray-500 dark:text-gray-400">Rainbows4Children</p>
            </div>
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center space-x-2" ref={dropdownRef}>
            {navItems.map((item, index) => (
              <div key={item.href} className="relative group">
                {item.dropdown ? (
                  <>
                    <button
                      onClick={() => toggleDropdown(item.dropdown)}
                      className={`px-4 py-2 rounded-full font-medium text-sm transition-all duration-300 flex items-center space-x-1.5 ${
                        activeSection === item.href.replace("#", "")
                          ? "text-blue-600 bg-blue-50 dark:bg-blue-900/30 dark:text-blue-300"
                          : "text-[var(--foreground)] hover:text-blue-600 dark:hover:text-blue-400 hover:bg-gray-100 dark:hover:bg-gray-800/50"
                      } focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2`}
                      aria-expanded={openDropdown === item.dropdown}
                      aria-controls={`dropdown-${item.dropdown}`}
                    >
                      <span>{item.label}</span>
                      <svg
                        className={`w-4 h-4 transition-transform duration-300 ${
                          openDropdown === item.dropdown ? "rotate-180" : ""
                        }`}
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                      >
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7" />
                      </svg>
                    </button>
                    {openDropdown === item.dropdown && (
                      <div
                        id={`dropdown-${item.dropdown}`}
                        className="absolute top-full left-0 mt-2 w-56 bg-[var(--background)] rounded-xl shadow-xl border border-gray-200 dark:border-gray-700 py-2 z-50 animate-fade-in-down"
                      >
                        {dropdownItems[item.dropdown].map((dropdownItem, idx) => (
                          <a
                            key={dropdownItem.href}
                            href={dropdownItem.href}
                            className="block px-4 py-2.5 text-sm text-[var(--foreground)] hover:bg-blue-50 dark:hover:bg-blue-900/50 hover:text-blue-600 dark:hover:text-blue-400 transition-colors duration-200 animate-fade-in-down"
                            style={{ animationDelay: `${idx * 0.05}s` }}
                            onClick={() => setOpenDropdown(null)}
                          >
                            {dropdownItem.name}
                          </a>
                        ))}
                      </div>
                    )}
                  </>
                ) : (
                  <a
                    href={item.href}
                    className={`px-4 py-2 rounded-full font-medium text-sm transition-all duration-300 ${
                      activeSection === item.href.replace("#", "")
                        ? "text-blue-600 bg-blue-50 dark:bg-blue-900/30 dark:text-blue-300 font-semibold"
                        : "text-[var(--foreground)] hover:text-blue-600 dark:hover:text-blue-400 hover:bg-gray-100 dark:hover:bg-gray-800/50"
                    } focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2`}
                  >
                    {item.label}
                  </a>
                )}
              </div>
            ))}

            {/* Login Button */}
            <Link
              href="/login"
              className="ml-3 px-5 py-2.5 bg-gradient-to-r from-blue-500 to-indigo-600 dark:from-blue-600 dark:to-indigo-700 text-white rounded-full font-semibold text-sm hover:from-blue-600 hover:to-indigo-700 dark:hover:from-blue-700 dark:hover:to-indigo-800 transition-all duration-300 transform hover:scale-105 shadow-md hover:shadow-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
            >
              Login
            </Link>
          </div>

          {/* Mobile menu button */}
          <button
            className="md:hidden p-2.5 rounded-full hover:bg-gray-100 dark:hover:bg-gray-800/50 transition-colors duration-300"
            onClick={() => setIsMenuOpen(!isMenuOpen)}
            aria-label="Toggle menu"
          >
            <svg className="w-6 h-6 text-[var(--foreground)]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              {isMenuOpen ? (
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" />
              ) : (
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h16M4 18h16" />
              )}
            </svg>
          </button>
        </div>

        {/* Mobile Navigation */}
        {isMenuOpen && (
          <div className="md:hidden absolute top-full left-0 right-0 bg-[var(--background)] border-t border-gray-200 dark:border-gray-700 shadow-lg animate-fade-in-down">
            <div className="px-4 py-4 space-y-2">
              {navItems.map((item) => (
                <div key={item.href}>
                  {item.dropdown ? (
                    <>
                      <button
                        onClick={() => toggleDropdown(`${item.dropdown}-mobile`)}
                        className="w-full flex justify-between items-center px-4 py-3 rounded-lg font-medium text-sm text-[var(--foreground)] hover:bg-gray-100 dark:hover:bg-gray-800/50 hover:text-blue-600 dark:hover:text-blue-400 transition-colors duration-200"
                      >
                        <span>{item.label}</span>
                        <svg
                          className={`w-4 h-4 transition-transform duration-300 ${
                            openDropdown === `${item.dropdown}-mobile` ? "rotate-180" : ""
                          }`}
                          fill="none"
                          stroke="currentColor"
                          viewBox="0 0 24 24"
                        >
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7" />
                        </svg>
                      </button>
                      {openDropdown === `${item.dropdown}-mobile` && (
                        <div className="pl-4 mt-1 space-y-1 animate-fade-in-down">
                          {dropdownItems[item.dropdown].map((dropdownItem, idx) => (
                            <a
                              key={dropdownItem.href}
                              href={dropdownItem.href}
                              onClick={closeMobileMenu}
                              className="block px-4 py-2.5 text-sm text-[var(--foreground)] rounded-lg hover:bg-blue-50 dark:hover:bg-blue-900/50 hover:text-blue-600 dark:hover:text-blue-400 transition-colors duration-200 animate-fade-in-down"
                              style={{ animationDelay: `${idx * 0.05}s` }}
                            >
                              {dropdownItem.name}
                            </a>
                          ))}
                        </div>
                      )}
                    </>
                  ) : (
                    <a
                      href={item.href}
                      onClick={closeMobileMenu}
                      className={`block px-4 py-3 rounded-lg font-medium text-sm transition-colors duration-200 ${
                        activeSection === item.href.replace("#", "")
                          ? "text-blue-600 bg-blue-50 dark:bg-blue-900/30 dark:text-blue-300 font-semibold"
                          : "text-[var(--foreground)] hover:bg-gray-100 dark:hover:bg-gray-800/50 hover:text-blue-600 dark:hover:text-blue-400"
                      }`}
                    >
                      {item.label}
                    </a>
                  )}
                </div>
              ))}

              {/* Mobile Login Button */}
              <Link
                href="/login"
                onClick={closeMobileMenu}
                className="block w-full text-center px-5 py-3 bg-gradient-to-r from-blue-500 to-indigo-600 dark:from-blue-600 dark:to-indigo-700 text-white rounded-full font-semibold text-sm hover:from-blue-600 hover:to-indigo-700 dark:hover:from-blue-700 dark:hover:to-indigo-800 transition-all duration-300 mt-3 shadow-md hover:shadow-lg"
              >
                Login
              </Link>
            </div>
          </div>
        )}
      </div>
    </nav>
  );
}