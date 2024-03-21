import {useEffect} from "react";
import {setFont, setIsOpenFonts} from "../Canvas/SetCanvas"

import "../../index.css";

type PopupProps = {
    close: () => void;
};

export function PopupFonts({close}: PopupProps) {

    useEffect(() => {
        if (setIsOpenFonts()) {
            const popup = document.getElementById("popup") as HTMLDivElement;
            popup.style.display = "block";
        }
        ;
    }, [])

    function closePopup(font: number) {
        close();
        setFont(font);
        const popup = document.getElementById("popup") as HTMLDivElement;
        popup.style.display = "none";
    }

    return (
        <div id="popup" className="fonts popup" style={{width: "80px", height: "215px", padding: "0"}}>
            <div className="popup-content">
                <button className="btn-font" onClick={() => {
                    closePopup(6)
                }}>6
                </button>
                <button className="btn-font" onClick={() => {
                    closePopup(7)
                }}>7
                </button>
                <button className="btn-font" onClick={() => {
                    closePopup(8)
                }}>8
                </button>
                <button className="btn-font" onClick={() => {
                    closePopup(9)
                }}>9
                </button>
                <button className="btn-font" onClick={() => {
                    closePopup(10)
                }}>10
                </button>
                <button className="btn-font" onClick={() => {
                    closePopup(11)
                }}>11
                </button>
                <button className="btn-font" onClick={() => {
                    closePopup(12)
                }}>12
                </button>
                <button className="btn-font" onClick={() => {
                    closePopup(14)
                }}>14
                </button>
                <button className="btn-font" onClick={() => {
                    closePopup(16)
                }}>16
                </button>
                <button className="btn-font" onClick={() => {
                    closePopup(18)
                }}>18
                </button>
                <button className="btn-font" onClick={() => {
                    closePopup(20)
                }}>20
                </button>
                <button className="btn-font" onClick={() => {
                    closePopup(22)
                }}>22
                </button>
                <button className="btn-font" onClick={() => {
                    closePopup(24)
                }}>24
                </button>
                <button className="btn-font" onClick={() => {
                    closePopup(26)
                }}>26
                </button>
                <button className="btn-font" onClick={() => {
                    closePopup(28)
                }}>28
                </button>
                <button className="btn-font" onClick={() => {
                    closePopup(32)
                }}>32
                </button>
                <button className="btn-font" onClick={() => {
                    closePopup(36)
                }}>36
                </button>
                <button className="btn-font" onClick={() => {
                    closePopup(40)
                }}>40
                </button>
                <button className="btn-font" onClick={() => {
                    closePopup(48)
                }}>48
                </button>
                <button className="btn-font" onClick={() => {
                    closePopup(56)
                }}>56
                </button>
                <button className="btn-font" onClick={() => {
                    closePopup(64)
                }}>64
                </button>
                <button className="btn-font" onClick={() => {
                    closePopup(72)
                }}>72
                </button>
                <button className="btn-font" onClick={() => {
                    closePopup(96)
                }}>96
                </button>
                <button className="btn-font" onClick={() => {
                    closePopup(128)
                }}>128
                </button>
                <button className="btn-font" onClick={() => {
                    closePopup(160)
                }}>160
                </button>
                <button className="btn-font" onClick={() => {
                    closePopup(192)
                }}>192
                </button>
            </div>
        </div>
    );
}
