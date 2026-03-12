"use server";

import { prisma } from "@/lib/prisma";

export async function getSuccessStories() {
  return prisma.successStory.findMany({
    orderBy: { createdAt: "desc" },
  });
}
