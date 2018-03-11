<template>
  <div class="footer-navbar">
    <tabbar>
      <!--<tabbar-item :link="{path:'/'}" :selected="getCurrentRouterPath === '/'">-->
        <!--&lt;!&ndash;<img slot="icon" src="../assets/image/ic_nav_discover_normal.png">&ndash;&gt;-->
        <!--&lt;!&ndash;<img slot="icon-active" src="../assets/image/ic_nav_discover_actived.png">&ndash;&gt;-->
        <!--<i class="fa fa-globe s27" slot="icon"></i>-->
        <!--<span slot="label">发现</span>-->
      <!--</tabbar-item>-->
      <!--<tabbar-item :link="{path:'/task'}">-->
        <!--&lt;!&ndash;<img slot="icon" src="../assets/image/ic_nav_news_normal.png">&ndash;&gt;-->
        <!--&lt;!&ndash;<img slot="icon-active" src="../assets/image/ic_nav_news_actived.png">&ndash;&gt;-->
        <!--<i class="fa fa-tasks s27" slot="icon"></i>-->
        <!--<span slot="label">任务</span>-->
      <!--</tabbar-item>-->
      <!--<tabbar-item :link="{path:'/situation'}" >-->
        <!--&lt;!&ndash;<img slot="icon" src="../assets/image/ic_nav_tweet_normal.png">&ndash;&gt;-->
        <!--&lt;!&ndash;<img slot="icon-active" src="../assets/image/ic_nav_tweet_actived.png">&ndash;&gt;-->
        <!--<i class="fa fa-bell s27" slot="icon"></i>-->
        <!--<span slot="label">动态</span>-->
      <!--</tabbar-item>-->
      <!--<tabbar-item :link="{path:'/user'}">-->
        <!--&lt;!&ndash;<img slot="icon" src="../assets/image/ic_nav_my_normal.png">&ndash;&gt;-->
        <!--&lt;!&ndash;<img slot="icon-active" src="../assets/image/ic_nav_my_pressed.png">&ndash;&gt;-->
        <!--<i class="fa fa-user s27" slot="icon"></i>-->
        <!--<span slot="label">我的</span>-->
      <!--</tabbar-item>-->

      <tabbar-item :link="{path: item.url}" v-for="item in tag_list" :selected="getCurrentRouterPath === item.url">
        <i v-if="item.icon" :class="item.icon" slot="icon"></i>
        <span slot="label">{{item.title}}</span>
      </tabbar-item>
    </tabbar>
  </div>
</template>
<style>
  .footer-navbar {
    height: 65px;
  }
  .weui-tabbar {
    position: fixed!important;
  }

</style>
<script>
    import { Tabbar,TabbarItem } from 'vux'
    import { mapGetters } from 'vuex'

    const list = () => [
        {
            title: '首页',
            url: '/',
            icon: 'fa fa-globe s27',
        },
        {
            title: '任务记录',
            url: '/task-note',
            icon: 'fa fa-tasks s27',
        },
        {
            title: '公告动态',
            url: '/situation',
            icon: 'fa fa-bell s27',
        },
        {
            title: '我的',
            url: '/user',
            icon: 'fa fa-user s27',
        },

    ];

    export default{
        name: 'AppFooter',
        components: {
            Tabbar,
            TabbarItem,
        },
        data(){
            return{
                index:0,
                tag_list: list(),
            }
        },
        computed: {
            ...mapGetters({
                getCurrentRouterPath: 'getCurrentRouterPath'
            }),
        },
        methods:{
            getTagInfobyURL(url) {
                for(let n in this.tag_list) {
                    if(this.tag_list[n].url === url) {
                        return this.tag_list[n];
                    }
                }
                return false;
            }
        }

    }

</script>
