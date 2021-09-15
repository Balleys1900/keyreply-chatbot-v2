const { gql } = require('apollo-server-express');

const typeDefs = gql`
  type Content {
      content: [Node]
  }
  
  type Node {
    name: String
    text: String
    thumb: String
    price: String
    sub_text: String  
    buttons: [Button]
    condition:[Condition]  
    regex: String
  }

  type Button {
      text: String
      event: String
      data: String
  }

  type Condition {
      property: String
      value: String
      operator: String
  }
  
  
  input ButtonInput {
    text: String
    event: String
    data: String
  }

  input ConditionInput {
    property: String
    lang: String
    operator: String
  }
  
  input NodeInput {
    name: String
    text: String
    thumb: String
    price: String
    sub_text: String
    buttons: [ButtonInput]
    condition:[ConditionInput]
    regex: String
  }

  input ContentInput {
    content: [NodeInput]
  }
  
  type Query {
    getContentById(id: ID): Content
    getAll: [Content]
    }
    
    type Mutation {
    createContent(idContent:String, dto: NodeInput): Content
    updateContent(idContent: String ,updatedNode: NodeInput): Content
    deleteContent(idContent: String,name:String): Content
    }
`;

module.exports = typeDefs;
