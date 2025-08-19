// app/page.tsx
import { cookies } from "next/headers";
import { redirect } from "next/navigation";

export default async function Home() {
    const isLoggedIn = (await cookies()).get("sp_session")?.value; // sesuaikan nama cookie/session-mu
    if (isLoggedIn) redirect("/");
    redirect("/auth");
}
