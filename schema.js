const graphql = require('graphql')
const {GraphQLObjectType,GraphQLString,GraphQLSchema,GraphQLInt,GraphQLList,GraphQLID} = graphql;
const _ = require('lodash');
const Author = require('./modules/Author')
const Book = require("./modules/Book")

const AuthorType = new GraphQLObjectType({
    name : "Author",
    fields : ()=>({
        _id:{type :GraphQLID},
        authorName:{type :GraphQLString},
        age:{type:GraphQLInt},
        books:{
            type:new graphql.GraphQLList(BookType),
            resolve(parent,args){
                return Book.filter({authorId: parent._id}) 
            }
        }
    })
})

const BookType = new GraphQLObjectType({
    name : "Book",
    fields : ()=>({
        _id:{type :GraphQLID},
        name:{type :GraphQLString},
        genre:{type:GraphQLString},
        authorId:{type:GraphQLInt},
        author:{
            type:AuthorType,
            resolve(parent,args){
                return Author.find({_id:parent.authorId});
            }
        }
    })
})


const BookQuery = new GraphQLObjectType({
    name:"BookQuery",
    fields : {
        books:{
            type: BookType,
            args:{_id:{type:GraphQLID}},
            resolve(parent,args){
                return Book.find({_id:args._id});
            }
        },
        author:{
            type: AuthorType,
            args:{_id:{type:GraphQLID}},
            resolve(parent,args){
                return Author.find({_id:parent._id});
            }
        },
    }
})

const Mutation = new GraphQLObjectType({
    name:'Mutation',
    fields:{
    addAuthor:{
        type:AuthorType,

        args:{
            _id: {type: GraphQLID},
            authorName:{type:GraphQLString},
            age:{type:GraphQLInt},
        },
        resolve(parent,args){
            let author = new Author({
                _id: args._id,
                authorName:args.authorName,
                age:args.age
            })
            author.save();
            }
        },
        addBook: {
            type: BookType,
            args: {
                _id: {type: GraphQLID},
                name: { type: GraphQLString },
                genre: { type: GraphQLString },
                authorId: { type: GraphQLInt }
            },
            resolve(parent, args) {
                let books = new Book({
                    _id: args._id,
                    name: args.name,      
                    genre: args.genre,    
                    authorId: args.authorId
                });

                books.save();
            }
        }
    }
});

module.exports = new GraphQLSchema({
    query:BookQuery,
    mutation:Mutation
})