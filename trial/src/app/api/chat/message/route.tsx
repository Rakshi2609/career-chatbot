import { NextResponse } from "next/server";
import { v4 as uuidv4 } from "uuid";

// Node-Fetch workaround for Next.js API routes (Edge-friendly)
const fetchFn = (...args: any[]) =>
  import("node-fetch").then(({ default: fetch }) => fetch(...args));

// In-memory session store
const chatHistories = new Map<string, { role: string; text: string }[]>();

// System Prompt (must be role=user for Gemini)
const SYSTEM_MESSAGE = `
You are "CareerNavigator AI", an expert career consultant and mentor with extensive experience in career development, job market trends, and professional growth strategies.

Your role is to:
1. Provide personalized, actionable career advice tailored to each user's situation
2. Offer detailed guidance on career paths, skill development, and job searching
3. Help with interview preparation, resume optimization, and personal branding
4. Share insights about industry trends, salary expectations, and growth opportunities
5. Guide users on work-life balance, career transitions, and professional networking
6. Answer questions about specific job roles, required skills, and career progression

Communication style:
- Be warm, encouraging, and supportive while maintaining professionalism
- Ask clarifying questions when needed to provide more relevant advice
- Use concrete examples and practical steps
- Be honest about challenges while remaining optimistic
- Structure responses with clear sections when covering multiple topics

For off-topic questions:
Politely redirect users by saying: "I specialize in career guidance and professional development. While I'd love to help with that, I'm best suited for questions about careers, job searching, skills, interviews, resumes, and professional growth. How can I assist you with your career today?"

Remember: Your goal is to empower users to make informed career decisions and achieve their professional aspirations.
`;

export async function POST(req: Request) {
  try {
    const { message, sessionId } = await req.json();

    if (!message || typeof message !== "string") {
      return NextResponse.json(
        { error: "Message is required." },
        { status: 400 }
      );
    }

    // Load or create chat history
    let finalSessionId = sessionId || uuidv4();

    let history =
      chatHistories.get(finalSessionId) ||
      [{ role: "user", text: SYSTEM_MESSAGE }];

    // Prepare contents for Gemini
    const contents = [
      ...history.map((h) => ({
        role: h.role,
        parts: [{ text: h.text }],
      })),
      { role: "user", parts: [{ text: message }] },
    ];

    // Call Google REST API
    const url =
      "https://generativelanguage.googleapis.com/v1/models/gemini-2.5-flash:generateContent?key=" +
      process.env.GEMINI_API_KEY;

    const response = await fetchFn(url, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ contents }),
    });

    const data = await response.json();

    if (data.error) {
      console.error("Gemini Error:", data.error);
      return NextResponse.json(
        { error: data.error.message },
        { status: 500 }
      );
    }

    const text =
      data.candidates?.[0]?.content?.parts?.[0]?.text ||
      "I'm sorry, I couldn't generate a response.";

    // Save updated chat history
    history.push({ role: "user", text: message });
    history.push({ role: "model", text: text });
    chatHistories.set(finalSessionId, history);

    return NextResponse.json({
      sessionId: finalSessionId,
      response: text,
      history: history.slice(1), // hide system message
    });
  } catch (err: any) {
    console.error("Server error:", err);
    return NextResponse.json(
      { error: "Internal server error." },
      { status: 500 }
    );
  }
}
