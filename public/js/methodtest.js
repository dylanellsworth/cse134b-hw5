let methodForm = document.getElementById('methodForm');
let postBtn = document.getElementById('postBtn');
let getBtn = document.getElementById('getBtn');
let putBtn = document.getElementById('putBtn');
let deleteBtn = document.getElementById('deleteBtn');
let responseText = document.getElementById('responseText');

responseText.innerHTML="";

function sendFormRequest(methodInput, actionInput) {
    methodForm.method = methodInput;
    methodForm.action = actionInput;
    let xhr = new XMLHttpRequest();
    xhr.onload = function(){displayResponse(xhr.responseText)};
    xhr.open(methodInput, actionInput);
    xhr.send(new FormData(methodForm));
}

function sendPost() {
    methodForm.method = 'POST';
    methodForm.action = 'https://httpbin.org/post';
    let xhr = new XMLHttpRequest();
    xhr.onload = function(){displayResponse(xhr.responseText)};
    xhr.open(methodForm.method, methodForm.getAttribute("action"));
    let formObj = new FormData(methodForm);
    formObj.append('date', new Date());
    xhr.send(formObj);
    console.log(formObj);
}

function sendGet() {
    methodForm.method = 'GET';
    methodForm.action = 'https://httpbin.org/get';
    let xhr = new XMLHttpRequest();
    xhr.onload = function(){displayResponse(xhr.responseText)};
    xhr.open(methodForm.method, methodForm.getAttribute("action"));
    xhr.send(new FormData(methodForm));
}

function sendPut() {
    methodForm.method = 'PUT';
    methodForm.action = 'https://httpbin.org/put';
    let xhr = new XMLHttpRequest();
    xhr.onload = function(){displayResponse(xhr.responseText)};
    xhr.open('PUT', methodForm.getAttribute("action"));
    xhr.send(new FormData(methodForm));
}

function sendDelete() {
    methodForm.method = 'DELETE';
    methodForm.action = 'https://httpbin.org/delete';
    let xhr = new XMLHttpRequest();
    xhr.onload = function(){displayResponse(xhr.responseText)};
    xhr.open(methodForm.method, methodForm.getAttribute("action"));
    xhr.send(new FormData(methodForm));
}

function displayResponse(httpResponse) {
    responseText.innerHTML = httpResponse;
}


// postBtn.addEventListener('click', sendPost);
postBtn.addEventListener('click', function () {
    sendFormRequest('POST','https://httpbin.org/post')});
// getBtn.addEventListener('click', sendGet);
getBtn.addEventListener('click', function () {
    sendFormRequest('GET','https://httpbin.org/get')});
// putBtn.addEventListener('click', sendPut);
putBtn.addEventListener('click', function () {
    sendFormRequest('PUT','https://httpbin.org/put')});
// deleteBtn.addEventListener('click', sendDelete);
deleteBtn.addEventListener('click', function () {
    sendFormRequest('DELETE','https://httpbin.org/delete')});