var time = 15;

var testEnd = false;

var timing = setInterval(function () {
	time = time - 1;

	//console.log(time)

	document.getElementById("timer").innerHTML = ":" + time;

	if (time === 0) {
		clearInterval(timing);
		clearInterval(check);
		testEnd = true;
		document.getElementById("timer").innerHTML = "EXPIRED";
	}
}, 1000);

var index = 0;
var rightAnswer = 0;
var wrongAnswer = 0;

var total = 0;

var testComplete = false;

var check = setInterval(function () {
	var userInput = document.getElementById("user-input").value;

	let premadeText = document.getElementById("text");

	letter = userInput.charAt(index);

	var robot = document.getElementById("text").textContent;

	word = robot.charAt(index);

	if (index > userInput.length) {
		index = 0;
	} else if (index < userInput.length /*&& index != userInput.length*/) {
		index = index + 1;
	}

	typed = userInput.length;

	barFilling = (typed / robot.length) * 100;

	var bar = document.getElementById("bar");
	var barText = document.getElementById("bar-text");

	bar.value = barFilling;

	if (barFilling == 100 || barFilling > 100) {
		bar.style.display = "none";
		barText.innerHTML = "Complete";
		barText.style.position = "relative";
		barText.style.top = "5px";
		barText.style.fontSize = "200%";
		barText.style.fontWeight = "normal";
		testComplete = true;
		clearInterval(timing);
		clearInterval(check);
	}

	total = rightAnswer + wrongAnswer;

	if (letter === word) {
		//console.log("correct")
		rightAnswer += 1;
		premadeText.innerHTML = premadeText.innerHTML.replace(
			word,
			"<b>" + word + "</b>"
		);
		//result += '<span class = "correct">' + arr[index] + '</span>';
		//console.log(arr)
	} else if (
		letter != word &&
		userInput.length > 0 &&
		userInput.length > total
	) {
		//console.log("wrong")
		wrongAnswer = wrongAnswer + 1;
		premadeText.innerHTML = premadeText.innerHTML.replace(
			word,
			"<q>" + word + "</q>"
		);
		//result += '<span class = "incorrect">' + arr[index] + '</span>';
	}

	//console.log("USER: " + letter + "  | ROBOT: " + word);
	//console.log(premadeText);
	//console.log(barFilling);
}, 10);

var percentage = 0;

var end = setInterval(function () {
	if (testEnd == true || testComplete == true) {
		//console.log(percentage)
		setTimeout(function () {
			document.getElementById("text-container").style.display = "none";
			document.getElementById("timer").innerHTML = (typed / 4) * 4 + " WPM";
			document.getElementById("bar").style.display = "none";
			var barText = document.getElementById("bar-text");
			barText.innerHTML = "Complete";
			barText.style.position = "relative";
			barText.style.top = "5px";
			barText.style.fontSize = "150%";
			barText.style.fontWeight = "normal";
			barText.style.top = "10px";
			document.getElementById("time-box").style.boxShadow = "none";
			document.getElementById("progress-box").style.boxShadow = "none";
			document.getElementById("time-box").style.transition = "0s";
			document.getElementById("progress-box").style.transition = "0s";
			document.getElementById("time-box").style.bottom = "100px";
			document.getElementById("progress-box").style.bottom = "100px";
			document.getElementById("time-box").style.left = "350px";
			document.getElementById("progress-box").style.left = "75px";
			document.getElementById("time-box").style.position = "relative";
			document.getElementById("progress-box").style.position = "relative";

			percentage = (rightAnswer / (rightAnswer + wrongAnswer)) * 100;

			if (rightAnswer == 0 && wrongAnswer == 0) {
				percentage = 0;
			}

			document.getElementById("bar-text").innerHTML =
				Math.round(percentage) + "% Accuracy";
			document.getElementById("link").style.display = "none";
			document.getElementById("promo").style.display = "none";
			console.log("\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n");
			console.clear();

			var stats = document.getElementById("stats");
			var statsText = document.getElementById("words");
			stats.id = "text-container";
			statsText.id = "text";
			//statsText = document.getElementById("text");
			statsText.style.marginBottom = "0px";
			statsText.style.marginTop = "25px";
			statsText.style.fontSize = "50px";
		}, 3000);
	}
}, 100);
