import type { Meta, StoryObj } from "@storybook/react";
import { CartItem } from "./CartItem";
import { products } from "../../data/products";

const meta = {
  component: CartItem,
  argTypes: {
    item: {
      control: "object",
    },
    product: {
      control: "object",
    },
  },
} satisfies Meta<typeof CartItem>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    item: { productId: "1", quantity: 1 },
    product: products[0],
  },
};

export const MaxQuantity: Story = {
  args: {
    item: { productId: "1", quantity: 99 },
    product: products[0],
  },
};
