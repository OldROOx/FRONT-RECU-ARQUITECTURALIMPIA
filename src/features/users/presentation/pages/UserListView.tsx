import { Link } from "react-router-dom";
import UserList from "../components/UserList.tsx";
import { UserListViewModel } from "../viewmodels/UserListViewModel.ts";

const UserListView = () => {

    const viewModel = UserListViewModel.getInstance();

    return (
        <div className="min-h-screen bg-gray-100 p-6">
            <div className="max-w-6xl mx-auto">
                <div className="flex justify-between items-center mb-6">
                    <h1 className="text-3xl font-bold text-blue-500">Usuarios</h1>
                    <div className="flex space-x-2">
                        <Link
                            to="/users/create"
                            className="bg-blue-500 text-white py-2 px-4 rounded-xl hover:bg-blue-600 transition"
                        >
                            Nuevo Usuario
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
                    <UserList viewModel={viewModel} />
                </div>
            </div>
        </div>
    );
};

export default UserListView;