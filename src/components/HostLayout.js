import { NavLink, Outlet } from "react-router-dom"

export default function HostLayout() {
    const activeHostLink = {
        fontWeight: "bold",
        textDecoration: "underline",
        color: "#161616"
    }

    return (
        <>
            <nav className="host-nav">
                <NavLink to="." end style={({isActive}) => isActive ? activeHostLink : null}>Dashboard</NavLink>
                <NavLink to="income" style={({isActive}) => isActive ? activeHostLink : null}>Income</NavLink>
                <NavLink to="vans" style={({isActive}) => isActive ? activeHostLink : null}>Vans</NavLink>
                <NavLink to="reviews" style={({isActive}) => isActive ? activeHostLink : null}>Reviews</NavLink>
            </nav>
            <Outlet />
        </>
    )
}