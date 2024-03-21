export type Size = {
    width: number;
    height: number;
};

export type Position = {
    x: number;
    y: number;
};

export type Select = {
    position: Position;
    size: Size;
};

export type Block = {
    id: number;
    position: Position;
};

export type standartText = {
    fontSize: number,
    fontFamily: string,
    borderColor: string;
    fontWeight: string,
    fontStyle: string,
    textDecorationLine: string,
    color: string,
    value: string;
}

export type TextBlock = Block & {
    type: string;
    width: number;
    height: number;
    text: standartText;
    zIndex: number;
};

export type ImageBlock = Block & {
    width: number;
    height: number;
    type: string;
    imageUrl: string;
    zIndex: number;
};

export type GraphicObject = Block & {
    width: number;
    height: number;
    type: string;
    color: string;
    borderColor: string;
    zIndex: number;
};

export type ObjectType = ImageBlock | TextBlock | GraphicObject;

export type Canvas = {
    text: TextBlock;
    image: ImageBlock;
    object: GraphicObject;
    backgroundColor: string;
    select: Select;
};
