<template>
  <div id="title">
      <el-input id="title" v-model="article.title">
          <template #prepend>标题:</template>
      </el-input>
      <el-select v-model="article.folderId" placeholder="请选择文件夹" style="width: 200px">
          <el-option v-for="item in folderList" :key="item._id" :label="item.name" :value="item._id"/>
      </el-select>
  </div>
  <div style="border: 1px solid #ccc; margin-top: 10px">

    <Toolbar :editor="editorRef" :defaultConfig="toolbarConfig" :mode="mode" style="border-bottom: 1px solid #ccc" />
    <Editor :defaultConfig="editorConfig" :mode="mode" v-model="article.content"
      style="height: 70vh; overflow-y: hidden; text-align: left" @onCreated="handleCreated" @onChange="handleChange"
      @onDestroyed="handleDestroyed" @onFocus="handleFocus" @onBlur="handleBlur" @customAlert="customAlert"
      @customPaste="customPaste" />
  </div>
  <div id="publishButton">
    <div class="publish" id="deploy" @click="createBlog(1)">
      发布
    </div>
     <div class="publish" id="save" @click="createBlog(0)">
      暂存至草稿箱
    </div>
  </div>
</template>
<style lang="scss" scoped>
#title {
  height: 55px;
  display: flex;

  .el-input {
    height: 35px;
  }

  .el-select {
    margin-left: 20px;
    height: 35px;
  }
}
#publishButton {
  margin-top: 50px;
  display: flex;
  justify-content: center;

  .publish {
    width: 150px;
    height: 40px;
    margin-right: 20px;
    line-height: 40px;
    font-size: 18px;
    color: white;
    background-color: $base_color_lightBlue;
    border-radius: 5px;
    &#save {
      background-color: $website_font_gray;
    }
  }
}
</style>
<script setup>
import '@wangeditor/editor/dist/css/style.css';
import {ref, shallowRef, onBeforeUnmount, reactive, onMounted} from "vue";
import {Editor, Toolbar} from '@wangeditor/editor-for-vue'
// import cos from '../../../../http/ossSts'
// https://www.wangeditor.com/v5/for-frame.html#%E4%BD%BF%E7%94%A8-1
import apiRequest from '../../../../http/'
import errMsgPopup from "@/utils/errorHandle";
const editorRef = shallowRef()
const toolbarConfig = {}
const folderList = ref([])
const editorConfig = {
    placeholder: '请输入内容...'
}
const mode = ref('default')
const article = reactive({
  title: "",
  content: "",
  folderId: "",
  status: 1
})
const handleCreated = (editor) => {
  console.log('created', editor);
  editorRef.value = editor; // 记录 editor 实例，重要！
};
const handleChange = (editor) => {
    console.log(editor.getHtml())
    // article.content = editor.getHtml()
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
const createBlog = async(status) => {
    const login = await apiRequest({
        method: 'post',
        url: '/api/news/cd',
        params: {
            title: article.title,
            content: article.content,
            status: status,
            folderId: '6421a072871ed211368d5266'
        }
    })
    if (login.status == 200) {
        console.log(login)
        errMsgPopup.generalPopUp('发布成功',1000)
        return true
    }
    errMsgPopup.errorPopup(login.msg)
    return false
}
const customPaste = (editor, event, callback) => {
    console.log('ClipboardEvent 粘贴事件对象', event);
    // 自定义插入内容
    editor.insertText('xxx');
    // 返回值（注意，vue 事件的返回值，不能用 return）
    callback(false); // 返回 false ，阻止默认粘贴行为
    // callback(true) // 返回 true ，继续默认的粘贴行为
};
const getFolderList = async () => {
    const resp = await apiRequest({
        url: "/api/news/folder",
        method: 'get'
    })
    if (resp.status == 200) {
        folderList.value = resp.msg
    } else {
        errMsgPopup.errorPopup(resp.msg)
    }
}
onBeforeUnmount(() => {
    const editor = editorRef.value
    if (editor == null) return
    editor.destroy()
})
onMounted(async () => {
    await getFolderList()
})

</script>