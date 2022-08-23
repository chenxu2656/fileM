const mongoose = require('mongoose')
mongoose.connect('mongodb://localhost:55001/fileM')
    .then(()=>{
        console.log('database connect successfully');
    })
    .catch((err)=>{
        console.log(err);
    })