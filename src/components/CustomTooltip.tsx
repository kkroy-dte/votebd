// কাস্টম টুলটিপ ফাংশন যেখানে TooltipProps ব্যবহৃত হয়েছে
export const CustomTooltip = ({ active, payload, label }: any) => {
    if (active && payload && payload.length) {
        return (
            <div className="bg-white p-3 border border-slate-200 shadow-xl rounded-xl font-nikosh">
                <p className="text-slate-800 font-bold mb-1">{label}</p>
                <div className="flex items-center gap-2">
                    <div
                        className="w-3 h-3 rounded-full"
                        style={{ backgroundColor: payload[0].fill }}
                    />
                    <p className="text-emerald-600 font-bold">
                        ভোটার: {payload[0].value.toLocaleString('bn-BD')} জন
                    </p>
                </div>
            </div>
        );
    }
    return null;
};