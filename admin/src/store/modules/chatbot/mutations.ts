export default {
  SET_CHATBOT_DATA(state: any, payload: any) {
    state.chatbotData = payload;
  },
  SET_EDIT_NAME(state: any, payload: any) {
    state.editName = payload;
  },
  UPDATE_CHATBOT_DATA(state: any, payload: any) {
    const chatbotData = [...state.chatbotData];

    console.log(chatbotData);

    const newChatbotData = chatbotData.map((item: any) => {
      if (item.name === payload.name) {
        item = { ...item, language: payload.language };
      }
      return item;
    });

    state.chatbotData = newChatbotData;
  }
};
