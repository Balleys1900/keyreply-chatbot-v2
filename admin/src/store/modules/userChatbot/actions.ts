export default {
  getListUser({ commit }: { commit: any }, payload?: any) {
    const listUser = [
      { id: 1, username: 'Dash' },
      { id: 2, username: 'Lost' },
      { id: 3, username: 'Hash' },
      { id: 4, username: 'Final' }
    ];
    commit('SET_USERS', listUser);
  },
  getChatAdminHistory({ commit }: { commit: any }, payload?: any) {
    const chatAdminHistory = [
      {
        id: 1,
        history: [
          { id: 'is-user', text: 'Dash start chat' },
          { id: 'is-admin', text: 'Admin reply 1' },
          { id: 'is-user', text: 'Dash start chat again 2' },
          { id: 'is-admin', text: 'Admin reply 2' },
          { id: 'is-user', text: 'Dash start chat again again 3' },
          { id: 'is-admin', text: 'Admin reply 3' }
        ]
      },
      {
        id: 2,
        history: [
          { id: 'is-user', text: 'Lost start chat' },
          { id: 'is-admin', text: 'Admin reply 1' },
          { id: 'is-user', text: 'Lost start chat again 2' },
          { id: 'is-admin', text: 'Admin reply 2' },
          { id: 'is-user', text: 'Lost start chat again again 3' },
          { id: 'is-admin', text: 'Admin reply 3' }
        ]
      },
      {
        id: 3,
        history: [
          { id: 'is-user', text: 'Hash start chat' },
          { id: 'is-admin', text: 'Admin reply 1' },
          { id: 'is-user', text: 'Hash start chat again 2' },
          { id: 'is-admin', text: 'Admin reply 2' },
          { id: 'is-user', text: 'Hash start chat again again 3' },
          { id: 'is-admin', text: 'Admin reply 3' }
        ]
      },
      {
        id: 4,
        history: [
          { id: 'is-user', text: 'Final start chat' },
          { id: 'is-admin', text: 'Admin reply 1' },
          { id: 'is-user', text: 'Final start chat again 2' },
          { id: 'is-admin', text: 'Admin reply 2' },
          { id: 'is-user', text: 'Final start chat again again 3' },
          { id: 'is-admin', text: 'Admin reply 3' }
        ]
      }
    ];
    commit('SET_CHATADMIN_HISTORY', chatAdminHistory);
  }
};
