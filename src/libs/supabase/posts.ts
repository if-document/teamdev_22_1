import { supabase } from "./client";

export const getAllPosts = async () => {
  const { data, error } = await supabase.from("posts").select("*").order("created_at", { ascending: false });

  if (error) {
    console.error("Failed to fetch posts:", error);
    return [];
  }
  return data;
};
