const Content = require('../models/Content');
const { UserInputError, InternalServerError }  = require('apollo-server');
const covertButtondata  = require('../utils/covertButtondata');
const resolvers = {
  Query: {
    getContentById: async (_parent, {id}, _context, _info) => {
      const result = await Content.findById(id);
      return covertButtondata(result);
    },
    getAll: async () => {
      const result = await Content.find();
      return covertButtondata(result[0].content);
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

    updateContent: async (parent,{idContent, updatedContent}, context, info ) => {
      return Content.findByIdAndUpdate(idContent, {...updatedContent}, {new: true});
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
