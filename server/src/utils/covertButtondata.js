function covertButtondata(chatNodes) {
    let chatNodesClone = JSON.parse(JSON.stringify(chatNodes))
    chatNodesClone.content = chatNodesClone.content.map(node => {
        node.language.map(language => {
            language.buttons.map(button => {

                if(button.event === 'capture'){
                    button.data =  JSON.parse(button.data);
                    return button;
                }
                return button;
            })
            return language;
        })
        return node;
    })
    return chatNodesClone;
}
module.exports = covertButtondata;