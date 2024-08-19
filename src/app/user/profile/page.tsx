import PageTittle from "@/app/components/pageTittle";
import { getUserById } from "@/lib/actions/user";
import { getKindeServerSession } from "@kinde-oss/kinde-auth-nextjs/server";
import { Avatar, Card } from "@nextui-org/react";
import React, { ReactNode } from "react";
import SectionTitle from "./_components/sectionTitle";
import UploadAvatar from "./_components/UploadAvatar";

const ProfilePage = async () => {
  const { getUser } = await getKindeServerSession();
  const user = await getUser();
  const dbUser = await getUserById(user ? user.id : "");
  return (
    <div>
      <PageTittle title="My Profile" linkCaption="Back to Home Page" href="/" />
      <Card className="m-4 p-4">
        <SectionTitle title="Basic Information" />
        <div className="flex">
          <div className="flex flex-col items-center ">
            {" "}
            <Avatar
              className="w-20 h-20"
              src={dbUser?.avatarUrl ?? "/images/profile.png"}
            />
            <UploadAvatar userId={dbUser?.id!} />
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3">
          {" "}
          <Attribute
            title="Name"
            value={`${dbUser?.firstName} ${dbUser?.lastName}`}
          />
          <Attribute title="Email" value={`${dbUser?.email}`} />
          <Attribute
            title="Registered On"
            value={`${dbUser?.createdAt.toLocaleDateString()}`}
          />
          <Attribute title="Properties Posted" value={`${1}`} />
        </div>
      </Card>
    </div>
  );
};

export default ProfilePage;

const Attribute = ({ title, value }: { title: string; value: ReactNode }) => (
  <div className="flex flex-col text-sm">
    <span className="text-slate-800 font-semibold">{title}</span>
    <span className="text-slate-600">{value}</span>
  </div>
);
