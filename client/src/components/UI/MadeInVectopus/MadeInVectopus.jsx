import styles from "./MadeInVectopus.module.scss"

const MadeInVectopus = () => {
    return (
        <div className={styles.madeInVectopus}>
            <img
                className={styles.vectopusLogo}
                src="/images/vectopus-logo.svg"
                alt="Vectopus logo"
            />
            <h3>Made in <span className="font-bold">Vectopus</span></h3>
            <div className={styles.teamMembersContainer}>
                <img className="!ml-0" src="/images/team-member-1.png"
                    srcSet="./images/team-member-1_2x.png 2x" alt="Team member 1" />

                <img src="/images/team-member-2.png" srcSet="./images/team-member-2_2x.png 2x"
                    alt="Team member 2" />

                <img src="/images/team-member-3.png" srcSet="./images/team-member-3_2x.png 2x"
                    alt="Team member 3" />

                <img src="/images/team-member-4.png" srcSet="./images/team-member-4_2x.png 2x"
                    alt="Team member 4" />

                <img src="/images/team-member-5.png" srcSet="./images/team-member-5_2x.png 2x"
                    alt="Team member 5" />

                <img src="/images/team-member-6.png" srcSet="./images/team-member-6_2x.png 2x"
                    alt="Team member 6" />

                <img src="/images/team-member-7.png" srcSet="./images/team-member-7_2x.png 2x"
                    alt="Team member 7" />

                <img src="/images/team-member-8.png" srcSet="./images/team-member-8_2x.png 2x"
                    alt="Team member 8" />

                <img src="/images/team-member-9.png" srcSet="./images/team-member-9_2x.png 2x"
                    alt="Team member 9" />
            </div>
            <p>
                We designed the icon library we always wanted to use. Easy to pick up and plug in. Truly consistent in style and scale. Flexible to multiple sizes and weights. Reserved enough to be multi-purpose, but a little quirky, too.
            </p>
            <p>
                Atlas icons is free and open-source, <span className="underline font-medium">licensed under MIT</span>. If you enjoy these icons, please spread the name and help other benefit too.
            </p>
            <a href="/">💡 Suggest new icons</a>
            <a href="/"> 🎨 Request custom icons</a>
            <a href="/"> 🖼️ Illustrations bundle</a>
            <a className="font-medium !my-36" href="/"> 
            <img className="inline-block mr-2" src="/images/twitter-icon.svg" alt="" />
            
            
            Share on twitter</a>


        </div>
    )
}

export default MadeInVectopus;