"use client";
import React, { useMemo, useState } from "react";
import Link from "next/link";
import { Eye, EyeOff, Ghost, ShieldCheck, Heart, User, Mail, Lock, Fingerprint, ArrowRight, CheckCircle2 } from "lucide-react";
import Image from "next/image";

/**
 * SOSIALPEDIA — Auth Page (Login / Signup) with Tailwind CSS
 * ---------------------------------------------------------
 * Cara pakai:
 * 1) Pastikan project Next.js dan Tailwind sudah siap.
 *    - Next 13/14 App Router: simpan file ini di `app/(auth)/page.tsx` atau `app/auth/page.tsx`.
 *    - Pages Router: simpan di `pages/auth.tsx` lalu export default component ini.
 * 2) Ganti handler onSubmit dengan integrasi ke backend (Supabase, Firebase Auth, NextAuth, atau API Anda sendiri).
 * 3) Tombol "Explore Anonymously" bisa diarahkan ke halaman eksplor/beranda tanpa identitas (mis. "/explore").
 * 4) Style menggunakan Tailwind; bebas sesuaikan warna/branding.
 */

export default function SosialpediaAuthPage() {
    const [mode, setMode] = useState<"login" | "signup">("login");
    const [showPw, setShowPw] = useState(false);
    const [showPw2, setShowPw2] = useState(false);

    // form states (demo only)
    const [emailOrUsername, setEmailOrUsername] = useState("");
    const [password, setPassword] = useState("");
    const [displayName, setDisplayName] = useState("");
    const [username, setUsername] = useState("");
    const [email, setEmail] = useState("");
    const [password2, setPassword2] = useState("");
    const [acceptTos, setAcceptTos] = useState(false);
    const [rememberMe, setRememberMe] = useState(true);

    function handleSubmit(e: React.FormEvent) {
        e.preventDefault();
        if (mode === "login") {
            console.log({ emailOrUsername, password, rememberMe });
            // TODO: panggil API login
        } else {
            console.log({ displayName, username, email, password, password2, acceptTos });
            // TODO: panggil API signup
        }
        alert(`${mode === "login" ? "Login" : "Signup"} submitted — lihat console untuk payload demo.`);
    }

    const pwStrength = useMemo(() => {
        // Simple strength hint purely for UI (ganti dengan library yang lebih baik jika perlu)
        const len = password.length;
        if (!len) return { label: "", width: "0%" };
        if (len < 6) return { label: "lemah", width: "33%" };
        if (len < 10) return { label: "sedang", width: "66%" };
        return { label: "kuat", width: "100%" };
    }, [password]);

    return (
        <main className="min-h-screen bg-gradient-to-br from-slate-950 via-slate-900 to-slate-800 text-white relative overflow-hidden">
            {/* background ornaments */}
            <div className="pointer-events-none absolute -top-24 -left-24 h-80 w-80 rounded-full bg-fuchsia-600/20 blur-3xl" />
            <div className="pointer-events-none absolute -bottom-24 -right-24 h-80 w-80 rounded-full bg-cyan-500/20 blur-3xl" />

            <header className="px-6 md:px-10 py-6 flex items-center justify-between">
                <div className="flex items-center gap-2">
                    <Image
                        src="icon.svg"
                        alt="Sosialpedia logo"
                        width={36}
                        height={36}
                        className="rounded-xl"
                    />
                    <span className="font-bold text-xl tracking-wide">Sosialpedia</span>
                    <span className="ml-2 rounded-full border border-white/10 bg-white/5 px-2 py-0.5 text-xs text-white/80">beta</span>
                </div>
                <nav className="hidden sm:flex items-center gap-6 text-sm text-white/70">
                    <a className="hover:text-white transition" href="#features">Fitur</a>
                    <a className="hover:text-white transition" href="#privacy">Privasi</a>
                    <a className="hover:text-white transition" href="#faq">FAQ</a>
                </nav>
            </header>

            <section className="mx-auto grid w-full max-w-6xl grid-cols-1 gap-8 px-6 md:grid-cols-2 md:px-10">
                {/* LEFT: Auth Card */}
                <div className="order-1 md:order-1">
                    <div className="rounded-2xl bg-white/[0.04] backdrop-blur-xl shadow-2xl ring-1 ring-white/10 p-6 sm:p-8">
                        <div className="flex items-center justify-between">
                            <h1 className="text-2xl font-semibold">
                                {mode === "login" ? "Masuk ke Sosialpedia" : "Buat akun Sosialpedia"}
                            </h1>
                            <div className="flex items-center rounded-full bg-white/5 p-1 text-xs">
                                <button
                                    onClick={() => setMode("login")}
                                    className={`px-3 py-1 rounded-full transition ${mode === "login" ? "bg-white text-slate-900" : "text-white/80 hover:text-white"}`}
                                >
                                    Login
                                </button>
                                <button
                                    onClick={() => setMode("signup")}
                                    className={`px-3 py-1 rounded-full transition ${mode === "signup" ? "bg-white text-slate-900" : "text-white/80 hover:text-white"}`}
                                >
                                    Signup
                                </button>
                            </div>
                        </div>

                        <p className="mt-2 text-sm text-white/70">
                            {mode === "login"
                                ? "Selamat datang kembali! Kelola identitas publik atau tetap anonim saat berbagi."
                                : "Gabung dan nikmati posting & reaksi anonim — kontrol penuh atas privasi Anda."}
                        </p>

                        <form onSubmit={handleSubmit} className="grid grid-cols-1 gap-4">
                            {mode === "signup" ? (
                                <>
                                    <LabeledInput
                                        id="displayName"
                                        label="Display Name"
                                        placeholder="Nama yang terlihat publik (opsional)"
                                        icon={<User className="h-4 w-4" />}
                                        value={displayName}
                                        onChange={(e) => setDisplayName(e.target.value)}
                                    />
                                    <LabeledInput
                                        id="username"
                                        label="Username"
                                        placeholder="@namapengguna"
                                        icon={<Fingerprint className="h-4 w-4" />}
                                        value={username}
                                        onChange={(e) => setUsername(e.target.value)}
                                        pattern="^[a-zA-Z0-9_\.]{3,20}$"
                                        title="3–20 karakter: huruf, angka, underscore, titik"
                                        required
                                    />
                                    <LabeledInput
                                        id="email"
                                        label="Email"
                                        placeholder="you@example.com"
                                        type="email"
                                        icon={<Mail className="h-4 w-4" />}
                                        value={email}
                                        onChange={(e) => setEmail(e.target.value)}
                                        required
                                    />

                                    <LabeledPassword
                                        id="password"
                                        label="Password"
                                        placeholder="••••••••"
                                        value={password}
                                        onChange={(e) => setPassword(e.target.value)}
                                        show={showPw}
                                        setShow={setShowPw}
                                    />

                                    {/* strength bar */}
                                    {password && (
                                        <div className="-mt-1.5 mb-1">
                                            <div className="h-1.5 w-full rounded-full bg-white/10">
                                                <div
                                                    className={`h-1.5 rounded-full bg-white transition-all`}
                                                    style={{ width: pwStrength.width }}
                                                />
                                            </div>
                                            <p className="mt-1 text-xs text-white/60">Kekuatan sandi: {pwStrength.label}</p>
                                        </div>
                                    )}

                                    <LabeledPassword
                                        id="password2"
                                        label="Konfirmasi Password"
                                        placeholder="••••••••"
                                        value={password2}
                                        onChange={(e) => setPassword2(e.target.value)}
                                        show={showPw2}
                                        setShow={setShowPw2}
                                    />

                                    <label className="mt-2 inline-flex select-none items-start gap-3 text-sm text-white/80">
                                        <input
                                            type="checkbox"
                                            className="mt-0.5 h-4 w-4 rounded border-white/20 bg-transparent text-white focus:ring-white/30"
                                            checked={acceptTos}
                                            onChange={(e) => setAcceptTos(e.target.checked)}
                                            required
                                        />
                                        <span>
                      Saya menyetujui <Link href="#" className="underline decoration-white/30 underline-offset-4 hover:decoration-white">Ketentuan Layanan</Link> & <Link href="#" className="underline decoration-white/30 underline-offset-4 hover:decoration-white">Kebijakan Privasi</Link>.
                    </span>
                                    </label>

                                    <button
                                        type="submit"
                                        className="mt-2 inline-flex items-center justify-center gap-2 rounded-xl bg-white px-4 py-3 font-medium text-slate-900 hover:bg-white/90 focus:outline-none focus:ring-2 focus:ring-white/30 active:scale-[.99]"
                                    >
                                        <CheckCircle2 className="h-5 w-5" /> Buat Akun
                                    </button>
                                </>
                            ) : (
                                <>
                                    <LabeledInput
                                        id="emailOrUsername"
                                        label="Email atau Username"
                                        placeholder="you@example.com atau @username"
                                        icon={<Mail className="h-4 w-4" />}
                                        value={emailOrUsername}
                                        onChange={(e) => setEmailOrUsername(e.target.value)}
                                        required
                                    />

                                    <LabeledPassword
                                        id="loginPassword"
                                        label="Password"
                                        placeholder="••••••••"
                                        value={password}
                                        onChange={(e) => setPassword(e.target.value)}
                                        show={showPw}
                                        setShow={setShowPw}
                                    />

                                    <div className="flex items-center justify-between text-sm">
                                        <label className="inline-flex items-center gap-2 text-white/80">
                                            <input
                                                type="checkbox"
                                                className="h-4 w-4 rounded border-white/20 bg-transparent text-white focus:ring-white/30"
                                                checked={rememberMe}
                                                onChange={(e) => setRememberMe(e.target.checked)}
                                            />
                                            Ingat saya
                                        </label>
                                        <Link href="#" className="text-white/80 underline decoration-white/30 underline-offset-4 hover:text-white">Lupa password?</Link>
                                    </div>

                                    <button
                                        type="submit"
                                        className="mt-2 inline-flex items-center justify-center gap-2 rounded-xl bg-white px-4 py-3 font-medium text-slate-900 hover:bg-white/90 focus:outline-none focus:ring-2 focus:ring-white/30 active:scale-[.99]"
                                    >
                                        <ArrowRight className="h-5 w-5" /> Masuk
                                    </button>
                                </>
                            )}
                        </form>

                        <p className="mt-4 text-center text-sm text-white/70">
                            {mode === "login" ? (
                                <>Belum punya akun? {" "}
                                    <button onClick={() => setMode("signup")} className="underline decoration-white/30 underline-offset-4 hover:decoration-white">Daftar sekarang</button>.
                                </>
                            ) : (
                                <>Sudah punya akun? {" "}
                                    <button onClick={() => setMode("login")} className="underline decoration-white/30 underline-offset-4 hover:decoration-white">Masuk</button>.
                                </>
                            )}
                        </p>
                    </div>
                </div>

                {/* RIGHT: Feature Highlights */}
                <div className="order-2 md:order-2">
                    <div className="relative h-full rounded-2xl bg-white/[0.04] backdrop-blur-xl shadow-2xl ring-1 ring-white/10 p-6 sm:p-8">
                        <div className="mb-6">
                            <h2 className="text-2xl font-semibold">Sosial yang lebih aman & bebas</h2>
                            <p className="mt-2 text-white/70">Dirancang seperti Instagram, namun dengan <em>anonymous post & reaction</em> bawaan.</p>
                        </div>

                        <ul className="space-y-5" id="features">
                            <Feature
                                icon={<Ghost className="h-5 w-5" />}
                                title="Posting Anonim"
                                desc="Bagi cerita tanpa menampilkan nama. Anda bisa switch ke identitas publik kapan pun."
                            />
                            <Feature
                                icon={<Heart className="h-5 w-5" />}
                                title="Reaksi Anonim"
                                desc="Suka, dukung, atau beri reaksi lain tanpa jejak identitas ke pengguna lain."
                            />
                            <Feature
                                icon={<ShieldCheck className="h-5 w-5" />}
                                title="Kontrol Privasi yang Jelas"
                                desc="Tombol mode anonim di composer & komentar membuat niat Anda selalu eksplisit."
                            />
                        </ul>

                        <div className="mt-8 rounded-xl border border-white/10 bg-slate-900/40 p-4" id="privacy">
                            <h3 className="font-medium">Bagaimana anonimitas bekerja?</h3>
                            <ol className="mt-2 list-decimal space-y-1 pl-5 text-sm text-white/80">
                                <li>Identitas publik Anda disimpan aman di server; tidak ditampilkan saat Mode Anonim aktif.</li>
                                <li>Posting/reaksi anonim ditandai dengan label khusus di UI, tanpa nama/handle.</li>
                                <li>Admin masih dapat melakukan moderasi sesuai kebijakan & hukum yang berlaku.</li>
                            </ol>
                        </div>

                        <div className="mt-8" id="faq">
                            <details className="group rounded-xl border border-white/10 bg-white/5 p-4">
                                <summary className="cursor-pointer select-none font-medium text-white/90">
                                    Apakah saya bisa mengubah posting anonim menjadi publik setelah diposting?
                                </summary>
                                <p className="mt-2 text-sm text-white/80">
                                    Secara desain sebaiknya tidak, demi konsistensi ekspektasi audiens. Namun fitur ini bisa dibuat opsional oleh admin.
                                </p>
                            </details>
                            <details className="group mt-3 rounded-xl border border-white/10 bg-white/5 p-4">
                                <summary className="cursor-pointer select-none font-medium text-white/90">
                                    Bisakah pengguna lain melihat siapa pemilik reaksi?
                                </summary>
                                <p className="mt-2 text-sm text-white/80">
                                    Tidak saat Mode Anonim aktif. Reaksi akan tampil agregat tanpa identitas pengguna lain.
                                </p>
                            </details>
                        </div>
                    </div>
                </div>
            </section>

            <footer className="mx-auto mt-10 max-w-6xl px-6 md:px-10 pb-10">
                <p className="text-center text-xs text-white/50">
                    © {new Date().getFullYear()} Sosialpedia • Dibuat dengan ❤ untuk komunitas
                </p>
            </footer>
        </main>
    );
}

function LabeledInput({
                          id,
                          label,
                          icon,
                          type = "text",
                          placeholder,
                          value,
                          onChange,
                          required,
                          pattern,
                          title,
                      }: {
    id: string;
    label: string;
    icon?: React.ReactNode;
    type?: string;
    placeholder?: string;
    value?: string;
    onChange?: (e: React.ChangeEvent<HTMLInputElement>) => void;
    required?: boolean;
    pattern?: string;
    title?: string;
}) {
    return (
        <label htmlFor={id} className="group block">
            <span className="mb-1.5 block text-sm text-white/80">{label}</span>
            <div className="flex items-center rounded-xl border border-white/10 bg-white/5 px-3 py-2.5 ring-white/0 transition focus-within:ring-2 focus-within:ring-white/30">
                {icon && <span className="mr-2 text-white/60">{icon}</span>}
                <input
                    id={id}
                    name={id}
                    type={type}
                    placeholder={placeholder}
                    value={value}
                    onChange={onChange}
                    required={required}
                    pattern={pattern}
                    title={title}
                    className="w-full bg-transparent text-sm text-white placeholder-white/40 outline-none"
                />
            </div>
        </label>
    );
}

function LabeledPassword({
                             id,
                             label,
                             placeholder,
                             value,
                             onChange,
                             show,
                             setShow,
                         }: {
    id: string;
    label: string;
    placeholder?: string;
    value?: string;
    onChange?: (e: React.ChangeEvent<HTMLInputElement>) => void;
    show: boolean;
    setShow: (v: boolean) => void;
}) {
    return (
        <label htmlFor={id} className="group block">
            <span className="mb-1.5 block text-sm text-white/80">{label}</span>
            <div className="flex items-center rounded-xl border border-white/10 bg-white/5 px-3 py-2.5 ring-white/0 transition focus-within:ring-2 focus-within:ring-white/30">
                <Lock className="mr-2 h-4 w-4 text-white/60" />
                <input
                    id={id}
                    name={id}
                    type={show ? "text" : "password"}
                    placeholder={placeholder}
                    value={value}
                    onChange={onChange}
                    className="w-full bg-transparent text-sm text-white placeholder-white/40 outline-none"
                    autoComplete="current-password"
                    required
                />
                <button
                    type="button"
                    onClick={() => setShow(!show)}
                    aria-label={show ? "Sembunyikan password" : "Tampilkan password"}
                    className="ml-2 rounded-lg p-1 text-white/70 hover:bg-white/10 hover:text-white"
                >
                    {show ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
                </button>
            </div>
        </label>
    );
}

function Feature({ icon, title, desc }: { icon: React.ReactNode; title: string; desc: string }) {
    return (
        <li className="flex gap-4">
            <div className="mt-1 flex h-9 w-9 shrink-0 items-center justify-center rounded-lg bg-white/10">
                {icon}
            </div>
            <div>
                <p className="font-medium">{title}</p>
                <p className="text-sm text-white/75">{desc}</p>
            </div>
        </li>
    );
}
