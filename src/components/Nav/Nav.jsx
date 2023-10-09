import './Nav.css'
import { CartWidget } from '../CartWidget/CartWidget.jsx';
import { Link } from 'react-router-dom';
import React from 'react'


export function Nav( {cartItems}) {
    return (

        <header className='header'>
            <div className='logo'>
            <Link className='li' to='/'> <img src="/totoro.svg" alt="Logo-Ecommerce" /></Link>
            </div>
            <article className='carrito'>
                <CartWidget cartItems={cartItems} />
            </article>
            <nav >
            <section className='container'>
            <ul className='category-container'>
            <Link to="/category/laptops"><li className='category'>Notebooks</li></Link>
            <Link to="/category/smartphones"> <li className='category'>Celulares</li></Link>
            <Link to="/category/fragrances"> <li className='category'>Perfumes</li></Link>
            <Link to="/category/home-decoration"> <li className='category'>Hogar</li></Link>
            </ul>
            </section>
            </nav>
        </header>

    )
}