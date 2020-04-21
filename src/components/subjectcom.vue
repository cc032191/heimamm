<template>
  <div>
    <!-- 学科列表 -->
    <el-select :value="value" @input="v=>{$emit('input',v)}" placeholder="请选择学科" class="width364">
      <el-option
        v-for="(item, index) in subjectlist"
        :key="index"
        :label="item.name"
        :value="item.id"
      ></el-option>
    </el-select>
  </div>
</template>

<script>
import { getsubjectlist } from "../api/subject.js";
export default {
  props: ["value"],
  data() {
    return {
      // subject: "",
      subjectlist: []
    };
  },
  // watch: {
  //   subject: function() {
  //     this.$emit("input", this.subject);
  //   }
  // },
  methods: {
    getsubject() {
      getsubjectlist({}).then(res => {
        // window.console.log(res);
        if (res.data.code === 200) {
          this.subjectlist = res.data.data.items;
        }
      });
    }
  },
  created() {
    this.getsubject();
    // this.subject = this.value;
  }
};
</script>

<style>
</style>