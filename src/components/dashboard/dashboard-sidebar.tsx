"use client";

import { useState } from "react";
import { useRouter, usePathname } from "next/navigation";
import { X, ChevronDown } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

export default function DashboardSidebarComponent({ showSidebar, setShowSidebar }) {
    const [showMaster, setShowMaster] = useState(false);
    const router = useRouter();
    const pathname = usePathname();

    const isActive = (path: string) =>
        pathname === path ? "bg-gray-200 font-semibold" : "hover:bg-gray-100";

    return (
        <>
            {/* Sidebar (desktop) */}
            <aside className="hidden md:flex w-64 bg-white shadow flex-col">
                <nav className="flex-1 p-4 space-y-2">
                    {/* Master dropdown */}
                    <button
                        className="w-full flex items-center justify-between px-4 py-2 text-gray-700 font-medium hover:bg-gray-100"
                        onClick={() => setShowMaster(!showMaster)}
                    >
                        <span>Master</span>
                        <ChevronDown
                            size={18}
                            className={`transition-transform ${showMaster ? "rotate-180" : ""}`}
                        />
                    </button>

                    <AnimatePresence initial={false}>
                        {showMaster && (
                            <motion.div
                                key="master-menu"
                                initial={{ height: 0, opacity: 0 }}
                                animate={{ height: "auto", opacity: 1 }}
                                exit={{ height: 0, opacity: 0 }}
                                transition={{ duration: 0.3, ease: "easeInOut" }}
                                className="overflow-hidden"
                            >
                                <div className="pl-8 pr-4 py-2 bg-gray-50 text-gray-900 overflow-y-auto">
                                    <button
                                        onClick={() => router.push("/admin/dashboard/master/buku")}
                                        className={`block w-full text-left px-3 py-2 rounded-lg transition ${isActive(
                                            "/admin/dashboard/master/buku"
                                        )}`}
                                    >
                                        Buku
                                    </button>
                                    <button
                                        onClick={() => router.push("/admin/dashboard/master/kategori")}
                                        className={`block w-full text-left px-3 py-2 rounded-lg transition ${isActive(
                                            "/admin/dashboard/master/kategori"
                                        )}`}
                                    >
                                        Kategori
                                    </button>
                                    <button
                                        onClick={() => router.push("/admin/dashboard/master/rak")}
                                        className={`block w-full text-left px-3 py-2 rounded-lg transition ${isActive(
                                            "/admin/dashboard/master/rak"
                                        )}`}
                                    >
                                        Rak
                                    </button>
                                    <button
                                        onClick={() => router.push("/admin/dashboard/master/penerbit")}
                                        className={`block w-full text-left px-3 py-2 rounded-lg transition ${isActive(
                                            "/admin/dashboard/master/penerbit"
                                        )}`}
                                    >
                                        Penerbit
                                    </button>
                                    <button
                                        onClick={() => router.push("/admin/dashboard/master/jenis-pustaka")}
                                        className={`block w-full text-left px-3 py-2 rounded-lg transition ${isActive(
                                            "/admin/dashboard/master/jenis-pustaka"
                                        )}`}
                                    >
                                        Jenis Pustaka
                                    </button>
                                    <button
                                        onClick={() => router.push("/admin/dashboard/master/asal-pustaka")}
                                        className={`block w-full text-left px-3 py-2 rounded-lg transition ${isActive(
                                            "/admin/dashboard/master/asal-pustaka"
                                        )}`}
                                    >
                                        Asal Pustaka
                                    </button>
                                    {/* <button
                                onClick={() => router.push("/admin/dashboard/master/pengguna")}
                                className={`block w-full text-left px-3 py-2 rounded-lg transition ${isActive(
                                    "/admin/dashboard/master/pengguna"
                                )}`}
                            >
                                Pengguna
                            </button> */}
                                </div>
                            </motion.div>
                        )}
                    </AnimatePresence>

                    {/* Pinjam */}
                    {/* <button
                        onClick={() => router.push("/admin/pinjam")}
                        className={`w-full text-left px-4 py-2 rounded-lg transition text-gray-900 ${isActive(
                            "/admin/pinjam"
                        )}`}
                    >
                        Pinjam
                    </button> */}
                </nav>
            </aside>

            {/* Mobile Sidebar + Backdrop */}
            {/* <motion.aside
                initial={{ x: "-100%" }}
                animate={{ x: 0 }}
                exit={{ x: "-100%" }}
                transition={{ type: "spring", stiffness: 80, damping: 20 }}
                className="fixed inset-y-0 left-0 w-64 bg-white shadow-lg z-50 flex flex-col"
            >
                <div className="flex justify-between items-center px-4 py-3 border-b">
                    <h2 className="font-bold text-lg">Menu</h2>
                    <button onClick={() => setShowSidebar(false)}>
                        <X size={22} />
                    </button>
                </div>

                <nav className="flex-1 p-4 space-y-2 overflow-y-auto">
                    <button
                        className="w-full flex items-center justify-between px-4 py-2 text-gray-700 font-medium hover:bg-gray-100"
                        onClick={() => setShowMaster(!showMaster)}
                    >
                        <span>Master</span>
                        <ChevronDown
                            size={18}
                            className={`transition-transform ${showMaster ? "rotate-180" : ""}`}
                        />
                    </button>

                    <AnimatePresence initial={false}>
                        {showMaster && (
                            <motion.div
                                key="mobile-master-menu"
                                initial={{ height: 0, opacity: 0 }}
                                animate={{ height: "auto", opacity: 1 }}
                                exit={{ height: 0, opacity: 0 }}
                                transition={{ duration: 0.3, ease: "easeInOut" }}
                                className="overflow-hidden"
                            >
                                <div className="pl-8 pr-4 py-2 space-y-1 bg-gray-50 text-gray-900">
                                    <button
                                        onClick={() => {
                                            router.push("/admin/dashboard/master/buku");
                                            setShowSidebar(false);
                                        }}
                                        className={`block w-full text-left px-3 py-2 rounded-lg transition ${isActive(
                                            "/admin/dashboard/master/buku"
                                        )}`}
                                    >
                                        Buku
                                    </button>

                                    <button
                                        onClick={() => {
                                            router.push("/admin/dashboard/master/kategori");
                                            setShowSidebar(false);
                                        }}
                                        className={`block w-full text-left px-3 py-2 rounded-lg transition ${isActive(
                                            "/admin/dashboard/master/kategori"
                                        )}`}
                                    >
                                        Kategori
                                    </button>

                                    <button
                                        onClick={() => {
                                            router.push("/admin/dashboard/master/rak");
                                            setShowSidebar(false);
                                        }}
                                        className={`block w-full text-left px-3 py-2 rounded-lg transition ${isActive(
                                            "/admin/dashboard/master/rak"
                                        )}`}
                                    >
                                        Rak
                                    </button>

                                    <button
                                        onClick={() => {
                                            router.push("/admin/dashboard/master/penerbit");
                                            setShowSidebar(false);
                                        }}
                                        className={`block w-full text-left px-3 py-2 rounded-lg transition ${isActive(
                                            "/admin/dashboard/master/penerbit"
                                        )}`}
                                    >
                                        Penerbit
                                    </button>

                                    <button
                                        onClick={() => {
                                            router.push("/admin/dashboard/master/jenis-pustaka");
                                            setShowSidebar(false);
                                        }}
                                        className={`block w-full text-left px-3 py-2 rounded-lg transition ${isActive(
                                            "/admin/dashboard/master/jenis-pustaka"
                                        )}`}
                                    >
                                        Jenis Pustaka
                                    </button>

                                    <button
                                        onClick={() => {
                                            router.push("/admin/dashboard/master/asal-pustaka");
                                            setShowSidebar(false);
                                        }}
                                        className={`block w-full text-left px-3 py-2 rounded-lg transition ${isActive(
                                            "/admin/dashboard/master/asal-pustaka"
                                        )}`}
                                    >
                                        Asal Pustaka
                                    </button>
                                </div>
                            </motion.div>
                        )}
                    </AnimatePresence>

                    <button
                        onClick={() => {
                            router.push("/admin/pinjam");
                            setShowSidebar(false);
                        }}
                        className={`w-full text-left px-4 py-2 rounded-lg transition ${isActive(
                            "/admin/pinjam"
                        )}`}
                    >
                        Pinjam
                    </button>
                </nav>
            </motion.aside> */}
        </>
    );
}
