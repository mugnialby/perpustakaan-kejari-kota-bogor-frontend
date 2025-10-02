"use client";

import { useState } from "react";
import { Lock, User } from "lucide-react";
import { useRouter } from "next/navigation";

export default function AdminLoginPage() {
    const [namaPengguna, setNamaPengguna] = useState("");
    const [password, setPassword] = useState("");
    const [error, setError] = useState("");
    const router = useRouter();

    const handleLogin = async (e: React.FormEvent) => {
        e.preventDefault();
        setError("");

        // try {
        //     const res = await fetch("/api/admin/login", {
        //         method: "POST",
        //         headers: { "Content-Type": "application/json" },
        //         body: JSON.stringify({ namaPengguna, password }),
        //     });

        //     if (!res.ok) throw new Error("Login gagal");

        //     const data = await res.json();

        //     // Save token (for authenticated routes)
        //     localStorage.setItem("adminToken", data.token);
        // localStorage.setItem("user", JSON.stringify({ name: "Admin" }));

            // Redirect to dashboard
            router.push("/admin/dashboard");
        // } catch (err: any) {
        //     setError(err.message || "Login gagal");
        // }
    };

    return (
        <>
            <div className="relative w-full max-w-md bg-white shadow-lg rounded-2xl p-8">
                <h1 className="text-2xl font-bold text-center mb-6 text-gray-800">
                    Administrator Log In
                </h1>

                {error && (
                    <div className="mb-4 text-sm text-red-600 bg-red-100 p-2 rounded">
                        {error}
                    </div>
                )}

                <form onSubmit={handleLogin} className="space-y-4">
                    {/* Email */}
                    <div className="flex items-center gap-3 border border-gray-300 rounded-xl px-4 py-2">
                        <User className="text-gray-400" size={18} />
                        <input
                            type="text"
                            placeholder="Nama Pengguna"
                            value={namaPengguna}
                            onChange={(e) => setNamaPengguna(e.target.value)}
                            className="flex-grow bg-transparent outline-none text-gray-700"
                            required
                        />
                    </div>

                    {/* Password */}
                    <div className="flex items-center gap-3 border border-gray-300 rounded-xl px-4 py-2">
                        <Lock className="text-gray-400" size={18} />
                        <input
                            type="password"
                            placeholder="Password"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            className="flex-grow bg-transparent outline-none text-gray-700"
                            required
                        />
                    </div>

                    {/* Submit */}
                    <button
                        type="submit"
                        className="w-full bg-black text-white py-3 rounded-xl font-semibold shadow hover:bg-gray-800 transition"
                    >
                        Masuk
                    </button>
                </form>

                <p className="text-sm text-gray-500 text-center mt-6">
                    © {new Date().getFullYear()} Perpustakaan Kejari Kota Bogor
                </p>
            </div>
        </>
    );
}
