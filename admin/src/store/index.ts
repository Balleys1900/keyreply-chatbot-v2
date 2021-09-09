import { createStore } from 'vuex';
import auth from './modules/auth';
import chatbot from './modules/chatbot';
import userChatbot from './modules/userChatbot';
export default createStore({
  modules: {
    auth,
    chatbot,
    userChatbot
  }
});
