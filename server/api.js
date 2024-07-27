const express = require("express");
const cors = require("cors");
const multer = require("multer");
const fs = require("fs");
var mongoclient = require('mongodb').MongoClient;

var conString = "mongodb://127.0.0.1:27017";
var app = express();
app.use(cors());
app.use(express.urlencoded({ extended:true}))
app.use(express.json());



const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, 'uploads/') 
    }
});

const upload = multer({ storage});



function convertToBase64(filePath) {
    const image = fs.readFileSync(filePath);
    return image.toString('base64');
}


app.post('/uploadImage', upload.single('Img'), (req, res) => {
    
        const imageBase64 = convertToBase64(req.file.path);
        res.json({base:imageBase64});
});


 
app.post("/adddemp", upload.single('Img'), (req, res) => {
    const date = new Date().toDateString();
    const newEmployee = {
        UserId: req.body.UserId,
        Email: req.body.Email,
        Mobile: parseInt(req.body.Mobile),
        emplist: req.body.emplist,
        male: req.body.male,
        Mca: req.body.Mca,
        Bca: req.body.Bca,
        Bsc: req.body.Bsc,
        Img: req.file ? req.file.path : '', 
        Date: date
    };

    mongoclient.connect(conString).then((client) => {
            var database = client.db('Task-1');
                database.collection("t_Employee").insertOne(newEmployee).then((doc)=>{
                console.log('Emp Added')
                res.end();
            })
        }) 
});









//Route to get all employees
app.get('/getemp', (req, res) => {
    mongoclient.connect(conString)
        .then((client) => {
            const db = client.db('Task-1');
            return db.collection("t_Employee").find({}).toArray();
        })
        .then((docs) => {
            // Convert image paths to Base64 and send to frontend
            const employeesWithBase64Images = docs.map(doc => ({
                ...doc,
                Img: doc.Img ? convertToBase64(doc.Img) : null
            }));
            res.json(employeesWithBase64Images);
        })
        .catch((error) => {
            console.error(error);
            res.status(500).send("Internal Server Error");
        });
});


app.get('/getemp/:Mobaile', (req, res) => {

    var Mobaile = parseInt(req.params.Mobaile)
    mongoclient.connect(conString)
        .then((client) => {
            const db = client.db('Task-1');
            return db.collection("t_Employee").find({Mobile:Mobaile}).toArray();
        })
        .then((docs) => {
            // Convert image paths to Base64 and send to frontend
            const employeesWithBase64Images = docs.map(doc => ({
                ...doc,
                Img: doc.Img ? convertToBase64(doc.Img) : null
            }));
            res.json(employeesWithBase64Images);
        })
        .catch((error) => {
            console.error(error);
            res.status(500).send("Internal Server Error");
        });
});






app.get('/admin', (req, res) => {
    mongoclient.connect(conString).then((clientobj) => {
        var database = clientobj.db("Task-1");
        database.collection("t_login").find({}).toArray().then((docs) => {
            res.send(docs)
            res.end();
        });
    });
})

app.put("/edittask/:email", (req, res) => {
   
    mongoclient.connect(conString).then((clientobj) => {
        var database = clientobj.db("Task-1");
        database.collection("t_Employee").updateOne({Email:req.params.email }, { $set: { UserId:req.body.UserId, Email:req.body.Email, Mobile:req.body.Mobile, emplist:req.body.emplist, male:req.body.male, Mca:req.body.Mca, Bca:req.body.Bca, Bsc:req.body.Bsc} }).then(() => {
            console.log("Task Updated")
            res.end();
        })
    })
})




app.delete("/getemp/:mobile", (req, res) => {
    var mobile = parseInt(req.params.mobile)
    mongoclient.connect(conString).then((clientobj) => {
        var database = clientobj.db("Task-1");
        database.collection("t_Employee").deleteOne({ Mobile: mobile }).then(() => {
            console.log("Emp Delete");
            res.end();
        })
    })
})

app.listen(5050)

console.log('http://127.0.0.1:5050');    
