import {
  getKindeServerSession,
  LoginLink,
  LogoutLink,
  RegisterLink,
} from "@kinde-oss/kinde-auth-nextjs/server";
import { Button } from "@nextui-org/react";

import React from "react";
import UserProfilePanel from "./UserProfilePanel";
import prisma from "@/lib/prisma";

const signInPanel = async () => {
  const { isAuthenticated, getUser } = await getKindeServerSession();
  const user = await getUser();
  if (await isAuthenticated()) {
    const dbUser = await prisma.user.findUnique({
      where: {
        id: user?.id,
      },
    });
    return <>{dbUser!! && <UserProfilePanel user={dbUser} />}</>;
  }
  // if (await isAuthenticated())
  //   return (
  //     <div>
  //       {user?.given_name}
  //       <LogoutLink>Log Out</LogoutLink>
  //     </div>
  //   );

  return (
    <div className="flex gap-3">
      <Button color="primary">
        <LoginLink>Sign In</LoginLink>
      </Button>
      <Button>
        <RegisterLink>Sign Up</RegisterLink>
      </Button>
    </div>
  );
};

export default signInPanel;
