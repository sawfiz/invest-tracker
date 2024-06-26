import React from "react";
import { Table } from "@radix-ui/themes";
import { MdExpandMore } from "react-icons/md";
import yahooFinance from "yahoo-finance2";
import prisma from "@/prisma/client";
import axios from "axios";

// interface Stock {
//   id: number;
//   ticker: string;
//   totalShares: number;
//   totalCost: number;
// }

// interface Props {
//   stocks: Stock[];
// }

const StocksTable = async () => {
  const stocks = await prisma.stock.findMany();
  console.log("🚀 ~ StocksTable ~ stocks:", stocks);

  return (
    <Table.Root variant="surface">
      <Table.Header>
        <Table.Row>
          <Table.ColumnHeaderCell></Table.ColumnHeaderCell>
          <Table.ColumnHeaderCell>Ticker</Table.ColumnHeaderCell>
          <Table.ColumnHeaderCell>Name</Table.ColumnHeaderCell>
          <Table.ColumnHeaderCell className=" text-right">
            Shares
          </Table.ColumnHeaderCell>
          <Table.ColumnHeaderCell className=" text-right">
            Average Cost
          </Table.ColumnHeaderCell>
          <Table.ColumnHeaderCell className=" text-right">
            Price
          </Table.ColumnHeaderCell>
          <Table.ColumnHeaderCell className=" text-right">
            Day Change %
          </Table.ColumnHeaderCell>
          <Table.ColumnHeaderCell className=" text-right">
            Cost
          </Table.ColumnHeaderCell>
          <Table.ColumnHeaderCell className=" text-right">
            Day Change $
          </Table.ColumnHeaderCell>
          <Table.ColumnHeaderCell className=" text-right">
            Market Value
          </Table.ColumnHeaderCell>
          <Table.ColumnHeaderCell className=" text-right">
            P/L
          </Table.ColumnHeaderCell>
          <Table.ColumnHeaderCell className=" text-right">
            P/L %
          </Table.ColumnHeaderCell>
        </Table.Row>
      </Table.Header>
      <Table.Body>
        {stocks.map(async (stock) => {
          // const quote = await axios.get(`/api/stocks/?ticker=${stock.ticker}`);
          const quote = await yahooFinance.quote(stock.ticker);

          const trades = await prisma.stockTrade.findMany({
            where: { ticker: stock.ticker },
          });

          let totalShares = 0;
          let totalCost = 0;

          trades.forEach((trade) => {
            if (trade.action === "Buy") {
              totalShares += trade.shares;
              totalCost += trade.amount;
            } else if (trade.action === "Sell") {
              totalShares -= trade.shares;
              totalCost -= trade.amount;
            }
          });

          const averageCostPerShare =
            totalShares !== 0 ? totalCost / totalShares : 0;
          const marketValue = (
            totalShares * quote.regularMarketPrice!
          ).toLocaleString();
          const dayPl = totalShares * quote.regularMarketChange!;
          const pl =
            (quote.regularMarketPrice! - averageCostPerShare) *
            totalShares;
          const plPercentage =
            (quote.regularMarketPrice! / averageCostPerShare - 1) * 100;

          return (
            <Table.Row key={stock.id}>
              <Table.Cell>
                <MdExpandMore />
              </Table.Cell>
              <Table.Cell>{quote?.symbol}</Table.Cell>
              <Table.Cell>{quote?.longName}</Table.Cell>
              <Table.Cell className="text-right">
                {totalShares.toLocaleString(undefined, {
                  minimumFractionDigits: 0,
                  maximumFractionDigits: 2,
                })}
              </Table.Cell>
              <Table.Cell className="text-right">
                {averageCostPerShare.toLocaleString(undefined, {
                  minimumFractionDigits: 2,
                  maximumFractionDigits: 2,
                })}
              </Table.Cell>
              <Table.Cell
                className={`text-right font-bold ${
                  quote.regularMarketChange! > 0
                    ? "text-green-500"
                    : "text-red-500"
                }`}
              >
                {quote.regularMarketPrice!.toLocaleString(undefined, {
                  minimumFractionDigits: 2,
                  maximumFractionDigits: 2,
                })}
              </Table.Cell>
              <Table.Cell
                className={`text-right ${
                  quote.regularMarketChange! > 0
                    ? "text-green-500"
                    : "text-red-500"
                }`}
              >
                {quote.regularMarketChangePercent?.toLocaleString(undefined, {
                  minimumFractionDigits: 2,
                  maximumFractionDigits: 2,
                }) + "%"}
              </Table.Cell>
              <Table.Cell className="text-right">
                {totalCost.toLocaleString(undefined, {
                  minimumFractionDigits: 2,
                  maximumFractionDigits: 2,
                })}
              </Table.Cell>
              <Table.Cell
                className={`text-right ${
                  quote.regularMarketChange! > 0
                    ? "text-green-500"
                    : "text-red-500"
                }`}
              >
                {dayPl.toLocaleString(undefined, {
                  minimumFractionDigits: 2,
                  maximumFractionDigits: 2,
                })}
              </Table.Cell>
              <Table.Cell className="text-right">{marketValue}</Table.Cell>
              <Table.Cell
                className={`text-right ${
                  pl > 0 ? "text-green-500" : "text-red-500"
                }`}
              >
                {pl.toLocaleString(undefined, {
                  minimumFractionDigits: 2,
                  maximumFractionDigits: 2,
                })}
              </Table.Cell>
              <Table.Cell
                className={`text-right ${
                  plPercentage > 0 ? "text-green-500" : "text-red-500"
                }`}
              >
                {plPercentage.toLocaleString(undefined, {
                  minimumFractionDigits: 2,
                  maximumFractionDigits: 2,
                }) + "%"}
              </Table.Cell>
            </Table.Row>
          );
        })}
      </Table.Body>
    </Table.Root>
  );
};
// export const dynamic = 'force-dynamic';

export default StocksTable;
