<template>
  <div id="title">
    <el-input v-model="article.title" id="title">
      <template #prepend>标题:</template>
    </el-input>
  </div>
  <div style="border: 1px solid #ccc; margin-top: 10px">
    <Toolbar :editor="editorRef" :defaultConfig="toolbarConfig" :mode="mode" style="border-bottom: 1px solid #ccc" />
    <Editor :defaultConfig="editorConfig" :mode="mode" v-model="article.content"
      style="height: 70vh; overflow-y: hidden; text-align: left" @onCreated="handleCreated" @onChange="handleChange"
      @onDestroyed="handleDestroyed" @onFocus="handleFocus" @onBlur="handleBlur" @customAlert="customAlert"
      @customPaste="customPaste" />
  </div>
</template>
<style lang="scss" scoped>
#title {
  height: 35px;

  .el-input {
    height: 35px;
  }
}
</style>
<script setup>
import '@wangeditor/editor/dist/css/style.css';
import { ref, shallowRef, onBeforeUnmount, reactive } from "vue";
import { Editor, Toolbar } from '@wangeditor/editor-for-vue'
// import cos from '../../../../http/ossSts'
// https://www.wangeditor.com/v5/for-frame.html#%E4%BD%BF%E7%94%A8-1
const editorRef = shallowRef()
const toolbarConfig = {}
const editorConfig = {
  placeholder: '请输入内容...'
}
const mode = ref('default')
const article = reactive({
  title: "",
  content: "",
  createrId: "",
  folderId: ""
})
// editorConfig.MENU_CONF['uploadImage'] = {
//     // 自定义上传
//     // async customUpload(file, insertFn) {  
//     //     // file 即选中的文件
//     //     // 自己实现上传，并得到图片 url alt href
//     //     // 最后插入图片
//     //     cos.putObject({
//     //     Bucket: 'filem-1253997872', /* 填入您自己的存储桶，必须字段 */
//     //     Region: 'ap-guangzhou',  /* 存储桶所在地域，例如ap-beijing，必须字段 */
//     //     Key: `fileM/${declareInfo.projectId}/${declareInfo.createName}-${declareInfo.projectName}-ppt.${params.file.name.split('.')[1]}`,  /* 存储在桶里的对象键（例如1.jpg，a/b/test.txt），必须字段 */
//     //     Body: params.file, /* 必须，上传文件对象，可以是input[type="file"]标签选择本地文件后得到的file对象 */
//     //     onProgress: function (progressData) {
//     //         // 上传进度的回掉
//     //         progress.ppt = progressData.percent * 100
//     //         if(progress.ppt==100) {
//     //             errMsgPopup.generalPopUp('上传成功',1000)
//     //             showProgress.ppt = false
//     //         }
//     //     }
//     // }, function (err, data) {
//     //     declareInfo.attachmentList.ppt = data.Location
//     //     insertFn(url, alt, href)
//     //     if (err) {
//     //         errMsgPopup.errorPopup('上传失败，请稍后再试')
//     //     }
        
//     // });
        
//     // }
// }
const handleCreated = (editor) => {
  console.log('created', editor);
  editorRef.value = editor; // 记录 editor 实例，重要！
};
const handleChange = (editor) => {
  console.log('change:', editor.getHtml());
};
const handleDestroyed = (editor) => {
  console.log('destroyed', editor);
};
const handleFocus = (editor) => {
  console.log('focus', editor);
};
const handleBlur = (editor) => {
  console.log('blur', editor);
};
const customAlert = (info, type) => {
  alert(`【自定义提示】${type} - ${info}`);
};
const customPaste = (editor, event, callback) => {
  console.log('ClipboardEvent 粘贴事件对象', event);

  // 自定义插入内容
  editor.insertText('xxx');

  // 返回值（注意，vue 事件的返回值，不能用 return）
  callback(false); // 返回 false ，阻止默认粘贴行为
  // callback(true) // 返回 true ，继续默认的粘贴行为
};
onBeforeUnmount(() => {
  const editor = editorRef.value
  if (editor == null) return
  editor.destroy()
})

</script>