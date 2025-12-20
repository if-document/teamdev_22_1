import { NextRequest, NextResponse } from "next/server";
import { createClient } from "@/libs/supabase/server";
import { ARTICLE_IMAGES_BUCKET } from "@/const/supabase";

/**
 * 記事詳細を取得するAPI
 * GET /api/article/[id]
 */
export async function GET(request: NextRequest, { params }: { params: Promise<{ id: string }> }) {
  try {
    const supabase = await createClient();
    const { id } = await params;

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

//記事を更新するAPI
export async function PUT(request: NextRequest, { params }: { params: Promise<{ id: string }> }) {
  try {
    const supabase = await createClient();
    const { id } = await params;

    // 認証チェック
    // const {
    //   data: { user },
    //   error: authError,
    // } = await supabase.auth.getUser();

    // if (authError || !user) {
    //   return NextResponse.json({ error: "認証が必要です" }, { status: 401 });
    // }

    // 【テスト用】仮のユーザー情報を使う
    const user = { id: "fc6b7e74-3257-459a-8862-8d5800c6ad22" }; // ← GET結果のuser_idを使用

    const articleId = parseInt(id);

    if (isNaN(articleId)) {
      return NextResponse.json({ error: "無効な記事IDです" }, { status: 400 });
    }

    // 記事の存在確認と権限チェック
const { data: article, error: fetchError } = await supabase
  .from("posts")
  .select("user_id, image_path")  // ← 修正
  .eq("id", articleId)
  .single();

if (fetchError || !article) {
  return NextResponse.json({ error: "記事が見つかりません" }, { status: 404 });
}

// 作成者本人かチェック
if (article.user_id !== user.id) {
  return NextResponse.json({ error: "この記事を更新する権限がありません" }, { status: 403 });
}

const formData = await request.formData();
const title = formData.get("title") as string;
const content = formData.get("content") as string;
const category_id = parseInt(formData.get("category_id") as string, 10);
const imageFile = formData.get("image") as File | null;

if (!title || !content || isNaN(category_id)) {
  return NextResponse.json({ error: "タイトル、本文、カテゴリは必須項目です" }, { status: 400 });
}

let finalImagePath;

if (imageFile && imageFile.size > 0) {
  // 新しい画像がアップロードされた場合
  const ext = imageFile.name.split(".").pop() || "png";
  const filePath = `${Date.now()}.${ext}`;
  const { error: uploadError } = await supabase.storage.from(ARTICLE_IMAGES_BUCKET).upload(filePath, imageFile, {
    contentType: imageFile.type,
    upsert: true,
  });

  if (uploadError) {
    console.error("画像アップロードエラー:", uploadError);
    return NextResponse.json({ error: "画像のアップロードに失敗しました" }, { status: 500 });
  }

  const {
    data: { publicUrl },
  } = supabase.storage.from(ARTICLE_IMAGES_BUCKET).getPublicUrl(filePath);

  finalImagePath = publicUrl;
} else {
  // 新しい画像がない場合は、既存の画像パスを使う
  finalImagePath = article.image_path;
}

// 更新実行
const { error: updateError } = await supabase
  .from("posts")
  .update({
    title,
    content,
    category_id,
    image_path: finalImagePath,
    updated_at: new Date().toISOString(),
  })
  .eq("id", articleId);

    if (updateError) {
      console.error("更新エラー:", updateError);
      return NextResponse.json({ error: "記事の更新に失敗しました" }, { status: 500 });
    }

    return NextResponse.json({ message: "記事を更新しました" }, { status: 200 });
  } catch (error) {
    console.error("予期しないエラー:", error);
    return NextResponse.json({ error: "サーバーエラーが発生しました" }, { status: 500 });
  }
}

/**
 * 記事を削除するAPI
 * DELETE /api/article/[id]
 */
export async function DELETE(request: NextRequest, { params }: { params: Promise<{ id: string }> }) {
  try {
    const supabase = await createClient();
    const { id } = await params;

    // 認証チェック: ログインユーザーを取得
    const {
      data: { user },
      error: authError,
    } = await supabase.auth.getUser();

    if (authError || !user) {
      return NextResponse.json({ error: "認証が必要です" }, { status: 401 });
    }

    const articleId = parseInt(id);

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
