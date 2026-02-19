import { NextResponse } from "next/server";
import { generateReplies } from "@/lib/llm";

export async function POST(req: Request) {
    try {
        const { posts, affiliateLink } = await req.json();
        if (!posts || !Array.isArray(posts)) return NextResponse.json({ error: "Posts required" }, { status: 400 });

        // Batch generation for efficiency
        const results = await generateReplies(posts, affiliateLink);

        return NextResponse.json({ results });
    } catch (error: any) {
        console.error("Replies Error:", error);
        return NextResponse.json({ error: error.message || "Reply generation failed" }, { status: 500 });
    }
}
