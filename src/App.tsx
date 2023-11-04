import { Route, Routes } from "react-router-dom";
import "./App.css";
import Layout from "./components/Layout";
import Login from "./pages/Login";
import Register from "./pages/Register";
import LinkPage from "./pages/LinkPage";
import Unauthorized from "./pages/Unauthorized";
import Missing from "./pages/Missing";
import Home from "./pages/Home";
import RegisterSuccess from "./pages/RegisterSuccess";
import RequireAuth from "./components/RequireAuth";
import { ROLE } from "./enums/Rols";
import Profile from "./pages/Profile";
import Admin from "./pages/Admin";
import Update  from "./pages/Update";
import Add from "./pages/Add"
import Test from "./pages/Home/test";


function App() {
  return (
    <Routes>
      <Route path="/" element={<Layout />}>
        {/* public routes */}
        <Route path="login" element={<Login />} />
        <Route path="register" element={<Register />} />
        <Route path="registerSuccess" element={<RegisterSuccess />} />
        <Route path="linkpage" element={<LinkPage />} />
        <Route path="unauthorized" element={<Unauthorized />} />
        <Route path="/update/:id" element={<Update />} />
        <Route path="test" element={<Test/>} />
       

       
        


        {/* protected routes */}
        <Route element={<RequireAuth allowedRoles={[ROLE.ADMIN, ROLE.USER]} />}>
          <Route path="/" element={<Home />} />
        </Route>
        <Route element={<RequireAuth allowedRoles={[ROLE.USER, ROLE.ADMIN]} />}>
          <Route path="profile" element={<Profile />} />
        </Route>
        <Route element={<RequireAuth allowedRoles={[ROLE.ADMIN]} />}>
          <Route path="admin" element={<Admin />} />
        </Route>
        <Route element={<RequireAuth allowedRoles={[ROLE.ADMIN]} />}>
        <Route path="add" element={<Add />} />
        </Route>

        {/* <Route element={<PersistLogin />}>
          <Route element={<RequireAuth allowedRoles={[ROLE.USER]} />}>
            <Route path="/" element={<Home />} />
          </Route>

          <Route element={<RequireAuth allowedRoles={[ROLE.EDITOR]} />}>
            <Route path="editor" element={<Editor />} />
          </Route>

          <Route element={<RequireAuth allowedRoles={[ROLE.ADMIN]} />}>
            <Route path="admin" element={<Admin />} />
          </Route>

          <Route
            element={<RequireAuth allowedRoles={[ROLE.EDITOR, ROLE.ADMIN]} />}
          >
            <Route path="lounge" element={<Lounge />} />
          </Route>
        </Route> */}

        {/* catch all */}
        <Route path="*" element={<Missing />} />
      </Route>
    </Routes>
  );
}

export default App;
