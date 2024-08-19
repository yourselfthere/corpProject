import Link from "next/link";
import React from "react";

interface Props {
  title?: String;
  href?: String;
  linkCaption?: String;
}
const PageTittle = (props: Props) => {
  return (
    <div className="p-4 bg-gradient-to-br from-gray-200 via-gray-400 to-gray-300 flex justify-between">
      <h1>{props.title}</h1>
      {props.href!! && (
        <Link
          className="  hover:text-gray-200 transition-colors"
          href={props.href as string}
        >
          {props.linkCaption}
        </Link>
      )}
    </div>
  );
};

export default PageTittle;
