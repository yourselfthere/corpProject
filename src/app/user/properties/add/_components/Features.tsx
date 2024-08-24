import { ChevronLeftIcon, ChevronRightIcon } from "@heroicons/react/16/solid";
import { Button, Card, Checkbox, Input, cn } from "@nextui-org/react";
import React, { useEffect } from "react";
import { Controller, useFormContext } from "react-hook-form";
import { AddPropertyInputType } from "./AddPropertyForm";
import { redirect } from "next/dist/server/api-utils";
import revalidate from "next";
interface Props {
  next: () => void;
  prev: () => void;
  className?: string;
}
const Features = (props: Props) => {
  const {
    register,
    formState: { errors },
    control,
    trigger,
    getValues,
    setValue,
  } = useFormContext<AddPropertyInputType>();
  const handleNext = async () => {
    if (
      await trigger([
        "propertyFeature.area",
        "propertyFeature.bathrooms",
        "propertyFeature.bedrooms",
        "propertyFeature.parkingSpots",
      ])
    )
      props.next();
  };

  // console.log(getValues().propertyFeature.hasBalcony);
  // useEffect(() => {
  //   // This code will run only once when the component mounts
  //   console.log("Component has been mounted");
  //   revalidate;
  //   // Optional cleanup function
  //   return () => {
  //     console.log("Component will unmount");
  //   };
  // }, []); // Empty de

  return (
    <Card
      className={cn(
        "p-2  grid grid-cols-1 md:grid-cols-2 gap-3",
        props.className
      )}
    >
      <Input
        // {...register("propertyFeature.bedrooms")}
        {...register("propertyFeature.bedrooms", {
          setValueAs: (v: any) => v.toString(),
        })}
        errorMessage={errors.propertyFeature?.bedrooms?.message}
        isInvalid={!!errors.propertyFeature?.bedrooms}
        label="Bedrooms"
        // defaultValue={getValues().propertyFeature.bedrooms?.toString() ?? " "}
        defaultValue={getValues().propertyFeature?.bedrooms?.toString()}
      />

      <Input
        // {...register("propertyFeature.bathrooms")}

        {...register("propertyFeature.bathrooms", {
          setValueAs: (v: any) => v.toString(),
        })}
        errorMessage={errors.propertyFeature?.bathrooms?.message}
        isInvalid={!!errors.propertyFeature?.bathrooms}
        label="Bathrooms"
        defaultValue={getValues().propertyFeature?.bathrooms?.toString()}
      />
      <Input
        // {...register("propertyFeature.parkingSpots")}
        {...register("propertyFeature.parkingSpots", {
          setValueAs: (v: any) => v.toString(),
        })}
        errorMessage={errors.propertyFeature?.parkingSpots?.message}
        isInvalid={!!errors.propertyFeature?.parkingSpots}
        label="Parking Spots"
        defaultValue={getValues().propertyFeature?.parkingSpots?.toString()}
      />

      <Input
        // {...register("propertyFeature.area")}
        {...register("propertyFeature.area", {
          setValueAs: (v: any) => v.toString(),
        })}
        errorMessage={errors.propertyFeature?.area?.message}
        isInvalid={!!errors.propertyFeature?.area}
        label="Area"
        defaultValue={getValues().propertyFeature?.area?.toString()}
      />
      <div className="flex items-center justify-between ">
        <Controller
          control={control}
          name="propertyFeature.hasSwimmingPool"
          render={({ field }) => (
            <Checkbox
              // window.location.reload();
              defaultChecked={false}
              // checked={field.value || false}
              onChange={(e) => field.onChange(e.target.checked)}
              onBlur={field.onBlur}
              // defaultValue={
              //   getValues().propertyFeature?.hasSwimmingPool ? "true" : "false"
              // }
            >
              Has Swimming Pool
            </Checkbox>
          )}
        />

        <Controller
          control={control}
          name="propertyFeature.hasGardenYard"
          render={({ field }) => (
            <Checkbox
              // checked={field.value || false}
              defaultChecked={false}
              onChange={field.onChange}
              onBlur={field.onBlur}
              defaultValue={
                getValues().propertyFeature?.hasGardenYard ? "true" : "false"
              }
            >
              Has Gard/Yard
            </Checkbox>
          )}
        />

        <Controller
          control={control}
          name="propertyFeature.hasBalcony"
          render={({ field }) => (
            <Checkbox
              defaultChecked={false}
              onChange={field.onChange}
              onBlur={field.onBlur}
              defaultValue={
                getValues().propertyFeature?.hasBalcony ? "true" : "false"
              }
            >
              Has Balcony/Patio
            </Checkbox>
          )}
        />
      </div>
      <div className="flex justify-center col-span-2 gap-3">
        <Button
          onClick={props.prev}
          startContent={<ChevronLeftIcon className="w-6" />}
          color="primary"
          className="w-36"
        >
          Previous
        </Button>
        <Button
          onClick={handleNext}
          endContent={<ChevronRightIcon className="w-6" />}
          color="primary"
          className="w-36"
        >
          Next
        </Button>
      </div>
    </Card>
  );
};

export default Features;
