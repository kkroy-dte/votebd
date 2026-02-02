import { useState } from 'react';
import { NavLink } from 'react-router-dom';

export default function Navbar() {
    const [isOpen, setIsOpen] = useState(false);

    const linkStyles = ({ isActive }: { isActive: boolean }) =>
        `font-medium transition-colors duration-200 py-1 ${isActive
            ? 'text-emerald-600 border-b-2 border-emerald-600'
            : 'text-slate-600 hover:text-emerald-600'
        }`;

    const mobileLinkStyles = ({ isActive }: { isActive: boolean }) =>
        `block px-3 py-2 rounded-md text-base font-medium ${isActive
            ? 'bg-emerald-50 text-emerald-600'
            : 'text-slate-700 hover:bg-slate-50 hover:text-emerald-600'
        }`;

    return (
        <nav className="bg-white shadow-sm sticky top-0 z-50 border-b border-slate-100">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                {/* Desktop & Tablet Layout */}
                <div className="flex justify-between h-15 items-center">

                    {/* 1. Left Logo */}
                    <div className="shrink-0">
                        <img
                            src="nir.png"
                            alt="Gov Logo"
                            className="h-10 w-10 object-contain"
                        />
                    </div>

                    {/* 2. Middle Text (Responsive: hidden on very small screens or resized) */}
                    <div className="grow text-center px-2">
                        <h1 className="text-emerald-700 font-bold text-lg md:text-1xl lg:text-2xl tracking-wide">
                            জেলা প্রশাসন বরিশাল
                        </h1>
                    </div>

                    {/* 3. Right Logo & Nav Links */}
                    <div className="flex items-center space-x-4">
                        {/* Desktop Navigation */}
                        <div className="hidden lg:flex items-center space-x-6 mr-4">
                            <NavLink to="/" className={linkStyles}>Home</NavLink>
                            <NavLink to="/about" className={linkStyles}>About</NavLink>
                        </div>

                        <img
                            src="logo.png"
                            alt="Gov Logo"
                            className="h-10 w-auto hidden sm:block"
                        />

                        {/* Mobile Menu Button */}
                        <button onClick={() => setIsOpen(!isOpen)} className="lg:hidden p-2 text-slate-600">
                            <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                {isOpen ? <path d="M6 18L18 6M6 6l12 12" /> : <path d="M4 6h16M4 12h16M4 18h16" />}
                            </svg>
                        </button>
                    </div>
                </div>
            </div>

            {/* Mobile Menu Dropdown */}
            <div className={`${isOpen ? 'block' : 'hidden'} md:hidden bg-white border-t border-slate-100 animate-in slide-in-from-top-2 duration-200`}>
                <div className="px-2 pt-2 pb-3 space-y-1">
                    <NavLink to="/" onClick={() => setIsOpen(false)} className={mobileLinkStyles}>Home</NavLink>
                    <NavLink to="/about" onClick={() => setIsOpen(false)} className={mobileLinkStyles}>About</NavLink>
                    <div className="p-2">
                        <button className="w-full bg-emerald-600 text-white px-4 py-2 rounded-lg font-medium">Get Started</button>
                    </div>
                </div>
            </div>
        </nav>
    );
}