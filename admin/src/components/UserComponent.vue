<template>
  <el-container>
    <el-aside>
      <el-scrollbar max-height="400px">
        <div
          class="user"
          v-for="user in listUsers"
          :key="user.id"
          @click="handleUserActive(user.id)"
          :class="{
            isActive: user.id === getCurUser
          }"
        >
          <div class="name-user">{{ user.username }}</div>
          <div class="status">Status</div>
        </div>
      </el-scrollbar>
    </el-aside>
    <el-container class="container">
      <el-header>
        <div class="currentUser">
          <div class="name-user">Welcome to User{{ curHistory.id }}</div>
          <el-icon class="el-icon-more"></el-icon>
        </div>
      </el-header>
      <el-main v-for="chat in curHistory.history" :key="chat.id">
        <div
          :class="{
            isUser: chat.id === 'is-user',
            isAdmin: chat.id === 'is-admin'
          }"
        >
          <el-icon v-if="chat.id === 'is-user'" class="el-icon-user" color="#409EFC"> </el-icon>
          <el-icon v-else class="el-icon-user-solid" color="#409EFC"> </el-icon>
          <div class="text">{{ chat.text }}</div>
        </div>
      </el-main>
      <el-footer>
        <div class="form-input">
          <input
            type="text"
            name=""
            id=""
            class="input-text"
            placeholder="Send something to User"
            required
          />
          <button class="btn-send">Send</button>
        </div>
      </el-footer>
    </el-container>
  </el-container>
</template>

<script lang="ts">
import { computed, defineComponent, watch, reactive } from '@vue/runtime-core';
import { useStore } from 'vuex';
export default defineComponent({
  setup() {
    const store = useStore();

    const getUsersAndHistory = () => {
      store.dispatch('userChatbot/getListUser');
      store.dispatch('userChatbot/getChatAdminHistory');
    };
    getUsersAndHistory();

    const listUsers = computed(() => store.getters['userChatbot/getUsers']);
    const listHistory = computed(() => store.getters['userChatbot/getChatAdminHistory']);

    const setCurrentUser = (payload: any) =>
      store.commit('userChatbot/SET_CUR_USER_ACTIVE', payload);

    setCurrentUser(1);

    const getCurUser = computed(() => store.getters['userChatbot/getCurUserActive']);

    // console.log(listHistory.value);

    const curHistory = computed(() => {
      return listHistory.value.find((his: any) => his.id === getCurUser.value);
    });

    // watch(getCurUser, (value) => {
    // });

    const handleUserActive = (payload: any) => {
      setCurrentUser(payload);
    };
    return { listUsers, handleUserActive, getCurUser, curHistory };
  }
});
</script>

<style scoped>
.el-header,
.el-footer {
  border-radius: 20px;
}
.el-header {
  border-bottom: 1px solid #d3dce6;
}
.el-footer {
  height: 50px;
}

.el-aside {
  width: 20%;
  margin: 60px auto;
  max-height: 50vh;
  border-radius: 20px;
  background-color: #fafafa;
}
.el-container {
  min-height: 88vh;
}
.container {
  border-radius: 20px;
}

.el-main {
  color: var(--el-text-color-primary);
  text-align: center;
  border-radius: 20px;
}

.el-icon {
  font-size: 20px;
}

.user {
  display: flex;
  justify-content: space-between;
  line-height: 30px;
  padding: 20px;
  border-radius: 20px;
  border-bottom: 1px solid #d3dce6;
}

.user:hover {
  background-color: #d3dce6;
  cursor: pointer;
}
.isActive {
  background-color: #409eff;
}

.currentUser {
  display: flex;
  justify-content: space-between;
  align-items: center;
  line-height: 40px;
  margin: 0 20px;
}

.form-input {
  width: 100%;
  height: 100%;
}

.input-text {
  width: 80%;
  height: 100%;
  border-radius: 20px;
  font-size: 20px;
  padding-left: 20px;
}

.input-text:focus-visible {
  outline: none;
}

.btn-send {
  width: 20%;
  height: 100%;
  border-radius: 20px;
  font-size: 20px;
}
.btn-send:hover {
  background-color: #67c23a;
  cursor: pointer;
}

.isAdmin {
  display: flex;
  gap: 20px;
  flex-direction: row-reverse;
  margin-bottom: 10px;
  align-items: center;
}
.isAdmin .text {
  background: #409eff;
  padding: 10px;
  border-radius: 20px;
}
.isUser {
  gap: 20px;
  display: flex;
  margin-bottom: 10px;
  align-items: center;
  /* justify-content: flex-end; */
}
.isUser .text {
  background-color: #ddd;
  padding: 10px;
  border-radius: 20px;
}
</style>
