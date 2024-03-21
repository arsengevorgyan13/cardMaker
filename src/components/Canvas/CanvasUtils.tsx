import React, {useState} from "react";
import {GraphicObject, ImageBlock, Position, TextBlock} from "../../types/types";
import {graphicBlock, textBlock} from "../../types/data";
import {
    onClick,
    setactiveBorderColor,
    setactiveColor,
    setactiveFont,
    setactiveFontFamilies,
    setactiveImage,
    setactiveObjCircle,
    setactiveObjTriangle,
    setactiveObSquare,
    setObj,
    setTextBold,
    setTextItalic,
    setTextStriketrough,
    setTextUnderline
} from "./SetCanvas";
import "../../index.css";

type CanvasUtilsProps = {
    inputBlocks: TextBlock[];
    setInputBlocks: React.Dispatch<React.SetStateAction<TextBlock[]>>;
    imageBlocks: ImageBlock[];
    setImageBlocks: React.Dispatch<React.SetStateAction<ImageBlock[]>>;
    objBlocksTriangle: GraphicObject[];
    setObjBlocksTriangle: React.Dispatch<React.SetStateAction<GraphicObject[]>>;
    objBlocksSquare: GraphicObject[];
    setObjBlocksSquare: React.Dispatch<React.SetStateAction<GraphicObject[]>>;
    objBlocksCircle: GraphicObject[];
    setObjBlocksCircle: React.Dispatch<React.SetStateAction<GraphicObject[]>>;
};

export function CanvasUtils({
                                inputBlocks,
                                setInputBlocks,
                                imageBlocks,
                                setImageBlocks,
                                objBlocksTriangle,
                                setObjBlocksTriangle,
                                objBlocksSquare,
                                setObjBlocksSquare,
                                objBlocksCircle,
                                setObjBlocksCircle
                            }: CanvasUtilsProps) {

    const [zIndex, setzIndex] = useState(2);

    const handleCanvasClick = (event: React.MouseEvent) => {
        const active = onClick();
        const activeImage = setactiveImage();
        const activeObj = setactiveObjTriangle() || setactiveObSquare() || setactiveObjCircle();

        setzIndex(zIndex + 1);

        const clickedPosition: Position = {
            x: event.clientX - 6,
            y: event.clientY - 5
        };

        if (active) {
            const inputBlock: TextBlock = {
                id: inputBlocks.length + 1,
                position: clickedPosition,
                type: textBlock.type,
                width: textBlock.width,
                height: textBlock.height,
                zIndex: zIndex,
                text: {
                    fontSize: setactiveFont(),
                    fontFamily: setactiveFontFamilies(),
                    fontWeight: setTextBold(),
                    fontStyle: setTextItalic(),
                    textDecorationLine: `${setTextUnderline()} ${setTextStriketrough()}`,
                    borderColor: setactiveBorderColor(),
                    color: setactiveColor(),
                    value: textBlock.text.value,
                }
            };

            setInputBlocks([...inputBlocks, inputBlock]);
        }
        if (activeImage) {
            const inputElement = document.createElement("input");
            inputElement.type = "file";
            inputElement.accept = "image/*";
            inputElement.onchange = (e: Event) => {
                const target = e.target as HTMLInputElement;
                if ((target.files && target.files[0])) {
                    const file = target.files[0];
                    const reader = new FileReader();
                    reader.onload = () => {
                        const imageUrl = reader.result;
                        if (imageUrl && typeof imageUrl === "string") {
                            const imageBlock: ImageBlock = {
                                id: imageBlocks.length + 1,
                                position: clickedPosition,
                                type: "image",
                                width: 100,
                                height: 100,
                                zIndex: zIndex,
                                imageUrl: imageUrl,
                            };
                            setImageBlocks([...imageBlocks, imageBlock]);
                        }
                    };
                    reader.readAsDataURL(file);
                }
            };
            inputElement.click();
            return;
        }
        if (activeObj) {
            let obj = setObj();
            if (obj === "triangle") {
                const objBlock: GraphicObject = {
                    id: objBlocksTriangle.length + 1,
                    type: graphicBlock.type,
                    width: 100,
                    height: 100,
                    borderColor: setactiveBorderColor(),
                    color: setactiveColor(),
                    zIndex: zIndex,
                    position: clickedPosition,
                }
                setObjBlocksTriangle([...objBlocksTriangle, objBlock])
            } else if (obj === "square") {
                const objBlock: GraphicObject = {
                    id: objBlocksSquare.length + 1,
                    type: graphicBlock.type,
                    width: 100,
                    height: 100,
                    borderColor: setactiveBorderColor(),
                    color: setactiveColor(),
                    zIndex: zIndex,
                    position: clickedPosition,
                }
                setObjBlocksSquare([...objBlocksSquare, objBlock])
            } else if (obj === "circle") {
                const objBlock: GraphicObject = {
                    id: objBlocksCircle.length + 1,
                    type: graphicBlock.type,
                    width: 100,
                    height: 100,
                    borderColor: setactiveBorderColor(),
                    color: setactiveColor(),
                    zIndex: zIndex,
                    position: clickedPosition,
                }
                setObjBlocksCircle([...objBlocksCircle, objBlock])
            }

        }
    }

}