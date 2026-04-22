import {
  Form,
  redirect,
  useFetcher,
  useNavigate,
  type ActionFunctionArgs,
} from "react-router-dom";
import { deleteProduct } from "../services/ProductService";
import type { Product } from "../types";
import { formatCurrency } from "../utils";

type ProductDetailProps = {
  product: Product;
};

// eslint-disable-next-line react-refresh/only-export-components
export async function action({ params }: ActionFunctionArgs) {
  if (params.id !== undefined) {
    await deleteProduct(+params.id);
    return redirect("/");
  }
}

export default function ProductDetail({ product }: ProductDetailProps) {
  const fetcher = useFetcher();
  const navigate = useNavigate();
  const isAvailable = product.availability;

  return (
    <tr className="border-b">
      <td className="p-3 text-lg text-gray-800"> {product.name} </td>
      <td className="p-3 text-lg text-gray-800">
        {formatCurrency(product.price)}
      </td>
      <td className="p-3 text-lg text-gray-800">
        <fetcher.Form method="POST">
          <button
            type="submit"
            name="id"
            value={product.id}
            className={`${
              isAvailable ? "text-black" : "text-red-600"
            } border-black-100 w-full rounded-lg border p-2 text-sm font-bold uppercase hover:cursor-pointer`}
          >
            {isAvailable ? "Disponible" : "No disponible"}
          </button>
        </fetcher.Form>
      </td>
      <td className="p-3 text-lg text-gray-800">
        <div className="flex items-center gap-2">
          <button
            onClick={() =>
              navigate(`productos/${product.id}/editar`, {
                state: {
                  product,
                },
              })
            }
            className="w-full cursor-pointer rounded-lg bg-indigo-600 p-2 text-center text-xs font-bold text-white uppercase"
          >
            Editar
          </button>

          <Form
            className="w-full"
            method="POST"
            action={`productos/${product.id}/eliminar`}
            onSubmit={(e) => {
              if (!confirm("¿Eliminar?")) {
                e.preventDefault();
              }
            }}
          >
            <input
              type="submit"
              value="Eliminar"
              className="w-full cursor-pointer rounded-lg bg-red-600 p-2 text-center text-xs font-bold text-white uppercase"
            ></input>
          </Form>
        </div>
      </td>
    </tr>
  );
}
