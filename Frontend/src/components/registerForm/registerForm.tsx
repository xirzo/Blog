import {useState} from "react";
import {useAuth} from "../../features/auth/model/useAuth";
import Button from "../../shared/ui/button.tsx";

function RegisterForm() {
    const {register} = useAuth();
    const [name, setName] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");

    return (
        <form
            className={"flex flex-col gap-5"}
            onSubmit={e => {
                e.preventDefault();
                register(name, email, password);
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
