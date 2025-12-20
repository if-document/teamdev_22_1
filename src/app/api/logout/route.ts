import { NextResponse } from "next/server";
import { createClient } from "@/libs/supabase/server";

export async function POST() {
  try {
    const supabase = await createClient();

    const { error } = await supabase.auth.signOut();
    if (error) {
      console.error(error);
      return NextResponse.json({ message: "ログアウトに失敗しました" }, { status: 500 });
    }

    return NextResponse.json({ message: "ok" }, { status: 200 });
  } catch (e) {
    console.error(e);
    return NextResponse.json({ message: "ログアウトに失敗しました" }, { status: 500 });
  }
}
