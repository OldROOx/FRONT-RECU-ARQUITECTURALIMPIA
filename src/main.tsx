import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { RouterProvider } from 'react-router-dom'
import './index.css'

import {navigationWrapper} from "./core/navigation/NavegationWrapper.tsx";

const rootElement = document.getElementById('root');
if (rootElement) {
    createRoot(rootElement).render(
        <StrictMode>
            <RouterProvider router={navigationWrapper} />
        </StrictMode>
    );
}