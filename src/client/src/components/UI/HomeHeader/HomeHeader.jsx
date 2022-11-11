import styles from './HomeHeader.module.scss';

const HomeHeader = () => {
    return (
        <div className="container">
            <div className={styles.homeHeader}>
                <div className="xl:w-10/12 2xl:w-7/12 mx-auto">
                    <p className='!font-semibold'>1,600 icons. MIT License. Ready libraries</p>
                    <h1>Clean + Consistent / <span className='underline decoration-8 decoration-[#FFD00F]'>Icons</span></h1>
                    <h3>
                        Open source icons library, Icons available in SVG format, Font, Figma, Adobe XD and Iconjar Libraries
                    </h3>
                    <p className={styles.madeByVectopus}>Made by Vectopus</p>
                </div>
            </div>
        </div>
    )
}

export default HomeHeader;