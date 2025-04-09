import { observer } from "mobx-react-lite";
import { UserFormViewModel } from "../viewmodels/UserFormViewModel";
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";

type Props = {
    viewModel: UserFormViewModel;
    userId?: number;
};

const UserForm = observer(({ viewModel, userId }: Props) => {
    const navigate = useNavigate();

    useEffect(() => {
        viewModel.reset();
        if (userId) {
            viewModel.loadUser(userId);
        }
    }, [viewModel, userId]);

    useEffect(() => {
        if (viewModel.success) {
            navigate("/users");
        }
    }, [viewModel.success, navigate]);

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        viewModel.saveUser();
    };

    return (
        <form onSubmit={handleSubmit} className="bg-white p-6 rounded-xl shadow-md">
            <h2 className="text-2xl font-bold text-gray-700 mb-6">
                {userId ? "Editar Usuario" : "Crear Usuario"}
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

            <div className="mb-6">
                <label className="block text-gray-600 text-sm mb-1">Email</label>
                <input
                    type="email"
                    value={viewModel.email}
                    onChange={(e) => viewModel.setEmail(e.target.value)}
                    className="w-full p-2 border rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500"
                    required
                />
            </div>

            <div className="flex space-x-4">
                <button
                    type="submit"
                    disabled={viewModel.loading}
                    className="bg-blue-500 text-white py-2 px-4 rounded-xl hover:bg-blue-600 transition w-full"
                >
                    {viewModel.loading ? "Guardando..." : "Guardar Usuario"}
                </button>

                <button
                    type="button"
                    onClick={() => navigate("/users")}
                    className="bg-gray-300 text-gray-700 py-2 px-4 rounded-xl hover:bg-gray-400 transition"
                >
                    Cancelar
                </button>
            </div>
        </form>
    );
});

export default UserForm;