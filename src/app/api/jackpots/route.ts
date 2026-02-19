import { NextResponse } from "next/server";
import { searchSocialData } from "@/lib/rapidapi";

export async function POST(req: Request) {
    try {
        const { keyword } = await req.json();
        if (!keyword) return NextResponse.json({ error: "Keyword required" }, { status: 400 });

        const results = await searchSocialData(keyword);
        return NextResponse.json({ results });
    } catch (error: any) {
        console.error("Jackpots Error:", error);
        return NextResponse.json({ error: error.message || "Search failed" }, { status: 500 });
    }
}
