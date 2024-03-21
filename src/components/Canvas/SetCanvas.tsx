import React, {useState} from "react";
import "../../index.css";
import {PopupClean} from "../Popup/PopupClean";
import {PopupFonts} from "../Popup/PopupFonts";
import {PopupFontFamily} from "../Popup/PopupFontFamily";
import SaveButton from "../SaveLoad/SaveButton";
import {GraphicObject, ImageBlock, TextBlock} from "../../types/types";

let openCleaner = false;
let active = "";
let activeText = false;
let activeTextBold = false;
let activeTextItalic = false;
let activeTextUnderLine = false;
let activeTextLineStriketrough = false;
let activeImage = false;
let activeObjTriangle = false;
let activeObjSquare = false;
let activeObjCircle = false;
let obj = "";
let activeColor = "black";
let activeColorBorder = "white";
let activeFont = 12;
let openFonts = false;
let activeFontFamily = "Arial";
let openFontFamilies = false;
type Pixels = { x: number; y: number }[]

type CanvasProps = {
    drawPixels: Pixels;
    setDrawPixels: (arg0: Pixels) => void;
    inputBlocks: TextBlock[];
    setInputBlocks: (arg0: TextBlock[]) => void;
    imageBlocks: ImageBlock[];
    setImageBlocks: (arg0: ImageBlock[]) => void;
    objBlocks: GraphicObject[];
    setObjBlocks: (arg0: GraphicObject[]) => void;

};

export function SetCanvas({
                              drawPixels,
                              setDrawPixels,
                              setObjBlocks,
                              objBlocks,
                              setImageBlocks,
                              setInputBlocks,
                              inputBlocks,
                              imageBlocks
                          }: CanvasProps) {

    const [isCleaneerOpen, serIsCleaneerOpen] = useState(false);
    const [isFontSizesOpen, serIsFontSizesOpen] = useState(false);
    const [isFontFamiliesOpen, serIsFontFamiliesOpen] = useState(false);

    const [btnStyleText, setBtnStyleText] = useState({backgroundColor: "#b53f82"});
    const [btnStyleImage, setBtnStyleImage] = useState({backgroundColor: "#b53f82"});

    const [btnStyleTextBold, setBtnStyleTextBold] = useState({backgroundColor: "#b53f82"});
    const [btnStyleTextItalic, setBtnStyleTextItalic] = useState({backgroundColor: "#b53f82"});
    const [btnStyleTextUnderLine, setBtnStyleTextUnderLine] = useState({backgroundColor: "#b53f82"});
    const [btnStyleTextLineStriketrough, setBtnStyleTextLineStriketrough] = useState({backgroundColor: "#b53f82"});

    const [typeColor, setTypeColor] = useState(true);
    const [styleColor, setStyleColor] = useState("rgb(0, 0, 0)");
    const [styleColorBorder, setStyleColorBorder] = useState("rgb(255, 255, 255)");

    const [btnStyleTriangle, setBtnStyleTriangle] = useState({backgroundColor: "#b53f82"})
    const [btnStyleSquare, setBtnStyleSquare] = useState({backgroundColor: "#b53f82"})
    const [btnStyleCircle, setBtnStyleCircle] = useState({backgroundColor: "#b53f82"})

    const closeOrOpen = () => {
        if (openCleaner === false) {
            openCleaner = true;
            serIsCleaneerOpen(true)
        } else {
            openCleaner = false;
            serIsCleaneerOpen(false)
        }
    }

    const closeOrOpenFontSizes = () => {
        if (openFonts === false) {
            openFonts = true;
            serIsFontSizesOpen(true)
        } else {
            openFonts = false;
            serIsFontSizesOpen(false)
        }
    }

    const closeOrOpenFontFamilies = () => {
        if (openFontFamilies === false) {
            openFontFamilies = true;
            serIsFontFamiliesOpen(true)
        } else {
            openFontFamilies = false;
            serIsFontFamiliesOpen(false)
        }
    }

    const handleOffClick = () => {
        if (activeTextBold) {
            handleClickTextBold()
        }
        if (activeTextItalic) {
            handleClickTextItalic()
        }
        if (activeTextUnderLine) {
            handleClickTextUnderLine()
        }
        if (activeTextLineStriketrough) {
            handleClickTextStrikeTrough()
        }
        if (activeText === true && active !== "Text") {
            handleClickText();
        }
        if (activeImage === true && active !== "Image") {
            handleClickImage();
        }
        if (activeObjTriangle === true && active !== "Triangle") {
            handleClickObjTriangle();
        }
        if (activeObjSquare === true && active !== "Square") {
            handleClickObjSquare();
        }
        if (activeObjCircle === true && active !== "Circle") {
            handleClickObjCircle();
        }
    }


    const handleClickTextHover = () => {
        if (activeText === false) {
            setBtnStyleText({backgroundColor: "rgba(0,255,247,0.72)"})
        }
    }

    const handleClickTextNotHover = () => {
        if (activeText === false) {
            setBtnStyleText({backgroundColor: "#b53f82"})
        }
    }

    const handleClickText = () => {
        active = "Text";
        handleOffClick();
        const svgIcon = document.getElementById('svg_icon_text') as HTMLImageElement;
        if (activeText === false) {
            activeText = true;
            setBtnStyleText({backgroundColor: "#ffffff"})
            svgIcon.setAttribute('src', '/images/text_hover.svg');
        } else {
            activeText = false;
            setBtnStyleText({backgroundColor: "#b53f82"})
            svgIcon.setAttribute('src', '/images/text2.svg');
        }
    };

    const handleClickTextBoldHover = () => {
        if (activeTextBold === false) {
            setBtnStyleTextBold({backgroundColor: "rgba(0,255,247,0.72)"})
        }
    }

    const handleClickTextBoldNotHover = () => {
        if (activeTextBold === false) {
            setBtnStyleTextBold({backgroundColor: "#b53f82"})
        }
    }

    const handleClickTextBold = () => {
        const svgIcon = document.getElementById('svg_icon_text_bold') as HTMLImageElement;
        if (activeTextBold === false) {
            activeTextBold = true;
            setBtnStyleTextBold({backgroundColor: "#ffffff"})
            svgIcon.setAttribute('src', '/images/text_bold_active.svg');
        } else {
            activeTextBold = false;
            setBtnStyleTextBold({backgroundColor: "#b53f82"})
            svgIcon.setAttribute('src', '/images/text_bold.svg');
        }
    };

    const handleClickTextItalicHover = () => {
        if (activeTextItalic === false) {
            setBtnStyleTextItalic({backgroundColor: "rgba(0,255,247,0.72)"})
        }
    }

    const handleClickTextItalicNotHover = () => {
        if (activeTextItalic === false) {
            setBtnStyleTextItalic({backgroundColor: "#b53f82"})
        }
    }

    const handleClickTextItalic = () => {
        const svgIcon = document.getElementById('svg_icon_text_italic') as HTMLImageElement;
        if (activeTextItalic === false) {
            activeTextItalic = true;
            setBtnStyleTextItalic({backgroundColor: "#ffffff"})
            svgIcon.setAttribute('src', '/images/text_italic_active.svg');
        } else {
            activeTextItalic = false;
            setBtnStyleTextItalic({backgroundColor: "#b53f82"})
            svgIcon.setAttribute('src', '/images/text_italic.svg');
        }
    };

    const handleClickTextUnderLineHover = () => {
        if (activeTextUnderLine === false) {
            setBtnStyleTextUnderLine({backgroundColor: "rgba(0,255,247,0.72)"})
        }
    }

    const handleClickTextUnderLineNotHover = () => {
        if (activeTextUnderLine === false) {
            setBtnStyleTextUnderLine({backgroundColor: "#b53f82"})
        }
    }

    const handleClickTextUnderLine = () => {
        const svgIcon = document.getElementById('svg_icon_text_underline') as HTMLImageElement;
        if (activeTextUnderLine === false) {
            activeTextUnderLine = true;
            setBtnStyleTextUnderLine({backgroundColor: "#ffffff"})
            svgIcon.setAttribute('src', '/images/text_underline_active.svg');
        } else {
            activeTextUnderLine = false;
            setBtnStyleTextUnderLine({backgroundColor: "#b53f82"})
            svgIcon.setAttribute('src', '/images/text_underline.svg');
        }
    };

    const handleClickTextStrikeTroughHover = () => {
        if (activeTextLineStriketrough === false) {
            setBtnStyleTextLineStriketrough({backgroundColor: "rgba(0,255,247,0.72)"})
        }
    }

    const handleClickTextStrikeTroughNotHover = () => {
        if (activeTextLineStriketrough === false) {
            setBtnStyleTextLineStriketrough({backgroundColor: "#b53f82"})
        }
    }

    const handleClickTextStrikeTrough = () => {
        const svgIcon = document.getElementById('svg_icon_text_striketrough') as HTMLImageElement;
        if (activeTextLineStriketrough === false) {
            activeTextLineStriketrough = true;
            setBtnStyleTextLineStriketrough({backgroundColor: "#ffffff"})
            svgIcon.setAttribute('src', '/images/text_striketrough_active.svg');
        } else {
            activeTextLineStriketrough = false;
            setBtnStyleTextLineStriketrough({backgroundColor: "#b53f82"})
            svgIcon.setAttribute('src', '/images/text_striketrough.svg');
        }
    };

    const handleClickImageHover = () => {
        if (activeImage === false) {
            setBtnStyleImage({backgroundColor: "rgba(0,255,247,0.72)"})
        }
    }

    const handleClickImageNotHover = () => {
        if (activeImage === false) {
            setBtnStyleImage({backgroundColor: "#b53f82"})
        }
    }

    const handleClickImage = () => {
        active = "Image";
        handleOffClick();
        const svgIcon = document.getElementById('svg_icon_image') as HTMLImageElement;
        if (activeImage === false) {
            activeImage = true;
            setBtnStyleImage({backgroundColor: "#ffffff"})
            svgIcon.setAttribute('src', '/images/photo.svg');
        } else {
            activeImage = false;
            setBtnStyleImage({backgroundColor: "#b53f82"})
            svgIcon.setAttribute('src', '/images/photo2.svg');
        }
    };

    const handleClickTriangleHover = () => {
        if (activeObjTriangle === false) {
            setBtnStyleTriangle({backgroundColor: "rgba(0,255,247,0.72)"})
        }
    }

    const handleClickTriangleNotHover = () => {
        if (activeObjTriangle === false) {
            setBtnStyleTriangle({backgroundColor: "#b53f82"})
        }
    }

    const handleClickObjTriangle = () => {
        active = "Triangle";
        handleOffClick();
        const svgIcon = document.getElementById('svg_icon_triangle') as HTMLImageElement;
        if (activeObjTriangle === false) {
            activeObjTriangle = true;
            setBtnStyleTriangle({backgroundColor: "#ffffff"})
            svgIcon.setAttribute('src', '/images/triangle_active.svg');
        } else {
            activeObjTriangle = false;
            setBtnStyleTriangle({backgroundColor: "#b53f82"})
            svgIcon.setAttribute('src', '/images/triangle.svg');
        }
    }

    const handleClickSquareHover = () => {
        if (activeObjSquare === false) {
            setBtnStyleSquare({backgroundColor: "rgba(0,255,247,0.72)"})
        }
    }

    const handleClickSquareNotHover = () => {
        if (activeObjSquare === false) {
            setBtnStyleSquare({backgroundColor: "#b53f82"})
        }
    }

    const handleClickObjSquare = () => {
        active = "Square";
        handleOffClick();
        const svgIcon = document.getElementById('svg_icon_square') as HTMLImageElement;
        if (activeObjSquare === false) {
            activeObjSquare = true;
            setBtnStyleSquare({backgroundColor: "#ffffff"})
            svgIcon.setAttribute('src', '/images/square_active.svg');
        } else {
            activeObjSquare = false;
            setBtnStyleSquare({backgroundColor: "#b53f82"})
            svgIcon.setAttribute('src', '/images/square.svg');
        }
    }

    const handleClickCircleHover = () => {
        if (activeObjCircle === false) {
            setBtnStyleCircle({backgroundColor: "rgba(0,255,247,0.72)"})
        }
    }

    const handleClickCircleNotHover = () => {
        if (activeObjCircle === false) {
            setBtnStyleCircle({backgroundColor: "#b53f82"})
        }
    }

    const handleClickObjCircle = () => {
        active = "Circle";
        handleOffClick();
        const svgIcon = document.getElementById('svg_icon_circle') as HTMLImageElement;
        if (activeObjCircle === false) {
            activeObjCircle = true;
            setBtnStyleCircle({backgroundColor: "#ffffff"})
            svgIcon.setAttribute('src', '/images/circle_active.svg');
        } else {
            activeObjCircle = false;
            setBtnStyleCircle({backgroundColor: "#b53f82"})
            svgIcon.setAttribute('src', '/images/circle.svg');
        }
    }

    const handleClickColorBlack = () => {
        if (typeColor) {
            setStyleColor("rgb(0, 0, 0)");
            activeColor = "rgb(0, 0, 0)"
        } else {
            setStyleColorBorder("rgb(0, 0, 0)");
            activeColorBorder = "rgb(0, 0, 0)"
        }
    };
    const handleClickColorWhite = () => {
        if (typeColor) {
            setStyleColor("rgb(255, 255, 255)");
            activeColor = "rgb(255, 255, 255)"
        } else {
            setStyleColorBorder("rgb(255, 255, 255)");
            activeColorBorder = "rgb(255, 255, 255)"
        }
    };
    const handleClickColorBlue = () => {
        if (typeColor) {
            setStyleColor("rgb(36, 123, 255)");
            activeColor = "rgb(36, 123, 255)"
        } else {
            setStyleColorBorder("rgb(36, 123, 255)");
            activeColorBorder = "rgb(36, 123, 255)"
        }
    };
    const handleClickColorRed = () => {
        if (typeColor) {
            setStyleColor("rgb(255, 0, 0)");
            activeColor = "rgb(255, 0, 0)"
        } else {
            setStyleColorBorder("rgb(255, 0, 0)");
            activeColorBorder = "rgb(255, 0, 0)"
        }
    };
    const handleClickColorGreen = () => {
        if (typeColor) {
            setStyleColor("rgb(0, 255, 26)");
            activeColor = "rgb(0, 255, 26)"
        } else {
            setStyleColorBorder("rgb(0, 255, 26)");
            activeColorBorder = "rgb(0, 255, 26)"
        }
    };

    const handleSave = () => {
        const jsonString = JSON.stringify({
            pixels: drawPixels,
            objects: objBlocks,
            inpBlocks: inputBlocks,
            imageBlocks: imageBlocks
        })
        const blob = new Blob([jsonString], {type: "application/json"})
        const url = URL.createObjectURL(blob)
        const a = document.createElement("a")
        a.href = url
        a.download = "YourCard.json"
        a.click()
        URL.revokeObjectURL(url)
    };

    const handleLoad = (event: React.ChangeEvent<HTMLInputElement>) => {
        const fileInput = event.target
        const file = fileInput.files?.[0]
        if (file) {
            const reader = new FileReader()

            reader.onload = (e) => {
                try {
                    const jsonString = e.target?.result as string
                    const jsonData = JSON.parse(jsonString)

                    setDrawPixels(jsonData.pixels)
                    setObjBlocks(jsonData.objects)
                    setImageBlocks(jsonData.imageBlocks)
                    setInputBlocks(jsonData.inpBlocks)

                } catch (error) {
                    alert("Error loading JSON")
                }
            }

            reader.readAsText(file)
        }
    };

    return (
        <>
            <div className="flex_block settings-block" id="setBar">
                <button onClick={closeOrOpen} id="deleteButton" className="button btn-close"><img
                    src="/images/krest.svg" alt="Icon" width="16px" height="16px"/></button>
                <span className="divider"></span>
                <div className="flex_block">
                    <button className="text svg_btn" onMouseEnter={handleClickTextHover}
                            onMouseLeave={handleClickTextNotHover} onClick={handleClickText} style={btnStyleText}><img
                        id="svg_icon_text" src="/images/text2.svg" alt="Icon" width="17" height="17"/></button>
                    <button className="text svg_btn" onMouseEnter={handleClickImageHover}
                            onMouseLeave={handleClickImageNotHover} onClick={handleClickImage} style={btnStyleImage}>
                        <img id="svg_icon_image" src="/images/photo2.svg" alt="Icon" width="19" height="19"/></button>
                </div>
                <span className="divider"></span>
                <SaveButton data={handleSave}/>
                <label>
                    <input type="file" onChange={handleLoad} accept=".json"/>
                </label>
                <div className="flex_block">
                    <button className="text svg_btn" onMouseEnter={handleClickTriangleHover}
                            onMouseLeave={handleClickTriangleNotHover} onClick={() => {
                        handleClickObjTriangle();
                        obj = "triangle"
                    }} style={btnStyleTriangle}><img id="svg_icon_triangle" src="/images/triangle.svg" alt="Icon"
                                                     width="15" height="15"/></button>
                    <button className="text svg_btn" onMouseEnter={handleClickSquareHover}
                            onMouseLeave={handleClickSquareNotHover} onClick={() => {
                        handleClickObjSquare();
                        obj = "square"
                    }} style={btnStyleSquare}><img id="svg_icon_square" src="/images/square.svg" alt="Icon" width="15"
                                                   height="15"/></button>
                    <button className="text svg_btn" onMouseEnter={handleClickCircleHover}
                            onMouseLeave={handleClickCircleNotHover} onClick={() => {
                        handleClickObjCircle();
                        obj = "circle"
                    }} style={btnStyleCircle}><img id="svg_icon_circle" src="/images/circle.svg" alt="Icon" width="15"
                                                   height="15"/></button>
                </div>
                <span className="divider"></span>
                {activeText && (
                    <>
                        <button onClick={closeOrOpenFontSizes} id="fontBar" className="flex_block hover">
                            <img id="svg_icon_font" src="/images/font1.svg" alt="Icon" width="13" height="13"/>
                            <span className="fontSize">{activeFont}</span>
                            <img id="svg_icon_arrow" src="/images/down_arrow.svg" alt="Icon" width="6" height="6"/>
                        </button>
                        <button onClick={closeOrOpenFontFamilies} id="fontBar" className="lenFont flex_block hover"
                                style={{width: "140px", padding: "5px", fontSize: "10px"}}>
                            <img id="svg_icon_font" src="/images/font-family-custom.svg" alt="Icon" width="13"
                                 height="13" style={{}}/>
                            <span className="fontSize">{activeFontFamily}</span>
                            <img id="svg_icon_arrow" src="/images/down_arrow.svg" alt="Icon" width="6" height="6"/>
                        </button>
                        <span className="divider"></span>
                        <button className="text svg_btn" onMouseEnter={handleClickTextBoldHover}
                                onMouseLeave={handleClickTextBoldNotHover} onClick={handleClickTextBold}
                                style={btnStyleTextBold}><img id="svg_icon_text_bold" src="/images/text_bold.svg"
                                                              alt="Icon" width="17" height="17"/></button>
                        <button className="text svg_btn" onMouseEnter={handleClickTextItalicHover}
                                onMouseLeave={handleClickTextItalicNotHover} onClick={handleClickTextItalic}
                                style={btnStyleTextItalic}><img id="svg_icon_text_italic" src="/images/text_italic.svg"
                                                                alt="Icon" width="17" height="17"/></button>
                        <button className="text svg_btn" onMouseEnter={handleClickTextUnderLineHover}
                                onMouseLeave={handleClickTextUnderLineNotHover} onClick={handleClickTextUnderLine}
                                style={btnStyleTextUnderLine}><img id="svg_icon_text_underline"
                                                                   src="/images/text_underline.svg" alt="Icon"
                                                                   width="17" height="17"/></button>
                        <button className="text svg_btn" onMouseEnter={handleClickTextStrikeTroughHover}
                                onMouseLeave={handleClickTextStrikeTroughNotHover} onClick={handleClickTextStrikeTrough}
                                style={btnStyleTextLineStriketrough}><img id="svg_icon_text_striketrough"
                                                                          src="/images/text_striketrough.svg" alt="Icon"
                                                                          width="17" height="17"/></button>
                        <span className="divider"></span>
                    </>
                )}
                <div className="flex_block">
                    <button id="active-color" onClick={() => {
                        if (typeColor) {
                            setTypeColor(false)
                        } else {
                            setTypeColor(true)
                        }
                    }} style={{backgroundColor: `${styleColor}`, border: `5px solid ${styleColorBorder}`}}></button>
                    <button onClick={handleClickColorBlack} className="color-button hover"><img id="svg_icon_color"
                                                                                                src="/images/black.svg"
                                                                                                alt="Icon" width="18"
                                                                                                height="18"/></button>
                    <button onClick={handleClickColorWhite} className="color-button hover"><img id="svg_icon_color"
                                                                                                src="/images/white.svg"
                                                                                                alt="Icon" width="18"
                                                                                                height="18"/></button>
                    <button onClick={handleClickColorBlue} className="color-button hover"><img id="svg_icon_color"
                                                                                               src="/images/blue.svg"
                                                                                               alt="Icon" width="18"
                                                                                               height="18"/></button>
                    <button onClick={handleClickColorRed} className="color-button hover"><img id="svg_icon_color"
                                                                                              src="/images/red.svg"
                                                                                              alt="Icon" width="18"
                                                                                              height="18"/></button>
                    <button onClick={handleClickColorGreen} className="color-button hover"><img id="svg_icon_color"
                                                                                                src="/images/green.svg"
                                                                                                alt="Icon" width="18"
                                                                                                height="18"/></button>
                </div>
            </div>
            {isFontSizesOpen && (
                <PopupFonts close={closeOrOpenFontSizes}/>
            )}
            {isFontFamiliesOpen && (
                <PopupFontFamily close={closeOrOpenFontFamilies}/>
            )}
            {isCleaneerOpen && (
                <PopupClean close={closeOrOpen}/>
            )}
        </>
    );
}

export function onClick(): boolean {
    return activeText;
}

export function setactiveImage(): boolean {
    return activeImage;
}

export function setactiveObjTriangle(): boolean {
    return activeObjTriangle;
}

export function setactiveObSquare(): boolean {
    return activeObjSquare;
}

export function setactiveObjCircle(): boolean {
    return activeObjCircle;
}

export function setObj(): string {
    return obj;
}

export function setactiveColor(): string {
    return activeColor;
}

export function setactiveBorderColor(): string {
    return activeColorBorder;
}

export function setOpenCleaner(): boolean {
    return openCleaner;
}

export function setIsOpenFonts(): boolean {
    return openFonts;
}

export function setactiveFont(): number {
    return activeFont;
}

export function setFont(newFont: number) {
    activeFont = newFont
}

export function setIsOpenFontFamilies(): boolean {
    return openFontFamilies;
}

export function setactiveFontFamilies(): string {
    return activeFontFamily;
}

export function setFontFamily(newFont: string) {
    activeFontFamily = newFont
}

export function setTextBold(): string {
    if (activeTextBold) {
        return "bold"
    } else {
        return "normal"
    }
}

export function setTextItalic(): string {
    if (activeTextItalic) {
        return "italic"
    } else {
        return "none"
    }
}

export function setTextUnderline(): string {
    if (activeTextUnderLine) {
        return "underline"
    } else {
        return ""
    }
}

export function setTextStriketrough(): string {
    if (activeTextLineStriketrough) {
        return "line-through"
    } else {
        return ""
    }
}
