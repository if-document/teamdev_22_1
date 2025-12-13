import { NextRequest, NextResponse } from "next/server";
import { createClient } from "@/libs/supabase/server";

/**
 * ユーザー登録API
 * POST /api/auth/signup
 */
export async function POST(request: NextRequest) {
  try {
    const supabase = await createClient();
    const body = await request.json();

    const { name, email, password } = body;

    // バリデーション
    if (!name || !email || !password) {
      return NextResponse.json({ error: "名前、メールアドレス、パスワードは必須です" }, { status: 400 });
    }

    // メールアドレスの形式チェック
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      return NextResponse.json({ error: "有効なメールアドレスを入力してください" }, { status: 400 });
    }

    // パスワードの長さチェック（Supabaseは最低6文字）
    if (password.length < 6) {
      return NextResponse.json({ error: "パスワードは6文字以上である必要があります" }, { status: 400 });
    }

    // Supabase Authenticationでユーザー登録
    const { data: authData, error: authError } = await supabase.auth.signUp({
      email,
      password,
      options: {
        data: {
          name, // メタデータとして名前を保存
        },
      },
    });

    if (authError) {
      console.error("Supabase Auth error:", authError);

      // 既に登録済みのメールアドレス
      if (authError.message.includes("already registered")) {
        return NextResponse.json({ error: "このメールアドレスは既に登録されています" }, { status: 409 });
      }

      return NextResponse.json({ error: "ユーザー登録に失敗しました" }, { status: 500 });
    }

    if (!authData.user) {
      return NextResponse.json({ error: "ユーザー登録に失敗しました" }, { status: 500 });
    }

    // データベースのusersテーブルにユーザー情報を登録
    const { error: dbError } = await supabase.from("users").insert({
      id: authData.user.id, // Supabase AuthのUUIDを使用
      name,
      email,
      image_path: null, // デフォルトでnull
      created_at: new Date().toISOString(),
      updated_at: new Date().toISOString(),
    });

    if (dbError) {
      console.error("Database error:", dbError);

      // ユーザー登録に失敗した場合、認証ユーザーも削除する必要がある
      // ただし、Supabaseの管理画面から手動で削除する必要がある場合もある

      return NextResponse.json({ error: "ユーザー情報の保存に失敗しました" }, { status: 500 });
    }

    // 成功時
    return NextResponse.json(
      {
        message: "ユーザー登録が完了しました",
        user: {
          id: authData.user.id,
          email: authData.user.email,
          name,
        },
      },
      { status: 201 },
    );
  } catch (error) {
    console.error("予期しないエラー:", error);
    return NextResponse.json({ error: "サーバーエラーが発生しました" }, { status: 500 });
  }
}
