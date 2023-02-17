const mongoose = require('mongoose')
mongoose.connect('mongodb://localhost:50000/fileM')
    .then(()=>{
        console.log('database connect successfully');
    })
    .catch((err)=>{
        console.log(err);
    })