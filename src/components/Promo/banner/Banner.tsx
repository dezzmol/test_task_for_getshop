import React, {FC, useEffect, useRef} from 'react';
import classes from "./Banner.module.css"
const qrCode = require("../../../assets/qr-code.png")

interface Props {
    showBanner: boolean;
    setCurrentScreen: React.Dispatch<React.SetStateAction<string>>;
}

const Banner: FC<Props> = ({showBanner, setCurrentScreen}) => {
    const buttonRef = useRef<HTMLButtonElement>(null)

    useEffect(() => {
        if (buttonRef.current) {
            buttonRef.current.focus()
        }
    }, []);

    return (
        <div className={`${classes.banner} ${showBanner ? classes.banner_show : ""}`}>
            <h3>Зарегиструйтесь сейчас на закрытую презентации нового автомобиля!</h3>
            <img src={qrCode} />
            <div>Отсканируйте QR-код или нажмите кнопку ниже</div>
            <button
                onClick={() => setCurrentScreen("input")}
                ref={buttonRef}
            >
                ОК</button>
        </div>
    );
};

export default Banner;