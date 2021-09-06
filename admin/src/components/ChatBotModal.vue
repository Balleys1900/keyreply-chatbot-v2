<template>
  <el-dialog
    title="Create new chat"
    v-model="dialogVisibleLocal"
    width="65%"
    :before-close="$emit('handleClose')"
  >
    <el-tabs v-model="activeName">
      <el-tab-pane label="VI" name="vi">
        <chat-bot-form :lang="'vi'" ref="viForm" />
      </el-tab-pane>
      <el-tab-pane label="ENG" name="eng">
        <chat-bot-form :lang="'en'" ref="engForm" />
      </el-tab-pane>
    </el-tabs>

    <template #footer>
      <span class="dialog-footer">
        <el-button type="primary" @click="handleSubmitForm">Confirm</el-button>
      </span>
    </template>
  </el-dialog>
</template>

<script lang="ts">
import { useMutation } from '@vue/apollo-composable';
import { defineComponent, ref } from 'vue';
import ChatBotForm from './ChatBotForm.vue';
import { createNodeQuery } from '@/graphql/mutations';

interface ChatFormData {
  name: string;
  text: string;
  button: [];
}

export default defineComponent({
  components: { ChatBotForm },
  setup() {
    /**
     * @params : createContentDto (Object reccive from ChatBotFrom)
     */
    const { mutate: createNode } = useMutation(createNodeQuery);

    const dialogVisibleLocal = ref(false);

    const activeName = ref('vi');

    const open = () => {
      dialogVisibleLocal.value = true;
    };

    return {
      dialogVisibleLocal,
      activeName,
      open,
      createNode
    };
  },
  methods: {
    handleSubmitForm() {
      const enFormValues = (this.$refs.engForm as any).submitForm('formChatBot');
      const viFormValues = (this.$refs.viForm as any).submitForm('formChatBot');

      const data = {
        vi: viFormValues,
        eng: enFormValues
      };

      if (data) {
        this.createNode(data);
      }
    }
  }
});
</script>

<style lang="scss">
.el-dialog {
  margin-top: 10px !important;
}

.el-dialog__body {
  padding: 20px !important;
}

.chatBotModal {
  position: absolute;
  top: 10px;
}
</style>
