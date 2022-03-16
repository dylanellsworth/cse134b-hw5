// Determine if an instance of the blog map exists in local storage and create example elements if not
let blogPostMap = null;
if (localStorage.getItem("blogPostMapLocal") != null) {
    blogPostMap = new Map(JSON.parse(localStorage.blogPostMapLocal));
}
else {
    blogPostMap = new Map;
    let obj1 = {postId: 'blogPost_BlogPost1_2022-02-01', postTitle: 'Blog Post 1', postDate: '2022-02-01', postSummary: 'Example summary for blog post 1.'};
    blogPostMap.set(obj1.postId, obj1);
    let obj2 = {postId: 'blogPost_BlogPost2_2022-02-02', postTitle: 'Blog Post 2', postDate: '2022-02-02', postSummary: 'Example summary for blog post 2.'};
    blogPostMap.set(obj2.postId, obj2);
    localStorage.blogPostMapLocal = JSON.stringify(Array.from(blogPostMap.entries()));
}


let blogElementList = document.getElementById('blogPostList');

// initializes list with elements from the blog post map
function initializeBlogList() {
    blogPostMap.forEach(function (postObj){
        createBlogElement(postObj);
    });
}
initializeBlogList();

// Create button event
let createDialogInstance = document.getElementById('createPostDialog');
document.getElementById('createBlogPostButton').addEventListener('click', function() {
    createDialogInstance.showModal();
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
    let postDeleteElement = document.getElementById(blogElementId);
    let blogPostParent = postDeleteElement.parentElement;
    blogPostParent.removeChild(postDeleteElement);
    blogPostMap.delete(blogElementId);
    localStorage.blogPostMapLocal = JSON.stringify(Array.from(blogPostMap.entries()));
}

// Handles editing blog post fields
let editDialogInstance = document.getElementById('editPostDialog');
export function editBlogElement (blogElementId) {
    let postElem = blogPostMap.get(blogElementId);
    document.getElementById('editTitleInput').value = postElem.postTitle;
    document.getElementById('editDateInput').value = postElem.postDate;
    document.getElementById('editSummaryInput').value = postElem.postSummary;
    let editPostDialog = document.getElementById('editPostDialog'); 
    editDialogInstance.name = blogElementId;
    editDialogInstance.showModal(); 

    document.getElementById('editDialogSaveButton').addEventListener('click', function() {
        let postObject = blogPostMap.get(blogElementId);
        let postLi = document.getElementById(blogElementId);
        let inputPostTitle = document.getElementById('editTitleInput').value;
        let inputPostDate = document.getElementById('editDateInput').value;
        let inputPostSummary = document.getElementById('editSummaryInput').value;
        if (inputPostTitle != '' && inputPostDate != '' && inputPostSummary != '' && postLi.id == editDialogInstance.name) {
            postObject.postTitle = inputPostTitle;
            postObject.postDate = inputPostDate;
            postObject.postSummary = inputPostSummary;
            localStorage.blogPostMapLocal = JSON.stringify(Array.from(blogPostMap.entries()));
            document.getElementById('title_'+blogElementId).innerHTML = inputPostTitle;
            document.getElementById('date_'+blogElementId).innerHTML = inputPostDate;
            document.getElementById('summary_'+blogElementId).innerHTML = inputPostSummary;
            clearCreateDialogInput();
            editDialogInstance.close();
            let realId = (' ' + blogElementId).slice(1);
        }
    });
}

// creates an html list element from a formatted blog object
function createBlogElement (formattedBlogObject) {
    let li = document.createElement('li');
    li.id = formattedBlogObject.postId;
    li.innerHTML = `<h2 id="title_${formattedBlogObject.postId}">${formattedBlogObject.postTitle}</h2><p class="pDate" id="date_${formattedBlogObject.postId}">${formattedBlogObject.postDate}</p><p class="pSummary" id="summary_${formattedBlogObject.postId}">${formattedBlogObject.postSummary}</p>`;
    li.innerHTML += `<button id="edit_${formattedBlogObject.postId}" class="editButton">Edit</button>`;
    li.innerHTML += `<button id="delete_${formattedBlogObject.postId}" class="deleteButton">Delete</button>`;
    blogElementList.appendChild(li);
    document.getElementById("delete_"+formattedBlogObject.postId).addEventListener('click', function () {confirmDelete(formattedBlogObject.postId)});
    document.getElementById("edit_"+formattedBlogObject.postId).addEventListener('click', function () {editBlogElement(formattedBlogObject.postId)});
}

// Create confirm button event
document.getElementById('createDialogConfirmButton').addEventListener('click', function() {
    let inputPostTitle = document.getElementById('createTitleInput').value;
    let inputPostDate = document.getElementById('createDateInput').value;
    let inputPostSummary = document.getElementById('createSummaryInput').value;
    let inputPostId = "blogPost_" + (' ' + inputPostTitle).slice(1).replace(/\s/g, "") + "_" + (' ' + inputPostDate).slice(1);
    let postObj = {postId: inputPostId, postTitle: inputPostTitle, postDate: inputPostDate, postSummary: inputPostSummary};
    if (inputPostTitle != '' && inputPostDate != '' && inputPostSummary != '') {
        blogPostMap.set(inputPostId, postObj);
        localStorage.blogPostMapLocal = JSON.stringify(Array.from(blogPostMap.entries()));
        createBlogElement(postObj);
        clearCreateDialogInput();
        console.log(blogPostMap);
        createDialogInstance.close();
    }
    
});

// Edit cancel button event
document.getElementById('editDialogCancelButton').addEventListener('click', function() {
    editDialogInstance.close();
    clearCreateDialogInput();
});
