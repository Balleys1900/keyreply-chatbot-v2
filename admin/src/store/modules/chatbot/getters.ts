import { ChatNode } from '@/types/chatbot.interface';
interface State {
  chatbotData: [];
  editName: string;
}

export default {
  getChatbotData(state: State) {
    return state.chatbotData;
  },

  getEditName(state: State) {
    return state.editName;
  },

  getChatNodeEditData(state: State) {
    if (state.editName.length > 0) {
      const result: any = state.chatbotData.find((node: ChatNode) => node.name === state.editName);

      const resultLang = (lang: number) => {
        return {
          ...result.language[lang]
          // buttons: result.language[lang].buttons.map((button: any) => {
          //   return {
          //     ...button,
          //     data: JSON.parse(button.data)
          //   };
          // })
        };
      };

      return {
        vi: resultLang(0),
        en: resultLang(1)
      };
    }
    return null;
  }
};
