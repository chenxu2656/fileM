"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var FrontPage = require('../src/views/FrontPage.vue');

var HomeView = require('../src/views/HomeView.vue');

var DeclareList = require('../src/views/DeclareList.vue');

var SignIn = require('../src/views/SignIn.vue');

var BackPage = require('../src/views/BackPage.vue');

var StuBackPage = require('../src/views/StuBackPage.vue');

var CompeTition = require('../src/components/back/CompeTition.vue');

var CreateItem = require('../src/components/back/CreateItem');

var EditProfile = require('../src/components/backStu/EditProfile.vue');

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
  path: '/admin',
  components: BackPage,
  children: [{
    path: 'competition',
    components: CompeTition
  }, {
    path: 'creatItem',
    components: CreateItem
  }]
}, {
  path: '/adminStudent',
  components: StuBackPage,
  children: [{
    path: "editp",
    components: EditProfile
  }]
}];
var _default = routes;
exports["default"] = _default;