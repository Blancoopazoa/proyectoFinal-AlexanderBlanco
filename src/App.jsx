import "./App.css";
import { useState } from "react";
import { Nav } from "./components/Nav/Nav";
import { Footer } from "./components/Footer/Footer";
import Swal from "sweetalert2";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import { ItemDetailPage } from "./pages/ItemDetail/ItemDetail";
import { HomePage } from "./pages/HomePage/HomePage";
import { CategoryPage } from "./pages/CategoryPage/CategoryPage";
import { CartPage } from "./pages/CartPage/CartPage";

function App() {
  const [cartItems, setCartItems] = useState([]);

  const addToCart = (product) => {
    const existingItem = cartItems.find((item) => item.id === product.id);

    if (existingItem) {
      Swal.fire({
        position: "top-end",
        icon: "info",
        text: "Se agrego un item al carrito",
        showConfirmButton: false,
        timer: 700,
      });
      const updatedCartItems = cartItems.map((item) =>
        item.id === product.id ? { ...item, quantity: item.quantity + 1 } : item
      );
      setCartItems(updatedCartItems);
    } else {
      setCartItems([...cartItems, { ...product, quantity: 1 }]);
      Swal.fire({
        position: "top-end",
        icon: "info",
        text: "Se agrego un item al carrito",
        showConfirmButton: false,
        timer: 700,
      });
    }
  };
  const handleQuantityChange = (id, operation) => {
    const updatedCartItems = cartItems.map((item) => {
      if (item.id === id) {
        let updatedQuantity = item.quantity;
        if (operation === "+") {
          updatedQuantity++;
        } else if (operation === "-" && item.quantity > 1) {
          updatedQuantity--;
        }
        return { ...item, quantity: updatedQuantity };
      }
      return item;
    });
    setCartItems(updatedCartItems);
  };

  return (
    <Router>
      <Nav cartItems={cartItems} />
      <Routes>
        <Route path="/" element={<HomePage addToCart={addToCart} />} />
        <Route path="/item/:id" element={<ItemDetailPage addToCart={addToCart} />}/>
        <Route path="/category/:category" element={<CategoryPage addToCart={addToCart} />}/>
        <Route path="/category/:category/item/:id" element={<ItemDetailPage addToCart={addToCart}/>}/>
        <Route path="/cart" element={<CartPage cartItems={cartItems} setCartItems={setCartItems} handleQuantityChange={handleQuantityChange}/>}/>
        <Route path='*' element={<h1>404 NOT FOUND</h1>} />
      </Routes>
      <Footer />
    </Router>
  );
}

export default App;
