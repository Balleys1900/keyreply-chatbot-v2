export default {
  SET_CUR_USER_ACTIVE(state: any, payload: any) {
    state.curUserActive = payload;
  },
  SET_USERS(state: any, payload: any) {
    state.users = payload;
  },
  PUSH_USERS(state: any, payload: any) {
    state.users.push(payload);
  },
  SET_CHATBOT_HISTORY(state: any, payload: any) {
    state.chatbotHistory = payload;
  },
  PUSH_CHATBOT_HISTORY(state: any, payload: any) {
    state.chatbotHistory.push(payload);
  },
  SET_CHATADMIN_HISTORY(state: any, payload: any) {
    state.chatAdminHistory = payload;
  },
  PUSH_CHATADMIN_HISTORY(state: any, payload: any) {
    state.chatAdminHistory.push(payload);
  }
};
