import React, { useEffect, useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import Navbar from '../shared/Navbar';
import AdminSidebar from './AdminSidebar';
import { Pencil, Trash2 } from 'lucide-react';
import axios from 'axios';
import { Download } from 'lucide-react';

const ManageRecruiters = () => {
  const [recruiters, setRecruiters] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');

  useEffect(() => {
    const fetchRecruiters = async () => {
      try {
        const res = await axios.get('http://localhost:5000/api/admin/recruiters');
        setRecruiters(res.data.recruiters);
      } catch (error) {
        console.error('Error fetching recruiters:', error);
      }
    };
    fetchRecruiters();
  }, []);

  const handleDelete = async (id) => {
    try {
      await axios.delete(`http://localhost:5000/api/admin/recruiters/${id}`);
      setRecruiters(recruiters.filter(r => r._id !== id));
    } catch (error) {
      console.error('Error deleting recruiter:', error);
    }
  };

  const filteredRecruiters = recruiters.filter(r =>
    r.companyName?.toLowerCase().includes(searchTerm.toLowerCase()) ||
    r.email?.toLowerCase().includes(searchTerm.toLowerCase()) ||
    r.location?.toLowerCase().includes(searchTerm.toLowerCase()) 

  );

  const handleDownload = () => {
        const headers = ['Name', 'Email'];
        const rows = recruiters.map(student => [student.fullname, student.email]);

        const csvContent = [headers, ...rows]
            .map(e => e.join(","))
            .join("\n");

        const blob = new Blob([csvContent], { type: "text/csv;charset=utf-8;" });
        const url = URL.createObjectURL(blob);

        const link = document.createElement("a");
        link.setAttribute("href", url);
        link.setAttribute("download", "recruiters.csv");
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);

        
    };

  return (
    <div>
      <Navbar />
      <div className=" min-h-screen flex">
        {/* Sidebar */}
        <AdminSidebar />

        {/* Main Content */}
        <div className='min-w-[70%] min-h-screen p-6 bg-gray-100'>
          <main className=" flex-1 bg-gray-100 p-6">
            <h1 className="text-3xl font-bold mb-6">Manage Recruiters</h1>

            <div className="mb-4 max-w-md">
              <Input
                type="text"
                placeholder="Search by company or email"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
            </div>

            <div className="overflow-auto bg-white shadow rounded-lg">
              <table className="min-w-full divide-y divide-gray-200">
                <thead className="bg-gray-50">
                  <tr>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Company</th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Email</th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Location</th>
                    <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase">Actions</th>
                  </tr>
                </thead>
                <tbody className="bg-white divide-y divide-gray-200">
                  {filteredRecruiters.map((r) => (
                    <tr key={r._id}>
                      <td className="px-6 py-4 whitespace-nowrap">{r.companyName}</td>
                      <td className="px-6 py-4 whitespace-nowrap">{r.email}</td>
                      <td className="px-6 py-4 whitespace-nowrap">{r.location}</td>
                      <td className="px-6 py-4 whitespace-nowrap text-right space-x-2">
                        <Button variant="outline" size="sm"><Pencil size={16} /></Button>
                        <Button variant="destructive" size="sm" onClick={() => handleDelete(r._id)}><Trash2 size={16} /></Button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </main>
          <Button className="mb-4  right-0 mt-10 mr-5" onClick={handleDownload}>
            <Download className="mr-2" size={16} /> Download CSV
          </Button>
        </div>
      </div>
    </div>
  );
};

export default ManageRecruiters;
