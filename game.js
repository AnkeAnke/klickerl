// Constants
var TARGET_FRAMETIME = 1.0 / 60.0;

// Create a canvas
var canvas = document.createElement("canvas");
canvas.width = window.innerWidth;
canvas.height = window.innerHeight;
document.body.appendChild(canvas);
var context = canvas.getContext("2d");

var mousePos = new Vector(0,0);

// Game variables
var playTime = 0;
// var images is in cookie.js
var numLoadedPictures = 0;
var numPictures = 1;

// Key press.
var keyPressCode = -1;

function createfunction(i) {
    return function () { OnClickButton(i); };
}

document.onkeydown = function (modifier) {
    keyPressCode = modifier.keyCode
}

function sign(number) {
    return number ? number < 0 ? -1 : 1 : 0;
}

window.onresize = function () {
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
}

var loadImages = function () {
    // Create a container with all needed images
    images = new Object();
    images.data = {};
    images.data["kipferl"]= new Image();
    images.data["kipferl"].mouseclick = function () { OnCookieClick() };
    images.data["kipferl"].cookieX = 700;
    images.data["kipferl"].cookieY = 100;
    images.data["kipferl"].cookieH = 500;
    images.data["kipferl"].cookieW = 500;

    images.data["smallKipferl"] = new Image();
    images.data["smallKipferl"].mouseclick = function () {};
    images.data["smallKipferl"].cookieW = 0;

    //images.data["buy0"] = new Image();
    //images.data["buy0"].mouseclick = function () { OnBuy0Click() };
    //images.data["buy0"].cookieX = 500;
    //images.data["buy0"].cookieY = 200;
    //images.data["buy0"].cookieH = 100;
    //images.data["buy0"].cookieW = 100;

    images.data["frame"] = new Image();
    images.data["frame"].mouseclick = function () { };
    images.data["frame"].cookieW = 0;
    images.data["frame"].cookieH = 0;

    images.data["tree"] = new Image();
    images.data["tree"].mouseclick = createfunction(0);
    images.data["tree"].cookieW = 600;
    images.data["tree"].cookieH = 335;
    images.data["tree"].cookieX = 0;
    images.data["tree"].cookieY = 0;

    images.data["elf"] = new Image();
    images.data["elf"].mouseclick = createfunction(1);
    images.data["elf"].cookieW = 600;
    images.data["elf"].cookieH = 335;
    images.data["elf"].cookieX = 0;
    images.data["elf"].cookieY = 335;

    images.data["robot"] = new Image();
    images.data["robot"].mouseclick = createfunction(2);
    images.data["robot"].cookieW = 600;
    images.data["robot"].cookieH = 335;
    images.data["robot"].cookieX = 0;
    images.data["robot"].cookieY = 670;

    images.data["oven"] = new Image();
    images.data["oven"].mouseclick = createfunction(3);
    images.data["oven"].cookieW = 600;
    images.data["oven"].cookieH = 335;
    images.data["oven"].cookieX = 1300;
    images.data["oven"].cookieY = 0;

    images.data["factory"] = new Image();
    images.data["factory"].mouseclick = createfunction(4);
    images.data["factory"].cookieW = 600;
    images.data["factory"].cookieH = 335;
    images.data["factory"].cookieX = 1300;
    images.data["factory"].cookieY = 335;

    images.data["rocket"] = new Image();
    images.data["rocket"].mouseclick = createfunction(5);
    images.data["rocket"].cookieW = 600;
    images.data["rocket"].cookieH = 335;
    images.data["rocket"].cookieX = 1300;
    images.data["rocket"].cookieY = 670; 
    
    images.data["moon"] = new Image();
    images.data["moon"].mouseclick = function () { };
    images.data["moon"].cookieW = 0;

    images.data["star0"] = new Image();
    images.data["star0"].mouseclick = function () { };
    images.data["star0"].cookieW = 0;

    images.data["star1"] = new Image();
    images.data["star1"].mouseclick = function () { };
    images.data["star1"].cookieW = 0;

    images.data["star2"] = new Image();
    images.data["star2"].mouseclick = function () { };
    images.data["star2"].cookieW = 0;

    images.data["meteor"] = new Image();
    images.data["meteor"].mouseclick = function () { };
    images.data["meteor"].cookieW = 0;

    images.data["satelite"] = new Image();
    images.data["satelite"].mouseclick = function () { };
    images.data["satelite"].cookieW = 0;

    images.data["circle"] = new Image();
    images.data["circle"].mouseclick = function () { };
    images.data["circle"].cookieW = 0;

    images.data["smallCircle"] = new Image();
    images.data["smallCircle"].mouseclick = function () { };
    images.data["smallCircle"].cookieW = 0;

    images.data["anke"] = new Image();
    images.data["anke"].mouseclick = function () { };
    images.data["anke"].cookieW = 0;
    images.data["anke"].cookieH = 0;

    images.data["winText"] = new Image();
    images.data["winText"].mouseclick = function () { };
    images.data["winText"].cookieW = 0;
    images.data["winText"].cookieH = 0;

    images.data["boxUniverse"] = new Image();
    images.data["boxUniverse"].mouseclick = createfunction(6);
    images.data["boxUniverse"].cookieX = 600-5;
    images.data["boxUniverse"].cookieY = 905-0;
    images.data["boxUniverse"].cookieW = 700 + 10;
    images.data["boxUniverse"].cookieH = 100 + 10;

    images.data["textBG"] = new Image();
    images.data["textBG"].mouseclick = function () { };
    images.data["textBG"].cookieW = 0;
    images.data["textBG"].cookieH = 0;

    images.data["line"] = new Image();
    images.data["line"].mouseclick = function () { };
    images.data["line"].cookieW = 0;

    images.data["shoe"] = new Image();
    images.data["shoe"].mouseclick = function () { };
    images.data["shoe"].cookieW = 0;

    images.data["event"] = new Image();
    images.data["event"].mouseclick = function () { };
    images.data["event"].cookieW = 0;
    images.data["event2"] = new Image();
    images.data["event2"].mouseclick = function () { };
    images.data["event2"].cookieW = 0;
    images.data["cursor"] = new Image();
    images.data["cursor"].mouseclick = function () { };
    images.data["cursor"].cookieW = 0;

    images.data["0"] = new Image();
    images.data["0"].mouseclick = function () { };
    images.data["0"].cookieW = 0;
    images.data["1"] = new Image();
    images.data["1"].mouseclick = function () { };
    images.data["1"].cookieW = 0;
    images.data["2"] = new Image();
    images.data["2"].mouseclick = function () { };
    images.data["2"].cookieW = 0;
    images.data["3"] = new Image();
    images.data["3"].mouseclick = function () { };
    images.data["3"].cookieW = 0;
    images.data["4"] = new Image();
    images.data["4"].mouseclick = function () { };
    images.data["4"].cookieW = 0;
    images.data["5"] = new Image();
    images.data["5"].mouseclick = function () { };
    images.data["5"].cookieW = 0;
    images.data["6"] = new Image();
    images.data["6"].mouseclick = function () { };
    images.data["6"].cookieW = 0;
    images.data["7"] = new Image();
    images.data["7"].mouseclick = function () { };
    images.data["7"].cookieW = 0;
    images.data["8"] = new Image();
    images.data["8"].mouseclick = function () { };
    images.data["8"].cookieW = 0;
    images.data["9"] = new Image();
    images.data["9"].mouseclick = function () { };
    images.data["9"].cookieW = 0;
    images.data["."] = new Image();
    images.data["."].mouseclick = function () { };
    images.data["."].cookieW = 0;
    images.data[","] = new Image();
    images.data[","].mouseclick = function () { };
    images.data[","].cookieW = 0;
    images.data["M"] = new Image();
    images.data["M"].mouseclick = function () { };
    images.data["M"].cookieW = 0;
    images.data["B"] = new Image();
    images.data["B"].mouseclick = function () { };
    images.data["B"].cookieW = 0;
    images.data["T"] = new Image();
    images.data["T"].mouseclick = function () { };
    images.data["T"].cookieW = 0;
    images.data["+"] = new Image();
    images.data["+"].mouseclick = function () { };
    images.data["+"].cookieW = 0;
    images.data["c"] = new Image();
    images.data["c"].mouseclick = function () { };
    images.data["c"].cookieW = 0;
    images.data["s"] = new Image();
    images.data["s"].mouseclick = function () { };
    images.data["s"].cookieW = 0;
    images.data[" "] = new Image();
    images.data[" "].mouseclick = function () { };
    images.data[" "].cookieW = 0;


    images.numImages = 0;
    for (var key in images.data)
        images.numImages++;
    images.numLoadedImages = 0;

    for (var key in images.data) {
        images.data[key].addEventListener("load", function () {
            images.numLoadedPictures++;
        }, false);
    }
    // Function to get an image
    images.getImage = function (name) {
        return images.data[name];
    }
    // All images loaded?
    images.isValid = function () {
        return images.numImages == images.numLoadedImages;
    }

    images.data["kipferl"].src = 'kipferl.png';
    images.data["smallKipferl"].src = 'smallKipferl.png';
    //images.data["buy0"].src = 'buy.png';
    images.data["frame"].src = 'frame.png';
    images.data["tree"].src = 'tree.png';
    images.data["elf"].src = 'elf.png';
    images.data["robot"].src = 'robot.png';
    images.data["oven"].src = 'oven.png';
    images.data["factory"].src = 'factory.png';
    images.data["rocket"].src = 'rocket.png';
    images.data["moon"].src = 'moon.png';
    images.data["star0"].src = 'star0.png';
    images.data["star1"].src = 'star1.png';
    images.data["star2"].src = 'star2.png';
    images.data["meteor"].src = 'meteor.png';
    images.data["satelite"].src = 'satelite.png';
    images.data["circle"].src = 'star3.png';
    images.data["smallCircle"].src = 'smallCircle.png';
    images.data["boxUniverse"].src = 'boxUniverse.png';
    images.data["line"].src = 'line.png';
    images.data["shoe"].src = 'shoe.png';
    images.data["event"].src = 'event.png';
    images.data["event2"].src = 'event2.png';
    images.data["cursor"].src = 'cursor.png';
    images.data["anke"].src = 'anke.png';
    images.data["winText"].src = 'winText.png';
    images.data["textBG"].src = 'textBG.png';
    images.data["0"].src = '0.png';
    images.data["1"].src = '1.png';
    images.data["2"].src = '2.png';
    images.data["3"].src = '3.png';
    images.data["4"].src = '4.png';
    images.data["5"].src = '5.png';
    images.data["6"].src = '6.png';
    images.data["7"].src = '7.png';
    images.data["8"].src = '8.png';
    images.data["9"].src = '9.png';
    images.data["."].src = 'dot.png';
    images.data[","].src = 'comma.png';
    images.data["M"].src = 'm.png';
    images.data["B"].src = 'b.png';
    images.data["T"].src = 't.png';
    images.data["+"].src = 'plus.png';
    images.data["c"].src = 'c.png';
    images.data["s"].src = 'cs.png';
    images.data[" "].src = 'space.png';
}

// Gamelogic updates.
function update(timeSinceLastFrame) {
    playTime += timeSinceLastFrame;

    UpdateCookies(timeSinceLastFrame);

    canvas.onmousedown = function (canvas) {
        //alert('canvas clicked ' + canvas.clientX)
        for (var key in images.data) {
            if (images.data[key].cookieW <= 0.001)
                continue;
            var img = images.data[key];
            var pos = GetCoordsImg(img);
            if (pos.x < canvas.clientX && pos.w + pos.x > canvas.clientX
                && pos.y < canvas.clientY && pos.y + pos.h > canvas.clientY)
            {
                img.mouseclick();
            }
        }
    };
}

// Draw everything.
var render = function (timeSinceLastFrame) {
    context.clearRect(0, 0, canvas.width, canvas.height);

    // Background
    context.fillStyle = "#ffffff";
    context.fillRect(0, 0, canvas.width, canvas.height);

    // Timer & length
    {
        context.fillStyle = "#fff";
        context.globalAlpha = 0.5;
        context.font = "bold 20px sans-serif";
        context.globalAlpha = 1.0;
    }

    // Draw debug image
    {
        //for (var key in images.data)
        //{
        //    if (images.data[key].cookieW > 0.001)
        //        DrawScaled(context, images.data[key]);
        //}
        DrawGameContent(context);
    }
    context.drawImage(images.data["cursor"], mousePos.x, mousePos.y, 50, 50);
}

// Gameloop.
function run() {
    var now = Date.now();
    var timeSinceLastFrame = (now - lastFrameTime) / 1000;    // duration in seconds

    if (timeSinceLastFrame >= TARGET_FRAMETIME) {
        update(timeSinceLastFrame);
        render(timeSinceLastFrame);
        lastFrameTime = now;
    }

    requestAnimationFrame(run);
}

function initialize(){
    InitializeProducers();

    canvas.addEventListener('mousemove', function (evt) {
        var rect = canvas.getBoundingClientRect();
        mousePos.x = evt.clientX - rect.left;
        mousePos.y = evt.clientY - rect.top;
    }, false);
}
// Cross-browser support for requestAnimationFrame;
requestAnimationFrame = window.requestAnimationFrame || window.webkitRequestAnimationFrame || window.msRequestAnimationFrame || window.mozRequestAnimationFrame;

var lastFrameTime = Date.now();
loadImages();

function waitUntilImageIsValid() {
    if (!images.isValid()) {
        setTimeout(waitUntilImageIsValid, 500);
    }
}
waitUntilImageIsValid();

document.body.style.cursor = 'none';
initialize();
run();