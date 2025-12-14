import { createBrowserRouter } from "react-router-dom";
import { action as deleteProductAction } from "./components/ProductDetail";
import Layout from "./layouts/Layout";
import EditProduct, {
  action as editProductAction,
  loader as editProductLoader,
} from "./pages/EditProduct";
import NewProduct, { action as newProductAction } from "./pages/NewProduct";
import Products, {
  loader as productsLoader,
  action as updateAvailabilityAction,
} from "./pages/Products";

export const router = createBrowserRouter([
  {
    path: "/",
    element: <Layout />,
    children: [
      {
        index: true,
        element: <Products />,
        loader: productsLoader,
        action: updateAvailabilityAction,
      },
      {
        path: "productos/nuevo",
        element: <NewProduct />,
        action: newProductAction,
      },
      {
        path: "productos/:id/editar", // RDA Pattern
        element: <EditProduct />,
        loader: editProductLoader,
        action: editProductAction,
      },
      {
        path: "productos/:id/eliminar",
        action: deleteProductAction,
      },
    ],
  },
]);
