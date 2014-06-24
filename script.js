// two global variables
var secondsRemaining;
var intervalHandle;


function resetPage() {
	window.location.reload(false); //reload from cache, not from server
    //document.getElementById("inputArea").style.display = "block";
}

function tick() {
    // grab the h1
    var timeDisplay = document.getElementById("time");
    
    // turn seconds into mm:ss
    var min = Math.floor(secondsRemaining / 60);
    var sec = secondsRemaining - (min * 60);
    
    // add a leading zero (as a string value) if seconds less than 10	
    if (sec < 10) {
        sec = "0" + sec;
		
    }
    // concatenate with colon
    var message = "" + min + ":" + sec;
    // now change the display
    timeDisplay.innerHTML = message;
    
    // stop if down to zero
    if (secondsRemaining === 0) {
        alert("Done!");
        clearInterval(intervalHandle);
        resetPage();
    }
    // subtract from seconds remaining
    secondsRemaining--;
}

function startCountdown() {
    // get contents of the "minutes" text box
    var minutes = document.getElementById("minutes").value;
    // check if not a number
    if (isNaN(minutes)) {
        alert("Please enter a number!");
        return;
    }
    // how many seconds?
    secondsRemaining =  minutes * 60;
    // every second, call the "tick" function
    intervalHandle = setInterval(tick, 1000);
    // hide the form
    document.getElementById("inputArea").style.display = "none";
	
	//set up the pause button
	var pauseButton = document.createElement("input");
	pauseButton.setAttribute("type","button");
	pauseButton.setAttribute("value","Pause");
	pauseButton.setAttribute("id","pauseButton");
	//give it the pause event
	pauseButton.onclick = function () {	 //closure
        pauseCountdown();
    };
	//Add it to the DOM's pauseArea div:
	document.getElementById("pauseArea").appendChild(pauseButton);	
	
	//setup the restart button
	var restartButton = document.createElement("input");
	restartButton.setAttribute("type","button");
	restartButton.setAttribute("value","Restart");
	restartButton.setAttribute("id","restartButton");
	restartButton.onclick = function () {
		resetPage();
	}
	document.getElementById("pauseArea").appendChild(restartButton);
	
}

function pauseCountdown() {
	var state = document.getElementById("pauseButton").value;		
	if (state == "Pause") {
		clearInterval(intervalHandle); //stops countdown at secondsRemaining.		
		var paused = true;
		if (paused == true) {				
			document.getElementById("pauseButton").setAttribute("value","Resume");				
		}
	} else { //resume countdown		
		intervalHandle = setInterval(tick, 1000);
		document.getElementById("pauseButton").setAttribute("value","Pause");
	}
	
}

// as soon as the page is loaded callback for drawing DOM
window.onload =  function () {
    // create input text box and give it an id of "minutes"
    var inputMinutes = document.createElement("input");
    inputMinutes.setAttribute("id", "minutes");
    inputMinutes.setAttribute("type", "text");
    // create a button
    var startButton = document.createElement("input");
    startButton.setAttribute("type", "button");
    startButton.setAttribute("value", "Start Countdown");
    startButton.onclick = function () {
        startCountdown();
    };
    // add to the DOM, to the div called "inputArea"
    document.getElementById("inputArea").appendChild(inputMinutes);
    document.getElementById("inputArea").appendChild(startButton);
};