import {useEffect, useState} from "react";
import {openBlock} from "../Canvas/BottomCanvas"

type PopupProps = {
    width: number;
    height: number;
    close: () => void;
    onResize: (newWidth: number, newHeight: number) => void;
};

export function Popup({width, height, close, onResize}: PopupProps) {
    const [inputWidth, setInputWidth] = useState(String(width));
    const [inputHeight, setInputHeight] = useState(String(height));

    useEffect(() => {
        if (openBlock) {
            const overlay = document.getElementById("overlay") as HTMLDivElement;
            const popup = document.getElementById("popup") as HTMLDivElement;
            overlay.style.display = "block";
            popup.style.display = "block";
        }
        ;
    })

    function closePopup() {
        close();
        const overlay = document.getElementById("overlay") as HTMLDivElement;
        const popup = document.getElementById("popup") as HTMLDivElement;
        overlay.style.display = "none";
        popup.style.display = "none";
    }

    function resizeCanvas() {
        close();
        closePopup();
        const newWidth = parseInt(inputWidth);
        const newHeight = parseInt(inputHeight);
        onResize(newWidth, newHeight);
    }

    return (
        <>
            <div id="overlay" className="overlay"></div>
            <div id="popup" className="popup">
                <div className="popup-content">
                    <div className="flex_block headerPopup">
                        <span className="resizeText">Resize</span>
                        <button id="closeButton" className="button btn-close" onClick={closePopup}>
                            x
                        </button>
                    </div>
                    <div>
                        <label htmlFor="widthInput">Width:</label>
                        <input
                            id="widthInput"
                            type="text"
                            className="widthInput"
                            value={inputWidth}
                            onChange={(e) => setInputWidth(e.target.value)}/>
                        <label htmlFor="heightInput">Height:</label>
                        <input
                            id="heightInput"
                            type="text"
                            className="heightInput"
                            value={inputHeight}
                            onChange={(e) => setInputHeight(e.target.value)}/>
                    </div>
                    <div className="flex_block menuPopup">
                        <button
                            id="closeButton"
                            className="button btn-cancel-Size"
                            style={{backgroundColor: "#b53f3f"}}
                            onClick={closePopup}
                        >
                            Cancel
                        </button>
                        <button
                            id="btn-confirm-Size"
                            className="button"
                            style={{backgroundColor: "#ffa500"}}
                            onClick={resizeCanvas}
                        >
                            Resize
                        </button>
                    </div>
                </div>
            </div>
        </>
    );
}