import { NextResponse } from 'next/server'
import { generateWrappedData } from '@/lib/generateWrappedData'

export async function GET(request: Request) {
  try {
    const { searchParams } = new URL(request.url)
    const accountId = searchParams.get('accountId') || '69753cca95150878eafea27b'
    
    const data = await generateWrappedData(accountId)
    
    return NextResponse.json(data)
  } catch (error: any) {
    console.error('Error generating wrapped data:', error)
    return NextResponse.json(
      { error: error.message || 'Failed to generate wrapped data' },
      { status: 500 }
    )
  }
}
