import React from "react";
import Header from "./Header";
import Accounts from "./Accounts";

const Layout = ({ children }) => {
    return (
        <div>
            <Header />
            {children}
            <Accounts />
        </div>
    )
}

export default Layout;