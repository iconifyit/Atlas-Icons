import styles from "./CategoryCard.module.scss";
import { Link } from "react-router-dom";

const CategoryCard = ({ category }) => {

    const iconsPath = "http://localhost:5000/uploads/icons/";

    return (
        <Link to={`/admin/edit-package/${category._id}`}>
            <figure className={styles.iconSetContainer}>
                <div className="flex justify-between items-center mb-5">
                    <p>{category.name}</p>
                    <div>{category.icons.length}</div>
                </div>
                <div className="grid grid-cols-5 items-center gap-6">
                    {category.icons.slice(0, 15).map(icon => (
                        <div key={icon._id} dangerouslySetInnerHTML={{__html: icon.svgCode}}></div>
                    ))}
                </div>
            </figure>
        </Link>
    )
}


export default CategoryCard;