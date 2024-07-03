import { Navigate } from "react-router-dom";
import useAuth from "../contexts/authContext";

const ProtectedRoute = ({ element }) => {
    const { userLoggedIn } = useAuth();

    if (!userLoggedIn) {
        return <Navigate to="/login" />
    }
    return element;
};

export default ProtectedRoute