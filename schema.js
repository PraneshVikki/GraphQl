const graphql = require('graphql')
const {GraphQLObjectType,GraphQLString,GraphQLSchema,GraphQLInt,GraphQLList} = graphql;
const _ = require('lodash');
const Author = require('./modules/Author')
const Book = require("./modules/Book")

var books = [
    {id:1,name:"name1",genre:"genre1",authorId:1},
    {id:2,name:"name2",genre:"genre2",authorId:1},
]
var authors = [
    {id:1,authorName:"author1",age:23},
    {id:2,authorName:"author2",age:23},
]

const BookType = new GraphQLObjectType({
    name : "Book",
    fields : ()=>({
        id:{type :GraphQLInt},
        name:{type :GraphQLString},
        genre:{type:GraphQLString},
        author:{
            type:AuthorType,
            resolve(parents,args){
                return _.find(authors,{id:parents.authorId});
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
                return _.filter(books,{authorId: parents.id}) 
            }
        }
    })
})

const BookQuery = new GraphQLObjectType({
    name:"BookQuery",
    fields : {
        book:{
            type: BookType,
            args:{id:{type:GraphQLInt}},
            resolve(parents,args){
                return _.find(books,{id:args.id});
            }
        },
        author:{
            type: AuthorType,
            args:{id:{type:GraphQLInt}},
            resolve(parents,args){
                return _.find(authors,{id:parents.id});
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
        }
    }

})


module.exports = new GraphQLSchema({
    query:BookQuery,
    mutation:Mutation
})