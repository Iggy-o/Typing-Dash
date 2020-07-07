//This file allows Sass variables to be accesible in Javascript
//import variables from "./exports/export.scss";

//
let button = document.getElementById("initiate");
let title = document.getElementsByClassName("title");
button.addEventListener("click", () => {
	button.style.display = "none";
	//console.log(variables.largeFont);
	//title.style.font-size = "12vw"
});
