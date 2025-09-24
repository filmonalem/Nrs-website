"use client";

import { useState, useEffect, useRef, useMemo, useCallback } from 'react';
import { supabase } from '../lib/supabaseClient';
import { 
  UserCircleIcon, 
  ExclamationCircleIcon, 
  EyeIcon,
  MagnifyingGlassIcon,
  ChevronLeftIcon,
  ChevronRightIcon,
  DocumentArrowDownIcon,
  XMarkIcon,
  AdjustmentsHorizontalIcon,
  TrashIcon
} from '@heroicons/react/24/outline';
import Image from 'next/image';
import jsPDF from 'jspdf';
import html2canvas from 'html2canvas';

export default function EmployeeList() {
  const [employees, setEmployees] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);
  const [selectedEmployee, setSelectedEmployee] = useState(null);
  const [currentPage, setCurrentPage] = useState(1);
  const [searchTerm, setSearchTerm] = useState('');
  const [showFilters, setShowFilters] = useState(false);
  const [filters, setFilters] = useState({
    position: '',
    gender: '',
    city: ''
  });
  
  const employeesPerPage = 8;
  const cardRef = useRef(null);

  // Memoized data fetching
  useEffect(() => {
    const fetchEmployees = async () => {
      try {
        setIsLoading(true);
        const { data, error } = await supabase
          .from('employees')
          .select('*')
          .order('createdAt', { ascending: false });

        if (error) throw new Error(error.message);
        
        setEmployees(data || []);
        setError(null);
      } catch (err) {
        setError('Failed to fetch employees: ' + err.message);
        setEmployees([]);
      } finally {
        setIsLoading(false);
      }
    };

    fetchEmployees();
  }, []);
 const handleDeleteEmployee = useCallback(
    async (id) => {
      if (!confirm("Are you sure you want to delete this employee?")) return;

      try {
        const { error } = await supabase.from("employees").delete().eq("id", id);

        if (error) throw new Error(error.message);

        // Update local state after delete
        setEmployees((prev) => prev.filter((emp) => emp.id !== id));

        if (selectedEmployee?.id === id) setSelectedEmployee(null);
      } catch (err) {
        alert("Failed to delete employee: " + err.message);
      }
    },
    [selectedEmployee]
  );

  // Memoized filtered employees
  const filteredEmployees = useMemo(() => {
    return employees.filter(employee => {
      const matchesSearch = searchTerm === '' || 
        employee.fullName?.toLowerCase().includes(searchTerm.toLowerCase()) ||
        employee.position?.toLowerCase().includes(searchTerm.toLowerCase()) ||
        employee.city?.toLowerCase().includes(searchTerm.toLowerCase()) ||
        employee.id?.toString().includes(searchTerm);
      
      const matchesPosition = !filters.position || employee.position === filters.position;
      const matchesGender = !filters.gender || employee.gender === filters.gender;
      const matchesCity = !filters.city || employee.city === filters.city;
      
      return matchesSearch && matchesPosition && matchesGender && matchesCity;
    });
  }, [employees, searchTerm, filters]);

  // Memoized pagination data
  const { currentEmployees, totalPages } = useMemo(() => {
    const totalPages = Math.ceil(filteredEmployees.length / employeesPerPage);
    const indexOfLastEmployee = currentPage * employeesPerPage;
    const indexOfFirstEmployee = indexOfLastEmployee - employeesPerPage;
    const currentEmployees = filteredEmployees.slice(indexOfFirstEmployee, indexOfLastEmployee);
    
    return { currentEmployees, totalPages };
  }, [filteredEmployees, currentPage, employeesPerPage]);

  const downloadIdCard = useCallback(async () => {
    if (!cardRef.current || !selectedEmployee) return;

    try {
      const element = cardRef.current;
      const canvas = await html2canvas(element, {
        scale: 2, 
        useCORS: true,
        backgroundColor: '#ffffff',
        logging: false 
      });
      
      const imgData = canvas.toDataURL('image/jpeg', 0.9);
      const pdf = new jsPDF({
        orientation: 'landscape',
        unit: 'px',
        format: [canvas.width, canvas.height],
      });

      pdf.addImage(imgData, 'JPEG', 0, 0, canvas.width, canvas.height);
      pdf.save(`ID_${selectedEmployee.id}.pdf`);
    } catch (err) {
      console.error('Error generating PDF:', err);
    }
  }, [selectedEmployee]);

  const openPreview = useCallback((employee) => {
    setSelectedEmployee(employee);
  }, []);

  const closePreview = useCallback(() => {
    setSelectedEmployee(null);
  }, []);

  const handlePageChange = useCallback((pageNumber) => {
    setCurrentPage(pageNumber);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }, []);

  const handleFilterChange = useCallback((key, value) => {
    setFilters(prev => ({ ...prev, [key]: value }));
    setCurrentPage(1);
  }, []);

  const clearFilters = useCallback(() => {
    setFilters({ position: '', gender: '', city: '' });
    setSearchTerm('');
  }, []);

  // Get unique values for filters
  const filterOptions = useMemo(() => {
    const positions = [...new Set(employees.map(e => e.position).filter(Boolean))];
    const genders = [...new Set(employees.map(e => e.gender).filter(Boolean))];
    const cities = [...new Set(employees.map(e => e.city).filter(Boolean))];
    
    return { positions, genders, cities };
  }, [employees]);

  if (isLoading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-blue-50 to-blue-100 flex items-center justify-center p-4">
        <div className="text-center">
          <div className="animate-spin rounded-full h-10 w-10 border-t-2 border-b-2 border-blue-600 mx-auto"></div>
          <p className="mt-3 text-gray-600 text-sm font-medium">Loading employees...</p>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-blue-50 to-blue-100 flex items-center justify-center p-4">
        <div className="text-center text-red-600 bg-white p-6 rounded-xl shadow-lg max-w-md">
          <ExclamationCircleIcon className="h-10 w-10 mx-auto mb-3" />
          <p className="text-base font-medium">{error}</p>
          <button 
            onClick={() => window.location.reload()}
            className="mt-3 px-3 py-1.5 bg-blue-600 text-white rounded-lg text-sm hover:bg-blue-700 transition-colors"
          >
            Try Again
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-blue-100 py-4 px-3 sm:px-4 lg:px-6">
      <div className="max-w-6xl mx-auto bg-white rounded-xl shadow-md overflow-hidden">
        {/* Header */}
        <div className="bg-gray-100 text-brown-800 p-4 text-center border-b">
          <h2 className="text-xl sm:text-2xl font-bold">Employee Directory</h2>
          <p className="text-xs sm:text-sm text-gray-600 mt-1">Rainbows for Children School</p>
        </div>

        {/* Search and Filters */}
        <div className="p-4 border-b border-gray-200 bg-gray-50">
          <div className="flex flex-col sm:flex-row gap-3">
            <div className="relative flex-1">
              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                <MagnifyingGlassIcon className="h-4 w-4 text-gray-400" />
              </div>
              <input
                type="text"
                placeholder="Search employees..."
                className="block w-full pl-9 pr-3 py-2 text-sm border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
            </div>
            
            <button
              onClick={() => setShowFilters(!showFilters)}
              className="flex items-center justify-center px-3 py-2 text-sm border border-gray-300 rounded-lg bg-white hover:bg-gray-50"
            >
              <AdjustmentsHorizontalIcon className="h-4 w-4 mr-1" />
              Filters
            </button>
          </div>

          {/* Filter Options */}
          {showFilters && (
            <div className="mt-3 p-3 bg-white rounded-lg border border-gray-200 grid grid-cols-1 sm:grid-cols-3 gap-3">
              <div>
                <label className="block text-xs font-medium text-gray-700 mb-1">Position</label>
                <select
                  className="w-full text-sm border border-gray-300 rounded-md px-2 py-1.5"
                  value={filters.position}
                  onChange={(e) => handleFilterChange('position', e.target.value)}
                >
                  <option value="">All Positions</option>
                  {filterOptions.positions.map(pos => (
                    <option key={pos} value={pos}>{pos}</option>
                  ))}
                </select>
              </div>
              
              <div>
                <label className="block text-xs font-medium text-gray-700 mb-1">Gender</label>
                <select
                  className="w-full text-sm border border-gray-300 rounded-md px-2 py-1.5"
                  value={filters.gender}
                  onChange={(e) => handleFilterChange('gender', e.target.value)}
                >
                  <option value="">All Genders</option>
                  {filterOptions.genders.map(gender => (
                    <option key={gender} value={gender}>{gender}</option>
                  ))}
                </select>
              </div>
              
              <div>
                <label className="block text-xs font-medium text-gray-700 mb-1">City</label>
                <select
                  className="w-full text-sm border border-gray-300 rounded-md px-2 py-1.5"
                  value={filters.city}
                  onChange={(e) => handleFilterChange('city', e.target.value)}
                >
                  <option value="">All Cities</option>
                  {filterOptions.cities.map(city => (
                    <option key={city} value={city}>{city}</option>
                  ))}
                </select>
              </div>
              
              <div className="sm:col-span-3 flex justify-end">
                <button
                  onClick={clearFilters}
                  className="text-xs text-blue-600 hover:text-blue-800"
                >
                  Clear all filters
                </button>
              </div>
            </div>
          )}
        </div>

        {/* Employee Table */}
        <div className="p-4 overflow-x-auto">
          {filteredEmployees.length === 0 ? (
            <div className="text-center text-gray-500 py-8">
              <UserCircleIcon className="h-12 w-12 text-gray-300 mx-auto mb-3" />
              <p className="text-sm font-medium">No employees found</p>
              <p className="text-xs mt-1">
                {employees.length > 0 ? 'Try adjusting your search or filters' : 'Add employees to get started'}
              </p>
            </div>
          ) : (
            <>
              <div className="rounded-lg border border-gray-200 overflow-hidden shadow-xs">
               <table className="min-w-full divide-y divide-gray-200 text-sm">
  <thead className="bg-gray-50">
    <tr>
      <th className="sticky left-0 z-10 bg-gray-50 px-3 py-2 text-left text-xs font-medium text-gray-500 uppercase tracking-wider shadow-md">
        ID
      </th>
      <th className="px-3 py-2 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
        Name
      </th>
      <th className="px-3 py-2 text-left text-xs font-medium text-gray-500 uppercase tracking-wider hidden sm:table-cell">
        Position
      </th>
      <th className="px-3 py-2 text-left text-xs font-medium text-gray-500 uppercase tracking-wider hidden md:table-cell">
        Gender
      </th>
      <th className="px-3 py-2 text-left text-xs font-medium text-gray-500 uppercase tracking-wider hidden lg:table-cell">
        Phone
      </th>
      <th className="px-3 py-2 text-left text-xs font-medium text-gray-500 uppercase tracking-wider hidden md:table-cell">
        City
      </th>
      <th className="px-3 py-2 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">
        Action
      </th>
    </tr>
  </thead>
  <tbody className="bg-white divide-y divide-gray-200">
    {currentEmployees.map((employee, index) => (
      <tr key={employee.id} className="hover:bg-blue-50/30 transition-colors">
        <td className="sticky left-0 z-10 bg-white px-3 py-2 whitespace-nowrap shadow-md">
          <span className="inline-flex items-center px-2 py-0.5 rounded text-xs font-medium bg-blue-100 text-blue-800">
            {(currentPage - 1) * employeesPerPage + index + 1}
          </span>
        </td>
                        <td className="px-3 py-2 whitespace-nowrap font-medium text-gray-900">
                          <div className="flex items-center">
                            <div className="flex-shrink-0 h-8 w-8">
                              {employee.profileImage ? (
                                <Image
                                  className="h-8 w-8 rounded-full object-cover"
                                  src={employee.profileImage}
                                  alt={employee.fullName}
                                  width={32}
                                  height={32}
                                />
                              ) : (
                                <UserCircleIcon className="h-8 w-8 text-gray-400" />
                              )}
                            </div>
                            <div className="ml-2">
                              <div className="text-xs sm:text-sm">{employee.fullName}</div>
                              <div className="text-xs text-gray-500 sm:hidden">{employee.position}</div>
                            </div>
                          </div>
                        </td>
                        <td className="px-3 py-2 whitespace-nowrap text-gray-700 hidden sm:table-cell">
                          {employee.position}
                        </td>
                        <td className="px-3 py-2 whitespace-nowrap hidden md:table-cell">
                          <span className={`inline-flex items-center px-2 py-0.5 rounded text-xs font-medium ${
                            employee.gender === 'Male' 
                              ? 'bg-blue-100 text-blue-800' 
                              : employee.gender === 'Female'
                              ? 'bg-pink-100 text-pink-800'
                              : 'bg-gray-100 text-gray-800'
                          }`}>
                            {employee.gender || 'N/A'}
                          </span>
                        </td>
                        <td className="px-3 py-2 whitespace-nowrap text-gray-700 hidden lg:table-cell">
                          {employee.phone || 'N/A'}
                        </td>
                        <td className="px-3 py-2 whitespace-nowrap text-gray-700 hidden md:table-cell">
                          {employee.city || 'N/A'}
                        </td>
                       <td className="px-3 py-2 text-right space-x-2">
                          <button
                            onClick={() => setSelectedEmployee(employee)}
                            className="px-2 py-1 text-xs   rounded hover:bg-blue-700"
                          >
                            <EyeIcon className="h-4 w-4 text-green-500 inline mr-1" />
                            
                          </button>
                          <button
                            onClick={() => handleDeleteEmployee(employee.id)}
                            className="px-2 py-1 text-xs   rounded hover:bg-red-700"
                          >
                            <TrashIcon className="h-4 w-4 text-red-600 inline mr-1" />
                           
                          </button>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>

              {/* Pagination */}
              <div className="mt-4 flex flex-col sm:flex-row items-center justify-between space-y-2 sm:space-y-0">
                <div className="text-xs text-gray-600">
                  Showing <span className="font-medium">{Math.min(filteredEmployees.length, 1)}</span> to{' '}
                  <span className="font-medium">
                    {Math.min(currentPage * employeesPerPage, filteredEmployees.length)}
                  </span> of{' '}
                  <span className="font-medium">{filteredEmployees.length}</span> employees
                </div>
                
                <div className="flex items-center space-x-1">
                  <button
                    onClick={() => handlePageChange(currentPage - 1)}
                    disabled={currentPage === 1}
                    className="p-1.5 rounded border border-gray-300 bg-white disabled:opacity-50 disabled:cursor-not-allowed"
                  >
                    <ChevronLeftIcon className="h-3 w-3" />
                  </button>
                  
                  {Array.from({ length: Math.min(5, totalPages) }, (_, i) => {
                    const page = Math.max(1, Math.min(currentPage - 2, totalPages - 4)) + i;
                    if (page > totalPages) return null;
                    
                    return (
                      <button
                        key={page}
                        onClick={() => handlePageChange(page)}
                        className={`px-2 py-1 text-xs rounded border ${
                          currentPage === page
                            ? 'bg-blue-600 border-blue-600 text-white'
                            : 'border-gray-300 bg-white text-gray-700'
                        }`}
                      >
                        {page}
                      </button>
                    );
                  })}
                  
                  <button
                    onClick={() => handlePageChange(currentPage + 1)}
                    disabled={currentPage === totalPages}
                    className="p-1.5 rounded border border-gray-300 bg-white disabled:opacity-50 disabled:cursor-not-allowed"
                  >
                    <ChevronRightIcon className="h-3 w-3" />
                  </button>
                </div>
              </div>
            </>
          )}
        </div>
      </div>
{/* Modal for ID Preview */}
{selectedEmployee && (
  <div className="fixed inset-0 bg-black bg-opacity-60 flex items-center justify-center z-50 p-4 backdrop-blur-sm">
    <div className="bg-white rounded-2xl max-w-4xl w-full p-6 relative max-h-[90vh] overflow-y-auto">
      <button
        onClick={closePreview}
        className="absolute top-4 right-4 text-gray-600 hover:text-gray-800 bg-gray-100 rounded-full p-1 transition-colors duration-300"
      >
        <XMarkIcon className="h-6 w-6" />
      </button>
      
      <h3 className="text-xl font-semibold text-gray-800 mb-4">Employee ID Card</h3>
      
      <div ref={cardRef} className="flex flex-col md:flex-row gap-6 justify-center">
        {/* FRONT SIDE */}
        <div className="w-80 h-[500px] bg-white rounded-2xl shadow-2xl border-2 border-blue-100 relative overflow-hidden">
          <div className="absolute inset-0 -z-10 bg-gradient-to-r from-blue-300 to-blue-500 rounded-2xl blur-3xl opacity-10"></div>
          <div className="bg-gradient-to-r from-blue-700 to-indigo-600 text-white p-4 flex flex-col items-center">
            <Image
              src="/images/logo.jpg"
              alt="Logo"
              width={56}
              height={56}
              className="h-14 w-auto mb-3 object-contain"
            />
            <h2 className="text-lg font-bold uppercase tracking-wider">Rainbows for Children</h2>
          </div>
          <div className="flex justify-center mt-6">
            <div className="w-32 h-32 rounded-md border-4  overflow-hidden shadow-md bg-white">
              {selectedEmployee.profileImage ? (
                <Image
                  src={selectedEmployee.profileImage}
                  alt={selectedEmployee.fullName}
                  width={128}
                  height={128}
                  className="w-full h-full object-cover"
                />
              ) : (
                <div className="w-full h-full bg-gray-100 flex items-center justify-center">
                  <UserCircleIcon className="h-16 w-16 text-gray-400" />
                </div>
              )}
            </div>
          </div>
          {/* Aligned details */}
          <div className="px-6 mt-6 space-y-3 text-gray-800 text-sm">
            <div className="flex justify-between"><span className="font-semibold">ID:</span><span>{selectedEmployee.token}</span></div>
            <div className="flex justify-between"><span className="font-semibold">Name:</span><span>{selectedEmployee.fullName}</span></div>
            <div className="flex justify-between"><span className="font-semibold">Gender:</span><span>{selectedEmployee.gender || 'N/A'}</span></div>
            <div className="flex justify-between"><span className="font-semibold">Address:</span><span>{selectedEmployee.address || 'N/A'}</span></div>
            <div className="flex justify-between"><span className="font-semibold">City/Zone:</span><span>{selectedEmployee.city || 'N/A'}</span></div>
            <div className="flex justify-between"><span className="font-semibold">Sub City:</span><span>{selectedEmployee.subCity || 'N/A'}</span></div>
            <div className="flex justify-between"><span className="font-semibold">Position:</span><span>{selectedEmployee.position}</span></div>
          </div>
        </div>

        {/* BACK SIDE */}
        <div className="w-80 h-[500px] bg-white rounded-2xl shadow-2xl border-2 border-blue-100 relative overflow-hidden">
          <div className="absolute inset-0 -z-10 bg-gradient-to-r from-blue-300 to-blue-500 rounded-2xl blur-3xl opacity-10"></div>
          <div className="bg-gradient-to-r from-blue-700 to-indigo-600 text-white p-4 text-center">
            <h2 className="text-lg font-bold uppercase tracking-wider">Employee Information</h2>
          </div>
          {/* Aligned details */}
          <div className="px-6 mt-8 space-y-4 text-gray-800 text-sm">
            <div className="flex justify-between"><span className="font-semibold">ID:</span><span>{selectedEmployee.token}</span></div>
            <div className="flex justify-between"><span className="font-semibold">Blood Type:</span><span>{selectedEmployee.bloodType || 'N/A'}</span></div>
            <div className="flex justify-between"><span className="font-semibold">Phone:</span><span>{selectedEmployee.phone || 'N/A'}</span></div>
            <div className="flex justify-between"><span className="font-semibold">Issued On:</span><span>{selectedEmployee.idIssuedOn || 'N/A'}</span></div>
          </div>

          {selectedEmployee.qrCode && (
            <div className="absolute bottom-20 w-full flex justify-center">
              <div className="w-28 h-28 border-2 border-gray-200 p-2 rounded-lg bg-white shadow-sm">
                <Image
                  src={selectedEmployee.qrCode}
                  alt="QR Code"
                  width={112}
                  height={112}
                  className="w-full h-full object-contain"
                />
              </div>
            </div>
          )}

          <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-r from-blue-700 to-indigo-600 text-white text-xs text-center py-3">
            <p className="font-medium">www.rainbows4children.org</p>
            <p>TB1-0344-415722/03 | 212400138/03</p>
            <p>443 | 29212106186</p>
            <p>P.O. Box 1030</p>
          </div>
        </div>
      </div>
      
      <div className="mt-6 flex justify-center">
        <button
          onClick={downloadIdCard}
          className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 transition-colors"
        >
          <DocumentArrowDownIcon className="h-5 w-5 mr-2" />
          Download ID Card
        </button>
      </div>
    </div>
  </div>
)}

    </div>
  );
}