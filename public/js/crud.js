// Import the functions you need from the SDKs you need
import { initializeApp } from "https://www.gstatic.com/firebasejs/9.6.8/firebase-app.js";
import { getFirestore, collection, query, where, getDocs, setDoc, deleteDoc, doc, Timestamp } from "https://www.gstatic.com/firebasejs/9.6.8/firebase-firestore.js";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyAS5Ibw5ObDP8OoTDh_-cb22UzQnrwFl-c",
  authDomain: "cse134b-hw5-116a6.firebaseapp.com",
  projectId: "cse134b-hw5-116a6",
  storageBucket: "cse134b-hw5-116a6.appspot.com",
  messagingSenderId: "86725442010",
  appId: "1:86725442010:web:2410b6f6334c8b512da8e3",
  measurementId: "G-SD1V2JBREF"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const db = getFirestore();

let blogElementList = document.getElementById('blogPostList');


// creates an html list element from a formatted blog object
function createBlogElement (formattedBlogObject) {
    let li = document.createElement('li');
    li.id = formattedBlogObject.id;
    li.innerHTML = `<h2 id="title_${formattedBlogObject.id}">${formattedBlogObject.title}</h2><p class="pDate" id="date_${formattedBlogObject.id}">${formattedBlogObject.date.toDate()}</p><p class="pSummary" id="summary_${formattedBlogObject.id}">${formattedBlogObject.body}</p>`;
    li.innerHTML += `<button id="edit_${formattedBlogObject.id}" class="editButton">Edit</button>`;
    li.innerHTML += `<button id="delete_${formattedBlogObject.id}" class="deleteButton">Delete</button>`;
    blogElementList.appendChild(li);
    document.getElementById("delete_"+formattedBlogObject.id).addEventListener('click', function () {confirmDelete(formattedBlogObject.id)});
    document.getElementById("edit_"+formattedBlogObject.id).addEventListener('click', function () {editBlogElement(formattedBlogObject.id)});
}

async function renderPosts() {
    const querySnapshot = await getDocs(collection(db, "blogPosts"));
    querySnapshot.forEach((doc) => {
        let formObj = new Object();
        formObj.id = doc.id;
        formObj.title = doc.data().title;
        formObj.date = doc.data().date;
        formObj.body = doc.data().body;
        createBlogElement(formObj);
    });
}

renderPosts();

function removeAllposts() {
    while (blogElementList.firstChild) {
        blogElementList.removeChild(blogElementList.firstChild);
    }
}


// Create button event
let createDialogInstance = document.getElementById('createPostDialog');
document.getElementById('createBlogPostButton').addEventListener('click', function() {
    createDialogInstance.showModal();
});

async function getFireDoc (blogPostId) {
    let q = await getDocs(collection(db, "blogPosts"));
    let formObj = new Object();
    q.forEach((doc) => {
        if (doc.id == blogPostId) {
            formObj.id = doc.id;
            formObj.title = doc.data().title;
            formObj.date = doc.data().date;
            formObj.body = doc.data().body;
            console.log(formObj);
        }
    });
    return formObj;
}

// Create confirm button event
document.getElementById('createDialogConfirmButton').addEventListener('click', function() {
    let inputPostTitle = document.getElementById('createTitleInput').value;
    let inputPostDate = document.getElementById('createDateInput').value;
    let inputPostSummary = document.getElementById('createSummaryInput').value;
    let inputPostId = "blogPost_" + (' ' + inputPostTitle).slice(1).replace(/\s/g, "") + "_" + (' ' + inputPostDate).slice(1);
    let postObj = {id: inputPostId, title: inputPostTitle, date: inputPostDate, body: inputPostSummary};
    if (inputPostTitle != '' && inputPostDate != '' && inputPostSummary != '') {
        //blogPostMap.set(inputPostId, postObj);
        let blogPostData = {
            title: inputPostTitle,
            date: Timestamp.fromDate(new Date(inputPostDate)),
            body: inputPostSummary
        }
        setDoc(doc(db, "blogPosts", inputPostId), blogPostData);
        postObj.date = new Date(inputPostDate).getTime();
        removeAllposts();
        renderPosts();
        clearCreateDialogInput();
        //console.log(blogPostMap);
        createDialogInstance.close();
    }
});



// Remove input from create dialog fields
function clearCreateDialogInput() {
    document.getElementById('createTitleInput').value = null;
    document.getElementById('createDateInput').value = null;
    document.getElementById('createSummaryInput').value = null;
}

// Create cancel button event
document.getElementById('createDialogCancelButton').addEventListener('click', function() {
    createDialogInstance.close();
    clearCreateDialogInput();
});

// Handles confirming delete blog post
let confirmDialogInstance = document.getElementById("confirmDeleteDialog");
function confirmDelete (blogElementId) {
    confirmDialogInstance.showModal();
    document.getElementById('confirmOkButton').addEventListener('click', function() {
        confirmDialogInstance.close();
        deleteBlogElement(blogElementId);
    });
    document.getElementById('confirmCancelButton').addEventListener('click', function() {
        confirmDialogInstance.close();
    });
}

// Deletes post from map and the list item
export function deleteBlogElement (blogElementId) {
    deleteDoc(doc(db, "blogPosts", blogElementId));
    removeAllposts();
    renderPosts();
}

// Handles editing blog post fields
let editDialogInstance = document.getElementById('editPostDialog');
async function editBlogElement (blogElementId) {
    let postElem = await getFireDoc(blogElementId);
    console.log(postElem);
    document.getElementById('editTitleInput').value = postElem.title;
    document.getElementById('editDateInput').value = postElem.date.toDate().toDateString();
    document.getElementById('editSummaryInput').value = postElem.body;
    let editPostDialog = document.getElementById('editPostDialog'); 
    editDialogInstance.name = blogElementId;
    editDialogInstance.showModal(); 

    document.getElementById('editDialogSaveButton').addEventListener('click', function() {
        let postLi = document.getElementById(blogElementId);
        let inputPostTitle = document.getElementById('editTitleInput').value;
        let inputPostDate = document.getElementById('editDateInput').value;
        let inputPostSummary = document.getElementById('editSummaryInput').value;
        if (inputPostTitle != '' && inputPostDate != '' && inputPostSummary != '' && postLi.id == editDialogInstance.name) {
            let blogPostData = {
                title: inputPostTitle,
                date: Timestamp.fromDate(new Date(inputPostDate)),
                body: inputPostSummary
            }
            setDoc(doc(db, "blogPosts", inputPostId), blogPostData);
            postObj.date = new Date(inputPostDate).getTime();
            removeAllposts();
            renderPosts();
            clearCreateDialogInput();
            //console.log(blogPostMap);
            createDialogInstance.close();
        }
    });
}

// Edit cancel button event
document.getElementById('editDialogCancelButton').addEventListener('click', function() {
    editDialogInstance.close();
    clearCreateDialogInput();
});