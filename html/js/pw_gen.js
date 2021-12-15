function generate()
{
	var ele = document.getElementById('output');
}

function getCharArray()
{
	const number = "1234567890";
	const lowercase = "abcdefghijklmnopqrstuvwxyz";
	const uppercase = "ABCDEFGHIJKLMNOPQRSTUVWXYZ";
	const special = "!@#$%^&*-_=+";
	const bracket = "()[]{}";

	var array = [];
	if (document.getElementById('number').checked) array = array.concat(number);
	if (document.getElementById('lower-case').checked) array = array.concat(lowercase);
	if (document.getElementById('upper-case').checked) array = array.concat(uppercase);
	if (document.getElementById('special').checked) array = array.concat(special);
	if (document.getElementById('bracket').checked) array = array.concat(bracket);

	
}