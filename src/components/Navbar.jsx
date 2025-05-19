import { Link } from "react-router-dom";

function Navbar() {
  return (
    <div className="bg-black flex justify-between px-14 py-4 font-bold">
      <p className="text-white">TanStack Query</p>
      <ul className="flex gap-3 justify-end font-bold text-white">
        <Link to="/">Home</Link>
        <Link to="/about">About</Link>
        <Link to="/products">Products</Link>
        <Link to="/infinteScroll">InfinteScroll</Link>
      </ul>
    </div>
  );
}

export default Navbar;
