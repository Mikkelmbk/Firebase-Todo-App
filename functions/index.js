const functions = require('firebase-functions');

// // Create and Deploy Your First Cloud Functions
// // https://firebase.google.com/docs/functions/write-firebase-functions
//
// exports.helloWorld = functions.https.onRequest((request, response) => {
//  response.send("Hello from Firebase!");
// });


const admin = require('firebase-admin');

admin.initializeApp();

exports.addAdminRole = functions.https.onCall((data, context)=>{

	if(context.auth.token.admin != true){
		return { error: 'Kun en Administrator kan lave andre til administratorer'}
	}

	return admin.auth().getUserByEmail(data.email)
		.then((user)=>{
			return admin.auth().setCustomUserClaims(user.uid, {
				admin: true
			})
		})
		.then(()=>{
			return { message: `Success ${data.email} has been made an Admin`}
		})
		.catch((err)=>{
			return err;
		})
})
