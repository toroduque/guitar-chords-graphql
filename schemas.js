const { gql } = require('apollo-server-lambda')

const typeDefs = gql`
    # This is how you write a comment on a Schema. It will start with a hash char.
    # This Book: type defines the queryable fields for every book in our database

    type Chord {
        root: String
        quality: String
        position: Position
    }

    type Position {
        E: StringPosition
        A: StringPosition
        D: StringPosition
        G: StringPosition
        B: StringPosition
        e: StringPosition
    }

    type StringPosition {
        fret: Int
        finger: Int
    }

    input StringPositionInput {
        fret: Int
        finger: Int
    }

    input PositionInput {
        E: StringPositionInput
        A: StringPositionInput
        D: StringPositionInput
        G: StringPositionInput
        B: StringPositionInput
        e: StringPositionInput
    }

    # The Query type is special: it lists all of the avaliable queries that
    # clients can execute, along with the return type for each.
    # In this case, the books query returns an array of zero or more Book

    type Query {
        getChords: [Chord]
    }

    type Mutation {
        addChord(root: String!, quality: String!, position: PositionInput!): Chord
    }
`

module.exports = {
    typeDefs
}