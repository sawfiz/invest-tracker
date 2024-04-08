import React from "react";
import AddStockTrade from "./AddStockTrade";
import { Table } from "@radix-ui/themes";
import prisma from "@/prisma/client";
import yahooFinance from "yahoo-finance2";

const StocksPage = async () => {
  const stockTrades = await prisma.stockTrade.findMany();

  return (
    <div>
      <div className="mb-5">
        <AddStockTrade />
      </div>
      <Table.Root>
        <Table.Header>
          <Table.Row>
            <Table.ColumnHeaderCell>Date</Table.ColumnHeaderCell>
            <Table.ColumnHeaderCell>Ticker</Table.ColumnHeaderCell>
            <Table.ColumnHeaderCell className=" text-right">Shares</Table.ColumnHeaderCell>
            <Table.ColumnHeaderCell className=" text-right">Cost</Table.ColumnHeaderCell>
            <Table.ColumnHeaderCell className=" text-right">Price</Table.ColumnHeaderCell>
            <Table.ColumnHeaderCell className=" text-right">P/L</Table.ColumnHeaderCell>
            <Table.ColumnHeaderCell className=" text-right">P/L %</Table.ColumnHeaderCell>
          </Table.Row>
        </Table.Header>
        <Table.Body>
          {stockTrades.map(async (trade) => {
            const quote = await yahooFinance.quote(trade.ticker);
            console.log("🚀 ~ {stockTrades.map ~ currentPrice:", quote);
            return (
              <Table.Row key={trade.id}>
                <Table.Cell>
                  {trade.date.toDateString().substring(0, 3) +
                    " " +
                    trade.date.toISOString().substring(0, 10)}
                </Table.Cell>
                <Table.Cell>{trade.ticker}</Table.Cell>
                <Table.Cell className=" text-right">{trade.shares }</Table.Cell>
                <Table.Cell className=" text-right">{trade.price}</Table.Cell>
                <Table.Cell className=" text-right">{quote.regularMarketPrice}</Table.Cell>
                <Table.Cell className=" text-right">
                  {(
                    (quote?.regularMarketPrice - trade.price) *
                    trade.shares
                  ).toLocaleString("en-US", {
                    minimumFractionDigits: 2,
                    maximumFractionDigits: 2,
                  })}
                </Table.Cell>
                <Table.Cell className=" text-right">
                  {(
                    (quote?.regularMarketPrice / trade.price - 1) *
                    100
                  ).toLocaleString("en-US", {
                    minimumFractionDigits: 2,
                    maximumFractionDigits: 2,
                  }) + "%"}
                </Table.Cell>
              </Table.Row>
            );
          })}
        </Table.Body>
      </Table.Root>
    </div>
  );
};

export default StocksPage;
