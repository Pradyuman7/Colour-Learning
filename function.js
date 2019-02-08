function changeBackgroundColor(r,g,b){
	container.style.backgroundColor = `rgb(${r}, ${g}, ${b})`;
}

function createNetworkObject(r,g,b){
	var networkObject = {r:null, g:null, b:null};
	networkObject.r = r/255;
	networkObject.g = g/255;
	networkObject.b = b/255;

	return networkObject;
}

function networkLabel(result){
	if(result.light > result.dark){
			result = 'light';
		} else {
			result = 'dark';
		}
	return result;
}

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
