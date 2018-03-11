<template>
  <div>
    <!--公告-->
    <AppAnnouncement></AppAnnouncement>

    <!--账户余额信息-->
    <div class="index-top">
      <div class="index-topmain-tip">
        <p>当前余额(元)</p>
        <p class="index-topmain-money">6.00</p>
      </div>
      <ul class="index-topbar">
        <li class="index-topbar-left">
          <span>今日收入(元)</span>
          <p>0.00</p>
        </li>
        <li class="index-topbar-right">
          <span>总收益(元)</span>
          <p>6.00</p>
        </li>
        <div class="clearfix"></div>
      </ul>
    </div>

    <!--操作项-->
    <div class="home-grid">
      <grid>
        <grid-item :label="item.title" v-for="item in taglist" @click.native="go(item.url)">
          <i v-if="item.icon" :class="item.icon" class="s28" slot="icon"></i>
          <img v-if="item.img" :src="item.img" slot="icon">
        </grid-item>
      </grid>
    </div>

    <!--<tab :line-width="2"  v-model="index">-->
    <!--<tab-item :selected="tag === item.title" v-for="item in taglist" @click="tag = item.title">-->
    <!--<i :class="item.icon" v-if="item.icon"></i>-->
    <!--{{item.title}}-->
    <!--</tab-item>-->
    <!--</tab>-->
    <!--<div v-if="index === 0"><news-list></news-list></div>-->
  </div>
</template>

<script>
    import { Tab, TabItem, Cell, Marquee, MarqueeItem, Grid, GridItem } from 'vux'
    import AppHeader from './Header'
    import AppAnnouncement from './Announcement.vue'

    const list = () => [
        {
            title: '电商',
            icon: 'fa fa-coffee text-blue',
            url: '/e-commerce'
        },
        {
            title: 'App',
            icon: 'doudou-icon index_ico_task',
            url: '/aso'
        },
        {
            title: '新媒体',
            icon: 'fa fa-wechat text-primary',
            url: '/media'
        },
        {
            title: '收徒赚钱',
            icon: 'doudou-icon index_ico_friend',
            url: '/recommend-friend'
        },
        {
            title: '高额任务',
//            icon: 'fa fa-wechat',
            img: '/static/images/gaoeNIcon.gif',
            url: '/high-level'
        },
        {
            title: '提现',
            icon: 'doudou-icon index_ico_cash',
            url: '/enchashment'
        },
        {
            title: '帮助中心',
            icon: 'doudou-icon index_ico_help',
            url: '/help'
        },
        {
            title: '联系客服',
            icon: 'doudou-icon index_ico_qq',
            url: '/contact-us'
        },
        {
            title: '个人中心',
            icon: 'doudou-icon index_ico_user',
            url: '/user'
        },
    ];

    export default {

        components: {
            Tab,
            TabItem,
            Cell,
            Grid,
            GridItem,
            Marquee,
            MarqueeItem,
            AppAnnouncement,
            AppHeader,
        },
        data () {
            return {
                tag: '电商',
                taglist: list(),
                index:0
            }
        },
        ready () {
        },
        methods:{
            go (url) {
                this.$router.push(`${url}`)
            },
        }
    }
</script>

<style>
  body{
    line-height: 1.2; /* 设置行间距为1.2 ,默认是1.6的太大*/
    font-size: 12px;
  }
  .s28 {
    font-size: 28px;
  }
   /*页头部分 开始*/
  .index-top {
    background-color: #f9a71a;
    position: relative;
  }

  .index-topmain-tip {
    color: #fff;
    width: 100%;
    text-align: center;
    padding-top: 15px;
    margin-bottom: 15px;
  }
  .index-topmain-tip p {
    font-size: 14px;
    color: #fcdbb3;
    margin-bottom: 5px;
  }
  .index-topmain-tip p.index-topmain-money {
    font-size: 45px;
    color: #fff;
  }

  ul.index-topbar {
    color: #fff;
    padding-bottom: 15px;
    border-top: 1px solid #fab948;
    padding-top: 15px;
  }
  ul.index-topbar li.index-topbar-left {
    float: left;
    text-align: left;
    margin-left: 15px;
  }
  ul.index-topbar li.index-topbar-right {
    float: right;
    text-align: right;
    margin-right: 15px;
  }
  ul.index-topbar li span {
    color: #fcdbb3;
  }
  ul.index-topbar li p {
    font-size: 24px;
  }
  /*页头部分 结束*/
  .home-grid .weui-grids{
    margin-top: 15px;
    text-align: center;
  }

  .home-grid .weui-grids .weui-grid .weui-grid__label span {
    color: #555;
    display: block;
    margin-top: 5px;
    font-size: 12px;
  }
</style>