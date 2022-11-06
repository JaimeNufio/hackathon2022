<template @scroll="onScroll">
    <div class="about" >
        <h1>Browse Camp Ground</h1>

      <div id="app">
  <div class="list-group-wrapper">
    <transition name="fade">
      <div class="loading" v-show="loading">
        <span class="fa fa-spinner fa-spin"></span> Loading
      </div>
    </transition>

    <div class="list-group " id="infinite-list">
          <div class="row scroll text-align-center">
      <div v-for="camp in campgrounds" :key="camp.id" class="card no-pad">
              <img :src="camp.image_url"></img>
              <div class="label-item">
                <div>{{camp.name}}</div>
                <div>{{`${camp.location.city}, ${camp.location.state}`}}</div>
              </div>
        </div>
        </div>
    </div>
  </div>
</div>

    </div>
</template>

<script>
import axios from 'axios'

export default {
  name: 'Browse',
  el: '#app',
  data () {
    return {
      loading: false,
      nextItem: 1,
      items: [],

      //
      campgrounds: [],
      offset: 0,
      hasScrolledToBottom: false,
      isVisible: false
    }
  },

  created () {
    this.fetchCampGrounds()
  },

  mounted () {
    // Detect when scrolled to bottom.
    const listElm = document.querySelector('#infinite-list')
    listElm.addEventListener('scroll', e => {
      if (listElm.scrollTop + listElm.clientHeight >= listElm.scrollHeight) {
        this.loadMore()
      }
    })

    // Initially load some items.
    // this.loadMore()
  },

  methods: {
    async fetchCampGrounds () {
      const camps = (
        await axios.get(`http://localhost:3030/campgrounds`,
          {params: {offset: this.offset}}
        )
      ).data.businesses
      this.campgrounds.push(...camps)
    },

    loadMore () {
      this.loading = true
      setTimeout(e => {
        this.offset += 1
        this.fetchCampGrounds()
        // for (var i = 0; i < 20; i++) {
        //   this.items.push('Item ' + this.nextItem++)
        // }
        console.log('ah')
        this.loading = false
      }, 200)
    }
  }
}

</script>

<style scoped>
img {
  object-fit: cover;
  /* width: 230px; */
  height: 230px;
}

.no-pad{
  padding: 0 !important;
}

.scroll-fix{
  height: 200px;
  width:100%;
}

.label-item{
  position:absolute;
  bottom: 0px;
  height: 50px;
  width:100%;

  padding-left:10px;
  background: rgba(0, 0, 0, .4);
  color: black;
}

.label-item img:hover {
  background: #0a2540;
  opacity: 0.95;
  transition: 0.3s ease-in-out;
  color: #FFF;
}

.label-item > div{
  text-align: left;
  margin: 0;
  width: 100%;
  text-overflow: ellipsis;
  color: white;
  white-space: nowrap;
  overflow: hidden;
  opacity: 100% !important;
}

body {
  /* background-color: $purple; */
  /* padding: 50px; */
}
.container {
  /* padding: 40px 80px 15px 80px; */
  background-color: #fff;
  border-radius: 8px;
  max-width: 800px;

}

  h1 .heading {
    background: -webkit-linear-gradient(#fff, #999);
    -webkit-text-fill-color: transparent;
    -webkit-background-clip: text;
    text-align: center;
    margin: 0 0 5px 0;
    font-weight: 900;
    font-size: 4rem;
    color: #fff;
  }
  h4 .heading {
    color: lighten(#5c3d86,30%);
    text-align: center;
    margin: 0 0 35px 0;
    font-weight: 400;
    font-size: 24px;
  }

.list-group-wrapper {
  position: relative;
  margin:auto;
  height: 100vh;
}
.list-group {
  overflow: auto;
  height: 85vh;
  border: 2px solid #dce4ec;
  border-radius: 5px;
}
.list-group-item {
  margin-top: 1px;
  border-left: none;
  border-right: none;
  border-top: none;
  border-bottom: 2px solid #dce4ec;
}
.loading {
  text-align: center;
  position: absolute;
  color: #fff;
  z-index: 9;
  padding: 8px 18px;
  border-radius: 5px;
  left: calc(50% - 45px);
  top: calc(50% - 18px);
}

.fade-enter-active, .fade-leave-active {
  transition: opacity .5s
}
.fade-enter, .fade-leave-to {
  opacity: 0
}

.inifinite-list{
  height: 100vh;
}
</style>
