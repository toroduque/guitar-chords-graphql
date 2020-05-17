const { gql } = require('apollo-server-lambda')

const typeDefs = gql`
    # This is how you write a comment on a Schema. It will start with a hash char.
    # This Book: type defines the queryable fields for every book in our database

    type Chord {
        _id: ID
        root: String
        quality: String
        strings: String
        fingersPosition: String
    }

    # The Query type is special: it lists all of the avaliable queries that
    # clients can execute, along with the return type for each.
    # In this case, the books query returns an array of zero or more Book

    type Query {
        getChords: [Chord]
    }

    type Mutation {
        addChord(root: String!, quality: String!, strings: String!, fingersPosition: String!): Chord
    }
`

module.exports = {
    typeDefs
}