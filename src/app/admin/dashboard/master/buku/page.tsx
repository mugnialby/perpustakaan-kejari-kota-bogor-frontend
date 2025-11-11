"use client";

import { useState, useEffect } from "react";
import axios from "axios";
import Swal from "sweetalert2";
import { Plus, BookOpen, Pencil, Trash } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import Select from "react-select";
import PopupBookDetail from "@/components/main/popup/Popup-book-detail";

export default function MasterBuku() {
    const [showPopup, setShowPopup] = useState(false);
    const [isEditing, setIsEditing] = useState(false);
    const [editingBook, setEditingBook] = useState<any>(null);
    const [searchQuery, setSearchQuery] = useState("");
    const [books, setBooks] = useState<any[]>([]);

    // 🆕 Detail modal states
    const [selectedBook, setSelectedBook] = useState<any>(null);

    // 🆕 new states for combobox
    const [categories, setCategories] = useState<any[]>([]);
    const [racks, setRacks] = useState<any[]>([]);
    const [selectedCategory, setSelectedCategory] = useState<any>(null);
    const [selectedRack, setSelectedRack] = useState<any>(null);

    // 🆕 new state for uploaded image
    const [listBookAttachment, setListBookAttachment] = useState<any[]>([]);

    const [currentPage, setCurrentPage] = useState(1);
    const [recordsPerPage, setRecordsPerPage] = useState(10);

    const API_URL = "http://192.168.50.52:8080/api/master/books/";
    const CATEGORY_API = "http://192.168.50.52:8080/api/master/categories/";
    const RACK_API = "http://192.168.50.52:8080/api/master/racks/";

    /* CONSTRUCTOR FUNCTIONS */
    useEffect(() => {
        getAllBooks();
        getAllCategories();
        getAllRacks();
    }, []);

    // ✅ Fetch books, categories, and racks
    const getAllBooks = async () => {
        try {
            const response = await axios.get(API_URL);
            setBooks(response.data.data);
        } catch (error) {
            console.error("Error fetching books:", error);
        }
    };

    const getAllCategories = async () => {
        try {
            const response = await axios.get(CATEGORY_API);
            setCategories(response.data.data);
        } catch (error) {
            console.error("Error fetching categories:", error);
        }
    };

    const getAllRacks = async () => {
        try {
            const response = await axios.get(RACK_API);
            setRacks(response.data.data);
        } catch (error) {
            console.error("Error fetching racks:", error);
        }
    };

    // ✅ Toast Notification (top-right)
    const showToast = (icon: "success" | "error", title: string) => {
        Swal.fire({
            toast: true,
            position: "top-end",
            icon,
            title,
            showConfirmButton: false,
            timer: 2000,
            timerProgressBar: true,
            customClass: { popup: "rounded-lg shadow-md" },
        });
    };

    // 🆕 Convert image to base64
    const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
        const files = e.target.files;
        if (!files || files.length === 0) return;

        const validTypes = ["image/jpeg", "image/png"];

        Array.from(files).forEach((file) => {
            if (!validTypes.includes(file.type)) {
                showToast("error", "Hanya file JPG atau PNG yang diperbolehkan");
                return;
            }

            const reader = new FileReader();
            reader.onloadend = () => {
                const newImage = {
                    id: 0,
                    fileBase64: reader.result as string,
                    isNew: true, // mark as newly uploaded
                };

                setListBookAttachment((prev) => [...prev, newImage]);
            };
            reader.readAsDataURL(file);
        });
    };

    const handleSubmitBook = async (e: React.FormEvent) => {
        e.preventDefault();
        const form = e.target as HTMLFormElement;
        const formData = new FormData(form);

        const bookData = {
            title: formData.get("title"),
            author: formData.get("author"),
            publishedYear: formData.get("publishedYear")
                ? Number(formData.get("publishedYear"))
                : null,
            categoryId: selectedCategory?.value
                ? Number(selectedCategory.value)
                : null,
            rackId: selectedRack?.value
                ? Number(selectedRack.value)
                : null,
            rackRow: formData.get("rackRow")
                ? Number(formData.get("rackRow"))
                : null,
            listBookAttachments: listBookAttachment,
        };

        try {
            if (isEditing && editingBook) {
                await axios.put(`${API_URL}${editingBook.id}`, bookData, {
                    headers: { "Content-Type": "application/json" },
                });
                showToast("success", "Data berhasil diperbarui");
            } else {
                await axios.post(API_URL, bookData, {
                    headers: { "Content-Type": "application/json" },
                });
                showToast("success", "Data berhasil ditambahkan");
            }

            await getAllBooks();
            setShowPopup(false);
            setIsEditing(false);
            setEditingBook(null);
            setSelectedCategory(null);
            setSelectedRack(null);
            setListBookAttachment([]);
            form.reset();
        } catch (error) {
            console.error("Error saving book:", error);
            showToast("error", "Gagal menyimpan data");
        }
    };

    const handleEdit = (book: any) => {
        setEditingBook(book);
        setSelectedCategory(
            book.categoryId
                ? { value: book.categoryId, label: book.category.categoryName }
                : null
        );
        setSelectedRack(
            book.rackId ? { value: book.rackId, label: book.rack.rackName } : null
        );

        // ✅ Mark existing attachments properly
        const existingAttachments = (book.attachments || []).map((a: any) => ({
            id: a.id,
            fileBase64: a.fileBase64 || a,
            isNew: false,
            isDelete: false,
        }));

        setListBookAttachment(existingAttachments);
        setIsEditing(true);
        setShowPopup(true);
    };

    const handleDelete = async (book: any) => {
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
                    await axios.patch(`${API_URL}${book.id}`, { status: "N" });
                    showToast("success", "Data telah dihapus");
                    await getAllBooks();
                } catch (error) {
                    console.error("Error deleting book:", error);
                    showToast("error", "Tidak dapat menghapus data");
                }
            }
        });
    };

    // ✅ Filter books
    const filteredBooks = books.filter((book) =>
        [book.title, book.author, book.publishedYear?.toString()]
            .join(" ")
            .toLowerCase()
            .includes(searchQuery.toLowerCase())
    );

    const totalPages = Math.ceil(filteredBooks.length / recordsPerPage);
    const startIndex = (currentPage - 1) * recordsPerPage;
    const currentBooks = filteredBooks.slice(startIndex, startIndex + recordsPerPage);
    const categoryOptions = categories.map((c) => ({
        value: c.id,
        label: c.categoryName,
    }));

    const rackOptions = racks.map((r) => ({
        value: r.id,
        label: r.rackName,
    }));

    const changePage = (page: number) => {
        if (page >= 1 && page <= totalPages) setCurrentPage(page);
    };

    // 🆕 Handle detail click
    const handleDetail = (book: any) => {
        setSelectedBook({
            title: book.title,
            author: book.author,
            publishedYear: book.publishedYear,
            category: book.category.categoryName,
            rack: book.rack.rackName + " - " + book.rackRow,
            // deskripsi: book.description || "Belum ada deskripsi",
            attachments: book.attachments
        });
    };

    // ✅ Utility: Ensure all attachments are valid image URLs or data URIs
    const formatImageSrc = (img: string) => {
        if (!img) return "";
        if (img.includes("data:image")) {
            return img;
        }

        return `data:image/jpeg;base64,${img}`;
    };

    const handleCancel = () => {
        setShowPopup(false);
        setIsEditing(false);
        setEditingBook(null);
        setListBookAttachment([]);
        setSelectedCategory(null);
        setSelectedRack(null);
    };

    return (
        <div className="flex flex-col h-full space-y-3">
            {/* 🔍 Search and Add */}
            <div className="bg-white shadow rounded-xl p-4 flex flex-wrap items-center justify-between gap-3">
                <div className="flex items-center gap-2 w-full md:w-1/2">
                    <input
                        type="text"
                        placeholder="Cari Buku..."
                        value={searchQuery}
                        onChange={(e) => setSearchQuery(e.target.value)}
                        className="flex-grow px-3 py-2 border rounded-lg outline-none text-gray-900"
                    />
                </div>
                <button
                    onClick={() => {
                        setShowPopup(true);
                        setIsEditing(false);
                        setEditingBook(null);
                        setSelectedCategory(null);
                        setSelectedRack(null);
                        setListBookAttachment([]);
                    }}
                    className="flex items-center gap-2 bg-green-600 hover:bg-green-700 text-white px-4 py-2 rounded-lg shadow"
                >
                    <Plus size={18} /> Tambah Buku
                </button>
            </div>

            {/* 📚 Table */}
            <div className="flex-1 bg-white shadow rounded-xl p-4 overflow-x-auto">
                <table className="w-full border-collapse text-sm min-w-[600px]">
                    <thead className="bg-green-100 text-gray-900">
                        <tr>
                            <th className="px-3 py-2 text-left">No.</th>
                            <th className="px-3 py-2 text-left">Judul</th>
                            <th className="px-3 py-2 text-left">Penulis</th>
                            <th className="px-3 py-2 text-left">Tahun Terbit</th>
                            <th className="px-3 py-2 text-left">Kategori</th>
                            <th className="px-3 py-2 text-left">Rak - Baris</th>
                            <th className="px-3 py-2 text-left">Aksi</th>
                        </tr>
                    </thead>
                    <tbody className="text-gray-800">
                        <AnimatePresence>
                            {currentBooks.length > 0 ? (
                                currentBooks.map((book, idx) => (
                                    <motion.tr
                                        key={book.id || idx}
                                        initial={{ opacity: 0, y: 10 }}
                                        animate={{ opacity: 1, y: 0 }}
                                        exit={{ opacity: 0, y: -10 }}
                                        transition={{ duration: 0.2 }}
                                        className="border-b hover:bg-gray-50"
                                    >
                                        <td className="px-3 py-2">{idx + 1}</td>
                                        <td className="px-3 py-2">{book.title}</td>
                                        <td className="px-3 py-2">{book.author}</td>
                                        <td className="px-3 py-2">{book.publishedYear}</td>
                                        <td className="px-3 py-2">{book.category.categoryName}</td>
                                        <td className="px-3 py-2">{book.rack.rackName + " - " + book.rackRow}</td>
                                        <td className="px-3 py-2 flex gap-2">
                                            <button
                                                onClick={() => handleDetail(book)}
                                                className="flex items-center gap-1 bg-blue-600 hover:bg-blue-700 text-white px-2 py-1 rounded text-xs md:text-sm"
                                            >
                                                <BookOpen size={14} /> Detil
                                            </button>
                                            <button
                                                onClick={() => handleEdit(book)}
                                                className="flex items-center gap-1 bg-yellow-500 hover:bg-yellow-600 text-white px-2 py-1 rounded text-xs md:text-sm"
                                            >
                                                <Pencil size={14} /> Ubah
                                            </button>
                                            <button
                                                onClick={() => handleDelete(book)}
                                                className="flex items-center gap-1 bg-red-600 hover:bg-red-700 text-white px-2 py-1 rounded text-xs md:text-sm"
                                            >
                                                <Trash size={14} /> Hapus
                                            </button>
                                        </td>
                                    </motion.tr>
                                ))
                            ) : (
                                <tr>
                                    <td colSpan={7} className="text-center py-6 text-gray-500 italic bg-gray-50">
                                        Tidak ada data
                                    </td>
                                </tr>
                            )}
                        </AnimatePresence>
                    </tbody>
                </table>

                {/* Pagination */}
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

                    <div className="flex gap-1 items-center">
                        <span className="text-gray-600 px-3 py-1">
                            Menampilkan {startIndex + 1} - {Math.min(startIndex + recordsPerPage, filteredBooks.length)} dari {filteredBooks.length} data
                        </span>

                        <button
                            disabled={currentPage === 1}
                            onClick={() => changePage(currentPage - 1)}
                            className={`px-3 py-1 rounded-lg border ${currentPage === 1 ? "bg-white text-gray-400" : "bg-blue-500 hover:bg-blue-700 text-white"}`}
                        >
                            Prev
                        </button>

                        {[...Array(totalPages)].map((_, i) => (
                            <button
                                key={i + 1}
                                onClick={() => changePage(i + 1)}
                                className={`px-3 py-1 rounded-lg border ${currentPage === i + 1 ? "bg-blue-500 text-white" : "bg-white text-gray-400"}`}
                            >
                                {i + 1}
                            </button>
                        ))}

                        <button
                            disabled={currentPage === totalPages}
                            onClick={() => changePage(currentPage + 1)}
                            className={`px-3 py-1 rounded-lg border ${currentPage === totalPages ? "bg-white text-gray-400" : "bg-blue-500 hover:bg-blue-700 text-white"}`}
                        >
                            Next
                        </button>
                    </div>
                </div>
            </div>

            {/* 🆕 Detail Modal */}
            {selectedBook && (
                <PopupBookDetail
                    selectedBook={selectedBook}
                    onClose={() => setSelectedBook(null)}
                />
            )}

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
                                {isEditing ? "Ubah Buku" : "Tambah Buku"}
                            </h2>
                            <form onSubmit={handleSubmitBook} className="space-y-4">
                                <div>
                                    <label className="block text-sm font-medium text-black">Judul</label>
                                    <input
                                        name="title"
                                        defaultValue={editingBook?.title || ""}
                                        required
                                        className="w-full border px-3 py-2 rounded-lg text-black"
                                    />
                                </div>
                                <div>
                                    <label className="block text-sm font-medium text-black">Penulis</label>
                                    <input
                                        name="author"
                                        defaultValue={editingBook?.author || ""}
                                        required
                                        className="w-full border px-3 py-2 rounded-lg text-black"
                                    />
                                </div>
                                <div>
                                    <label className="block text-sm font-medium text-black">Tahun Terbit</label>
                                    <input
                                        type="number"
                                        name="publishedYear"
                                        defaultValue={editingBook?.publishedYear || ""}
                                        required
                                        className="w-full border px-3 py-2 rounded-lg text-black"
                                    />
                                </div>

                                {/* 🆕 Category select (searchable) */}
                                <div>
                                    <label className="block text-sm font-medium text-black">
                                        Kategori
                                    </label>
                                    <Select
                                        options={categoryOptions}
                                        value={selectedCategory}
                                        onChange={setSelectedCategory}
                                        placeholder="Pilih Kategori..."
                                        className="text-black"
                                        isSearchable
                                    />
                                </div>

                                {/* 🆕 Rack select (searchable) */}
                                <div>
                                    <label className="block text-sm font-medium text-black">
                                        Rak
                                    </label>
                                    <Select
                                        options={rackOptions}
                                        value={selectedRack}
                                        onChange={setSelectedRack}
                                        placeholder="Pilih Rak..."
                                        className="text-black"
                                        isSearchable
                                    />
                                </div>
                                <div>
                                    <label className="block text-sm font-medium text-black">Baris</label>
                                    <input
                                        type="number"
                                        name="rackRow"
                                        defaultValue={editingBook?.rackRow || ""}
                                        required
                                        className="w-full border px-3 py-2 rounded-lg text-black"
                                    />
                                </div>
                                {/* 🆕 Upload Foto Buku (Multiple) */}
                                <div>
                                    <label className="block text-sm font-medium text-black">
                                        Foto Buku
                                    </label>
                                    <input
                                        type="file"
                                        accept=".jpg,.jpeg,.png"
                                        multiple
                                        onChange={handleImageUpload}
                                        className="w-full border px-3 py-2 rounded-lg text-black"
                                    />

                                    {/* Preview all uploaded images */}
                                    {listBookAttachment.length > 0 && (
                                        <div className="mt-3 grid grid-cols-3 gap-2">
                                            {listBookAttachment.filter(img => !img.isDelete).map((img, idx) => (
                                                <div key={idx} className="relative">
                                                    <img
                                                        src={formatImageSrc(img.fileBase64)}
                                                        alt={`preview-${idx}`}
                                                        className="h-24 w-full object-cover rounded-lg border"
                                                    />
                                                    <button
                                                        type="button"
                                                        onClick={() => {
                                                            setListBookAttachment((prev) => {
                                                                const updated = [...prev];
                                                                const target = updated[idx];

                                                                // ✅ If it's a new upload → remove directly
                                                                if (target.isNew) {
                                                                    return updated.filter((_, i) => i !== idx);
                                                                }

                                                                // ✅ If it's an existing DB image → mark as deleted
                                                                updated[idx] = { ...target, isDelete: true };
                                                                return updated;
                                                            });
                                                        }}
                                                        className="absolute top-1 right-1 bg-red-600 text-white rounded-full p-1 text-xs"
                                                    >
                                                        ✕
                                                    </button>
                                                </div>
                                            ))}
                                        </div>
                                    )}
                                </div>


                                <div className="flex justify-end gap-2 pt-4">
                                    <button
                                        type="button"
                                        onClick={handleCancel}
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
