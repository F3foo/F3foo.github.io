localStorage = window.localStorage;


//clock and date
function defTime() {
    var time = new Date();
    var hour = adj(time.getHours());
    var min = adj(time.getMinutes());
    var sec = adj(time.getSeconds());
    clock = hour + " : " + min + " : " + sec;
    document.getElementById("clock").innerText = clock
    var t = setTimeout(function () { defTime() }, 1000);
}

function adj(k) {
    if (k < 10) {
        return "0" + k;
    }
    else {
        return k;
    }
}

function defDate() {
    var date = new Date();
    var nday = new Array(7);
    nday[0] = "Sun";
    nday[1] = "Mon";
    nday[2] = "Tue";
    nday[3] = "Wed";
    nday[4] = "Thu";
    nday[5] = "Fri";
    nday[6] = "Sat";
    var day = adj(date.getDate());
    var mon = adj(date.getMonth() + 1);
    var year = adj(date.getFullYear());
    clock2 = nday[date.getDay()] + " " + day + "-" + mon + "-" + year;
    document.getElementById("date").innerText = clock2
    var t = setTimeout(function () { defDate() }, 1000);
}

defTime();
defDate();
//searchbar
input = document.getElementById("searchbar");
putSpace = false;
document.addEventListener("keydown", function (event) {
    event.preventDefault();
    switch (event.key) {
        case "Enter":
            if (input.innerText != "Type to search..." && input.innerText.startsWith("!l ")) {

                location = "https://" + input.innerText.replace("!l ", "");

            } else if (input.innerText != "Type to search..." && input.innerText.startsWith("!bg ")) {

                color = input.innerText.replace("!bg ", "");
                document.getElementsByTagName("body")[0].style = `background-color: ${color}`;
                localStorage.setItem("bg_color", color);
                input.innerText = "Type to search...";

            } else if (input.innerText != "Type to search..." && input.innerText.startsWith("!c ")) {

                color = input.innerText.replace("!c ", "");
                document.getElementById("clock").style.color = color;
                document.getElementById("date").style.color = color;
                document.getElementById("searchbar").style.color = color;
                input.innerText = "Type to search...";
                localStorage.setItem("color", color);

            } else if (input.innerText != "Type to search...") {

                location = "https://duckduckgo.com/?q=" + input.innerText.replace("&nbsp:", "+");

            }
            break;

        case "Backspace":
            if (input.innerText != "Type to search...") {
                if (event.ctrlKey) {

                    splitput = input.innerText.split(" ");
                    splitput.pop(-1);
                    splitput = splitput.join(" ");

                    input.innerText = splitput;
                    putSpace = true;

                } else {

                    if (putSpace == true) {
                        putSpace = false
                    } else if (input.innerText.slice(-2, -1) == " ") {
                        input.innerText = input.innerText.slice(0, -1);
                        putSpace = true;
                    } else {
                        input.innerText = input.innerText.slice(0, -1);
                    }

                }
            }
            break;


        case " ":
            putSpace = true
            break;

        case "v":
            if (event.ctrlKey) {
                setTimeout(async () => {
                    const text = await navigator.clipboard.readText();
                    if (input.innerText != "Type to search...") {
                        input.innerText = input.innerText + text;
                    } else {
                        input.innerText = text;
                    }
                    splitput = input.innerText.split(" ");
                    splitput[0] = splitput[0] + " ";
                    if (splitput.length == 1 && toCheck != null) {
                        toCheck = /^\!.*/.exec(input.innerText);
                        input.innerHTML = "<span style=\"color: #626262;\">" + input.innerText + "</span>"
                    } else if (toCheck != null) {
                        input.innerHTML = "<span style=\"color: #626262;\">" + splitput[0] + "</span> " + splitput.slice(1).join(" ")
                    };

                });
                break;
            }

        default:
            console.log(event.key)
            if (!["Control", "Escape", "Tab", "Shift", "Alt", "AltGraph", "Insert", "Delete", "Home", "End", "PageUp", "PageDown", "ScrollLock", "Pause", "ArrowUp", "ArrowLeft", "ArrowDown", "ArrowRight", "NumLock", "F1", "F2", "F3", "F4", "F5", "F6", "F7", "F8", "F9", "F10", "F11", "F12", "OS", "PrintScreen", "Meta", "Dead", "CapsLock", "ContextMenu", "Super"].includes(event.key)) {

                if (input.innerText == "Type to search...") {
                    input.innerText = "";
                }

                if (putSpace == true) {
                    input.innerText = input.innerText + " " + event.key;
                    putSpace = false
                } else {
                    input.innerText = input.innerText + event.key;
                }
            }
    }

    if (input.innerText.length == 0) {
        input.innerText = "Type to search...";
    }

    splitput = input.innerText.split(" ")
    splitput[0] = splitput[0] + " "

    toCheck = /^\!.*/.exec(input.innerText)
    if (splitput.length == 1 && toCheck != null) {
        input.innerHTML = "<span style=\"color: #626262;\">" + input.innerText + "</span>"
    } else if (toCheck != null) {
        input.innerHTML = "<span style=\"color: #626262;\">" + splitput[0] + "</span> " + splitput.slice(1).join(" ")
    }

}, 1000);

//reload
window.onload = function settings() {
    var bg_color = localStorage.getItem("bg_color");
    var color = localStorage.getItem("color");
    console.log(bg_color, color);
    document.getElementsByTagName("body")[0].style = `background-color: ${bg_color}`;
    document.getElementById("clock").style.color = color;
    document.getElementById("date").style.color = color;
    document.getElementById("searchbar").style.color = color;
};