import { Link } from "react-router-dom";
import ProductForm from "../components/ProductForm";
import { ProductFormViewModel } from "../viewmodels/ProductFormViewModel";

const ProductCreateView = () => {
    const viewModel = new ProductFormViewModel();

    return (
        <div className="min-h-screen bg-gray-100 p-6">
            <div className="max-w-lg mx-auto">
                <div className="flex justify-between items-center mb-6">
                    <h1 className="text-3xl font-bold text-blue-500">Crear Producto</h1>
                    <Link
                        to="/products"
                        className="bg-gray-300 text-gray-700 py-2 px-4 rounded-xl hover:bg-gray-400 transition"
                    >
                        Volver
                    </Link>
                </div>

                <ProductForm viewModel={viewModel} />
            </div>
        </div>
    );
};

export default ProductCreateView;