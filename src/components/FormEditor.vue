<template>
  <div class="home">
    <draggable tag="ul" v-model="list" group="people" @start="drag=true" @end="drag=false">
      <li v-for="item in list" :key="item.id" @click="showModal1(item)">{{item.id}}</li>
    </draggable>
    <a-button type="primary" @click="showModal">Open Modal with async logic</a-button>
    <a-modal title="Title" :visible="visible" @cancel="handleCancel" :footer="null">
      <a-form :form="form" @submit="handleSubmit($event,'exp')">
        <a-form-item label="Note" :label-col="{ span: 5 }" :wrapper-col="{ span: 12 }">
          <a-input
            v-decorator="['note', { rules: [{ required: true, message: 'Please input your note!'}]} ]"
          />
        </a-form-item>
        <a-form-item label="RangePicker" :label-col="{ span: 5 }" :wrapper-col="{ span: 12 }">
          <a-range-picker v-decorator="['range-picker', rangeConfig]"/>
        </a-form-item>
        <a-form-item :wrapper-col="{ span: 12, offset: 5 }">
          <a-button type="primary" html-type="submit">Submit</a-button>
        </a-form-item>
      </a-form>
    </a-modal>
  </div>
</template>

<script>
import draggable from "vuedraggable";
import moment from "moment";
export default {
  name: "editor",
  data() {
    return {
      list: [],
      list2: null,
      xxx: "22",
      dateFormat: "YYYY/MM/DD",
      visible: false,
      formLayout: "horizontal",
      form: this.$form.createForm(this, { name: "coordinated" }),
      rangeConfig: {
        rules: [
          { type: "array", required: true, message: "Please select time!" }
        ]
      }
    };
  },
  components: {
    draggable
  },
  methods: {
    showModal() {
      this.visible = true;
    },
    showModal1(item) {
      this.list2 = item;
      let current = { ...item };
      let temp = current["range-picker"].map(item => {
        return moment(item, "YYYY/MM/DD")
      });
      this.form.setFieldsValue({
        note: current.note,
        id: current.id,
        "range-picker": temp
      });
      this.showModal();
    },
    handleCancel() {
      console.log("Clicked cancel button");
      this.form.resetFields();
      this.visible = false;
    },
    handleSubmit(e, xx) {
      console.log(xx);
      e.preventDefault();
      this.form.validateFields((err, fieldsValue) => {
        if (!err) {
          const rangeValue = fieldsValue["range-picker"];
          const values = {
            ...fieldsValue,
            "range-picker": [
              rangeValue[0].format("YYYY-MM-DD"),
              rangeValue[1].format("YYYY-MM-DD")
            ]
          };
          console.log("Received values of form: ", values);
          let list = [...this.list];
          let lens = list.length;
          
          if (this.list2) {
            list = list.map(item => {
              if (item.id === this.list2.id) {
                 return {...item,...values}
              }
            });
            console.log(list)
            this.list2 = null
          } else {
            values.id = lens++;
            list.push(values);
          }
          this.list = list;
          this.form.resetFields();
          this.visible = false;
        }
      });
    }
  },
  computed: {},
  watch: {}
};
</script>

<style lang="scss">
</style>

