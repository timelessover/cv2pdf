<template>
  <div id="home">
    <a-layout>
      <a-layout-header :style="{'min-height':'15vh'}">Header</a-layout-header>
      <a-layout :style="{'height':'100vh'}">
        <a-layout-sider width="250px">Sider</a-layout-sider>
        <a-layout-content >
          <FormEditor></FormEditor>
        </a-layout-content>
      </a-layout>
    </a-layout>
  </div>
</template>

<script>
import FormEditor from "@/components/FormEditor.vue";
export default {
  name: "home",
  components: {
    FormEditor
  }
};
</script>

<style lang="scss" scoped>
#home {
  padding: 0 100px;
  .ant-layout {
    min-height: 100vh;
    text-align: center;
    
    > .ant-layout-header {
      background: #7dbcea;
      color: #fff;
    }
    > .ant-layout-sider {
      background: #3ba0e9;
      color: #fff;
      line-height: 120px;
    }
    > .ant-layout-content {
      background: rgba(16, 142, 233, 1);
      color: #fff;
      min-height: 120px;
      line-height: 120px;
    }
  }
}
</style>