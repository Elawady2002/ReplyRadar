import { NextResponse } from "next/server";
import { expandKeywords } from "@/lib/llm";

export async function POST(req: Request) {
    let keyword = "Business";
    try {
        const body = await req.json();
        keyword = body.keyword || "Business";

        if (!body.keyword) return NextResponse.json({ error: "Keyword required" }, { status: 400 });

        const variations = await expandKeywords(body.keyword);
        return NextResponse.json({ variations });
    } catch (error: any) {
        console.error("Radar Error (Falling back to Mock Data):", error);

        // Mock Variations relevant to the input
        const base = keyword;
        const mockVariations = [
            `${base} Growth Strategies`,
            `Best ${base} Tools 2024`,
            `How to Start ${base}`,
            `${base} for Beginners`,
            `${base} Automation Hacks`,
            `Scaling ${base} Business`
        ];

        return NextResponse.json({ variations: mockVariations });
    }
}
