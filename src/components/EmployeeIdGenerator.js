'use client';

import { useState, useRef } from 'react';
import QRCode from 'qrcode';
import Image from 'next/image';
import {
  QrCodeIcon,
  UserCircleIcon,
  ArrowPathIcon,
  CloudArrowDownIcon,
  CameraIcon,
} from '@heroicons/react/24/outline';
import { supabase } from '../lib/supabaseClient';

export default function EmployeeIdGenerator() {
  const [formData, setFormData] = useState({
    fullName: '',
    gender: '',
    phone: '',
    address: '',
    city: '',
    subCity: '',
    position: '',
    bloodType: '',
    idIssuedOn: new Date().toISOString().split('T')[0],
  });

  const [profileImageFile, setProfileImageFile] = useState(null);
  const [profileImageUrl, setProfileImageUrl] = useState(null);
  const [qrImageUrl, setQrImageUrl] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [saveSuccess, setSaveSuccess] = useState(false);

  const profileFileInputRef = useRef(null);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleFileUpload = (e) => {
    const file = e.target.files?.[0];
    if (file) {
      if (!file.type.startsWith('image/')) {
        alert('⚠️ Please select an image file');
        return;
      }
      if (file.size > 2 * 1024 * 1024) {
        alert('⚠️ Please select an image smaller than 2MB');
        return;
      }
      setProfileImageFile(file);
      const reader = new FileReader();
      reader.onload = () => setProfileImageUrl(reader.result);
      reader.readAsDataURL(file);
    }
  };

  const randomString = (length) => {
    const chars = "ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789";
    return Array.from({ length }, () => chars[Math.floor(Math.random() * chars.length)]).join("");
  };

  const formatPosition = (position) => {
    if (!position) return "NA";
    return position
      .split(" ")
      .map((word) => word[0].toUpperCase())
      .join(""); 
  };

  const saveToSupabase = async (employeeInfo) => {
    const { error } = await supabase.from("employees").insert([employeeInfo]);
    if (error) {
      console.error("Supabase error:", error.message);
      return false;
    }
    return true;
  };

  const validateForm = () => {
    const requiredFields = ['fullName', 'gender', 'phone', 'address', 'city', 'subCity', 'position'];
    for (const field of requiredFields) {
      if (!formData[field].trim()) {
        alert(`⚠️ Please fill in the ${field.replace(/([A-Z])/g, ' $1').toLowerCase()}`);
        return false;
      }
    }
    if (!profileImageUrl) {
      alert('⚠️ Please upload a profile image');
      return false;
    }
    const phoneRegex = /^(\+?\d{1,4}?[-.\s]?)?(\(?\d{1,3}?\)?[-.\s]?)?\d{1,4}[-.\s]?\d{1,4}[-.\s]?\d{1,9}$/;
    if (!phoneRegex.test(formData.phone)) {
      alert('⚠️ Please enter a valid phone number');
      return false;
    }
    return true;
  };

  const generateQRAndSave = async () => {
    if (!validateForm()) return;
    setIsLoading(true);
    try {
      const uniqueId = "emp-" + Date.now().toString(36) + "-" + Math.random().toString(36).substring(2, 10);
      const positionCode = formatPosition(formData.position);
      const token = `TDVA-NRS-${positionCode}-${randomString(12)}`;
const qrData = `https://nrs-employeeid.vercel.app/employee/${token}`;

      const qrUrl = await QRCode.toDataURL(qrData);
      setQrImageUrl(qrUrl);

      const employeeInfo = {
        id: uniqueId,
        ...formData,
        profileImage: profileImageUrl,
        qrCode: qrUrl,
        qrUrl: qrData,
        token,
        createdAt: new Date().toISOString(),
      };

      const saved = await saveToSupabase(employeeInfo);
      setSaveSuccess(saved);
      alert(saved ? "✅ Employee saved successfully!" : "⚠️ Failed to save employee data");
    } catch (error) {
      alert(`❌ Error: ${error.message}`);
    } finally {
      setIsLoading(false);
    }
  };

  const downloadQR = () => {
    if (!qrImageUrl) return;
    const link = document.createElement('a');
    link.href = qrImageUrl;
    link.download = `employee-${formData.fullName || 'id'}.png`;
    link.click();
  };

  const resetForm = () => {
    setFormData({
      fullName: '',
      gender: '',
      phone: '',
      address: '',
      city: '',
      subCity: '',
      position: '',
      bloodType: '',
      idIssuedOn: new Date().toISOString().split('T')[0],
    });
    setProfileImageFile(null);
    setProfileImageUrl(null);
    setQrImageUrl(null);
    setSaveSuccess(false);
    if (profileFileInputRef.current) profileFileInputRef.current.value = '';
  };
  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-indigo-50 to-purple-50  px-4 sm:px-6 lg:px-2">
      <div className="max-w-6xl mx-auto bg-white rounded-2xl shadow-xl overflow-hidden">
        
        {/* Form and Preview Container */}
        <div className="flex flex-col lg:flex-row p-6 md:p-8">
          {/* Form Section */}
          <div className="lg:w-2/3 lg:pr-8">
            <section className="mb-8">
              <h2 className="text-xl font-semibold text-gray-800 mb-6 flex items-center">
                <UserCircleIcon className="h-6 w-6 mr-3 text-blue-600" />
                Employee Information
              </h2>

              <div className="grid grid-cols-1 gap-5 md:grid-cols-2">
                {/* Profile Image */}
                <div className="md:col-span-2">
                  <label className="block text-sm font-medium text-gray-700 mb-2">Profile Image *</label>
                  <div className="flex flex-col sm:flex-row items-start sm:items-center space-y-4 sm:space-y-0 sm:space-x-6">
                    <div className="relative">
                      {profileImageUrl ? (
                        <div className="relative">
                          <Image
                            src={profileImageUrl}
                            alt="Profile"
                            width={96}
                            height={96}
                            className="rounded-full object-cover border-4 border-blue-100 shadow-sm"
                          />
                          <button 
                            onClick={() => profileFileInputRef.current?.click()}
                            className="absolute bottom-0 right-0 bg-blue-600 text-white p-1.5 rounded-full shadow-md hover:bg-blue-700 transition-colors"
                          >
                            <CameraIcon className="h-4 w-4" />
                          </button>
                        </div>
                      ) : (
                        <div 
                          onClick={() => profileFileInputRef.current?.click()}
                          className="w-24 h-24 rounded-full bg-gray-100 flex flex-col items-center justify-center border-2 border-dashed border-gray-300 cursor-pointer hover:border-blue-400 transition-colors"
                        >
                          <UserCircleIcon className="h-8 w-8 text-gray-400 mb-1" />
                          <span className="text-xs text-gray-500">Upload Photo</span>
                        </div>
                      )}
                      <input
                        type="file"
                        accept="image/*"
                        onChange={handleFileUpload}
                        ref={profileFileInputRef}
                        className="hidden"
                      />
                    </div>
                    <div className="text-sm text-gray-500">
                      <p>Please upload a clear headshot</p>
                      <p>Max file size: 2MB</p>
                      <p>Supported formats: JPG, PNG</p>
                    </div>
                  </div>
                </div>

                {/* Fields */}
                {[
                  { label: 'Full Name *', name: 'fullName', placeholder: 'John Doe', type: 'text' },
                  { label: 'Gender *', name: 'gender', placeholder: 'Male/Female/Other', type: 'text' },
                  { label: 'Phone Number *', name: 'phone', placeholder: '+251 911 234567', type: 'tel' },
                  { label: 'Address *', name: 'address', placeholder: '123 Main St', type: 'text', fullWidth: true },
                  { label: 'City/Zone *', name: 'city', placeholder: 'Addis Ababa', type: 'text' },
                  { label: 'Sub City *', name: 'subCity', placeholder: 'Bole', type: 'text' },
                  { label: 'Position *', name: 'position', placeholder: 'Software Engineer', type: 'text' },
                  { label: 'Blood Type', name: 'bloodType', placeholder: 'O+', type: 'text' },
                  { label: 'ID Issued On *', name: 'idIssuedOn', type: 'date', fullWidth: true },
                ].map((field) => (
                  <div key={field.name} className={field.fullWidth ? 'md:col-span-2' : ''}>
                    <label className="block text-sm font-medium text-gray-700 mb-1.5">
                      {field.label}
                    </label>
                    <input
                      name={field.name}
                      value={formData[field.name]}
                      onChange={handleChange}
                      type={field.type || 'text'}
                      placeholder={field.placeholder}
                      className="w-full px-4 py-2.5 border border-gray-200 rounded-lg shadow-sm
                        focus:ring-2 focus:ring-blue-400 focus:border-blue-500 transition-colors
                        bg-white text-gray-900 placeholder-gray-400"
                    />
                  </div>
                ))}
              </div>
            </section>

            {/* Buttons */}
            <div className="flex flex-col sm:flex-row gap-4 mb-8">
              <button
                onClick={generateQRAndSave}
                disabled={isLoading}
                className={`flex-1 flex items-center justify-center py-3 px-6 rounded-lg font-semibold
                  transition-all shadow-md ${
                    isLoading
                      ? 'bg-blue-300 cursor-not-allowed'
                      : 'bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 text-white hover:shadow-lg'
                  }`}
              >
                {isLoading ? (
                  <>
                    <ArrowPathIcon className="h-5 w-5 mr-2 animate-spin" />
                    Generating...
                  </>
                ) : (
                  <>
                    <QrCodeIcon className="h-5 w-5 mr-2" />
                    Generate & Save ID
                  </>
                )}
              </button>

              <button
                onClick={resetForm}
                className="flex-1 flex items-center justify-center py-3 px-6 bg-gray-100
                  hover:bg-gray-200 text-gray-800 rounded-lg font-semibold transition-all
                  shadow-sm hover:shadow-md"
              >
                <ArrowPathIcon className="h-5 w-5 mr-2" />
                Reset Form
              </button>
            </div>
          </div>

          {/* Preview Section */}
          <div className="lg:w-1/3 lg:border-l lg:border-gray-200 lg:pl-8 pt-8 lg:pt-0">
            <h3 className="text-lg font-semibold mb-4 text-gray-800">ID Card Preview</h3>
            
            {qrImageUrl ? (
              <div className="space-y-6">
                {/* ID Card */}
                <div className="w-full max-w-xs mx-auto bg-white rounded-xl shadow-lg border border-gray-200 overflow-hidden">
                
                  
                  {/* Content */}
                  <div className="p-5 text-center">
                    {profileImageUrl && (
                      <div className="mb-4">
                        <Image
                          src={profileImageUrl}
                          alt="Profile"
                          width={80}
                          height={80}
                          className="mx-auto rounded-full object-cover border-4 border-blue-100 shadow"
                        />
                      </div>
                    )}
                    <h2 className="text-lg font-bold text-gray-800 truncate">{formData.fullName || 'Employee Name'}</h2>
                    <p className="text-sm text-gray-600">{formData.position || 'Position'}</p>
                    <p className="text-xs text-gray-500 mt-1">{formData.phone || 'Phone'}</p>
                    
                    <div className="mt-4 flex justify-center">
                      <Image 
                        src={qrImageUrl} 
                        alt="QR Code" 
                        width={100} 
                        height={100} 
                        className="border border-gray-200 rounded"
                      />
                    </div>
                    
                    <div className="mt-4 text-xs text-gray-500 space-y-1">
                      {formData.bloodType && <p>Blood Type: {formData.bloodType}</p>}
                      <p>Issued: {formData.idIssuedOn || new Date().toISOString().split('T')[0]}</p>
                    </div>
                  </div>
                  
                  {/* Footer */}
                  <div className="bg-gray-100 text-xs text-center text-gray-600">
                    <p>www.rainbows4children.org</p>
                  </div>
                </div>

                {/* Download Button */}
                <div className="text-center">
                  <button
                    onClick={downloadQR}
                    className="inline-flex items-center px-5 py-2.5 bg-indigo-600
                      hover:bg-indigo-700 text-white rounded-lg font-semibold transition-all
                      shadow-md hover:shadow-lg"
                  >
                    <CloudArrowDownIcon className="h-5 w-5 mr-2" />
                    Download QR Code
                  </button>
                </div>
                
                {saveSuccess && (
                  <div className="bg-green-100 border border-green-200 text-green-700 px-4 py-3 rounded-lg text-sm">
                    ✅ Employee saved successfully!
                  </div>
                )}
              </div>
            ) : (
              <div className="bg-gray-50 rounded-xl p-8 text-center border border-dashed border-gray-300">
                <div className="bg-gray-100 p-4 rounded-full inline-flex items-center justify-center mb-4">
                  <QrCodeIcon className="h-8 w-8 text-gray-400" />
                </div>
                <h4 className="text-gray-500 font-medium">Preview will appear here</h4>
                <p className="text-sm text-gray-400 mt-1">Fill the form and generate ID to see preview</p>
              </div>
            )}
          </div>
        </div>

        {/* Footer */}
        <div className="bg-gray-100 px-6 py-4 text-center text-sm text-gray-500 border-t border-gray-200">
          <p>© {new Date().getFullYear()} Rainbows for Children | Employee ID System</p>
        </div>
      </div>
    </div>
  );
}