import type { Meta, StoryObj } from "@storybook/react";
import { fn } from "storybook/test";
import { CartDrawer } from "./CartDrawer";
import { useCartStore } from "../../stores/useCartStore";

const meta = {
  component: CartDrawer,
  parameters: {
    layout: "fullscreen",
  },
  argTypes: {
    isOpen: {
      control: "boolean",
    },
  },
  decorators: [
    (Story) => {
      useCartStore.setState({ items: [] });
      return <Story />;
    },
  ],
} satisfies Meta<typeof CartDrawer>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Open: Story = {
  args: {
    isOpen: true,
    onClose: fn(),
  },
};

export const WithItems: Story = {
  args: {
    isOpen: true,
    onClose: fn(),
  },
  decorators: [
    (Story) => {
      useCartStore.setState({
        items: [
          { productId: "1", quantity: 2 },
          { productId: "2", quantity: 1 },
          { productId: "3", quantity: 3 },
        ],
      });
      return <Story />;
    },
  ],
};

export const Closed: Story = {
  args: {
    isOpen: false,
    onClose: fn(),
  },
};
