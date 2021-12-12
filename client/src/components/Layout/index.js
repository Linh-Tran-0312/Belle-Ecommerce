import Footer from './Footer';
import NavBar from './NavBar';
import homeActions from "../../actions/home";
import { useEffect, useRef } from "react";
import { useDispatch } from 'react-redux';
import { useLocation } from 'react-router-dom';
const Layout = ({children}) => {
     console.log("Layout render")
    const location = useLocation();
    const dispatch = useDispatch();
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