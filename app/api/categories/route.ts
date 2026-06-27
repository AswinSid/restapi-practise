import { NextResponse } from "next/server";
import { supabase } from "@/lib/supabase";
import { Category } from "@/types";

// GET funtion to read the data from the supabase table
export async function GET(): Promise<NextResponse> {
  const { data, error } = await supabase.from("categories").select("*");

  if (error) {
    return NextResponse.json(
      { error: "Failed to Fetch Categories" },
      { status: 500 },
    );
  }
  return NextResponse.json(data as Category[], { status: 200 });
}

//POST function to write the new category to supabase table
export async function POST(request: Request): Promise<NextResponse> {
  const body = await request.json();

  if (!body.name || !body.slug) {
    return NextResponse.json(
      { error: "name and slug is required" },
      { status: 401 },
    );
  }
  const { data, error } = await supabase
    .from("categories")
    .insert(body)
    .select()
    .single();

  if (error) {
    return NextResponse.json(
      { error: "Failed to create category" },
      { status: 500 },
    );
  }
  return NextResponse.json(data as Category, { status: 201 });
}
