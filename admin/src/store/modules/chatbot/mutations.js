export default {
  SET_CHATBOT_DATA(state, payload) {
    console.log(payload);
    state.chatbotData = payload;
  }
};
