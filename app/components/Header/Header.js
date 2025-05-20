"use client";
import { useState, useEffect, use } from "react";
import styles from "./Header.module.css";
import Link from "next/link";
import Image from "next/image";
import { Menu, X, User } from "lucide-react";
import { useRouter, usePathname } from "next/navigation";
import { useAuth } from "@/contexts/AuthContext";

const Header = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const router = useRouter();
  const pathname = usePathname();

  const { user, logout } = useAuth();

  const handleLogout = () => {
    logout();
    router.push("/login");
  };

  const handleCloseMenu = () => setIsOpen(false);

  return (
    <header className={styles.header}>
      <div className={styles.subContainer}>
        <div className={styles.logo} onClick={() => router.push("/")}>
          <Image
            src="/images/logo.png"
            alt="MedCare Logo"
            width={36}
            height={36}
            className={styles.logoImg}
          />
          <span className={styles.logoText}>MedCare</span>
        </div>

        <button className={styles.hamburger} onClick={() => setIsOpen(true)}>
          <Menu className={styles.hamburgerIcon} size={36} />
        </button>

        <div
          className={`${styles.menuOverlay} ${isOpen ? styles.menuOpen : ""}`}
        >
          <button className={styles.closeBtn} onClick={handleCloseMenu}>
            <X size={36} />
          </button>
          <nav className={styles.navMenu}>
            <ul>
              <li className={pathname === "/" ? styles.active : ""}>
                <Link href="/" onClick={handleCloseMenu}>
                  Home
                </Link>
              </li>
              <li className={pathname === "/dashboard" ? styles.active : ""}>
                <Link href="/dashboard" onClick={handleCloseMenu}>
                  Dashboard
                </Link>
              </li>

              {user ? (
                <>
                  <li className={pathname === "/profile" ? styles.active : ""}>
                    <Link href="/profile">Profile</Link>
                  </li>
                  <li>
                    <button
                      className={`${styles.registerBtn} btn`}
                      onClick={() => {
                        handleLogout();
                        handleCloseMenu();
                      }}
                    >
                      Logout
                    </button>
                  </li>
                </>
              ) : (
                <>
                  <li>
                    <button
                      className={`${styles.loginBtn} btn`}
                      onClick={() => {
                        router.push("/login");
                        handleCloseMenu();
                      }}
                    >
                      Login
                    </button>
                  </li>
                </>
              )}
            </ul>
          </nav>
        </div>

        <nav className={styles.desktopNavLinks}>
          <ul>
            <li className={pathname === "/" ? styles.active : ""}>
              <Link href="/">Home</Link>
            </li>
            <li className={pathname === "/dashboard" ? styles.active : ""}>
              <Link href="/dashboard">Dashboard</Link>
            </li>
          </ul>
        </nav>

        <div className={styles.desktopButtons}>
          {user ? (
            <div className={styles.userMenu}>
              <div
                onClick={() => setIsDropdownOpen(!isDropdownOpen)}
                className={styles.avatar}
              >
                <User size={24} />
              </div>
              {isDropdownOpen && (
                <ul className={styles.dropdownMenu}>
                  <li className={pathname === "/profile" ? styles.active : ""}>
                    <Link href="/profile">Profile</Link>
                  </li>
                  <li onClick={handleLogout} className={styles.logoutItem}>
                    Logout
                  </li>
                </ul>
              )}
            </div>
          ) : (
            <>
              <button
                className={`${styles.loginBtn} btn`}
                onClick={() => router.push("/login")}
              >
                Login
              </button>
            </>
          )}
        </div>
      </div>
    </header>
  );
};

export default Header;
