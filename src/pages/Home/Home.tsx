import { useCallback, useState } from "react";
import type { UserDataItem } from '../../types/election';

import userDataRaw from '../../data/userDataRaw.json';
import StatsDashboard from "./StatsDashboard";
import DependentForm from "./DependentForm";


const HomePage: React.FC = () => {
    const [filteredData, setFilteredData] = useState<UserDataItem[]>(
        (userDataRaw as UserDataItem[]) || []
    );

    const handleFilterChange = useCallback((newData: UserDataItem[]) => {
        setFilteredData(newData);
    }, []);

    return (
        <div className="bg-slate-50 min-h-screen">
            {/* ১. ড্যাশবোর্ড - উপরের প্যাডিং কমানো হয়েছে */}
            <div className="animate-in fade-in slide-in-from-bottom-4 duration-700">
                <StatsDashboard data={filteredData} />
            </div>

            {/* ২. ফিল্টার কম্পোনেন্ট - নেগেটিভ মার্জিন বা জিরো মার্জিন ব্যবহার */}
            <div className="-mt-4 md:-mt-6">
                <DependentForm onFilterChange={handleFilterChange} />
            </div>
        </div>
    );
}


export default HomePage;