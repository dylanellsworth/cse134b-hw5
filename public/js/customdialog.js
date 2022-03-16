// Alert button event
let alertDialogInstance = document.getElementById('alertDialog')
document.getElementById('alertButton').addEventListener('click', function() {
    alertDialogInstance.showModal();
});
document.getElementById('alertOkButton').addEventListener('click', function() {
    alertDialogInstance.close();
});

// Confirm button event
let confirmDialogInstance = document.getElementById('confirmDialog')
document.getElementById('confirmButton').addEventListener('click', function() {
    confirmDialogInstance.showModal();
});
document.getElementById('confirmOkButton').addEventListener('click', function() {
    let result = true;
    document.getElementById("outputRes").innerHTML = `Confirm result: ${result}`;
    document.getElementById("outputRes").style.visibility = 'visible';
    confirmDialogInstance.close();
});
document.getElementById('confirmCancelButton').addEventListener('click', function() {
    let result = false;
    document.getElementById("outputRes").innerHTML = `Confirm result: ${result}`;
    document.getElementById("outputRes").style.visibility = 'visible';
    confirmDialogInstance.close();
});

// Prompt button event
let promptDialogInstance = document.getElementById('promptDialog')
document.getElementById('promptButton').addEventListener('click', function() {
    promptDialogInstance.showModal();
    let cleanResult = DOMPurify.sanitize(result);
    if (result == null) {
        cleanResult = 'User didn\'t enter anything';
    }
    document.getElementById('outputRes').innerHTML = `Prompt result: ${cleanResult}`;
    document.getElementById('outputRes').style.visibility = 'visible';
});
document.getElementById('promptOkButton').addEventListener('click', function() {
    let result = document.getElementById('promptInput').value;
    let cleanResult = DOMPurify.sanitize(result);
    if (result == '') {
        cleanResult = 'User didn\'t enter anything';
    }
    document.getElementById('outputRes').innerHTML = `Prompt result: ${cleanResult}`;
    document.getElementById('outputRes').style.visibility = 'visible';
    promptDialogInstance.close();
});
document.getElementById('promptCancelButton').addEventListener('click', function() {
    let result = 'User didn\'t enter anything';
    document.getElementById('outputRes').innerHTML = `Prompt result: ${result}`;
    document.getElementById('outputRes').style.visibility = 'visible';
    promptDialogInstance.close();
});