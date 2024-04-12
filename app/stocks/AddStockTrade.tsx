"use client";
import {
  Dialog,
  Button,
  Flex,
  Select,
  TextField,
  Text,
  Box,
  Callout,
  Spinner,
  TextArea,
} from "@radix-ui/themes";
import SimpleMDE from "react-simplemde-editor";
import "easymde/dist/easymde.min.css";
import React, { useEffect, useState } from "react";
import axios from "axios";
import { Controller, useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { createStockTradeSchema } from "../validationSchemas";
import { z } from "zod";
import ErrorMessage from "../components/ErrorMessage";
import StockName from "../components/StockName";

type StockTradeForm = z.infer<typeof createStockTradeSchema>;

const AddStockTrade = () => {
  const {
    register,
    handleSubmit,
    getValues,
    setValue,
    control,
    reset,
    formState: { errors, isSubmitting },
  } = useForm<StockTradeForm>({
    resolver: zodResolver(createStockTradeSchema),
    defaultValues: {
      date: new Date(),
      trader: "Xinfei",
      broker: "MooMoo",
      ticker: "",
      action: "Buy",
      shares: 0,
      price: 0,
      fees: 0,
      amount: 0,
      notes: "",
    },
  });

  const [openDialog, setOpenDialog] = useState(false);
  const [amount, setAmount] = useState(0);
  const [error, setError] = useState("");
  const [checkingTicker, setCheckingTicker] = useState(false);
  const [tickerFound, setTickerFound] = useState(true);
  const [stockName, setStockName] = useState("");
  const [isSubmitSuccessful, setIsSubmitSuccessful] = useState(false);

  // Calculate amount dynamically based on input changes
  const calcAmount = () => {
    const value =
      (getValues("shares") || 0) * (getValues("price") || 0) +
      (getValues("fees") || 0);
    setAmount(value);
    setValue("amount", value);
    console.log(errors)
  };

  // Submit form data to the api / database
  const onSubmit = async (data: StockTradeForm) => {
    calcAmount();
    console.log(data);

    try {
      await axios.post("/api/stocks", data);
      try {
        await axios.post("/api/stocksTrades", data);
        setIsSubmitSuccessful(true);
        setOpenDialog(false);
      } catch (error) {
        console.log(error);
        setError("An unexpected error has occured.");
      }
    } catch (error) {
      console.log(error);
      setError("An unexpected error has occured.");
      
    }
  };

  // Reset the form after a successful submission
  useEffect(() => {
    if (isSubmitSuccessful) {
      reset();
      setIsSubmitSuccessful(false);
    }
  }),
    [isSubmitSuccessful];

  return (
    <div className=" max-w-xl">
      {error && (
        <Callout.Root color="red" className="my-2">
          <Callout.Text>{error}</Callout.Text>
        </Callout.Root>
      )}
      <Dialog.Root open={openDialog} onOpenChange={setOpenDialog}>
        <Dialog.Trigger>
          <Button>Add Trade</Button>
        </Dialog.Trigger>

        <Dialog.Content maxWidth="600px">
          <Dialog.Title>Add a Stock Trade</Dialog.Title>

          <form onSubmit={handleSubmit(onSubmit)}>
            <Flex direction="column" gap="3">
              {/* Date */}
              <Flex gap="3" align="center">
                <label className=" w-12">
                  <Text as="div" size="2" mb="1" weight="bold">
                    Date
                  </Text>
                </label>
                <input
                  type="date"
                  // defaultValue={getValues("date").toISOString().substring(0, 10)}
                  {...register("date", {
                    valueAsDate: true,
                    required: {
                      value: true,
                      message: "Date of Birth is required",
                    },
                  })}
                  className="px-2"
                />
              </Flex>
              <ErrorMessage>{errors.date?.message}</ErrorMessage>

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
                  render={({ field: { onChange, value } }) => (
                    <Select.Root onValueChange={onChange} defaultValue={value}>
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
              <ErrorMessage>{errors.trader?.message}</ErrorMessage>

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
                  render={({ field: { onChange, value } }) => (
                    <Select.Root onValueChange={onChange} defaultValue={value}>
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
              <ErrorMessage>{errors.broker?.message}</ErrorMessage>

              {/* Ticker */}
              <Flex gap="3" align="center">
                <label className="w-12">
                  <Text as="div" size="2" mb="1" weight="bold">
                    Ticker
                  </Text>
                </label>
                <TextField.Root
                  {...register("ticker", {
                    required: { value: true, message: "Ticker is required" },
                  })}
                  placeholder="Enter a ticker symbol"
                  onBlur={async () => {
                    setCheckingTicker(true);
                    setTickerFound(true);
                    try {
                      const res = await axios.get(
                        `/api/stocks/?ticker=${getValues("ticker")}`
                      );
                      console.log("🚀 ~ onBlur=async ~ res:", res);
                      setStockName(res.data.longName);
                    } catch (error) {
                      setTickerFound(false);
                    }
                    setCheckingTicker(false);
                  }}
                />
                <Spinner loading={checkingTicker} />
              </Flex>
              <ErrorMessage>{errors.ticker?.message}</ErrorMessage>
              <ErrorMessage>{!tickerFound && "Ticker not found."}</ErrorMessage>
              <StockName>{tickerFound && stockName}</StockName>

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
                  render={({ field: { onChange, value } }) => (
                    <Select.Root onValueChange={onChange} defaultValue={value}>
                      <Select.Trigger />
                      <Select.Content>
                        <Select.Group>
                          <Select.Item value="Buy">Buy</Select.Item>
                          <Select.Item value="Sell">Sell</Select.Item>
                          <Select.Item value="Split">Split</Select.Item>
                        </Select.Group>
                      </Select.Content>
                    </Select.Root>
                  )}
                />
              </Flex>
              <ErrorMessage>{errors.action?.message}</ErrorMessage>

              {/* Number of Shares */}
              <Flex gap="3" align="center">
                <label className="w-12">
                  <Text as="div" size="2" mb="1" weight="bold">
                    Shares
                  </Text>
                </label>
                <TextField.Root
                  className="px-2"
                  {...register("shares", { valueAsNumber: true })}
                  onBlur={calcAmount}
                  onFocus={(e) => e.target.select()}
                />
              </Flex>
              <ErrorMessage>{errors.shares?.message}</ErrorMessage>

              {/* Price */}
              <Flex gap="3" align="center">
                <label className="w-12">
                  <Text as="div" size="2" mb="1" weight="bold">
                    Price
                  </Text>
                </label>
                <TextField.Root
                  className="px-2"
                  {...register("price", { valueAsNumber: true })}
                  onBlur={calcAmount}
                  onFocus={(e) => e.target.select()}
                />
              </Flex>
              <ErrorMessage>{errors.price?.message}</ErrorMessage>

              {/* Fees */}
              <Flex gap="3" align="center">
                <label className="w-12">
                  <Text as="div" size="2" mb="1" weight="bold">
                    Fees
                  </Text>
                </label>
                <TextField.Root
                  className="px-2"
                  {...register("fees", { valueAsNumber: true })}
                  onBlur={calcAmount}
                  onFocus={(e) => e.target.select()}
                />
              </Flex>
              <ErrorMessage>{errors.fees?.message}</ErrorMessage>

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

            {/* SimpleMDE does not accept additonal props
            Use Controller to register it with react-hook-form */}
            <Controller
              name="notes"
              control={control}
              render={({ field }) => (
                <SimpleMDE placeholder="Description" {...field} />
              )}
            />

            {/* Notes */}
            {/* <Flex gap="3" align="center">
              <label className="w-12">
                <Text as="div" size="2" mb="1" weight="bold">
                  Notes
                </Text>
              </label>
              <Controller
              name="notes"
              control={control}
              render={({ field }) => (
                <Box maxWidth="300px">

                  <TextArea placeholder="Description" {...field} />
                </Box>
              )}
            />
            </Flex> */}

            <Flex gap="3" mt="4" justify="end">
              <Dialog.Close>
                <Button variant="soft" color="gray">
                  Cancel
                </Button>
              </Dialog.Close>
              <Button
                type="submit"
                disabled={!tickerFound || Object.keys(errors).length !== 0}
              >
                Save <Spinner loading={isSubmitting} />
              </Button>
            </Flex>
          </form>
        </Dialog.Content>
      </Dialog.Root>
    </div>
  );
};

export default AddStockTrade;
