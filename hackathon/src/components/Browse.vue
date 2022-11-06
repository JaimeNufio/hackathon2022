<template @scroll="onScroll">
    <div class="about" >
      <div class="my-5">
        <h1>Find A Camp!</h1>
        <h5>Click on an image to see reviews and more information.</h5>
      </div>

      <div v-if="campgrounds"  id="app">
  <div class="list-group-wrapper">
    <transition name="fade">
      <div class="loading" v-show="loading">
        <span class="fa fa-spinner fa-spin"></span> Loading
      </div>
    </transition>

    <div class="list-group" id="infinite-list">
      <div class="row scroll text-align-center">
        <div v-for="camp in campgrounds" :key="camp.id" class="col-4 card no-pad"  @click="goToRecommendations(camp)">
          <img :src="camp.image_url || 'https://upload.wikimedia.org/wikipedia/commons/e/e7/Everest_North_Face_toward_Base_Camp_Tibet_Luca_Galuzzi_2006.jpg'"></img>
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
  el: null,
  data () {
    return {
      loading: false,
      nextItem: 1,
      items: [],

      //
      campgrounds: [],
      offset: 0,
      hasScrolledToBottom: false,
      isVisible: false,
      knownMax: 0
    }
  },

  created () {
    this.fetchCampGrounds()
  },

  onMounted () {
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
      const fetchedData = (
        await axios.get(`http://localhost:3030/campgrounds`,
          {params: {offset: this.offset}}
        )).data

      console.log(fetchedData)
      this.knownMax = fetchedData.total

      this.campgrounds.push(...fetchedData.businesses)
    },

    async goToRecommendations (camp) {
      await this.$router.push({
        path: `explore/${camp.id}`,
        params: {
          score: this.$route.params.score,
          recommend: this.$route.params.recommend,
          camp: camp
        }
      })
    },

    loadMore () {
      this.loading = true
      setTimeout(e => {
        if (this.offset * 5 > this.campgrounds.length) { return } else {
          this.offset += 1
          this.fetchCampGrounds()
        }

        // for (var i = 0; i < 20; i++) {
        //   this.items.push('Item ' + this.nextItem++)
        // }
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
    color: rgb(0, 0, 0);
  }
  h4 .heading {
    text-align: center;
    margin: 0 0 35px 0;
    font-weight: 400;
    font-size: 24px;
  }

.list-group-wrapper {
  position: relative;
  margin:50px;
  height: 100vh;
}
.list-group {
  overflow: auto;
  height: 85vh;
  border: 2px solid #000000;
  border-radius: 5px;
}
.list-group-item {
  margin-top: 1px;
  border-left: none;
  border-right: none;
  border-top: none;
  border-bottom: 2px solid #000000;
}
.loading {
  text-align: center;
  position: absolute;
  color: rgb(0, 0, 0);
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
