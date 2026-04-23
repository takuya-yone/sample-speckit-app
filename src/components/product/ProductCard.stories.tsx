import type { Meta, StoryObj } from "@storybook/react";
import { ProductCard } from "./ProductCard";
import { products } from "../../data/products";
import { Toaster } from "../ui/sonner";

const meta = {
  component: ProductCard,
  argTypes: {
    product: {
      control: "object",
    },
  },
  decorators: [
    (Story) => (
      <div className="max-w-sm">
        <Story />
        <Toaster />
      </div>
    ),
  ],
} satisfies Meta<typeof ProductCard>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    product: products[0],
  },
};

export const LongName: Story = {
  args: {
    product: {
      ...products[0],
      name: "特別栽培米コシヒカリ プレミアム限定品 新潟県魚沼産 令和七年度新米",
    },
  },
};

export const NoImage: Story = {
  args: {
    product: {
      ...products[0],
      imageUrl: "/images/nonexistent.webp",
    },
  },
};
