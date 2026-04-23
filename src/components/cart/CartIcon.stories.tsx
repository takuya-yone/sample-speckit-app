import type { Meta, StoryObj } from "@storybook/react";
import { fn } from "storybook/test";
import { CartIcon } from "./CartIcon";
import { useCartStore } from "../../stores/useCartStore";

const meta = {
  component: CartIcon,
  decorators: [
    (Story) => {
      useCartStore.setState({ items: [] });
      return <Story />;
    },
  ],
} satisfies Meta<typeof CartIcon>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Empty: Story = {
  args: {
    onClick: fn(),
  },
};

export const WithItems: Story = {
  args: {
    onClick: fn(),
  },
  decorators: [
    (Story) => {
      useCartStore.setState({
        items: [
          { productId: "1", quantity: 1 },
          { productId: "2", quantity: 1 },
          { productId: "3", quantity: 1 },
        ],
      });
      return <Story />;
    },
  ],
};

export const OverflowBadge: Story = {
  args: {
    onClick: fn(),
  },
  decorators: [
    (Story) => {
      useCartStore.setState({
        items: [
          { productId: "1", quantity: 99 },
          { productId: "2", quantity: 2 },
        ],
      });
      return <Story />;
    },
  ],
};
