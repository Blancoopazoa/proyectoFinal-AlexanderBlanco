import React, { useEffect, useState } from 'react'
import AddShoppingCartIcon from '@mui/icons-material/AddShoppingCart';
import "./ItemListContainer.css"
import { db } from '../../Firebase/FirebaseConfig'
import { collection, query, getDocs, } from "firebase/firestore"
import { Link } from 'react-router-dom';


export const ItemListContainer = ({addToCart}) => {

    const [products, setProducts] = useState([])
    useEffect(() => {
        const getProduct = async () => {
            const q = query(collection(db, "products"))
            const docs = []
            const querySnapshot = await getDocs(q)
            querySnapshot.forEach((doc) => {
                docs.push({ ...doc.data(), id: doc.id })
            })
            setProducts(docs)
        }
        getProduct()
    }, [])

    const handleAddToCart = (id) => {
        const selectedProduct = products.find((product) => product.id === id);
        if (selectedProduct) {
          addToCart(selectedProduct); 
        }
      };
    
    return (
        <>




            <main className='products'>
                <ul>
                    {
                        products.map(product => (

                            <li key={product.id}>
                                <Link to={`item/${product.id}`}>
                                    <img
                                        src={product.thumbnail}
                                        alt={product.title} />
                                </Link>
                                <div>
                                    <strong className='title'>{product.title}</strong>
                                    <p className='price'>$USD {product.price}</p>
                                </div>

                                <button onClick={ () => handleAddToCart(product.id)}>
                                    <AddShoppingCartIcon />
                                </button>

                            </li>

                        ))
                    }
                </ul>
            </main>
        </>

    )
}



