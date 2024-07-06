import AdminListing from "@/components/Admin/AdminListing";
import { createClient } from "@/utils/supabase/server";
import { redirect } from "next/navigation";

import React from "react";

const page = async () => {
  const supabase = await createClient();

  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) {
    return redirect("/login");
  }

  return <AdminListing />;
};

export default page;
