import OpenAI from 'openai';

// Initialize OpenAI client (server-side only)
const openai = process.env.OPENAI_API_KEY ? new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
}) : null;

// Event recommendation function
export async function getEventRecommendations(userPreferences: string) {
  if (!process.env.OPENAI_API_KEY || !openai) {
    return "AI features are not configured. Please add your OpenAI API key to continue.";
  }
  
  try {
    const completion = await openai.chat.completions.create({
      model: "gpt-3.5-turbo",
      messages: [
        {
          role: "system",
          content: "You are an AI assistant for EZTicket, a Sri Lankan event management platform. Provide personalized event recommendations based on user preferences."
        },
        {
          role: "user",
          content: `Based on these preferences: ${userPreferences}, suggest 5 events in Sri Lanka that would interest this user. Include event type, location, and why it matches their preferences.`
        }
      ],
      max_tokens: 500,
    });

    return completion.choices[0].message.content;
  } catch (error) {
    console.error('AI recommendation error:', error);
    return null;
  }
}

// Event description generator
export async function generateEventDescription(eventDetails: {
  title: string;
  type: string;
  location: string;
  date: string;
  organizer: string;
}) {
  if (!process.env.OPENAI_API_KEY || !openai) {
    return "AI features are not configured. Please add your OpenAI API key to continue.";
  }
  
  try {
    const completion = await openai.chat.completions.create({
      model: "gpt-3.5-turbo",
      messages: [
        {
          role: "system",
          content: "You are an expert event copywriter. Create engaging, SEO-friendly event descriptions for Sri Lankan events."
        },
        {
          role: "user",
          content: `Generate a compelling event description for: ${eventDetails.title} - ${eventDetails.type} event in ${eventDetails.location} on ${eventDetails.date} by ${eventDetails.organizer}. Make it exciting and include relevant details about the event type.`
        }
      ],
      max_tokens: 300,
    });

    return completion.choices[0].message.content;
  } catch (error) {
    console.error('AI description generation error:', error);
    return null;
  }
}

// Customer support chatbot
export async function getCustomerSupportResponse(userMessage: string) {
  if (!process.env.OPENAI_API_KEY || !openai) {
    return "AI features are not configured. Please add your OpenAI API key to continue.";
  }
  
  try {
    const completion = await openai.chat.completions.create({
      model: "gpt-3.5-turbo",
      messages: [
        {
          role: "system",
          content: "You are a helpful customer support agent for EZTicket. Help users with ticket purchases, event information, and general inquiries. Be friendly and provide accurate information about events in Sri Lanka."
        },
        {
          role: "user",
          content: userMessage
        }
      ],
      max_tokens: 200,
    });

    return completion.choices[0].message.content;
  } catch (error) {
    console.error('AI support error:', error);
    return "I'm sorry, I'm having trouble connecting right now. Please try again later or contact our support team.";
  }
}

// Pricing optimization suggestion
export async function getPricingSuggestion(eventData: {
  eventType: string;
  location: string;
  expectedAttendance: number;
  similarEvents: Array<{ price: number; attendance: number }>;
}) {
  if (!process.env.OPENAI_API_KEY || !openai) {
    return "AI features are not configured. Please add your OpenAI API key to continue.";
  }
  
  try {
    const completion = await openai.chat.completions.create({
      model: "gpt-3.5-turbo",
      messages: [
        {
          role: "system",
          content: "You are a pricing expert for events in Sri Lanka. Analyze market data and suggest optimal pricing strategies."
        },
        {
          role: "user",
          content: `Analyze this event data and suggest pricing: Event type: ${eventData.eventType}, Location: ${eventData.location}, Expected attendance: ${eventData.expectedAttendance}, Similar events pricing: ${JSON.stringify(eventData.similarEvents)}. Suggest a price range in LKR.`
        }
      ],
      max_tokens: 150,
    });

    return completion.choices[0].message.content;
  } catch (error) {
    console.error('AI pricing error:', error);
    return null;
  }
} 