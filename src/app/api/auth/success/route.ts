import prisma from "@/lib/prisma";
import { getKindeServerSession } from "@kinde-oss/kinde-auth-nextjs/server";
import { NextResponse } from "next/server";

export async function GET() {
  try {
    const { getUser } = await getKindeServerSession();
    const user = await getUser();

    if (!user || user === null || !user.id)
      throw new Error("Something went wrong with authentication" + user);

    const dbUser = await prisma.user.findUnique({
      where: {
        id: user.id,
      },
    });

    if (!dbUser) {
      await prisma.user.create({
        data: {
          id: user.id,
          firstName: user.given_name ?? "",
          lastName: user.family_name ?? "",
          email: user.email ?? "",
        },
      });
    }
    return NextResponse.redirect("http://localhost:3000/");
    // return NextResponse.json({ success: true, user: dbUser });
  } catch (error) {
    console.error("Error in GET /api/auth/success:", error);
    const errorMessage =
      error instanceof Error ? error.message : "Unknown error occurred";

    return NextResponse.json({ success: false, message: errorMessage });
  }
}
