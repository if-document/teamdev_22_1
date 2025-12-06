import { supabase } from "@/libs/supabase/server";
import { NextResponse, NextRequest } from "next/server";

export async function GET(request: NextRequest, { params }: { params: { id: string } }) {
  try {
    const { id } = params;

    // IDを数値に変換
    const articleId = parseInt(id, 10);

    // IDが無効な場合
    if (isNaN(articleId)) {
      return NextResponse.json({ error: "無効な記事IDです" }, { status: 400 });
    }

    // Supabaseから記事を取得（必要なフィールドのみ）
    const { data, error } = await supabase
      .from("posts")
      .select("id, title, content, image_path, category_id, user_id, created_at, updated_at")
      .eq("id", articleId)
      .single();

    // エラーハンドリング
    if (error) {
      console.error("Supabase error:", error);

      // レコードが見つからない場合
      if (error.code === "PGRST116") {
        return NextResponse.json({ error: "記事が見つかりません" }, { status: 404 });
      }

      return NextResponse.json({ error: "記事の取得に失敗しました" }, { status: 500 });
    }

    // 成功時
    return NextResponse.json(data, { status: 200 });
  } catch (error) {
    console.error("予期しないエラー:", error);
    return NextResponse.json({ error: "サーバーエラーが発生しました" }, { status: 500 });
  }
}
