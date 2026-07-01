import { NextResponse } from "next/server";
import { supabase } from "@/lib/supabase";
import { Product, CreateProductInput } from "@/types/index";

//GET fucntion to get the product data
export async function GET(request: Request): Promise<NextResponse> {
  const { searchParams } = new URL(request.url);
  const category_id = searchParams.get("category_id");
  const is_live = searchParams.get("is_live");

  let query = supabase.from("products").select("*");
  if (category_id) {
    query = query.eq("category_id", category_id);
  }
  if (is_live !== null) {
    query = query.eq("is_live", is_live === "true");
  }
  const { data, error } = await query;

  if (error) {
    return NextResponse.json(
      { error: "failed to fetch products" },
      { status: 500 },
    );
  }
  return NextResponse.json(data as Product[], { status: 200 });
}

//POST function to create a new product
export async function POST(request: Request): Promise<NextResponse> {
  const body: CreateProductInput = await request.json();

  if (!body.name || !body.price || !body.category_id) {
    return NextResponse.json(
      { error: "name, price and category_id are required" },
      { status: 400 },
    );
  }

  const { data, error } = await supabase
    .from("products")
    .insert(body)
    .select()
    .single();

  if (error) {
    return NextResponse.json(
      { error: "Failed to create product" },
      { status: 500 },
    );
  }

  return NextResponse.json(
    { message: "Product created sucessfully" },
    { status: 201 },
  );
}
