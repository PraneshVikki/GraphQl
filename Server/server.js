const express = require('express');
const mongoose = require('mongoose')
const { graphqlHTTP } = require('express-graphql');
const app = express();
const schema = require('./schema');
const cors = require('cors');

app.use(cors());

app.use('/graphql',graphqlHTTP({
schema,
graphiql:true
}))

mongoose.connect('mongodb://localhost:27017/newGraphQL').then(console.log("Server is connected"))

app.listen(4000,()=>{
    console.log("server is running on 4000")
})