const express = require('express')
const app = express()
const port = 5000
const cors = require('cors')

const mongoose = require('mongoose');
mongoose.connect('mongodb://127.0.0.1:27017/hospital');

app.use(cors())

const whitelist = ['http://localhost:3000']
const corsOptions = {
    origin: function (origin, callback) {
        if (whitelist.indexOf(origin) !== -1) {
            callback(null, true)
        } else {
            callback(new Error('Not allowed by CORS'))
        }
    }
}


app.get('/', (req, res) => {
    console.log("asbdajsdba");
    const name = "hsudgsj";
    res.send(name)

})

const DoctorModel = mongoose.model('doctor', { name: String, experience: String, gender: String, phone: String, password: String, speciality: String });

app.get('/doctor', cors(),async (req, res) => {
    const data = await DoctorModel.find()
    console.log(data)
    res.json(data)
})

const PatientModel = mongoose.model('patient', { name: String, gender: String, phone: Number, password: String, age: Number });

app.get('/patients', cors(), async (req, res) => {
    const data = await PatientModel.find()
    console.log(data)
    res.json(data)
})

app.listen(port, () => {
    console.log(`Example app listening on port ${port}`)
})