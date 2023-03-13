"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var FrontPage = require('../src/views/FrontPage.vue');

var HomeView = require('../src/views/HomeView.vue');

var DeclareList = require('../src/views/DeclareList.vue');

var SignIn = require('../src/views/SignIn.vue');

var SignInAdmin = require('../src/views/SignInAdmin.vue');

var SignInJudge = require('../src/views/SignInJudge.vue');

var BackPage = require('../src/views/BackPage.vue');

var StuBackPage = require('../src/views/StuBackPage.vue');

var CompeTition = require('../src/components/back/CompeTition.vue');

var DeclarationDetail = require('../src/components/back/DeclarationDetail.vue');

var CreateItem = require('../src/components/back/CreateItem');

var EditProfile = require('../src/components/backStu/EditProfile.vue');

var ProjectList = require('../src/components/backStu/ProjectList.vue');

var DeclarePro = require('../src/components/backStu/DeclarePro.vue');

var DeclareInfo = require('../src/components/back/DeclareInfo.vue');

var StuAccount = require('../src/components/back/StuAccount.vue');

var AdminAccount = require('../src/components/back/AdminAccount.vue');

var JudgeAccount = require('../src/components/back/JudgeAccount.vue');

var InstituteManagement = require('../src/components/back/InstituteManagement');

var CreateBlog = require('../src/components/back/blog/CreateBlog.vue');

var FolderManagement = require('../src/components/back/blog/FolderManagement.vue');

var DashBoard = require('../src/components/back/DashBoard.vue');

var routes = [{
  path: "/",
  components: FrontPage,
  children: [{
    path: "/",
    components: HomeView
  }, {
    path: 'stu',
    components: DeclareList
  }]
}, {
  path: '/sign',
  components: SignIn
}, {
  path: '/signAdmin',
  components: SignInAdmin
}, {
  path: '/signJudge',
  components: SignInJudge
}, {
  path: '/admin',
  components: BackPage,
  children: [{
    path: "",
    components: DashBoard
  }, {
    path: 'account/admin',
    components: AdminAccount
  }, {
    path: 'account/stu',
    components: StuAccount
  }, {
    path: 'account/judge',
    components: JudgeAccount
  }, {
    path: 'account/institute',
    components: InstituteManagement
  }, {
    path: 'competition',
    components: CompeTition
  }, {
    path: 'competition/declarelist',
    components: DeclarationDetail
  }, {
    path: 'competition/declarelist/detail',
    components: DeclareInfo
  }, {
    path: 'creatItem',
    components: CreateItem
  }, {
    path: 'website/folder',
    components: FolderManagement
  }, {
    path: 'website/createBlog',
    components: CreateBlog
  }]
}, {
  path: '/stuAdmin',
  components: StuBackPage,
  children: [{
    path: "",
    components: ProjectList
  }, {
    path: "upload",
    components: DeclarePro
  }, {
    path: "editp",
    components: EditProfile
  }]
}];
var _default = routes;
exports["default"] = _default;