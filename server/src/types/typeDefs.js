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
        name:String,
        language:[Language],
        text: String
        buttons:[Button],
        regex:String,
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
        conditions:[ConditionInput]
        text:String
        regex:String
    }
    
    input NodeInput {
       name:String
       language:[LanguageInput]
       text: String,
       regex: String,
       buttons:[ButtonInput]
    }
    
    input ContentInput {
    content:[NodeInput]
    }
    
    type Notification {
    message: String
  }

  type Query {
    getContentById(id: ID): Content
    getAll: [Content]
  }

  type Mutation {
    createContent(dto: NodeInput): Content
<<<<<<< HEAD
    updateContent(id: ID, content: NodeInput): Content
    deleteContent(name: String): Notification
  }
=======
    updateContent(idContent: String ,updatedContent: ContentInput): Content
    deleteContent(idContent: String,name:String): Notification
    }
>>>>>>> f76525a77cd664d294fa7c98f05bd19f69b7a738
`;

module.exports = typeDefs;
