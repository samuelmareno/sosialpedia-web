"use client";
import React, {useEffect, useMemo, useState} from "react";
import Link from "next/link";
import {
    ArrowRight,
    CheckCircle2,
    Eye,
    EyeOff,
    Fingerprint,
    Ghost,
    Heart,
    Lock,
    Mail,
    Moon,
    ShieldCheck,
    Sun
} from "lucide-react";
import Image from "next/image";

export default function SosialpediaAuthPage() {
    const [mode, setMode] = useState<"login" | "signup">("login");
    const [showPw, setShowPw] = useState(false);
    const [showPw2, setShowPw2] = useState(false);

    // form states (demo only)
    const [emailOrUsername, setEmailOrUsername] = useState("");
    const [password, setPassword] = useState("");
    const [username, setUsername] = useState("");
    const [email, setEmail] = useState("");
    const [password2, setPassword2] = useState("");
    const [acceptTos, setAcceptTos] = useState(false);
    const [theme, setTheme] = useState<'light' | 'dark'>('light');

    useEffect(() => {
        if (typeof window === 'undefined') return;
        const stored = localStorage.getItem('theme');
        const prefersDark = window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches;
        const initial = stored === 'dark' || stored === 'light' ? stored : (prefersDark ? 'dark' : 'light');
        setTheme(initial);
        document.documentElement.classList.toggle('dark', initial === 'dark');
    }, []);

    useEffect(() => {
        if (typeof window === 'undefined') return;
        localStorage.setItem('theme', theme);
        document.documentElement.classList.toggle('dark', theme === 'dark');
    }, [theme]);
    const [rememberMe, setRememberMe] = useState(true);

    function handleSubmit(e: React.FormEvent) {
        e.preventDefault();
        if (mode === "login") {
            console.log({emailOrUsername, password, rememberMe});
        } else {
            console.log({username, email, password, password2, acceptTos});
        }
        alert(`${mode === "login" ? "Login" : "Signup"} submitted — lihat console untuk payload demo.`);
    }

    const pwStrength = useMemo(() => {
        const len = password.length;
        if (!len) return {label: "", width: "0%"};
        if (len < 6) return {label: "lemah", width: "33%"};
        if (len < 10) return {label: "sedang", width: "66%"};
        return {label: "kuat", width: "100%"};
    }, [password]);

    return (
        <main data-theme={theme}
              className="min-h-screen bg-gradient-to-br from-slate-50 via-white to-slate-100 text-slate-900 dark:from-slate-950 dark:via-slate-900 dark:to-slate-800 dark:text-white relative overflow-hidden">
            {/* background ornaments */}
            <div
                className="pointer-events-none absolute -top-24 -left-24 h-80 w-80 rounded-full bg-fuchsia-400/20 dark:bg-fuchsia-600/20 blur-3xl"/>
            <div
                className="pointer-events-none absolute -bottom-24 -right-24 h-80 w-80 rounded-full bg-cyan-400/20 dark:bg-cyan-500/20 blur-3xl"/>

            <header className="px-6 md:px-10 py-6 flex items-center justify-between">
                <div className="flex items-center gap-2">
                    <Image src="icon.svg" alt="Sosialpedia logo" width={36} height={36} className="rounded-xl"/>
                    <span className="font-bold text-xl tracking-wide">Sosialpedia</span>
                    <span
                        className="ml-2 rounded-full border border-slate-200 dark:border-white/10 bg-slate-100 dark:bg-white/5 px-2 py-0.5 text-xs text-slate-700 dark:text-white/80">beta</span>
                </div>
                <div className="flex items-center gap-3">
                    <nav className="hidden sm:flex items-center gap-6 text-sm text-slate-600 dark:text-white/70">
                        <a className="transition hover:text-slate-900 dark:hover:text-white" href="#features">Fitur</a>
                        <a className="transition hover:text-slate-900 dark:hover:text-white" href="#privacy">Privasi</a>
                        <a className="transition hover:text-slate-900 dark:hover:text-white" href="#faq">FAQ</a>
                    </nav>
                    <button
                        type="button"
                        onClick={() => setTheme((t) => (t === 'dark' ? 'light' : 'dark'))}
                        aria-label="Toggle theme"
                        className="inline-flex items-center justify-center rounded-xl border border-slate-200 dark:border-white/10 bg-slate-100 dark:bg-white/5 p-2 hover:bg-slate-200 dark:hover:bg-white/10 active:scale-[.98]"
                    >
                        {theme === 'dark' ? <Sun className="h-5 w-5"/> : <Moon className="h-5 w-5"/>}
                        <span className="sr-only">Toggle theme</span>
                    </button>
                </div>
            </header>

            <section className="mx-auto grid w-full max-w-6xl grid-cols-1 gap-8 px-6 md:grid-cols-2 md:px-10">
                {/* LEFT: Auth Card */}
                <div className="order-1 md:order-1">
                    <div
                        className="rounded-2xl bg-white dark:bg-white/5 backdrop-blur-xl shadow-2xl ring-1 ring-slate-200/60 dark:ring-white/10 p-6 sm:p-8">
                        <div className="flex items-center justify-between">
                            <h1 className="text-2xl font-semibold">
                                {mode === "login" ? "Masuk ke Sosialpedia" : "Buat akun Sosialpedia"}
                            </h1>
                            <div
                                className="flex items-center rounded-full border border-slate-200 dark:border-white/10 bg-slate-100 dark:bg-white/5 p-1 text-xs">
                                <button
                                    onClick={() => setMode("login")}
                                    className={`px-3 py-1 rounded-full transition ${mode === "login" ? "bg-slate-900 text-white dark:bg-white dark:text-slate-900" : "text-slate-600 dark:text-white/80 hover:text-slate-900 dark:hover:text-white"}`}
                                >
                                    Login
                                </button>
                                <button
                                    onClick={() => setMode("signup")}
                                    className={`px-3 py-1 rounded-full transition ${mode === "signup" ? "bg-slate-900 text-white dark:bg-white dark:text-slate-900" : "text-slate-600 dark:text-white/80 hover:text-slate-900 dark:hover:text-white"}`}
                                >
                                    Signup
                                </button>
                            </div>
                        </div>

                        <p className="mt-2 text-sm text-slate-600 dark:text-white/70">
                            {mode === "login"
                                ? "Selamat datang kembali! Kelola identitas publik atau tetap anonim saat berbagi."
                                : "Gabung dan nikmati posting & reaksi anonim — kontrol penuh atas privasi Anda."}
                        </p>

                        <form onSubmit={handleSubmit} className="grid grid-cols-1">
                            {mode === "signup" ? (
                                <>
                                    <LabeledInput
                                        id="username"
                                        label="Username"
                                        placeholder="@namapengguna"
                                        icon={<Fingerprint className="h-4 w-4"/>}
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
                                        icon={<Mail className="h-4 w-4"/>}
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
                                            <div className="h-1.5 w-full rounded-full bg-slate-200 dark:bg-white/10">
                                                <div
                                                    className={`h-1.5 rounded-full bg-slate-900 dark:bg-white transition-all`}
                                                    style={{width: pwStrength.width}}
                                                />
                                            </div>
                                            <p className="mt-1 text-xs text-slate-500 dark:text-white/60">Kekuatan
                                                sandi: {pwStrength.label}</p>
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

                                    <label
                                        className="mt-2 inline-flex select-none items-start gap-3 text-sm text-slate-700 dark:text-white/80">
                                        <input
                                            type="checkbox"
                                            className="mt-0.5 h-4 w-4 rounded border-slate-300 dark:border-white/20 bg-white dark:bg-transparent text-slate-900 dark:text-white focus:ring-slate-300 dark:focus:ring-white/30"
                                            checked={acceptTos}
                                            onChange={(e) => setAcceptTos(e.target.checked)}
                                            required
                                        />
                                        <span>
                      Saya menyetujui <Link href="#"
                                            className="underline decoration-slate-300 dark:decoration-white/30 underline-offset-4 hover:decoration-slate-500 dark:hover:decoration-white">Ketentuan Layanan</Link> & <Link
                                            href="#"
                                            className="underline decoration-slate-300 dark:decoration-white/30 underline-offset-4 hover:decoration-slate-500 dark:hover:decoration-white">Kebijakan Privasi</Link>.
                    </span>
                                    </label>

                                    <button
                                        type="submit"
                                        className="mt-2 inline-flex items-center justify-center gap-2 rounded-xl bg-slate-900 text-white px-4 py-3 font-medium hover:bg-slate-800 focus:outline-none focus:ring-2 focus:ring-slate-300 active:scale-[.99] dark:bg-white dark:text-slate-900 dark:hover:bg-white/90 dark:focus:ring-white/30"
                                    >
                                        <CheckCircle2 className="h-5 w-5"/> Buat Akun
                                    </button>
                                </>
                            ) : (
                                <>
                                    <LabeledInput
                                        id="emailOrUsername"
                                        label="Email atau Username"
                                        placeholder="you@example.com atau @username"
                                        icon={<Mail className="h-4 w-4"/>}
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
                                        <label
                                            className="inline-flex items-center gap-2 text-slate-700 dark:text-white/80">
                                            <input
                                                type="checkbox"
                                                className="h-4 w-4 rounded border-slate-300 dark:border-white/20 bg-white dark:bg-transparent text-slate-900 dark:text-white focus:ring-slate-300 dark:focus:ring-white/30"
                                                checked={rememberMe}
                                                onChange={(e) => setRememberMe(e.target.checked)}
                                            />
                                            Ingat saya
                                        </label>
                                        <Link href="#"
                                              className="text-slate-700 dark:text-white/80 underline decoration-slate-300 dark:decoration-white/30 underline-offset-4 hover:text-slate-900 dark:hover:text-white">Lupa
                                            password?</Link>
                                    </div>

                                    <button
                                        type="submit"
                                        className="mt-2 inline-flex items-center justify-center gap-2 rounded-xl bg-slate-900 text-white px-4 py-3 font-medium hover:bg-slate-800 focus:outline-none focus:ring-2 focus:ring-slate-300 active:scale-[.99] dark:bg-white dark:text-slate-900 dark:hover:bg-white/90 dark:focus:ring-white/30"
                                    >
                                        <ArrowRight className="h-5 w-5"/> Masuk
                                    </button>
                                </>
                            )}
                        </form>

                        <p className="mt-4 text-center text-sm text-slate-600 dark:text-white/70">
                            {mode === "login" ? (
                                <>Belum punya akun? {" "}
                                    <button onClick={() => setMode("signup")}
                                            className="underline decoration-slate-300 dark:decoration-white/30 underline-offset-4 hover:decoration-slate-500 dark:hover:decoration-white">Daftar
                                        sekarang
                                    </button>
                                    .
                                </>
                            ) : (
                                <>Sudah punya akun? {" "}
                                    <button onClick={() => setMode("login")}
                                            className="underline decoration-slate-300 dark:decoration-white/30 underline-offset-4 hover:decoration-slate-500 dark:hover:decoration-white">Masuk
                                    </button>
                                    .
                                </>
                            )}
                        </p>
                    </div>
                </div>

                {/* RIGHT: Feature Highlights */}
                <div className="order-2 md:order-2">
                    <div
                        className="relative h-full rounded-2xl bg-white dark:bg-white/5 backdrop-blur-xl shadow-2xl ring-1 ring-slate-200/60 dark:ring-white/10 p-6 sm:p-8">
                        <div className="mb-6">
                            <h2 className="text-2xl font-semibold">Sosial yang lebih aman & bebas</h2>
                            <p className="mt-2 text-slate-600 dark:text-white/70">Dirancang seperti Instagram, namun
                                dengan <em>anonymous post & reaction</em> bawaan.</p>
                        </div>

                        <ul className="space-y-5" id="features">
                            <Feature
                                icon={<Ghost className="h-5 w-5"/>}
                                title="Posting Anonim"
                                desc="Bagi cerita tanpa menampilkan nama. Anda bisa switch ke identitas publik kapan pun."
                            />
                            <Feature
                                icon={<Heart className="h-5 w-5"/>}
                                title="Reaksi Anonim"
                                desc="Suka, dukung, atau beri reaksi lain tanpa jejak identitas ke pengguna lain."
                            />
                            <Feature
                                icon={<ShieldCheck className="h-5 w-5"/>}
                                title="Kontrol Privasi yang Jelas"
                                desc="Tombol mode anonim di composer & komentar membuat niat Anda selalu eksplisit."
                            />
                        </ul>

                        <div
                            className="mt-8 rounded-xl border border-slate-200 dark:border-white/10 bg-slate-100 dark:bg-slate-900/40 p-4"
                            id="privacy">
                            <h3 className="font-medium">Bagaimana anonimitas bekerja?</h3>
                            <ol className="mt-2 list-decimal space-y-1 pl-5 text-sm text-slate-700 dark:text-white/80">
                                <li>Identitas publik Anda disimpan aman di server; tidak ditampilkan saat Mode Anonim
                                    aktif.
                                </li>
                                <li>Posting/reaksi anonim ditandai dengan label khusus di UI, tanpa nama/handle.</li>
                                <li>Admin masih dapat melakukan moderasi sesuai kebijakan & hukum yang berlaku.</li>
                            </ol>
                        </div>

                        <div className="mt-8" id="faq">
                            <details
                                className="group rounded-xl border border-slate-200 dark:border-white/10 bg-white dark:bg-white/5 p-4">
                                <summary
                                    className="cursor-pointer select-none font-medium text-slate-800 dark:text-white/90">
                                    Apakah saya bisa mengubah posting anonim menjadi publik setelah diposting?
                                </summary>
                                <p className="mt-2 text-sm text-slate-700 dark:text-white/80">
                                    Secara desain sebaiknya tidak, demi konsistensi ekspektasi audiens. Namun fitur ini
                                    bisa dibuat opsional oleh admin.
                                </p>
                            </details>
                            <details
                                className="group mt-3 rounded-xl border border-slate-200 dark:border-white/10 bg-white dark:bg-white/5 p-4">
                                <summary
                                    className="cursor-pointer select-none font-medium text-slate-800 dark:text-white/90">
                                    Bisakah pengguna lain melihat siapa pemilik reaksi?
                                </summary>
                                <p className="mt-2 text-sm text-slate-700 dark:text-white/80">
                                    Tidak saat Mode Anonim aktif. Reaksi akan tampil agregat tanpa identitas pengguna
                                    lain.
                                </p>
                            </details>
                        </div>
                    </div>
                </div>
            </section>

            <footer className="mx-auto mt-10 max-w-6xl px-6 md:px-10 pb-10">
                <p className="text-center text-xs text-slate-500 dark:text-white/50">
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
            <span className="mb-1.5 mt-1.5 block text-sm text-slate-700 dark:text-white/80">{label}</span>
            <div
                className="flex items-center rounded-xl border border-slate-200 dark:border-white/10 bg-white dark:bg-white/5 px-3 py-2.5 ring-white/0 transition focus-within:ring-2 focus-within:ring-slate-300 dark:focus-within:ring-white/30">
                {icon && <span className="mr-2 text-slate-500 dark:text-white/60">{icon}</span>}
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
                    className="w-full bg-transparent text-sm text-slate-900 dark:text-white placeholder-slate-400 dark:placeholder-white/40 outline-none"
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
            <span className="mb-1.5 mt-1.5 block text-sm text-slate-700 dark:text-white/80">{label}</span>
            <div
                className="flex items-center rounded-xl border border-slate-200 dark:border-white/10 bg-white dark:bg-white/5 px-3 py-2.5 ring-white/0 transition focus-within:ring-2 focus-within:ring-slate-300 dark:focus-within:ring-white/30">
                <Lock className="mr-2 h-4 w-4 text-slate-500 dark:text-white/60"/>
                <input
                    id={id}
                    name={id}
                    type={show ? "text" : "password"}
                    placeholder={placeholder}
                    value={value}
                    onChange={onChange}
                    className="w-full bg-transparent text-sm text-slate-900 dark:text-white placeholder-slate-400 dark:placeholder-white/40 outline-none"
                    autoComplete="current-password"
                    required
                />
                <button
                    type="button"
                    onClick={() => setShow(!show)}
                    aria-label={show ? "Sembunyikan password" : "Tampilkan password"}
                    className="ml-2 rounded-lg p-1 text-slate-700 dark:text-white/70 hover:bg-slate-100 dark:hover:bg-white/10 hover:text-slate-900 dark:hover:text-white"
                >
                    {show ? <EyeOff className="h-4 w-4"/> : <Eye className="h-4 w-4"/>}
                </button>
            </div>
        </label>
    );
}

function Feature({icon, title, desc}: { icon: React.ReactNode; title: string; desc: string }) {
    return (
        <li className="flex gap-4">
            <div
                className="mt-1 flex h-9 w-9 shrink-0 items-center justify-center rounded-lg bg-slate-100 dark:bg-white/10">
                {icon}
            </div>
            <div>
                <p className="font-medium">{title}</p>
                <p className="text-sm text-slate-600 dark:text-white/75">{desc}</p>
            </div>
        </li>
    );
}
