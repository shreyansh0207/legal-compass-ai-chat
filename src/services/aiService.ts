
export interface ChatMessage {
  role: 'user' | 'assistant' | 'system';
  content: string;
}

export interface ChatCompletionResponse {
  message: ChatMessage;
}

const API_KEY = "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";

export const generateResponse = async (
  messages: ChatMessage[],
  category: string
): Promise<ChatCompletionResponse> => {
  try {
    const response = await fetch('https://api.gorilla.llm/chat/completions', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${API_KEY}`
      },
      body: JSON.stringify({
        model: "gorilla-llm-2p-instruct",
        messages: [
          {
            role: "system",
            content: `You are a legal assistant specialized in ${category} law. Provide accurate, helpful, and clear guidance on legal matters related to ${category}. When appropriate, suggest consulting with a qualified lawyer for personalized advice.`
          },
          ...messages
        ],
        max_tokens: 500,
        temperature: 0.7
      })
    });

    if (!response.ok) {
      throw new Error('Failed to generate response');
    }

    const data = await response.json();
    return {
      message: {
        role: 'assistant',
        content: data.choices[0].message.content
      }
    };
  } catch (error) {
    console.error('Error generating response:', error);
    throw error;
  }
};
