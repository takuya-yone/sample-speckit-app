import type { Meta, StoryObj } from "@storybook/react";
import { ProductGrid } from "./ProductGrid";
import { products } from "../../data/products";
import { Toaster } from "../ui/sonner";

const meta = {
  component: ProductGrid,
  parameters: {
    layout: "fullscreen",
  },
  decorators: [
    (Story) => (
      <>
        <Story />
        <Toaster />
      </>
    ),
  ],
} satisfies Meta<typeof ProductGrid>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    products,
  },
};

export const Empty: Story = {
  args: {
    products: [],
  },
};
