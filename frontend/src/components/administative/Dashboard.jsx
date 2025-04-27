import { useEffect, useState } from 'react';
import axios from 'axios';
import { PieChart, Pie, Cell, Tooltip, ResponsiveContainer } from 'recharts';
import  {Card, CardContent } from "@/components/ui/card";

const Dashboard = () => {
    const [analytics, setAnalytics] = useState(null);

    useEffect(() => {
        const fetchAnalytics = async () => {
            try {
                const res = await axios.get('http://localhost:5000/api/admin/analytics');
                setAnalytics(res.data);
            } catch (error) {
                console.error('Error fetching analytics:', error);
            }
        };

        fetchAnalytics();
    }, []);

    const COLORS = ['#0088FE', '#00C49F', '#FFBB28', '#FF8042', '#D66D75', '#A0D995', '#FDAE61'];

    if (!analytics) return <div>Loading...</div>;

    const pieData = Object.entries(analytics.branchDistribution).map(([branch, count]) => ({
        name: branch,
        value: count
    }));

    return (
        <div className="p-6">
            <h1 className="text-3xl font-bold mb-6">Admin Dashboard</h1>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-10">
                <Card>
                    <CardContent className="p-6">
                        <h2 className="text-lg font-semibold">Total Students</h2>
                        <p className="text-2xl">{analytics.totalStudents}</p>
                    </CardContent>
                </Card>
                <Card>
                    <CardContent className="p-6">
                        <h2 className="text-lg font-semibold">Total Recruiters</h2>
                        <p className="text-2xl">{analytics.totalRecruiters}</p>
                    </CardContent>
                </Card>
                <Card>
                    <CardContent className="p-6">
                        <h2 className="text-lg font-semibold">Average CGPA</h2>
                        <p className="text-2xl">{analytics.avgCgpa}</p>
                    </CardContent>
                </Card>
            </div>

            <div className="bg-white p-6 rounded-lg shadow-md">
                <h2 className="text-xl font-semibold mb-4">Students per Branch</h2>
                <ResponsiveContainer width="100%" height={300}>
                    <PieChart>
                        <Pie
                            data={pieData}
                            dataKey="value"
                            nameKey="name"
                            cx="50%"
                            cy="50%"
                            outerRadius={100}
                            fill="#8884d8"
                            label
                        >
                            {pieData.map((entry, index) => (
                                <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                            ))}
                        </Pie>
                        <Tooltip />
                    </PieChart>
                </ResponsiveContainer>
            </div>
        </div>
    );
};

export default Dashboard;
