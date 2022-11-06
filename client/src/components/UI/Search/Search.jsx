import { useEffect, useRef, useState } from "react";
import { BASE_URL } from '../../../shared/baseUrl';
import { Link, Button, Element, Events, animateScroll as scroll, scrollSpy, scroller } from 'react-scroll'
import { Swiper, SwiperSlide } from 'swiper/react';
import styles from "./Search.module.scss"
import 'swiper/css';


const Search = ({ categories, onSearch }) => {
    const baseUrl = BASE_URL;
    const [swiper, setSwiper] = useState()
    useEffect(() => {
        const el = document.querySelector(".searchStickyContainer")
        const observer = new IntersectionObserver(
            ([e]) => {
                e.target.classList.toggle("isPinned", e.boundingClientRect.top < 0)
            },
            { threshold: [1] }
        );
        observer.observe(el);
        return () => { };
    }, []);

    const handleChange = ({ currentTarget: input }) => {
        console.log("handleChange", input.value)
        onSearch(input.value)
    }


    return (
        <div className="searchStickyContainer">
            <div className="container">
                <div className="flex items-center mb-6">
                    <img
                        className='search-logo'
                        src="/images/search-logo.svg"
                        alt="Search logo"
                    />

                    <div className="grow relative rounded-xl shadow-lg">
                        <img
                            className='h-7 w-7 absolute top-7 left-9'
                            src="/images/search-icon.svg"
                            alt="Search icon"
                        />
                        <input
                            type="text"
                            onChange={(e) => handleChange(e)}
                            className="block w-full rounded-xl border-transparent  text-lg pl-20 py-7"
                            placeholder="Search"
                        />
                        <div className=" absolute inset-y-0 right-5 flex items-center pr-3">
                            <button
                                type="button"
                                className="inline-flex items-center px-5 text-sm font-medium"
                            >
                                <img
                                    className='mr-3'
                                    src="/images/Figma-logo.svg"
                                    alt="Figma logo"
                                />
                                Figma library
                            </button>
                            <a
                                className="inline-flex items-center px-5 text-sm font-medium"
                                href={`${baseUrl}/category/download-all`}
                            >
                                <img
                                    className='mr-3'
                                    src="/images/download-cloud.svg"
                                    alt="Download cloud"
                                />
                                Download all
                            </a>
                            <button
                                type="button"
                                className=" inline-flex items-center px-5 text-sm font-medium"
                            >
                                <img
                                    className='mr-3'
                                    src="/images/github-logo.svg"
                                    alt="Github logo"
                                />
                                Github
                            </button>
                        </div>
                    </div>
                </div>

                <div className="flex items-center">

                    <div className="grow mr-3">
                        <Swiper

                            slidesPerView={"auto"}
                            ref={swiper}
                            spaceBetween={14}
                            onInit={(swiper) => setSwiper(swiper)}

                            onSlideChange={() => console.log('slide change')}
                            onSwiper={(swiper) => console.log(swiper)}
                        >
                            {categories.map((category) => {
                                return (
                                    <SwiperSlide>
                                        {
                                            category.icons.length != 0 &&
                                            <>
                                                <Link to={"category-" + category._id} spy={true} smooth={true} offset={-300} duration={500} key={category._id} className={styles.categoryBtn}>
                                                    {category.name}
                                                </Link >

                                            </>
                                        }
                                    </SwiperSlide>
                                )
                            })}

                        </Swiper>
                    </div>

                    <button onClick={() =>

                        swiper.slideNext()


                    } className={styles.moreCategoriesBtn}>
                        More categories..
                    </button>
                </div>
            </div>
        </div>

    )
}


export default Search;