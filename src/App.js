import { Routes, Route } from "react-router-dom"
import BackofficeHomeScreen from "./screens/BackofficeHomeScreen/BackofficeHomeScreen";
import LoginScreen from "./screens/LoginScreen/Login";
import UserListScreen from "./screens/UserListScreen/UserListScreen";
import BackofficeUser from "./screens/BackofficeUser/BackofficeUser";

function App() {
    return (
        <div className="App">
            <Routes>
                <Route path="/" element={<LoginScreen />} />
                <Route path="/home-backoffice" element={<BackofficeHomeScreen />} />
                <Route path="/backoffice/users/list" element={<UserListScreen />} />
                <Route path="/backoffice/user/register" element={<BackofficeUser/>} />
                <Route path="/backoffice/user/update" element={<BackofficeUser/>} />
            </Routes>
        </div>
    );
}

export default App;