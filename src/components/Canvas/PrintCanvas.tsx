import React, {useEffect, useRef, useState} from "react";
import {Canvas, GraphicObject, ImageBlock, Position, TextBlock} from "../../types/types";
import {textBlock} from "../../types/data";
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

import {useDispatch, useSelector} from 'react-redux';
import {clearDeleteData} from "../reducers/deleteDataSlice";
import {AppDispatch, RootState} from "../../ReduxStore";

type Pixels = { x: number; y: number }[]

type CanvasProps = {
    canvas: Canvas;
    width: number;
    height: number;
    drawPixels: Pixels;
    setDrawPixels: (arg0: Pixels) => void;
    inputBlocks: TextBlock[];
    setInputBlocks: (arg0: TextBlock[]) => void;
    imageBlocks: ImageBlock[];
    setImageBlocks: (arg0: ImageBlock[]) => void;
    objBlocks: GraphicObject[];
    setObjBlocks: (arg0: GraphicObject[]) => void;

};

export let canvasTop: number;
export let canvasLeft: number;

export function PrintCanvas({
                                canvas,
                                width,
                                height,
                                drawPixels,
                                setDrawPixels,
                                setObjBlocks,
                                objBlocks,
                                setImageBlocks,
                                setInputBlocks,
                                inputBlocks,
                                imageBlocks
                            }: CanvasProps) {

    const useAppDispatch = () => useDispatch<AppDispatch>();
    const dispatch = useAppDispatch();
    const isDelData = useSelector((state: RootState) => state.deleteData.deleteData);

    const handleCanvas = (event: React.MouseEvent) => {
        canvasTop = event.currentTarget.getBoundingClientRect().top;
        canvasLeft = event.currentTarget.getBoundingClientRect().left;
        if (isDelData) {
            setInputBlocks([]);
            setImageBlocks([]);
            setDrawPixels([]);
            setObjBlocks([]);
            dispatch(clearDeleteData());
        }

    }

    const getLinePixels = (x1: number, y1: number, x2: number, y2: number) => {
        const pixels: { x: number; y: number }[] = [];

        const dx = Math.abs(x2 - x1);
        const dy = Math.abs(y2 - y1);
        const sx = x1 < x2 ? 1 : -1;
        const sy = y1 < y2 ? 1 : -1;
        let err = dx - dy;

        while (true) {
            pixels.push({x: x1, y: y1});

            if (x1 === x2 && y1 === y2) break;

            const e2 = 2 * err;
            if (e2 > -dy) {
                err -= dy;
                x1 += sx;
            }
            if (e2 < dx) {
                err += dx;
                y1 += sy;
            }
        }

        return pixels;
    };

    const inputRef = useRef<HTMLInputElement | null>(null);


    const [zIndex, setzIndex] = useState(2);

    const [currentTarget, setCurrentTarget] = useState("");
    const [searchTarget, setSearchTarget] = useState(true);
    const [dragging, setDragging] = useState(false);
    const [draggingSize, setDraggingSize] = useState(false);
    const [delX, setDelX] = useState(0);
    const [delY, setDelY] = useState(0);

    const handleMouseDownSize = (e: { clientX: number; clientY: number; }, x: number, y: number) => {
        setDraggingSize(true);
    };

    const handleMouseMoveSize = (x: number, y: number, id: number, type: string, isNwseSize: boolean) => {
        if (!draggingSize) {
            return;
        }

        if (type === "text") {
            const handleMouseMove = (e: { clientX: number; clientY: number; }) => {
                const updatedInputBlocks = inputBlocks.map((inputBlock) => {
                    if (inputBlock.id === id) {
                        return {
                            ...inputBlock,
                            width: e.clientX - inputBlock.position.x,
                            height: e.clientY - inputBlock.position.y
                        };
                    }
                    return inputBlock;
                });
                setInputBlocks(updatedInputBlocks);
            };

            const handleMouseUp = () => {
                window.removeEventListener("mousemove", handleMouseMove);
                window.removeEventListener("mouseup", handleMouseUp);
            };

            window.addEventListener("mousemove", handleMouseMove);
            window.addEventListener("mouseup", handleMouseUp);

        } else if (type === "image") {
            const handleMouseMove = (e: { clientX: number; clientY: number; }) => {
                const updatedImagesBlocks = imageBlocks.map((block) => {
                    if (block.id === id) {
                        return {
                            ...block,
                            width: e.clientX - block.position.x,
                            height: e.clientY - block.position.y
                        };
                    }
                    return block;
                });

                setImageBlocks(updatedImagesBlocks);
            };

            const handleMouseUp = () => {
                window.removeEventListener("mousemove", handleMouseMove);
                window.removeEventListener("mouseup", handleMouseUp);
            };

            window.addEventListener("mousemove", handleMouseMove);
            window.addEventListener("mouseup", handleMouseUp);
        } else if (type === "triangle" || type === "square" || type === "circle") {
            const handleMouseMove = (e: { clientX: number; clientY: number; }) => {
                const updatedObjectBlocks = objBlocks.map((block) => {
                    if (block.id === id) {
                        return {
                            ...block,
                            width: e.clientX - block.position.x,
                            height: e.clientY - block.position.y
                        };
                    }
                    return block;
                });

                setObjBlocks(updatedObjectBlocks);
            };

            const handleMouseUp = () => {
                window.removeEventListener("mousemove", handleMouseMove);
                window.removeEventListener("mouseup", handleMouseUp);
            };

            window.addEventListener("mousemove", handleMouseMove);
            window.addEventListener("mouseup", handleMouseUp);
        }
    };

    const handleMouseUpSize = () => {
        setDraggingSize(false);
    };

    const handleMouseDown = (e: { clientX: number; clientY: number; }, x: number, y: number) => {
        setDragging(true);
        setDelX(e.clientX - x);
        setDelY(e.clientY - y);
    };

    const handleMouseMove = (x: number, y: number, id: number, type: string, isNwseSize: boolean) => {
        if (!dragging) {
            return;
        }

        if (type === "text") {
            const handleMouseMove = (e: { clientX: number; clientY: number; }) => {
                const updatedInputBlocks = inputBlocks.map((inputBlock) => {
                    if (inputBlock.id === id) {
                        if ((searchTarget || currentTarget === "text-target")) {
                            if (searchTarget) {
                                setCurrentTarget("text-target");
                                setSearchTarget(false)
                            }
                            ;
                            return {
                                ...inputBlock,
                                position: {
                                    x: e.clientX - delX,
                                    y: e.clientY - delY,
                                },
                            };
                        }
                    }
                    return inputBlock;
                });

                setInputBlocks(updatedInputBlocks);
            };

            const handleMouseUp = () => {
                window.removeEventListener("mousemove", handleMouseMove);
                window.removeEventListener("mouseup", handleMouseUp);
            };

            window.addEventListener("mousemove", handleMouseMove);
            window.addEventListener("mouseup", handleMouseUp);

        } else if (type === "image") {
            const handleMouseMove = (e: { clientX: number; clientY: number; }) => {
                const updatedImagesBlocks = imageBlocks.map((block) => {
                    if (block.id === id) {
                        if (searchTarget) setCurrentTarget("image-target");
                        return {
                            ...block,
                            position: {
                                x: e.clientX - delX,
                                y: e.clientY - delY,
                            },
                        }
                    }
                    return block;
                });

                setImageBlocks(updatedImagesBlocks);
            };

            const handleMouseUp = () => {
                window.removeEventListener("mousemove", handleMouseMove);
                window.removeEventListener("mouseup", handleMouseUp);
            };

            window.addEventListener("mousemove", handleMouseMove);
            window.addEventListener("mouseup", handleMouseUp);
        } else if (type === "triangle" || type === "square" || type === "circle") {
            const handleMouseMove = (e: { clientX: number; clientY: number; }) => {
                const updatedObjectBlocks = objBlocks.map((block) => {
                    if (block.id === id) {
                        return {
                            ...block,
                            position: {
                                x: e.clientX - delX,
                                y: e.clientY - delY,
                            },
                        }
                    }
                    return block;
                });

                setObjBlocks(updatedObjectBlocks);
            };

            const handleMouseUp = () => {
                window.removeEventListener("mousemove", handleMouseMove);
                window.removeEventListener("mouseup", handleMouseUp);
            };

            window.addEventListener("mousemove", handleMouseMove);
            window.addEventListener("mouseup", handleMouseUp);
        }
    };

    const handleMouseUp = () => {
        setDragging(false);
        setSearchTarget(true);
        setCurrentTarget("");
    };

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
                if (target.files && target.files[0]) {
                    const file = target.files[0];
                    const reader = new FileReader();
                    reader.onload = () => {
                        const imageUrl = reader.result;
                        if (imageUrl && typeof imageUrl === "string") {
                            const image = new Image();
                            image.onload = () => {
                                const width = image.naturalWidth;
                                const height = image.naturalHeight;
                                const imageBlock: ImageBlock = {
                                    id: imageBlocks.length + 1,
                                    position: clickedPosition,
                                    type: "image",
                                    width: width,
                                    height: height,
                                    zIndex: zIndex,
                                    imageUrl: imageUrl,
                                };
                                setImageBlocks([...imageBlocks, imageBlock]);
                            };
                            image.src = imageUrl;
                        }
                    };
                    reader.readAsDataURL(file);
                }
            };
            inputElement.click();

            return
        }
        if (activeObj) {
            let obj = setObj();
            if (obj === "triangle") {
                const objBlock: GraphicObject = {
                    id: objBlocks.length + 1,
                    type: "triangle",
                    width: 100,
                    height: 100,
                    borderColor: setactiveBorderColor(),
                    color: setactiveColor(),
                    zIndex: zIndex,
                    position: clickedPosition,
                }
                setObjBlocks([...objBlocks, objBlock])
            } else if (obj === "square") {
                const objBlock: GraphicObject = {
                    id: objBlocks.length + 1,
                    type: "square",
                    width: 100,
                    height: 100,
                    borderColor: setactiveBorderColor(),
                    color: setactiveColor(),
                    zIndex: zIndex,
                    position: clickedPosition,
                }
                setObjBlocks([...objBlocks, objBlock])
            } else if (obj === "circle") {
                const objBlock: GraphicObject = {
                    id: objBlocks.length + 1,
                    type: "circle",
                    width: 100,
                    height: 100,
                    borderColor: setactiveBorderColor(),
                    color: setactiveColor(),
                    zIndex: zIndex,
                    position: clickedPosition,
                }
                setObjBlocks([...objBlocks, objBlock])
            }
        }
    }

    useEffect(() => {
        if (inputRef.current) {
            inputRef.current.focus();
        }
    }, [inputBlocks.length]);

    const isDrawing = useRef(false);

    const onMouseDown = () => {
        isDrawing.current = true;
    };

    const onMouseUp = () => {
        isDrawing.current = false;
    };

    useEffect(() => {
        document.addEventListener('mousedown', onMouseDown);
        document.addEventListener('mouseup', onMouseUp);

        return () => {
            document.removeEventListener('mousedown', onMouseDown);
            document.removeEventListener('mouseup', onMouseUp);
        };
    }, []);

    return (
        <div>
            <canvas
                id="canvas"
                className="canvas"
                style={{
                    backgroundColor: canvas.backgroundColor,
                    width: `${width}px`,
                    height: `${height}px`,
                }}
                onClick={handleCanvasClick}
                onMouseEnter={handleCanvas}
            ></canvas>
            {drawPixels.map((pixel, index) => (
                <div
                    id={`pixel-${index}`}
                    className="pixel"
                    key={index}
                    style={{
                        zIndex: zIndex + 1,
                        position: "fixed",
                        width: 1,
                        height: 1,
                        backgroundColor: setactiveColor(),
                        left: pixel.x,
                        top: pixel.y,
                    }}
                />
            ))}
            {inputBlocks.map((block) => (
                <>
                    <div
                        style={{
                            position: "absolute",
                            zIndex: block.zIndex + 1,
                            left: block.position.x - 1,
                            top: block.position.y - 1,
                            width: block.width,
                            height: block.height,
                            border: "1px dashed black",
                            pointerEvents: "none",
                        }}
                    ></div>
                    <input
                        id="textInput"
                        className="input-block draggable-element"
                        key={block.id}
                        style={{
                            zIndex: block.zIndex,
                            width: block.width,
                            height: block.height,
                            fontSize: block.text.fontSize,
                            fontFamily: block.text.fontFamily,
                            color: block.text.color,
                            fontWeight: block.text.fontWeight,
                            fontStyle: block.text.fontStyle,
                            textDecorationLine: block.text.textDecorationLine,
                            position: "absolute",
                            left: block.position.x,
                            top: block.position.y,
                            background: block.text.borderColor,
                            border: 'none',
                            outline: 'none',
                            boxShadow: 'none',
                            padding: 0,
                        }}
                        ref={inputRef}
                        onClick={() => {
                            inputRef.current?.focus();
                        }}
                        onMouseDown={(event) => {
                            handleMouseDown(event, block.position.x, block.position.y);
                            event.preventDefault();
                            inputRef.current?.blur()
                        }}
                        onMouseMove={() => handleMouseMove(block.position.x, block.position.y, block.id, block.type, false)}
                        onMouseUp={handleMouseUp}
                        onFocus={(event) => {
                            const updatedInputBlocks = inputBlocks.map((inputBlock) => {
                                if (inputBlock.id === block.id) {
                                    return {
                                        ...inputBlock,
                                        text: {
                                            fontSize: setactiveFont(),
                                            fontFamily: setactiveFontFamilies(),
                                            fontWeight: setTextBold(),
                                            fontStyle: setTextItalic(),
                                            textDecorationLine: `${setTextUnderline()} ${setTextStriketrough()}`,
                                            borderColor: setactiveBorderColor(),
                                            color: setactiveColor(),
                                            value: event.target.value
                                        }
                                    };
                                }
                                return inputBlock;
                            });

                            setInputBlocks(updatedInputBlocks);
                        }}
                    />
                    <div
                        onMouseDown={(event) => {
                            handleMouseDownSize(event, block.position.x, block.position.y)
                        }}
                        onMouseMove={() => handleMouseMoveSize(block.position.x, block.position.y, block.id, block.type, true)}
                        onMouseUp={handleMouseUpSize}
                        style={{
                            cursor: "nwse-resize",
                            zIndex: block.zIndex + 1,
                            position: "absolute",
                            width: "5px",
                            height: "5px",
                            left: block.position.x + block.width - 3.5,
                            top: block.position.y + block.height - 3.5,
                            border: "1px solid black"
                        }}
                    />
                </>
            ))}
            {imageBlocks.map((block) => (
                <><img
                    alt=""
                    id={`imageBlock-${block.id}`}
                    className="image-block selector"
                    draggable="false"
                    key={block.id}
                    src={block.imageUrl}
                    style={{
                        zIndex: block.zIndex,
                        position: "absolute",
                        width: block.width,
                        height: block.height,
                        left: block.position.x,
                        top: block.position.y,
                    }}
                    onMouseDown={(event) => {
                        handleMouseDown(event, block.position.x, block.position.y);
                    }}
                    onMouseMove={() => handleMouseMove(block.position.x, block.position.y, block.id, block.type, true)}
                    onMouseUp={handleMouseUp}/>
                    <div
                        onMouseDown={(event) => {
                            handleMouseDownSize(event, block.position.x, block.position.y);
                        }}
                        onMouseMove={() => handleMouseMoveSize(block.position.x, block.position.y, block.id, block.type, true)}
                        onMouseUp={handleMouseUpSize}
                        style={{
                            cursor: "nwse-resize",
                            zIndex: block.zIndex + 1,
                            position: "absolute",
                            width: "5px",
                            height: "5px",
                            left: block.position.x + block.width - 3.5,
                            top: block.position.y + block.height - 3.5,
                            border: "1px solid black"
                        }}/>
                </>
            ))}
            {objBlocks.map((block) => (
                <>
                    <svg
                        className="image-block obj-block"
                        key={block.id}
                        style={{
                            zIndex: block.zIndex,
                            position: "absolute",
                            width: block.width,
                            height: block.height,
                            left: block.position.x,
                            top: block.position.y
                        }}
                        onMouseDown={(event) => {
                            handleMouseDown(event, block.position.x, block.position.y);
                        }}
                        onMouseMove={() => handleMouseMove(block.position.x, block.position.y, block.id, block.type, true)}
                        onMouseUp={handleMouseUp}
                        version="1.1" id="Layer_1" xmlns="http://www.w3.org/2000/svg" x="0px" y="0px"
                        viewBox="0 0 512 512">
                        {block.type === "triangle" && (
                            <g>
                                <g>
                                    <polygon points="256,30 486,472 26,472" fill={block.color}
                                             stroke={block.borderColor} strokeWidth="25"/>
                                </g>
                            </g>
                        )}
                        {block.type === "square" && (
                            <g>
                                <g>
                                    <rect width="100%" height="100%" fill={block.color} stroke={block.borderColor}
                                          strokeWidth="25"/>
                                </g>
                            </g>
                        )}
                        {block.type === "circle" && (
                            <g>
                                <g>
                                    <circle cx="256" cy="256" r="250" fill={block.color} stroke={block.borderColor}
                                            strokeWidth="25"/>
                                </g>
                            </g>
                        )}
                    </svg>
                    <div
                        onMouseDown={(event) => {
                            handleMouseDownSize(event, block.position.x, block.position.y);
                        }}
                        onMouseMove={() => handleMouseMoveSize(block.position.x, block.position.y, block.id, block.type, true)}
                        onMouseUp={handleMouseUpSize}
                        style={{
                            cursor: "nwse-resize",
                            zIndex: block.zIndex + 1,
                            position: "absolute",
                            width: "5px",
                            height: "5px",
                            left: block.position.x + block.width,
                            top: block.position.y + block.height,
                            border: "1px solid black"
                        }}
                    />
                </>
            ))}
        </div>
    );
}