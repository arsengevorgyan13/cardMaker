import React, {useState} from "react";
import {PrintCanvas} from "./components/Canvas/PrintCanvas";
import {SetCanvas} from "./components/Canvas/SetCanvas";
import {BottomCanvas} from "./components/Canvas/BottomCanvas";
import {canvas} from "./types/data";
import {GraphicObject, ImageBlock, TextBlock} from "./types/types";

function App() {

    const [width, setWidth] = useState(canvas.select.size.width);
    const [height, setHeight] = useState(canvas.select.size.height);

    const handleSizeChange = (newWidth: number, newHeight: number) => {
        setWidth(newWidth);
        setHeight(newHeight);
    };

    const [drawPixels, setDrawPixels] = useState<{ x: number; y: number }[]>([]);
    const [inputBlocks, setInputBlocks] = useState<TextBlock[]>([]);
    const [imageBlocks, setImageBlocks] = useState<ImageBlock[]>([]);
    const [objBlocks, setObjBlocks] = useState<GraphicObject[]>([]);

    return (
        <>
            <SetCanvas drawPixels={drawPixels} setDrawPixels={setDrawPixels} inputBlocks={inputBlocks} imageBlocks={imageBlocks}
                       setInputBlocks={setInputBlocks} objBlocks={objBlocks} setObjBlocks={setObjBlocks}
                       setImageBlocks={setImageBlocks}/>
            <PrintCanvas width={width} height={height} canvas={canvas} drawPixels={drawPixels}
                         setDrawPixels={setDrawPixels} inputBlocks={inputBlocks} imageBlocks={imageBlocks}
                         setInputBlocks={setInputBlocks} objBlocks={objBlocks} setObjBlocks={setObjBlocks}
                         setImageBlocks={setImageBlocks}/>
            <BottomCanvas
                width={width}
                height={height}
                onSizeChange={handleSizeChange}
            />
        </>
    );
}

export default App;