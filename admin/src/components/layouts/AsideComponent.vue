<template>
  <div class="aside-menu">
    <el-menu
      default-active="1"
      class="el-menu-vertical-demo"
      :collapse="isAsideCollapse"
      background-color="rgb(48, 65, 86)"
    >
      <router-link
        :to="item.path"
        :key="item.id"
        v-for="item in menuItems"
        custom
        v-slot="{ navigate }"
      >
        <el-menu-item :index="item.id" @click="navigate" @keypress.enter="navigate" role="link">
          <i :class="item.icon"></i>
          <template #title>{{ item.name }}</template>
        </el-menu-item>
      </router-link>
    </el-menu>
  </div>
</template>

<script lang="ts">
import { defineComponent, ref } from 'vue';

export default defineComponent({
  name: 'AsideComponent',
  props: ['isAsideCollapse'],
  setup() {
    interface MenuItem {
      id: string;
      name: string;
      path: string;
      icon: string;
    }

    const isCollapse = ref(false);

    const menuItems: MenuItem[] = [
      {
        id: '1',
        name: 'Dashboard',
        icon: 'el-icon-s-home',
        path: '/dash-board'
      },
      {
        id: '2',
        name: 'Users',
        icon: 'el-icon-user',
        path: '/dash-board/user'
      },
      {
        id: '3',
        name: 'Chat bot',
        icon: 'el-icon-chat-dot-square',
        path: '/dash-board/chat-bot'
      },
      {
        id: '4',
        name: 'Log out',
        icon: 'el-icon-remove-outline',
        path: ''
      }
    ];
    return {
      menuItems,
      isCollapse
    };
  }
});
</script>

<style lang="scss">
.el-menu-vertical-demo {
  height: 100vh;
}

.el-menu-vertical-demo:not(.el-menu--collapse) {
  width: 200px;
  min-height: 100vh;
}

.el-menu-item {
  color: #fff;
  text-decoration: none;

  &:hover {
    background-color: rgb(41, 56, 73) !important;
  }

  &.is-active {
    .nav-link {
      color: #40a9ff;
    }
  }
}
</style>
