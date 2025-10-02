"use client";

import { useState } from "react";
import { useRouter, usePathname } from "next/navigation";
import { X, ChevronDown } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

export default function DashboardSidebarComponent({showSidebar, setShowSidebar}) {
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

                    <div
                        className={`overflow-hidden transition-all duration-300 ease-in-out ${showMaster ? "max-h-40 opacity-100" : "max-h-0 opacity-0"
                            }`}
                    >
                        <div className="pl-8 pr-4 py-2 space-y-1 bg-gray-50 text-gray-900">
                            <button
                                onClick={() => router.push("/admin/dashboard/master/buku")}
                                className={`block w-full text-left px-3 py-2 rounded-lg transition ${isActive(
                                    "/admin/dashboard/master/buku"
                                )}`}
                            >
                                Buku
                            </button>
                            <button
                                onClick={() => router.push("/admin/dashboard/master/anggota")}
                                className={`block w-full text-left px-3 py-2 rounded-lg transition ${isActive(
                                    "/admin/dashboard/master/anggota"
                                )}`}
                            >
                                Anggota
                            </button>
                        </div>
                    </div>

                    {/* Pinjam */}
                    <button
                        onClick={() => router.push("/admin/pinjam")}
                        className={`w-full text-left px-4 py-2 rounded-lg transition text-gray-900 ${isActive(
                            "/admin/pinjam"
                        )}`}
                    >
                        Pinjam
                    </button>
                </nav>
            </aside>

            {/* Mobile Sidebar + Backdrop */}
            <AnimatePresence>
                {showSidebar && (
                    <>
                        {/* Backdrop */}
                        <motion.div
                            className="fixed inset-0 bg-black/40 z-40"
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            exit={{ opacity: 0 }}
                            onClick={() => setShowSidebar(false)}
                        />

                        {/* Sidebar */}
                        <motion.aside
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
                            <nav className="flex-1 p-4 space-y-2">
                                {/* Master dropdown */}
                                <button
                                    className="w-full flex items-center justify-between px-4 py-2 text-gray-700 font-medium hover:bg-gray-100"
                                    onClick={() => setShowMaster(!showMaster)}
                                >
                                    <span>Master</span>
                                    <ChevronDown
                                        size={18}
                                        className={`transition-transform ${showMaster ? "rotate-180" : ""
                                            }`}
                                    />
                                </button>
                                <div
                                    className={`overflow-hidden transition-all duration-300 ease-in-out ${showMaster ? "max-h-40 opacity-100" : "max-h-0 opacity-0"
                                        }`}
                                >
                                    <div className="pl-8 pr-4 py-2 space-y-1 bg-gray-50">
                                        <button
                                            onClick={() => {
                                                router.push("/admin/master/books");
                                                setShowSidebar(false);
                                            }}
                                            className={`block w-full text-left px-3 py-2 rounded-lg transition ${isActive(
                                                "/admin/master/books"
                                            )}`}
                                        >
                                            Books
                                        </button>
                                        <button
                                            onClick={() => {
                                                router.push("/admin/master/members");
                                                setShowSidebar(false);
                                            }}
                                            className={`block w-full text-left px-3 py-2 rounded-lg transition ${isActive(
                                                "/admin/master/members"
                                            )}`}
                                        >
                                            Members
                                        </button>
                                    </div>
                                </div>

                                {/* Pinjam */}
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
                        </motion.aside>
                    </>
                )}
            </AnimatePresence>
        </>
    );
}
