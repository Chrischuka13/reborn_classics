import { Outlet, ScrollRestoration } from "react-router";
import NavBar from "../components/NavBar";
import Footer from "../components/Footer";
import { CartProvider } from "../context/CartContext";
import CartDrawer from "../components/CartDrawer";
import SearchDrawer from "../components/SearchDrawer";
import { useState } from "react";
import FavoritesDrawer from "../components/FavoritesDrawer";


export default function RootLayout(){
    const [searchOpen, setSearchOpen] = useState(false);
    const [favoritesOpen, setFavoritesOpen] = useState(false);
    return (
        <div>
            <CartProvider>
                <NavBar onOpenSearch={()=> setSearchOpen(true)} onOpenFavorites={()=> setFavoritesOpen(true)}/>
                <ScrollRestoration/>
                <main className="flex-1">
                    <Outlet/>
                </main>
                <CartDrawer/>
                <SearchDrawer isOpen={searchOpen} onClose={()=> setSearchOpen(false)}/>
                <FavoritesDrawer isOpen={favoritesOpen} onClose={() => setFavoritesOpen(false)} />
                <Footer/>
            </CartProvider>

        </div>
    )
}