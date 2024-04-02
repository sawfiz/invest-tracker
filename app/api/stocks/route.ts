import prisma from "@/prisma/client";
import { NextRequest, NextResponse } from "next/server";
import { z } from "zod";

// Define custom error messages
const customErrorMessages = {
  required: (fieldName: string) => `${fieldName} is required.`,
};

// Define validation schema
const createStockTradeSchema = z.object({
    date: z.string().datetime().refine((date) => !!date, {
      message: customErrorMessages.required("Date"),
    }),
  broker: z.string().refine((broker) => !!broker, {
    message: customErrorMessages.required("Broker"),
  }),
  trader: z.string().refine((trader) => !!trader, {
    message: customErrorMessages.required("Trader"),
  }),
  action: z.string().refine((action) => !!action, {
    message: customErrorMessages.required("Action"),
  }),
  ticker: z
    .string()
    .min(1, { message: customErrorMessages.required("Ticker") })
    .max(255),
  shares: z.number().refine((shares) => !!shares, {
    message: customErrorMessages.required("Shares"),
  }),
  price: z.number().refine((price) => !!price, {
    message: customErrorMessages.required("Price"),
  }),
  fees: z.number().refine((fees) => !!fees, {
    message: customErrorMessages.required("Fees"),
  }),
  //   amount: z.number().refine((amount) => !!amount, {
  //     message: customErrorMessages.required("Amount"),
  //   }),
});

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
