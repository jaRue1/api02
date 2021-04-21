var admin = require("firebase-admin")

let serviceAccount = require("../../credentials.json")
let db
function reconnectToFirestore() {
  if (!db) {
    admin.initializeApp({
      credential: admin.credential.cert(serviceAccount),
    })
    db = admin.firestore()
  }
}
exports.getCars = (req, res) => {
  reconnectToFirestore()
  db.collection("cars")
    .get()
    .then((allData) => {
      let usedCars = []
      allData.forEach((car) => {
        usedCars.push(car.data())
      })
      res.send(usedCars)
    })
    .catch((err) => console.log(err))
}
exports.getSingleCars = (req, res) => {
  reconnectToFirestore()
  db.collection("cars")
    .get()
    .then((allData) => {
      allData.forEach((car) => {
        // console.log(car.id," cars here =>", car.data())
        res.send(car.data())
      })
    })
    .catch((err) => console.log(err))
  // res.send("Got cars")
}
exports.newCars = (req, res) => {
  reconnectToFirestore()
  const newData = req.body
  db.collection("cars")
    .add(newData)
    .then(() => this.getCars(req, res))
    .catch((error) =>
      send.status(500).send("Error creating car:" + error.message)
    )
}
exports.newMultiCars = (req, res) => {
  reconnectToFirestore()
  const newData = req.body
  newData.forEach((car, index) => {
    db.collection("cars")
      .add(car)
      .then(() => {
        if (index === newData.length - 1) {
          this.getCars(req, res)
        }
      })
      .catch((error) => send.status(500).send("Error creating car:" + error.message))
  })
}

exports.updateCars = (req, res) => {
  reconnectToFirestore()
  res.send("Updated cars")
}
exports.deleteCars = (req, res) => {
  reconnectToFirestore()
  res.send("Deleted car")
}
