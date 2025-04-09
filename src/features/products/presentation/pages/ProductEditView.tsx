import { Link, useParams } from "react-router-dom";
import ProductForm from "../components/ProductForm";
import { ProductFormViewModel } from "../viewmodels/ProductFormViewModel";

const ProductEditView = () => {
    const { id } = useParams();
    const productId = id ? parseInt(id) : undefined;
    const viewModel = new ProductFormViewModel();

    return (
        <div className="min-h-screen bg-gray-100 p-6">
            <div className="max-w-lg mx-auto">
                <div className="flex justify-between items-center mb-6">
                    <h1 className="text-3xl font-bold text-blue-500">Editar Producto</h1>
                    <Link
                        to="/products"
                        className="bg-gray-300 text-gray-700 py-2 px-4 rounded-xl hover:bg-gray-400 transition"
                    >
                        Volver
                    </Link>
                </div>

                {productId ? (
                    <ProductForm viewModel={viewModel} productId={productId} />
                ) : (
                    <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded">
                        ID de producto no válido
                    </div>
                )}
            </div>
        </div>
    );
};

export default ProductEditView;