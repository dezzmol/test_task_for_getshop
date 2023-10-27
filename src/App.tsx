import React, {useState} from 'react';
import PromoVideo from "./components/Promo/PromoVideo";
import FinalInfoScreen from "./components/finalScreen/FinalInfoScreen";
import classes from "./App.css"
import PhoneForm from "./components/PhoneNumber/PhoneForm";


const App = () => {
    const [currentScreen, setCurrentScreen] = useState<string>("promo");

    return (
        <div className={classes.App}>
            {currentScreen === 'promo' && <PromoVideo setCurrentScreen={setCurrentScreen} />}
            {currentScreen === 'input' && <PhoneForm setCurrentScreen={setCurrentScreen} />}
            {currentScreen === 'final' && <FinalInfoScreen setCurrentScreen={setCurrentScreen}/>}
        </div>
    );
};

export default App;