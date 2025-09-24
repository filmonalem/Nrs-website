'use client';
import { useState, useEffect } from 'react';
import { FaUser, FaEnvelope, FaPhone, FaBuilding, FaUserTag, FaCalendar } from 'react-icons/fa';
import { useSelector, useDispatch } from 'react-redux';
import { getAllUserReducer, users } from '../../../store/redux/user';
import Image from 'next/image';

const Profile = () => {
  const dispatch = useDispatch();
  const allUsers = useSelector(users) || [];
  const [userProfile, setUserProfile] = useState({
    fullName: '',
    email: '',
    phone: '',
    department: '',
    role: '',
    joinDate: '',
    // avatar: '/default-avatar.png', 
    status: '',
  });

  useEffect(() => {
    dispatch(getAllUserReducer());
  }, [dispatch]);

  useEffect(() => {
    const userId = localStorage.getItem('userId');
    const currentUser = allUsers.find(user => user.userId === userId);

    if (currentUser) {
      setUserProfile({
        fullName: currentUser.fullName || '',
        email: currentUser.email || '',
        phone: currentUser.phone || '',
        department: currentUser.department || '',
        role: currentUser.role || '',
        joinDate: currentUser.createdAt ? new Date(currentUser.createdAt).toLocaleDateString() : '',
        avatar: currentUser.avatar || '/default-avatar.png',
        status: currentUser.isActive ? 'Active' : 'Inactive',
      });
    }
  }, [allUsers]);

  return (
    <div title="Profile">
      <div className="min-h-screen bg-gray-50 py-8 px-4 sm:px-6 lg:px-8">
        <div className="max-w-4xl mx-auto">
          <div className="bg-white rounded-xl shadow-lg overflow-hidden">
            <div className="px-6 py-8 bg-white border-b border-gray-200">
              <div className="flex flex-col items-center sm:flex-row sm:justify-between">
                <div className="flex items-center mb-4 sm:mb-0">
                  <div className="relative w-24 h-24 rounded-full overflow-hidden border-4 border-white shadow-lg">
                    <Image
                      src={userProfile.avatar}
                      alt={userProfile.fullName}
                      fill
                      className="object-cover"
                    />
                  </div>
                  <div className="ml-6 text-center sm:text-left">
                    <h1 className="text-3xl font-semibold text-gray-900">{userProfile.fullName}</h1>
                    <p className="text-gray-600 mt-1">{userProfile.role}</p>
                    <span className={`inline-block px-4 py-1 rounded-full text-sm font-medium mt-2 
                      ${userProfile.status === 'Active' ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800'}`}>
                      {userProfile.status}
                    </span>
                  </div>
                </div>
              </div>
            </div>

            <div className="p-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="bg-gray-50 p-6 rounded-lg">
                  <h3 className="text-lg font-semibold text-gray-900 mb-4">Contact Information</h3>
                  <div className="space-y-4">
                    <ProfileField
                      icon={<FaEnvelope className="text-gray-500" />}
                      label="Email"
                      value={userProfile.email}
                    />
                    <ProfileField
                      icon={<FaPhone className="text-gray-500" />}
                      label="Phone"
                      value={userProfile.phone}
                    />
                  </div>
                </div>

                <div className="bg-gray-50 p-6 rounded-lg">
                  <h3 className="text-lg font-semibold text-gray-900 mb-4">Work Information</h3>
                  <div className="space-y-4">
                    <ProfileField
                      icon={<FaBuilding className="text-gray-500" />}
                      label="Department"
                      value={userProfile.department}
                    />
                    <ProfileField
                      icon={<FaUserTag className="text-gray-500" />}
                      label="Role"
                      value={userProfile.role}
                    />
                    <ProfileField
                      icon={<FaCalendar className="text-gray-500" />}
                      label="Join Date"
                      value={userProfile.joinDate}
                    />
                  </div>
                </div>
              </div>

              <div className="mt-6 border-t border-gray-200 pt-6">
                <div className="flex justify-end space-x-4">
                  <button
                    onClick={() => window.location.href = '/home/account/change-password'}
                    className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 
                              transition-colors duration-200 flex items-center gap-2 text-sm"
                  >
                    Change Password
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

const ProfileField = ({ icon, label, value }) => (
  <div className="flex items-start">
    <div className="flex-shrink-0 mt-1">
      {icon}
    </div>
    <div className="ml-3">
      <p className="text-sm font-medium text-gray-500">{label}</p>
      <p className="text-sm text-gray-900">{value}</p>
    </div>
  </div>
);

export default Profile;
