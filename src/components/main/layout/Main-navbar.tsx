"use client"

import { useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { Menu, X } from "lucide-react"; // burger + close icons

export default function MainNavbar() {
    const [isOpen, setIsOpen] = useState(false);

    return (
        <nav className="fixed top-0 left-0 w-full bg-white/50 shadow z-50">
            <div className="max-w-7xl mx-auto px-6 py-4 flex items-center justify-between">

                {/* Logo */}
                <Link href="/main" className="flex items-center">
                    <Image
                        src="/logo.png"
                        alt="Logo Perpus"
                        width={40}   // adjust size as needed
                        height={40}
                        className="object-contain"
                        priority
                    />
                    <div className="text-2xl font-bold text-black ml-2">
                        Kejaksaan Negeri Kota Bogor
                    </div>
                </Link>

                {/* Nav Items */}
                <ul className="hidden md:flex space-x-8 text-black font-medium items-center ">
                    <li className="hover:text-blue-600 transition">
                        <Link href="/main">Beranda</Link>
                    </li>

                    {/* Dropdown on hover */}
                    <li className="relative group">
                        <button className="flex items-center gap-1 hover:text-blue-600 transition">
                            Pencarian ▾
                        </button>

                        {/* Dropdown Menu */}
                        <ul className="absolute left-0 mt-2 w-40 bg-white border rounded-lg shadow-md opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-200">
                            <li>
                                <Link
                                    href="/main/pencarian/buku"
                                    className="block px-4 py-2 hover:bg-gray-100 hover:text-blue-600 transition"
                                >
                                    Buku
                                </Link>
                            </li>
                            {/* Add more dropdown items here if needed */}
                        </ul>
                    </li>
                    <li className="hover:text-blue-600 transition">
                        <Link href="/main/tentang">Tentang</Link>
                    </li>
                </ul>

                <div className="hidden md:block">
                    <Link
                        href="/main/login"
                        className="bg-black text-white px-5 py-2 rounded-full hover:bg-gray-800 transition"
                    >
                        Masuk
                    </Link>
                </div>

                {/* Mobile Burger Icon */}
                <button
                    className="md:hidden text-black"
                    onClick={() => setIsOpen(!isOpen)}
                >
                    {isOpen ? <X size={28} /> : <Menu size={28} />}
                </button>
            </div>

            {/* Mobile Menu */}
            <div
                className={`md:hidden bg-white border-t shadow-md overflow-hidden transition-all duration-300 ease-in-out ${isOpen ? "max-h-96 opacity-100" : "max-h-0 opacity-0"
                    }`}
            >
                <ul className="flex flex-col space-y-4 px-6 py-4 text-black font-medium">
                    <Link href="/main">Beranda</Link>
                    <Link href="/main/pencarian/buku">Pencarian ▾</Link>
                    <Link href="/main/tentang">Tentang</Link>
                    <li>
                        <Link
                            href="/main/login"
                            className="bg-black text-white px-5 py-2 rounded-full hover:bg-gray-800 transition inline-block"
                        >
                            Masuk
                        </Link>
                    </li>
                </ul>
            </div>
        </nav>
    );
}