import React from "react";
import { NavLink } from "react-router-dom";
import styles from "./Header.module.css";

const Header: React.FC = () => {
  return (
    <header className={styles.header}>
      <div className={styles.title}>PolyEtherscan</div>
      <nav className={styles.nav}>
        <NavLink
          //   exact
          to="/"
          className={({ isActive }) =>
            isActive ? styles.activeNavLink : styles.navLink
          }
          end
        >
          Transactions
        </NavLink>
      </nav>
    </header>
  );
};

export default Header;
