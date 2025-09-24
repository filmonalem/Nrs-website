"use client";
import React, { useState } from "react";
import { TourProvider, useTour } from "@reactour/tour";
import {
  FaChartLine,
  FaClipboardList,
  FaHome,
  FaQuestionCircle,
  FaUsers,
  FaBuilding,
  FaMoneyCheckAlt,
} from "react-icons/fa";
import Footer from "../home/Footer";

const tourSteps = [
  {
    selector: ".dashboard-section",
    content: "Welcome to Auraja's Brokerage Dashboard! This is your central hub for managing property listings, sales, and client interactions.",
  },
  {
    selector: ".inventory-section",
    content: "Manage your property inventory here. Track available listings, update details, and monitor market trends in real time.",
  },
  {
    selector: ".sales-section",
    content: "Oversee property and vehicle sales, process client payments, and manage transaction records efficiently.",
  },
  {
    selector: ".customers-section",
    content: "Engage with your clients here. Manage buyer and seller profiles, track inquiries, and provide personalized service.",
  },
  {
    selector: ".reports-section",
    content: "Access detailed reports on sales performance, property inventory, and financial metrics to drive your brokerage decisions.",
  },
];

const HelpComponent = () => {
  const { setIsOpen } = useTour();

  return (
    <div className="min-h-screen bg-gray-100">
      {/* Hero Section */}
      <div className="pt-24 pb-12 text-center bg-gradient-to-b from-gray-100 to-gray-200">
        <h1 className="text-4xl md:text-5xl font-extrabold text-[#153c67] mb-4 tracking-tight animate-fade-in">
          Master Your Real Estate Brokerage
        </h1>
        <p className="text-lg text-gray-600 max-w-3xl mx-auto mb-6 animate-fade-in">
          Learn how to leverage Auraja's tools to manage properties, streamline sales, and delight clients.
        </p>
      </div>
      
      {/* Header Section */}
      <header className="mt-12 left-0 w-full z-50 backdrop-blur-md">
        <div className="max-w-7xl mx-auto px-4 py-4 flex justify-between items-center">
          <div className="flex items-center">
            <h1 className="text-2xl font-extrabold text-[#153c67] bg-gradient-to-r from-[#153c67] to-[#fe5b00] bg-clip-text text-transparent">
              Help Center
            </h1>
          </div>
          <button
            onClick={() => setIsOpen(true)}
            className="flex items-center gap-2 px-6 py-2 bg-[#fe5b00] text-white rounded-full hover:bg-[#153c67] transition-all duration-300 font-semibold"
            aria-label="Start guided tour"
          >
            <FaQuestionCircle className="text-lg" />
            Start Tour
          </button>
        </div>
      </header>

      {/* Main Features Grid */}
      <div className="max-w-7xl mx-auto px-4 py-12">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          <div className="dashboard-section bg-white rounded-xl shadow-md p-6 hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1 animate-fade-in">
            <div className="flex items-center gap-3 mb-4">
              <FaHome className="text-3xl text-[#fe5b00]" />
              <h2 className="text-xl font-semibold text-[#153c67]">Brokerage Dashboard</h2>
            </div>
            <ul className="space-y-2 text-gray-600 text-sm">
              <li>• View key performance metrics</li>
              <li>• Monitor active property listings</li>
              <li>• Access real-time updates</li>
            </ul>
          </div>

          {/* Inventory Section */}
          <div className="inventory-section bg-white rounded-xl shadow-md p-6 hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1 animate-fade-in">
            <div className="flex items-center gap-3 mb-4">
              <FaBuilding className="text-3xl text-[#fe5b00]" />
              <h2 className="text-xl font-semibold text-[#153c67]">Property Inventory</h2>
            </div>
            <ul className="space-y-2 text-gray-600 text-sm">
              <li>• Add and update listings</li>
              <li>• Track property availability</li>
              <li>• Analyze market pricing trends</li>
            </ul>
          </div>

          {/* Sales Section */}
          <div className="sales-section bg-white rounded-xl shadow-md p-6 hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1 animate-fade-in">
            <div className="flex items-center gap-3 mb-4">
              <FaMoneyCheckAlt className="text-3xl text-[#fe5b00]" />
              <h2 className="text-xl font-semibold text-[#153c67]">Sales Management</h2>
            </div>
            <ul className="space-y-2 text-gray-600 text-sm">
              <li>• Create new sales agreements</li>
              <li>• Process client payments</li>
              <li>• Manage transaction records</li>
            </ul>
          </div>

          {/* Customers Section */}
          <div className="customers-section bg-white rounded-xl shadow-md p-6 hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1 animate-fade-in">
            <div className="flex items-center gap-3 mb-4">
              <FaUsers className="text-3xl text-[#fe5b00]" />
              <h2 className="text-xl font-semibold text-[#153c67]">Client Management</h2>
            </div>
            <ul className="space-y-2 text-gray-600 text-sm">
              <li>• Organize client profiles</li>
              <li>• Track inquiries and preferences</li>
              <li>• Provide personalized support</li>
            </ul>
          </div>

          {/* Reports Section */}
          <div className="reports-section bg-white rounded-xl shadow-md p-6 hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1 animate-fade-in">
            <div className="flex items-center gap-3 mb-4">
              <FaChartLine className="text-3xl text-[#fe5b00]" />
              <h2 className="text-xl font-semibold text-[#153c67]">Analytics & Reports</h2>
            </div>
            <ul className="space-y-2 text-gray-600 text-sm">
              <li>• Generate sales reports</li>
              <li>• Monitor inventory turnover</li>
              <li>• Analyze financial performance</li>
            </ul>
          </div>
        </div>

        {/* Quick Tips Section */}
        <div className="mt-12 bg-white rounded-xl shadow-md p-8 animate-fade-in">
          <h2 className="text-2xl font-semibold text-[#153c67] mb-6 flex items-center gap-2">
            <FaClipboardList className="text-[#fe5b00]" />
            Quick Tips for Success
          </h2>
          <div className="grid md:grid-cols-2 gap-6">
            <div className="border-l-4 border-[#fe5b00] pl-4">
              <h3 className="font-semibold text-lg text-[#153c67] mb-2">Getting Started</h3>
              <p className="text-gray-600 text-sm">
                Familiarize yourself with the dashboard to manage your brokerage efficiently.
              </p>
            </div>
            <div className="border-l-4 border-[#fe5b00] pl-4">
              <h3 className="font-semibold text-lg text-[#153c67] mb-2">Best Practices</h3>
              <p className="text-gray-600 text-sm">
                Optimize listings with high-quality photos and detailed descriptions.
              </p>
            </div>
            <div className="border-l-4 border-[#fe5b00] pl-4">
              <h3 className="font-semibold text-lg text-[#153c67] mb-2">Daily Workflow</h3>
              <p className="text-gray-600 text-sm">
                Review sales, update inventory, and respond to client inquiries daily.
              </p>
            </div>
            <div className="border-l-4 border-[#fe5b00] pl-4">
              <h3 className="font-semibold text-lg text-[#153c67] mb-2">Need Support?</h3>
              <p className="text-gray-600 text-sm">
                Contact our team for personalized assistance with your brokerage tools.
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Footer */}
      <Footer />

      <style jsx>{`
        .animate-fade-in {
          animation: fadeIn 0.5s ease-in-out;
        }
        @keyframes fadeIn {
          from {
            opacity: 0;
            transform: translateY(20px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }
      `}</style>
    </div>
  );
};

export default function HelpPage() {
  return (
    <TourProvider
      steps={tourSteps}
      styles={{
        popover: (base) => ({
          ...base,
          backgroundColor: "#ffffff",
          color: "#153c67",
          borderRadius: "12px",
          padding: "20px",
        }),
        badge: (base) => ({
          ...base,
          backgroundColor: "#fe5b00",
        }),
        close: (base) => ({
          ...base,
          color: "#153c67",
        }),
      }}
    >
      <HelpComponent />
    </TourProvider>
  );
}