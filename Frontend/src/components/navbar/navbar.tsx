import { Link } from "react-router-dom";
import type { IPageRecord } from "../../routes";

export interface INavbarProps {
    records: IPageRecord[]
}

function Navbar({ records }: INavbarProps) {
    return (
        <nav>
            <ul>
                {records.map(({ name, path }) => (
                    <li key={path}>
                        <Link to={path}>{name}</Link>
                    </li>
                ))}
            </ul>
        </nav>
    );
}

export default Navbar;
