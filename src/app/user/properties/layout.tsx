import { Button } from "@nextui-org/react";
import Link from "next/link";
import React, { ReactNode } from "react";

interface Props {
  children: ReactNode;
}

const PropertiesLayout = ({ children }: Props) => {
  return (
    <div>
      <div className="flex justify-between items-center p-2  bg-gradient-to-br from-gray-200 via-gray-400 to-gray-300 ">
        <h2 className=" text-xl font-semibold px-2">User Properties</h2>
        <Button className="px-4 py-2 text-white bg-gradient-to-r from-blue-500 to-indigo-500 rounded-lg shadow-lg hover:from-blue-600 hover:to-indigo-600 transform hover:scale-105 transition-transform duration-300">
          <Link href="/user/properties/add">Add Property</Link>
        </Button>
      </div>
      {children}
    </div>
  );
};

export default PropertiesLayout;
