import { NextResponse } from 'next/server'

export async function POST(req: Request){
  try{
    const data = await req.formData()
    // Simulate processing: log to server
    console.log('Contact request:', Object.fromEntries(data.entries()))
    return NextResponse.json({ ok: true })
  }catch(err){
    return NextResponse.json({ ok: false }, { status: 500 })
  }
}
