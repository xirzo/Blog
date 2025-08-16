import {useState} from "react";
import {useAuth} from "../../features/auth/model/useAuth";
import Button from "../../shared/ui/button.tsx";

export function LoginForm() {
    const {login} = useAuth();
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");

    return (
        <form
            className={"flex flex-col gap-5"}
            onSubmit={e => {
                e.preventDefault();
                login(email, password);
            }}>
            <input value={email} onChange={e => setEmail(e.target.value)} placeholder="Email"/>
            <input type="password" value={password} onChange={e => setPassword(e.target.value)} placeholder="Password"/>
            <Button type="submit">Login</Button>
        </form>
    );
}
