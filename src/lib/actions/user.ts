"use server";

import prisma from "../prisma";

export async function getUserById(id: string) {
  return await prisma.user.findUnique({
    where: {
      id,
    },
  });
}

//function for particularly updating the avatarUrl
export async function updateUserAvatar(avatarUrl: string, userId: string) {
  return await prisma.user.update({
    where: {
      id: userId,
    },
    data: {
      avatarUrl: avatarUrl,
    },
  });
}
