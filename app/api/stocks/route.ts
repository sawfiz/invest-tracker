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

  // const quote = await yahooFinance.quote(body.ticker);
  // console.log("🚀 ~ POST ~ quote:", quote);
  // if (!quote) {
  //   console.log("No ticker sysmbo found.");
  //   return NextResponse.json(
  //     { error: "Ticker symble does not exist." },
  //     { status: 400 }
  //   );
  // }

  // Todo - how to do this using findUnique instead?
  const stockInPortfolio = await prisma.stock.findMany({
    where: {
      ticker: body.ticker,
    },
  });

  if (stockInPortfolio.length === 0) {
    // Create a new StockTrade in the database
    await prisma.stock.create({
      data: {
        ticker: body.ticker,
        totalShares: body.shares,
        totalCost: body.amount,
      },
    });
  } else {
    // Create a new StockTrade in the database
    await prisma.stock.update({
      where: { id: stockInPortfolio[0].id },
      data: {
        totalShares:
          stockInPortfolio[0].totalShares +
          (body.action === "Buy" ? 1 : 0) * body.shares -
          (body.action === "Sell" ? 1 : 0) * body.shares,
        totalCost:
          stockInPortfolio[0].totalCost +
          (body.action === "Buy" ? 1 : 0) * body.amount -
          (body.action === "Sell" ? 1 : 0) * body.amount,
      },
    });
  }

  return NextResponse.json({ status: 201 });
}

// Used by frontend components to fetch data
// This avoids CORS issues
// Backend components can fetch data directly
export async function GET(request: NextRequest) {
  // const queryParams = new URLSearchParams(request.url);
  // console.log("🚀 ~ GET ~ queryParams:", queryParams);
  // Parse the query string from the request URL
  // Access individual query parameters
  // const ticker = queryParams.get("ticker");
  // console.log("🚀 ~ GET ~ ticker:", ticker)
  // console.log("🚀 ~ GET ~ request:", request)

  // Todo - Need a more elegant way to retrieve search parameter
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
