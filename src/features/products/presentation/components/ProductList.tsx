import { observer } from "mobx-react-lite";
import { ProductListViewModel } from "../viewmodels/ProductListViewModel";
import { Link } from "react-router-dom";
import { useEffect } from "react";

type Props = {
    viewModel: ProductListViewModel;
};

const ProductList = observer(({ viewModel }: Props) => {
    useEffect(() => {

        viewModel.loadInitialData();
    }, [viewModel]);

    const handleUserFilterChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
        const value = e.target.value;
        viewModel.setSelectedUserId(value === "all" ? null : parseInt(value));
    };


    const showLoadingSpinner = viewModel.loading && viewModel.products.length === 0;

    if (viewModel.error) {
        return <div className="text-red-500 py-4">{viewModel.error}</div>;
    }

    return (
        <div>
            <div className="bg-gray-50 p-4 border-b">
                <div className="flex items-center space-x-4">
                    <label className="text-gray-600 text-sm">Filtrar por usuario:</label>
                    <select
                        onChange={handleUserFilterChange}
                        className="p-2 border rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500"
                        value={viewModel.selectedUserId === null ? "all" : viewModel.selectedUserId}
                    >
                        <option value="all">Todos los usuarios</option>
                        {viewModel.users.map(user => (
                            <option key={user.id} value={user.id}>
                                {user.name} ({user.email})
                            </option>
                        ))}
                    </select>
                </div>
            </div>

            {showLoadingSpinner ? (
                <div className="text-center py-4">Cargando productos...</div>
            ) : viewModel.products.length === 0 ? (
                <div className="text-center py-8">
                    <p className="text-gray-500">No hay productos disponibles</p>
                </div>
            ) : (
                <div className="overflow-x-auto">
                    <table className="min-w-full bg-white">
                        <thead className="bg-gray-100">
                        <tr>
                            <th className="py-3 px-4 text-left">ID</th>
                            <th className="py-3 px-4 text-left">Nombre</th>
                            <th className="py-3 px-4 text-left">Precio</th>
                            <th className="py-3 px-4 text-left">ID Usuario</th>
                            <th className="py-3 px-4 text-left">Acciones</th>
                        </tr>
                        </thead>
                        <tbody>
                        {viewModel.products.map(product => (
                            <tr key={product.id} className="border-t">
                                <td className="py-3 px-4">{product.id}</td>
                                <td className="py-3 px-4">{product.name}</td>
                                <td className="py-3 px-4">${product.price.toFixed(2)}</td>
                                <td className="py-3 px-4">{product.userId}</td>
                                <td className="py-3 px-4 flex space-x-2">
                                    <Link
                                        to={`/products/${product.id}`}
                                        className="text-blue-500 hover:text-blue-700"
                                    >
                                        Editar
                                    </Link>
                                    <button
                                        onClick={() => viewModel.deleteProduct(product.id)}
                                        className="text-red-500 hover:text-red-700"
                                    >
                                        Eliminar
                                    </button>
                                </td>
                            </tr>
                        ))}
                        </tbody>
                    </table>
                </div>
            )}
        </div>
    );
});

export default ProductList;