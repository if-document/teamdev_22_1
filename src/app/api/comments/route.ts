import { NextResponse, NextRequest } from "next/server";
import { createClient } from "@/libs/supabase/server";
<<<<<<< HEAD

=======
import type { TablesInsert } from "@/types/supabase";

const FIXED_USER_ID = "fc6b7e74-3257-459a-8862-8d5800c6ad22";
// TODO: 認証機能実装後に差し替え

// コメント取得（既存）
>>>>>>> 849b61f (コメント投稿のAPI作成)
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
<<<<<<< HEAD
=======

// コメント投稿（新規作成）
export async function POST(req: NextRequest) {
  try {
    const supabase = await createClient();

    const body = await req.json();
    const { post_id, content } = body;

    // バリデーション: contentの型と空文字チェック
    if (typeof content !== "string" || content.trim() === "") {
      return NextResponse.json({ message: "content は空でない文字列である必要があります" }, { status: 400 });
    }

    // バリデーション: post_idの型チェック
    const postId = Number(post_id);
    if (!Number.isInteger(postId) || postId <= 0) {
      return NextResponse.json({ message: "post_id が不正です" }, { status: 400 });
    }

    // コメントを作成
    const insertData: TablesInsert<"comments"> = {
      user_id: FIXED_USER_ID,
      post_id: postId,
      content: content.trim(),
    };

    const { data, error, status } = await supabase.from("comments").insert(insertData).select().single();

    if (error) {
      console.error(error);
      return NextResponse.json(
        {
          message: "コメント作成に失敗しました",
          error: error.message,
        },
        { status: status ?? 500 },
      );
    }

    return NextResponse.json(data, { status: 201 });
  } catch (e) {
    console.error(e);
    return NextResponse.json({ message: "サーバーエラーが発生しました" }, { status: 500 });
  }
}
>>>>>>> 849b61f (コメント投稿のAPI作成)
