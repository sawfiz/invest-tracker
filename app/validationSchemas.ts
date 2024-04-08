import { z } from "zod";

// Define custom error messages
export const customErrorMessages = {
  required: (fieldName: string) => `${fieldName} is required.`,
};

// Define validation schema
export const createStockTradeSchema = z.object({
  date: z.coerce.date().refine((date) => !!date, {
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
  amount: z.number().refine((amount) => !!amount, {
    message: customErrorMessages.required("Amount"),
  }),
  notes: z.string(),
});
