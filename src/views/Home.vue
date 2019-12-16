<template>
  <div class="home">
    <a-layout>
      <a-layout-header>Header</a-layout-header>
      <a-layout>
        <a-layout-sider>
          <draggable
            class="list-group"
            group="xxx"
            tag="ul"
            v-model="list"
            v-bind="{group:{ name:'people', pull:'clone',put:false},sort:false}"
            :move="onMove"
            @start="isDragging=true"
            @end="isDragging=false"
          >
            <transition-group type="transition" :name="'flip-list'">
              <li class="list-group-item-1" v-for="element in list" :key="element.order">
                <i
                  :class="element.fixed? 'fa fa-anchor' : 'glyphicon glyphicon-pushpin'"
                  aria-hidden="true"
                ></i>
                {{element.name}}
                <span class="badge">{{element.order}}</span>
              </li>
            </transition-group>
          </draggable>
        </a-layout-sider>
        <a-layout-content>
          <draggable
            group="xxx"
            element="span"
            v-model="list2"
            v-bind="{group:{ name:'people', pull:'clone',put:false}}"
            :move="onMove"
          >
            <transition-group name="no" class="list-group-2" tag="div">
              <li class="list-group-item" v-for="element in list2" :key="element.order">
                <i
                  :class="element.fixed? 'fa fa-anchor' : 'glyphicon glyphicon-pushpin'"
                  aria-hidden="true"
                ></i>
                {{element.name}}
                <span class="badge">{{element.order}}</span>
              </li>
            </transition-group>
          </draggable>
        </a-layout-content>
        <a-layout-sider>Sider</a-layout-sider>
      </a-layout>
      <a-layout-footer>Footer</a-layout-footer>
    </a-layout>
  </div>
</template>

<script>
import draggable from "vuedraggable";

const message = [
  "vue.draggable",
  "draggable",
  "component",
  "for",
  "vue.js 2.0",
  "based",
  "on",
  "Sortablejs"
];

export default {
  name: "home",
  data() {
    return {
      list: message.map((name, index) => {
        return { name, order: index + 1, fixed: false };
      }),
      list2: [{ name: "name", order: 20, age: 11 }],
      editable: true,
      isDragging: false,
      delayedDragging: false
    };
  },
  components: {
    draggable
  },
  methods: {
    orderList() {
      this.list = this.list.sort((one, two) => {
        return one.order - two.order;
      });
    },
    onMove({ relatedContext }) {
      const relatedElement = relatedContext.element;
      console.log(relatedElement);
    }
  },
  computed: {

    listString() {
      return JSON.stringify(this.list, null, 2);
    },
    list2String() {
      return JSON.stringify(this.list2, null, 2);
    }
  },
  watch: {
    isDragging(newValue) {
      if (newValue) {
        this.delayedDragging = true;
        return;
      }
      this.$nextTick(() => {
        this.delayedDragging = false;
      });
    }
  }
};
</script>

<style lang="scss">
.flip-list-move {
  transition: transform 0.5s;
}
.no-move {
  transition: transform 0s;
}
.ghost {
  opacity: 0.5;
  background: #c8ebfb;
}
.list-group {
  min-height: 20px;
}
.list-group-item {
  cursor: move;
}
.list-group-item i {
  cursor: pointer;
}
.home {
  > .ant-layout {
    height: 100vh;
  }
}
.ant-layout-header,
.ant-layout-footer {
  background: #7dbcea;
  color: #fff;
}
.ant-layout-footer {
  line-height: 1.5;
}
.ant-layout-sider {
  background: #3ba0e9;
  color: #fff;
  line-height: 120px;
}
.ant-layout-content {
  background: rgba(16, 142, 233, 1);
  color: #fff;
  min-height: 120px;
  line-height: 120px;
}
.ant-layout:last-child {
  margin: 0;
}
</style>

