# 🤖 AI Features Setup Guide

## Overview
EZTicket includes several AI-powered features to enhance the user experience:

### 🎯 **AI Features Included:**
1. **Smart Event Recommendations** - Personalized event suggestions
2. **AI Customer Support Chatbot** - 24/7 customer assistance
3. **Event Description Generator** - Auto-generate compelling event descriptions
4. **Pricing Optimization** - AI-powered pricing suggestions

## 🚀 **Setup Instructions:**

### **1. Get OpenAI API Key**
1. Visit [OpenAI Platform](https://platform.openai.com/api-keys)
2. Create an account or sign in
3. Generate a new API key
4. Copy the API key

### **2. Configure Environment Variables**
Create a `.env.local` file in the root directory:

```bash
# OpenAI API Configuration
OPENAI_API_KEY=your_openai_api_key_here
```

### **3. Install Dependencies**
```bash
npm install openai
```

### **4. Test AI Features**
1. Start the development server: `npm run dev`
2. Visit the landing page to see the AI chatbot
3. Visit `/ai-features` to test event recommendations

## 🎪 **Available AI Components:**

### **AIChatbot Component**
- **Location**: `src/app/components/AIChatbot.tsx`
- **Features**: Customer support, ticket inquiries, event information
- **Usage**: Automatically appears on landing page

### **AIRecommendations Component**
- **Location**: `src/app/components/AIRecommendations.tsx`
- **Features**: Personalized event suggestions based on user preferences
- **Usage**: Available at `/ai-features` route

### **AI Utility Functions**
- **Location**: `src/lib/ai.ts`
- **Functions**:
  - `getEventRecommendations()` - Smart event suggestions
  - `getCustomerSupportResponse()` - Chatbot responses
  - `generateEventDescription()` - Auto event descriptions
  - `getPricingSuggestion()` - Pricing optimization

## 🔧 **API Routes**
- **Location**: `src/app/api/ai/route.ts`
- **Endpoint**: `/api/ai`
- **Methods**: POST
- **Request Types**:
  - `recommendations` - Get event recommendations
  - `support` - Get customer support responses
  - `description` - Generate event descriptions

## 💡 **Usage Examples:**

### **Event Recommendations**
```typescript
const response = await fetch('/api/ai', {
  method: 'POST',
  headers: { 'Content-Type': 'application/json' },
  body: JSON.stringify({
    type: 'recommendations',
    data: { preferences: 'I love music concerts in Colombo' }
  })
});
```

### **Customer Support**
```typescript
const response = await fetch('/api/ai', {
  method: 'POST',
  headers: { 'Content-Type': 'application/json' },
  body: JSON.stringify({
    type: 'support',
    data: { message: 'How do I book tickets?' }
  })
});
```

## 🔒 **Security Notes:**
- Never commit your API key to version control
- Use environment variables for all sensitive data
- Consider rate limiting for production use
- Monitor API usage and costs

## 🎯 **Next Steps:**
1. Add your OpenAI API key to `.env.local`
2. Test the AI features locally
3. Deploy with proper environment variables
4. Monitor and optimize AI responses

## 📞 **Support:**
For issues with AI features, check:
- OpenAI API key validity
- Network connectivity
- API rate limits
- Environment variable configuration 