const { ApolloServer } = require ('apollo-server-lambda')
const { typeDefs } = require('./schemas')
const MongoDB =  require('./MongoDB')

// This mapping tells ApolloServer where to get the data from. This should match the schema.
const resolvers = {
    Query: {
        getChords: async (_, __, { dataSources }) => {
            const { db } = dataSources
            const chords = await db.getChords()
            return chords
         }
    },
    
    Mutation: {
        addChord: async (_, { root, quality, strings, fingersPosition }, { dataSources }) => {
            const { db } = dataSources
            const newChord = await db.addChord(root, quality, strings, fingersPosition)
            return newChord
        }
    }
}

// The ApolloServer constructor requires two parameters: 
// your schema definition and your set of resolvers.
const server = new ApolloServer({ 
    typeDefs, 
    resolvers, 
    dataSources: () => ({ db: new MongoDB() }) 
});

exports.graphqlHandler = server.createHandler()
