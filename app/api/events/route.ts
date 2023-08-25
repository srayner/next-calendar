import prisma from "@/src/prisma";
import { NextResponse, NextRequest } from "next/server";

export async function GET(request: NextRequest) {
  const searchParams = request.nextUrl.searchParams;
  const start = searchParams.get("start") as string;
  const end = searchParams.get("end") as string;

  const events = await prisma.events.findMany({
    where: {
      end: { gt: start },
      start: { lt: end },
    },
  });

  return NextResponse.json(events);
}

export async function POST(request: NextRequest) {
  const data = await request.json();
  const createdEvent = await prisma.events.create({ data: data });

  return NextResponse.json(createdEvent, { status: 200 });
}

export async function DELETE(request: NextRequest) {
  const data = await request.json();
  const deletedEvent = await prisma.events.deleteMany({
    where: {
      id: data.id,
    },
  });

  return NextResponse.json(deletedEvent, { status: 200 });
}
