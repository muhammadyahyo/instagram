const mongoose = require('mongoose')
const url = 'mongodb+srv://latifov:ab0168225@mongodbdars1.ggakb.mongodb.net/instagram'

async function client (){
    const dbclient = await mongoose.connect(url, {
        useNewUrlParser: true,
        useUnifiedTopology: true,
        useFindAndModify: false,
        useCreateIndex: true
    });
    return dbclient

    
}

module.exports = client
