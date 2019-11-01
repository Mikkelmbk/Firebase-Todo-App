const bolcheListe = document.querySelector('.bolche-liste');

(async function () {

	let printArray = [];
	// let snapshot = await db.collection("bolcher").get();
	try {

		// Navne på alle røde bolcher starter
		// let rødeBolcher = await db.collection("bolcher")
		// .where("farve", "==", "Rød")
		// .get()
		// rødeBolcher.docs.forEach((doc)=>{
		// 	printArray.push(doc.data().navn);
		// })
		// Navne på alle røder bolcher slutter


		// Navne på alle røde og blå bolcher starter
		// let rødeBolcher = await db.collection("bolcher")
		// .where("farve", "==", "Rød")
		// .get()
		// rødeBolcher.docs.forEach((doc)=>{
		// 	printArray.push(doc.data().navn);
		// })
		// let blåBolcher = await db.collection("bolcher")
		// .where("farve","==","Blå")
		// .get()
		// blåBolcher.docs.forEach((doc)=>{
		// 	printArray.push(doc.data().navn);
		// })
		// Navne på alle røde og blå bolcher slutter


		// Navne på alle bolcher der ikke er røde, alfabetisk sorteret starter.
		// let hentAlleBolcher = await db.collection("bolcher")
		// 	.get()
		// hentAlleBolcher.docs.forEach((doc) => {
		// 	if (doc.data().farve !== "Rød") {
		// 		printArray.push(doc.data().navn);
		// 	}
		// })
		// Navne på alle bolcher der ikke er røde, alfabetisk sorteret slutter.


		// Navne på alle bolcher der starter med bogstavet B starter.
		// let bolcherDerStarterMedB = await db.collection("bolcher")
		// 	.orderBy("navn")
		// 	.startAt("B")
		// 	.endAt("B\uf8ff")
		// 	.get()
		// bolcherDerStarterMedB.docs.forEach((doc) => {
		// 	printArray.push(doc.data().navn);
		// })
		// Navne på alle bolcher der starter med bogstavet B slutter.


		// Navne på alle bolcher der indeholder mindst et "e" i navnet starter.
		// let bolcherMedMindst1EiNavnet = await db.collection("bolcher")
		// 	.get()
		// bolcherMedMindst1EiNavnet.docs.forEach((doc) => {
		// 	if (doc.data().navn.indexOf('e') > -1) {
		// 		printArray.push(doc.data().navn)
		// 	}
		// })
		// Navne på alle bolcher der indeholder mindst et "e" i navnet slutter.


		// Navne og vægt på alle bolcher der vejer mindre end 10 gram, sorteret ascending efter vægt starter.
		// let bolcherVægtogNavne = await db.collection("bolcher")
		// 	.where("vægt", "<", 10)
		// 	.orderBy("vægt")
		// 	.get()
		// bolcherVægtogNavne.docs.forEach((doc) => {
		// 	printArray.push(doc.data())
		// })
		// Navne og vægt på alle bolcher der vejer mindre end 10 gram, sorteret ascending efter vægt slutter.


		// Navne på alle bolcher der vejer mellem 10 og 12 (inklusiv) sorteret alfabetisk og derefter vægt starter.
		// let bolcherMelle10og12Sorteret = await db.collection("bolcher")
		// 	.where("vægt", ">", 9).where("vægt", "<", 13)
		// 	.get()
		// bolcherMelle10og12Sorteret.docs.forEach((doc) => {
		// 	let tempObj = {}
		// 	tempObj.navn = doc.data().navn;
		// 	tempObj.vægt = doc.data().vægt;
		// 	printArray.push(tempObj);
		// });
		// printArray.sort((a, b) => {
		// 	let nameA = a.navn.toUpperCase(); // ignore upper and lowercase
		// 	let nameB = b.navn.toUpperCase(); // ignore upper and lowercase
		// 	let vægtA = a.vægt;
		// 	let vægtB = b.vægt;
		// 	if (nameA < nameB) {
		// 		return -1;
		// 	}
		// 	if (nameA > nameB) {
		// 		return 1;
		// 	}
		// 	// names must be equal
		// 	if(nameA == nameB){
		// 		return vægtB - vægtA;
		// 	};
		// });
		// Navne på alle bolcher der vejer mellem 10 og 12 (inklusiv) sorteret alfabetisk og derefter vægt slutter.


		// alle oplysninger om de 3 tungeste bolcher starter.
		// let de3TungesteBolcher = await db.collection("bolcher")
		// .orderBy("vægt","desc").limit(3)
		// .get()
		// de3TungesteBolcher.docs.forEach((doc)=>{
		// 	printArray.push(doc.data())
		// })
		// Alle oplysninger om de 3 tungeste bolcher slutter.


		// Alle informationer om et tilfældigt bolche starter.
		// const randomIndex = Math.floor(Math.random()* 10);
		// let randomBolche = await db.collection("bolcher")
		// 	.get()
		// printArray.push(randomBolche.docs[randomIndex].data())
		// Alle informationer om et tilfældigt bolche Slutter.
		// renderBolcheTabel(printArray);
	} catch (error) {
		console.log(error)
	}

})();


function renderBolcheTabel(docs) {
	docs.forEach((doc) => {
		console.log("Hello", doc)

		let li = document.createElement('li');
		bolcheListe.appendChild(li);
		li.classList.add('bolcheLi');

		let pName = document.createElement('p');
		pName.innerHTML = `Navn: ${doc.navn}`;
		pName.classList.add('bolcheP');
		li.appendChild(pName);

		let pFarve = document.createElement('p');
		pFarve.innerHTML = `Farve: ${doc.farve}`;
		pFarve.classList.add('bolcheP');
		li.appendChild(pFarve);

		let pPris = document.createElement('p');
		pPris.innerHTML = `Pris: ${doc.pris}`;
		pPris.classList.add('bolcheP');
		li.appendChild(pPris);

		let pStyrke = document.createElement('p');
		pStyrke.innerHTML = `Styrke: ${doc.styrke}`;
		pStyrke.classList.add('bolcheP');
		li.appendChild(pStyrke);

		let pSurhed = document.createElement('p');
		pSurhed.innerHTML = `Surhed: ${doc.surhed}`;
		pSurhed.classList.add('bolcheP');
		li.appendChild(pSurhed);

		let pType = document.createElement('p');
		pType.innerHTML = `Type: ${doc.type}`;
		pType.classList.add('bolcheP');
		li.appendChild(pType);

		let pVægt = document.createElement('p');
		pVægt.innerHTML = `Vægt: ${doc.vægt}`;
		pVægt.classList.add('bolcheP');
		li.appendChild(pVægt);

	});
};