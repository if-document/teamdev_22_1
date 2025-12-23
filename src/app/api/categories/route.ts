import { NextResponse } from "next/server";
import { createClient } from "@/libs/supabase/server";

export async function GET() {
  try {
    const supabase = await createClient();

    const { data, error } = await supabase.from("categories").select("*").order("id", { ascending: true });

    if (error) {
      console.error(error);
      return NextResponse.json(
        {
          message: "カテゴリー取得に失敗しました",
          error: error.message,
        },
        { status: 500 },
      );
    }

    return NextResponse.json(data, { status: 200 });
  } catch (e) {
    console.error(e);
    return NextResponse.json({ message: "サーバーエラーが発生しました" }, { status: 500 });
  }
}
