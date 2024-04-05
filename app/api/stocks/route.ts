import prisma from "@/prisma/client";
import { NextRequest, NextResponse } from "next/server";
import { createStockTradeSchema } from "../../validationSchemas";

export async function POST(request: NextRequest) {
  const body = await request.json();

  // Validate the body of the request
  const validation = createStockTradeSchema.safeParse(body);

  // If validation errors, return errors
  if (!validation.success)
    return NextResponse.json(validation.error.format(), { status: 400 });

  // Create a new StockTrade in the database, return newStockTrade
  const newStockTrade = await prisma.stockTrade.create({
    data: {
      date: body.date,
      broker: body.broker,
      trader: body.trader,
      action: body.action,
      ticker: body.ticker,
      shares: body.shares,
      price: body.price,
      fees: body.fees,
      amount: body.shares * body.price + body.fees,
    },
  });
  return NextResponse.json(newStockTrade, { status: 201 });
}
