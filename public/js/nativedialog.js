// Alert button event
document.getElementById('alertButton').addEventListener('click', function() {
    alert("Alert pressed!");
});

// Confirm button event
document.getElementById('confirmButton').addEventListener('click', function() {
    let result = confirm("Do you confirm this?");
    document.getElementById("outputRes").innerHTML = `Confirm result: ${result}`;
    document.getElementById("outputRes").style.visibility = 'visible';
});

// Prompt button event
document.getElementById('promptButton').addEventListener('click', function() {
    let result = prompt('What is your name?');
    if (result == null) {
        result = 'User didn\'t enter anything';
    }
    document.getElementById('outputRes').innerHTML = `Prompt result: ${result}`;
    document.getElementById('outputRes').style.visibility = 'visible';
});

// Safer prompt button event
document.getElementById('saferPromptButton').addEventListener('click', function() {
    let result = prompt('What is your name?');
    let cleanResult = DOMPurify.sanitize(result);
    if (result == null) {
        cleanResult = 'User didn\'t enter anything';
    }
    document.getElementById('outputRes').innerHTML = `Prompt result: ${cleanResult}`;
    document.getElementById('outputRes').style.visibility = 'visible';
});