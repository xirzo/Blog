import {useState} from "react";
import {useAuth} from "../features/auth/model/useAuth.ts";
import Button from "../shared/ui/button.tsx";
import {useNavigate} from "react-router-dom";

export function LoginForm() {
    const {login} = useAuth();
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const navigate = useNavigate();

    return (
        <form
            className={"flex flex-col gap-5"}
            onSubmit={e => {
                e.preventDefault();
                login(email, password).then(r => navigate('/'));
            }}>
            <input value={email} onChange={e => setEmail(e.target.value)} placeholder="Email"/>
            <input type="password" value={password} onChange={e => setPassword(e.target.value)} placeholder="Password"/>
            <Button type="submit">Login</Button>
        </form>
    );
}
