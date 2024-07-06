import { supabase } from "@/utils/supabase/client";
import Image from "next/image";
import React from "react";
import { revalidatePath } from "next/cache";

async function getData(value) {
  const res = await supabase.from("listing").select().eq("id", value);
  const response = await res?.data[0];
  revalidatePath(`/listings/${value}`);

  return response;
}

export async function generateMetadata({ params }) {
  const { id } = params;
  const response = await getData(id);

  return {
    title: response?.propertyName,
    description: response?.description?.substring(0, 30)
  };
}

export default async function Page({ params }) {
  const { id } = params;

  const response = await getData(id);
  console.log(response);

  return (
    <div className=" px-10 md:px-36 my-10">
      <div className=" rounded-lg shadow-md">
        <Image
          src={"/1.jpg"}
          alt={response?.propertyName}
          width={1920}
          height={1280}
          className="rounded-lg object-cover h-[400px] shadow-lg "
        />
        <div className=" p-8">
          <h2 className=" font-bold text-2xl pb-5">
            {response?.propertyName} :
          </h2>
        </div>
      </div>
    </div>
  );
}
