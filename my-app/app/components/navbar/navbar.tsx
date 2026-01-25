"use client";
import { useState } from "react";
import { MenuItems } from "./menuitems";
import "./navbar.css";
import Link from "next/link";
import { useUser } from '@auth0/nextjs-auth0/client';

export default function NavBar() {
  const [clicked, setClicked] = useState(false);
  const { user, isLoading } = useUser();

  const handleClick = () => {
    setClicked(!clicked);
  };

  const handleLogout = () => {
    window.location.href = '/auth/logout';
  };

  const handleLogin = () => {
    window.location.href = '/auth/login';
  };

  return (
    <nav className="NavBarItems">
      <h1 className="navbar-logo">SpendWrapped</h1>

      <div className="menu-icons" onClick={handleClick}>
        <i className={clicked ? "fas fa-times" : "fas fa-bars"}></i>
      </div>

      <ul className={clicked ? "nav-menu active" : "nav-menu"}>
        {MenuItems.map((item, index) => {
          return (
            <li key={index}>
              <Link href={item.url} className={item.cName}>
                {item.title}
              </Link>
            </li>
          );
        })}
        {!isLoading && (
          <>
            {user ? (
              <>
                <li>
                  <span className="nav-links">
                    {user.name || user.email}
                  </span>
                </li>
                <li>
                  <button onClick={handleLogout} className="nav-button">
                    Logout
                  </button>
                </li>
              </>
            ) : (
              <li>
                <button onClick={handleLogin} className="nav-button">
                  Sign In
                </button>
              </li>
            )}
          </>
        )}
      </ul>
    </nav>
  );
}