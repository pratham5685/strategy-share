import {Link} from "react-router-dom";
import {useCookies} from 'react-cookie'
import {useNavigate} from "react-router-dom"


export const Navbar = () => {

    const [cookies,setCookies] = useCookies(["access_token"]);
    const navigate = useNavigate();


    const logout =()=>{
        setCookies("access_token","");
        window.localStorage.removeItem("userID");
        navigate("/auth");
    }
    return <div className="navbar" >
         <div>Strategy Share</div>
        <Link to="/" >Home</Link>
        
        <Link to="/create-review" >Create Review</Link>
        <Link to="/saved-review" >Resources</Link>
        {!cookies.access_token ? (<Link to="/auth" >Login/Register</Link>):<button onClick={logout}>Logout</button>}
        
        
    </div>

} 