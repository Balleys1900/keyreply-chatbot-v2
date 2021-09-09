<template>
  <el-dialog
    title="Create new chat"
    v-model="dialogVisibleLocal"
    width="65%"
    :before-close="onModalClose"
    :destroy-on-close="true"
  >
    <el-form label-position="top">
      <el-form-item label="Chat Name" prop="name">
        <el-input
          v-model="chatNameInput"
          :value="chatName"
          :disabled="editMode"
          placeholder="Ex: conversation_start..."
        ></el-input>
      </el-form-item>
    </el-form>

    <el-tabs v-model="activeName">
      <el-tab-pane label="VI" name="vi">
        <chat-bot-form
          :lang="'vi'"
          ref="viForm"
          :chatNode="chatNodeEditData"
          :editMode="editMode"
        />
      </el-tab-pane>

      <el-tab-pane label="ENG" name="eng">
        <chat-bot-form
          :lang="'en'"
          ref="engForm"
          :chatNode="chatNodeEditData"
          :editMode="editMode"
        />
      </el-tab-pane>
    </el-tabs>

    <template #footer>
      <span class="dialog-footer">
        <el-button type="primary" @click="handleSubmitForm">{{
          editMode ? 'Edit' : 'Confirm'
        }}</el-button>
      </span>
    </template>
  </el-dialog>
</template>

<script lang="ts">
import { useMutation } from '@vue/apollo-composable';
import { createNodeQuery } from '../graphql/mutations';
import { computed, defineComponent, ref } from 'vue';
import ChatBotForm from './ChatBotForm.vue';
import { ElMessage } from 'element-plus';
import { ChatNode } from '../types/chatbot.interface';
import { useStore } from 'vuex';
import recordID from '../constants/database_record_id';

export default defineComponent({
  components: { ChatBotForm },
  props: ['editMode', 'editName'],
  emits: ['handleClose'],
  setup(props, { emit }) {
    const store = useStore();

    /**
     * @params : createContentDto (Object reccive from ChatBotFrom)
     */
    const { mutate: createNode } = useMutation(createNodeQuery);

    const dialogVisibleLocal = ref(false);

    const activeName = ref('vi');

    const chatNameInput = ref('');

    const chatName = computed(() => {
      if (props.editName.length > 0) {
        return props.editName;
      }
      return chatNameInput;
    });

    const chatNodeEditData = computed(() => store.getters['chatbot/getChatNodeEditData']);

    const open = () => {
      dialogVisibleLocal.value = true;
    };

    const close = () => {
      dialogVisibleLocal.value = false;
      chatNameInput.value = '';
    };

    const setChatbotData = (payload: ChatNode[]) =>
      store.commit('chatbot/SET_CHATBOT_DATA', payload);

    const updateChatbotData = (payload: any) =>
      store.commit('chatbot/UPDATE_CHATBOT_DATA', payload);

    const onModalClose = () => {
      emit('handleClose');
    };

    return {
      dialogVisibleLocal,
      activeName,
      open,
      close,
      createNode,
      chatNameInput,
      chatName,
      setChatbotData,
      updateChatbotData,
      onModalClose,
      chatNodeEditData
    };
  },
  methods: {
    handleSubmitForm() {
      const enFormValues = (this.$refs.engForm as any).submitForm('formChatBot');
      const viFormValues = (this.$refs.viForm as any).submitForm('formChatBot');

      console.log(viFormValues);

      if (enFormValues && viFormValues) {
        const data = {
          name: this.chatName.value,
          language: [viFormValues, enFormValues]
        };

        if (!this.editMode) {
          this.createNode({
            createContentDto: data,
            createContentIdContent: recordID
          })
            .then((res: any) => {
              this.handleResetForm();
              const newChatData: ChatNode[] = res?.data.createContent.content;
              this.setChatbotData(newChatData);
              ElMessage.success('Created data success');
            })
            .catch((err) => {
              ElMessage.error(err.message);
            });
        } else {
          this.updateChatbotData({ name: this.chatName, language: data.language });
          this.handleResetForm();
        }
      } else {
        ElMessage.error('Please fill all fields');
      }
    },
    handleResetForm() {
      this.chatName = '';
      this.dialogVisibleLocal = false;
      (this.$refs.engForm as any).resetForm('formChatBot');
      (this.$refs.viForm as any).resetForm('formChatBot');
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
