import React from 'react';
import { X, Users, MapPin, DoorOpen, Info, PieChart, Phone, ShieldCheck, MessageSquare, Building2, Navigation } from 'lucide-react';
import type { ModalProps } from '../types/election';



const VoterCenterModal: React.FC<ModalProps> = ({ open, setOpen, selectedRow }) => {
    if (!open) return null;

    return (
        <div className="fixed inset-0 z-100 flex items-center justify-center p-4">
            {/* Backdrop */}
            <div
                className="absolute inset-0 bg-slate-900/60 backdrop-blur-sm animate-in fade-in"
                onClick={() => setOpen(false)}
            />

            <div className="relative w-full max-w-2xl bg-white rounded-[2.5rem] shadow-2xl overflow-hidden animate-in zoom-in-95">

                {/* Header */}
                <div className="bg-emerald-600 p-6 text-white flex justify-between items-start">
                    <div>
                        <h2 className="text-xl md:text-2xl font-bold leading-tight">{selectedRow.name}</h2>
                        <p className="flex items-center gap-2 text-emerald-100 text-sm mt-1">
                            <Navigation size={14} /> {selectedRow.area}
                        </p>
                    </div>
                    <button onClick={() => setOpen(false)} className="p-2 hover:bg-white/20 rounded-full transition-colors">
                        <X size={24} />
                    </button>
                </div>

                <div className="p-6 md:p-8 space-y-6 max-h-[80vh] overflow-y-auto">

                    {/* থানা ও অবস্থান সেকশন */}
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div className="flex items-center gap-3 p-4 bg-slate-50 rounded-2xl border border-slate-100">
                            <Building2 className="text-emerald-600" size={20} />
                            <div>
                                <p className="text-xs font-bold text-slate-400 uppercase">থানা / উপজেলা</p>
                                <p className="font-bold text-slate-800">{selectedRow.upaOrThana || "তথ্য নেই"}</p>
                            </div>
                        </div>
                        <div className="flex items-center gap-3 p-4 bg-slate-50 rounded-2xl border border-slate-100">
                            <MapPin className="text-rose-500" size={20} />
                            <div>
                                <p className="text-xs font-bold text-slate-400 uppercase">অবস্থান / ঠিকানা</p>
                                <p className="font-bold text-slate-800 text-sm">{selectedRow.location || "তথ্য নেই"}</p>
                            </div>
                        </div>
                    </div>

                    {/* নিয়ন্ত্রণ কর্মকর্তা */}
                    <div className="bg-emerald-50 border-2 border-emerald-100 rounded-3xl p-5 flex flex-col md:flex-row md:items-center justify-between gap-4">
                        <div className="flex items-center gap-4">
                            <div className="bg-emerald-600 p-3 rounded-2xl text-white shadow-lg shadow-emerald-200">
                                <ShieldCheck size={28} />
                            </div>
                            <div>
                                <p className="text-xs font-bold text-emerald-800 uppercase tracking-wider">নিয়ন্ত্রণ কর্মকর্তা</p>
                                <p className="text-lg font-black text-slate-800">{selectedRow.po || "নির্ধারিত নয়"}</p>
                            </div>
                        </div>

                        {selectedRow.mobile && (
                            <a
                                href={`tel:${selectedRow.mobile}`}
                                className="flex items-center justify-center gap-2 bg-white border border-emerald-200 text-emerald-700 px-5 py-2.5 rounded-2xl font-bold hover:bg-emerald-600 hover:text-white transition-all shadow-sm"
                            >
                                <Phone size={20} /> {selectedRow.mobile}
                            </a>
                        )}
                    </div>

                    {/* ভোটার বিভাজন (PieChart আইকন এখানে ব্যবহার করা হয়েছে) */}
                    <div className="space-y-4 bg-slate-50 p-6 rounded-4xl border border-slate-200">
                        <div className="flex items-center justify-center gap-2 mb-2">
                            <PieChart size={20} className="text-emerald-600" />
                            <h3 className="text-sm font-bold text-slate-600 uppercase tracking-widest">ভোটার বিভাজন পরিসংখ্যান</h3>
                        </div>

                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                            <div className="space-y-2">
                                <div className="flex justify-between text-xs font-bold">
                                    <span className="text-slate-500">পুরুষ ভোটার</span>
                                    <span className="text-emerald-600 font-black">{selectedRow.male}</span>
                                </div>
                                <div className="h-3 bg-white rounded-full overflow-hidden border border-slate-100 shadow-inner">
                                    <div
                                        className="h-full bg-emerald-500 transition-all duration-1000"
                                        style={{ width: `${(parseInt(selectedRow.male) / parseInt(selectedRow.total)) * 100}%` }}
                                    />
                                </div>
                            </div>
                            <div className="space-y-2">
                                <div className="flex justify-between text-xs font-bold">
                                    <span className="text-slate-500">মহিলা ভোটার</span>
                                    <span className="text-rose-500 font-black">{selectedRow.female}</span>
                                </div>
                                <div className="h-3 bg-white rounded-full overflow-hidden border border-slate-100 shadow-inner">
                                    <div
                                        className="h-full bg-rose-400 transition-all duration-1000"
                                        style={{ width: `${(parseInt(selectedRow.female) / parseInt(selectedRow.total)) * 100}%` }}
                                    />
                                </div>
                            </div>
                        </div>

                        {/* মন্তব্য / কমেন্টস */}
                        <div className="mt-4 pt-4 border-t border-slate-200 flex items-start gap-3">
                            <MessageSquare size={20} className="text-slate-400 mt-1" />
                            <p className="text-xs text-slate-600 leading-relaxed italic">
                                <span className="font-bold not-italic">মন্তব্য:</span> {selectedRow.coments || "কোনো বিশেষ মন্তব্য নেই।"}
                            </p>
                        </div>
                    </div>

                    {/* পরিসংখ্যান গ্রিড */}
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                        <div className="bg-white border border-slate-100 p-4 rounded-3xl text-center shadow-sm">
                            <Users className="mx-auto text-emerald-600 mb-2" size={24} />
                            <p className="text-xs font-bold text-slate-500 uppercase">মোট ভোটার</p>
                            <p className="text-xl font-black text-slate-800">{selectedRow.total}</p>
                        </div>
                        <div className="bg-white border border-slate-100 p-4 rounded-3xl text-center shadow-sm">
                            <DoorOpen className="mx-auto text-blue-600 mb-2" size={24} />
                            <p className="text-xs font-bold text-slate-500 uppercase">কক্ষ সংখ্যা</p>
                            <p className="text-xl font-black text-slate-800">{selectedRow.room}</p>
                        </div>
                        <div className="bg-white border border-slate-100 p-4 rounded-3xl text-center shadow-sm">
                            <Info className="mx-auto text-amber-500 mb-2" size={24} />
                            <p className="text-xs font-bold text-slate-500 uppercase">আসন</p>
                            <p className="text-sm font-bold text-slate-800 leading-tight">{selectedRow.seat}</p>
                        </div>
                    </div>

                </div>

                {/* Footer */}
                <div className="p-4 bg-slate-50 border-t flex justify-center">
                    <button
                        onClick={() => window.print()}
                        className="bg-emerald-600 text-white font-bold text-base hover:bg-emerald-700 px-10 py-3 rounded-full shadow-lg shadow-emerald-100 transition-all active:scale-95"
                    >
                        পুরো রিপোর্টটি প্রিন্ট করুন
                    </button>
                </div>
            </div>
        </div>
    );
};

                                                        
export default VoterCenterModal;