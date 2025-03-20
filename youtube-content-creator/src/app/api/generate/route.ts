import { NextResponse } from 'next/server';
import OpenAI from 'openai';

const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
});

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const { channel, content, output } = body;

    // Construct the prompt for OpenAI
    const prompt = `Create a YouTube content plan for a channel with the following details:

Channel Information:
- Name: ${channel.name}
- Description: ${channel.description}
- Category: ${channel.category}

Content Preferences:
- Style: ${content.style}
- Tone: ${content.tone}
- Target Audience: ${content.targetAudience}

Output Requirements:
- Video Length: ${output.videoLength}
- Format: ${output.format}
- Upload Frequency: ${output.frequency}

Please provide:
1. A catchy video title
2. An engaging video description
3. A detailed content outline
4. Key talking points
5. Suggested tags for SEO`;

    const completion = await openai.chat.completions.create({
      messages: [
        {
          role: 'system',
          content: 'You are a professional YouTube content strategist helping creators plan their videos.',
        },
        {
          role: 'user',
          content: prompt,
        },
      ],
      model: 'gpt-3.5-turbo',
      temperature: 0.7,
      max_tokens: 1000,
    });

    const response = completion.choices[0].message.content;

    return NextResponse.json({ content: response });
  } catch (error) {
    console.error('Error generating content:', error);
    return NextResponse.json(
      { error: 'Failed to generate content' },
      { status: 500 }
    );
  }
}
