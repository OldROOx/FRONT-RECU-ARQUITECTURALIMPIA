import { Link } from "react-router-dom";
import ProductList from "../components/ProductList.tsx";
import { ProductListViewModel } from "../viewmodels/ProductListViewModel.ts";
import { useEffect } from "react";

const ProductListView = () => {
    // Usamos la instancia singleton
    const viewModel = ProductListViewModel.getInstance();

    useEffect(() => {
        // Solo carga si no hay datos o si se ha marcado como no cargados
        if (!viewModel.dataLoaded && !viewModel.loading) {
            viewModel.loadProducts();
            viewModel.loadUsers();
        }
    }, [viewModel]);

    return (
        <div className="min-h-screen bg-gray-100 p-6">
            <div className="max-w-6xl mx-auto">
                <div className="flex justify-between items-center mb-6">
                    <h1 className="text-3xl font-bold text-blue-500">Productos</h1>
                    <div className="flex space-x-2">
                        <Link
                            to="/products/create"
                            className="bg-blue-500 text-white py-2 px-4 rounded-xl hover:bg-blue-600 transition"
                        >
                            Nuevo Producto
                        </Link>
                        <Link
                            to="/"
                            className="bg-gray-300 text-gray-700 py-2 px-4 rounded-xl hover:bg-gray-400 transition"
                        >
                            Volver
                        </Link>
                    </div>
                </div>

                <div className="bg-white rounded-xl shadow-md overflow-hidden">
                    <ProductList viewModel={viewModel} />
                </div>
            </div>
        </div>
    );
};

export default ProductListView;