import React from "react";

import { Route, Routes } from "react-router-dom";


// We import all the components we need in our app
import Navbar from "./components/Navbar/Navbar";
import Home from "./components/Home/Home";
import Admin from "./components/Admin/Admin";
import EditPackage from "./components/EditPackage/EditPackage";
import PackageList from "./components/PackageList/PackageList";
import Login from "./components/Login/Login";
import ProtectedRoute from "./components/common/ProtectedRoute";
import "./App.scss";


const App = () => {
    return (
        <div>
            <Navbar />
            <Routes>
                <Route exact path="/" element={<Home />} />
                <Route path="/login" element={<Login />} />
                <Route path="/admin" element={
                    <ProtectedRoute>
                        <Admin />
                    </ProtectedRoute>

                }>
                    <Route path="add-package" element={<EditPackage />} />
                    <Route path="edit-package/:catId" element={<EditPackage />} />
                    <Route path="package-list" element={<PackageList />} />
                </Route>
            </Routes>
        </div>
    );
};

export default App;