import { observer } from "mobx-react-lite";
import { UserListViewModel } from "../viewmodels/UserListViewModel";
import { Link } from "react-router-dom";
import { useEffect } from "react";

type Props = {
    viewModel: UserListViewModel;
};

const UserList = observer(({ viewModel }: Props) => {
    useEffect(() => {
        viewModel.loadUsers();
    }, [viewModel]);

    if (viewModel.loading) {
        return <div className="text-center py-4">Cargando usuarios...</div>;
    }

    if (viewModel.error) {
        return <div className="text-red-500 py-4">{viewModel.error}</div>;
    }

    if (viewModel.users.length === 0) {
        return <div className="text-center py-4">No hay usuarios registrados</div>;
    }

    return (
        <div className="overflow-x-auto">
            <table className="min-w-full bg-white rounded-xl overflow-hidden">
                <thead className="bg-gray-100">
                <tr>
                    <th className="py-3 px-4 text-left">ID</th>
                    <th className="py-3 px-4 text-left">Nombre</th>
                    <th className="py-3 px-4 text-left">Email</th>
                    <th className="py-3 px-4 text-left">Productos</th>
                    <th className="py-3 px-4 text-left">Acciones</th>
                </tr>
                </thead>
                <tbody>
                {viewModel.users.map(user => (
                    <tr key={user.id} className="border-t">
                        <td className="py-3 px-4">{user.id}</td>
                        <td className="py-3 px-4">{user.name}</td>
                        <td className="py-3 px-4">{user.email}</td>
                        <td className="py-3 px-4">{user.products?.length || 0}</td>
                        <td className="py-3 px-4 flex space-x-2">
                            <Link
                                to={`/users/${user.id}`}
                                className="text-blue-500 hover:text-blue-700"
                            >
                                Editar
                            </Link>
                            <button
                                onClick={() => viewModel.deleteUser(user.id)}
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
    );
});

export default UserList;