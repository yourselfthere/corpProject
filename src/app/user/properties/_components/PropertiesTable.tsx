"use client";
import { EyeIcon, PencilIcon, TrashIcon } from "@heroicons/react/16/solid";
import {
  Pagination,
  Table,
  TableBody,
  TableCell,
  TableColumn,
  TableHeader,
  TableRow,
  Tooltip,
} from "@nextui-org/react";
import { Prisma, Property } from "@prisma/client";
import Link from "next/link";
import React from "react";
import { useRouter } from "next/navigation";
import router from "next/router";
// import router from "next/router";
type Props = {
  properties: Prisma.PropertyGetPayload<{
    include: {
      type: true;
      status: true;
    };
  }>[];
  totalPages: number;
  currentPage: number;
};

const PropertiesTable = ({ properties, totalPages, currentPage }: Props) => {
  const router = useRouter();

  // const handleNavigate = (url: string) => {
  //   // Refresh the page
  //   window.location.reload();

  //   // Navigate after a slight delay to ensure the page is refreshed
  //   setTimeout(() => {
  //     router.push(url);
  //   }, 100); // Adjust the delay if needed
  // };

  return (
    <div className="flex flex-col items-center gap-4">
      <Table>
        <TableHeader>
          <TableColumn>NAME</TableColumn>
          <TableColumn>PRICE</TableColumn>
          <TableColumn>TYPE</TableColumn>
          <TableColumn>STATUS</TableColumn>
          <TableColumn>ACTIONS</TableColumn>
        </TableHeader>
        <TableBody>
          {properties.map((item) => (
            <TableRow key={item.id}>
              <TableCell>{item.name}</TableCell>
              <TableCell>{item.price}</TableCell>
              <TableCell>{item.type.value}</TableCell>
              <TableCell>{item.status.value}</TableCell>
              <TableCell>
                <div className="flex items-center gap-4">
                  <Tooltip content="Details">
                    <Link href={`/property/${item.id}`}>
                      <EyeIcon className="w-5 text-slate-500" />
                    </Link>
                  </Tooltip>
                  <Tooltip content="Edit Property" color="warning">
                    <Link href={`/user/properties/${item.id}/edit`}>
                      <PencilIcon className="w-5 text-yellow-500" />
                    </Link>
                  </Tooltip>
                  <Tooltip content="Delete Property" color="danger">
                    <Link href={`/user/properties/${item.id}/delete`}>
                      <TrashIcon className="w-5 text-red-500" />
                    </Link>
                  </Tooltip>
                </div>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
      <Pagination
        total={totalPages}
        initialPage={1}
        page={currentPage}
        onChange={(page) => router.push(`/user/properties?pagenum=${page}`)}
      />
    </div>
  );
};

export default PropertiesTable;

// type Props2 = {
//   properties: Prisma.PropertyGetPayload<{
//     include: {
//       type: true;
//       status: true;
//     };
//   }>[];
//   totalPages: number;
//   currentPage: number;
// };
