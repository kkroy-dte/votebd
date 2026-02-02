import {
    BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer,
    PieChart, Pie, Cell, Legend
} from 'recharts';

const barData = [
    { name: 'Jan', value: 400 },
    { name: 'Feb', value: 300 },
    { name: 'Mar', value: 600 },
    { name: 'Apr', value: 800 },
    { name: 'May', value: 500 },
];

const pieData = [
    { name: 'Agriculture', value: 400 },
    { name: 'Education', value: 300 },
    { name: 'Health', value: 300 },
    { name: 'Others', value: 200 },
];

//const COLORS_2 = ['#10b981', '#059669', '#34d399', '#6ee7b7'];
const COLORS = ["#3B82F6", "#EC4899", "#10B981", "#10b981"];

//
export default function ChartComponent() {
    return (
        <div className="space-y-8">
            <header className="text-center">
                <h2 className="text-3xl font-bold text-slate-800">পরিসংখ্যান ড্যাশবোর্ড</h2>
                <div className="w-20 h-1 bg-emerald-500 mx-auto mt-2"></div>
            </header>

            {/* Charts Grid */}
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-2">

                {/* Donut Chart Card */}
                <div className="bg-white p-6 rounded-2xl shadow-sm border border-slate-100">
                    <h3 className="text-lg font-semibold mb-4 text-slate-700">খাত ভিত্তিক বরাদ্দ</h3>
                    <div className="h-40 w-full">
                        <ResponsiveContainer width="100%" height="100%">
                            <PieChart>
                                <Pie
                                    data={pieData}
                                    cx="50%"
                                    cy="50%"
                                    // innerRadius={60} // This makes it a Donut
                                    outerRadius={50}
                                    paddingAngle={5}
                                    dataKey="value"
                                >
                                    {pieData.map((_, index) => (
                                        <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                                    ))}
                                </Pie>
                                <Tooltip />
                                <Legend iconType="circle" layout="vertical" align="right" verticalAlign="middle" />
                            </PieChart>
                        </ResponsiveContainer>
                    </div>
                </div>

                {/* Bar Chart Card */}
                <div className="bg-white p-6 rounded-2xl shadow-sm border border-slate-100">
                    <h3 className="text-lg font-semibold mb-4 text-slate-700">মাসিক সেবা পরিসংখ্যান</h3>
                    <div className="h-40 w-full">
                        <ResponsiveContainer width="100%" height="100%">
                            <BarChart data={barData}>
                                <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#f1f5f9" />
                                <XAxis dataKey="name" axisLine={false} tickLine={false} />
                                <YAxis axisLine={false} tickLine={false} />
                                <Tooltip
                                    cursor={{ fill: '#f8fafc' }}
                                    contentStyle={{ borderRadius: '8px', border: 'none', boxShadow: '0 4px 6px -1px rgb(0 0 0 / 0.1)' }}
                                />
                                <Bar dataKey="value" fill="#10b981" radius={[4, 4, 0, 0]} />
                            </BarChart>
                        </ResponsiveContainer>
                    </div>
                </div>

                {/* Donut Chart Card */}
                <div className="bg-white p-6 rounded-2xl shadow-sm border border-slate-100">
                    <h3 className="text-lg font-semibold mb-4 text-slate-700">খাত ভিত্তিক বরাদ্দ</h3>
                    <div className="h-40 w-full">
                        <ResponsiveContainer width="100%" height="100%">
                            <PieChart>
                                <Pie
                                    data={pieData}
                                    cx="50%"
                                    cy="50%"
                                    innerRadius={40} // This makes it a Donut
                                    outerRadius={80}
                                    paddingAngle={5}
                                    dataKey="value"
                                >
                                    {pieData.map((_, index) => (
                                        <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                                    ))}
                                </Pie>
                                <Tooltip />
                                <Legend iconType="circle" layout="vertical" align="right" verticalAlign="middle" />
                            </PieChart>
                        </ResponsiveContainer>
                    </div>
                </div>

            </div>
        </div>
    );
}