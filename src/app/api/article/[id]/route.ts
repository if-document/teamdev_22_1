import { NextRequest, NextResponse } from "next/server";
import { supabase } from "@/libs/supabase/client";

export async function DELETE(request: NextRequest, { params }: { params: { id: string } }) {
  try {
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


//記事データの更新
export async function PUT(request: NextRequest, { params }: { params: { id: string } }) {
  try {
    // ユーザーの認証を確認
    const {
      data: { user },
      error: authError,
    } = await supabase.auth.getUser();

    if (authError || !user) {
      return NextResponse.json({ error: "認証が必要です" }, { status: 401 });
    }

    // 記事IDの確認
    const articleId = parseInt(params.id);
    if (isNaN(articleId)) {
      return NextResponse.json({ error: "無効な記事IDです" }, { status: 400 });
    }

    // (要件：該当記事を更新できるのは、記事を作成した本人のみ)
    //supabaseに問い合わせ(記事IDに該当する作成者本人のIDを取得)
    const { data: article, error: fetchError } = await supabase
      .from("posts")
      .select("user_id")
      .eq("id", articleId)
      .single();

    // 記事がない場合
    if (fetchError || !article) {
      return NextResponse.json({ error: "記事が見つかりません" }, { status: 404 });
    }
    
    // 記事はあるが、権限がない(今のユーザーが作成者本人ではない)
    if (article.user_id !== user.id) {
      return NextResponse.json({ error: "この記事を更新する権限がありません" }, { status: 403 });
    }

    // 更新データを受け取る
    const body = await request.json();
    const { title, content, category_id, image_path } = body;

    // 要件をみたしているか確認(要件:category_id, title, content, image_path, updated_at は更新必須)
    if (!title || !content || !category_id || !image_path) {
      return NextResponse.json(
        { error: "タイトル、本文、カテゴリ、画像はすべて必須項目です" },
        { status: 400 }
      );
    }

    // 更新を実行
    const { error: updateError } = await supabase
      .from("posts")
      .update({
        title,
        content,
        category_id,
        image_path,
        updated_at: new Date().toISOString(), 
      })
      .eq("id", articleId);

    if (updateError) {
      console.error("更新のエラー:", updateError);
      return NextResponse.json({ error: "記事の更新に失敗しました" }, { status: 500 });
    }

    //結果を返す
    return NextResponse.json({ message: "記事を更新しました" }, { status: 200 });

  } catch (error) {
    console.error("予期しないエラーが発生しました:", error);
    return NextResponse.json({ error: "サーバーのエラーが発生しました" }, { status: 500 });
  }
}

