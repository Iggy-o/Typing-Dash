//Initializing a few neccessary variables
let time = 15;
let timer = document.getElementById("timer");
let text = document.getElementById("text");
let interface = document.getElementById("interface");
let colored, paragraphNum, currentLetter, letterCorrect, completion;
let allowedKeys = "abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ ,.?-";

//
document.getElementById("initiate").addEventListener("click", () => {
	currentLetter = lettersCorrect = completion = 0;
	document.getElementById("initiate").style.display = "none";
	document.getElementById("interface").style.display = "flex";
	document.getElementById("title").style.fontSize = "8vh";
	paragraphNum = Math.round(Math.random() * (paragraphs.length - 1));
	text.innerHTML = paragraphs[paragraphNum];
	colored = paragraphs[paragraphNum].split("");
	(runTimer = () => {
		let currentTime = time;
		let paragraphLength = paragraphs[paragraphNum].split("").length;
		let clock = setInterval( () => {
			!currentTime||currentLetter>=paragraphLength ? gameOver(currentTime, 3000) : timer.innerHTML = `${currentTime--}s`;
		}, 1000);
		gameOver = (timeLeft, waitTime) => {
			clearInterval(clock);
			document.getElementById("text").style.display = "none";
			timer.innerHTML = "Test Complete";
			let wpm = `WPM: ${((completion/ 5)*(60/ (time - timeLeft))).toFixed(1)}<br>`;
			let accuracy = `Accuracy: ${((lettersCorrect/ completion)*100).toFixed(1)}%<br>`;
			let timespent = `Time Spent: ${time - timeLeft}s<br>`;
			let endText = `<span><u>STATS</u><br><br>${wpm}${accuracy}${timespent}</span>`;
			setTimeout( () => {
				timer.style.fontSize = "5vh"
				timer.innerHTML = "Click To Restart";
				text.style.display = "flex";
				text.innerHTML = endText;
				interface.style.cursor = "pointer";
				reset = () => {
					interface.style.cursor = "auto";
					interface.style.display = "none";
					timer.innerHTML = "";
					timer.style.fontSize = "10vh"
					document.getElementById("title").style.fontSize = "18vh";
					document.getElementById("initiate").style.display = "flex";
					interface.removeEventListener("click", reset);
				};
				interface.addEventListener("click", reset);
			}, waitTime);
		};
	})();
	document.onkeyup = (e) => {
		let keyPressed = e.key;
		let paragraphLetter = paragraphs[paragraphNum].split("")[currentLetter];
		if (allowedKeys.includes(keyPressed) && paragraphLetter != undefined) {
			colorText = (color) => {
				colored.splice(currentLetter * 3, 0, `<span style='color: ${color}'>`);
				colored.splice(currentLetter++ * 3 + 2, 0, "</span>");
				text.innerHTML = `<span>${colored.join("")}</span>`;
				completion++;
				if (color == "green") lettersCorrect++;
			};
			keyPressed == paragraphLetter ? colorText("green") : colorText("red");
		}
	};
});