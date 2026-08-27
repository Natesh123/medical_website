import WebFont from 'webfontloader';
import Footer from './components/Layouts/Footer/Footer';
import Header from './components/Layouts/Header/Header';
import Login from './components/User/Login';
import Register from './components/User/Register';
import { Routes, Route, useLocation } from 'react-router-dom';
import { loadUser } from './actions/userAction';
import { useEffect, useMemo } from 'react';
import { useDispatch } from 'react-redux';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import CssBaseline from '@mui/material/CssBaseline';
import UpdateProfile from './components/User/UpdateProfile';
import UpdatePassword from './components/User/UpdatePassword';
import ForgotPassword from './components/User/ForgotPassword';
import ResetPassword from './components/User/ResetPassword';
import Account from './components/User/Account';
import ProtectedRoute from './Routes/ProtectedRoute';
import Home from './components/Home/Home';
import LandingPage from './components/Landing/LandingPage';
import ProductDetails from './components/ProductDetails/ProductDetails';
import Products from './components/Products/Products';
import Cart from './components/Cart/Cart';
import Shipping from './components/Cart/Shipping';
import OrderConfirm from './components/Cart/OrderConfirm';
import Payment from './components/Cart/Payment';
import OrderStatus from './components/Cart/OrderStatus';
import OrderSuccess from './components/Cart/OrderSuccess';
import MyOrders from './components/Order/MyOrders';
import OrderDetails from './components/Order/OrderDetails';
import Dashboard from './components/Admin/Dashboard';
import MainData from './components/Admin/MainData';
import OrderTable from './components/Admin/OrderTable';

import ProductTable from './components/Admin/ProductTable';
import UserTable from './components/Admin/UserTable';
import UpdateUser from './components/Admin/UpdateUser';
import AddUser from './components/Admin/AddUser';
import ReviewsTable from './components/Admin/ReviewsTable';
import Wishlist from './components/Wishlist/Wishlist';
import NotFound from './components/NotFound';
import Categories from './components/Admin/Categories';
import SubCategories from './components/Admin/SubCategories';
import Roles from './components/Admin/Roles';
import About from './components/Pages/About';
import Contact from './components/Pages/Contact';
import ContactTable from './components/Admin/ContactTable';
import VideoList from './components/Admin/VideoList';
import NewVideo from './components/Admin/NewVideo';
import GstManager from './components/Admin/GstManager';
import BranchManager from './components/Admin/BranchManager';
import ActivityLogs from './components/Admin/ActivityLogs';
import OfferManager from './components/Admin/OfferManager';
import FloatingCartBar from './components/Layouts/FloatingCartBar';
import BannersList from './components/Admin/Banner/BannersList';
import NewBanner from './components/Admin/Banner/NewBanner';
import UpdateBanner from './components/Admin/Banner/UpdateBanner';

function App() {

  const dispatch = useDispatch();
  const { pathname } = useLocation();

  useEffect(() => {
    WebFont.load({
      google: {
        families: ["Outfit:300,400,500,600,700,800,900", "Plus Jakarta Sans:300,400,500,600,700,800"]
      },
    });
  }, []);

  const theme = useMemo(() => createTheme({
    typography: {
      fontFamily: [
        'Outfit',
        'Plus Jakarta Sans',
        '-apple-system',
        'BlinkMacSystemFont',
        '"Segoe UI"',
        'Roboto',
        '"Helvetica Neue"',
        'Arial',
        'sans-serif',
      ].join(','),
    },
    components: {
      MuiTypography: {
        styleOverrides: {
          root: {
            fontFamily: 'Outfit, Plus Jakarta Sans, sans-serif',
          },
        },
      },
    },
  }), []);

  useEffect(() => {
    dispatch(loadUser());
  }, [dispatch]);

  // always scroll to top on route/path change
  useEffect(() => {
    window.scrollTo({
      top: 0,
      left: 0,
      behavior: "smooth"
    });
  }, [pathname])

  // disable right click
  // window.addEventListener("contextmenu", (e) => e.preventDefault());
  // window.addEventListener("keydown", (e) => {
  //   if (e.keyCode == 123) e.preventDefault();
  //   if (e.ctrlKey && e.shiftKey && e.keyCode === 73) e.preventDefault();
  //   if (e.ctrlKey && e.shiftKey && e.keyCode === 74) e.preventDefault();
  // });

  // Check if current route is an admin route
  const isAdminRoute = pathname.startsWith('/admin');
  const isLandingRoute = pathname === '/';
  const hideLayout = isAdminRoute || isLandingRoute;

  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      {!hideLayout && <Header />}
      {!hideLayout && <FloatingCartBar />}
      <Routes>
        {/* ... existing routes ... */}
        <Route path="/" element={<LandingPage />} />
        <Route path="/home" element={<Home />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />

        <Route path="/product/:id" element={<ProductDetails />} />
        <Route path="/products" element={<Products />} />
        <Route path="/products/:keyword" element={<Products />} />


        <Route path="/about" element={<About />} />
        <Route path="/contact" element={<Contact />} />

        <Route path="/cart" element={<Cart />} />

        {/* order process */}
        <Route path="/shipping" element={
          <ProtectedRoute>
            <Shipping />
          </ProtectedRoute>
        } ></Route>

        <Route path="/order/confirm" element={
          <ProtectedRoute>
            <OrderConfirm />
          </ProtectedRoute>
        } ></Route>

        <Route path="/process/payment" element={
          <ProtectedRoute>
            <Payment />
          </ProtectedRoute>
        } ></Route>

        <Route path="/orders/success" element={<OrderSuccess success={true} />} />
        <Route path="/orders/failed" element={<OrderSuccess success={false} />} />
        {/* order process */}

        <Route path="/order/:id" element={
          <ProtectedRoute>
            <OrderStatus />
          </ProtectedRoute>
        } ></Route>

        <Route path="/orders" element={
          <ProtectedRoute>
            <MyOrders />
          </ProtectedRoute>
        }></Route>

        <Route path="/order_details/:id" element={
          <ProtectedRoute>
            <OrderDetails />
          </ProtectedRoute>
        }></Route>

        <Route path="/account/update" element={
          <ProtectedRoute>
            <UpdateProfile />
          </ProtectedRoute>
        } ></Route>

        <Route path="/password/update" element={
          <ProtectedRoute>
            <UpdatePassword />
          </ProtectedRoute>
        } ></Route>



        <Route path="/password/forgot" element={<ForgotPassword />} />

        <Route path="/password/reset/:token" element={<ResetPassword />} />

        <Route path="/account" element={<Account />} />

        <Route path="/wishlist" element={
          <ProtectedRoute>
            <Wishlist />
          </ProtectedRoute>
        } ></Route>

        {/* Admin Routes */}
        <Route path="/admin/dashboard" element={
          <ProtectedRoute isAdmin={true}>
            <Dashboard activeTab={0}>
              <MainData />
            </Dashboard>
          </ProtectedRoute>
        } ></Route>

        <Route path="/admin/categories" element={
          <ProtectedRoute isAdmin={true}>
            <Dashboard activeTab={1}>
              <Categories />
            </Dashboard>
          </ProtectedRoute>
        } ></Route>

        <Route path="/admin/categories" element={
          <ProtectedRoute isAdmin={true}>
            <Dashboard activeTab={1}>
              <Categories />
            </Dashboard>
          </ProtectedRoute>
        } ></Route>

        {/* Sub Categories Routes */}
        <Route path="/admin/subcategories" element={
          <ProtectedRoute isAdmin={true}>
            <Dashboard activeTab={1}>
              <SubCategories />
            </Dashboard>
          </ProtectedRoute>
        } ></Route>

        <Route path="/admin/orders" element={
          <ProtectedRoute isAdmin={true}>
            <Dashboard activeTab={2}>
              <OrderTable />
            </Dashboard>
          </ProtectedRoute>
        } ></Route>



        <Route path="/admin/products" element={
          <ProtectedRoute isAdmin={true}>
            <Dashboard activeTab={3}>
              <ProductTable />
            </Dashboard>
          </ProtectedRoute>
        } ></Route>

        <Route path="/admin/users" element={
          <ProtectedRoute isAdmin={true}>
            <Dashboard activeTab={5}>
              <UserTable />
            </Dashboard>
          </ProtectedRoute>
        } ></Route>

        <Route path="/admin/user/:id" element={
          <ProtectedRoute isAdmin={true}>
            <Dashboard activeTab={5}>
              <UpdateUser />
            </Dashboard>
          </ProtectedRoute>
        } ></Route>

        <Route path="/admin/users/new" element={
          <ProtectedRoute isAdmin={true}>
            <Dashboard activeTab={5}>
              <AddUser />
            </Dashboard>
          </ProtectedRoute>
        } ></Route>

        <Route path="/admin/roles" element={
          <ProtectedRoute isAdmin={true}>
            <Dashboard activeTab={6}>
              <Roles />
            </Dashboard>
          </ProtectedRoute>
        } ></Route>

        <Route path="/admin/reviews" element={
          <ProtectedRoute isAdmin={true}>
            <Dashboard activeTab={7}>
              <ReviewsTable />
            </Dashboard>
          </ProtectedRoute>
        } ></Route>


        <Route path="/admin/contacts" element={
          <ProtectedRoute isAdmin={true}>
            <Dashboard activeTab={8}>
              <ContactTable />
            </Dashboard>
          </ProtectedRoute>
        } ></Route>

        <Route path="/admin/videos" element={
          <ProtectedRoute isAdmin={true}>
            <Dashboard activeTab={9}>
              <VideoList />
            </Dashboard>
          </ProtectedRoute>
        } ></Route>

        <Route path="/admin/video/new" element={
          <ProtectedRoute isAdmin={true}>
            <Dashboard activeTab={9}>
              <NewVideo />
            </Dashboard>
          </ProtectedRoute>
        } ></Route>

        <Route path="/admin/gst" element={
          <ProtectedRoute isAdmin={true}>
            <Dashboard activeTab={10}>
              <GstManager />
            </Dashboard>
          </ProtectedRoute>
        } ></Route>

        <Route path="/admin/branches" element={
          <ProtectedRoute isAdmin={true}>
            <Dashboard activeTab={11}>
              <BranchManager />
            </Dashboard>
          </ProtectedRoute>
        } ></Route>

        <Route path="/admin/logs" element={
          <ProtectedRoute isAdmin={true}>
            <Dashboard activeTab={12}>
              <ActivityLogs />
            </Dashboard>
          </ProtectedRoute>
        } ></Route>

        <Route path="/admin/offers" element={
          <ProtectedRoute isAdmin={true}>
            <Dashboard activeTab={13}>
              <OfferManager />
            </Dashboard>
          </ProtectedRoute>
        } ></Route>

        <Route path="/admin/banners" element={
          <ProtectedRoute isAdmin={true}>
            <Dashboard activeTab={14}>
              <BannersList />
            </Dashboard>
          </ProtectedRoute>
        } ></Route>

        <Route path="/admin/banner/new" element={
          <ProtectedRoute isAdmin={true}>
            <Dashboard activeTab={14}>
              <NewBanner />
            </Dashboard>
          </ProtectedRoute>
        } ></Route>

        <Route path="/admin/banner/:id" element={
          <ProtectedRoute isAdmin={true}>
            <Dashboard activeTab={14}>
              <UpdateBanner />
            </Dashboard>
          </ProtectedRoute>
        } ></Route>

        <Route path="*" element={<NotFound />}></Route>

      </Routes>
      {!hideLayout && <Footer />}
    </ThemeProvider>
  );
}

export default App;