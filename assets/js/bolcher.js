let bolcheForm = document.querySelector('#bolche-form');

let bolcheObject = {};


bolcheForm.addEventListener('submit',(event)=>{
	event.preventDefault();

	bolcheObject.navn = bolcheForm.bolcheNavn.value;
	bolcheObject.farve = bolcheForm.bolcheFarve.value;
	bolcheObject.vægt = parseInt(bolcheForm.bolcheVægt.value);
	bolcheObject.surhed = bolcheForm.bolcheSurhed.value;
	bolcheObject.styrke = bolcheForm.bolcheStyrke.value;
	bolcheObject.type = bolcheForm.bolcheType.value;
	bolcheObject.pris = parseInt(bolcheForm.bolchePris.value);


	db.collection('bolcher')
		.add({
			navn: bolcheObject.navn,
			farve: bolcheObject.farve,
			vægt: bolcheObject.vægt,
			surhed: bolcheObject.surhed,
			styrke: bolcheObject.styrke,
			type: bolcheObject.type,
			pris: bolcheObject.pris
		})


		bolcheForm.reset();



	console.log(bolcheObject);


})

// let bolcheForm = document.querySelector('#bolche-form');

// bolcheForm.addEventListener('submit', (event) => {
// 	event.preventDefault();

// 	let vægt = parseInt(bolcheForm.bolcheVægt.value)
// 	let pris = parseInt(bolcheForm.bolchePris.value)

// 	console.log(typeof vægt)

// 	// db.collection('bolcher')
// 	// 	.add({
// 	// 		navn: bolcheForm.bolcheNavn.value,
// 	// 		farve: bolcheForm.bolcheFarve.value,
// 	// 		vægt: vægt,
// 	// 		surhed: bolcheForm.bolcheSurhed.value,
// 	// 		styrke: bolcheForm.bolcheStyrke.value,
// 	// 		type: bolcheForm.bolcheType.value,
// 	// 		pris: pris
// 	// 	})

// 	bolcheForm.reset();

// })