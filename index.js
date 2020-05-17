require('dotenv').config()

const { ApolloServer } = require ('apollo-server-lambda')
const { typeDefs } = require('./schemas')
const MongoDB =  require('./MongoDB')
const mongoDB = new MongoDB()

// This mapping tells ApolloServer where to get the data from. This should match the schema.
const resolvers = {
    Query: {
        getChords: async () => {
            const chords = await mongoDB.getChords()
            return chords
        }
    },
    
    Mutation: {
        addChord: async (_, { root, quality, strings, fingersPosition }) => {
            const newChord = await mongoDB.addChord(root, quality, strings, fingersPosition)
            return newChord
        }
    }
}

// The ApolloServer constructor requires two parameters: 
// your schema definition and your set of resolvers.
const server = new ApolloServer({ typeDefs, resolvers })

// The `listen` method launches a web server.
// server.listen().then( async ({url}) => {
//     console.log(`🚀 ApolloServer running in ${url}`)
// }).catch(console.error)


exports.grahpqlHandler = server.createHandler()

