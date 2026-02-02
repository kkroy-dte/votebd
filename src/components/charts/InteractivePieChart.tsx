import React, { useState, useMemo } from 'react';
import { PieChart, Pie, Cell, Tooltip, Legend, ResponsiveContainer } from 'recharts';
import type { GenderDataItem } from '../../types/election';
import type { LegendPayload } from 'recharts';
const COLORS = ['#10b981', '#f43f5e', '#6366f1'];
// কাস্টম টাইপ ডিক্লেয়ার করুন যাতে বারবার লিখতে না হয়

const InteractivePieChart: React.FC<{ data: GenderDataItem[] }> = ({ data }) => {
    // কোন কোন আইটেমগুলো ইনঅ্যাক্টিভ তা ট্র্যাক করার জন্য স্টেট
    const [disabledNames, setDisabledNames] = useState<string[]>([]);

    const handleLegendClick = (payload: LegendPayload) => {
        const { value } = payload;
        if (typeof value === 'string') {
            setDisabledNames(prev =>
                prev.includes(value)
                    ? prev.filter(name => name !== value) // অ্যাক্টিভ করো
                    : [...prev, value] // ইনঅ্যাক্টিভ করো
            );
        }
    };

    // চার্টের ডেটা প্রসেসিং: ইনঅ্যাক্টিভ আইটেমের ভ্যালু ০ করে দেওয়া হচ্ছে
    // এতে স্লাইসটি হাইড হবে কিন্তু লেজেন্ডে নাম থেকে যাবে
    const chartData = useMemo(() =>
        data.map(item => ({
            ...item,
            value: disabledNames.includes(item.name) ? 0 : item.value
        })),
        [data, disabledNames]
    );



    return (
        <div className="h-45 w-full">
            <ResponsiveContainer width="100%" height="100%">
                <PieChart>
                    <Pie
                        data={chartData}
                        cx="50%"
                        cy="50%"
                        // innerRadius={50}
                        outerRadius={70}
                        paddingAngle={5}
                        dataKey="value"
                        animationDuration={500}
                    >
                        {chartData.map((entry, index) => (
                            <Cell
                                key={`cell-${entry.name}`}
                                fill={COLORS[index % COLORS.length]}
                                // স্লাইসটি যদি ০ হয় তবে সেটি অপাসিটি ০ করে দেওয়া
                                style={{ outline: 'none', opacity: entry.value === 0 ? 0 : 1 }}
                            />
                        ))}
                    </Pie>

                    <Tooltip
                        contentStyle={{
                            fontFamily: 'NikoshBAN',
                            borderRadius: '12px',
                            border: 'none',
                        }}
                        // value কে number | string | undefined হিসেবে ডিফাইন করুন
                        formatter={(value: number | string | undefined) => {
                            // ১. ভ্যালু না থাকলে বা ০ হলে ডিফল্ট হ্যান্ডেলিং
                            if (value === undefined || value === null) return ["০", "ভোটার"];

                            // ২. স্ট্রিং আসলে সংখ্যায় রূপান্তর (সেফটি চেক)
                            const numValue = typeof value === 'string' ? parseFloat(value) : value;

                            // ৩. পার্সেন্টেজ ক্যালকুলেশন (টোটাল ডাটা থেকে)
                            const currentTotal = chartData.reduce((acc, item) => acc + item.value, 0);
                            const percentage = currentTotal > 0
                                ? ((numValue / currentTotal) * 100).toFixed(1)
                                : "0";

                            // ৪. রিটার্ন টাইপটি [string, string] ফরম্যাটে হতে হবে
                            return [`${numValue.toLocaleString('bn-BD')} (${percentage}%)`, "ভোটার"];
                        }}
                    />

                    <Legend
                        verticalAlign="bottom"
                        onClick={handleLegendClick}
                        height={36}
                        wrapperStyle={{ cursor: 'pointer', paddingTop: '6px' }}
                        formatter={(value: string, entry: LegendPayload) => {
                            // entry.color স্লাইসের রঙের সাথে সিঙ্ক করা থাকে paddingTop: '24px'
                            const baseColor = entry.color;
                            const isActive = !disabledNames.includes(value);

                            return (
                                <span style={{
                                    color: isActive ? baseColor : '#D1D5DB',
                                    fontWeight: isActive ? 700 : 400,
                                    textDecoration: isActive ? 'none' : 'line-through',
                                    fontFamily: 'NikoshBAN',
                                    marginRight: '10px'
                                }}>
                                    {value}
                                </span>
                            );
                        }}
                    />

                    {/* <Legend
                        verticalAlign="bottom"
                        iconType="circle"
                        onClick={handleLegendClick}
                        wrapperStyle={{ cursor: 'pointer', paddingTop: '20px' }}
                        // লেজেন্ডের টেক্সট ফরমেট করা যাতে ইনঅ্যাক্টিভগুলো বোঝা যায়
                        formatter={(value: string) => (
                            <span className={`font-nikosh text-sm transition-all duration-300 ${disabledNames.includes(value)
                                ? 'text-slate-300 line-through opacity-50'
                                : 'text-slate-800 font-bold'
                                }`}>
                                {value}
                            </span>
                        )}
                    /> */}
                </PieChart>
            </ResponsiveContainer>
        </div>
    );
};

export default InteractivePieChart;