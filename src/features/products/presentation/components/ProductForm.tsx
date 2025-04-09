import { observer } from "mobx-react-lite";
import { ProductFormViewModel } from "../viewmodels/ProductFormViewModel";
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";

type Props = {
    viewModel: ProductFormViewModel;
    productId?: number;
};

const ProductForm = observer(({ viewModel, productId }: Props) => {
    const navigate = useNavigate();

    useEffect(() => {
        const initForm = async () => {
            viewModel.reset();
            await viewModel.loadUsers();
            if (productId) {
                await viewModel.loadProduct(productId);
            }
        };

        initForm();
    }, [viewModel, productId]);

    useEffect(() => {
        if (viewModel.success) {
            navigate("/products");
        }
    }, [viewModel.success, navigate]);

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        await viewModel.saveProduct();
    };

    return (
        <form onSubmit={handleSubmit} className="bg-white p-6 rounded-xl shadow-md">
            <h2 className="text-2xl font-bold text-gray-700 mb-6">
                {productId ? "Editar Producto" : "Crear Producto"}
            </h2>

            {viewModel.error && (
                <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded mb-4" role="alert">
                    <span className="block sm:inline">{viewModel.error}</span>
                </div>
            )}

            <div className="mb-4">
                <label className="block text-gray-600 text-sm mb-1">Nombre</label>
                <input
                    type="text"
                    value={viewModel.name}
                    onChange={(e) => viewModel.setName(e.target.value)}
                    className="w-full p-2 border rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500"
                    required
                />
            </div>

            <div className="mb-4">
                <label className="block text-gray-600 text-sm mb-1">Precio</label>
                <input
                    type="number"
                    step="0.01"
                    min="0"
                    value={viewModel.price}
                    onChange={(e) => viewModel.setPrice(e.target.value)}
                    className="w-full p-2 border rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500"
                    required
                />
            </div>

            <div className="mb-6">
                <label className="block text-gray-600 text-sm mb-1">Usuario</label>
                <select
                    value={viewModel.userId}
                    onChange={(e) => viewModel.setUserId(e.target.value)}
                    className="w-full p-2 border rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500"
                    required
                >
                    <option value="">Seleccionar usuario</option>
                    {viewModel.users.map(user => (
                        <option key={user.id} value={user.id}>
                            {user.name} ({user.email})
                        </option>
                    ))}
                </select>
            </div>

            <div className="flex space-x-4">
                <button
                    type="submit"
                    disabled={viewModel.loading}
                    className="bg-blue-500 text-white py-2 px-4 rounded-xl hover:bg-blue-600 transition w-full"
                >
                    {viewModel.loading ? "Guardando..." : "Guardar Producto"}
                </button>

                <button
                    type="button"
                    onClick={() => navigate("/products")}
                    className="bg-gray-300 text-gray-700 py-2 px-4 rounded-xl hover:bg-gray-400 transition"
                >
                    Cancelar
                </button>
            </div>
        </form>
    );
});

export default ProductForm;