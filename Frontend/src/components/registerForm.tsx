import { useState } from "react";
import { useAuth } from "../features/auth/model/useAuth.ts";
import Button from "../shared/ui/button.tsx";
import { useNavigate } from "react-router-dom";

function RegisterForm() {
    const { register } = useAuth();
    const [name, setName] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const navigate = useNavigate();

    return (
        <form
            className={"flex flex-col gap-5"}
            onSubmit={e => {
                e.preventDefault();
                register(name, email, password).then(() => navigate('/'));
            }}>
            <input
                placeholder="Name"
                value={name}
                onChange={e => setName(e.target.value)}
                required
            />
            <input
                placeholder="Email"
                value={email}
                onChange={e => setEmail(e.target.value)}
                required
            />
            <input
                type="password"
                placeholder="Password"
                value={password}
                onChange={e => setPassword(e.target.value)}
                required
            />
            <Button type="submit">Register</Button>
        </form>
    );
}

export default RegisterForm;
