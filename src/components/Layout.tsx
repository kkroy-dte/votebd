import { Outlet } from 'react-router-dom';
import Navbar from './Navbar';

export default function Layout() {
    return (
        <div className="min-h-screen flex flex-col bg-slate-50">
            <Navbar />

            {/* Main content expands to fill space <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-5"> */}
            <main className="grow">
                <div className="max-w-7xl mx-auto px-2 sm:px-3 lg:px-4">
                    <Outlet />
                </div>
            </main>

            <footer className="bg-white border-t border-slate-200 py-2">
                <div className="max-w-7xl mx-auto px-2 text-center text-slate-500 text-sm">
                    ©২০২৬-বরিশাল পলিটেকনিক ইনস্টিটিউট (কিশোর কুমার রায়)।
                </div>
            </footer>
        </div>
    );
}