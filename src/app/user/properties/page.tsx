import prisma from "@/lib/prisma";
import { getKindeServerSession } from "@kinde-oss/kinde-auth-nextjs/server";
import React from "react";
import PropertiesTable from "./_components/PropertiesTable";

const PropertiesPage = async () => {
  const { getUser } = await getKindeServerSession();
  const user = await getUser();
  const propertiesPromise = prisma.property.findMany({
    where: {
      userId: user?.id,
    },
    include: {
      type: true,
      status: true,
    },
  });
  const [properties] = await Promise.all([propertiesPromise]);

  console.log({ properties });

  return <PropertiesTable properties={properties} />;
};

export default PropertiesPage;
