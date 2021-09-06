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
      const { content, version, description } = args.dto;
      const dto = new Content({ content, version, description });
      await dto.save();
      return dto;
    },

    updateContent: (parent, { id, content }, context, info) => {
      return Content.findByIdAndUpdate(id, { ...content }, { new: true });
    },

    deleteContent: async (parent, { id }, context, info) => {
      await Content.findByIdAndDelete(id);
      return {
        message: 'Delete Content Successfully!',
      };
    },
  },
};

module.exports = resolvers;
