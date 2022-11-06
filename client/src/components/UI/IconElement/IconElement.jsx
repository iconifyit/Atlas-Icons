import IconDetails from '../IconDetails/IconDetails';
import styles from "./IconElement.module.scss";
import http from "../../../services/httpService";
import fileDownload from 'js-file-download'


const IconElement = ({ icon, categoryDir, activeIcon, setActiveIcon }) => {
    const iconsPath = "http://localhost:5000/uploads/icons/";
    const closeDetails = () => {
        setActiveIcon(null)
    }

    const viewDetails = () => {
        setActiveIcon(icon._id)
    }

    const handleDownload = () => {
        http.get(`${iconsPath}${categoryDir}/${icon.filename}`, {
            responseType: 'blob',
        })
            .then((res) => {
                fileDownload(res.data, icon.filename)
            })
    }


    const copySvgCode = () => {
        const svgText = icon.svgCode;
        navigator.clipboard.writeText(svgText);
    }


    return (
        <>
            <figure>
                <div className={styles.relativeContainer}>
                    <div className={styles.imageContainer}>
                        <div className=" w-14" dangerouslySetInnerHTML={{ __html: icon.svgCode }}></div>
                    </div>
                    <div className={styles.imageCtrls}>
                        <div className={styles.ctrlsGrid}>
                            <button onClick={handleDownload} >
                                Download
                            </button>
                            <button onClick={copySvgCode}>
                                Copy SVG
                            </button>
                            <button onClick={viewDetails}>
                                View
                            </button>
                        </div>
                    </div>
                </div>
                <figcaption className={styles.figCaption}>{icon.name}</figcaption>
            </figure>
            {activeIcon === icon._id &&
                <div className={styles.iconDetailsCard}>
                    <IconDetails copySvgCode={copySvgCode} handleDownload={handleDownload} icon={icon} categoryDir={categoryDir} closeDetails={closeDetails} />
                </div>
            }
        </>

    )
}

export default IconElement;