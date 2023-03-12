import { Routes, Route } from "react-router-dom"
import BackofficeHomeScreen from "./screens/backofficeHomeScreen/BackofficeHomeScreen";
import LoginScreen from "./screens/LoginScreen/Login";
import UserListScreen from "./screens/UserListScreen/UserListScreen";

function App() {
    return (
        <div className="App">
            <Routes>
                <Route path="/" element={<LoginScreen />} />
                <Route path="/home-backoffice" element={<BackofficeHomeScreen />} />
                <Route path="/users/list" element={<UserListScreen />} />
            </Routes>
        </div>
    );
}

export default App;