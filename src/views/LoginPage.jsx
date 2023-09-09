import { useState } from "react";
import { useNavigate, NavLink } from 'react-router-dom';
import axios from "axios";

const apiUrl = "https://todolist-api.hexschool.io";
const LoginPage = () => {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const navigate = useNavigate();
  
    const handleLogin = async () => {
    const loginData = {
        email: email,
        password: password,
    };
    
    try {
        const res = await axios.post(`${apiUrl}/users/sign_in`, loginData);
        const token = res.data.token;  // 從拿到的數據(res)裡面拿token
        console.log(token);
        document.cookie = `token=${token}`; // 把token存在cookie中：在cookie中建立一個名為'token'的key，value為從數據拿到的一串token值
        navigate('/todo');
    } catch (error) {
        console.log(error.response.data.message);
        setPassword("");
    }
  };

  return (
    <div id="loginPage">
        <form className="formControls" action="index.html">
            <h2 className="formControls_txt">最實用的線上代辦事項服務</h2>
            <label className="formControls_label" htmlFor="email">Email</label>
            <input
                className="formControls_input"
                type="text"
                name="email"
                id="email"
                placeholder="請輸入 email"
                onChange={(e)=> setEmail(e.target.value)}
                required
            />
            <span>此欄位不可留空</span>
            <label className="formControls_label" htmlFor="pwd">密碼</label>
            <input
                className="formControls_input"
                type="password"
                name="pwd"
                id="pwd"
                placeholder="請輸入密碼"
                onChange={(e)=> setPassword(e.target.value)}
                required
            />
            <input className="formControls_btnSubmit" type="button" onClick={handleLogin} value="登入" />
            <NavLink to='/sign_up' className="formControls_btnLink">註冊帳號 </NavLink>
        </form>
    </div>
  );
};

export default LoginPage;
