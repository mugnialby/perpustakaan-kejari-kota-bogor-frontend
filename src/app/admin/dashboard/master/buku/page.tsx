"use client";

import { useState } from "react";
import { Search, Plus, BookOpen, Pencil, Trash } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

export default function MasterBuku() {
    const [showAddPopup, setShowAddPopup] = useState(false);
    const [searchQuery, setSearchQuery] = useState("");

    // Example table data
    const [books, setBooks] = useState([
        {
            id: 1,
            foto: ["/book1.png"],
            nama: "Buku Hukum Pidana",
            penulis: "Andi",
            tahun: 2020,
            lokasi: "Rak A1",
            user: "admin",
            date: "2025-09-26",
        },
        {
            id: 2,
            foto: ["/book2.png"],
            nama: "Pengantar Hukum",
            penulis: "Budi",
            tahun: 2019,
            lokasi: "Rak B2",
            user: "admin",
            date: "2025-09-26",
        },
    ]);

    // Filter books based on search
    const filteredBooks = books.filter((book) =>
        [book.nama, book.penulis, book.tahun.toString(), book.lokasi]
            .join(" ")
            .toLowerCase()
            .includes(searchQuery.toLowerCase())
    );

    // Handle new book submission
    const handleAddBook = (e: React.FormEvent) => {
        e.preventDefault();
        const form = e.target as HTMLFormElement;
        const formData = new FormData(form);

        const newBook = {
            id: books.length + 1,
            foto: Array.from(formData.getAll("foto")) as string[],
            nama: formData.get("nama") as string,
            penulis: formData.get("penulis") as string,
            tahun: formData.get("tahun") as string,
            lokasi: formData.get("lokasi") as string,
            user: "admin",
            date: new Date().toISOString().slice(0, 10),
        };

        setBooks([...books, newBook]);
        setShowAddPopup(false);
        form.reset();
    };

    return (
        <>
            <div className="flex flex-col h-full p-6 space-y-6">
                {/* Top Card with Search & Add */}
                <div className="bg-white shadow rounded-xl p-4 flex items-center justify-between">
                    <div className="flex items-center gap-2 w-1/2">
                        <input
                            type="text"
                            placeholder="Cari Buku..."
                            value={searchQuery}
                            onChange={(e) => setSearchQuery(e.target.value)}
                            className="flex-grow px-3 py-2 border border-gray-300 rounded-lg outline-none text-gray-900"
                        />
                        <Search size={18} className="text-gray-500" />
                    </div>
                    <button
                        onClick={() => setShowAddPopup(true)}
                        className="flex items-center gap-2 bg-green-600 hover:bg-green-700 text-white px-4 py-2 rounded-lg shadow"
                    >
                        <Plus size={18} /> Tambah Buku
                    </button>
                </div>

                {/* Table Card */}
                <div className="flex-1 bg-white shadow rounded-xl p-4 overflow-x-auto">
                    <table className="w-full border-collapse text-sm min-w-[900px]">
                        <thead className="bg-gray-100 text-gray-900">
                            <tr>
                                <th className="px-3 py-2 text-left">No.</th>
                                <th className="px-3 py-2 text-left">Foto Buku</th>
                                <th className="px-3 py-2 text-left">Nama Buku</th>
                                <th className="px-3 py-2 text-left">Nama Penulis</th>
                                <th className="px-3 py-2 text-left">Tahun Terbit</th>
                                <th className="px-3 py-2 text-left hidden md:table-cell">Lokasi</th>
                                <th className="px-3 py-2 text-left hidden md:table-cell">User Created</th>
                                <th className="px-3 py-2 text-left hidden md:table-cell">Date Created</th>
                                <th className="px-3 py-2 text-left">Actions</th>
                            </tr>
                        </thead>
                        <tbody className="text-gray-800">
                            <AnimatePresence>
                                {filteredBooks.map((book, idx) => (
                                    <motion.tr
                                        key={book.id}
                                        initial={{ opacity: 0, y: 10 }}
                                        animate={{ opacity: 1, y: 0 }}
                                        exit={{ opacity: 0, y: -10 }}
                                        transition={{ duration: 0.2 }}
                                        className="border-b hover:bg-gray-50"
                                    >
                                        <td className="px-3 py-2">{idx + 1}</td>
                                        <td className="px-3 py-2">
                                            <div className="flex gap-1">
                                                {book.foto.map((f, i) => (
                                                    <img
                                                        key={i}
                                                        src={f}
                                                        alt="foto buku"
                                                        className="w-10 h-12 object-cover rounded"
                                                    />
                                                ))}
                                            </div>
                                        </td>
                                        <td className="px-3 py-2">{book.nama}</td>
                                        <td className="px-3 py-2">{book.penulis}</td>
                                        <td className="px-3 py-2">{book.tahun}</td>
                                        <td className="px-3 py-2">{book.lokasi}</td>
                                        <td className="px-3 py-2">{book.user}</td>
                                        <td className="px-3 py-2">{book.date}</td>
                                        <td className="px-3 py-2 flex gap-2">
                                            <button className="flex items-center gap-1 bg-blue-600 text-white px-2 py-1 rounded text-xs md:text-sm">
                                                <BookOpen size={14} /> Detail
                                            </button>
                                            <button className="flex items-center gap-1 bg-yellow-500 text-white px-2 py-1 rounded text-xs md:text-sm">
                                                <Pencil size={14} /> Edit
                                            </button>
                                            <button className="flex items-center gap-1 bg-red-600 text-white px-2 py-1 rounded text-xs md:text-sm">
                                                <Pencil size={14} /> Delete
                                            </button>
                                        </td>
                                    </motion.tr>
                                ))}

                                {filteredBooks.length === 0 && (
                                    <motion.tr
                                        initial={{ opacity: 0 }}
                                        animate={{ opacity: 1 }}
                                        exit={{ opacity: 0 }}
                                        transition={{ duration: 0.3 }}
                                    >
                                        <td colSpan={9} className="text-center text-gray-500 py-6 italic">
                                            Tidak ada buku yang ditemukan.
                                        </td>
                                    </motion.tr>
                                )}
                            </AnimatePresence>
                        </tbody>
                    </table>
                </div>

                {/* Add Book Popup */}
                <AnimatePresence>
                    {showAddPopup && (
                        <motion.div
                            className="fixed inset-0 z-50 flex items-center justify-center bg-black/50"
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            exit={{ opacity: 0 }}
                        >
                            <motion.div
                                initial={{ scale: 0.8 }}
                                animate={{ scale: 1 }}
                                exit={{ scale: 0.8 }}
                                className="bg-white rounded-xl shadow-xl w-full max-w-2xl p-6"
                            >
                                <h2 className="text-lg font-bold mb-4">Tambah Buku</h2>
                                <form onSubmit={handleAddBook} className="space-y-4">
                                    <div>
                                        <label className="block text-sm font-medium">Nama Buku</label>
                                        <input
                                            name="nama"
                                            required
                                            className="w-full border px-3 py-2 rounded-lg"
                                        />
                                    </div>
                                    <div>
                                        <label className="block text-sm font-medium">Nama Penulis</label>
                                        <input
                                            name="penulis"
                                            required
                                            className="w-full border px-3 py-2 rounded-lg"
                                        />
                                    </div>
                                    <div>
                                        <label className="block text-sm font-medium">Tahun Terbit</label>
                                        <input
                                            type="number"
                                            name="tahun"
                                            required
                                            className="w-full border px-3 py-2 rounded-lg"
                                        />
                                    </div>
                                    <div>
                                        <label className="block text-sm font-medium">Lokasi</label>
                                        <input
                                            name="lokasi"
                                            required
                                            className="w-full border px-3 py-2 rounded-lg"
                                        />
                                    </div>
                                    <div>
                                        <label className="block text-sm font-medium">Foto Buku</label>
                                        <input
                                            type="file"
                                            name="foto"
                                            multiple
                                            accept="image/*"
                                            className="w-full border px-3 py-2 rounded-lg"
                                        />
                                    </div>

                                    {/* Actions */}
                                    <div className="flex justify-end gap-2 pt-4">
                                        <button
                                            type="button"
                                            onClick={() => setShowAddPopup(false)}
                                            className="px-4 py-2 rounded-lg border border-gray-300 hover:bg-gray-100"
                                        >
                                            Batal
                                        </button>
                                        <button
                                            type="submit"
                                            className="px-4 py-2 rounded-lg bg-green-600 text-white hover:bg-green-700"
                                        >
                                            Simpan
                                        </button>
                                    </div>
                                </form>
                            </motion.div>
                        </motion.div>
                    )}
                </AnimatePresence>
            </div>
        </>
    );
}
