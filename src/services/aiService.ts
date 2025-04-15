
// This is a simple mock implementation of an AI service
// In a real application, this would connect to the gorq API

export interface ChatMessage {
  role: 'user' | 'assistant' | 'system';
  content: string;
}

export interface ChatCompletionResponse {
  message: ChatMessage;
}

/**
 * In a real implementation, this would use the actual API key
 * from a secure environment variable or other secure storage
 */
// Here we use the provided API key
const API_KEY = "gsk_QWQznljv598zSxc354yWGdyb3FYrnTiHtwVw6mzZOoRVJHRKD3X";

export const generateResponse = async (
  messages: ChatMessage[],
  category: string
): Promise<ChatCompletionResponse> => {
  // This is a mock implementation - in a real application with Supabase, you would 
  // store the API key securely in Supabase Edge Function Secrets
  // Example of how the real implementation might look:
  /*
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

  const data = await response.json();
  return data;
  */

  // For now, we'll just simulate a response with a delay
  return new Promise((resolve) => {
    setTimeout(() => {
      // Here we're mocking different responses based on the category
      let responseContent = '';
      const userMessage = messages[messages.length - 1].content.toLowerCase();
      
      if (category === 'Education') {
        if (userMessage.includes('school') || userMessage.includes('education')) {
          responseContent = `Based on your question about education law, here's what you should know:

1. Starting an educational institution typically requires:
   - State education department approval
   - Accreditation from recognized bodies
   - Compliance with building safety codes
   - Background checks for staff
   - Curriculum approval

2. The specific requirements vary by state and type of institution (K-12, higher education, vocational).

3. You'll need to establish a legal entity (nonprofit or for-profit) before applying for educational licenses.

4. For more detailed guidance specific to your location and school type, I recommend consulting with an education law specialist.`;
        } else {
          responseContent = `Thank you for your question about ${category} law. To provide you with the most accurate information, could you please provide more specific details about your educational institution or the particular regulation you're inquiring about?`;
        }
      } else if (category === 'Sports') {
        if (userMessage.includes('academy') || userMessage.includes('sports')) {
          responseContent = `Regarding your question about sports law:

1. Establishing a sports academy typically requires:
   - Business registration and licensing
   - Facility safety certifications
   - Insurance coverage (liability, accident, etc.)
   - Compliance with sports governing body regulations
   - Proper coaching certifications
   
2. You may also need to consider:
   - Youth protection policies
   - Waiver and consent forms
   - Anti-doping compliance for competitive training

I recommend consulting with a sports law attorney who specializes in athletic institution formation in your specific jurisdiction.`;
        } else {
          responseContent = `Thank you for your question about ${category} law. To provide you with the most accurate information, could you please provide more specific details about your sports-related inquiry?`;
        }
      } else if (category === 'Finance') {
        if (userMessage.includes('credit') || userMessage.includes('finance')) {
          responseContent = `Regarding your question about finance law and credit firms:

1. Credit firms typically require:
   - Registration with federal regulators (SEC, FINRA, etc.)
   - State-specific licenses for lending or credit services
   - Compliance with consumer protection laws (TILA, ECOA, FCRA)
   - Anti-money laundering programs
   - Data security protocols that comply with federal standards

2. The specific requirements vary by:
   - State jurisdiction
   - Types of credit products offered
   - Size of your operation

I recommend consulting with a financial services attorney who specializes in credit operations to develop a comprehensive compliance strategy.`;
        } else {
          responseContent = `Thank you for your question about ${category} law. To provide you with the most accurate information, could you please provide more specific details about your financial services inquiry?`;
        }
      } else {
        responseContent = `Thank you for your question about ${category}. To provide you with the most accurate information, could you please provide more specific details about your legal inquiry?`;
      }

      resolve({
        message: {
          role: 'assistant',
          content: responseContent
        }
      });
    }, 1500);
  });
};
