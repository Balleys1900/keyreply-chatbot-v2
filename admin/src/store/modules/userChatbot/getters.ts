interface State {
  curUserActive: number;
  users: [];
  chatbotHistory: [];
  chatAdminHistory: [];
}

export default {
  getCurUserActive(state: State) {
    return state.curUserActive;
  },
  getUsers(state: State) {
    return state.users;
  },
  getChatbotHistory(state: State) {
    return state.chatbotHistory;
  },
  getChatAdminHistory(state: State) {
    return state.chatAdminHistory;
  }
};
