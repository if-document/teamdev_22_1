import { NextRequest, NextResponse } from "next/server";
import { createClient } from "@/libs/supabase/server";

//ログインAPI
export async function POST(request: NextRequest) {
  try {
    const supabase = await createClient();
    const body = await request.json();

    const { email, password } = body;

    //バリデーション
    if (!email || !password) {
      return NextResponse.json({ error: "メールアドレスとパスワードは必須です" }, { status: 400 });
    }

    //Supabase Authenticationでログイン実行
    const { data, error: authError } = await supabase.auth.signInWithPassword({
      email,
      password,
    });

    //認証エラーのハンドリング
    if (authError) {
      console.error("Supabase Auth error:", authError.message);

      // ログイン失敗
      return NextResponse.json({ error: "メールアドレスまたはパスワードが不正です" }, { status: 401 });
    }

    if (!data.user) {
      return NextResponse.json({ error: "ユーザーが見つかりませんでした" }, { status: 404 });
    }

    //成功時
    return NextResponse.json(
      {
        message: "ログインに成功しました",
        user: {
          id: data.user.id,
          email: data.user.email,
          name: data.user.user_metadata?.name || null,
        },
      },
      { status: 200 },
    );
  } catch (error) {
    console.error("予期しないエラー:", error);
    return NextResponse.json({ error: "サーバーエラーが発生しました" }, { status: 500 });
  }
}
