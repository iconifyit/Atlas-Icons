import { useState, useEffect } from "react";
import http from "../../services/httpService";
import HomeHeader from "../UI/HomeHeader/HomeHeader";
import Search from "../UI/Search/Search";
import { BASE_URL } from '../../shared/baseUrl';
import IconCategories from "../UI/IconCategories/IconCategories";
import AvailableFor from "../UI/AvailableFor/AvailableFor";
import MadeInVectopus from "../UI/MadeInVectopus/MadeInVectopus";

const Home = () => {
    const [categories, setCategories] = useState([]);
    const baseUrl = BASE_URL;

    const fetchCategories = () => {
        http
            .get(`${baseUrl}category/categories`)
            .then((res) => {
                console.log(res)
                if (res.status == 200) {
                    setCategories(res.data)
                }
            }).catch(err => console.log(err));
    }

    const searchHandler = (value) => {
        console.log(value)
        if (value) {
            http
                .get(`${baseUrl}category/filter/?q=${value}`)
                .then((res) => {

                    setCategories(res.data)
                }).catch(err => console.log(err));
        } else {
            fetchCategories();
        }
    }


    useEffect(() => {
        fetchCategories();
    }, []);

    return (
        <main>
            <HomeHeader />
            <Search onSearch={(value) => { searchHandler(value) }} categories={categories} />
            <div className="container">
                <IconCategories categories={categories} />
                <AvailableFor />
                <MadeInVectopus />
            </div>
        </main>
    )
}


export default Home;