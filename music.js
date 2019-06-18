var pianoWheight = 200;
var pianoWwidth = 1500;
var numwhitekeys = 28;
var numBkeys = 16;
var pianoBheight = 100;
var pianoBwidth = 300;
var pianoTop = 0;
var displaytext = false;

var synth = [new Tone.Synth().toMaster(), new Tone.Synth().toMaster(), new Tone.Synth().toMaster(), new Tone.Synth().toMaster(), new Tone.Synth().toMaster(), new Tone.Synth().toMaster(), new Tone.Synth().toMaster(), new Tone.Synth().toMaster(), new Tone.Synth().toMaster(), new Tone.Synth().toMaster(), new Tone.Synth().toMaster(), new Tone.Synth().toMaster(), new Tone.Synth().toMaster(), new Tone.Synth().toMaster(), new Tone.Synth().toMaster(), new Tone.Synth().toMaster(), new Tone.Synth().toMaster(), new Tone.Synth().toMaster(), new Tone.Synth().toMaster(), new Tone.Synth().toMaster(), new Tone.Synth().toMaster(), new Tone.Synth().toMaster(), new Tone.Synth().toMaster(), new Tone.Synth().toMaster(), new Tone.Synth().toMaster(), new Tone.Synth().toMaster(), new Tone.Synth().toMaster(), new Tone.Synth().toMaster(), new Tone.Synth().toMaster(), new Tone.Synth().toMaster(), new Tone.Synth().toMaster(), new Tone.Synth().toMaster(), new Tone.Synth().toMaster(), new Tone.Synth().toMaster(), new Tone.Synth().toMaster(), new Tone.Synth().toMaster(), new Tone.Synth().toMaster(), new Tone.Synth().toMaster(), new Tone.Synth().toMaster(), new Tone.Synth().toMaster(), new Tone.Synth().toMaster(), new Tone.Synth().toMaster(), new Tone.Synth().toMaster(), new Tone.Synth().toMaster(), new Tone.Synth().toMaster(), new Tone.Synth().toMaster(), new Tone.Synth().toMaster(), new Tone.Synth().toMaster(), new Tone.Synth().toMaster(), new Tone.Synth().toMaster(), new Tone.Synth().toMaster(), new Tone.Synth().toMaster(), new Tone.Synth().toMaster(), new Tone.Synth().toMaster(), new Tone.Synth().toMaster(), new Tone.Synth().toMaster(), new Tone.Synth().toMaster(), new Tone.Synth().toMaster(), new Tone.Synth().toMaster(), new Tone.Synth().toMaster()];
//create or call a bunch of synth and connect to the master or main speaker
var active = [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0];
//keep tracks of all key press

/***************************************
 * setUpPage
 * sets the canvas to full width and height
 * author: wiessmann
 ***************************************/
function setUpPage() {
    var canvas = document.getElementById("mainCanvas");
    var ctx = canvas.getContext("2d");
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;

    pianoWwidth = canvas.width;
    drawpiano();
}

/*function drawImage(imagePath, x, y) {
    var ctx = canvas.getContext("2d");
    var img = new Image();
    img.src = imagePath;
    ctx.drawImage(img, x - img.width / 2, y - img.height / 2);
}*/

function drawpiano() {
    //draws the piano
    var canvas = document.getElementById("mainCanvas");
    var ctx = canvas.getContext("2d");
    ctx.clearRect(0, pianoTop, pianoWwidth, pianoWheight);

    var key = ["Tab", "q", "w", "e", "r", "t", "y", "u", "i", "o", "p", "[", "]", "Sft", "z", "x", "c", "v", "b", "n", "m", ",", ".", "/", "Left", "Up", "Dn", "Right", "1", "1", "1", "1", "2", "3", "4", "5", "6", "7", "8", "9", "-", "-", "=", "BD", "s", "s", "d", "d", "g", "h", "j", "l", "l", ";", "Sp", "Sp", "E/R", "Ctrl", ];
    //this is for displaying the letters on the computer keyboard that correspond to the piano

    for (i = 0; i < numwhitekeys; i++) {
        //draw white keys
        if (active[i] == 1) {
            ctx.fillStyle = "#FF0000";
            ctx.fillRect(i * pianoWwidth / numwhitekeys, pianoTop, pianoWwidth / numwhitekeys, pianoWheight);
            //x,y,w,h
            ctx.fillStyle = "black";
        } else {
            ctx.strokeRect(i * pianoWwidth / numwhitekeys, pianoTop, pianoWwidth / numwhitekeys, pianoWheight);
            //x,y,w,h
        }
        if (displaytext == true) {
            /*if display text is true, it will draw the piano with the characters
            on the keyboard that correspond to the white piano keys*/
            drawText(key[i], i * pianoWwidth / numwhitekeys + 5, pianoTop + pianoWheight - 10);
        }
    }
    for (i = 0; i < numwhitekeys; i++) {
        //draw black keys
        if (i % 7 != 3 && i % 7 != 0) {
            if (active[i + 30] == 1) {
                ctx.fillStyle = "#FF0000";
                ctx.fillRect(i * pianoWwidth / numwhitekeys - (pianoWwidth / numwhitekeys) / 2, pianoTop, pianoWwidth / numwhitekeys * 0.9, pianoBheight);
                //x,y,w,h
                ctx.fillStyle = "black";
            } else {
                ctx.fillRect(i * pianoWwidth / numwhitekeys - (pianoWwidth / numwhitekeys) / 2, pianoTop, pianoWwidth / numwhitekeys * 0.9, pianoBheight);
                //x,y,w,h
            }
            if (displaytext == true) {
                /*if display text is true, it will draw the piano with the characters 
                on the keyboard that correspond to the black piano keys*/
                ctx.fillStyle = "white";
                drawText(key[i + 30], i * pianoWwidth / numwhitekeys + 5, pianoTop + pianoBheight - 10);
                ctx.fillStyle = "black";
            }
        }
    }
}
/***************************************
 * drawtext
 * prints text on canvas at location x, y
 * author: wiessmann
 ***************************************/
function drawText(text, x, y) {
    //draw black characters
    var canvas = document.getElementById("mainCanvas");
    var ctx = canvas.getContext("2d");
    ctx.font = "Bolder 10px Arial";
    ctx.fillText(text, x, y);
}

function drawTextb(text, x, y) {
    //draw white characters
    var canvas = document.getElementById("mainCanvas");
    var ctx = canvas.getContext("2d");
    ctx.font = "Bolder 18px Arial";
    ctx.fillStyle = 'white';
    ctx.fillText(text, x, y);
}

function goBack() {
    //calls main
    main();
}

function key() {
    /*this is for displaying the characters on the computer
    keyboard that correspond to the piano. If the button key is click,
    it will call draw piano which have array of what to display and display it. 
    If button key is click again, the characters will disapear. This is all thanks to displaytext = !displaytext
    because that is saying if displaytext is true do make it false when click and when displaytext is false make it true.*/
    displaytext = !displaytext;
    drawpiano();
    /*drawText("Tab", 11, 164); //white keys
    drawText("q", 75, 164);
    drawText("w", 128, 164);
    drawText("e", 181, 164);
    drawText("r", 235, 164);
    drawText("t", 290, 164);
    drawText("y", 340, 164);
    drawText("u", 395, 164);
    drawText("i", 449, 164);
    drawText("o", 505, 164);
    drawText("p", 560, 164);
    drawText("[", 615, 164);
    drawText("]", 668, 164);
    drawText("Back", 702, 155);
    drawText("Space", 697, 174);

    drawText("Shift", 756, 164);
    drawText("z", 825, 164);
    drawText("x", 878, 164);
    drawText("c", 933, 164);
    drawText("v", 988, 164);
    drawText("b", 1041, 164);
    drawText("n", 1092, 164);
    drawText("Space", 1126, 164);
    drawText("m", 1198, 164);
    drawText(",", 1256, 164);
    drawText(".", 1307, 164);
    drawText("/", 1363, 168);
    drawText("Up", 1409, 164);
    drawText("Down", 1449, 164);

    //BLACK KEYS
    drawTextb("1", 46, 70);
    drawTextb("2", 100, 70);
    drawTextb("3", 206, 70);
    drawTextb("4", 260, 70);
    drawTextb("5", 315, 70);
    drawTextb("7", 420, 70);
    drawTextb("8", 476, 70);
    drawTextb("9", 582, 70);
    drawTextb("0", 637, 70);
    drawTextb("-", 690, 70);

    drawTextb("a", 794, 70);
    drawTextb("s", 850, 70);
    drawTextb("d", 956, 70);
    drawTextb("f", 1011, 70);
    drawTextb("g", 1063, 70);
    drawTextb("h", 1172, 70);
    drawTextb("j", 1226, 70);
    drawTextb("k", 1332, 70);
    drawTextb("l", 1386, 70);
    drawTextb(";", 1440, 70);
*/
}

function playNote(key, sharp, down) {
    //play notes on the piano

    var NNote = ["C2", "D2", "E2", "F2", "G2", "A2", "B2", "C3", "D3", "E3", "F3", "G3", "A3", "B3", "C4", "D4", "E4", "F4", "G4", "A4", "B4", "C5", "D5", "E5", "F5", "G5", "A5", "B5", ];
    var sharpNotes = ["C#2", "C#2", "D#2", "D#2", "F#2", "G#2", "A#2", "C#3", "C#3", "D#3", "D#3", "F#3", "G#3", "A#3", "C#4", "C#4", "D#4", "D#4", "F#4", "G#4", "A#4", "C#5", "C#5", "D#5", "D#5", "F#5", "G#5", "A#5", ];
    if (down == true) {
        //if down is true, keep playing
        if (key != -1 && active[key] != 1) {
            synth[key].triggerAttack(NNote[key]);
            active[key] = 1;
        }
        if (sharp != -1 && active[sharp + 30] != 1) {
            synth[sharp + 30].triggerAttack(sharpNotes[sharp]);
            active[sharp + 30] = 1;
        }
    } else if (down == false) {
        //if down is false, stop playing
        if (key == -1 && sharp == -1) {
            for (var j = 0; j < 60; j++) {
                if (active[j] == 1) {
                    synth[j].triggerRelease();
                    active[j] = 0;
                }
            }
        }
    }
    drawpiano(key, sharp);
}

function mouseUp(e) {
    //stop the note from playing when mouse click is release or up
    playNote(-1, -1, false);
}

function getMousepos(canvas, evt) {
    //get mouse position
    var rect = canvas.getBoundingClientRect();
    return {
        x: evt.clientX - rect.left,
        y: evt.clientY - rect.top
    };
}

function mouseDown(e) {
    //calls playnote when mouse click, let the notes play when mouse is click
    var canvas = document.getElementById("mainCanvas");
    var ctx = canvas.getContext("2d");
    var evt = e || document.event;
    var pos = getMousepos(canvas, evt);
    console.log(pos.x);
    //drawText(pos.x,0,300)
    if (pos.y > pianoTop && pos.y < pianoBheight) {
        //black keys
        playNote(-1, Math.floor((pos.x / (pianoWwidth / numwhitekeys) + 1)), true);
    } else if (pos.y > pianoTop + pianoBheight && pos.y < pianoWheight) {
        //white keys
        playNote(Math.floor(pos.x / (pianoWwidth / numwhitekeys)), -1, true);
    }
}
/***************************************
 * listen: sets a bunch of event listeners
 *
 * author: wiessmann, Rong Added other listeners
 ***************************************/
function listen() {
    //document.addEventListener("touchstart", handleStart, false);
    //document.addEventListener("touchend", handleEnd, false);
    document.addEventListener("keydown", keyDown, false);
    document.addEventListener("keyup", keyUp, false);
    document.addEventListener("mousemove", mouseMove, false);
    document.addEventListener("mousedown", mouseDown, false);
    document.addEventListener("mouseup", mouseUp, false);
    window.addEventListener("resize", resizeWindow, false);
}

/*function handleStart(evt) {
  evt.preventDefault();
  log("touchstart.");
  var el = document.getElementsByTagName("canvas")[0];
  var ctx = el.getContext("2d");
  var touches = evt.changedTouches;
        
  for (var i = 0; i < touches.length; i++) {
    log("touchstart:" + i + "...");
    ongoingTouches.push(copyTouch(touches[i]));
    var color = colorForTouch(touches[i]);
    ctx.beginPath();
    ctx.arc(touches[i].pageX, touches[i].pageY, 4, 0, 2 * Math.PI, false);  // a circle at the start
    ctx.fillStyle = 'red';
    ctx.fill();
    log("touchstart:" + i + ".");
  }
}

function handleEnd() {
    playNote(-1, -1, false);

}*/

function keyUp() {
    //when key is let go on keyboard, the note will stop playing
    playNote(-1, -1, false);
    switch (window.event.key) {
        case '7':
            displaytext = true;
            //this is for displaying the letters on the computer keyboard that correspond to the piano
            drawpiano();
            break;
        case '3':
            displaytext = false;
            //this makes displaying the letters on the computer keyboard that correspond to the piano
            goBack()
            break;
    }
}

function keyDown() {
    /*When certain key is press on keyboard, it will call
    function play note to play certain notes from playnotes*/
    //alert(window.event.key);
    window.event.preventDefault();
    switch (window.event.key) {
        case '7':
            //this is for displaying the letters on the computer keyboard that correspond to the piano
            displaytext = true;
            drawpiano();
            break;
        case '3':
            //this makes displaying the letters on the computer keyboard that correspond to the piano
            displaytext = false;
            goBack();
            break;
        case 'Tab':
            //1st white
            playNote(0, -1, true);
            break;
        case 'q':
            playNote(1, -1, true);
            break;
        case 'w':
            playNote(2, -1, true);
            break;
        case 'e':
            playNote(3, -1, true);
            break;
        case 'r':
            playNote(4, -1, true);
            break;
        case 't':
            playNote(5, -1, true);
            break;
        case 'y':
            playNote(6, -1, true);
            break;
        case 'u':
            //2nd
            playNote(7, -1, true);
            break;
        case 'i':
            playNote(8, -1, true);
            break;
        case 'o':
            playNote(9, -1, true);
            break;
        case 'p':
            playNote(10, -1, true);
            break;
        case "[":
            playNote(11, -1, true);
            break;
        case ']':
            playNote(12, -1, true);
            break;
        case "Shift":
            playNote(13, -1, true);
            break;
        case 'z':
            //3rd white
            playNote(14, -1, true);
            break;
        case 'x':
            playNote(15, -1, true);
            break;
        case 'c':
            playNote(16, -1, true);
            break;
        case 'v':
            playNote(17, -1, true);
            break;
        case 'b':
            playNote(18, -1, true);
            break;
        case 'n':
            playNote(19, -1, true);
            break;
        case 'm':
            playNote(20, -1, true);
            break;
        case ',':
            //4th
            playNote(21, -1, true);
            break;
        case '.':
            playNote(22, -1, true);
            break;
        case '/':
            playNote(23, -1, true);
            break;
        case 'ArrowLeft':
            playNote(24, -1, true);
            break;
        case 'ArrowUp':
            playNote(25, -1, true);
            break;
        case 'ArrowDown':
            playNote(26, -1, true);
            break;
        case 'ArrowRight':
            playNote(27, -1, true);
            break;
        case '1':
            playNote(-1, 1, true);
            //1st black
            break;
        case '2':
            playNote(-1, 2, true);
            break;
        case '4':
            playNote(-1, 4, true);
            break;
        case '5':
            playNote(-1, 5, true);
            break;
        case '6':
            playNote(-1, 6, true);
            break;
        case '8':
            //second black octive
            playNote(-1, 8, true);
            break;
        case '9':
            playNote(-1, 9, true);
            break;
        case '-':
            playNote(-1, 11, true);
            break;
        case '=':
            playNote(-1, 12, true);
            break;
        case 'Backspace':
        case 'Delete':
            playNote(-1, 13, true);
            break;
        case 's':
            //3rd
            playNote(-1, 15, true);
            break;
        case 'd':
            playNote(-1, 16, true);
            break;
        case 'g':
            playNote(-1, 18, true);
            break;
        case 'h':
            playNote(-1, 19, true);
            break;
        case 'j':
            playNote(-1, 20, true);
            break;
        case 'l':
            //4rd
            playNote(-1, 22, true);
            break;
        case ';':
            playNote(-1, 23, true);
            break;
        case ' ':
            playNote(-1, 25, true);
            break;
        case 'Enter':
        case 'Return':
            playNote(-1, 26, true);
            break;
        case 'Control':
            playNote(-1, 27, true);
            break;
    }
}

/***************************************
 * mouseMove: called when a mouse is moved
 * over the canvas
 *
 * author: wiessmann
 ***************************************/
function mouseMove() {
    var xPos = window.event.clientX;
    var yPos = window.event.clientY;
}

/***************************************
 * resizeWindow: called when the window is resized
 *
 * author: wiessmann
 ***************************************/
function resizeWindow() {
    setUpPage();
}

/***************************************
 * clearCanvas: erases everthing on the canvas
 *
 * author: wiessmann
 ***************************************/
function clearCanvas() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
}
/***************************************
 * main: called when canvas loads
 *
 * author: wiessmann
 ***************************************/
//var i = 0;
function main() {
    listen();
    setUpPage();
    drawpiano(-1);
    //playdrum();
    //setInterval(update, 1000);
}