"use client";

import { useState } from "react";
import { Search } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import PopupBookDetail from "@/components/main/popup/Popup-book-detail";

export default function HomePage() {
    const [showTable, setShowTable] = useState(false);
    const [showAdvanced, setShowAdvanced] = useState(false);
    const [selectedBook, setSelectedBook] = useState<any | null>(null);

    // Example data
    const books = [
        { id: 1, nama: "Buku Hukum Pidana", penulis: "Andi", tahun: 2020 },
        { id: 2, nama: "Pengantar Hukum", penulis: "Budi", tahun: 2018 },
        { id: 3, nama: "Etika Profesi", penulis: "Citra", tahun: 2021 },
        { id: 4, nama: "Hukum Perdata", penulis: "Dian", tahun: 2019 },
        { id: 5, nama: "Keadilan Sosial", penulis: "Eko", tahun: 2022 },
        { id: 1, nama: "Buku Hukum Pidana", penulis: "Andi", tahun: 2020 },
        { id: 2, nama: "Pengantar Hukum", penulis: "Budi", tahun: 2018 },
        { id: 3, nama: "Etika Profesi", penulis: "Citra", tahun: 2021 },
        { id: 4, nama: "Hukum Perdata", penulis: "Dian", tahun: 2019 },
        { id: 5, nama: "Keadilan Sosial", penulis: "Eko", tahun: 2022 },
        { id: 1, nama: "Buku Hukum Pidana", penulis: "Andi", tahun: 2020 },
        { id: 2, nama: "Pengantar Hukum", penulis: "Budi", tahun: 2018 },
        { id: 3, nama: "Etika Profesi", penulis: "Citra", tahun: 2021 },
        { id: 4, nama: "Hukum Perdata", penulis: "Dian", tahun: 2019 },
        { id: 5, nama: "Keadilan Sosial", penulis: "Eko", tahun: 2022 },
        { id: 1, nama: "Buku Hukum Pidana", penulis: "Andi", tahun: 2020 },
        { id: 2, nama: "Pengantar Hukum", penulis: "Budi", tahun: 2018 },
        { id: 3, nama: "Etika Profesi", penulis: "Citra", tahun: 2021 },
        { id: 4, nama: "Hukum Perdata", penulis: "Dian", tahun: 2019 },
        { id: 5, nama: "Keadilan Sosial", penulis: "Eko", tahun: 2022 },
        { id: 1, nama: "Buku Hukum Pidana", penulis: "Andi", tahun: 2020 },
        { id: 2, nama: "Pengantar Hukum", penulis: "Budi", tahun: 2018 },
        { id: 3, nama: "Etika Profesi", penulis: "Citra", tahun: 2021 },
        { id: 4, nama: "Hukum Perdata", penulis: "Dian", tahun: 2019 },
        { id: 5, nama: "Keadilan Sosial", penulis: "Eko", tahun: 2022 },
        { id: 1, nama: "Buku Hukum Pidana", penulis: "Andi", tahun: 2020 },
        { id: 2, nama: "Pengantar Hukum", penulis: "Budi", tahun: 2018 },
        { id: 3, nama: "Etika Profesi", penulis: "Citra", tahun: 2021 },
        { id: 4, nama: "Hukum Perdata", penulis: "Dian", tahun: 2019 },
        { id: 5, nama: "Keadilan Sosial", penulis: "Eko", tahun: 2022 },
    ];

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        setShowTable(true);
    };

    return (
        <>
            {/* Search Card */}
            <div className="max-w-2xl mx-auto bg-white shadow-lg rounded-2xl p-6 sticky top-20 z-20 transition-all">
                <h1 className="text-2xl font-semibold text-center mb-4">Pencarian</h1>

                {/* Simple Search */}
                <div
                    className={`transition-all duration-500 origin-top ${showAdvanced
                        ? "max-h-0 opacity-0 scale-y-0"
                        : "max-h-40 opacity-100 scale-y-100"
                        }`}
                >
                    <div className="flex items-center rounded-full border border-gray-300 bg-white px-4 py-2 shadow-sm">
                        <input
                            type="text"
                            placeholder="Masukan Nama Buku"
                            className="flex-grow bg-transparent outline-none text-gray-700 placeholder-gray-400"
                        />
                        <button
                            onClick={() => setShowTable(true)}
                            className="bg-black text-white px-4 py-2 rounded-full ml-2 flex items-center gap-1"
                        >
                            <Search size={16} />
                            Cari
                        </button>
                    </div>
                </div>

                {/* Advanced Search */}
                <div
                    className={`transition-all duration-500 origin-top ${showAdvanced
                        ? "max-h-96 opacity-100 scale-y-100"
                        : "max-h-0 opacity-0 scale-y-0"
                        }`}
                >
                    <div className="space-y-3 mt-3">
                        <input
                            type="text"
                            placeholder="Nama Buku"
                            className="w-full px-4 py-2 border border-gray-300 rounded-xl bg-white outline-none"
                        />
                        <input
                            type="text"
                            placeholder="Penulis"
                            className="w-full px-4 py-2 border border-gray-300 rounded-xl bg-white outline-none"
                        />
                        <input
                            type="text"
                            placeholder="Tahun Terbit"
                            className="w-full px-4 py-2 border border-gray-300 rounded-xl bg-white outline-none"
                        />
                        <button
                            onClick={() => setShowTable(true)}
                            className="w-full bg-black text-white py-2 rounded-xl flex items-center justify-center gap-2"
                        >
                            <Search size={16} />
                            Cari
                        </button>
                    </div>
                </div>

                {/* Toggle Advanced */}
                <div className="text-center mt-3">
                    <button
                        onClick={() => setShowAdvanced(!showAdvanced)}
                        className="text-sm text-blue-600 hover:underline"
                    >
                        {showAdvanced ? "Tutup Pencarian Lanjutan" : "Pencarian Lanjutan"}
                    </button>
                </div>
            </div>

            {/* Table Card */}
            {showTable && (
                <div className="relative max-w-4xl mx-auto bg-white shadow-lg rounded-2xl p-6 mt-6">
                    <div className="overflow-x-auto max-h-[400px] overflow-y-auto">
                        <table className="w-full border-collapse">
                            <thead className="bg-gray-100 sticky top-0">
                                <tr>
                                    <th className="px-4 py-2 text-left">No.</th>
                                    <th className="px-4 py-2 text-left">Nama Buku</th>
                                    <th className="px-4 py-2 text-left">Penulis</th>
                                    <th className="px-4 py-2 text-left">Tahun Terbit</th>
                                    <th className="px-4 py-2 text-left">Action</th>
                                </tr>
                            </thead>
                            <tbody>
                                <AnimatePresence>
                                    {books.map((book, idx) => (
                                        <motion.tr
                                            key={idx}
                                            initial={{ opacity: 0, y: 10 }}
                                            animate={{ opacity: 1, y: 0 }}
                                            exit={{ opacity: 0, y: -10 }}
                                            transition={{ duration: 0.3, delay: idx * 0.05 }}
                                            className="border-b hover:bg-gray-50 transition"
                                        >
                                            <td className="px-4 py-2">{idx + 1}</td>
                                            <td className="px-4 py-2">{book.nama}</td>
                                            <td className="px-4 py-2">{book.penulis}</td>
                                            <td className="px-4 py-2">{book.tahun}</td>
                                            <td className="px-4 py-2">
                                                <button
                                                    onClick={() => setSelectedBook(book)}
                                                    className="bg-black text-white text-sm px-4 py-1 rounded-full shadow hover:bg-gray-800"
                                                >
                                                    Detail
                                                </button>
                                            </td>
                                        </motion.tr>
                                    ))}
                                </AnimatePresence>
                            </tbody>
                        </table>
                    </div>
                </div>
            )}

            {/* Detail Popup */}
            <PopupBookDetail
                selectedBook={selectedBook}
                onClose={() => setSelectedBook(null)}
            />
        </>
    );
}
