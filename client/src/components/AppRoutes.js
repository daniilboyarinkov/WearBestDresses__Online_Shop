import { Routes, Route } from 'react-router-dom'

import MainPage from '../pages/MainPage/MainPage'
import Catalog from '../pages/Catalog/Catalog'
import ProductPage from '../pages/ProductPage/ProductPage'
import Cart from '../pages/Cart/Cart'
import Favourite from '../pages/Favourite/Favourite'
import NotFoundPage from '../pages/NotFoundPage/NotFoundPage'

const AppRoutes = () => {
    return (
        <Routes>
            <Route path='' element={<MainPage />} />
            <Route path='catalog' element={<Catalog />} />
            <Route path='catalog/:category' element={<Catalog />} />
            <Route path='catalog/:category/page/:page' element={<Catalog />} />
            <Route path='catalog/page/:page' element={<Catalog />} />
            <Route path='cart' element={<Cart />} />
            <Route path='favourite' element={<Favourite />} />
            <Route path='catalog/product/:id' element={<ProductPage />} />
            <Route path='catalog/:category/product/:id' element={<ProductPage />} />
            <Route path='*' element={<NotFoundPage />} />
        </Routes>
    )
}

export { AppRoutes }
