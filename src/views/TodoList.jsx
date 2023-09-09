import { useEffect, useState } from "react";
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import deleteImg from "../images/delete.png"

// const {VITE_APP_HOST}= import.meta.env;
const apiUrl = "https://todolist-api.hexschool.io";
function TodoList () {
    const navigate = useNavigate();
    const [todos,setTodos] = useState([]);
    const [nickname,setNickname] = useState('');
    const [filterTodos,setFilterTodos] = useState([]);  // 用來存放待辦事項的完成與否狀態
    const [newTodo,setNewTodo] = useState('');  // 輸入框中的代辦
    const [tabStatus,setTabStatus] = useState('all'); // 代辦狀態選取初始為"all"
    const [notFinish,setNotFinish] = useState(0);

    const token = document.cookie
    .split('; ')
    .find((row) => row.startsWith('token='))
    ?.split('=')[1];
    
    // 驗證用戶身份
    useEffect(() => {
        checkout();
    },[]);

    // 根據點選的選項的狀態(已完成、未完成或全部)來決定顯示的選項
    useEffect(() => {
        if(tabStatus === 'all') {
            setFilterTodos(todos);
        }
        else if(tabStatus === 'notFinish') {
            const notFinish = todos.filter((i)=> i.status ===false)
            setFilterTodos(notFinish)
        }
        else if(tabStatus === 'finish') {
            const finish = todos.filter((i)=> i.status === true)
            setFilterTodos(finish)
        };
    },[tabStatus,todos])  // tabStatus,todos有變動時自動觸發，用來持續同步用戶的資料
    
    // 當todos有變動，計算並更新用戶未完成的待辦數量
    useEffect(()=>{
        const notFinsiItem = todos.filter((i)=> i.status === true);
        setNotFinish(notFinsiItem.length);
    },[todos]);

    // 驗證用戶token是否有效
    const checkout = async () => {
        try {
            const res = await axios.get(`${apiUrl}/users/checkout`,{
                headers:{
                    Authorization:token
                }
            });
            setNickname(res.data.nickname);
            getTodos();
        } catch (error) {
            console.log(error);
            navigate('/');
        };
    };

    // 取得用戶代辦清單
    const getTodos = async () => {
        try {
            const res = await axios.get(`${apiUrl}/todos`,{
                headers:{
                    Authorization:token
                }
            });
            console.log(res.data.data)
            setTodos(res.data.data)
        } catch (error) {
            console.log(error)
        };
    };

    const handleKeyDown = (e) => {
        if(e.key==='Enter') {
            addTodo();
        };
    };

    // 新增代辦事項
    const addTodo = async () => {
        try {
            await axios.post(`${apiUrl}/todos`,{
                content:newTodo,
            },{
                headers:{
                    Authorization:token
                }
            });
            setNewTodo('');  // 清空輸入框文字
            getTodos();
        } catch (error) {
            alert(error.response.data.message);
        };
    };
    
    // 透過API來標記已完成的代辦
    const completeTodo = async (id) => {
        try {
            const res = await axios.patch(`${apiUrl}/todos/${id}/toggle`,
            {},  // 請求主體為空對象，表示不發送任何數據
            {
                headers:{
                    Authorization:token
                }
            });
            getTodos();
            console.log(res);
        } catch (error) {
            console.log(error);
        };
    };

    // 刪除代辦
    const deleteTodo = async (id) => {
        try {
            await axios.delete(`${apiUrl}/todos/${id}`,{
                headers:{
                    Authorization:token
                }
            });
            getTodos()
        } catch (error) {
            console.log(error);
        };
        
    };

    // 清除所有已完成代辦  
    const clearFinishItem = () => {
        todos.filter((i) => {  // 檢查是否已經完成(i.status=true)，已完成的代辦就用deleteTodo(i.id)刪掉 
            if(i.status) {
                deleteTodo(i.id) 
            };
        });
    };

    // 登出
    const handleLogout = async () => {
        try {
            const res = await axios.post(
              `${apiUrl}/users/sign_out/`,
              {},
              {
                headers: {
                  Authorization: token
                }
              }
            );
            console.log(res);
            navigate('/')
          } catch (error) {
            console.log(error);
          }
        
    };

    return (
        <>
        <div id="todoListPage" className="bg-half">
            <nav>
            <a onClick={handleLogout}><img className="logoImg" src="https://raw.githubusercontent.com/jesswu1551/react_todo/main/src/assets/logo.png" alt="logoImg" /></a>
                <ul>
                    <li className="todo_sm"><span>{nickname}的代辦</span></li>
                    <li><a onClick={handleLogout}>登出</a></li>
                </ul>
            </nav>
            <div className="conatiner todoListPage vhContainer">
            <div className="todoList_Content">
                <div className="inputBox">
                    <input type="text" placeholder="請輸入待辦事項" value={newTodo} onChange={((e)=>setNewTodo(e.target.value.trim()))}onKeyDown={handleKeyDown} />
                    <a onClick={(e) => addTodo(e)}>
                        <i className="fa fa-plus"></i>
                        {/* <img src="/vite-HW4/public/delete.jpg" alt="" /> */}
                    </a>
                </div>
                <div className="todoList_list">
                    <ul className="todoList_tab">
                        <li><a href="#" className={tabStatus === 'all' ? 'active':''} onClick={(e)=>{
                            e.preventDefault();
                            setTabStatus('all')
                        }}>全部</a></li>
                        <li><a href="#" className={tabStatus === 'notFinish' ?'active':''} onClick={(e)=>{
                            e.preventDefault();
                            setTabStatus('notFinish')
                        }}>待完成</a></li>
                        <li><a href="#" className={tabStatus === 'finish' ?'active':''} onClick={(e)=>{
                            e.preventDefault();
                            setTabStatus('finish')
                        }}>已完成</a></li>
                    </ul>
                    <div className="todoList_items">
                        <ul className="todoList_item">
                            {filterTodos.length === 0 ?(
                                <li className="todoList_label" style={{ justifyContent: 'space-around', cursor: 'auto' }}>
                                    目前尚無待辦事項
                                </li>
                            ):('')}
                            {filterTodos.map((todo)=>{
                                return(
                                    <li key={todo.id}>
                                        <label className="todoList_label">
                                            <input className="todoList_input" type="checkbox" checked={todo.status} onChange={()=>completeTodo(todo.id)}/>
                                            <span>{todo.content}</span>
                                        </label>
                                        <a href="#" onClick={(e)=>{
                                            e.preventDefault();
                                            deleteTodo(todo.id)
                                        }}>
                                            <img src={deleteImg} alt="X" />
                                            {/* <i className="fa fa-times"></i> */}
                                        </a>
                                    </li>
                                )
                            })}
                        </ul>
                        <div className="todoList_statistics">
                            <p> {notFinish} 個已完成項目</p>
                            <a href="#" onClick={(e)=>{
                                e.preventDefault();
                                clearFinishItem();
                            }}>清除已完成項目</a>
                        </div>
                    </div>
                </div>
            </div>
        </div>
        </div>
        </>

    );
}

export default TodoList;