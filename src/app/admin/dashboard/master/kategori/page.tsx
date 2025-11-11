"use client";

import { useState, useEffect } from "react";
import axios from "axios";
import Swal from "sweetalert2";
import { Plus, BookOpen, Pencil, Trash } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

export default function MasterKategori() {
    const [showPopup, setShowPopup] = useState(false);
    const [isEditing, setIsEditing] = useState(false);
    const [editingCategory, setEditingCategory] = useState<any>(null);
    const [searchQuery, setSearchQuery] = useState("");
    const [categories, setCategories] = useState<any[]>([]);

    // 🆕 Pagination states
    const [currentPage, setCurrentPage] = useState(1);
    const [recordsPerPage, setRecordsPerPage] = useState(10);

    const API_URL = "http://192.168.50.52:8080/api/master/categories/";

    const getAllCategories = async () => {
        try {
            const response = await axios.get(API_URL);
            setCategories(response.data.data);
        } catch (error) {
            console.error("Error fetching categories:", error);
        }
    };

    useEffect(() => {
        getAllCategories();
    }, []);

    // ✅ Small Toast Notification (Top Right)
    const showToast = (icon: "success" | "error", title: string) => {
        Swal.fire({
            toast: true,
            position: "top-end",
            icon,
            title,
            showConfirmButton: false,
            timer: 2000,
            timerProgressBar: true,
            customClass: {
                popup: "rounded-lg shadow-md",
            },
        });
    };

    const handleSubmitCategory = async (e: React.FormEvent) => {
        e.preventDefault();
        const form = e.target as HTMLFormElement;
        const formData = new FormData(form);

        const categoryData = {
            categoryName: formData.get("categoryName"),
        };

        try {
            if (isEditing && editingCategory) {
                await axios.put(`${API_URL}${editingCategory.id}`, categoryData, {
                    headers: { "Content-Type": "application/json" },
                });
                showToast("success", "Kategori berhasil diperbarui");
            } else {
                await axios.post(API_URL, categoryData, {
                    headers: { "Content-Type": "application/json" },
                });
                showToast("success", "Kategori berhasil ditambahkan");
            }

            await getAllCategories();
            setShowPopup(false);
            setIsEditing(false);
            setEditingCategory(null);
            form.reset();
        } catch (error) {
            console.error("Error saving category:", error);
            showToast("error", "Gagal menyimpan kategori");
        }
    };

    const handleEdit = (category: any) => {
        setEditingCategory(category);
        setIsEditing(true);
        setShowPopup(true);
    };

    const handleDelete = async (category: any) => {
        Swal.fire({
            title: `Hapus data?`,
            text: "Tindakan ini tidak dapat dibatalkan!",
            icon: "warning",
            showCancelButton: true,
            confirmButtonColor: "#d33",
            cancelButtonColor: "#3085d6",
            confirmButtonText: "Hapus",
            cancelButtonText: "Batal",
        }).then(async (result) => {
            if (result.isConfirmed) {
                try {
                    await axios.patch(`${API_URL}${category.id}`, { status: "N" });
                    showToast("success", "Data telah dihapus");
                    await getAllCategories();
                } catch (error) {
                    console.error("Error deleting category:", error);
                    showToast("error", "Tidak dapat menghapus kategori");
                }
            }
        });
    };

    // ✅ Filter & Pagination
    const filteredCategories = categories.filter((category) =>
        category.categoryName?.toLowerCase().includes(searchQuery.toLowerCase())
    );

    const totalPages = Math.ceil(filteredCategories.length / recordsPerPage);
    const startIndex = (currentPage - 1) * recordsPerPage;
    const currentCategories = filteredCategories.slice(
        startIndex,
        startIndex + recordsPerPage
    );

    const changePage = (page: number) => {
        if (page >= 1 && page <= totalPages) setCurrentPage(page);
    };

    return (
        <div className="flex flex-col h-full space-y-3">
            {/* 🔍 Search and Add */}
            <div className="bg-white shadow rounded-xl p-4 flex flex-wrap items-center justify-between gap-3">
                <div className="flex items-center gap-2 w-full md:w-1/2">
                    <input
                        type="text"
                        placeholder="Cari Kategori..."
                        value={searchQuery}
                        onChange={(e) => setSearchQuery(e.target.value)}
                        className="flex-grow px-3 py-2 border border-gray-300 rounded-lg outline-none text-gray-900"
                    />
                </div>
                <button
                    onClick={() => {
                        setShowPopup(true);
                        setIsEditing(false);
                        setEditingCategory(null);
                    }}
                    className="flex items-center gap-2 bg-green-600 hover:bg-green-700 text-white px-4 py-2 rounded-lg shadow"
                >
                    <Plus size={18} /> Tambah Kategori
                </button>
            </div>

            {/* 📚 Table */}
            <div className="flex-1 bg-white shadow rounded-xl p-4 overflow-x-auto">
                <table className="w-full border-collapse text-sm min-w-[600px]">
                    <thead className="bg-green-100 text-gray-900">
                        <tr>
                            <th className="px-3 py-2 text-left w-0">No.</th>
                            <th className="px-3 py-2 text-left w-full">Kategori</th>
                            <th className="px-3 py-2 text-left">Aksi</th>
                        </tr>
                    </thead>
                    <tbody className="text-gray-800">
                        <AnimatePresence>
                            {currentCategories.length > 0 ? (
                                currentCategories.map((category, idx) => (
                                    <motion.tr
                                        key={category.id || idx}
                                        initial={{ opacity: 0, y: 10 }}
                                        animate={{ opacity: 1, y: 0 }}
                                        exit={{ opacity: 0, y: -10 }}
                                        transition={{ duration: 0.2 }}
                                        className="border-b hover:bg-gray-50"
                                    >
                                        <td className="px-3 py-2">{startIndex + idx + 1}</td>
                                        <td className="px-3 py-2">{category.categoryName}</td>
                                        <td className="px-3 py-2 flex gap-2">
                                            <button
                                                onClick={() => handleEdit(category)}
                                                className="flex items-center gap-1 bg-yellow-500 hover:bg-yellow-600 text-white px-2 py-1 rounded text-xs md:text-sm"
                                            >
                                                <Pencil size={14} /> Ubah
                                            </button>
                                            <button
                                                onClick={() => handleDelete(category)}
                                                className="flex items-center gap-1 bg-red-600 hover:bg-red-700 text-white px-2 py-1 rounded text-xs md:text-sm"
                                            >
                                                <Trash size={14} /> Hapus
                                            </button>
                                        </td>
                                    </motion.tr>
                                ))
                            ) : (
                                <tr>
                                    <td
                                        colSpan={3}
                                        className="text-center py-6 text-gray-500 italic bg-gray-50"
                                    >
                                        Tidak ada data
                                    </td>
                                </tr>
                            )}
                        </AnimatePresence>
                    </tbody>
                </table>

                {/* 🆕 Pagination controls */}
                <div className="flex flex-wrap justify-between items-center mt-4 text-sm gap-3">
                    <div className="flex items-center gap-2">
                        <span className="text-gray-700">Tampilkan:</span>
                        <select
                            value={recordsPerPage}
                            onChange={(e) => {
                                setRecordsPerPage(Number(e.target.value));
                                setCurrentPage(1);
                            }}
                            className="border rounded-lg px-2 py-1 text-gray-700"
                        >
                            {[10, 20, 50, 100].map((val) => (
                                <option key={val} value={val}>
                                    {val}
                                </option>
                            ))}
                        </select>
                        <span className="text-gray-700">per halaman</span>
                    </div>

                    <div className="flex gap-1">

                        <span className="text-gray-600 px-3 py-1">
                            Menampilkan {startIndex + 1} -{" "}
                            {Math.min(startIndex + recordsPerPage, filteredCategories.length)} dari{" "}
                            {filteredCategories.length} data
                        </span>

                        <button
                            disabled={currentPage === 1}
                            onClick={() => changePage(currentPage - 1)}
                            className={`px-3 py-1 rounded-lg border ${currentPage === 1
                                ? "bg-white text-gray-400"
                                : "bg-blue-500 hover:bg-blue-700 text-white"
                                }`}
                        >
                            Prev
                        </button>

                        {[...Array(totalPages)].map((_, i) => (
                            <button
                                key={i + 1}
                                onClick={() => changePage(i + 1)}
                                className={`px-3 py-1 rounded-lg border ${currentPage === i + 1
                                    ? "bg-blue-500 text-white"
                                    : "bg-white text-gray-400"
                                    }`}
                            >
                                {i + 1}
                            </button>
                        ))}

                        <button
                            disabled={currentPage === totalPages}
                            onClick={() => changePage(currentPage + 1)}
                            className={`px-3 py-1 rounded-lg border ${currentPage === totalPages
                                ? "bg-white text-gray-400"
                                : "bg-blue-500 hover:bg-blue-700 text-white"
                                }`}
                        >
                            Next
                        </button>
                    </div>
                </div>
            </div>

            {/* ➕ Add/Edit Modal */}
            <AnimatePresence>
                {showPopup && (
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
                            <h2 className="text-lg font-bold mb-4 text-black">
                                {isEditing ? "Ubah Kategori" : "Tambah Kategori"}
                            </h2>
                            <form onSubmit={handleSubmitCategory} className="space-y-4">
                                <div>
                                    <label className="block text-sm font-medium text-black">
                                        Kategori
                                    </label>
                                    <input
                                        name="categoryName"
                                        defaultValue={editingCategory?.categoryName || ""}
                                        required
                                        className="w-full border px-3 py-2 rounded-lg text-black"
                                    />
                                </div>

                                <div className="flex justify-end gap-2 pt-4">
                                    <button
                                        type="button"
                                        onClick={() => {
                                            setShowPopup(false);
                                            setIsEditing(false);
                                            setEditingCategory(null);
                                        }}
                                        className="px-4 py-2 rounded-lg bg-red-600 hover:bg-red-800 text-white"
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
    );
}
