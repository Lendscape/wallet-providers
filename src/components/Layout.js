import React from "react";
import {ConnectSample} from "./ConnectSample.tsx";
import Header from "./Header";

const Layout = ({ children }) => {
    return (
        <div>
            <Header />
            {children}
        </div>
    )
}

export default Layout;