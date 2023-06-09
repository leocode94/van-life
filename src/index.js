import React from 'react';
import ReactDOM from 'react-dom/client';
import {
  RouterProvider,
  createBrowserRouter,
  createRoutesFromElements,
  Route
} from 'react-router-dom';
import './style.css';
import './server';
import About from './pages/About';
import Home from './pages/Home';
import Dashboard from './pages/Host/Dashboard';
import Income from './pages/Host/Income';
import Reviews from './pages/Host/Reviews';
import Vans, { loader as vansLoader } from './pages/Vans';
import VanDetail, { loader as vanDetailLoader } from './pages/VanDetail';
import Layout from './components/Layout';
import HostLayout from './components/HostLayout';
import HostVans, { loader as hostVansLoader } from './pages/Host/HostVans';
import HostVanDetail, { loader as hostVanDetailLoader } from './pages/Host/HostVanDetail';
import HostVanInfo from './pages/Host/HostVanInfo';
import HostVanPricing from './pages/Host/HostVanPricing';
import HostVanPhotos from './pages/Host/HostVanPhotos';
import NotFound from './pages/NotFound';
import Login, { loader as loginLoader, action as loginAction } from './pages/Login';
import Error from './components/Error';
import { requireAuth } from './utils';

const router = createBrowserRouter(createRoutesFromElements(
  <Route
    path='/'
    element={<Layout />}
    errorElement={<Error />}
    loader={async () => {
      return null
    }}
  >
    <Route
      index
      element={<Home />}
      loader={async () => {
        return null
      }}
    />
    <Route
      path='about'
      element={<About />}
      loader={async () => {
        return null
      }}
    />
    <Route
      path='login'
      element={<Login />}
      loader={loginLoader}
      action={loginAction}
    />
    <Route
      path='vans'
      element={<Vans />}
      loader={vansLoader}
    />
    <Route
      path='vans/:id'
      element={<VanDetail />}
      loader={vanDetailLoader}
    />

    <Route path='host' element={<HostLayout />}>
      <Route
        index
        element={<Dashboard />}
        loader={async ({ request }) => await requireAuth({ request })}
      />
      <Route
        path='income'
        element={<Income />}
        loader={async ({ request }) => await requireAuth({ request })}
      />
      <Route
        path='reviews'
        element={<Reviews />}
        loader={async ({ request }) => await requireAuth({ request })}
      />
      <Route
        path='vans'
        element={<HostVans />}
        loader={hostVansLoader}
      />
      <Route
        path='vans/:id'
        element={<HostVanDetail />}
        loader={hostVanDetailLoader}
      >
        <Route
          index
          element={<HostVanInfo />}
          loader={async ({ request }) => await requireAuth({ request })}
        />
        <Route
          path='pricing'
          element={<HostVanPricing />}
          loader={async ({ request }) => await requireAuth({ request })}
        />
        <Route
          path='photos'
          element={<HostVanPhotos />}
          loader={async ({ request }) => await requireAuth({ request })}
        />
      </Route>
    </Route>
    <Route
      path='*'
      element={<NotFound />}
      loader={async () => {
        return null
      }}
    />
  </Route>
))

function App() {
  return (
    <RouterProvider router={router} />
  )
}

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);