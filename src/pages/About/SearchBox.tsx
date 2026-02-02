import React, { useState } from 'react';

const SearchBox: React.FC = () => {
    const [feedback, setFeedback] = useState<string>("");



    return (
        <div className="max-w-7xl mx-auto p-8 font-nikosh">
            <h2 className="text-3xl font-bold text-slate-800 mb-6">আমাদের সম্পর্কে</h2>

            <div className="bg-white p-6 rounded-3xl shadow-sm border border-slate-100 space-y-4">
                <label className="block text-lg font-bold text-emerald-700 mb-2">
                    আপনার মতামত বাংলায় লিখুন:
                </label>

                {/* বাংলা টাইপিং ইনপুট */}
                <textarea
                    value={feedback}
                    onChange={(e) => setFeedback(e.target.value)}
                    placeholder="এখানে আপনার মন্তব্য লিখুন..."
                    className="w-full h-40 p-4 bg-slate-50 border-2 border-slate-100 rounded-2xl 
                     outline-none focus:border-emerald-500 transition-all 
                     text-xl font-nikosh text-slate-700 placeholder:text-slate-400"
                />

                <div className="flex justify-between items-center">
                    <p className="text-sm text-slate-500">
                        {feedback.length > 0 ? `মোট অক্ষর: ${feedback.length}` : "অনুগ্রহ করে বাংলা কিবোর্ড ব্যবহার করুন।"}
                    </p>
                    <button className="bg-emerald-600 text-white px-6 py-2 rounded-xl font-bold hover:bg-emerald-700 transition-colors">
                        পাঠিয়ে দিন
                    </button>
                </div>
            </div>

        </div>
    );
};

export default SearchBox;