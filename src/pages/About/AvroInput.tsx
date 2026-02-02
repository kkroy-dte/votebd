import React, { useState, useRef } from 'react';
import { avroParse } from '../../utils/avroEngine';
import { Type, Eraser, Info } from 'lucide-react';

const AvroInput: React.FC = () => {
    const [text, setText] = useState("");
    const [englishPreview, setEnglishPreview] = useState("");

    const handleChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
        const val = e.target.value;
        setEnglishPreview(val);
        // অ্যাডভান্সড পার্সিং কল
        setText(avroParse(val));
    };

    return (
        <div className="max-w-3xl mx-auto p-4 md:p-8 font-nikosh">
            <div className="bg-white rounded-[2.5rem] shadow-2xl border border-emerald-100 overflow-hidden">
                {/* Header */}
                <div className="bg-emerald-600 p-6 text-white flex justify-between items-center">
                    <div className="flex items-center gap-3">
                        <Type size={24} />
                        <h2 className="text-xl font-black">অ্যাডভান্সড অভ্র কিবোর্ড</h2>
                    </div>
                    <button
                        onClick={() => { setText(""); setEnglishPreview(""); }}
                        className="bg-emerald-500 hover:bg-emerald-400 p-2 rounded-xl transition-all"
                    >
                        <Eraser size={20} />
                    </button>
                </div>

                {/* Input Area */}
                <div className="p-6 space-y-4">
                    <div className="relative">
                        <textarea
                            value={englishPreview}
                            onChange={handleChange}
                            placeholder="এখানে ইংরেজি অক্ষরে লিখুন (যেমন: ami banglay gan gai)"
                            className="w-full h-48 p-6 bg-slate-50 border-2 border-slate-100 rounded-3xl 
                                     text-xl font-nikosh outline-none focus:border-emerald-500 
                                     transition-all resize-none"
                        />
                    </div>

                    {/* Live Preview */}
                    <div className="p-6 bg-emerald-50/50 rounded-3xl border-2 border-dashed border-emerald-200">
                        <label className="text-xs font-bold text-emerald-600 uppercase mb-2 block">আউটপুট প্রিভিউ:</label>
                        <p className="text-3xl font-medium text-slate-800 leading-relaxed min-h-[60px]">
                            {text || "..."}
                        </p>
                    </div>
                </div>

                {/* Help Section */}
                <div className="bg-slate-50 p-4 px-8 border-t border-slate-100 flex items-center gap-2 text-slate-500 text-sm">
                    <Info size={14} />
                    <span>টাইপ করুন: <b>k</b>=ক, <b>ka</b>=কা, <b>ki</b>=কি, <b>ko</b>=কো, <b>ami</b>=আমি</span>
                </div>
            </div>
        </div>
    );
};

export default AvroInput;