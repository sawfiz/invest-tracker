import prisma from "@/prisma/client";
import { NextRequest, NextResponse } from "next/server";
import { createStockSchema } from "../../validationSchemas";
import yahooFinance from "yahoo-finance2";

export async function POST(request: NextRequest) {
  const body = await request.json();
  console.log("🚀 ~ POST ~ body:", body);

  //   Validate the body of the request
  const validation = createStockSchema.safeParse(body);

  //   If validation errors, return errors
  if (!validation.success)
    return NextResponse.json(validation.error.format(), { status: 400 });

  const quote = await yahooFinance.quote(body.ticker);
  console.log("🚀 ~ POST ~ quote:", quote);
  if (!quote) {
    console.log("No ticker sysmbo found.");
    return NextResponse.json(
      { error: "Ticker symble does not exist." },
      { status: 400 }
    );
  }

  const stockInPortfolio = await prisma.stock.findMany({
    where: {
      ticker: body.ticker,
    },
  });
  console.log("🚀 ~ onSubmit ~ stockInPortfolio:", stockInPortfolio);

  if (stockInPortfolio.length === 0) {
    // Create a new StockTrade in the database, return newStockTrade
    const newStock = await prisma.stock.create({
      data: {
        ticker: body.ticker,
      },
    });
    return NextResponse.json(newStock, { status: 201 });
  }
  return NextResponse.json(quote, { status: 201 });
}

export async function GET(request: NextRequest) {
  // const queryParams = new URLSearchParams(request.url);
  // console.log("🚀 ~ GET ~ queryParams:", queryParams);
  // Parse the query string from the request URL
  // Access individual query parameters
  // const ticker = queryParams.get("ticker");
  // console.log("🚀 ~ GET ~ ticker:", ticker)
  // console.log("🚀 ~ GET ~ request:", request)

  const { url } = request;
  const ticker = url.split("=")[1];
  console.log("🚀 ~ GET ~ url:", ticker);

  const quote = await yahooFinance.quote(ticker);
  console.log("🚀 ~ POST ~ quote:", quote);
  if (!quote) {
    console.log("No ticker sysmbo found.");
    return NextResponse.json(
      { error: "Ticker symble does not exist." },
      { status: 400 }
    );
  }
  return NextResponse.json(quote, { status: 201 });
}
