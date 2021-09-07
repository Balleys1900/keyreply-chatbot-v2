const Content = require('../models/Content');
<<<<<<< HEAD
const { UserInputError, InternalServerError } = require('apollo-server');

=======
const { UserInputError, InternalServerError }  = require('apollo-server');
>>>>>>> dee2928368515e6bfc1e6172a4e1283b607dac8e
const resolvers = {
  Query: {
    getContentById: async (_parent, { id }, _context, _info) => {
      try {
        return Content.findById(id);
      } catch (e) {
        throw new InternalServerError('Internal server error');
      }
    },
    getAll: async () => {
      try {
        return Content.find();
      } catch (e) {
        throw new InternalServerError('Internal server error');
      }
    },
  },

  Mutation: {
    createContent: async (parent, { idContent, dto }, context, info) => {
      try {
        const data = await Content.findById(idContent);
        const isExistName = data.content.filter((item) => item.name === dto.name);
        if (isExistName.length) {
          return new UserInputError('Name is exist');
        }
<<<<<<< HEAD
        await Content.updateMany({ idContent }, { $push: { content: { ...dto } } });
        return await Content.findById(idContent);
      } catch (e) {
        throw new InternalServerError('Internal server error');
      }
    },

    updateContent: async (parent, { idContent, updatedContent }, context, info) => {
      try {
        return Content.findByIdAndUpdate(idContent, { ...updatedContent }, { new: true });
      } catch (e) {
        throw new InternalServerError('Internal server error');
      }
    },
    deleteContent: async (parent, { idContent, name }, context, info) => {
      try {
        const record = await Content.findOne({ idContent });
        const updatedContent = record.content.filter((item) => item.name !== name);
        await Content.updateMany({ id: idContent }, { content: updatedContent });
        return await Content.findOne({ idContent });
      } catch (e) {
        throw new InternalServerError('Internal server error');
      }
    },
  },
=======
      
    Mutation: {
        createContent: async (parent,{idContent, dto}, context, info ) =>{
            try {
                const data = await Content.findById(idContent);
                const isExistName = data.content.filter(item => item.name === dto.name);
                if(isExistName.length) {
                    throw new UserInputError('Name is exist');
                }
                await Content.updateMany({ idContent }, {$push:{ content:{...dto}}});
                return data;
            }catch (e) {
                throw new InternalServerError('Internal server error');
            }
        },

        updateContent: async (parent,{idContent, updatedContent}, context, info ) => {
            try {
                return Content.findByIdAndUpdate(idContent, {...updatedContent}, {new: true});
            }catch (e) {
                throw new InternalServerError('Internal server error');
            }
        deleteContent: async (parent,{idContent,name}, context, info ) => {
            try {
                const record = await Content.findOne({idContent});
                const updatedContent= record.content.filter(item => item.name !== name);
                await Content.updateMany({id: idContent}, {content: {...updatedContent}});
                return record;
            } catch (e) {
                throw new InternalServerError('Internal server error');
            }
        }
    }
>>>>>>> dee2928368515e6bfc1e6172a4e1283b607dac8e
};

module.exports = resolvers;
