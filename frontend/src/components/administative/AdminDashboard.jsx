import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import Navbar from '../shared/Navbar.jsx';
import Sidebar from './AdminSidebar'

import { Home, Users, Briefcase } from 'lucide-react';

const AdminDashboard = () => {
  const navigate = useNavigate();

  return (
    
    <div>
      <Navbar />
      <div className="min-h-screen flex">
      
      {/* Sidebar */}
      <Sidebar/>

      {/* Main Content */}
      <main className="flex-1 bg-gray-100 p-6">
        <h1 className="text-3xl font-bold mb-6">Admin Dashboard</h1>
       
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="bg-white shadow-md rounded-2xl p-6">
            <h2 className="text-xl font-semibold mb-2">Manage Students</h2>
            <p className="text-sm text-gray-600 mb-4">View and manage student accounts.</p>
            <Button onClick={() => navigate('/administative/dashboard/managestudents')}>Go</Button>
          </div>

          <div className="bg-white shadow-md rounded-2xl p-6">
            <h2 className="text-xl font-semibold mb-2">Manage Recruiters</h2>
            <p className="text-sm text-gray-600 mb-4">View and manage recruiters.</p>
            <Button onClick={() => navigate('/administative/dashboard/managerecruiters')}>Go</Button>
          </div>

          <div className="bg-white shadow-md rounded-2xl p-6">
            <h2 className="text-xl font-semibold mb-2">Job Listings</h2>
            <p className="text-sm text-gray-600 mb-4">View all jobs posted on the platform.</p>
            <Button onClick={() => navigate('/administative/joblisting')}>Go</Button>
          </div>
        </div>
      </main>
    </div>
    </div>
  );
};

export default AdminDashboard;
