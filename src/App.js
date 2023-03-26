import { Routes, Route } from "react-router-dom"
import BackofficeHomeScreen from "./screens/Backoffice/BackofficeHome/BackofficeHomeScreen";
import LoginScreen from "./screens/LoginScreen/Login";
import UserListScreen from "./screens/Backoffice/BackofficeUserList/UserListScreen";
import BackofficeUser from "./screens/Backoffice/BackofficeUser/BackofficeUser";
import BackofficeProductsListScreen from "./screens/Backoffice/BackofficeProducts/BackofficeProductsListScreen";

function App() {
    return (
        <div className="App">
            <Routes>
                <Route path="/" element={<LoginScreen />} />
                <Route path="/home-backoffice" element={<BackofficeHomeScreen />} />
                <Route path="/backoffice/users/list" element={<UserListScreen />} />
                <Route path="/backoffice/user/register/:id?" element={<BackofficeUser/>} />
                <Route path="/backoffice/products/list" element={<BackofficeProductsListScreen />} />
            </Routes>
        </div>
    );
}

export default App;