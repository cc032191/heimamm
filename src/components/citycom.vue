<template>
  <div>
    <el-cascader
      size="large"
      :options="options"
      :value="value"
      @input="v=>$emit('input',v)"
      :props="{value:'label'}"
      class="width364"
    ></el-cascader>
    <!-- {{value}} -->
    <!-- {{selectedOptions}} -->
  </div>
</template>

<script>
import { regionData } from "element-china-area-data";
export default {
  props: ["value"],
  data() {
    return {
      options: regionData
    };
  }
};
</script>

<style>
</style>