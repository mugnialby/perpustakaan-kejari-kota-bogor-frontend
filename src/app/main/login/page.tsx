"use client";

import { useEffect, useState } from "react";
import { Lock, User } from "lucide-react";
import { redirect, useRouter } from "next/navigation";
import axios from "axios";

export default function AdminLoginPage() {
    const [userId, setUserId] = useState("");
    const [password, setPassword] = useState("");
    const [error, setError] = useState("");
    const router = useRouter();
    const API_URL = "http://192.168.50.52:8080/api/auth/authenticate";

    /* CONSTRUCTOR FUNCTIONS */
    useEffect(() => {
        checkSession();
    }, []);

    // Check already login session
    const checkSession = () => {
        const storedUser = localStorage.getItem("user");
        if (storedUser) {
            router.push("/admin/dashboard");
        }
    };

    const handleLogin = async (e: React.FormEvent) => {
        e.preventDefault();
        setError("");

        const loginRequest = {
            userId: userId.trim().toUpperCase(),
            password: password.trim().toUpperCase()
        };

        try {
            const response = await axios.post(API_URL, loginRequest, {
                headers: { "Content-Type": "application/json" },
            });

            if (!response || response.status != 200) throw new Error("Login gagal");

            // Save token (for authenticated routes)
            // localStorage.setItem("adminToken", data.token);
            localStorage.setItem("user", response.data.fullName);

            // Redirect to dashboard
            router.push("/admin/dashboard");
        } catch (err: any) {
            setError(err.message || "Login gagal");
        }
    };

    return (
        <>
            <section className="min-h-screen w-full flex items-center justify-center bg-gray-50">
                <div className="block w-full max-w-md bg-white shadow-lg rounded-2xl p-8 mt-18 border border-black">
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
                        <div className="flex items-center gap-3 border border-gray-700 rounded-xl px-4 py-2">
                            <User className="text-gray-400" size={18} />
                            <input
                                type="text"
                                placeholder="Nama Pengguna"
                                value={userId}
                                onChange={(e) => setUserId(e.target.value)}
                                className="flex-grow bg-transparent outline-none text-gray-700 uppercase"
                                required
                            />
                        </div>

                        {/* Password */}
                        <div className="flex items-center gap-3 border border-gray-700 rounded-xl px-4 py-2">
                            <Lock className="text-gray-400" size={18} />
                            <input
                                type="password"
                                placeholder="Password"
                                value={password}
                                onChange={(e) => setPassword(e.target.value)}
                                className="flex-grow bg-transparent outline-none text-gray-700 uppercase"
                                required
                            />
                        </div>

                        {/* Submit */}
                        <button
                            type="submit"
                            className="w-full bg-green-700 text-white py-3 rounded-xl font-semibold shadow hover:bg-green-800 transition"
                        >
                            Masuk
                        </button>
                    </form>

                    <p className="text-sm text-gray-500 text-center mt-6">
                        © 2025 Perpustakaan Kejari Kota Bogor
                    </p>
                </div>
            </section>
        </>
    );
}
