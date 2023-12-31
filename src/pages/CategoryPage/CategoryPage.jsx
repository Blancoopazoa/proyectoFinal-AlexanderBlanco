import { useState, useEffect } from "react";
import { collection, query, getDocs, where } from "firebase/firestore";
import { db } from "../../Firebase/FirebaseConfig";
import { useParams, Link } from "react-router-dom";
import AddShoppingCartIcon from "@mui/icons-material/AddShoppingCart";

export const CategoryPage = ({ addToCart }) => {
  const { category } = useParams();
  const [productData, setProductData] = useState([]);
  useEffect(() => {
    const getProduct = async () => {
      const q = query(
        collection(db, "products"),
        where("category", "==", category)
      );
      const docs = [];
      const querySnapshot = await getDocs(q);
      querySnapshot.forEach((doc) => {
        docs.push({ ...doc.data(), id: doc.id });
      });
      setProductData(docs);
    };
    getProduct();
  }, [category]);
  const handleAddToCart = (id) => {
    const selectedProduct = productData.find((product) => product.id === id);
    if (selectedProduct) {
      addToCart(selectedProduct);
    }
  };

  return (
    <>
      <main className="products">
        <ul>
          {productData.map((product) => (
            <li key={product.id}>
              <Link to={`item/${product.id}`}>
                <img src={product.thumbnail} alt={product.title} />
              </Link>
              <div>
                <strong className="title">{product.title}</strong>
                <p className="price">$USD {product.price}</p>
              </div>

              <button onClick={() => handleAddToCart(product.id)}>
                <AddShoppingCartIcon />
              </button>
            </li>
          ))}
        </ul>
      </main>
    </>
  );
};
