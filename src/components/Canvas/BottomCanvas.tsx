import {useState} from "react";
import {Popup} from "../Popup/Popup";

type CanvasProps = {
    width: number;
    height: number;
    onSizeChange: (newWidth: number, newHeight: number) => void;
};

export let openBlock = false;

export function BottomCanvas({width, height, onSizeChange}: CanvasProps) {
    const [isOpen, setIsOpen] = useState(false);

    function open() {
        openBlock = true;
        setIsOpen(true);
    }

    function close() {
        openBlock = false;
        setIsOpen(false);
    }

    return (
        <>
            <div className="bottom-Bar" id="setBar">
                <button className="button size-canvas" onClick={open}>
                    {width} <span>x</span> {height}
                </button>

            </div>
            {isOpen && (
                <Popup width={width} height={height} close={close} onResize={onSizeChange}/>
            )}
        </>

    );
}