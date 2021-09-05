<template>
  <div class="page-header">
    <div class="collapse-menu">
      <i
        class="el-icon-s-fold"
        @click="$emit('collapseAsideClick', true)"
        v-if="!isAsideCollapse"
      ></i>
      <i class="el-icon-s-unfold" @click="$emit('collapseAsideClick', false)" v-else></i>
    </div>
    <el-breadcrumb separator="/">
      <el-breadcrumb-item :to="{ path: '/dash-board' }">Dashboard</el-breadcrumb-item>
    </el-breadcrumb>
  </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue';

export default defineComponent({
  props: ['isAsideCollapse'],
  emits: ['collapseAsideClick'],
  setup() {
    return {};
  }
});
</script>

<style lang="scss">
.page-header {
  display: flex;
  align-items: center;

  padding: 10px;

  .collapse-menu {
    cursor: pointer;
    margin-right: 10px;
  }

  span {
    font-size: 16px;
  }

  i {
    font-size: 24px;
  }
}
</style>
