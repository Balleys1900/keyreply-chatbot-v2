const Content = require('../models/Content');
const resolvers = {
    Query: {
        getContentByName: async (_paren, {name}, _context, _info) => {
            return Content.findOne({name});
        },
    },

    Mutation: {
        createContent: async (parent,args, context, info ) =>{
            const { name, language } = args.content;
            const content = new Content({name, language })
            await content.save();
            return content;
        }

    }
};

module.exports = resolvers;