"use client";
import { Component } from "react";
import { MenuItems } from "./menuitems";
import "./navbar.css";
import Link from "next/link";

class NavBar extends Component {
  state = { clicked : false };
  handleClick = () => {
    this.setState({ clicked: !this.state.clicked})
  }
  
  render() {
    return (
      <nav className="NavBarItems">
        <h1 className="navbar-logo">SpendWrapped</h1>

        <div className="menu-icons" onClick={this.handleClick}>
          <i className={this.state.clicked ? "fas fa-times" : "fas fa-bars"}></i>
        </div>

        <ul className={this.state.clicked ? "nav-menu active" : "nav-menu"}>
          {MenuItems.map((item, index) => {
            return (
              <li key={index}>
                <Link href={item.url} className={item.cName}>
                {item.title}
              </Link>
              </li>
            );
          })}
        </ul>
      </nav>
    )
  }
}

export default NavBar;