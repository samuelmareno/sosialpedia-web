import {NextRequest, NextResponse} from "next/server";

export async function POST(req: NextRequest) {
    try {
        const body = await req.json();
        const {username, password, email} = body ?? {};

        if (!username || !password || !email) {
            return NextResponse.json({error: "Missing fields"}, {status: 400});
        }

        const ipHeader =
            req.headers.get("x-forwarded-for")?.split(",")[0]?.trim() ||
            req.headers.get("x-real-ip") ||
            "0.0.0.0";

        const payload = {
            username,
            password,
            email,
            ipAddress: ipHeader
        };

        const res = await fetch(`${process.env.BACKEND_BASE_URL}/user/signup`, {
            method: "POST",
            headers: {"Content-Type": "application/json"},
            body: JSON.stringify(payload),
        });

        const data = await res.json().catch(() => ({}));

        if (!res.ok) {
            return NextResponse.json(
                {error: data?.message || "Signup failed", details: data},
                {status: res.status}
            );
        }

        return NextResponse.json(data);

    } catch (err: any) {
        return NextResponse.json(
            {error: "Unexpected error", details: err?.message},
            {status: 500}
        );
    }
}