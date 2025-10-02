"use client";

import { useState, useEffect, Key } from "react";
import { X, ChevronLeft, ChevronRight } from "lucide-react";

export default function PopupBookDetail({ selectedBook, onClose }: any) {
    const [current, setCurrent] = useState(0);
    const [isVisible, setIsVisible] = useState(false);

    useEffect(() => {
        if (selectedBook) {
            setIsVisible(true); // animate in
            setCurrent(0); // reset slider to first image
        }
    }, [selectedBook]);

    if (!selectedBook) return null;

    const images = selectedBook.images || [
        "/book1.jpg",
        "/book2.jpg",
        "/book3.jpg",
    ];

    const prevSlide = () => {
        setCurrent((prev) => (prev === 0 ? images.length - 1 : prev - 1));
    };

    const nextSlide = () => {
        setCurrent((prev) => (prev === images.length - 1 ? 0 : prev + 1));
    };

    const handleClose = () => {
        setIsVisible(false); // trigger exit animation
        setTimeout(() => {
            onClose(); // remove popup after animation ends
        }, 300); // match animation duration
    };

    return (
        <div className="fixed inset-0 bg-black/50 bg-opacity-40 flex items-center justify-center z-50">
            {/* Animated container */}
            <div
                className={`bg-white rounded-2xl p-6 w-full max-w-4xl shadow-xl transform transition-all duration-300 ease-out ${isVisible ? "scale-100 opacity-100" : "scale-95 opacity-0"
                    }`}
            >
                {/* Header */}
                <div className="flex justify-between items-center mb-4">
                    <h2 className="text-xl font-semibold">Detail Buku</h2>
                    <button onClick={handleClose} className="text-gray-500 hover:text-black">
                        <X size={20} />
                    </button>
                </div>

                {/* Content */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    {/* Left: Image Slider */}
                    <div className="relative w-full h-64 md:h-80 rounded-xl overflow-hidden bg-gray-100">
                        <div
                            className="flex transition-transform duration-500 ease-in-out h-full"
                            style={{ transform: `translateX(-${current * 100}%)` }}
                        >
                            {images.map((img: string, idx: number) => (
                                <img
                                    key={idx}
                                    src={img}
                                    alt={`Book ${idx + 1}`}
                                    className="w-full h-full object-cover flex-shrink-0"
                                />
                            ))}
                        </div>

                        {/* Arrows */}
                        <button
                            onClick={prevSlide}
                            className="absolute top-1/2 left-3 -translate-y-1/2 bg-white/70 hover:bg-white rounded-full p-2 shadow"
                        >
                            <ChevronLeft size={20} />
                        </button>
                        <button
                            onClick={nextSlide}
                            className="absolute top-1/2 right-3 -translate-y-1/2 bg-white/70 hover:bg-white rounded-full p-2 shadow"
                        >
                            <ChevronRight size={20} />
                        </button>

                        {/* Dots */}
                        <div className="absolute bottom-3 left-1/2 -translate-x-1/2 flex gap-2">
                            {images.map((_: any, idx: Key | null | undefined) => (
                                <span
                                    key={idx}
                                    className={`w-2.5 h-2.5 rounded-full ${current === idx
                                        ? "bg-black"
                                        : "bg-white border border-gray-400"
                                        }`}
                                />
                            ))}
                        </div>
                    </div>

                    {/* Right: Info */}
                    <div className="flex flex-col justify-center space-y-3 text-gray-700">
                        <p>
                            <span className="font-medium">Nama Buku:</span>{" "}
                            {selectedBook.nama}
                        </p>
                        <p>
                            <span className="font-medium">Penulis:</span>{" "}
                            {selectedBook.penulis}
                        </p>
                        <p>
                            <span className="font-medium">Tahun Terbit:</span>{" "}
                            {selectedBook.tahun}
                        </p>
                        <p>
                            <span className="font-medium">Deskripsi:</span> <br />
                            {selectedBook.deskripsi || "Belum ada deskripsi."}
                        </p>
                    </div>
                </div>
            </div>
        </div>
    );
}
