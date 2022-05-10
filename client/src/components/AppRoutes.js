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
            <Route path='/WearBestDresses__Online_Shop' element={<MainPage />} />
            <Route path='/WearBestDresses__Online_Shop/catalog' element={<Catalog />} />
            <Route path='/WearBestDresses__Online_Shop/catalog/:category' element={<Catalog />} />
            <Route path='/WearBestDresses__Online_Shop/catalog/:category/page/:page' element={<Catalog />} />
            <Route path='/WearBestDresses__Online_Shop/catalog/page/:page' element={<Catalog />} />
            <Route path='/WearBestDresses__Online_Shop/cart' element={<Cart />} />
            <Route path='/WearBestDresses__Online_Shop/favourite' element={<Favourite />} />
            <Route path='/WearBestDresses__Online_Shop/catalog/product/:id' element={<ProductPage />} />
            <Route path='/WearBestDresses__Online_Shop/catalog/:category/product/:id' element={<ProductPage />} />
            <Route path='*' element={<NotFoundPage />} />
        </Routes>
    )
}

export { AppRoutes }
