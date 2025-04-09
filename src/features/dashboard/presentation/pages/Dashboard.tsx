import { Link } from "react-router-dom";

const Dashboard = () => {
    return (
        <div className="min-h-screen bg-gray-100 p-6">
            <div className="max-w-4xl mx-auto">
                <h1 className="text-4xl font-bold text-blue-500 mb-8">API Hexagonal Dashboard</h1>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div className="bg-white p-6 rounded-xl shadow-md">
                        <h2 className="text-2xl font-bold text-gray-700 mb-4">Gestión de Usuarios</h2>
                        <p className="text-gray-600 mb-4">
                            Administra los usuarios registrados en el sistema.
                        </p>
                        <Link
                            to="/users"
                            className="block w-full bg-blue-500 text-white text-center py-2 rounded-xl hover:bg-blue-600 transition"
                        >
                            Ver Usuarios
                        </Link>
                    </div>

                    <div className="bg-white p-6 rounded-xl shadow-md">
                        <h2 className="text-2xl font-bold text-gray-700 mb-4">Gestión de Productos</h2>
                        <p className="text-gray-600 mb-4">
                            Administra los productos disponibles en el sistema.
                        </p>
                        <Link
                            to="/products"
                            className="block w-full bg-blue-500 text-white text-center py-2 rounded-xl hover:bg-blue-600 transition"
                        >
                            Ver Productos
                        </Link>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Dashboard;