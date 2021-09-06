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
        lang:String
        buttons:[Button]
        conditions:[Condition]
        text:String
        regex:String
    }
    
    type Node {
    id:String,
    language:[Language],
    }
   
    type Content {
        content:[Node]
        version:String
        description:String
    }
    
    
    input ButtonInput {
        text: String
        event:String
        data:String
    }
    
    input ConditionInput {
        property:String
        lang:String
        operator:String
    }
    
    input LanguageInput {
        lang:String
        buttons:[ButtonInput]
        text:String
    }
    
    input NodeInput {
       id:String
       language:[LanguageInput]
    }
    
    input ContentInput {
       content:[NodeInput]
       version:String
       description:String
    }
    
    type Notification {
    message: String
    }
    
    type Query{
    getContentById(id: ID): Content
    getAll: [Content]
    }
    
    type Mutation {
    createContent(dto: ContentInput): Content
    updateContent(id:ID ,content: ContentInput): Content
    deleteContent(id:ID ): Notification
    }
`;

module.exports = typeDefs;