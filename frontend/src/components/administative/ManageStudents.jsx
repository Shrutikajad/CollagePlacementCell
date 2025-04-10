import React, { useEffect, useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import Navbar from '../shared/Navbar';
import { Pencil, Trash2, Save, X } from 'lucide-react';
import axios from 'axios';
import { Download } from 'lucide-react';
import { Home, Users, Briefcase } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import Sidebar from './AdminSidebar'


const ManageStudents = () => {
    const [students, setStudents] = useState([]);
    const [searchTerm, setSearchTerm] = useState('');
    const [editingId, setEditingId] = useState(null);
    const [editForm, setEditForm] = useState({ fullname: '', email: '' });
    const navigate = useNavigate();

    useEffect(() => {
        fetchStudents();
    }, []);

    const fetchStudents = async () => {
        try {
            const res = await axios.get('http://localhost:8000/api/v1/user/getStudentsDetails');
            setStudents(res.data.students);
        } catch (error) {
            console.error('Error fetching students:', error);
        }
    };

    const handleDelete = async (id) => {
        try {
            await axios.delete(`http://localhost:8000/api/v1/user/deleteStudent/${id}`);
            setStudents(students.filter(student => student._id !== id));
        } catch (error) {
            console.error('Error deleting student:', error);
        }
    };

    const handleEdit = (student) => {
        setEditingId(student._id);
        setEditForm({ fullname: student.fullname, email: student.email });
    };

    const handleSave = async () => {
        try {
            await axios.put(`http://localhost:8000/api/v1/user/getStudentsDetails${editingId}`, editForm);
            setEditingId(null);
            fetchStudents(); // Refresh data
        } catch (error) {
            console.error('Error updating student:', error);
        }
    };

    const handleCancel = () => {
        setEditingId(null);
    };

    const handleChange = (e) => {
        setEditForm({ ...editForm, [e.target.name]: e.target.value });
    };

    const filteredStudents = students.filter(student =>
        student.fullname.toLowerCase().includes(searchTerm.toLowerCase()) ||
        student.email.toLowerCase().includes(searchTerm.toLowerCase())
    );

    const handleDownload = () => {
        const headers = ['Name', 'Email'];
        const rows = students.map(student => [student.fullname, student.email]);

        const csvContent = [headers, ...rows]
            .map(e => e.join(","))
            .join("\n");

        const blob = new Blob([csvContent], { type: "text/csv;charset=utf-8;" });
        const url = URL.createObjectURL(blob);

        const link = document.createElement("a");
        link.setAttribute("href", url);
        link.setAttribute("download", "students.csv");
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);
    };


    return (
        <div>
            <Navbar />
            {/* Sidebar */}
            <div className="min-h-screen flex">
                <Sidebar/>
                <div className="min-w-[70%] min-h-screen p-6 bg-gray-100">
                    <h1 className="text-3xl font-bold mb-6">Manage Students</h1>

                    <div className="mb-4 max-w-md">
                        <Input
                            type="text"
                            placeholder="Search by name or email"
                            value={searchTerm}
                            onChange={(e) => setSearchTerm(e.target.value)}
                        />
                    </div>

                    <div className="overflow-auto bg-white shadow rounded-lg">

                        <table className="min-w-full divide-y divide-gray-200">
                            <thead className="bg-gray-50">
                                <tr>
                                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Name</th>
                                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Email</th>
                                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Branch</th>
                                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Passing year</th>
                                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">CGPA</th>
                                    <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">Actions</th>
                                </tr>
                            </thead>
                            <tbody className="bg-white divide-y divide-gray-200">
                                {filteredStudents.map((student) => (
                                    <tr key={student._id}>
                                        <td className="px-6 py-4 whitespace-nowrap">
                                            {editingId === student._id ? (
                                                <Input
                                                    name="fullname"
                                                    value={editForm.fullname}
                                                    onChange={handleChange}
                                                    placeholder="Full Name"
                                                />
                                            ) : (
                                                student.fullname
                                            )}
                                        </td>
                                        <td className="px-6 py-4 whitespace-nowrap">
                                            {editingId === student._id ? (
                                                <Input
                                                    name="email"
                                                    value={editForm.email}
                                                    onChange={handleChange}
                                                    placeholder="Email"
                                                />
                                            ) : (
                                                student.email
                                            )}
                                        </td>
                                        <td className="px-6 py-4 whitespace-nowrap">
                                            {editingId === student._id ? (
                                                <Input
                                                    name="branch"
                                                    value={editForm.branch}
                                                    onChange={handleChange}
                                                    placeholder="Branch"
                                                />
                                            ) : (
                                                student.branch
                                            )}
                                        </td>
                                        <td className="px-6 py-4 whitespace-nowrap">
                                            {editingId === student._id ? (
                                                <Input
                                                    name="passingyear"
                                                    value={editForm.passingyear}
                                                    onChange={handleChange}
                                                    placeholder="Passing year"
                                                />
                                            ) : (
                                                student.passingyear
                                            )}
                                        </td>
                                        <td className="px-6 py-4 whitespace-nowrap">
                                            {editingId === student._id ? (
                                                <Input
                                                    name="cgpa"
                                                    value={editForm.cgpa}
                                                    onChange={handleChange}
                                                    placeholder="CGPA"
                                                />
                                            ) : (
                                                student.cgpa
                                            )}
                                        </td>
                                        <td className="px-6 py-4 whitespace-nowrap text-right space-x-2">
                                            {editingId === student._id ? (
                                                <>
                                                    <Button size="sm" onClick={handleSave}><Save size={16} /></Button>
                                                    <Button size="sm" variant="outline" onClick={handleCancel}><X size={16} /></Button>
                                                </>
                                            ) : (
                                                <>
                                                    <Button variant="outline" size="sm" onClick={() => handleEdit(student)}><Pencil size={16} /></Button>
                                                    <Button variant="destructive" size="sm" onClick={() => handleDelete(student._id)}><Trash2 size={16} /></Button>
                                                </>
                                            )}
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                    <Button className="mb-4  right-0 mt-10 mr-5" onClick={handleDownload}>
                        <Download className="mr-2" size={16} /> Download CSV
                    </Button>
                </div>
            </div>
        </div>
    );
};

export default ManageStudents;
