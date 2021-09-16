/* draggeable pop up */

dragElement(document.getElementById("popup"));

function dragElement(elmnt) {
    var pos1 = 0,
        pos2 = 0,
        pos3 = 0,
        pos4 = 0;
    if (document.getElementById(elmnt.id)) {
        /* if present, the header is where you move the DIV from:*/
        document.getElementById(elmnt.id).onmousedown = dragMouseDown;
    } else {
        /* otherwise, move the DIV from anywhere inside the DIV:*/
        elmnt.onmousedown = dragMouseDown;
    }

    function dragMouseDown(e) {
        e = e || window.event;
        e.preventDefault();
        // get the mouse cursor position at startup:
        pos3 = e.clientX;
        pos4 = e.clientY;
        document.onmouseup = closeDragElement;
        // call a function whenever the cursor moves:
        document.onmousemove = elementDrag;
    }

    function elementDrag(e) {
        e = e || window.event;
        e.preventDefault();
        // calculate the new cursor position:
        pos1 = pos3 - e.clientX;
        pos2 = pos4 - e.clientY;
        pos3 = e.clientX;
        pos4 = e.clientY;
        // set the element's new position:
        elmnt.style.top = (elmnt.offsetTop - pos2) + "px";
        elmnt.style.left = (elmnt.offsetLeft - pos1) + "px";
    }

    function closeDragElement() {
        /* stop moving when mouse button is released:*/
        document.onmouseup = null;
        document.onmousemove = null;
    }
}


/* CUSTOM SCROLLBAR */



/* TIMER */

function digitalClock() {

    var todayHTML = document.getElementById('today-js');
    var monthHTML = document.getElementById('month-js');
    var timeHTML = document.getElementById('time-js');
    var dateHTML = document.getElementById('date-js');
    var yearHTML = document.getElementById('year-js');

    var d = new Date();
    var year = d.getFullYear();
    var month = d.getMonth();
    var date = d.getDate();
    date = addZero(date);
    var hours = d.getHours();
    hours = addZero(hours);
    var minutes = d.getMinutes();
    minutes = addZero(minutes);
    var seconds = d.getSeconds();
    seconds = addZero(seconds);
    var today = d.getDay();
    var dayName = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];
    var monthName = ['01', '02', '03', '04', '05', '06', '07', '08', '09', '10', '11', '12'];

    timeHTML.innerHTML = hours + ':' + minutes + ':' + seconds;
    todayHTML.innerHTML = dayName[today];
    dateHTML.innerHTML = date;
    monthHTML.innerHTML = monthName[month] + '/';
    yearHTML.innerHTML = year;
}

function addZero(i) {
    if (i < 10) {
        i = '0' + i;
    }
    return i;
}

setInterval(digitalClock, 1000);

/* FPS COUNTER */
var fpsHTML = document.getElementById('fps-counter');

const times = [];
let fps;

function refreshLoop() {
    window.requestAnimationFrame(() => {
        const now = performance.now();
        while (times.length > 0 && times[0] <= now - 1000) {
            times.shift();
        }
        times.push(now);
        fps = times.length;
        console.log(fps);
        fpsHTML.innerHTML = 'FPS:' + fps;
        refreshLoop();
    });
}

refreshLoop();