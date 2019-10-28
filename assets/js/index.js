"use strict";
var firebaseConfig = {
    apiKey: "AIzaSyCSg3TdChazPCF5mQZx4zKyedeRglNeVrg",
    authDomain: "mytodoapp-bf38f.firebaseapp.com",
    databaseURL: "https://mytodoapp-bf38f.firebaseio.com",
    projectId: "mytodoapp-bf38f",
    storageBucket: "mytodoapp-bf38f.appspot.com",
    messagingSenderId: "952967961983",
    appId: "1:952967961983:web:fc7770f308b196c0134e4a"
};
// Initialize Firebase
var firebase = firebase.initializeApp(firebaseConfig);
const db = firebase.firestore();
// db.collection("todos") // Hent data'en på ny hver gang siden reloader
// 	.get()
// 	.then((snapshot: any): void => {
// 		snapshot.docs.forEach(function (doc: any) {
// 			renderTodo(doc);
// 			console.log(doc.data());
// 		});
// 	});
const todos = document.querySelector('#todos');
function renderTodo(doc) {
    console.log(doc.data().isDone);
    // opret elementerne
    let li = document.createElement("li");
    let title = document.createElement("h3");
    let content = document.createElement("p");
    let isDone = document.createElement("p");
    let checkbox = document.createElement("input");
    let remove = document.createElement("button");
    // sæt attributter og værdier
    li.setAttribute("data-id", doc.id);
    title.textContent = doc.data().title;
    content.textContent = doc.data().content;
    isDone.textContent = "Afsluttet? ";
    checkbox.setAttribute("type", "checkbox");
    checkbox.checked = doc.data().isDone;
    isDone.appendChild(checkbox);
    remove.textContent = "x";
    // knyt elementerne til ul tagget
    li.appendChild(title);
    li.appendChild(content);
    li.appendChild(isDone);
    li.appendChild(remove);
    todos.appendChild(li);
    checkbox.addEventListener('change', (event) => {
        event.stopPropagation();
        db.collection("todos")
            .doc(doc.id)
            .update({
            isDone: checkbox.checked
        });
        // .then(() => {
        // 	window.location.replace(window.location.toString());
        // }) // reload siden når en opdatering sker.
    });
    remove.addEventListener("click", (event) => {
        console.log(event);
        if (confirm("Vil du slette?")) {
            let id = event.target.parentElement.getAttribute("data-id");
            db.collection("todos")
                .doc(id)
                .delete();
            // .then(() => {
            // 	window.location.replace(window.location.toString());
            // }); // reload siden når en slettelse sker
        }
    });
}
const form = document.querySelector('#add-todo');
form.addEventListener('submit', (event) => {
    event.preventDefault();
    let validate = true;
    let titleInput = form.querySelector('input[name=title]');
    let contentInput = form.querySelector('textarea[name=content]');
    if (titleInput.value == "" || contentInput.value == "") {
        titleInput.style.backgroundColor = "white";
        contentInput.style.backgroundColor = "white";
        validate = false;
        if (titleInput.value == "") {
            titleInput.style.backgroundColor = "red";
        }
        if (contentInput.value == "") {
            contentInput.style.backgroundColor = "red";
        }
        alert("Udfyld Tekst felterne for at oprette todo task");
    }
    if (validate == true) {
        titleInput.style.backgroundColor = "white";
        contentInput.style.backgroundColor = "white";
        db.collection("todos")
            .add({
            title: titleInput.value,
            content: contentInput.value,
            isDone: form.done != undefined ? form.done.checked : false
        });
        // .then(() => {
        // 	window.location.replace(window.location.toString());
        // }) // opdater siden når noget bliver tilføjet
    }
});
db.collection("todos").onSnapshot((snapshot) => {
    let changes = snapshot.docChanges();
    changes.forEach((change) => {
        // console.log(change.type);
        if (change.type == "added") {
            renderTodo(change.doc);
        }
        else if (change.type == "removed") {
            // let li:any = todos.querySelector(`[data-id="${change.doc.id}"]`);
            todos.childNodes.forEach((li) => {
                if (li.dataset["id"] == change.doc.id) {
                    todos.removeChild(li);
                }
            });
        }
        else if (change.type == "modified") {
            todos.childNodes.forEach((li) => {
                if (li.dataset["id"] == change.doc.id) {
                    // console.log(li.dataset["id"])
                    let checkboxTest = document.querySelector(`li [type=checkbox]`);
                    console.log(checkboxTest);
                }
            });
        }
    });
});
