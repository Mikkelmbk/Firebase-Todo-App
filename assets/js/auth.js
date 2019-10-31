// Login section starter
const loginForm = document.querySelector('#login-form');
let formErrorMessage = document.querySelector('.form-error-message');
loginForm.addEventListener('submit', (event) => {
	event.preventDefault();
	formErrorMessage.innerHTML = "";
	const email = loginForm.Email.value;
	const password = loginForm.Password.value;
	auth.signInWithEmailAndPassword(email, password)
		.then((cred) => {
			// console.log(cred);
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

// Login section slutter

// Signup section starter

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
				console.log("This is Credentials", cred);
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

//Signup section slutter

//Admin section starter

const adminForm = document.querySelector('#admin-form');

adminForm.addEventListener('submit', (event) => {
	event.preventDefault();
	const email = adminForm.adminEmail.value
	const addAdminRole = functions.httpsCallable('addAdminRole'); // reference til server funktionen

	addAdminRole({ email: email }) // Kalder funktionen på serveren med et objekt hvor propertien Email indeholder den Email der blev tastet.
		.then((result) => {
			document.querySelector('.admin-message').innerHTML = result.data.message;
		})
		.catch((err) => {
			console.log("This is an Error", err);
		})
})

//Admin section slutter

//Opdatering af siden baseret på om en bruger er logget på eller ej starter

auth.onAuthStateChanged((user) => {
	// console.log("This is User:", user)

	// let wrapper1 = document.querySelector('.page1-wrapper');
	// let wrapper2 = document.querySelector('.page2-wrapper');
	// let wrapper3 = document.querySelector('.page3-wrapper');
	// let wrapper4 = document.querySelector('.page4-wrapper');

	if (user != null) {
		user.getIdTokenResult().then((idTokenResult) => {
			// console.log("This is Claims", idTokenResult.claims);
			user.admin = idTokenResult.claims.admin; // tag fat i user objektet og lav admin propertien, tildel så admin propertien den værdi som findes i userens claims i admin propertien, true


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

				// wrapper1.style.order = 0;
				// wrapper4.style.order = 2;
				// wrapper3.style.order = 3;
				// wrapper2.style.order = 1;

			loginForm.classList.add('hidden');
			signupForm.classList.add('hidden');
			logoutBtn.classList.remove('hidden');
			form.classList.remove('hidden');
			document.querySelector('.oprettelses-info').classList.add('hidden');
			if(user.admin != undefined && user.admin == true){
				adminForm.classList.remove('hidden');
				// wrapper2.style.order = 2;
				// wrapper4.style.order = 1;
				
			}


		})
	}
	else {

		document.querySelector('.full-name').innerHTML = "";
		document.querySelector('.user-email').innerHTML = "";
		document.querySelector('.oprettelses-info').classList.remove('hidden');
		loginForm.classList.remove('hidden');
		signupForm.classList.remove('hidden');
		logoutBtn.classList.add('hidden');
		form.classList.add('hidden');
		adminForm.classList.add('hidden');
		todos.innerHTML = "";
	}

}
)

//Opdatering af siden baseret på om en bruger er logget på eller ej slutter



