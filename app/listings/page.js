import { supabase } from "@/utils/supabase/client";
import { MapPin } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { revalidatePath } from "next/cache";

export default async function Listings() {
  let { data: listing, error } = await supabase.from("listing").select("*");
  revalidatePath("/listings");

  return (
    <div>
      <h2 className=" font-bold text-2xl pb-5">All Listings:</h2>
      <div className=" grid grid-cols-1 md:grid-cols-3 gap-5">
        {listing?.length > 0
          ? listing?.map((item) => (
              <div key={item.id} className="relative  bg-slate-200 rounded-md">
                <Link href={`/listings/${item.id}`}>
                  <div className="relative group">
                    <Image
                      src={"/1.jpg"}
                      alt={item.propertyName}
                      width={800}
                      height={150}
                      className="rounded-lg opacity-90 object-cover h-[150px] transition-shadow  duration-300 ease-in-out group-hover:shadow-lg group-hover:opacity-100"
                    />
                  </div>
                </Link>
                <div className="flex flex-col mt-2 gap-2 px-4 py-4">
                  <Link href={`/listings/${item.id}`}>
                    <h2 className="font-bold text-md capitalize hover:text-primary ">
                      {item.propertyName}
                    </h2>
                  </Link>
                  <div className="flex mt-1 justify-between">
                    <h2 className="flex gap-1 text-sm text-gray-700 capitalize items-center ">
                      <MapPin className="h-3 w-3" />
                      <div>{item.address}</div>
                    </h2>
                    <div className="font-bold text-md">
                      ₹ {Number(item.price).toFixed(2)}
                    </div>
                  </div>
                </div>
                {item.category && (
                  <div
                    className={`absolute top-2 left-2 px-2 py-1 text-xs font-bold text-white rounded ${
                      item.category === "for_sale"
                        ? "bg-red-500"
                        : "bg-blue-500"
                    }`}
                  >
                    {item.category === "for_sale" ? "For Sale" : "For Rent"}
                  </div>
                )}
              </div>
            ))
          : "No Data Found"}
      </div>
    </div>
  );
}
