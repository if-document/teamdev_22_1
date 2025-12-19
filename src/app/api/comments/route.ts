import { NextResponse, NextRequest } from "next/server";
import { createClient } from "@/libs/supabase/server";

export async function GET(req: NextRequest) {
  try {
    const supabase = await createClient();

    const { searchParams } = new URL(req.url);
    const postIdRaw = searchParams.get("post_id");
    const postId = postIdRaw ? Number(postIdRaw) : NaN;

    if (Number.isNaN(postId)) {
      return NextResponse.json({ message: "post_id は必須です" }, { status: 400 });
    }

    const { data, error, status } = await supabase
      .from("comments")
      .select("*")
      .eq("post_id", postId)
      .order("created_at", { ascending: false });

    if (error) {
      console.error(error);
      return NextResponse.json(
        {
          message: "コメント取得に失敗しました",
          error: error.message,
        },
        { status },
      );
    }

    return NextResponse.json(data, { status: 200 });
  } catch (e) {
    console.error(e);
    return NextResponse.json({ message: "サーバーエラーが発生しました" }, { status: 500 });
  }
}
