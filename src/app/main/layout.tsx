"use client";

import MainFooter from "@/components/main/layout/Main-footer";
import MainNavbar from "@/components/main/layout/Main-navbar";
import { useState, useEffect } from "react";

export default function MainLayout({ children }: { children: React.ReactNode }) {
    const [isScrolled, setIsScrolled] = useState(false);

    useEffect(() => {
        const handleScroll = () => setIsScrolled(window.scrollY > 100);
        window.addEventListener("scroll", handleScroll);
        return () => window.removeEventListener("scroll", handleScroll);
    }, []);

    const fadeInUp = {
        hidden: { opacity: 0, y: 50 },
        visible: { opacity: 1, y: 0 },
    };

    return (
        <>
            <MainNavbar isScrolled={isScrolled} />
            <main className="flex-1">
                {children}
            </main>
        </>
    );
}