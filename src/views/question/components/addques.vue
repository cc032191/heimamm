<template>
  <div>
    <!-- 新增页面 -->
    <el-dialog title="新增试题" :visible.sync="dialogFormVisible" fullscreen class="zuida">
      <el-form :model="addform">
        <!-- 学科 -->
        <el-form-item label="学科" :label-width="formLabelWidth" placeholder="请选择学科">
          <subjectcom v-model="addform.subject"></subjectcom>
        </el-form-item>
        <!-- 阶段 -->
        <el-form-item label="阶段" prop="step" :label-width="formLabelWidth">
          <el-select v-model="addform.step" placeholder="请选择阶段" class="width364">
            <el-option label="初级" :value="1"></el-option>
            <el-option label="中级" :value="2"></el-option>
            <el-option label="高级" :value="3"></el-option>
          </el-select>
        </el-form-item>
        <!-- 企业 -->
        <el-form-item label="企业" prop="enterprise" :label-width="formLabelWidth">
          <entcom v-model="addform.enterprise"></entcom>
        </el-form-item>
        <!-- 城市 -->
        <el-form-item label="城市" prop="city" :label-width="formLabelWidth">
          <citycom v-model="addform.city"></citycom>
          <!-- {{addform.city}} -->
        </el-form-item>
        <!-- 题型 -->
        <el-form-item label="题型" prop="type" :label-width="formLabelWidth">
          <el-radio-group v-model="addform.type">
            <el-radio :label="1">单选</el-radio>
            <el-radio :label="2">多选</el-radio>
            <el-radio :label="3">简答</el-radio>
          </el-radio-group>
        </el-form-item>
        <!-- 难度 -->
        <el-form-item label="难度" prop="difficulty" :label-width="formLabelWidth">
          <el-radio-group v-model="addform.difficulty">
            <el-radio :label="1">简单</el-radio>
            <el-radio :label="2">一般</el-radio>
            <el-radio :label="3">困难</el-radio>
          </el-radio-group>
        </el-form-item>
        <!-- 分割线 -->
        <el-divider></el-divider>
        <!-- 富文本编辑器 -->
        <el-form-item label="试题标题" prop="title">
          <br />
          <quill-editor v-model="addform.title" />
        </el-form-item>
        <!-- 单选 -->
        <el-form-item label="单选" v-if="addform.type===1">
          <el-radio-group v-model="addform.single_select_answer">
            <myradio
              :label="item.label"
              :text="item.text"
              @changetext="v=>item.text=v"
              :image="item.image"
              @changeimg="v=>item.image=v"
              v-for="(item, index) in addform.select_options"
              :key="index"
            ></myradio>
          </el-radio-group>
          <!-- {{addform.select_options}} -->
        </el-form-item>
        <!-- 多选 -->
        <el-form-item label="多选" v-if="addform.type===2">
          <el-checkbox-group v-model="addform.multiple_select_answer">
            <mycheckbox
              :label="item.label"
              :text="item.text"
              @changetext="v=>item.text=v"
              :image="item.image"
              @changeimg="v=>item.image=v"
              v-for="(item, index) in addform.select_options"
              :key="index"
            ></mycheckbox>
          </el-checkbox-group>
          <!-- {{addform.multiple_select_answer}}
          {{addform.select_options}}-->
        </el-form-item>
        <!-- 简答 -->
        <el-form-item label="简答" v-if="addform.type===3">
          <el-input type="textarea" :rows="2" v-model="addform.short_answer"></el-input>
        </el-form-item>
        <!-- 分割线 -->
        <el-divider></el-divider>
        <!-- 视频 -->
        <el-form-item label="解析视频" :label-width="formLabelWidth">
          <myvideo v-model="addform.video"></myvideo>
        </el-form-item>
        <!-- 分割线 -->
        <el-divider></el-divider>
        <!-- 答案解析 -->
        <el-form-item label="答案解析" prop="title">
          <br />
          <quill-editor v-model="addform.answer_analyze" />
        </el-form-item>
        <!-- 分割线 -->
        <el-divider></el-divider>
        <!--试题备注  -->
        <el-form-item label="试题备注" prop="title" :label-width="formLabelWidth">
          <el-input v-model="addform.remark"></el-input>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="dialogFormVisible = false">取 消</el-button>
        <el-button type="primary" @click="confirmques">确 定</el-button>
      </div>
    </el-dialog>
  </div>
</template>

<script>
import myradio from "./myradio";
import mycheckbox from "./mycheckbox";
import myvideo from "./myvideo";
import { apiaddque } from "../../../api/question";
export default {
  data () {
    return {
      addform: {
        title: "",
        subject: "",
        step: "",
        enterprise: "",
        city: [],
        type: 1,
        difficulty: "",
        single_select_answer: "",
        multiple_select_answer: [],
        short_answer: "",
        video: "",
        answer_analyze: "",
        remark: "",
        select_options: [
          {
            label: "A",
            text: "狗不理",
            image: "upload/20191129/fd5f03a07d95e3948860240564b180e4.jpeg"
          },
          {
            label: "B",
            text: "猫不理",
            image: "upload/20191129/e93e7bb72accda7f3159cdabc4203991.jpeg"
          },
          {
            label: "C",
            text: "麻花",
            image: "upload/20191129/b7caf98be9d0aa6764b0112ba0dfa19e.jpeg"
          },
          {
            label: "D",
            text: "炸酱面",
            image: "upload/20191129/4067f19ab53a5e8388ad3459e23110f0.jpeg"
          }
        ]
      },
      dialogFormVisible: false,
      formLabelWidth: "70px"
    };
  },
  components: {
    myradio,
    mycheckbox,
    myvideo
  },
  methods: {
    confirmques () {
      apiaddque(this.addform).then(res => {
        window.console.log(res);
        if (res.data.code === 200) {
          this.$message.success("新增成功");
          this.dialogFormVisible = false;
          this.$parent.getquelist();
        } else {
          this.$message.error(res.data.data.message);
        }
      });
    }
  }
};
</script>

<style lang='less'>
.el-form-item {
  .el-form-item__label {
    text-align: left;
  }
}
.zuida {
  .width364 {
    width: 364px;
  }
}
.el-dialog {
  .el-dialog__header {
    padding: 15px 20px;
    background: linear-gradient(
      225deg,
      rgba(20, 147, 250, 1),
      rgba(1, 198, 250, 1)
    );
    .el-dialog__title {
      font-size: 18px;
      font-weight: 400;
      color: #fefefe;
      line-height: 24px;
    }
  }
  .el-dialog__body {
    display: flex;
    justify-content: center;
    .el-form {
      width: 835px;
    }
  }
  .dialog-footer {
    text-align: center;
  }
}
.video {
  width: 200px;
  height: 200px;
}
</style>