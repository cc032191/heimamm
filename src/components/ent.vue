<template>
  <div>
    <el-select :value="value" class="width364" @input="v=>{$emit('input',v)}" placeholder="请选择企业">
      <el-option v-for="(item, index) in entlist" :key="index" :label="item.name" :value="item.id"></el-option>
    </el-select>
  </div>
</template>

<script>
import { apigetent } from "../api/enterprise";
export default {
  props: ["value"],
  data() {
    return {
      entlist: [],
      // enterprise: ""
    };
  },
  // watch: {
  //   enterprise: function() {
  //     this.$emit("input", this.enterprise);
  //   }
  // },
  created() {
    this.getent();
    // this.enterprise = this.value;
  },
  methods: {
    getent() {
      apigetent({}).then(res => {
        // window.console.log(res);
        if (res.data.code === 200) {
          this.entlist = res.data.data.items;
        }
      });
    }
  }
};
</script>

<style>
</style>