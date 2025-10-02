import MainNavbar from "@/components/main/layout/Main-navbar";

export default function MainLayout({
    children,
}: {
    children: React.ReactNode;
}) {
    return (
        <>
            <section
                className="relative min-h-screen flex flex-col justify-center items-center text-black"
                style={{
                    backgroundImage: `url('/bg.jpg')`, // ✅ change background here
                    backgroundSize: "cover",
                    backgroundPosition: "center",
                }}
            >
                <MainNavbar />

                {/* White Overlay */}
                <div className="absolute inset-0 bg-white/60" />

                <main className="pt-20">
                    {children}
                </main>
            </section>
        </>
    );
}


