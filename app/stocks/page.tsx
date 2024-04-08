import React from "react";
import AddStockTrade from "./AddStockTrade";
import { Table } from "@radix-ui/themes";
import prisma from "@/prisma/client";

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
            <Table.ColumnHeaderCell>Trader</Table.ColumnHeaderCell>
            <Table.ColumnHeaderCell>Broker</Table.ColumnHeaderCell>
            <Table.ColumnHeaderCell>Ticker</Table.ColumnHeaderCell>
            <Table.ColumnHeaderCell>Action</Table.ColumnHeaderCell>
            <Table.ColumnHeaderCell>Shares</Table.ColumnHeaderCell>
            <Table.ColumnHeaderCell>Price</Table.ColumnHeaderCell>
            <Table.ColumnHeaderCell>Fees</Table.ColumnHeaderCell>
            <Table.ColumnHeaderCell>Amount</Table.ColumnHeaderCell>
            <Table.ColumnHeaderCell>Notes</Table.ColumnHeaderCell>
          </Table.Row>
        </Table.Header>
        <Table.Body>
          {stockTrades.map((trade) => (
            <Table.Row key={trade.id}>
              <Table.Cell>{trade.date.toDateString()}</Table.Cell>
              <Table.Cell>{trade.trader}</Table.Cell>
              <Table.Cell>{trade.broker}</Table.Cell>
              <Table.Cell>{trade.ticker}</Table.Cell>
              <Table.Cell>{trade.action}</Table.Cell>
              <Table.Cell>{trade.shares}</Table.Cell>
              <Table.Cell>{trade.price}</Table.Cell>
              <Table.Cell>{trade.fees}</Table.Cell>
              <Table.Cell>{trade.amount}</Table.Cell>
              <Table.Cell>{trade.notes}</Table.Cell>
            </Table.Row>
          ))}
        </Table.Body>
      </Table.Root>
    </div>
  );
};

export default StocksPage;
