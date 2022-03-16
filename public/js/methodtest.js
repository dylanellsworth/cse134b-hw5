// Initialize onjects
let methodForm = document.getElementById('methodForm');
let postBtn = document.getElementById('postBtn');
let getBtn = document.getElementById('getBtn');
let putBtn = document.getElementById('putBtn');
let deleteBtn = document.getElementById('deleteBtn');
let responseText = document.getElementById('responseText');

// Handles Form HTTP Requests
function sendFormRequest(methodInput, actionInput) {
    methodForm.method = methodInput;
    methodForm.action = actionInput;
    let xhr = new XMLHttpRequest();
    xhr.onload = function(){displayResponse(xhr.responseText)};
    xhr.open(methodInput, actionInput);
    let formObj = new FormData(methodForm);
    formObj.append('date', new Date());
    xhr.send(formObj);
}

// Updates response output from request
function displayResponse(httpResponse) {
    responseText.innerHTML = httpResponse;
}

// Add button event listeners
postBtn.addEventListener('click', function () {
    sendFormRequest('POST','https://httpbin.org/post')});
getBtn.addEventListener('click', function () {
    sendFormRequest('GET','https://httpbin.org/get')});
putBtn.addEventListener('click', function () {
    sendFormRequest('PUT','https://httpbin.org/put')});
deleteBtn.addEventListener('click', function () {
    sendFormRequest('DELETE','https://httpbin.org/delete')});