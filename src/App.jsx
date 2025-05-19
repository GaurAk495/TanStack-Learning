import { Routes, Route } from "react-router-dom";
import Home from "./pages/Home";
import Products from "./pages/Products";
import Product from "./pages/Product";
import Navbar from "./components/Navbar";
import About from "./pages/About";
import InfinteScroll from "./pages/InfinteScroll";

function App() {
  return (
    <>
      <Navbar />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/about" element={<About />} />
        <Route path="/products" element={<Products />} />
        <Route path="/post/:id" element={<Product />} />
        <Route path="/infinteScroll" element={<InfinteScroll />} />
      </Routes>
    </>
  );
}
export default App;
