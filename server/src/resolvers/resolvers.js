const Content = require('../models/Content');
const { UserInputError, InternalServerError }  = require('apollo-server');

const resolvers = {
  Query: {
    getContentById: async (_parent, {id}, _context, _info) => {
      const result = await Content.findById(id);
      return result;
    },
    getAll: async () => {
      const result = await Content.find();
      return result;
    }
  },
  Mutation: {
    createContent: async (parent,{idContent, dto}, context, info ) =>{
      const data = await Content.findById(idContent);
      const isExistName = data.content.filter(item => item.name === dto.name);
      if(isExistName.length) {
        return new UserInputError('Name is exist');
      }
      await Content.updateMany({ idContent }, {$push:{ content:{...dto}}});
      return Content.findById(idContent);
    },

    updateContent: async (parent,{idContent, updatedNode}, context, info ) => {
      const record = await Content.findById(idContent);
      let isExistName = false;
      let arrContent = [];
      record.content.map(async node => {
        if (node.name === updatedNode.name) {
          isExistName = true;
          node = {...updatedNode};
          console.log('node',node);
          arrContent.push(node);
        }else {
          arrContent.push(node);
        }
      });
      console.log(arrContent);
      if(isExistName === false){
        throw new UserInputError('Name of node must be unique!!!');
      }
      return Content.findByIdAndUpdate(idContent, {content: arrContent}, {new: true});
    },

    deleteContent: async (parent,{idContent,name}, context, info ) => {
      const record = await Content.findOne({idContent});
      const updatedContent = record.content.filter(item => item.name !== name);
      await Content.updateMany({id: idContent}, {content: updatedContent});
      return Content.findOne({idContent});
    }
  }
};

module.exports = resolvers;
