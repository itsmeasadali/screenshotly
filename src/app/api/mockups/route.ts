import { NextResponse } from 'next/server';
import { mockupTemplates } from '@/data/mockupTemplates';

export async function GET() {
  return NextResponse.json(mockupTemplates);
} 