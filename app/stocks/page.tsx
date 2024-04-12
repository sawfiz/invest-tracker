import React from "react";
import AddStockTrade from "./AddStockTrade";
import StocksTable from "../components/StocksTable";

const StocksPage = () => {
  return (
    <div>
      <div className="mb-5">
        <AddStockTrade />
      </div>
      <StocksTable />
    </div>
  );
};

// export const dynamic = 'force-dynamic';

export default StocksPage;
