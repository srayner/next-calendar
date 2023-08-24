import prisma from "@/src/prisma";
import { NextResponse, NextRequest } from "next/server";
import { Prisma } from "@prisma/client";

export async function GET(request: Request) {
  const events = await prisma.events.findMany();

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
