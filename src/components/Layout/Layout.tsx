import React from "react";
import Header from "./Header";
import Footer from "./Footer";
import styles from "./Layout.module.css"; 
import { useSelector } from "react-redux"; 
import { RootState } from "../../redux/store";

interface LayoutProps {
  children: React.ReactNode;
}

const Layout: React.FC<LayoutProps> = ({ children }) => {
  const theme = useSelector((state: RootState) => state.theme.mode); 

  return (
    <div className={theme === "light" ? styles.backgroundContainer : ""}>
      {theme === "light" && <div className={styles.wave}></div>} 
      <Header />
      <main className="container">{children}</main>
      <Footer />
    </div>
  );
};

export default Layout;
