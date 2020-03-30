var images = [
	"image.jpg",
	"image.jpg",
	"image.jpg",
	"image.jpg",
	"image.jpg"
];

function loadImages() {
	var div = document.getElementById("images");
	
	var elements = "";
	for (var i = 0; i < images.length; i++) {
		elements += "<img src='" + images[i] + "' width='100px' height='90px' onclick='showImage(\"" + images[i] + "\")'></img>";
	}
	
	div.innerHTML = elements;
}

function showImage(src) {
	document.getElementById("show").src = src;
	document.getElementById("show").style.display = "block";
}