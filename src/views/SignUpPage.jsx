import { useState } from "react";
import { useNavigate, NavLink } from 'react-router-dom';
import axios from "axios";


// const {VITE_APP_HOST}= import.meta.env;
const apiUrl = "https://todolist-api.hexschool.io";
const SignUpPage = () => {
    const [email, setEmail] = useState("");
    const [nickname, setNickname] = useState("");
    const [password, setPassword] = useState("");
    const [confirmPassword, setConfirmPassword] = useState("");
    const navigate = useNavigate();

    const handleSignUp = async () => {
        if(password !== confirmPassword){
            alert('密碼與確認密碼不同');
            setPassword('');
            setConfirmPassword('');
            return;
        }

        const signUpData = {
            email,
            password,
            nickname,
        }
        try {
            const res = await axios.post(`${apiUrl}/users/sign_up`, signUpData);
            console.log(res);
            setEmail("");
            setPassword("");
            setNickname("");
            setConfirmPassword("");
            navigate('/'); // 將畫面導到根目錄
        } catch (error) {
            console.log(error.response.data.message);
            alert("此帳號已經註冊過囉")
        }
    };

    return(
        <div id="signUpPage">
                <form className="formControls" action="index.html">
                    <h2 className="formControls_txt">註冊帳號</h2>
                    <label className="formControls_label" htmlFor="email">Email</label>
                    <input
                        className="formControls_input"
                        type="text"
                        id="email"
                        placeholder="請輸入 email"
                        onChange={(e)=>setEmail(e.target.value)}
                        required 
                    />
                    <label className="formControls_label" htmlFor="name">您的暱稱</label>
                    <input
                        className="formControls_input"
                        type="text"
                        name="name"
                        id="name"
                        placeholder="請輸入您的暱稱"
                        onChange={(e)=>setNickname(e.target.value)}
                    />
                    <label className="formControls_label" htmlFor="pwd">密碼</label>
                    <input
                        className="formControls_input"
                        type="password"
                        name="pwd"
                        id="pwd"
                        placeholder="請輸入密碼"
                        onChange={(e)=>setPassword(e.target.value)}
                        required 
                    />
                    <label className="formControls_label" htmlFor="confirmpwd">再次輸入密碼</label>
                    <input
                        className="formControls_input"
                        type="password"
                        name="pwd"
                        id="confirmpwd"
                        placeholder="請再次輸入密碼"
                        onChange={(e)=>setConfirmPassword(e.target.value)}
                        required 
                    />
                    <input className="formControls_btnSubmit" type="button" onClick={handleSignUp} value="註冊帳號" />
                    <NavLink to='/' className="formControls_btnLink">登入</NavLink>
                </form>
        </div>
    );
};

export default SignUpPage;