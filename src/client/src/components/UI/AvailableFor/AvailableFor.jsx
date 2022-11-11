import styles from "./AvailableFor.module.scss"
const AvailableFor = () => {
    return (
        <div className={styles.cardContainer}>
            <h2>

                Available for
            </h2>
            <p>
                We’ll do our best to keep the library up to date with all technologies and new apps
                This is a work in progress that will keep receiving new assets
            </p>
            <div className="flex flex-wrap xl:flex-nowrap grayscale mb-8 items-center space-x-8 justify-center">
                <div>
                    <img
                        src="/images/flutter-logo.png"
                        srcSet="./images/flutter-logo_2x.png 2x"
                        alt="Flutter logo"
                    />
                </div>
                <div>
                    <img
                        src="/images/tailwind-logo.png"
                        srcSet="./images/tailwind-logo_2x.png 2x"
                        alt="Tailwind logo"
                    />
                </div>
                <div>
                    <img
                        src="/images/framer-logo.png"
                        srcSet="./images/framer-logo_2x.png 2x"
                        alt="Framer logo"
                    />
                </div>
                <div>
                    <img
                        src="/images/reactjs-logo.png"
                        srcSet="./images/reactjs-logo_2x.png 2x"
                        alt="React logo"
                    />
                </div>
                <div>
                    <img
                        src="/images/figma-logo.png"
                        srcSet="./images/figma-logo_2x.png 2x"
                        alt="Figma logo"
                    />
                </div>
                <div>
                    <img
                        src="/images/sketch-logo.png"
                        srcSet="./images/sketch-logo_2x.png 2x"
                        alt="Sketch logo"
                    />
                </div>
                <div>
                    <img
                        src="/images/adobe_XD-logo.png"
                        srcSet="./images/adobe_XD-logo_2x.png 2x"
                        alt="Adobe XD logo"
                    />
                </div>
            </div>
            <button>
                Connect to Github
            </button>
        </div>
    )

}


export default AvailableFor;