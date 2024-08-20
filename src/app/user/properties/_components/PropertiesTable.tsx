"use client";
import { EyeIcon, PencilIcon, TrashIcon } from "@heroicons/react/16/solid";
import {
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
type Props = {
  properties: Prisma.PropertyGetPayload<{
    include: {
      type: true;
      status: true;
    };
  }>[];
};
const PropertiesTable = ({ properties }: Props) => {
  return (
    <div>
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
            <TableRow>
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
    </div>
  );
};

export default PropertiesTable;
