const Content = require('../models/Content');
const resolvers = {
    Query: {
        getContentById: async (_paren, {id}, _context, _info) => {
            return Content.findById(id);
        },
    },

    Mutation: {
        createContent: async (parent,args, context, info ) =>{
            const { name, language } = args.content;
            const content = new Content({name, language })
            await content.save();
            return content;
        },

        updateContent: (parent,{id, content}, context, info ) => {
           return Content.findByIdAndUpdate(id, {...content}, {new: true});
        },

        deleteContent: async (parent,{id}, context, info ) => {
            await Content.findByIdAndDelete(id);
            return {
                message:"Delete Content Successfully!"
            }
        }

    }
};

module.exports = resolvers;