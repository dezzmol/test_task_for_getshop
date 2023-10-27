import React, {FC, useEffect, useRef, useState} from 'react';
import classes from "./FinalInfoScreen.module.css"
const qrCode = require("../../assets/qr-code.png")

interface Props {
    setCurrentScreen: React.Dispatch<React.SetStateAction<string>>
}

const FinalInfoScreen: FC<Props> = ({setCurrentScreen}) => {
    const [isCloseButtonFocused, setIsCloseButtonFocused] = useState<boolean>(false)
    const closeButtonRef = useRef<HTMLButtonElement>(null)

    useEffect(() => {
        if (closeButtonRef.current) {
            setIsCloseButtonFocused(true)
            closeButtonRef.current.focus()
        }
    }, []);

    return (
        <div className={classes.container}>
            <div className={classes.text_holder}>
                <h1>ЗАЯВКА ПРИНЯТА</h1>
                <div>Держите телефон под рукой. Скоро с Вами свяжется наш менеджер. </div>
            </div>
            <div className={classes.qrcode_holder}>
                <div className={classes.qrcode_text}>
                    СКАНИРУЙТЕ QR-КОД ДЛЯ ПОЛУЧЕНИЯ ДОПОЛНИТЕЛЬНОЙ ИНФОРМАЦИИ
                </div>
                <img src={qrCode} alt=""/>
            </div>
            <button
                className={`${classes.close_button} ${isCloseButtonFocused ? classes.close_button_focus : ""}`}
                ref={closeButtonRef}
                onClick={() => setCurrentScreen("promo")}
            >
                X
            </button>
        </div>
    );
};

export default FinalInfoScreen;