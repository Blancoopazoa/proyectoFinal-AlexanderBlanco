import "./ItemDetail.css";
import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
//material ui
import AddShoppingCartIcon from "@mui/icons-material/AddShoppingCart";
//Firebase
import {
  collection,
  query,
  getDocs,
  where,
  documentId,
} from "firebase/firestore";
import { db } from "../../Firebase/FirebaseConfig";
//react router dom
import { useParams } from "react-router-dom";

export const ItemDetailPage = ({ addToCart }) => {
  const { id } = useParams();
  const [productData, setProductData] = useState([]);
  const [quantity, setQuantity] = useState(1);

  useEffect(() => {
    const getProduct = async () => {
      const q = query(
        collection(db, "products"),
        where(documentId(), "==", id)
      );
      const docs = [];
      const querySnapshot = await getDocs(q);
      querySnapshot.forEach((doc) => {
        docs.push({ ...doc.data(), id: doc.id });
      });
      setProductData(docs);
    };
    getProduct();
  }, [id]);

  const handleAddToCart = () => {
    const selectedProduct = productData.find((product) => product.id === id);
    if (selectedProduct) {
      addToCart({ ...selectedProduct, quantity });
    }
  };

  const increaseQuantity = () => {
    setQuantity(quantity + 1);
  };

  const decreaseQuantity = () => {
    if (quantity > 1) {
      setQuantity(quantity - 1);
    }
  };

return (
  <div className="product">
    <div className="volver">
      <Link to="/">
        <button>Volver</button>
      </Link>
    </div>
    <div className="cartGo">
      <Link to="/cart">
        <button>Ir al Carro</button>
      </Link>
    </div>
    <h2>Producto Detalle</h2>
    {productData.map((product) => {
      return (
        <div key={product}>
          <h3>{product.title}</h3>
          <p>$USD {product.price}</p>
          <img src={product.thumbnail} alt={product.title} />
          <div className="description">
            <p>{product.description}</p>
          </div>
          {/* <div className="action-circle-test">
            <button onClick={decreaseQuantity}>-</button>
            <span className="quantity-test">{quantity}</span>
            <button onClick={increaseQuantity}>+</button>
          </div> */}
          <button onClick={handleAddToCart}>
            <AddShoppingCartIcon />
          </button>
        </div>
      );
    })}
  </div>
);
};
