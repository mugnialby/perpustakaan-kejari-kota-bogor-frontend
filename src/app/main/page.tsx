"use client";

import { Search } from "lucide-react"; // icon
import Link from "next/link";

export default function MainPage() {
    return (
        <>
            {/* Content */}
            <div className="relative z-10 text-center px-6" >
                <h1 className="text-4xl md:text-6xl font-bold mb-4">
                    Perpustakaan <br /> Kejari Kota Bogor.
                </h1>
                <p className="text-lg md:text-xl text-gray-700 mb-8 max-w-xl mx-auto">
                    Temukan buku-buku yang akan membantu anda dalam menjadi insan Adhyaksa yang lebih baik.
                </p>
            </div>

            <div className="relative z-10 text-center px-6">
                <Link
                    href="/pencarian/buku"
                    className="inline-flex items-center gap-2 bg-black text-white px-4 py-2 rounded-full font-medium hover:bg-gray-800 transition"
                >
                    Cari Buku
                    <Search size={16} fill="white" />
                </Link>
            </div>
        </>
    );
}
