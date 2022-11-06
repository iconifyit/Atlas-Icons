import styles from "./IconDetails.module.scss"
const CodeContainer = ({ name, code }) => {
    return (
        <div className="col-span-5">
            <p className="text-xs font-medium mb-2">{name}</p>
            <div className={styles.codeDiv}>
                <span>
                    {code}
                </span>
                <button>
                    <img src="/images/copy-icon.svg" />
                </button>
            </div>
        </div>
    )
}

const IconDetails = ({icon, categoryDir, copySvgCode, closeDetails, handleDownload}) => {
    const iconsPath = "http://localhost:5000/uploads/icons/";
    // console.log("props: ", props)
    return (
        <>
            <button className="absolute top-3 right-3 p-3" onClick={() => {
                closeDetails()}}>
                <img src="/images/close-icon.svg" alt="" />
            </button>
            <div className="grid grid-cols-12 gap-x-12 gap-y-6">
                <div className={styles.iconSection}>
                    <div className="relative mt-7 mx-3 mb-7">
                        <div className={styles.iconContainer}>
                            <div className={styles.imgsAlign}>
                                <img src="/images/icon-grid.png" srcSet="./images/icon-grid_2x.png 2x" alt="" />
                                <div className="w-20 absolute" dangerouslySetInnerHTML={{__html: icon.svgCode}}></div>
                            </div>
                        </div>
                    </div>
                    <p className="text-center text-[1.1rem] truncate">{icon.name}</p>
                </div>
                <CodeContainer name="React" code={`<${icon.reactTaker} size={24} weight=“light” />`} />
                <CodeContainer name="HTML/CSS" code="<I class=“ph-chart-line-up-light”></I>" />
                <CodeContainer name="Vue" code="<ph-chart-line-up :size=“24” weight=“light” />" />
                <CodeContainer name="Flutter" code="Icon( PhosphorIcons.chartLineUpLight, size: 24.0, )" />
                <div className="col-span-5 mt-3 -mb-4 ">
                    <button className={styles.downloadBtn} onClick={handleDownload}>
                        Download
                    </button>
                    <button onClick={copySvgCode} className={styles.copySvgBtn}>
                        Copy SVG
                    </button>
                </div>
            </div>
        </>
    )
}



export default IconDetails;