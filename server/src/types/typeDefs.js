const { gql } = require('apollo-server-express');

const typeDefs = gql`
    type Button {
        text: String
        event:String
        data:String
    }
    
    type Condition {
        property:String
        value:String
        operator:String
    }
    
     type Language {
        value:String
        buttons:[Button]
        conditions:[Condition]
        text:String
        regex:String
    }
   
    type Content {
        id: ID
        name:String
        language:[Language]
    }
    
    
    input ButtonInput {
        text: String
        event:String
        data:String
    }
    
    input ConditionInput {
        property:String
        value:String
        operator:String
    }
    
    input LanguageInput {
        value:String
        buttons:[ButtonInput]
        conditions:[ConditionInput]
        text:String
        regex:String
    }
    
    input ContentInput {
        id: ID
        name:String
        language:[LanguageInput]
    }
    
    type Query{
    getContentByName(name: String): Content
    }
    
    type Mutation {
    createContent(content: ContentInput): Content
    }
`;

module.exports = typeDefs;