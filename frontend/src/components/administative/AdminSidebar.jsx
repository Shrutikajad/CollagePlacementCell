import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Home, Users, Briefcase } from 'lucide-react';

const AdminSidebar = () => {
  const navigate = useNavigate();

  return (
    <aside className="w-64 bg-white shadow-md p-6 space-y-6">
      <h2 className="text-2xl font-bold mb-4">Admin</h2>
      <nav className="flex flex-col space-y-4">
        <button
          onClick={() => navigate('/administative/dashboard')}
          className="flex items-center gap-2 text-left hover:text-blue-600"
        >
          <Home size={20} /> Dashboard
        </button>
        <button
          onClick={() => navigate('/administative/dashboard/managestudents')}
          className="flex items-center gap-2 text-left hover:text-blue-600"
        >
          <Users size={20} /> Manage Students
        </button>
        <button
          onClick={() => navigate('/administative/dashboard/managerecruiters')}
          className="flex items-center gap-2 text-left hover:text-blue-600"
        >
          <Users size={20} /> Manage Recruiters
        </button>
        <button
          onClick={() => navigate('/admin/jobs')}
          className="flex items-center gap-2 text-left hover:text-blue-600"
        >
          <Briefcase size={20} /> Job Listings
        </button>
      </nav>
    </aside>
  );
};

export default AdminSidebar;
