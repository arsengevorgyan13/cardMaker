import {Canvas, GraphicObject, ImageBlock, TextBlock} from './types'
import {
  setactiveBorderColor,
  setactiveColor,
  setactiveFont,
  setactiveFontFamilies
} from "../components/Canvas/SetCanvas";

export const textBlock: TextBlock = {
    id: 0,
    type: "text",
    width: 100,
    height: 30,
    text: {
        fontSize: setactiveFont(),
        fontFamily: setactiveFontFamilies(),
        fontWeight: "normal",
        fontStyle: "none",
        textDecorationLine: "none",
        borderColor: setactiveBorderColor(),
        color: setactiveColor(),
        value: ""
    },
    zIndex: 2,
    position: {x: 0, y: 0},
};

export const imageBlock: ImageBlock = {
    id: 0,
    type: "image",
    width: 100,
    height: 100,
    imageUrl: "./images",
    zIndex: 2,
    position: {x: 0, y: 0},
};

export const graphicBlock: GraphicObject = {
    id: 0,
    type: "graphic",
    borderColor: setactiveBorderColor(),
    width: 100,
    height: 100,
    color: setactiveColor(),
    zIndex: 2,
    position: {x: 0, y: 0},
};

export const canvas: Canvas = {
    text: textBlock,
    image: imageBlock,
    object: graphicBlock,
    backgroundColor: "white",
    select: {position: {x: 0, y: 0}, size: {width: 800, height: 600}},
};
