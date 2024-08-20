import React from "react";
import AddPropertyForm from "./_components/AddPropertyForm";
import prisma from "@/lib/prisma";

const AddPropertyPage = async () => {
  const [propertyTypes, PropertyStatuses] = await Promise.all([
    prisma.propertyType.findMany(),
    prisma.propertyStatus.findMany(),
  ]);
  return (
    <div>
      <AddPropertyForm types={propertyTypes} statuses={PropertyStatuses} />
    </div>
  );
};

export default AddPropertyPage;
