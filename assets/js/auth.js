const loginForm = document.querySelector('#login-form');
let formErrorMessage = document.querySelector('.form-error-message');
loginForm.addEventListener('submit', (event) => {
	event.preventDefault();
	formErrorMessage.innerHTML = "";
	const email = loginForm.Email.value;
	const password = loginForm.Password.value;
	auth.signInWithEmailAndPassword(email, password)
		.then((cred) => {
			console.log(cred);
			loginForm.reset();
		})
		.catch((err) => {
			formErrorMessage.innerHTML = err.message;
		});
});

const logoutBtn = document.querySelector('.logout-btn');
logoutBtn.addEventListener('click', () => {
	auth.signOut()
		.then(() => {
			console.log("Brugeren er logget af");
		});
});

const signupForm = document.querySelector('#signup-form');
let signupErrorMessage = document.querySelector('.signup-error-message');
signupForm.addEventListener('submit', (event) => {
	event.preventDefault();

	signupErrorMessage.innerHTML = "";
	let allowSignup = true;


	const name = signupForm.Name.value;
	const email = signupForm.Email.value;
	const password = signupForm.Password.value;
	const repeatPassword = signupForm.repeatPassword.value;

	signupForm.Name.style.backgroundColor = "white";
	signupForm.Email.style.backgroundColor = "white";
	signupForm.Password.style.backgroundColor = "white";
	signupForm.repeatPassword.style.backgroundColor = "white";

	if (name == "") {
		allowSignup = false;
		signupForm.Name.style.backgroundColor = "red";
	}
	if (email == "") {
		allowSignup = false;
		signupForm.Email.style.backgroundColor = "red";
	}
	if (password != repeatPassword) {
		allowSignup = false;
		signupForm.Password.style.backgroundColor = "orange";
		signupForm.repeatPassword.style.backgroundColor = "orange";
	}
	if (password == "") {
		allowSignup = false;
		signupForm.Password.style.backgroundColor = "red";
	}
	if (repeatPassword == "") {
		allowSignup = false;
		signupForm.repeatPassword.style.backgroundColor = "red";
	}


	if (allowSignup) {

		auth.createUserWithEmailAndPassword(email, password)
			.then((cred) => {
				console.log(cred);
				return db.collection('users').doc(cred.user.uid).set({
					fullname: name
				})
			})
			.then(() => {
				signupForm.reset();

			})
			.catch((err) => {
				signupErrorMessage.innerHTML = err.message;
			})

	}
})

auth.onAuthStateChanged((user) => {
	console.log("This is User:", user)
	if (user != null) {
		db.collection("todos").onSnapshot((snapshot) => {
			let changes = snapshot.docChanges();
			changes.forEach((change) => {
				if (change.type == "added") {
					renderTodo(change.doc);
				}
				else if (change.type == "removed") {
					let li = todos.querySelector(`[data-id="${change.doc.id}"]`);
					todos.removeChild(li);
				}
				else if (change.type == "modified") {
					todos.childNodes.forEach((li) => {
						if (li.dataset["id"] == change.doc.id) {
							let checkboxTest = document.querySelector(`li [type=checkbox]`);
						}
					});
				}
			});
		}, (error) => {
			console.log(error.message)
		});

		db.collection('users').doc(user.uid).get()
			.then((doc) => {
				if (doc.data().fullname) {
					document.querySelector('.full-name').innerHTML = doc.data().fullname;
					document.querySelector('.user-email').innerHTML = user.email;

				}
			})

		loginForm.classList.add('hidden');
		signupForm.classList.add('hidden');
		logoutBtn.classList.remove('hidden');
		form.classList.remove('hidden');
	}
	else {

		document.querySelector('.full-name').innerHTML = "";
		document.querySelector('.user-email').innerHTML = "";
		loginForm.classList.remove('hidden');
		signupForm.classList.remove('hidden');
		logoutBtn.classList.add('hidden');
		form.classList.add('hidden');
		todos.innerHTML = "";
	}

}
)
