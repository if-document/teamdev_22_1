import { supabase } from "@/libs/supabase/client";
import { NextResponse } from "next/server";

export async function GET() {
  const { data, error } = await supabase.from("posts").select("*").order("created_at", { ascending: false });

  if (error || !data) {
    console.error("記事データの取得に失敗しました:", error);
    return NextResponse.json({ error: "記事データの取得に失敗しました" }, { status: 500 });
  }

  return NextResponse.json(data);
}
