import { NextResponse, NextRequest } from "next/server";
import { supabase } from "@/libs/supabase/server";
import type { TablesInsert } from "@/types/supabase";

const BUCKET_NAME = "posts";

export async function POST(req: NextRequest) {
  try {
    const formData = await req.formData();

    const title = formData.get("title") as string | null;
    const content = formData.get("content") as string | null;
    const categoryIdRaw = formData.get("category_id");
    const imageFile = formData.get("image") as File | null;

    const categoryId = typeof categoryIdRaw === "string" ? Number(categoryIdRaw) : NaN;

    if (!content || !imageFile || !categoryId || Number.isNaN(categoryId)) {
      return NextResponse.json({ message: "content, category_id, image は必須です" }, { status: 400 });
    }

    const ext = imageFile.name.split(".").pop();

    const filePath = `${Date.now()}.${ext}`;

    const { error: uploadError } = await supabase.storage.from(BUCKET_NAME).upload(filePath, imageFile, {
      contentType: imageFile.type,
    });

    if (uploadError) {
      console.error(uploadError);
      return NextResponse.json({ message: "画像アップロードに失敗しました" }, { status: 500 });
    }

    const {
      data: { publicUrl },
    } = supabase.storage.from(BUCKET_NAME).getPublicUrl(filePath);

    const insertData: TablesInsert<"posts"> = {
      category_id: categoryId,
      content,
      image_path: publicUrl,
      title: title ?? undefined,
    };

    const { data, error: insertError } = await supabase.from("posts").insert(insertData).select().single();

    if (insertError) {
      console.error(insertError);
      return NextResponse.json({ message: "記事作成に失敗しました" }, { status: 500 });
    }

    return NextResponse.json(data, { status: 201 });
  } catch (e) {
    console.error(e);
    return NextResponse.json({ message: "サーバーエラーが発生しました" }, { status: 500 });
  }
}
