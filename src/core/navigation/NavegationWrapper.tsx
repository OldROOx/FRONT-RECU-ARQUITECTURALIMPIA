import { createBrowserRouter } from "react-router-dom";
import Dashboard from "../../features/dashboard/presentation/pages/Dashboard";
import UserListView from "../../features/users/presentation/pages/UserListView";
import UserCreateView from "../../features/users/presentation/pages/UserCreateView";
import UserEditView from "../../features/users/presentation/pages/UserEditView";
import ProductListView from "../../features/products/presentation/pages/ProductListView";
import ProductCreateView from "../../features/products/presentation/pages/ProductCreateView";
import ProductEditView from "../../features/products/presentation/pages/ProductEditView";

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