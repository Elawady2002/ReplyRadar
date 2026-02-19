import { NextResponse } from "next/server";
import { searchSocialData } from "@/lib/rapidapi";
import { classifyActivity } from "@/lib/llm";

export async function POST(req: Request) {
    try {
        const { keyword } = await req.json();
        if (!keyword) return NextResponse.json({ error: "Keyword required" }, { status: 400 });

        // 1. Fetch live social data
        const results = await searchSocialData(keyword);
        const sampleText = results.slice(0, 10).map(r => r.text).join("\n");

        // 2. Perform live AI analysis
        const analysis = await classifyActivity(keyword, sampleText);

        return NextResponse.json({
            level: analysis.level,
            count: results.length,
            classification: analysis.classification
        });
    } catch (error: any) {
        console.error("Analysis Error:", error);
        return NextResponse.json({ error: error.message || "Analysis failed" }, { status: 500 });
    }
}
