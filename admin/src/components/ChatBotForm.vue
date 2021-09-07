<template>
  <el-form
    label-position="top"
    :model="formData"
    ref="formChatBot"
    label-width="120px"
    :rules="rules"
  >
    <el-row :gutter="10">
      <el-col :span="24">
        <el-form-item label="Chat Text" prop="text">
          <el-input v-model="formData.text" placeholder="Ex: Welcome to my store..."></el-input>
        </el-form-item>
      </el-col>
    </el-row>

    <el-row>
      <span class="form-label">Chat buttons</span>

      <el-col :span="24" class="button-group">
        <!-- Button Item -->
        <transition-group name="list">
          <div
            class="button-item list-item "
            v-for="(button, index) in formData.buttons"
            :key="index"
          >
            <div class="button-title">
              <span>Button {{ index + 1 }}</span>
              <span class="close-button" @click="deleteButton(index)">
                <i class="el-icon-close"></i>
              </span>
            </div>
            <el-form-item label="Button Text">
              <el-input v-model="button.text"></el-input>
            </el-form-item>
            <el-row :gutter="10">
              <el-col :span="12">
                <el-form-item label="Button Event">
                  <el-select
                    v-model="button.event"
                    placeholder="Select button event..."
                    style="width:100%"
                  >
                    <el-option
                      v-for="item in buttonEvents"
                      :key="item.value"
                      :label="item.label"
                      :value="item.value"
                    >
                    </el-option>
                  </el-select>
                </el-form-item>
              </el-col>

              <el-col :span="12">
                <el-form-item label="Button Data">
                  <el-select
                    v-model="button.data"
                    placeholder="Select button data..."
                    style="width:100%"
                  >
                    <el-option
                      v-for="item in nodeDatas"
                      :key="item.value"
                      :label="item.label"
                      :value="item.value"
                    >
                    </el-option>
                  </el-select>
                </el-form-item>
              </el-col>
            </el-row>
          </div>
        </transition-group>
        <!-- End Button Item -->

        <!-- Add Button -->
        <div style="textAlign:center ;">
          <el-button type="primary" plain @click="addButton">
            <i class="el-icon-plus"></i> Add Button
          </el-button>
        </div>
        <!-- End Add Button -->
      </el-col>
    </el-row>
  </el-form>
</template>

<script lang="ts">
import { computed, defineComponent, reactive } from 'vue';
import { useStore } from 'vuex';
import { ChatNode } from '../types/chatbot.interface';

export default defineComponent({
  props: ['lang'],
  setup() {
    interface FormButton {
      text: string;
      event: string;
      data: string;
    }

    interface FormData {
      text: string;
      buttons: FormButton[];
    }

    const store = useStore();

    const chatbotData = computed(() => store.getters['chatbot/getChatbotData']);

    const rules = {
      name: [{ required: true, message: 'Please input chat name.', trigger: 'blur' }],
      text: [{ required: true, message: 'Please input chat text.', trigger: 'blur' }]
    };

    const formData: FormData = reactive({
      text: '',
      buttons: []
    });

    const buttonEvents = [
      {
        label: 'Capture',
        value: 'capture'
      },
      {
        label: 'Goto',
        value: 'goto'
      }
    ];

    const nodeDatas = chatbotData.value.map((node: ChatNode) => {
      return {
        label: node.name,
        value: node.name
      };
    });

    const getFormData = () => {
      return formData;
    };

    const addButton = () => {
      formData.buttons.push({
        text: '',
        event: '',
        data: ''
      });
    };

    const deleteButton = (id: number) => {
      console.log(id);

      formData.buttons.splice(id, 1);
    };

    return {
      formData,
      buttonEvents,
      getFormData,
      nodeDatas,
      addButton,
      deleteButton,
      rules
    };
  },
  methods: {
    submitForm(formName: string) {
      const form = this.$refs[formName] as any;
      let formData;
      form.validate((valid: boolean) => {
        if (valid) {
          formData = { ...this.formData, lang: this.lang };

          this.formData.buttons = [];
          form.resetFields();
        } else {
          console.log('error submit!!');
          return false;
        }
      });

      return formData ? JSON.parse(JSON.stringify(formData)) : null;
    }
  }
});
</script>

<style lang="scss" scoped>
.button-group {
  padding: 20px;
  border: 1px solid #eee;

  .button-item {
    padding: 20px;
    margin-bottom: 20px;
    border: 1px solid #69c0ff;
  }
}
.form-label {
  margin-bottom: 20px;
}

.button-title {
  text-align: center;
  text-transform: uppercase;
  color: #40a9ff;
  position: relative;

  .close-button {
    position: absolute;
    top: 0;
    right: 0;
    cursor: pointer;
    color: rgb(165, 163, 163);

    &:hover {
      color: #40a9ff;
    }
  }
}

.list-item {
  margin-right: 10px;
}
.list-enter-active,
.list-leave-active {
  transition: all 0.5s ease;
}
.list-enter-from,
.list-leave-to {
  opacity: 0;
  transform: translateY(30px);
}
</style>
