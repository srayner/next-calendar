-- CreateEnum
CREATE TYPE "EventType" AS ENUM ('EVENT', 'TASK');

-- CreateTable
CREATE TABLE "Events" (
    "id" TEXT NOT NULL,
    "type" "EventType" NOT NULL,
    "name" TEXT,
    "start" TIMESTAMP(3) NOT NULL,
    "end" TIMESTAMP(3) NOT NULL,
    "colour" TEXT NOT NULL,

    CONSTRAINT "Events_pkey" PRIMARY KEY ("id")
);
