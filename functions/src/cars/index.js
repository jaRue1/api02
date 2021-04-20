
var admin = require("firebase-admin");

var serviceAccount = require("../../credentials.json");
let db;
function reconnectToFirestore() {
  if (!db) {
    admin.initializeApp({
      credential: admin.credential.cert(serviceAccount)
    });    
     db =  admin.firestore()
  }
}

exports.getCars = (req,res) => {
  reconnectToFirestore()
  res.send('Got cars')
}
exports.newCars = (req,res) => {
  reconnectToFirestore()
  const newData = req.body 
  db.collection('cars').add(newData)
  .then(res.send('New Car'))
  .catch(error => send.status(500).send('Error creating car:' + error.message) )
  res.send('Created new car')
}
exports.updateCars = (req,res) => {
  reconnectToFirestore()
  res.send('Updated cars')
}
exports.deleteCars = (req,res) => {
  reconnectToFirestore()
  res.send('Deleted car')
}
