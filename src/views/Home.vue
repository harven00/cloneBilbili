<template>
  <div class="home">
    <NavBar></NavBar>
    <van-tabs v-model="active" swipeable sticky>
      <van-tab v-for="(item,index) in category" :key="index" :title="item.title">
        <van-list
          v-model="item.loading"
          :immediate-check="false"
          :finished="item.finished"
          finished-text="没有更多了"
          @load="onLoad"
        >
          <div class="detailparent">
            <detail
              class="detailitem"
              :detailItme="categoryitem"
              v-for="(categoryitem,categoryindex) in item.list"
              :key="categoryindex"
            ></detail>
          </div>
        </van-list>
      </van-tab>
    </van-tabs>
  </div>
</template>
<script>
import NavBar from "@/components/common/NavBar.vue";
import Detail from "./cover.vue";
export default {
  data() {
    return {
      category: [],
      active: 0
    };
  },
  components: {
    NavBar,
    Detail
  },
  methods: {
    async selectCategory() {
      const res = await this.$http.get("/category");
      this.changeCategory(res.data);
    },
    changeCategory(data) {
      const category1 = data.map(item => {
        item.list = [];
        item.page = 0;
        item.pagesize = 10;
        item.finished = false
        item.loading = false
        return item;
      });
      this.category = category1;
      this.selectAtrical();
    },
    async selectAtrical() {
      const categoryitem = this.categoryItem();
      const res = await this.$http.get("/detail/" + categoryitem._id, {
        params: {
          page: categoryitem.page,
          pagesize: categoryitem.pagesize
        }
      });
      categoryitem.list.push(...res.data);
      categoryitem.loading = false
      if(res.data.length<categoryitem.pagesize){
        categoryitem.finished = true
      }
    },
    categoryItem() {
      const categoryitem = this.category[this.active];
      return categoryitem;
    },
    onLoad() {
      const categoryitem = this.categoryItem()
      setTimeout(() => {
        categoryitem.page +=1
        this.selectAtrical()
      }, 1000);
    }
  },
  watch: {
    active() {
      this.selectAtrical();
    }
  },
  created() {
    this.selectCategory();
  }
};
</script>

<style land="less">
.home {
  background-color: #fff;
}
.detailparent {
  display: flex;
  flex-wrap: wrap;
  justify-content: space-around;
}
.detailitem {
  margin: 1.389vw 0;
  width: 45%;
}
</style>
