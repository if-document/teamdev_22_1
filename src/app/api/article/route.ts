import { NextResponse, NextRequest } from "next/server";
import { createClient } from "@/libs/supabase/server";
import type { TablesInsert } from "@/types/supabase";

const BUCKET_NAME = "article_images";

const FIXED_USER_ID = "fc6b7e74-3257-459a-8862-8d5800c6ad22";
// TODO: 認証機能実装後に auth.getUser() から取得した user.id に差し替える（issue #12）

export async function POST(req: NextRequest) {
  try {
    const supabase = await createClient();

    const formData = await req.formData();

    const title = formData.get("title") as string | null;
    const content = formData.get("content") as string | null;
    const categoryIdRaw = formData.get("category_id");
    const imageFile = formData.get("image") as File | null;

    const categoryId = typeof categoryIdRaw === "string" ? Number(categoryIdRaw) : NaN;

    if (!content || !imageFile || Number.isNaN(categoryId)) {
      return NextResponse.json({ message: "content, category_id, image は必須です" }, { status: 400 });
    }

    const ext = imageFile.name.split(".").pop() || "png";
    const filePath = `${Date.now()}.${ext}`;

    const { error: uploadError } = await supabase.storage.from(BUCKET_NAME).upload(filePath, imageFile, {
      contentType: imageFile.type,
    });

    if (uploadError) {
      console.error(uploadError);
      return NextResponse.json(
        {
          message: "画像アップロードに失敗しました",
          error: uploadError.message,
          name: uploadError.name,
        },
        { status: 500 },
      );
    }

    const {
      data: { publicUrl },
    } = supabase.storage.from(BUCKET_NAME).getPublicUrl(filePath);

    const insertData: TablesInsert<"posts"> = {
      user_id: FIXED_USER_ID,
      category_id: categoryId,
      content,
      image_path: publicUrl,
      title: title ?? undefined,
    };

    const { data, error: insertError } = await supabase.from("posts").insert(insertData).select().single();

    if (insertError) {
      console.error(insertError);
      return NextResponse.json({ message: "記事作成に失敗しました", error: insertError.message }, { status: 500 });
    }

    return NextResponse.json(data, { status: 201 });
  } catch (e) {
    console.error(e);
    return NextResponse.json({ message: "サーバーエラーが発生しました" }, { status: 500 });
  }
}
