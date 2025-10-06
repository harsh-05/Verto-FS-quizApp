import { useNavigate } from "react-router";
import { getToken } from "./configs"

export default function PrivateRoute({ children }: {children: React.ReactNode}) {

    const navigate = useNavigate();
    const token = getToken();
    if (!token) return navigate('/signin');
    return children

}