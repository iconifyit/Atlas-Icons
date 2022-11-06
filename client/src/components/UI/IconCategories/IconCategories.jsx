import { useState } from "react";
import IconElement from "../IconElement/IconElement";
import IconAccordion from '../IconAccordion/IconAccordion';
import styles from "./IconCategories.module.scss";

const IconCategories = ({ categories }) => {
    const [activeIcon, setActiveIcon] = useState(null)

    return (
        <dl className="mt-6 space-y-12 mb-32">
            {categories.map((category, index) => {
                return (
                    <>
                        {category.icons.length != 0 &&
                            <IconAccordion category={category} count={category.icons.length} key={category._id}>
                                <div id={"category-" + category._id} className="grid  grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 xl:grid-cols-7 2xl:grid-cols-8 gap-6 grid-flow-row-dense">
                                    {category.icons.map((icon) => (
                                        <IconElement key={icon._id} icon={icon} categoryDir={category.dir} activeIcon={activeIcon} setActiveIcon={setActiveIcon} />
                                    ))}
                                </div>
                            </IconAccordion>
                        }
                    </>
                )
            })}
            {/* hiii */}
        </dl>

    )
}



export default IconCategories