import OpenAI from 'openai';

const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
});

interface ElementDetectionResult {
  selector: string;
  confidence: number;
  type: 'cookie-banner' | 'newsletter' | 'chat-widget' | 'social-overlay' | 'ad';
}

export async function detectElements(html: string): Promise<ElementDetectionResult[]> {
  try {
    // Use GPT-4 to analyze the HTML structure
    const completion = await openai.chat.completions.create({
      model: "gpt-4",
      messages: [
        {
          role: "system",
          content: "You are an expert at analyzing HTML to identify common UI elements like cookie banners, popups, and ads. Return only valid CSS selectors."
        },
        {
          role: "user",
          content: `Analyze this HTML and return CSS selectors for cookie banners, newsletter popups, chat widgets, social media overlays, and ads. Format as JSON array with 'selector', 'type', and 'confidence' (0-1). HTML:\n${html}`
        }
      ],
      response_format: { type: "json_object" },
    });

    const response = JSON.parse(completion.choices[0].message.content || '{}');
    return response.elements || [];
  } catch (error) {
    console.error('AI element detection error:', error);
    return [];
  }
} 