import {NextResponse} from 'next/server';

export async function POST(req: Request) {
  try {
    const {message, sessionId: oldSessionId} = await req.json();

    if (!message) {
      return NextResponse.json({error: 'Message is required.'}, {status: 400});
    }

    await new Promise(resolve => setTimeout(resolve, 1500));

    const botResponses = [
        `I'm pondering your message: "${message}". It's quite interesting.`,
        `Regarding "${message}", I have a few thoughts. First...`,
        `That's a great question about "${message}". Let me look into that for you.`,
        `Simulating a detailed response for: "${message}". This could involve complex data.`,
    ];
    
    const botResponse = botResponses[Math.floor(Math.random() * botResponses.length)];

    const newSessionId = oldSessionId || `session_${Date.now()}`;

    return NextResponse.json({
      response: botResponse,
      sessionId: newSessionId,
    });
  } catch (error) {
    return NextResponse.json(
      {error: 'An error occurred processing your request.'},
      {status: 500}
    );
  }
}
