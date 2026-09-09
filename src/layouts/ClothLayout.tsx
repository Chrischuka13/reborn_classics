import { Toaster } from "react-hot-toast";
import { Outlet, ScrollRestoration } from "react-router";

export default function ClothLayout(){
    return(
        <div>
            <Toaster position="top-right" toastOptions={{duration: 3000, style: {
            background: '#333', color: '#fff', },}}/>
            <ScrollRestoration
                getKey={(location) => {
                return location.pathname;
                }}
            />
            <Outlet />
        </div>
    )
}