import { Routes, Route } from 'react-router-dom';
import Public from "./views/Public";
import LoginPage from "./views/LoginPage"
import SignUpPage from './views/SignUpPage';
import TodoList from './views/TodoList';
import { HashRouter } from 'react-router-dom'

import './index.css'

function TodoApp() {
  
  return (
    <HashRouter>
      <Routes>
        <Route path="/" element={<Public />}>
            <Route path="" element={<LoginPage />} />
            <Route path="sign_up" element={<SignUpPage />} />
        </Route>
        <Route path="/todo" element={<TodoList />} />
      </Routes>
    </HashRouter>
  )
}

export default TodoApp;