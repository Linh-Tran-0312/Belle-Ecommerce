import { useEffect, useRef } from "react";
import { useLocation } from 'react-router-dom';
import Footer from './Footer';
import NavBar from './NavBar';
const Layout = ({children}) => {
     console.log("Layout render")
    const location = useLocation();
    const ref = useRef()

    useEffect(() => {
       ref.current.scrollIntoView();
    },[location])
    return(
        <div ref={ref}>
        <NavBar />
        {children}
        <Footer/>
        </div>
    )
}

export default Layout;