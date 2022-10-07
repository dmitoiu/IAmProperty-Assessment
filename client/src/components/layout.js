import React from 'react';
import Header from "./header";
import { useLocation } from 'react-router-dom';
import Footer from "./footer";

const Layout = ({children}) => {
    const location = useLocation();
    return (
        <>
            <Header/>
            <div className={"min-h-full"}>
                <main>
                    {children}
                </main>
            </div>
            <Footer/>
        </>
    );
};

export default Layout;