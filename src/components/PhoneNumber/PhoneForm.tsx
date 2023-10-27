import React, {FC, useEffect, useRef, useState} from 'react';
import classes from "./PhoneForm.module.css"
import PhoneInput from "react-phone-number-input/input";
import PhoneNumberInput from "./PhoneNumberInput";

const qrCode = require("../../assets/qr-code.png")

interface Props {
    setCurrentScreen: React.Dispatch<React.SetStateAction<string>>
}

const PhoneForm: FC<Props> = ({setCurrentScreen}) => {
    const [phoneValue, setPhoneValue] = useState<string | undefined>("+7")
    const buttonsRef = useRef<Array<HTMLButtonElement | null>>([]);
    const [focusedButtonIndex, setFocusedButtonIndex] = useState<number | null>(null);
    const [checkBox, setCheckBox] = useState<boolean>(false)
    const [isCheckboxFocused, setCheckboxFocused] = useState(false);
    const phoneInputRef = useRef<HTMLInputElement>(null);
    const checkBoxRef = useRef<HTMLInputElement>(null)
    const confirmButtonRef = useRef<HTMLButtonElement>(null)
    const closeButtonRef = useRef<HTMLButtonElement>(null)
    const [isCloseButtonFocused, setIsCloseButtonFocused] = useState<boolean>(false)

    useEffect(() => {
        if (phoneInputRef.current) {
            phoneInputRef.current.focus()
        }
    }, []);

    useEffect(() => {
        if (buttonsRef.current.length > 0 && focusedButtonIndex !== null) {
            const buttonToFocus = buttonsRef.current[focusedButtonIndex];
            if (buttonToFocus) {
                buttonToFocus.focus();
            }
        }
    }, [focusedButtonIndex]);

    const handleInputKeyDown = (event: React.KeyboardEvent<HTMLInputElement>) => {
        if (event.key === "ArrowDown") {
            setFocusedButtonIndex(0)
        }
    }

    const handleButtonKeyDown = (event: React.KeyboardEvent<HTMLButtonElement>, index: number) => {
        let newIndex;

        switch (event.key) {
            case 'ArrowUp':
                newIndex = index - 3;
                break;
            case 'ArrowDown':
                newIndex = index + 3;
                break;
            case 'ArrowLeft':
                newIndex = index - 1;
                break;
            case 'ArrowRight':
                newIndex = index + 1;
                break;
            default:
                return;
        }

        setFocusedButtonIndex(newIndex);

        if (newIndex < 0) {
            setFocusedButtonIndex(null)
            if (phoneInputRef.current) {
                phoneInputRef.current.focus()
            }
        }

        if (newIndex > 10) {
            if (checkBoxRef.current) {
                checkBoxRef.current.focus()
                setCheckboxFocused(true)
                setFocusedButtonIndex(null)
            }

        }
    };

    const handleCheckboxKeyDown = (event: React.KeyboardEvent<HTMLDivElement>) => {
        if (event.key === 'ArrowUp') {
            if (phoneValue) {
                setFocusedButtonIndex(10);
                setCheckboxFocused(false);
            }
        } else if (event.key === 'ArrowDown') {
            if (checkBox) {
                if (confirmButtonRef.current) {
                    confirmButtonRef.current.focus()
                    setCheckboxFocused(false)
                }
            } else {
                if (closeButtonRef.current) {
                    closeButtonRef.current.focus()
                    setIsCloseButtonFocused(true)
                }
            }
        }
    };

    const handleConfirmButtonKeyDown = (event: React.KeyboardEvent) => {
        if (event.key === "ArrowUp") {
            if (checkBoxRef.current) {
                checkBoxRef.current.focus()
            }
        }
        if (event.key === "ArrowDown") {
            if (closeButtonRef.current) {
                closeButtonRef.current.focus()
                setIsCloseButtonFocused(true)
            }
        }
    }

    const handleCloseButtonKeyDown = (event: React.KeyboardEvent) => {
        if (event.key === "ArrowUp" || event.key === "ArrowLeft") {
            if (checkBox) {
                if (confirmButtonRef.current) {
                    confirmButtonRef.current.focus()
                    setIsCloseButtonFocused(false)
                }
            } else {
                if (checkBoxRef.current) {
                    checkBoxRef.current.focus()
                    setIsCloseButtonFocused(false)
                }
            }

        }
    }

    const handleNumberClick = (digit: string) => {
        if (phoneValue && phoneValue.length > 11) {
            return
        }
        if (phoneValue) {
            setPhoneValue((prevValue) => (prevValue ? prevValue + digit : digit));
        } else {
            setPhoneValue(digit);
        }
    };


    const handleBackspaceClick = () => {
        if (phoneValue && phoneValue.length > 2) {
            setPhoneValue(phoneValue.slice(0, -1));
        }
    };

    const handleConfirmClick = () => {
        //тут запрос на сервер с номером...
        setCurrentScreen("final")
    }

    return (

        <div className={classes.container}>
            <div className={classes.phone_number_holder}>
                <h2>Введите ваш номер телефона</h2>
                <PhoneInput
                    className={classes.phone_number_input}
                    value={phoneValue}
                    onChange={(e) => setPhoneValue(e)}
                    useNationalFormatForDefaultCountryValue={true}
                    country={"RU"}
                    international={true}
                    withCountryCallingCode={true}
                    ref={phoneInputRef}
                    onKeyDown={handleInputKeyDown}
                />
                <div>и с Вами свяжется наш менеждер для дальнейшей консультации</div>
                <PhoneNumberInput
                    handleNumberClick={handleNumberClick}
                    handleBackspaceClick={handleBackspaceClick}
                    buttonsRef={buttonsRef}
                    handleButtonKeyDown={handleButtonKeyDown}
                    focusedButtonIndex={focusedButtonIndex}
                />
                <div
                    className={`${classes.checkbox_form}`}
                    tabIndex={0}
                >
                    <input
                        type={"checkbox"}
                        checked={checkBox}
                        className={classes.checkbox_input}
                        tabIndex={0}
                        ref={checkBoxRef}
                        onKeyDown={handleCheckboxKeyDown}
                        onChange={() => setCheckBox(prevState => !prevState)}
                    />
                    <div>
                        Согласие на обработку персональных данных
                    </div>
                </div>

                <div>
                    <button
                        className={classes.confirm_button}
                        disabled={!checkBox}
                        ref={confirmButtonRef}
                        onKeyDown={handleConfirmButtonKeyDown}
                        onClick={handleConfirmClick}
                    >
                        Подтвердить номер
                    </button>
                </div>
            </div>
            <button
                className={`${classes.close_button} ${isCloseButtonFocused ? classes.close_button_focus : ""}`}
                ref={closeButtonRef}
                onKeyDown={handleCloseButtonKeyDown}
                onClick={() => setCurrentScreen("promo")}
            >
                X
            </button>
            <div className={classes.qrcode_holder}>
                <div className={classes.qrcode_text}>
                    СКАНИРУЙТЕ QR-КОД ДЛЯ ПОЛУЧЕНИЯ ДОПОЛНИТЕЛЬНОЙ ИНФОРМАЦИИ
                </div>
                <img src={qrCode} alt=""/>
            </div>
        </div>
    );
};

export default PhoneForm;