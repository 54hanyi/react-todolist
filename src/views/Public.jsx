import { Outlet }from "react-router-dom";
import left from "../images/left.png"
import logo from "../images/logo.png"

function Public (){
    return(
        <>
            <div className="bg-yellow ">
                <div className="container signUpPage vhContainer">
                <div className="side">
                    <img className="logoImg" src={logo} alt="logo" />
                    <img className="d-m-n" src={left} alt="workImg" />
                </div>
                <div>
                    <Outlet />
                </div>
                </div>
            </div>
        </>
    );
};

export default Public;