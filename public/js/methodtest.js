// Initialize onjects
let methodForm = document.getElementById('methodForm');
let postBtn = document.getElementById('postBtn');
let getBtn = document.getElementById('getBtn');
let putBtn = document.getElementById('putBtn');
let deleteBtn = document.getElementById('deleteBtn');
let responseText = document.getElementById('responseText');

// Handles Form HTTP Requests
function sendFormRequest(methodInput, actionInput) {
    let formInput = new Object();
    formInput.id = document.getElementById('id').value;
    formInput.article_name = document.getElementById('article_name').value;
    formInput.article_body = document.getElementById('article_body').value;
    formInput.date = new Date();
    let payload = null
    switch(methodInput) {
        case 'POST':
            payload = JSON.stringify(formInput);
            break;
        case 'GET':
            actionInput += '?id='+formInput.id;
            break;
        case 'PUT':
            actionInput += '?id='+formInput.id;
            delete formInput.id;
            payload = JSON.stringify(formInput);
            break;
        case 'DELETE':
            actionInput += '?id='+formInput.id
            break;
    }
    let xhr = new XMLHttpRequest();
    xhr.onload = function(){displayResponse(xhr.responseText)};
    xhr.open(methodInput, actionInput);
    xhr.send(payload);
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