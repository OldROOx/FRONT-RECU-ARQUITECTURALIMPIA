import { RouterProvider } from 'react-router-dom';
import { navigationWrapper } from './core/navigation/NavegationWrapper.tsx';
import './index.css';

const App = () => {
    return <RouterProvider router={navigationWrapper} />;
};

export default App;