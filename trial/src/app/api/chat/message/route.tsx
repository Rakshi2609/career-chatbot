import { NextResponse } from "next/server";
import { v4 as uuidv4 } from "uuid";

// Node-Fetch workaround for Next.js API routes (Edge-friendly)
const fetchFn = (...args: any[]) =>
  import("node-fetch").then(({ default: fetch }) => fetch(...args));

// In-memory session store
const chatHistories = new Map<string, { role: string; text: string }[]>();

// System Prompt (must be role=user for Gemini)
const SYSTEM_MESSAGE = `
You are "CareerNavigator AI", an expert career consultant.
Give detailed, practical guidance about careers, skills, interviews,
jobs, resumes, and growth. Redirect unrelated questions politely.
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
