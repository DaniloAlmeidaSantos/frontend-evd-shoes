import { Routes, Route } from "react-router-dom"
import BackofficeHomeScreen from "./screens/Backoffice/BackofficeHome/BackofficeHomeScreen";
import UserListScreen from "./screens/Backoffice/BackofficeUserList/UserListScreen";
import BackofficeUser from "./screens/Backoffice/BackofficeUser/BackofficeUser";
import BackofficeProductsListScreen from "./screens/Backoffice/BackofficeProducts/BackofficeProductsListScreen";
import BackofficeProductsRegister from "./screens/Backoffice/BackofficeRegisterProducts/BackofficeRegisterProducts";
import SellProductsScreen from "./screens/Public/SellProductsScreen/SellProductScreen";
import ProductDetailsScreen from "./screens/Public/ProductDetails/ProductDetailsScreen";
import EditAddressCustomer from "./screens/User/Edit/UserEdit";
import UserAuthenticate from "./screens/User/Authenticate/UserAuthenticate";
import UserEdit from "./screens/User/Edit/UserEdit";
import ProductCart from "./screens/Public/ProductCartScreen/ProductCartScreen";

function App() {
    return (
        <div className="App">
            <Routes>
                <Route path="/" element={<ProductDetailsScreen/>}/>
                <Route path="/user" element={<UserAuthenticate />} />
                <Route path="/user/edit/:id?" element={<UserEdit />} />
                <Route path="/home-backoffice" element={<BackofficeHomeScreen />} />
                <Route path="/backoffice/users/list" element={<UserListScreen />} />
                <Route path="/backoffice/user/register/:id?" element={<BackofficeUser/>} />
                <Route path="/backoffice/products/list" element={<BackofficeProductsListScreen />} />
                <Route path="/backoffice/products/register/:id?" element={<BackofficeProductsRegister />} />
                <Route path="/sell/product/:id" element={<SellProductsScreen />} />
                <Route path="/products" element={<ProductDetailsScreen/>}/>
                <Route path="/user/address/config" element={<EditAddressCustomer/>} />
                <Route path="/product/cart" element={<ProductCart />} />
            </Routes>
        </div>
    );
}

export default App;