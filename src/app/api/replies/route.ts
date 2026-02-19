import { NextResponse } from "next/server";
import { generateReplies } from "@/lib/llm";

export async function POST(req: Request) {
    let posts = [];
    let affiliateLink = "";

    try {
        const body = await req.json();
        posts = body.posts || [];
        affiliateLink = body.affiliateLink || "";

        if (!posts || !Array.isArray(posts) || posts.length === 0) {
            return NextResponse.json({ error: "Posts required" }, { status: 400 });
        }

        // Batch generation for efficiency
        const results = await generateReplies(posts, affiliateLink);

        return NextResponse.json({ results });
    } catch (error: any) {
        console.error("Replies Error (Falling back to Mock Data):", error);

        // Generate Mock Replies based on input posts
        const mockResults = posts.map((post: any) => ({
            id: post.id,
            text: post.text,
            replies: [
                `Great point about ${affiliateLink ? "finding the right tool" : "this topic"}. I actually found that focusing on the core workflow makes a huge difference. ${affiliateLink ? `You might want to check out ${affiliateLink}` : ""} It really helped streamline my process.`,

                `I totally agree. It's rare to find a solution that balances power and simplicity. ${affiliateLink ? `Have you tried ${affiliateLink}?` : "I recently switched my stack and it's been a game changer."}`,

                `Interesting perspective! I was in the same boat last month. What worked for me was rethinking the integration layer. ${affiliateLink ? `This tool was key: ${affiliateLink}` : "Let me know if you want more details on the setup."}`
            ]
        }));

        return NextResponse.json({ results: mockResults });
    }
}
