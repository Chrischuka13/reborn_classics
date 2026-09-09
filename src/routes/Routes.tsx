import {
  createBrowserRouter,
  RouterProvider,
  type RouteObject,
} from "react-router";
import RootLayout from "../layouts/RootLayout.tsx";
import SuspenseUi from "../components/ui/SuspenseUi.tsx";
import ClothLayout from "../layouts/ClothLayout.tsx";

const routes: RouteObject[] = [
  {
    path: "/",
    Component: RootLayout,
    hydrateFallbackElement: <SuspenseUi />,
    children: [
      {
        index: true,
        lazy: async () => {
          const { default: Component } = await import("../pages/home/Home.tsx");
          return { Component };
        },
      },
      {
        path: "about",
        lazy: async () => {
          const { default: Component } = await import("../pages/infos/AboutUs.tsx");
          return { Component };
        },
      },
      {
        path: "contact",
        lazy: async () => {
          const { default: Component } = await import("../pages/infos/ContactUs.tsx");
          return { Component };
        },
      },
      {
        path: "admin",
        lazy: async () => {
          const { default: Component } = await import("../features/AdminCreateProduct.tsx");
          return { Component };
        },
      },
  
      {
        path: "en-ng/collections",
        Component: ClothLayout,
        children: [
          {
            path: "collection-9-mens", // URL: /en-ng/collections/collection-9-mens
            lazy: async () => {
              const { default: Component } = await import("../pages/ForMenPage.tsx");
              return { Component };
            },
          },
          {
            path: "collection-9-womens", // URL: /en-ng/collections/collection-9-women
            lazy: async () => {
              const { default: Component } = await import("../pages/OnlyWomenPage.tsx");
              return { Component };
            },
          },
          {
            path: "apparels", // URL: /en-ng/collections/products
            lazy: async () => {
              const { default: Component } = await import("../pages/products/AllProducts.tsx");
              return { Component };
            },
          },
          {
            path: ":categoryName", // URL: /en-ng/collections/mlb-all-star
            lazy: async () => {
              const { default: Component } = await import("../pages/products/Categories.tsx");
              return { Component };
            },
          },
          {
            path: "shirt", // URL: /en-ng/collections/mlb-all-star
            lazy: async () => {
              const { default: Component } = await import("../pages/products/PoloShirtPage.tsx");
              return { Component };
            },
          },
          {
            path: "complete-set", // URL: /en-ng/collections/complete-sets
            lazy: async () => {
              const { default: Component } = await import("../pages/products/CompleteSetPage.tsx");
              return { Component };
            },
          },
          {
            path: "apparel/:slug", // URL: /en-ng/collections/button-shirts/:slug
            lazy: async () => {
              const { default: Component } = await import("../pages/products/ProductDetails.tsx");
              return { Component };
            },
          },
          {
            path: "explore", // URL: /en-ng/collections/button-shirts/:slug
            lazy: async () => {
              const { default: Component } = await import("../pages/explore/ExplorePage.tsx");
              return { Component };
            },
          },
        ],
      },
    ],
  },
];

// Defined outside the component to prevent re-creating the router on every re-render
const router = createBrowserRouter(routes);

const Routes = () => {
  return <RouterProvider router={router} />;
};

export default Routes;