import React, {FC, useEffect, useState} from 'react';
import ReactPlayer from "react-player";
import Banner from "./banner/Banner";
import classes from "./PromoVideo.module.css"
const video = require("../../assets/video.mp4")

interface Props {
    setCurrentScreen: React.Dispatch<React.SetStateAction<string>>
}

const PromoVideo: FC<Props> = ({setCurrentScreen}) => {
    const [showBanner, setShowBanner] = useState<boolean>(false);
    const [pauseVideo, setPauseVideo] = useState<boolean>(false);


    useEffect(() => {
        const timer = setTimeout(() => {
            console.log("s")
            setShowBanner(true);
        }, 5000);

        return () => clearTimeout(timer);
    }, []);



    return (
        <div className={classes.video_player}>
            <video
                width="1280" autoPlay={true} muted loop={true}
                src={video}
            >
            </video>
            <Banner showBanner={showBanner} setCurrentScreen={setCurrentScreen}/>

        </div>
    );
};

export default PromoVideo;