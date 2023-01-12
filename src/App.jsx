import React, { useMemo, useState } from 'react';
import { AuthContext } from '.';
import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import DemandeAddPage from './Pages/DemandeAddPage';
import DemandeListPage from './Pages/DemandeListPage';
import DemandePage from './Pages/DemandePage';
import DemandeUpdatePage from './Pages/DemandeUpdatePage';
import DocumentsAddPage from './Pages/DocumentsAddPage';
import HomePage from './Pages/HomePage';
import LoginPage from './Pages/LoginPage';
import UserAddPage from './Pages/UserAddPage';
import UsersPage from './Pages/UsersPage';

const router = createBrowserRouter([
  {
    path: '/',
    element: <HomePage />
  },
  {
    path: '/demandes/add',
    element: <DemandeAddPage />
  },
  {
    path: '/demandes',
    element: <DemandeListPage />
  },
  {
    path: '/demandes/:id/documents/add',
    element: <DocumentsAddPage />
  },
  {
    path: '/demandes/:id/update',
    element: <DemandeUpdatePage />
  },
  {
    path: '/demandes/:id',
    element: <DemandePage />
  },
  {
    path: '/login',
    element: <LoginPage />
  },
  {
    path: '/users/add',
    element: <UserAddPage />
  },
  {
    path: '/users',
    element: <UsersPage />
  }
]);

const App = () => {
  const [role, setRole] = useState(null);
  const [user, setUser] = useState(null);
  const cxtProvider = useMemo(
    () => ({
      role,
      setRole,
      user,
      setUser
    }),
    [role, setRole, user, setUser]
  );
  return (
    <AuthContext.Provider value={cxtProvider}>
      <RouterProvider router={router} />
    </AuthContext.Provider>
  );
};

export default App;
