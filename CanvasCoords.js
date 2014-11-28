// Set the standard ratio to full HD.
var ratio = 1900 / 1005;
var letterRatio = 236 / 364;

// Scales the images accordingly.
function GetCoords(x, y, w, h) {
    var width = window.innerWidth;
    var height = window.innerHeight;
    if(height*ratio < width)
    {
        width = height * ratio;
    }
    else
    {
        height = width / ratio;
    }

    var out = new Object();
    out.x = (width * (x / 1900));
    out.w = (width * (w / 1900));
    out.y = (height * (y / 1005));
    out.h = (height * (h / 1005));

    return out;
}

function GetCoordsImg(img) {
    var out = GetCoords(img.cookieX, img.cookieY, img.cookieW, img.cookieH);
    return out;
}

// Draw an image in the image object
function DrawScaled(context, img)
{
    var coord = GetCoordsImg(img);
    context.drawImage(img, coord.x, coord.y, coord.w, coord.h);
}

// Draw an image without clickability
function DrawScaledPos(context, img, x, y, w, h) {
    var coord = GetCoords(x, y, w, h);
    context.drawImage(img, coord.x, coord.y, coord.w, coord.h);
}

// Draw an image without clickability
function DrawScaledPosCrop(context, img, x, y, w, h, sx, sy, sw, sh) {
    var coord = GetCoords(x, y, w, h);
    context.drawImage(img, sx, sy, sw, sh, coord.x, coord.y, coord.w, coord.h);
}

function DrawScaledTextNormal(context, text, x, y, size, align) {
    var coord = GetCoords(x, y+size, size,0);
    context.font = (coord.w).toFixed(0) + "px Arial";
    context.textAlign = align;
    context.fillText(text, coord.x, coord.y);
}

function DrawScaledText(context, text, x, y, size, align) {
    var coord = GetCoords(x, y, size * letterRatio, size);
    var width = 0;
    for (var i = 0; i < text.length; ++i) {
        width += coord.w;
        if (text[i] == " " || text[i] == "." || text[i] == ",")
            width -= coord.w*0.5;
    }
    switch (align) {
        case "left":
            break;
        case "right":
            coord.x -= width;
            break;
        case "center":
            coord.x -= 0.5 * width;
            break;
    };
    var scale = 1;
    for (var i = 0; i < text.length; ++i) {
        scale = 1;
        if (text[i] == ' ' || text[i] == '.' || text[i] == ',')
            scale = 0.5;
        context.drawImage(images.data[text[i]], coord.x, coord.y, coord.w * scale, coord.h);
        coord.x += coord.w * scale;
    }
}


function DrawText(context, text, x, y, size, align) {
    var width = 0;
    for (var i = 0; i < text.length; ++i) {
        width += size * letterRatio;
        if (text[i] == " " || text[i] == "." || text[i] == ",")
            width -= size * letterRatio * 0.5;
    }
    switch (align) {
        case "left":
            break;
        case "right":
            x -= width;
            break;
        case "center":
            x -= 0.5 * width;
            break;
    };
    var scale = 1;
    for (var i = 0; i < text.length; ++i) {
        scale = 1;
        if (text[i] == ' ' || text[i] == '.' || text[i] == ',')
            scale = 0.5;
        context.drawImage(images.data[text[i]], x, y, size * letterRatio * scale, size);
        x += size * letterRatio * scale;
    }
}
