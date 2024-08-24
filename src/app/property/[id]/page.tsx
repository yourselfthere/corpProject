import { ImagesSlider } from "@/app/components/ImageSlider";
import PageTittle from "@/app/components/pageTittle";
import prisma from "@/lib/prisma";
import { Card } from "@nextui-org/react";
import { notFound } from "next/navigation";
// import { useRouter } from "next/router";
import React, { useEffect, useState } from "react";

interface Props {
  params: {
    id: string;
  };
}

const PropertyPage = async ({ params }: Props) => {
  const property = await prisma.property.findUnique({
    where: {
      id: +params.id,
    },
    include: {
      status: true,
      feature: true,
      location: true,
      contact: true,
      images: true,
    },
  });
  // const router = useRouter();
  // router.replace(router.asPath);
  // useEffect(() => {
  //   // Reload the page only at the start (when the component mounts)
  //   if (typeof window !== "undefined") {
  //     window.location.reload();
  //   }
  // }, []);
  // const [gardenChecked, setGardenChecked] = useState(
  //   property?.feature?.hasGardenYard || false
  // );
  // const [swimmingPoolChecked, setSwimmingPoolChecked] = useState(
  //   property?.feature?.hasSwimmingPool || false
  // );
  // const [balconyChecked, setBalconyChecked] = useState(
  //   property?.feature?.hasBalcony || false
  // );
  // window.location.reload();
  if (!property) return notFound();
  return (
    <div>
      <PageTittle
        title="Property Page"
        href="/user/properties"
        linkCaption="Back To Properties"
      />

      <div className="p-4">
        <h2 className="text-2xl font-bold text-primary my-5">
          {property.name}
        </h2>
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-10">
          <div className="col-span-2">
            <ImagesSlider
              images={property.images.map((img) => img.url)}
              children={undefined}
            />
            <h2 className="text-2xl font-bold text-gray-700 mt-7">
              ${property.price}/{property.status.value}
            </h2>
            <p className="text-sm text-slate-600 mt-7">
              {property.description}
            </p>
          </div>
          <Card className="p-5 flex flex-col gap-1">
            <Title title="Features" />
            <Attribute label="Bedrooms" value={property.feature?.bedrooms} />
            <Attribute label="Bathrooms" value={property.feature?.bathrooms} />
            <Attribute
              label="Parking Spots"
              value={property.feature?.parkingSpots}
            />
            <Attribute label="Area" value={property.feature?.area} />
            <Attribute
              label="garden "
              value={
                // property.feature?.hasGardenYard !== undefined
                //   ? property.feature.hasGardenYard
                //     ? "Yes"
                //     : "No"
                //   : undefined
                property.feature?.hasGardenYard ? "Yes" : "No"
              }
              // label="Garden"
              // value={gardenChecked ? "Yes" : "No"}
            />
            <Attribute
              label="swimming pool "
              value={
                property.feature?.hasSwimmingPool !== undefined
                  ? property.feature.hasSwimmingPool
                    ? "Yes"
                    : "No"
                  : undefined
              }
            />
            <Attribute
              label="Balcony "
              value={
                property.feature?.hasBalcony !== undefined
                  ? property.feature.hasBalcony
                    ? "Yes"
                    : "No"
                  : undefined
              }
            />

            <Title title="Address" className="mt-7" />
            <Attribute label="City" value={property.location?.city} />
            <Attribute label="Landmarks" value={property.location?.landmark} />
            <Attribute label="Zip Code" value={property.location?.zip} />
            <Attribute
              label="Address"
              value={property.location?.streetAddress}
            />

            <Title title="Owner Details" className="mt-7" />
            <Attribute label="Owner Name" value={property.contact?.name} />
            <Attribute label="Email" value={property.contact?.email} />
            <Attribute label="Phone" value={property.contact?.phone} />
          </Card>
        </div>
      </div>
    </div>
  );
};

export default PropertyPage;

const Title = ({ title, className }: { title: string; className?: string }) => (
  <div className={className}>
    {/* how can you style a component you can see it here in above line of code */}
    <h2 className="text-xl font-bold text-slate-700">{title} </h2>
    <hr className="boreder border-solid border-slate-300" />
  </div>
);

const Attribute = ({
  label,
  value,
}: {
  label: string;
  value?: string | number;
}) => (
  <div className="flex justify-between">
    <span className="text-sm text-slate-600">{label}</span>
    <span className="text-sm text-slate-600">{value}</span>
  </div>
);
