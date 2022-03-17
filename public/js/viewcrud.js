// Import the functions you need from the SDKs you need
import { initializeApp } from "https://www.gstatic.com/firebasejs/9.6.8/firebase-app.js";
import { getFirestore, collection, getDocs } from "https://www.gstatic.com/firebasejs/9.6.8/firebase-firestore.js";
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
    blogElementList.appendChild(li);
}

const querySnapshot = await getDocs(collection(db, "blogPosts"));
querySnapshot.forEach((doc) => {
  let formObj = new Object();
  formObj.id = doc.id;
  formObj.title = doc.data().title;
  formObj.date = doc.data().date;
  formObj.body = doc.data().body;
  createBlogElement(formObj);
});

