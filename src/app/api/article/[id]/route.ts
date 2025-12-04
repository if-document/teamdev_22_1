import { NextRequest, NextResponse } from "next/server";
import { supabase as createClient } from "@/libs/supabase/server";

export async function DELETE(request: NextRequest, { params }: { params: { id: string } }) {
  try {
    const supabase = await createClient;

    // 認証チェック: ログインユーザーを取得
    const {
      data: { user },
      error: authError,
    } = await supabase.auth.getUser();

    if (authError || !user) {
      return NextResponse.json({ error: "認証が必要です" }, { status: 401 });
    }

    const articleId = parseInt(params.id);

    if (isNaN(articleId)) {
      return NextResponse.json({ error: "無効な記事IDです" }, { status: 400 });
    }

    // 記事の存在確認と作成者チェック
    const { data: article, error: fetchError } = await supabase
      .from("posts")
      .select("user_id")
      .eq("id", articleId)
      .single();

    if (fetchError || !article) {
      return NextResponse.json({ error: "記事が見つかりません" }, { status: 404 });
    }

    // 作成者本人かチェック
    if (article.user_id !== user.id) {
      return NextResponse.json({ error: "この記事を削除する権限がありません" }, { status: 403 });
    }

    // 記事を削除
    const { error: deleteError } = await supabase.from("posts").delete().eq("id", articleId);

    if (deleteError) {
      console.error("削除エラー:", deleteError);
      return NextResponse.json({ error: "記事の削除に失敗しました" }, { status: 500 });
    }

    return NextResponse.json({ message: "記事を削除しました" }, { status: 200 });
  } catch (error) {
    console.error("予期しないエラー:", error);
    return NextResponse.json({ error: "サーバーエラーが発生しました" }, { status: 500 });
  }
}
