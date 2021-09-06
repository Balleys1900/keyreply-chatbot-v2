const Content = require('../models/Content');
const resolvers = {
  Query: {
    getContentById: async (_parent, { id }, _context, _info) => {
      console.log(id);
      return Content.findById(id);
    },
    getAll: async () => {
      return Content.find();
    },
  },

  Mutation: {
    createContent: async (parent, args, context, info) => {
      console.log(args);
      const { name, language } = args.dto;
      const result = await Content.findByIdAndUpdate(
        '6135b8f2dd9586658d37df64',
        {
          $push: {
            content: {
              name: name,
              language: language,
            },
          },
        },
        { new: true, safe: true, upsert: true }
      );
      return result;
    },

    updateContent: async (parent, { idContent, updatedContent }, context, info) => {
      return Content.findByIdAndUpdate(idContent, { ...updatedContent }, { new: true });
    },

    deleteContent: async (parent, { idContent, name }, context, info) => {
      const record = await Content.findOne({ id: idContent });
      const updatedContent = record.content.filter((item) => item.name !== name);
      await Content.updateMany({ id: idContent }, { content: updatedContent });
      return {
        message: 'Delete Content Successfully!',
      };
    },
  },
};

module.exports = resolvers;
