import { CartIcon } from "../cart/CartIcon";

interface HeaderProps {
  onCartClick: () => void;
}

export function Header({ onCartClick }: HeaderProps) {
  return (
    <header className="bg-green-800 text-white">
      <nav className="max-w-7xl mx-auto px-4 py-4 flex items-center justify-between">
        <h1 className="text-xl font-bold tracking-wide">こめ市場</h1>
        <CartIcon onClick={onCartClick} />
      </nav>
    </header>
  );
}
