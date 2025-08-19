// app/page.tsx
'use client'; // <-- Tambahkan ini di baris paling atas

import { useState } from 'react';
import { Mail, Lock, User, Eye, EyeOff } from 'lucide-react';

export default function LoginPage() {
    const [isLogin, setIsLogin] = useState(true);
    const [showPassword, setShowPassword] = useState(false);

    return (
        <main className="flex items-center justify-center min-h-screen bg-gray-50">
            <div className="relative flex flex-col m-6 space-y-8 bg-white shadow-2xl rounded-2xl md:flex-row md:space-y-0">

                {/* Left Side (Form) */}
                <div className="flex flex-col justify-center p-8 md:p-14">
          <span className="mb-3 text-4xl font-bold">
            {isLogin ? 'Selamat Datang Kembali' : 'Buat Akun Baru'}
          </span>
                    <span className="font-light text-gray-500 mb-8">
            {isLogin
                ? 'Masuk untuk terhubung secara anonim!'
                : 'Bergabunglah dengan Sosialpedia dan ekspresikan dirimu dengan bebas.'}
          </span>

                    <form onSubmit={(e) => e.preventDefault()}>
                        <div className="py-4 space-y-4">
                            {!isLogin && (
                                <div className="relative">
                                    <User className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" size={20} />
                                    <input
                                        type="text"
                                        id="username"
                                        className="w-full border border-gray-300 rounded-md py-2 pl-10 pr-4 focus:outline-none focus:ring-2 focus:ring-blue-500"
                                        placeholder="Username"
                                        required={!isLogin}
                                    />
                                </div>
                            )}
                            <div className="relative">
                                <Mail className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" size={20} />
                                <input
                                    type="email"
                                    id="email"
                                    className="w-full border border-gray-300 rounded-md py-2 pl-10 pr-4 focus:outline-none focus:ring-2 focus:ring-blue-500"
                                    placeholder="Email"
                                    required
                                />
                            </div>
                            <div className="relative">
                                <Lock className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" size={20} />
                                <input
                                    type={showPassword ? "text" : "password"}
                                    id="password"
                                    className="w-full border border-gray-300 rounded-md py-2 pl-10 pr-10 focus:outline-none focus:ring-2 focus:ring-blue-500"
                                    placeholder="Password"
                                    required
                                />
                                <button
                                    type="button"
                                    onClick={() => setShowPassword(!showPassword)}
                                    className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-500 hover:text-gray-700"
                                >
                                    {showPassword ? <EyeOff size={20} /> : <Eye size={20} />}
                                </button>
                            </div>
                        </div>

                        {isLogin && (
                            <div className="flex justify-end w-full py-2">
                                <a href="#" className="text-sm font-light text-gray-500 hover:text-black hover:underline">Lupa Password?</a>
                            </div>
                        )}

                        <button
                            type="submit"
                            className="w-full bg-black text-white p-2 rounded-lg mb-6 hover:bg-white hover:text-black hover:border hover:border-gray-300 transition-colors duration-300"
                        >
                            {isLogin ? 'Masuk' : 'Daftar'}
                        </button>
                    </form>

                    <div className="text-center text-gray-500">
                        {isLogin ? "Belum punya akun?" : "Sudah punya akun?"}{' '}
                        <button
                            onClick={() => setIsLogin(!isLogin)}
                            className="font-semibold text-black hover:underline"
                        >
                            {isLogin ? 'Daftar Sekarang' : 'Masuk di sini'}
                        </button>
                    </div>
                </div>

                {/* Right Side (Image & Branding) */}
                <div className="relative hidden md:block">
                    <img
                        src="https://images.unsplash.com/photo-1581456495146-65a71b2c8e52?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=986&q=80"
                        alt="Branding Image"
                        className="w-[400px] h-full object-cover rounded-r-2xl"
                    />
                    <div className="absolute bottom-10 left-10 right-10 p-6 bg-white bg-opacity-30 backdrop-blur-sm rounded-lg text-white">
                        <h2 className="text-3xl font-bold">Sosialpedia</h2>
                        <p className="mt-2 text-lg">Ekspresikan dirimu tanpa batas, dengan atau tanpa identitas.</p>
                    </div>
                </div>
            </div>
        </main>
    );
}