let frame;
if (figma.currentPage.selection.length == 0) {
    figma.notify("Please select at least 1 layer");
}
else {
    //create group content
    let selection = figma.currentPage.selection;
    let contentGroup = figma.group(selection, (figma.currentPage.selection[0]).parent);
    contentGroup.name = "Content";
    let selectionX = contentGroup.x;
    let selectionY = contentGroup.y;
    //create frame with content
    frame = figma.createFrame();
    //rename frame
    let name = figma.currentPage.selection[0].name;
    name = name.replace(" ", "_");
    frame.name = "ic_" + name;
    //resize and change position frame
    frame.resize(contentGroup.width + 2, contentGroup.height + 2);
    frame.fills = [];
    let parent = contentGroup.parent;
    parent.insertChild(0, frame);
    frame.x = selectionX;
    frame.y = selectionY;
    //move content inside frame
    frame.insertChild(0, contentGroup);
    contentGroup.x = 1;
    contentGroup.y = 1;
    //create top rectangle
    let rectangleTop = figma.createRectangle();
    rectangleTop.name = "top";
    rectangleTop.fills = [{ type: 'SOLID', color: { r: 0, g: 0, b: 0 } }];
    rectangleTop.resize(contentGroup.width, 1);
    frame.insertChild(1, rectangleTop);
    rectangleTop.x = 1;
    rectangleTop.y = 0;
    //create bottom rectangle
    let rectangleBottom = figma.createRectangle();
    rectangleBottom.name = "bottom";
    rectangleBottom.fills = [{ type: 'SOLID', color: { r: 0, g: 0, b: 0 } }];
    rectangleBottom.resize(contentGroup.width, 1);
    frame.insertChild(2, rectangleBottom);
    rectangleBottom.x = 1;
    rectangleBottom.y = contentGroup.height + 1;
    //create left rectangle
    let rectangleLeft = figma.createRectangle();
    rectangleLeft.name = "left";
    rectangleLeft.fills = [{ type: 'SOLID', color: { r: 0, g: 0, b: 0 } }];
    rectangleLeft.resize(1, contentGroup.height);
    frame.insertChild(3, rectangleLeft);
    rectangleLeft.x = 0;
    rectangleLeft.y = 1;
    //create right rectangle
    let rectangleRight = figma.createRectangle();
    rectangleRight.name = "right";
    rectangleRight.fills = [{ type: 'SOLID', color: { r: 0, g: 0, b: 0 } }];
    rectangleRight.resize(1, contentGroup.height);
    frame.insertChild(4, rectangleRight);
    rectangleRight.x = contentGroup.width + 1;
    rectangleRight.y = 1;
    //group nine-patch
    let ninepatch = figma.group([rectangleLeft, rectangleRight, rectangleTop, rectangleBottom], frame);
    ninepatch.name = "patch";
    //select frame
    figma.currentPage.selection = [frame];
}
figma.closePlugin();
