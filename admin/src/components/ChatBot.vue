<template>
  <div class="chat-bot">
    <div class="action">
      <el-button type="primary" size="small" @click="openModal">
        <i class="el-icon-edit"></i> Add
      </el-button>
      <chat-bot-modal
        ref="chatFormModal"
        @handleClose="handleClose"
        :editName="editName"
        :editMode="editMode"
      />
    </div>

    <div class="table" v-if="tableData">
      <el-tabs v-model="activeName">
        <el-tab-pane
          v-for="(item, index) in langSetting"
          :label="item.toUpperCase()"
          :name="item"
          :key="index"
        >
          <chat-bot-table :tableData="tableData" :lang="item" />
        </el-tab-pane>
      </el-tabs>
    </div>
  </div>
</template>

<script lang="ts">
import ChatBotTable from './ChatBotTable.vue';
import ChatBotModal from './ChatBotModal.vue';

import { computed, defineComponent, onMounted, ref, watch } from '@vue/runtime-core';
import { useQuery, useResult } from '@vue/apollo-composable';
import { getAll } from '../graphql/queries';
import { useStore } from 'vuex';
import { ChatNode } from '../types/chatbot.interface';

export default defineComponent({
  components: { ChatBotTable, ChatBotModal },
  setup() {
    const store = useStore();
    const dialogVisible = ref(false);
    const langSetting = ['vi', 'en'];
    const activeName = ref('vi');

    const { result, loading } = useQuery(getAll);
    const setChatbotData = (payload: ChatNode[]) =>
      store.commit('chatbot/SET_CHATBOT_DATA', payload);

    const setEditName = (payload: string) => store.commit('chatbot/SET_EDIT_NAME', payload);

    const tableData = computed(() => store.getters['chatbot/getChatbotData']);

    const editName = computed(() => store.getters['chatbot/getEditName']);

    const editMode = ref(false);

    watch(editName, (value) => {
      if (value.length == 0) {
        editMode.value = false;
      } else {
        editMode.value = true;
      }
    });

    watch(result, (value) => {
      setChatbotData(value.getAll[0].content);
    });

    return {
      dialogVisible,
      activeName,
      tableData,
      loading,
      langSetting,
      editName,
      editMode,
      setEditName
    };
  },
  methods: {
    openModal() {
      (this.$refs.chatFormModal as any).open();
    },
    handleClose() {
      (this.$refs.chatFormModal as any).close();
      this.setEditName('');
    }
  },
  watch: {
    editName(value) {
      if (value.length > 0) {
        this.openModal();
        this.editMode = true;
      }
    }
  }
});
</script>

<style lang="scss" scoped>
i {
  margin-right: 5px;
}

.table {
  margin-top: 20px;
}
</style>
