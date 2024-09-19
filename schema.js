const graphql = require('graphql')
const {GraphQLObjectType,GraphQLString,GraphQLSchema,GraphQLInt,GraphQLList} = graphql;
const _ = require('lodash');
const Author = require('./modules/Author')
const Book = require("./modules/Book")

const BookType = new GraphQLObjectType({
    name : "Book",
    fields : ()=>({
        id:{type :GraphQLInt},
        name:{type :GraphQLString},
        genre:{type:GraphQLString},
        authorId:{type:GraphQLString},
        author:{
            type:AuthorType,
            resolve(parents,args){
                return Author.find({id:parents.authorId});
            }
        }
    })
})
const AuthorType = new GraphQLObjectType({
    name : "Author",
    fields : ()=>({
        id:{type :GraphQLInt},
        authorName:{type :GraphQLString},
        age:{type:GraphQLInt},
        books:{
            type:new graphql.GraphQLList(BookType),
            resolve(parents,args){
                return Book.filter({authorId: parents.id}) 
            }
        }
    })
})

const BookQuery = new GraphQLObjectType({
    name:"BookQuery",
    fields : {
        books:{
            type: BookType,
            args:{id:{type:GraphQLInt}},
            resolve(parents,args){
                return Book.find({id:args.id});
            }
        },
        author:{
            type: AuthorType,
            args:{id:{type:GraphQLInt}},
            resolve(parents,args){
                return Author.find({id:parents.id});
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
            authorName:{type:GraphQLString},
            age:{type:GraphQLInt},
        },
        resolve(parents,args){
            let author = new Author({
                authorName:args.authorName,
                age:args.age
            })
            author.save();
            }
        },
        addBook: {
            type: BookType,
            args: {
                name: { type: GraphQLString },
                genre: { type: GraphQLString },
                authorId: { type: GraphQLString }
            },
            resolve(parent, args) {
                let books = new Book({
                    name: args.name,      
                    genre: args.genre,    
                    authorId: args.authorId
                });

                return books.save()
            }
        }
    }
});

module.exports = new GraphQLSchema({
    query:BookQuery,
    mutation:Mutation
})