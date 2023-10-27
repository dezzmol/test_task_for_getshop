import React, {FC} from 'react';
import classes from "./PhoneNumberInput.module.css"

interface Props {
    handleNumberClick(digit: string): void;
    handleBackspaceClick(): void;
    buttonsRef: React.MutableRefObject<(HTMLButtonElement | null)[]>;
    handleButtonKeyDown(event: React.KeyboardEvent<HTMLButtonElement>, index: number): void;
}

const PhoneNumberInput: FC<Props> = ({handleNumberClick, handleBackspaceClick, buttonsRef, handleButtonKeyDown}) => {


    return (
        <div className={classes.button_holder}>
            {[1, 2, 3, 4, 5, 6, 7, 8, 9, 0].map((item, index) => (
                <button
                    ref={(el) => (buttonsRef.current[index] = el)}
                    key={item}
                    onClick={() => handleNumberClick(item.toString())}
                    onKeyDown={(e) => handleButtonKeyDown(e, index)}
                    tabIndex={0}
                    className={classes.number_button}
                >
                    {item}
                </button>
            ))}
            <button
                ref={(el) => (buttonsRef.current[10] = el)}
                className={classes.backspace_button}
                onClick={handleBackspaceClick}
                onKeyDown={(e) => handleButtonKeyDown(e, 10)}
                tabIndex={0}
            >
                СТЕРЕТЬ
            </button>
        </div>
    );
};

export default PhoneNumberInput;