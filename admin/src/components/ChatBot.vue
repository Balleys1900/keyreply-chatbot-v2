<template>
  <div class="chat-bot">
    <div class="action">
      <el-button type="primary" size="small" @click="openModal">
        <i class="el-icon-edit"></i> Add
      </el-button>
      <chat-bot-modal ref="chatFormModal" />
    </div>

    <div class="table">
      <chat-bot-table />
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent, ref } from '@vue/runtime-core';
import ChatBotModal from './ChatBotModal.vue';
import ChatBotTable from './ChatBotTable.vue';

export default defineComponent({
  components: { ChatBotTable, ChatBotModal },
  setup() {
    const dialogVisible = ref(false);

    return {
      dialogVisible
    };
  },
  methods: {
    openModal() {
      (this.$refs.chatFormModal as any).open();
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
