"use client";
import {
  Dialog,
  Button,
  Flex,
  Select,
  TextField,
  Text,
  Box,
} from "@radix-ui/themes";
import React, { useState } from "react";
import { Controller, useForm } from "react-hook-form";

interface StockTradeForm {
  date: Date;
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
  const { register, handleSubmit, getValues, setValue, control } =
    useForm<StockTradeForm>();
  const [amount, setAmount] = useState(0);

  // Calculate amount dynamically based on input changes
  const calcAmount = () => {
    // Cast string to number for the calculation
    const value =
      getValues("shares") * getValues("price") + Number(getValues("fees"));
    setAmount(value);
    setValue("amount", value);
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
              <input type="date" {...register("date")} />
            </Flex>

            {/* Trader */}
            <Flex gap="3" align="center">
              <label className="w-12">
                <Text as="div" size="2" weight="bold">
                  Trader
                </Text>
              </label>
              <Controller
                name="trader"
                control={control}
                defaultValue="Xinfei"
                render={({ field }) => (
                  <Select.Root onValueChange={field.onChange} {...field}>
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
                )}
              />
            </Flex>

            {/* Broker */}
            <Flex gap="3" align="center">
              <label className="w-12">
                <Text as="div" size="2" weight="bold">
                  Broker
                </Text>
              </label>
              <Controller
                name="broker"
                control={control}
                defaultValue="MooMoo"
                render={({ field }) => (
                  <Select.Root onValueChange={field.onChange} {...field}>
                    <Select.Trigger />
                    <Select.Content>
                      <Select.Group>
                        <Select.Item value="MooMoo">MooMoo</Select.Item>
                        <Select.Item value="IBKR">
                          Interactive Brokers
                        </Select.Item>
                        <Select.Item value="Syfe">Syfe</Select.Item>
                      </Select.Group>
                    </Select.Content>
                  </Select.Root>
                )}
              />
            </Flex>

            {/* Ticker */}
            <Flex gap="3" align="center">
              <label className="w-12">
                <Text as="div" size="2" mb="1" weight="bold">
                  Ticker
                </Text>
              </label>
              <TextField.Root {...register("ticker")} placeholder="Enter a ticker symbol" />
            </Flex>

            {/* Action */}
            <Flex gap="3" align="center">
              <label className="w-12">
                <Text as="div" size="2" weight="bold">
                  Action
                </Text>
              </label>
              <Controller
                name="action"
                control={control}
                defaultValue="Buy"
                render={({ field }) => (
                  <Select.Root onValueChange={field.onChange} {...field}>
                    <Select.Trigger />
                    <Select.Content>
                      <Select.Group>
                        <Select.Item value="Buy">Buy</Select.Item>
                        <Select.Item value="Sell">Sell</Select.Item>
                      </Select.Group>
                    </Select.Content>
                  </Select.Root>
                )}
              />
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
              <Box {...register("amount")}>{amount} </Box>
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
