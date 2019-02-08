// Change background colour
function changeBackgroundColor(r,g,b){
	container.style.backgroundColor = `rgb(${r}, ${g}, ${b})`;
}

// creations of object for neural network
function createNetworkObject(r,g,b){
	var networkObject = {r:null, g:null, b:null};
	networkObject.r = r/255;
	networkObject.g = g/255;
	networkObject.b = b/255;

	return networkObject;
}
// Machine learning probability label
function networkLabel(result){
	if(result.light > result.dark){
			result = 'light';
		} else {
			result = 'dark';
		}
	return result;
}

// change colors on page relative to background
function changeElementsColor(result, input, sliderInput){
	if (result == 'light'){
			for(var i = 0; i < input.length; i++){
				input[i].parentElement.style.color = "black";
				input[i].style.color = "black";
				input[i].style.borderColor = "black";
			}
			for(var i = 0; i < sliderInput.length; i++){
				sliderInput[i].style.backgroundColor = 'black';
			}
			// grab label element
			var label = document.getElementsByTagName('LABEL');
			for(var i = 0; i < label.length; i++){
				label[i].style.color = 'black';
			}
		}
		else if (result == 'dark'){
			for(var i = 0; i < input.length; i++){
				input[i].parentElement.style.color = "white";
				input[i].style.color = "white";
				input[i].style.borderColor = "white";
			}
			for(var i = 0; i < sliderInput.length; i++){
				sliderInput[i].style.backgroundColor = 'white';
			}

			var label = document.getElementsByTagName('LABEL');
			for(var i = 0; i < label.length; i++){
				label[i].style.color = 'white';
			}
		}
}

//===============================================================================//

// create new neural network object
const network = new brain.NeuralNetwork();

// training data
network.train([
	{ input: { r: 0.62, g: 0.72, b: 0.88 }, output: { light: 1 } },
	{ input: { r: 0.1, g: 0.84, b: 0.72 }, output: { light: 1 } },
	{ input: { r: 0.33, g: 0.24, b: 0.29 }, output: { dark: 1 } },
	{ input: { r: 0.74, g: 0.78, b: 0.86 }, output: { light: 1 } },
	{ input: { r: 0.31, g: 0.35, b: 0.41 }, output: { dark: 1 } },
	{ input: {r: 1, g: 0.42, b: 0.52}, output: { dark: 1 } },
	{ input: {r: 0, g: 0, b: 1}, output: { dark: 1 } },
	{ input: {r: 0.8, g: 0.44, b: 1}, output: { dark: 1 } },
	{ input: {r: 0, g: 0.44, b: 1}, output: { dark: 1 } },
	{ input: {r: 0.3 , g: 0.6, b: 1}, output: { dark: 1 } },
	{ input: {r: 0.1, g: 0.6, b: 0}, output: { dark: 1 } }
]);

// grab inputs in .rgbValues div
var input = document.querySelectorAll(".rgbValues input");
// grab inputs in .colorPicker div
var sliderInput = document.querySelectorAll('.colorPicker input');

// rgb slider
for(var i = 0; i < sliderInput.length; i++){
	sliderInput[i].addEventListener("input", function(){
		var redSlider = document.getElementById("redSlider").value;
		var greenSlider = document.getElementById("greenSlider").value;
		var blueSlider = document.getElementById("blueSlider").value;

		document.getElementById("red").value = redSlider;
		document.getElementById("green").value = greenSlider;
		document.getElementById("blue").value = blueSlider;

		changeBackgroundColor(redSlider,greenSlider,blueSlider);

		var networkObject = createNetworkObject(redSlider,greenSlider,blueSlider);
		var MLresult = network.run(networkObject);

		MLresult = networkLabel(MLresult);
		console.log(MLresult);

		changeElementsColor(MLresult, input, sliderInput);
	});
}

// rgb value input (the non slider one)
for(var i = 0; i < input.length; i++){
	input[i].addEventListener("keyup", function(e){
		// right arrow key to next tab
		if(e.keyCode == 39){
			$(this).next('input, select').focus();
		}
		// left arrow key to previous tab
		if(e.keyCode == 37){
			$(this).prev('input, select').focus();
		}
		// max value input 255
		if(e.target.value > 255){
			e.target.value = 255;
		}

		var container = document.getElementById("container");
		var red = document.getElementById("red").value;
		var green = document.getElementById("green").value;
		var blue = document.getElementById("blue").value; 

		// change slider values to correspong to rgb value input(s)
		document.getElementById('redSlider').value = red;
		document.getElementById('greenSlider').value = green;
		document.getElementById('blueSlider').value = blue;

		changeBackgroundColor(red, green, blue);

		// machine learning 
		var networkObject = createNetworkObject(red,green,blue);
		var MLresult = network.run(networkObject);

		MLresult = networkLabel(MLresult);
		console.log(MLresult);

		changeElementsColor(MLresult, input, sliderInput);
	});

	// when input changes from up down arrows keys to change value
	input[i].addEventListener("change", function(){
		var container = document.getElementById("container");
		var red = document.getElementById("red").value;
		var green = document.getElementById("green").value;
		var blue = document.getElementById("blue").value;
	
		changeBackgroundColor(red, green, blue);

		// machine learning 
		var networkObject = createNetworkObject(red,green,blue);
		var MLresult = network.run(networkObject);

		MLresult = networkLabel(MLresult);
		console.log(MLresult);
		
		var MLresult = network.run(networkObject);

		// black text for 'light' colours
		changeElementsColor(MLresult, input, sliderInput);
	});
}
