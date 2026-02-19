import { NextResponse } from "next/server";
import { expandKeywords } from "@/lib/llm";

export async function POST(req: Request) {
    try {
        const { keyword } = await req.json();
        if (!keyword) return NextResponse.json({ error: "Keyword required" }, { status: 400 });

        const variations = await expandKeywords(keyword);
        return NextResponse.json({ variations });
    } catch (error: any) {
        console.error("Radar Error:", error);
        return NextResponse.json({ error: error.message || "Failed to expand keyword" }, { status: 500 });
    }
}
