"use client";

import { useState, useEffect, Key } from "react";
import { X, ChevronLeft, ChevronRight } from "lucide-react";

export default function PopupBookDetail({ selectedBook, onClose }: any) {
    const [current, setCurrent] = useState(0);
    const [isVisible, setIsVisible] = useState(false);

    useEffect(() => {
        if (selectedBook) {
            setIsVisible(true);
            setCurrent(0);
        }
    }, [selectedBook]);

    if (!selectedBook) return null;

    const prevSlide = () => {
        setCurrent((prev) =>
            prev === 0 ? selectedBook.attachments.length - 1 : prev - 1
        );
    };

    const nextSlide = () => {
        setCurrent((prev) =>
            prev === selectedBook.attachments.length - 1 ? 0 : prev + 1
        );
    };

    const handleClose = () => {
        setIsVisible(false);
        setTimeout(() => {
            onClose();
        }, 300);
    };

    // ✅ Utility: Ensure all attachments are valid image URLs or data URIs
    const formatImageSrc = (img: any) => {
        if (!img) return "";
        return `data:image/jpeg;base64,${img.fileBase64}`;
    };

    return (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 overflow-hidden">
            <div
                className={`bg-white rounded-2xl p-8 w-full max-w-6xl max-h-[95vh] shadow-2xl transform transition-all duration-300 ease-out overflow-hidden flex flex-col ${isVisible ? "scale-100 opacity-100" : "scale-95 opacity-0"
                    }`}
            >
                {/* Header */}
                <div className="flex justify-between items-center mb-6 flex-shrink-0">
                    <h2 className="text-2xl font-semibold text-gray-800">Detail Buku</h2>
                    <button
                        onClick={handleClose}
                        className="text-gray-700 hover:text-black transition"
                    >
                        <X size={24} />
                    </button>
                </div>

                {/* Scrollable Content */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-8 flex-grow overflow-y-auto scrollbar-thin scrollbar-thumb-gray-300 scrollbar-track-transparent hover:scrollbar-thumb-gray-400">
                    {/* Left: Image Slider */}
                    <div className="relative w-full h-80 md:h-[28rem] rounded-xl overflow-hidden bg-gray-100 flex-shrink-0">
                        <div
                            className="flex transition-transform duration-500 ease-in-out h-full"
                            style={{ transform: `translateX(-${current * 100}%)` }}
                        >
                            {selectedBook.attachments.map((img: any, idx: number) => (
                                <img
                                    key={idx}
                                    src={formatImageSrc(img)}
                                    alt={`Book ${idx + 1}`}
                                    className="w-full h-full object-contain bg-gray-50 flex-shrink-0"
                                />
                            ))}
                        </div>

                        {/* Arrows */}
                        {selectedBook.attachments.length > 1 && (
                            <>
                                <button
                                    onClick={prevSlide}
                                    className="absolute top-1/2 left-4 -translate-y-1/2 bg-white/80 hover:bg-white rounded-full p-3 shadow-lg"
                                >
                                    <ChevronLeft size={22} />
                                </button>
                                <button
                                    onClick={nextSlide}
                                    className="absolute top-1/2 right-4 -translate-y-1/2 bg-white/80 hover:bg-white rounded-full p-3 shadow-lg"
                                >
                                    <ChevronRight size={22} />
                                </button>
                            </>
                        )}

                        {/* Dots */}
                        <div className="absolute bottom-4 left-1/2 -translate-x-1/2 flex gap-2">
                            {selectedBook.attachments.map((_: any, idx: Key) => (
                                <span
                                    key={idx}
                                    className={`w-3 h-3 rounded-full ${current === idx
                                            ? "bg-black"
                                            : "bg-white border border-gray-400"
                                        }`}
                                />
                            ))}
                        </div>
                    </div>

                    {/* Right: Info Table */}
                    <div className="flex flex-col justify-center space-y-3 text-gray-700 overflow-x-auto">
                        <table className="border-separate border-spacing-x-1 w-full">
                            <tbody>
                                <tr>
                                    <td className="font-medium whitespace-nowrap w-0">Judul</td>
                                    <td className="font-medium">:</td>
                                    <td className="truncate max-w-[250px] break-all">
                                        {selectedBook.title}
                                    </td>
                                </tr>
                                <tr>
                                    <td className="font-medium whitespace-nowrap w-0">Penulis</td>
                                    <td className="font-medium">:</td>
                                    <td className="truncate max-w-[250px] break-all">
                                        {selectedBook.author}
                                    </td>
                                </tr>
                                <tr>
                                    <td className="font-medium whitespace-nowrap w-0">Tahun Terbit</td>
                                    <td className="font-medium">:</td>
                                    <td>{selectedBook.publishedYear}</td>
                                </tr>
                                <tr>
                                    <td className="font-medium whitespace-nowrap w-0">Kategori</td>
                                    <td className="font-medium">:</td>
                                    <td>{selectedBook.category}</td>
                                </tr>
                                <tr>
                                    <td className="font-medium whitespace-nowrap w-0">Rak - Baris</td>
                                    <td className="font-medium">:</td>
                                    <td>{selectedBook.rack + " - " + selectedBook.rackRow}</td>
                                </tr>
                            </tbody>
                        </table>
                    </div>
                </div>
            </div>
        </div>
    );
}
