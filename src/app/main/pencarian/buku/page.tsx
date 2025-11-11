"use client";

import { useEffect, useState } from "react";
import { Search } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import PopupBookDetail from "@/components/main/popup/Popup-book-detail";
import axios from "axios";
import Select from "react-select";

export default function MainPencarianBukuPage() {
    const [showTable, setShowTable] = useState(false);
    const [showAdvanced, setShowAdvanced] = useState(false);
    const [categories, setCategories] = useState<any[]>([]);
    const [selectedBook, setSelectedBook] = useState<any | null>(null);
    const [selectedCategory, setSelectedCategory] = useState<any>(null);
    const [books, setBooks] = useState<any[]>([]);
    const [searchQuery, setSearchQuery] = useState("");
    const [advancedSearchTitle, setAdvancedSearchTitle] = useState("");
    const [advancedSearchAuthor, setAdvancedSearchAuthor] = useState("");
    const [advancedSearchPublishedYear, setAdvancedSearchPublishedYear] = useState("");

    const API_URL = "http://192.168.50.52:8080/api/master/books/";
    const CATEGORY_API = "http://192.168.50.52:8080/api/master/categories/";

    const categoryOptions = categories.map((c) => ({
        value: c.id,
        label: c.categoryName,
    }));

    /* CONSTRUCTOR FUNCTIONS */
    useEffect(() => {
        getAllCategories();
    }, []);

    const getAllCategories = async () => {
        try {
            const response = await axios.get(CATEGORY_API);
            setCategories(response.data.data);
        } catch (error) {
            console.error("Error fetching categories:", error);
        }
    };

    const handleSubmitSearch = async () => {
        const query = searchQuery.trim().toUpperCase();

        if (!query) {
            console.warn("Search query is empty");
            setBooks([]);
            return;
        }

        try {
            const encodedQuery = encodeURIComponent(query);
            const response = await axios.get(`${API_URL}find/${encodedQuery}`);

            if (response.data.length > 0) {
                setBooks(response.data);
            } else {
                setBooks([]);
                console.info("No books found for:", query);
            }

            setShowTable(true);
        } catch (error) {
            console.error("Error fetching books:", error);
            setBooks([]);
            setShowTable(true);
        }
    };

    const handleSubmitAdvancedSearch = async () => {
        const searchTitle = advancedSearchTitle.trim().toUpperCase();
        const searchAuthor = advancedSearchAuthor.trim().toUpperCase();
        const searchPublishedYear = advancedSearchPublishedYear.trim()
            ? Number(advancedSearchPublishedYear.trim())
            : null;
        const searchCategoryId = selectedCategory?.value
            ? Number(selectedCategory.value)
            : null;

        if (!searchTitle && !searchAuthor && !searchPublishedYear && !searchCategoryId) {
            console.warn("Search query is empty");
            setBooks([]);
            return;
        }

        const advancedSearchQuery = {
            title: searchTitle,
            author: searchAuthor,
            publishedYear: searchPublishedYear,
            categoryId: searchCategoryId
        };

        try {
            const response = await axios.post(`${API_URL}findByQuery/advanced`, advancedSearchQuery, {
                headers: { "Content-Type": "application/json" },
            });

            if (response.data.length > 0) {
                setBooks(response.data);
            } else {
                setBooks([]);
                console.info("No books found");
            }

            setShowTable(true);
        } catch (error) {
            console.error("Error fetching books:", error);
            setBooks([]);
            setShowTable(true);
        }
    };

    const handleBookDetail = (book: any) => {
        const detail = {
            id: book.id,
            title: book.title || "-",
            author: book.author || "-",
            publishedYear: book.publishedYear || "-",
            category: book.category?.categoryName || "-",
            rack: book.rack?.rackName || "-",
            rackRow: book.rackRow || "-",
            attachments:
                book.attachments?.map((file: any) => ({
                    id: file.id,
                    fileName: file.fileName,
                    fileBase64: file.fileBase64,
                })) || [],
        };

        setSelectedBook(detail);
    };

    return (
        <>
            <section className="min-h-screen w-full overflow-hidden bg-gray-50">
                <div className="block w-full p-10 mx-auto gap-12 items-center mt-5">

                    {/* Search Card */}
                    <div className="max-w-2xl mt-7 mx-auto bg-white shadow-lg rounded-2xl p-6 sticky top-20 z-20 transition-all border border-black">
                        <h1 className="text-2xl font-semibold text-center mb-4 text-gray-800">Pencarian Buku</h1>

                        {/* Simple Search */}
                        <div
                            className={`transition-all duration-500 origin-top ${showAdvanced
                                ? "max-h-0 opacity-0 scale-y-0"
                                : "max-h-40 opacity-100 scale-y-100"
                                }`}
                        >
                            <div className="flex items-center rounded-full border border-gray-700 bg-white px-4 py-2 shadow-sm">
                                <input
                                    type="text"
                                    value={searchQuery}
                                    onChange={(e) => setSearchQuery(e.target.value)}
                                    className="flex-grow bg-transparent outline-none text-gray-700 placeholder-gray-400 uppercase"
                                />
                                <button
                                    onClick={handleSubmitSearch}
                                    className="bg-green-700 text-white hover:bg-green-800 px-4 py-2 rounded-full ml-2 flex items-center gap-1"
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
                                    value={advancedSearchTitle}
                                    onChange={(e) => setAdvancedSearchTitle(e.target.value)}
                                    placeholder="Judul Buku"
                                    className="w-full px-4 py-2 border border-gray-800 rounded-xl bg-white outline-none uppercase text-gray-800"
                                />
                                <input
                                    type="text"
                                    value={advancedSearchAuthor}
                                    onChange={(e) => setAdvancedSearchAuthor(e.target.value)}
                                    placeholder="Penulis"
                                    className="w-full px-4 py-2 border border-gray-800 rounded-xl bg-white outline-none uppercase text-gray-800"
                                />
                                <input
                                    type="text"
                                    value={advancedSearchPublishedYear}
                                    onChange={(e) => setAdvancedSearchPublishedYear(e.target.value)}
                                    placeholder="Tahun Terbit"
                                    className="w-full px-4 py-2 border border-gray-800 rounded-xl bg-white outline-none uppercase text-gray-800"
                                />
                                <Select
                                    options={categoryOptions}
                                    value={selectedCategory}
                                    onChange={setSelectedCategory}
                                    placeholder="Pilih Kategori"
                                    className="uppercase text-gray-800 border border-black rounded"
                                    isSearchable
                                />
                                <button
                                    onClick={() => handleSubmitAdvancedSearch()}
                                    className="w-full bg-green-700 hover:bg-green-900 text-white py-2 rounded-xl flex items-center justify-center gap-2"
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
                                className="text-sm text-green-700 hover:text-green-800"
                            >
                                {showAdvanced ? "Tutup Pencarian Lanjutan" : "Pencarian Lanjutan"}
                            </button>
                        </div>
                    </div>

                    {/* Table Card */}
                    {showTable && (
                        <div className="relative w-full mx-auto bg-white shadow-lg rounded-2xl p-6 mt-14">
                            <div className="overflow-x-auto max-h-[400px] overflow-y-auto">
                                <table className="w-full border-collapse text-gray-800">
                                    <thead className="bg-green-100 sticky top-0 ">
                                        <tr>
                                            <th className="px-4 py-2 text-left">No.</th>
                                            <th className="px-4 py-2 text-left">Judul</th>
                                            <th className="px-4 py-2 text-left">Penulis</th>
                                            <th className="px-4 py-2 text-left">Tahun Terbit</th>
                                            <th className="px-4 py-2 text-left">Kategori</th>
                                            <th className="px-4 py-2 text-left">Rak - Baris</th>
                                            <th className="px-4 py-2 text-left">Action</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        <AnimatePresence>
                                            {books.length > 0 ? (
                                                books.map((book, idx) => (
                                                    <motion.tr
                                                        key={idx}
                                                        initial={{ opacity: 0, y: 10 }}
                                                        animate={{ opacity: 1, y: 0 }}
                                                        exit={{ opacity: 0, y: -10 }}
                                                        transition={{ duration: 0.3, delay: idx * 0.05 }}
                                                        className="border-b hover:bg-gray-50 transition"
                                                    >
                                                        <td className="px-4 py-2">{idx + 1}</td>
                                                        <td className="px-4 py-2">{book.title}</td>
                                                        <td className="px-4 py-2">{book.author}</td>
                                                        <td className="px-4 py-2">{book.publishedYear}</td>
                                                        <td className="px-4 py-2">{book.category.categoryName}</td>
                                                        <td className="px-4 py-2">{book.rack.rackName + " - " + book.rackRow}</td>
                                                        <td className="px-4 py-2">
                                                            <button
                                                                onClick={() => handleBookDetail(book)}
                                                                className="bg-green-700 hover:bg-green-900 text-white text-sm px-4 py-1 rounded-full shadow"
                                                            >
                                                                Detail
                                                            </button>
                                                        </td>
                                                    </motion.tr>
                                                ))
                                            ) : (
                                                <tr>
                                                    <td
                                                        colSpan={7}
                                                        className="text-center text-gray-500 italic py-6 bg-gray-50"
                                                    >
                                                        Tidak ada hasil ditemukan
                                                    </td>
                                                </tr>
                                            )}
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
                </div>
            </section>
        </>
    );
}
