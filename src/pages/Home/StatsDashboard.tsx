import React, { useMemo } from 'react';
import {
    BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer,
    PieChart, Pie, Cell, Legend,
} from 'recharts';

import { Users, User, UserCheck, Home, Activity } from 'lucide-react';

// টাইপ হিসেবে আলাদাভাবে ইম্পোর্ট করুন
// import type { TooltipProps } from 'recharts';

import type { StatsDashboardProps } from '../../types/election';
import { CustomTooltip } from '../../components/CustomTooltip';
import InteractivePieChart from '../../components/charts/InteractivePieChart';
import InteractiveDonutChart from '../../components/charts/InteractiveDonutChart';


/* ================= TYPES ================= */


const COLORS = ['#10b981', '#f43f5e', '#6366f1', '#f59e0b'];

const StatsDashboard: React.FC<StatsDashboardProps> = ({ data }) => {


    // কনসোল চেক: প্যারেন্ট থেকে নতুন ডেটা আসছে কি না
    console.log("StatsDashboard received data:", data.length);

    // এই ফাংশনটি "8(অস্থায়ী-5)" থেকে 8 বের করে আনবে
    const getRoomNumber = (room: string): number => {
        const match = room.match(/^\d+/); // শুরু থেকে সংখ্যা খোঁজে
        return match ? parseInt(match[0]) : 0;
    };

    /* ================= DATA PROCESSING ================= */
    const analytics = useMemo(() => {
        let totalMale = 0;
        let totalFemale = 0;
        let totalThird = 0;
        let totalVoters = 0;
        let totalRooms = 0;

        data.forEach(item => {
            totalMale += parseInt(item.male || "0");
            totalFemale += parseInt(item.female || "0");
            totalThird += parseInt(item.third || "0");
            totalVoters += parseInt(item.total || "0");
            // রুম সংখ্যা থেকে শুধু সংখ্যাটি নেওয়ার জন্য (যেমন: "8(অস্থায়ী-5)" থেকে 8)
            totalRooms += (getRoomNumber(item.room));
        });

        const genderData = [
            { name: 'পুরুষ', value: totalMale },
            { name: 'মহিলা', value: totalFemale },
            { name: 'হিজড়া', value: totalThird },
        ].filter(g => g.value > 0);

        // // প্রথম ৫টি কেন্দ্রের তুলনামূলক চিত্র
        // const topCenters = data.slice(0, 5).map(item => ({
        //     name: item.location.substring(0, 15) + '...',
        //     voters: parseInt(item.total)
        // }));

        // ভোটার সংখ্যার ভিত্তিতে বড় থেকে ছোট ক্রমে সাজানো (Descending Order)
        const topCenters = [...data]
            .sort((a, b) => parseInt(b.total) - parseInt(a.total)) // বড় থেকে ছোট সাজাবে
            .slice(0, 5) // প্রথম ৫টি কেন্দ্র নিবে
            .map(item => ({
                // কেন্দ্রের নাম যদি বেশি লম্বা হয় তবে কেটে ছোট করবে
                name: item.location.length > 15
                    ? item.location.substring(0, 15) + '...'
                    : item.location,
                voters: parseInt(item.total)
            }));

        console.log(topCenters)

        return { totalMale, totalFemale, totalThird, totalVoters, totalRooms, genderData, topCenters };
    }, [data]);


    return (
        <div className="space-y-2 p-2 md:p-4 bg-slate-50 ">

            {/* 1. SUMMARY CARDS */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
                <StatCard
                    icon={<Users className="text-emerald-600" />}
                    label="মোট ভোটার"
                    value={analytics.totalVoters.toLocaleString('bn-BD')}
                    bgColor="bg-emerald-50"
                />
                <StatCard
                    icon={<User className="text-blue-600" />}
                    label="মোট পুরুষ"
                    value={analytics.totalMale.toLocaleString('bn-BD')}
                    bgColor="bg-blue-50"
                />
                <StatCard
                    icon={<UserCheck className="text-rose-600" />}
                    label="মোট মহিলা"
                    value={analytics.totalFemale.toLocaleString('bn-BD')}
                    bgColor="bg-rose-50"
                />
                <StatCard
                    icon={<Home className="text-amber-600" />}
                    label="মোট ভোট কক্ষ"
                    value={analytics.totalRooms.toLocaleString('bn-BD')}
                    bgColor="bg-amber-50"
                />
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">

                {/* 1. GENDER RATIO (DONUT CHART) */}
                <div className="bg-white p-6 rounded-3xl shadow-sm border border-slate-100">
                    <div className="flex items-center gap-2 mb-2">
                        <Activity className="text-emerald-500" size={20} />
                        <h3 className="text-lg font-bold text-slate-800">ভোটার লিঙ্গানুপাত (Pie Chart)</h3>
                    </div>
                    <div className="">
                        <InteractivePieChart data={analytics.genderData} />
                        {/* <ResponsiveContainer width="100%" height="100%">
                            <PieChart >
                                <Pie
                                    data={analytics.genderData}
                                    cx="50%" cy="50%"
                                    // innerRadius={50}
                                    outerRadius={70}
                                    paddingAngle={5}
                                    dataKey="value"
                                    fontFamily='NikoshBAN'
                                >
                                    {analytics.genderData.map((_, index) => (
                                        <Cell key={`cell-${index}`} fontFamily='NikoshBAN' fill={COLORS[index % COLORS.length]} />
                                    ))}
                                </Pie>
                                <Tooltip
                                    contentStyle={{
                                        fontFamily: 'NikoshBAN',
                                        fontSize: '14px',
                                        borderRadius: '8px',
                                        border: '1px solid #e2e8f0'
                                    }}
                                    formatter={(value: any) => {
                                        const total = analytics.genderData.reduce((acc, item) => acc + item.value, 0);
                                        const percentage = ((value / total) * 100).toFixed(1); // One decimal place
                                        return [`${value} (${percentage}%)`, "লিঙ্গানুপাত"];
                                    }}
                                />

                                <Legend verticalAlign="bottom" fontFamily='NikoshBAN' height={36} />
                            </PieChart>
                        </ResponsiveContainer> */}
                    </div>
                </div>

                {/* 2. GENDER RATIO (DONUT CHART) */}
                <div className="bg-white p-6 rounded-3xl shadow-sm border border-slate-100">
                    <div className="flex items-center gap-2 mb-2">
                        <Activity className="text-emerald-500" size={20} />
                        <h3 className="text-lg font-bold text-slate-800">ভোটার লিঙ্গানুপাত (Donut Chart)</h3>
                    </div>
                    <div className="">
                        <InteractiveDonutChart data={analytics.genderData} />
                        {/* <ResponsiveContainer width="100%" height="100%">
                            <PieChart >
                                <Pie
                                    data={analytics.genderData}
                                    cx="50%" cy="50%"
                                    innerRadius={35}
                                    outerRadius={70}
                                    paddingAngle={5}
                                    dataKey="value"
                                    fontFamily='NikoshBAN'
                                >
                                    {analytics.genderData.map((_, index) => (
                                        <Cell key={`cell-${index}`} fontFamily='NikoshBAN' fill={COLORS[index % COLORS.length]} />
                                    ))}
                                </Pie>
                                <Tooltip
                                    contentStyle={{
                                        fontFamily: 'NikoshBAN',
                                        fontSize: '14px',
                                        borderRadius: '8px',
                                        border: '1px solid #e2e8f0'
                                    }}
                                    content={<CustomTooltip />}
                                />

                                <Legend verticalAlign="bottom" fontFamily='NikoshBAN' height={36} />
                            </PieChart>
                        </ResponsiveContainer> */}
                    </div>
                </div>

                {/* 3. CENTER COMPARISON (BAR CHART) */}
                <div className="bg-white p-6 rounded-3xl shadow-sm border border-slate-100">
                    <div className="flex items-center gap-2 mb-2">
                        <Activity className="text-emerald-500" size={20} />
                        <h3 className="text-lg font-bold text-slate-800">শীর্ষ কেন্দ্র ভিত্তিক ভোটার (Bar Chart)</h3>
                    </div>
                    <div className="h-45 w-full">
                        <ResponsiveContainer width="100%" height="100%" >
                            <BarChart data={analytics.topCenters} >
                                <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#f1f5f9" />
                                <XAxis dataKey="name" fontFamily='NikoshBAN' fontSize={14} axisLine={false} tickLine={false} />
                                <YAxis fontSize={14} fontFamily='NikoshBAN' axisLine={false} tickLine={false} />

                                <Tooltip
                                    contentStyle={{
                                        fontFamily: 'NikoshBAN',
                                        fontSize: '14px',
                                        borderRadius: '8px',
                                        border: '1px solid #e2e8f0'
                                    }}
                                    content={<CustomTooltip />}
                                />

                                <Bar dataKey="voters" fill="#10b981" fontFamily='NikoshBAN' radius={[4, 4, 0, 0]} barSize={40} />
                            </BarChart>
                        </ResponsiveContainer>
                    </div>
                </div>

            </div>
        </div>
    );
};

/* --- ছোট কার্ড কম্পোনেন্ট --- */
const StatCard = ({ icon, label, value, bgColor }: { icon: any, label: string, value: string, bgColor: string }) => (
    <div className={`${bgColor} p-6 rounded-4xl border border-white shadow-sm flex items-center gap-4`}>
        <div className="bg-white p-3 rounded-2xl shadow-inner">
            {icon}
        </div>
        <div>
            <p className="text-xs font-bold text-slate-500 uppercase tracking-wider">{label}</p>
            <p className="text-2xl font-black text-slate-800">{value}</p>
        </div>
    </div>
);

export default StatsDashboard;