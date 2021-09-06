<template>
  <el-table :data="filterTableDataByLang" style="width: 100%" border>
    <el-table-column label="Chat ID" width="180">
      <template #default="scope">
        <span style="margin-left: 10px">{{ scope.row.name }}</span>
      </template>
    </el-table-column>

    <el-table-column label="Chat Text" width="360">
      <template #default="scope">
        <span>{{ scope.row.language?.text || '-' }}</span>
      </template>
    </el-table-column>

    <el-table-column label="Chat Regex">
      <template #default="scope">
        <el-tag type="warning">{{ scope.row.language?.regex || '-' }}</el-tag>
      </template>
    </el-table-column>

    <el-table-column label="Chat Buttons">
      <template #default="scope">
        <el-space wrap v-if="scope.row.language?.buttons.length > 0">
          <el-tag v-for="(button, index) in scope.row.language?.buttons" :key="index">
            {{ button?.text || '-' }}
          </el-tag>
        </el-space>
        <el-tag v-else>-</el-tag>
      </template>
    </el-table-column>

    <el-table-column label="Operations">
      <template #header>
        <el-input v-model="search" size="mini" placeholder="Type to search" />
      </template>
      <template #default="scope">
        <el-button size="mini" type="sucess" @click="handleEdit(scope.$index, scope.row)"
          >Edit</el-button
        >
        <el-popconfirm title="Are you sure to delete this?">
          <template #reference>
            <el-button size="mini" type="danger">Delete</el-button>
          </template>
        </el-popconfirm>
      </template>
    </el-table-column>
  </el-table>
</template>

<script lang="ts">
import { computed, defineComponent, ref } from '@vue/runtime-core';

export default defineComponent({
  props: {
    tableData: { type: Array, default: () => [], required: true },
    lang: { type: String, required: true }
  },
  setup(props) {
    const search = ref('');

    const filterTableDataByLang = computed(() => {
      const { tableData, lang } = props;
      const filterData = tableData.map((item: any) => {
        return {
          ...item,
          language: item.language?.find((item: any) => item.lang === lang)
        };
      });

      return filterData;
    });

    return { search, filterTableDataByLang };
  }
});
</script>

<style></style>
