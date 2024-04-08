import prisma from "@/prisma/client";
import { NextRequest, NextResponse } from "next/server";
import { createStockSchema } from "../../validationSchemas";

export async function POST(request: NextRequest) {
  const body = await request.json();
  console.log("🚀 ~ POST ~ body:", body);

  //   Validate the body of the request
  const validation = createStockSchema.safeParse(body);

  //   If validation errors, return errors
  if (!validation.success)
    return NextResponse.json(validation.error.format(), { status: 400 });

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
  return NextResponse.json({status: 201})
}
