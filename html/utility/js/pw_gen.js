
    function generate()
    {
        let text = getCharArray();
        var ele = document.getElementById('output');
        ele.innerText = text;
    }
    
    function getCharArray()
    {
        const number = "1234567890";
        const lowercase = "abcdefghijklmnopqrstuvwxyz";
        const uppercase = "ABCDEFGHIJKLMNOPQRSTUVWXYZ";
        const special = "!@#$%^&*-_=+";
        const bracket = "()[]{}";
    
        let array = [];
        if (document.getElementById('number').checked) array = array.concat(number);
        if (document.getElementById('lower-case').checked) array = array.concat(lowercase);
        if (document.getElementById('upper-case').checked) array = array.concat(uppercase);
        if (document.getElementById('special').checked) array = array.concat(special);
        // if (document.getElementById('bracket').checked) array = array.concat(bracket);
    
        let text = array.join('');
    
        let length = parseInt(document.getElementById('length').value);
        let output = [];
        for (let i = 1; i < length; i++) {
            output = output.concat(text[Math.ceil(Math.random() * text.length)]);
        }
        return output.join('');
    }