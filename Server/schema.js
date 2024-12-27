const graphql = require('graphql')
const {GraphQLObjectType,GraphQLString,GraphQLSchema,GraphQLInt,GraphQLList,GraphQLID,GraphQLNonNull} = graphql;
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
            async resolve (parent,args){
                const a = await Author.find({_id:parent.authorId});
                return a[0];
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
            async resolve(parent,args){                
                const a = await Book.find({_id:args._id});
                return a[0];
            }
        },
        authors:{
            type: AuthorType,
            args:{_id:{type:GraphQLID}},
            resolve(parent,args){
                const a = Author.find({_id:parent._id});
                return a[0];
            }
        },
        allBooks:{
            type: new GraphQLList(BookType),
            resolve(parent,args){
                return Book.find({});
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
            _id: {type: new GraphQLNonNull(GraphQLID)},
            authorName:{type:new GraphQLNonNull(GraphQLString)},
            age:{type:new GraphQLNonNull(GraphQLInt)},
        },
        resolve(parent,args){
            let author = new Author({
                _id: args._id,
                authorName:args.authorName,
                age:args.age
            })
            return author.save();
            }
        },
        addBook: {
            type: BookType,
            args: {
                _id: {type: new GraphQLNonNull(GraphQLID)},
                name: { type: new GraphQLNonNull(GraphQLString) },
                genre: { type: new GraphQLNonNull(GraphQLString) },
                authorId: { type: new GraphQLNonNull(GraphQLInt) }
            },
            resolve(parent, args) {
                let book = new Book({
                    _id: args._id,
                    name: args.name,      
                    genre: args.genre,    
                    authorId: args.authorId
                });

                return book.save();
            }
        }
    }
});

module.exports = new GraphQLSchema({
    query:BookQuery,
    mutation:Mutation
})