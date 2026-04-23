import { Toaster as Sonner, type ToasterProps } from "sonner";

function Toaster({ ...props }: ToasterProps) {
  return (
    <Sonner
      className="toaster group"
      style={
        {
          "--normal-bg": "var(--color-white)",
          "--normal-text": "var(--color-gray-900)",
          "--normal-border": "var(--color-gray-200)",
        } as React.CSSProperties
      }
      {...props}
    />
  );
}

export { Toaster };
