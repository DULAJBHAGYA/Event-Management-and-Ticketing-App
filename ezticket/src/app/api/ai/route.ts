import { NextRequest, NextResponse } from 'next/server';
import { getEventRecommendations, getCustomerSupportResponse, generateEventDescription } from '@/lib/ai';

export async function POST(request: NextRequest) {
  try {
    const { type, data } = await request.json();

    switch (type) {
      case 'recommendations':
        const recommendations = await getEventRecommendations(data.preferences);
        return NextResponse.json({ success: true, data: recommendations });

      case 'support':
        const supportResponse = await getCustomerSupportResponse(data.message);
        return NextResponse.json({ success: true, data: supportResponse });

      case 'description':
        const description = await generateEventDescription(data.eventDetails);
        return NextResponse.json({ success: true, data: description });

      default:
        return NextResponse.json(
          { success: false, error: 'Invalid request type' },
          { status: 400 }
        );
    }
  } catch (error) {
    console.error('AI API error:', error);
    return NextResponse.json(
      { success: false, error: 'Internal server error' },
      { status: 500 }
    );
  }
} 