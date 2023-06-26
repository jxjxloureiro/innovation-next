import Cart from '@/components/Cart';
import Navbar from '@/components/ui/navbar';
import { CartProvider } from '@/lib/CartContext';


function ProductsList() {
    return (
        <CartProvider>
            <Navbar />
            <Cart />
        </CartProvider>
    );
}

export default ProductsList;