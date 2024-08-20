// "use client";

// import React, { useState } from "react";
// import Stepper from "./Stepper";
// import Basic from "./basic";
// import { Prisma, Property, PropertyStatus, PropertyType } from "@prisma/client";
// import { cn } from "@nextui-org/react";
// import { AddPropertyFormSchema } from "@/lib/zodSchema";
// import { z } from "zod";
// import Location from "./Location";
// import Features from "./Features";

"use client";
import React, { useState } from "react";
import Stepper from "./Stepper";
import Basic from "./basic";
import { Prisma, Property, PropertyStatus, PropertyType } from "@prisma/client";
import { cn } from "@nextui-org/react";
import Location from "./Location";
import Features from "./Features";
// import Picture from "./Picture";
// import Contact from "./Contact";
import { FormProvider, SubmitHandler, useForm } from "react-hook-form";
import { date, z } from "zod";
import { AddPropertyFormSchema } from "@/lib/zodSchema";
import { zodResolver } from "@hookform/resolvers/zod";
// import { uploadImages } from "@/lib/upload";
// import { editProperty, saveProperty } from "@/lib/actions/property";
import { useKindeBrowserClient } from "@kinde-oss/kinde-auth-nextjs";
import { redirect, useRouter } from "next/navigation";
// import { toast } from "react-toastify";

const steps = [
  {
    label: "Basic",
  },
  {
    label: "Location",
  },
  {
    label: "Features",
  },
  {
    label: "Pictures",
  },
  {
    label: "Contact",
  },
];

interface Props {
  types: PropertyType[];
  statuses: PropertyStatus[];
}

export type AddPropertyInputType = z.infer<typeof AddPropertyFormSchema>;

const AddPropertyForm = (props: Props) => {
  const [step, setStep] = useState(0);

  return (
    <div>
      <Stepper items={steps} activeItem={step} setActiveItem={setStep} />
      <form className="mt-3 p-2">
        <Basic
          className={cn({ hidden: step != 0 })}
          next={() => setStep((prev) => prev + 1)}
          types={props.types}
          statuses={props.statuses}
        />
        <Location
          next={() => setStep((prev) => prev + 1)}
          prev={() => setStep((prev) => prev - 1)}
          className={cn({ hidden: step !== 1 })}
        />
        <Features
          next={() => setStep((prev) => prev + 1)}
          prev={() => setStep((prev) => prev - 1)}
          className={cn({ hidden: step !== 2 })}
        />
      </form>
    </div>
  );
};

export default AddPropertyForm;
