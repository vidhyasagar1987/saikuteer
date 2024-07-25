// import { supabase } from './supabaseClient';
// import { createClient } from "@/utils/supabase/server";

import { supabase } from "@/utils/supabase/client";

export const UploadImage = async (file) => {
  const fileExt = file.name.split(".").pop();
  const fileName = `${Date.now()}.${fileExt}`;
  const filePath = `${fileName}`;

  let { error } = await supabase.storage
    .from("SaiKuteer")
    .upload(filePath, file);

  if (error) {
    throw error;
  }

  const {
    data: { publicUrl },
  } = supabase.storage.from("SaiKuteer").getPublicUrl(filePath);

  if (!publicUrl) {
    throw new Error("Error retrieving public URL");
  }

  return publicUrl;
};

export const RemoveImage = async (filePath) => {
  const { error } = await supabase.storage.from("SaiKuteer").remove([filePath]);

  if (error) {
    throw error;
  }
};
