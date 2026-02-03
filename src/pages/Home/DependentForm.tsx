import React, { useEffect, useMemo, useState } from 'react';
import { Hash, ChevronRight, Users, MapPin, Search } from 'lucide-react';

import userDataRaw from '../../data/userDataRaw.json';
import thanasRaw from '../../data/thanasRaw.json';


/* ================= TYPES ================= */

import type { UserDataItem, Option, FormState, DependentFormProps } from '../../types/election';
import VoterCenterModal from '../../components/VoterCenterModal';


/* ================= DATA & CONSTANTS ================= */

const userData = userDataRaw as UserDataItem[];

// Parliamentary Seat Options
const seatOptions: Option[] = Array.from(
  new Set(userData.map((u) => u.seat))
).map((seat, i) => ({
  id: i,
  value: seat,
  label: seat,
}));

// Upazila (District) Options
const districts: Option[] = [
  { id: 1, label: 'গৌরনদী', value: 'গৌরনদী', parentId: "বরিশাল-১ (গৌরনদী-আগৈলঝাড়া)" },
  { id: 2, label: 'আগৈলঝাড়া', value: 'আগৈলঝাড়া', parentId: "বরিশাল-১ (গৌরনদী-আগৈলঝাড়া)" },
  { id: 3, label: 'উজিরপুর', value: 'উজিরপুর', parentId: "বরিশাল-২ (উজিরপুর-বানারীপাড়া)" },
  { id: 4, label: 'বানারীপাড়া', value: 'বানারীপাড়া', parentId: "বরিশাল-২ (উজিরপুর-বানারীপাড়া)" },
  { id: 5, label: 'মুলাদী', value: 'মুলাদী', parentId: "বরিশাল-৩ (মুলাদী-বাবুগঞ্জ)" },
  { id: 6, label: 'বাবুগঞ্জ', value: 'বাবুগঞ্জ', parentId: "বরিশাল-৩ (মুলাদী-বাবুগঞ্জ)" },
  { id: 7, label: 'মেহেন্দিগঞ্জ', value: 'মেহেন্দিগঞ্জ', parentId: "বরিশাল-৪ (মেহেন্দিগঞ্জ-হিজলা)" },
  { id: 8, label: 'হিজলা', value: 'হিজলা', parentId: "বরিশাল-৪ (মেহেন্দিগঞ্জ-হিজলা)" },
  { id: 9, label: 'বরিশাল সিটি কর্পোরেশনভূক্ত এলাকা', value: 'বরিশাল সিটি কর্পোরেশনভূক্ত এলাকা', parentId: "বরিশাল-৫ (বরিশাল সিটি কর্পোরেশনভূক্ত এলাকা-বরিশাল সদর)" },
  { id: 10, label: 'বরিশাল সদর', value: 'বরিশাল সদর', parentId: "বরিশাল-৫ (বরিশাল সিটি কর্পোরেশনভূক্ত এলাকা-বরিশাল সদর)" },
  { id: 11, label: 'বাকেরগঞ্জ', value: 'বাকেরগঞ্জ', parentId: "বরিশাল-৬ (বাকেরগঞ্জ)" },
];

/* ================= COMPONENT ================= */

const DependentForm: React.FC<DependentFormProps> = ({ onFilterChange }) => {
  const [form, setForm] = useState<FormState>({
    division: '',
    district: '',
    thana: '',
  });

  const [open, setOpen] = useState(false);
  const [selected, setSelected] = useState<UserDataItem | null>(null);

  /* ---------- Dependent Logic (Memoized) ---------- */

  const districtOptions = useMemo(() =>
    districts.filter(d => d.parentId === form.division),
    [form.division]);

  const thanaOptions = useMemo(() =>
    (thanasRaw as Option[]).filter(t => t.parentId === form.district),
    [form.district]);

  const finalResults = useMemo(() => {
    if (!form.thana) return [];
    return userData.filter(u => u.area === form.thana);
  }, [form.thana]);

  /* ---------- Handlers ---------- */

  // useEffect এর ভেতর যেখানে ফিল্টার করছেন সেখানে 'result' এর টাইপ দিন
  useEffect(() => {
    // ১. সোর্স ডেটা নিশ্চিত করুন
    let result: UserDataItem[] = [...(userDataRaw as UserDataItem[])];

    // ২. ফিল্টারিং লজিক
    if (form.division) {
      result = result.filter(d => d.seat === form.division);
    }
    if (form.district) {
      result = result.filter(d => d.upaOrThana === form.district);
    }
    if (form.thana) {
      result = result.filter(d => d.area === form.thana);
    }


    // কনসোল চেক করুন ডেটা আসছে কিনা
    console.log("Filtering done, sending to parent:", result.length);


    // ৩. প্যারেন্টকে ডেটা পাঠানো
    onFilterChange(result);

  }, [form.division, form.district, form.thana, onFilterChange]); //



  const handleSelectChange = (key: keyof FormState, value: string) => {

    setForm(prev => {
      const newState = { ...prev, [key]: value };
      // Cascade Reset: If division changes, reset district and thana. If district changes, reset thana.
      if (key === 'division') { newState.district = ''; newState.thana = ''; }
      if (key === 'district') { newState.thana = ''; }
      return newState;
    });
  };

  const onRowClick = (item: UserDataItem) => {
    setSelected(item);
    setOpen(true);
  };
  return (
    <div className="max-w-7xl mx-auto px-2 py-6">

      {/* BRANDING HEADER */}
      <div className="text-center mb-2">
        <span className="bg-emerald-100 text-emerald-700 px-4 py-1 rounded-full text-lg font-bold uppercase tracking-widest">
          বরিশাল জেলা প্রশাসন
        </span>
        <h1 className="text-2xl md:text-2xl font-black text-slate-800 mt-1">ভোট কেন্দ্র অনুসন্ধান পোর্টাল</h1>
        <p className="text-slate-500 mt-1">আপনার সঠিক তথ্য পেতে নিচের ধাপগুলো অনুসরণ করুন</p>
      </div>

      {/* REACTIVE FILTER BOX */}

      <div className="bg-white border-2 border-emerald-100 rounded-3xl p-6 shadow-xl shadow-emerald-900/5 grid grid-cols-1 md:grid-cols-3 gap-6 relative overflow-hidden">
        <div className="absolute top-0 left-0 w-1 h-full bg-emerald-500"></div>

        {/* Dropdown 1: Seat */}
        <div className="space-y-2">
          <label className="flex items-center gap-2 text-base font-bold text-slate-700 ml-1">
            <MapPin size={16} className="text-emerald-500" /> সংসদীয় আসন
          </label>
          <select
            value={form.division}
            onChange={(e) => handleSelectChange('division', e.target.value)}
            className="w-full bg-slate-50 border-2 border-slate-100 rounded-2xl px-4 py-3.5 focus:border-emerald-500 focus:bg-white outline-none transition-all font-medium text-slate-700"
          >
            <option value="">আসন নির্বাচন করুন</option>
            {seatOptions.map(opt => <option key={opt.id} value={opt.value}>{opt.label}</option>)}
          </select>
        </div>

        {/* Dropdown 2: Upazila */}
        <div className={`space-y-2 transition-all ${!form.division ? 'opacity-40 grayscale pointer-events-none' : ''}`}>
          <label className="flex items-center gap-2 text-base font-bold text-slate-700 ml-1">
            <Search size={16} className="text-emerald-500" /> উপজেলা
          </label>
          <select
            value={form.district}
            onChange={(e) => handleSelectChange('district', e.target.value)}
            className="w-full bg-slate-50 border-2 border-slate-100 rounded-2xl px-4 py-3.5 focus:border-emerald-500 focus:bg-white outline-none transition-all font-medium text-slate-700"
          >
            <option value="">উপজেলা নির্বাচন করুন</option>
            {districtOptions.map(opt => <option key={opt.id} value={opt.value}>{opt.label}</option>)}
          </select>
        </div>

        {/* Dropdown 3: Election Area */}
        <div className={`space-y-2 transition-all ${!form.district ? 'opacity-40 grayscale pointer-events-none' : ''}`}>
          <label className="flex items-center gap-2 text-base font-bold text-slate-700 ml-1">
            <Users size={16} className="text-emerald-500" /> নির্বাচনী এলাকা
          </label>
          <select
            value={form.thana}
            onChange={(e) => handleSelectChange('thana', e.target.value)}
            className="w-full bg-slate-50 border-2 border-slate-100 rounded-2xl px-4 py-3.5 focus:border-emerald-500 focus:bg-white outline-none transition-all font-medium text-slate-700"
          >
            <option value="">এলাকা নির্বাচন করুন</option>
            {thanaOptions.map(opt => <option key={opt.id} value={opt.value}>{opt.label}</option>)}
          </select>
        </div>
      </div>

      {/* RESULTS LIST */}
      <div className="mt-12">
        {finalResults.length > 0 ? (
          <div className="space-y-4">
            <div className="flex justify-between items-end px-2">
              <h3 className="text-xl font-bold text-slate-800">মোট কেন্দ্র: {finalResults.length} টি</h3>
              <button
                onClick={() => setForm({ division: '', district: '', thana: '' })}
                className="text-sm text-rose-500 font-semibold hover:underline"
              >
                রিসেট করুন
              </button>
            </div>

            {/* Desktop View */}
            <div className="hidden md:block bg-white rounded-3xl border border-slate-200 shadow-sm overflow-hidden">
              <table className="w-full text-left">
                <thead className="bg-emerald-600 text-white">
                  <tr>
                    <th className="p-5">ক্রমিক</th>
                    <th className="p-5">ভোট কেন্দ্রের নাম ও অবস্থান</th>
                    <th className="p-5">মোট ভোটার</th>
                    <th className="p-5 text-center">অ্যাকশন</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-100">
                  {finalResults.map((item, i) => (
                    <tr key={item.id} className="hover:bg-emerald-50/50 transition-colors">
                      <td className="p-5 font-bold text-emerald-600">
                        <div className="flex items-center gap-2"><Hash size={14} />{i + 1}</div>
                      </td>
                      <td className="p-5">
                        <p className="font-bold text-slate-800">{item.name}</p>
                        <p className="text-xs text-slate-500 mt-1 uppercase tracking-tighter">{item.location || 'বিস্তারিত নেই'}</p>
                      </td>
                      <td className="p-5">
                        <span className="bg-emerald-100 text-emerald-800 px-3 py-1 rounded-full text-base font-black">
                          {item.total}
                        </span>
                      </td>
                      <td className="p-5 text-center">
                        <button
                          onClick={() => onRowClick(item)}
                          className="bg-emerald-50 text-emerald-700 hover:bg-emerald-600 hover:text-white px-4 py-2 rounded-xl text-base font-bold transition-all inline-flex items-center gap-1"
                        >
                          বিস্তারিত <ChevronRight size={14} />
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>

            {/* Mobile View */}
            <div className="md:hidden space-y-4">
              {finalResults.map((item, i) => (
                <div key={item.id} className="bg-white border border-slate-200 rounded-3xl p-5 shadow-sm">
                  <div className="flex justify-between mb-3">
                    <span className="text-emerald-600 font-bold">#{i + 1}</span>
                    <span className="text-0 text-slate-400 font-bold uppercase">{item.room} কক্ষ</span>
                  </div>
                  <h4 className="font-black text-slate-800 text-lg leading-tight">{item.name}</h4>
                  <div className="mt-4 flex justify-between items-center bg-slate-50 p-3 rounded-2xl">
                    <div>
                      <p className="text-[10px] text-slate-400 font-bold uppercase">মোট ভোটার</p>
                      <p className="font-black text-emerald-700">{item.total}</p>
                    </div>
                    <button
                      onClick={() => { setSelected(item); setOpen(true); }}
                      className="bg-emerald-600 text-white px-4 py-2 rounded-xl text-xs font-bold"
                    >
                      বিস্তারিত দেখুন
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        ) : (
          <div className="text-center py-20 bg-emerald-50/30 border-2 border-dashed border-emerald-100 rounded-[3rem]">
            <MapPin size={48} className="mx-auto text-emerald-200 mb-4" />
            <p className="text-emerald-900 font-bold">কোনো কেন্দ্র পাওয়া যায়নি</p>
            <p className="text-emerald-600/60 text-sm mt-1">অনুগ্রহ করে উপরের তথ্যগুলো নির্বাচন করুন</p>
          </div>
        )}
      </div>

      {/* Modal Integration */}
      {selected && <VoterCenterModal open={open} setOpen={setOpen} selectedRow={selected} />}
    </div>
  );
};

export default DependentForm;