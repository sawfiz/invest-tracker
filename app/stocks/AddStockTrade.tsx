"use client";
import {
  Dialog,
  Button,
  Flex,
  Select,
  TextField,
  Text,
} from "@radix-ui/themes";
import React, { useState } from "react";
import { useForm } from "react-hook-form";

interface StockTradeForm {
  data: Date;
  broker: string;
  trader: string;
  action: string;
  ticker: string;
  shares: number;
  price: number;
  fees: number;
  amount: number;
}

const AddStockTrade = () => {
  const { register, handleSubmit, getValues } = useForm<StockTradeForm>();
  const [amount, setAmount] = useState(0);

  const calcAmount = () => {
    setAmount(getValues("shares") * getValues("price") + getValues("fees"));
  };

  return (
    <Dialog.Root>
      <Dialog.Trigger>
        <Button>Add Trade</Button>
      </Dialog.Trigger>

      <Dialog.Content maxWidth="300px">
        <Dialog.Title>Add a Stock Trade</Dialog.Title>

        <form onSubmit={handleSubmit(() => console.log(getValues()))}>
          <Flex direction="column" gap="3">
            {/* Date */}
            <Flex gap="3" align="center">
              <label className=" w-12">
                <Text as="div" size="2" mb="1" weight="bold">
                  Date
                </Text>
              </label>
              <input type="date" />
            </Flex>

            {/* Trader */}
            <Flex gap="3" align="center">
              <label className="w-12">
                <Text as="div" size="2" weight="bold">
                  Trader
                </Text>
              </label>
              <Select.Root defaultValue="Xinfei">
                <Select.Trigger />
                <Select.Content>
                  <Select.Group>
                    <Select.Item value="Xinfei">Xinfei</Select.Item>
                    <Select.Item value="Victor">Victor</Select.Item>
                    <Select.Item value="Justin">Justin</Select.Item>
                    <Select.Item value="Shuya">Shuya</Select.Item>
                  </Select.Group>
                </Select.Content>
              </Select.Root>
            </Flex>

            {/* Broker */}
            <Flex gap="3" align="center">
              <label className="w-12">
                <Text as="div" size="2" weight="bold">
                  Broker
                </Text>
              </label>
              <Select.Root defaultValue="MooMoo">
                <Select.Trigger />
                <Select.Content>
                  <Select.Group>
                    <Select.Item value="MooMoo">MooMoo</Select.Item>
                    <Select.Item value="IBKR">Interactive Brokers</Select.Item>
                    <Select.Item value="Syfe">Syfe</Select.Item>
                  </Select.Group>
                </Select.Content>
              </Select.Root>
            </Flex>

            {/* Ticker */}
            <Flex gap="3" align="center">
              <label className="w-12">
                <Text as="div" size="2" mb="1" weight="bold">
                  Ticker
                </Text>
              </label>
              <TextField.Root placeholder="Enter a ticker symbol" />
            </Flex>

            {/* Action */}
            <Flex gap="3" align="center">
              <label className="w-12">
                <Text as="div" size="2" weight="bold">
                  Action
                </Text>
              </label>
              <Select.Root defaultValue="Buy">
                <Select.Trigger />
                <Select.Content>
                  <Select.Group>
                    <Select.Item value="Buy">Buy</Select.Item>
                    <Select.Item value="Sell">Sell</Select.Item>
                    <Select.Item value="Split">Split</Select.Item>
                  </Select.Group>
                </Select.Content>
              </Select.Root>
            </Flex>

            {/* Number of Shares */}
            <Flex gap="3" align="center">
              <label className="w-12">
                <Text as="div" size="2" mb="1" weight="bold">
                  Shares
                </Text>
              </label>
              <TextField.Root
                {...register("shares")}
                onBlur={calcAmount}
                placeholder="Number of shares"
              ></TextField.Root>
            </Flex>

            {/* Price */}
            <Flex gap="3" align="center">
              <label className="w-12">
                <Text as="div" size="2" mb="1" weight="bold">
                  Price
                </Text>
              </label>
              <TextField.Root
                {...register("price")}
                onBlur={calcAmount}
                placeholder="Share price"
              />
            </Flex>

            {/* Fees */}
            <Flex gap="3" align="center">
              <label className="w-12">
                <Text as="div" size="2" mb="1" weight="bold">
                  Fees
                </Text>
              </label>
              <TextField.Root
                {...register("fees")}
                onBlur={calcAmount}
                placeholder="Fees"
              />
            </Flex>

            {/* Amount */}
            <Flex gap="3" align="center">
              <label className="w-16">
                <Text as="div" size="2" mb="1" weight="bold">
                  Amount
                </Text>
              </label>
              <TextField.Root disabled={true}>
                {" "}
                {amount}
              </TextField.Root>
            </Flex>
          </Flex>

          <Flex gap="3" mt="4" justify="end">
            <Dialog.Close>
              <Button variant="soft" color="gray">
                Cancel
              </Button>
            </Dialog.Close>
            <Dialog.Close>
              <Button type="submit">Save</Button>
            </Dialog.Close>
          </Flex>
        </form>
      </Dialog.Content>
    </Dialog.Root>
  );
};

export default AddStockTrade;
