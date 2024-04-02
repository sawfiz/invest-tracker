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

const AddStockTrade = () => {
  const [price, setPrice] = useState(0);
  const [shares, setShares] = useState(0);
  const [fees, setFees] = useState(0);
  const amount = price * shares + fees;

  return (
    <div>
      <Dialog.Root>
        <Dialog.Trigger>
          <Button>Add Trade</Button>
        </Dialog.Trigger>

        <Dialog.Content maxWidth="300px">
          <Dialog.Title>Add a Stock Trade</Dialog.Title>

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
              <TextField.Root placeholder="Number of shares" />
            </Flex>

            {/* Price */}
            <Flex gap="3" align="center">
              <label className="w-12">
                <Text as="div" size="2" mb="1" weight="bold">
                  Price
                </Text>
              </label>
              <TextField.Root placeholder="Share price" />
            </Flex>

            {/* Fees */}
            <Flex gap="3" align="center">
              <label className="w-12">
                <Text as="div" size="2" mb="1" weight="bold">
                  Fees
                </Text>
              </label>
              <TextField.Root placeholder="Fees" />
            </Flex>

            {/* Amount */}
            <Flex gap="3" align="center">
              <label className="w-16">
                <Text as="div" size="2" mb="1" weight="bold">
                  Amount
                </Text>
              </label>
              <TextField.Root disabled={true}> {amount} </TextField.Root>
            </Flex>
          </Flex>

          <Flex gap="3" mt="4" justify="end">
            <Dialog.Close>
              <Button variant="soft" color="gray">
                Cancel
              </Button>
            </Dialog.Close>
            <Dialog.Close>
              <Button>Save</Button>
            </Dialog.Close>
          </Flex>
        </Dialog.Content>
      </Dialog.Root>
    </div>
  );
};

export default AddStockTrade;
