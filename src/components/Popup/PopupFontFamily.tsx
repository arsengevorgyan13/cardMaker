import {useEffect} from "react";
import {setFontFamily, setIsOpenFontFamilies} from "../Canvas/SetCanvas"

import "../../index.css";

type PopupProps = {
    close: () => void;
};

export function PopupFontFamily({close}: PopupProps) {

    useEffect(() => {
        if (setIsOpenFontFamilies()) {
            const popup = document.getElementById("popup") as HTMLDivElement;
            popup.style.display = "block";
        }
        ;
    }, [])

    function closePopup(font: string) {
        close();
        setFontFamily(font);
        const popup = document.getElementById("popup") as HTMLDivElement;
        popup.style.display = "none";
    }

    return (
        <div id="popup" className="families popup" style={{width: "140px", height: "215px", padding: "0"}}>
            <div className="popup-content">
                <button className="btn-font family" style={{fontFamily: "Sans-serif"}} onClick={() => {
                    closePopup("Sans-serif")
                }}>Sans-serif
                </button>
                <button className="btn-font family" style={{fontFamily: "Serif"}} onClick={() => {
                    closePopup("Serif")
                }}>Serif
                </button>
                <button className="btn-font family" style={{fontFamily: "Monospace"}} onClick={() => {
                    closePopup("Monospace")
                }}>Monospace
                </button>
                <button className="btn-font family" style={{fontFamily: "Arial"}} onClick={() => {
                    closePopup("Arial")
                }}>Arial
                </button>
                <button className="btn-font family" style={{fontFamily: "Arial Black"}} onClick={() => {
                    closePopup("Arial Black")
                }}>Arial Black
                </button>
                <button className="btn-font family" style={{fontFamily: "Comic Sans MS"}} onClick={() => {
                    closePopup("Comic Sans MS")
                }}>Comic Sans MS
                </button>
                <button className="btn-font family" style={{fontFamily: "Courier New"}} onClick={() => {
                    closePopup("Courier New")
                }}>Courier New
                </button>
                <button className="btn-font family" style={{fontFamily: "Georgia"}} onClick={() => {
                    closePopup("Georgia")
                }}>Georgia
                </button>
                <button className="btn-font family" style={{fontFamily: "Impact"}} onClick={() => {
                    closePopup("Impact")
                }}>Impact
                </button>
                <button className="btn-font family" style={{fontFamily: "Roboto"}} onClick={() => {
                    closePopup("Roboto")
                }}>Roboto
                </button>
                <button className="btn-font family" style={{fontFamily: "Times New Roman"}} onClick={() => {
                    closePopup("Times New Roman")
                }}>Times New Roman
                </button>
                <button className="btn-font family" style={{fontFamily: "Verdana"}} onClick={() => {
                    closePopup("Verdana")
                }}>Verdana
                </button>
                <button className="btn-font family" style={{fontFamily: "Arial"}}>Show more Fonts</button>
            </div>
        </div>
    );
}
