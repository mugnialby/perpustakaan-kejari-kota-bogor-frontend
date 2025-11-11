"use client";

import MainBackgroundSection from "@/components/main/layout/Main-background-section";
import MainCardSection from "@/components/main/layout/Main-card-section";
import MainFooter from "@/components/main/layout/Main-footer";
import MainSingleCardSection from "@/components/main/layout/Main-single-card-section";
import { useScroll, useTransform } from "framer-motion";
import { useRef } from "react";

export default function MainPage() {
    const ref = useRef<HTMLDivElement>(null);
    const { scrollYProgress } = useScroll({
        target: ref,
        offset: ["start start", "end start"],
    });
    const y = useTransform(scrollYProgress, [0, 1], ["0%", "40%"]);

    const fadeInUp = {
        hidden: { opacity: 0, y: 50 },
        visible: { opacity: 1, y: 0 },
    };

    return (
        <div ref={ref} className="flex flex-col w-full overflow-hidden">
            <MainBackgroundSection fadeInUp={fadeInUp} y={y} />
            <MainCardSection fadeInUp={fadeInUp} y={y} />
            <MainSingleCardSection fadeInUp={fadeInUp} y={y} />
            <MainFooter fadeInUp={fadeInUp} />
        </div>
    );
}
