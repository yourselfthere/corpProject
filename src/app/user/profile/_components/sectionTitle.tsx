import React from "react";

interface Props {
  title: string;
}

const SectionTitle = (props: Props) => {
  return (
    <div>
      <h1>{props.title}</h1>
      <hr className="border-gray-700 my-2 border-solid" />
    </div>
  );
};

export default SectionTitle;
