const Content = require('../models/Content');
const resolvers = {
    Query: {
        getContentById: async (_parent, {id}, _context, _info) => {
            console.log(id);
            return Content.findById(id);
        },
        getAll: async () => {
            return Content.find();
        }
    },

    Mutation: {
        createContent: async (parent,args, context, info ) =>{
            const {name, language} = args.dto;
            const result = await Content.findByIdAndUpdate('6135b8f2dd9586658d37df64', {
                $push: {
                    content: {
                        name: name,
                        language: language,
                    }
                }
            }, {new: true, safe: true, upsert: true});
            return result;
        },

        updateContent: (parent,{id, content}, context, info ) => {
           return Content.findByIdAndUpdate(id, {...content}, {new: true});
        },

        deleteContent: async (parent,args, context, info ) => {
            const result = await Content.findOne({id:'6135b8f2dd9586658d37df64'});
            const name = args.name;
            // console.log(name);
            const new_arr = result.content.filter(item => item.name !== name);
            // console.log(new_arr);
            // await Content.create({
            //     content: new_arr,
            //     version:'1232131',
            // })
            // Content.findOneAndUpdate({id:'6135b8f2dd9586658d37df64'}, {$pop: {content:{name:"abc"}}})
            // Content.findOneAndUpdate({id:'6135b8f2dd9586658d37df64'},{$pop: {content : new_arr}});
            // const result = await Content.findByIdAndUpdate('6135b8f2dd9586658d37df64', {
            //     $pop: {
            //         content: {
            //            ...new_arr
            //             // name: 'Conversation_Hello1',
            //         }
            //     }
            // }, {new: true, safe: true, upsert: true});

            // console.log(result.content);
            // let position = -1;
            // for (const nameInContent of result.content) {
            //     position+=1;
            //     if(nameInContent.name === name){
            //         console.log(position);
            //         result.content.remove();
            //     }
            // }
            // console.log(result.content[6]);
            // await Content.findByIdAndDelete(id);
            return {
                message:"Delete Content Successfully!"
            }
        }

    }
};

module.exports = resolvers;