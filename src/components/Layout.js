import React from "react";
// import {ConnectSample} from "./ConnectSample.tsx";
import Header from "./header";

const Layout = ({ children }) => {
    return (
        <div>
            <Header />
            {children}
        </div>
    );
};

export default Layout;
