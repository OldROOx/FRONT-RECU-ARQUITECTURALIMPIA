import { createBrowserRouter } from "react-router-dom";
import Dashboard from "../../features/dashboard/presentation/pages/Dashboard.tsx";
import UserListView from "../../features/users/presentation/pages/UserListView.tsx";
import UserCreateView from "../../features/users/presentation/pages/UserCreateView.tsx";
import UserEditView from "../../features/users/presentation/pages/UserEditView.tsx";
import ProductListView from "../../features/products/presentation/pages/ProductListView.tsx";
import ProductCreateView from "../../features/products/presentation/pages/ProductCreateView.tsx";
import ProductEditView from "../../features/products/presentation/pages/ProductEditView.tsx";

export const navigationWrapper = createBrowserRouter([
    {
        path: "/",
        element: <Dashboard />,
    },
    {
        path: "/users",
        element: <UserListView />,
    },
    {
        path: "/users/create",
        element: <UserCreateView />,
    },
    {
        path: "/users/:id",
        element: <UserEditView />,
    },
    {
        path: "/products",
        element: <ProductListView />,
    },
    {
        path: "/products/create",
        element: <ProductCreateView />,
    },
    {
        path: "/products/:id",
        element: <ProductEditView />,
    }
]);