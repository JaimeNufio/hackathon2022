<template>
  <div class="container">

    <div class="explore px-2 mb-5" >
      <div class="header">
        <div class="mt-4" style="border-radius:10px; overflow: hidden;">
          <img style="max-height:300px; aspect-ratio: 1 !important; border-radius:10px; overflow: hidden;" :src="camp.image_url"/>
        </div>
        <div class="heading">
          <div style="font-size:2.5em" class="mr-5">{{camp.name}}</div>
          <div style="font-size:1.5em">{{camp.location.city}}, {{camp.location.state}}</div>
          <div style="font-size:1.2em">Rating: <span  v-for="i in new Array(Math.floor(camp.rating))" :key="i">⭐</span></div>
          <div class="pt-5">
            <p style="line-height:5px" v-for="line in camp.location.display_address" :key="line">{{line}}</p>
            <p v-if="Object.keys(camp).includes('phone')">{{camp.phone}}</p>
            <p v-else style="font-style:italic">No phone number listed.</p>
          </div>
        </div>
      </div>
    </div>
    <div style="font-size:1.5em;text-align:left; margin-bottom: 20px;">Testimonals:</div>
    <div class="reviews mb-5" style="min-height:40vh">
        <div class="mt- review p-3 mb-3" v-for="review in reviews" :key="review.id">
          <div style="text-align:left; font-style: italic;">"<a :href="review.url">"{{review.text}}"</a></div>
          <div  style="text-align:right; font-style: italic;">- {{review.user.name}}, <span  v-for="i in new Array(Math.floor(review.rating))" :key="i">⭐</span></div>
        </div>
      </div>
  </div>
</template>

<script>
import axios from 'axios'
export default {
  name: 'Explore',
  data () {
    return {
      parkName: 'ah',
      msg: 'Welcome to Your Vue.js App',
      id: '',
      camp: {},
      reviews: {}
    }
  },
  async mounted () {
    this.id = this.getId()
    await this.loadCampGround()
  },
  methods: {
    getId () {
      return this.$route.path.split('/')[2]
    },
    async loadCampGround () {
      const fetchedData = (
        await axios.get(`http://localhost:3030/specificCG/${this.id}`

        )).data

      this.camp = fetchedData.business
      this.reviews = fetchedData.reviews.reviews
    }
  }
}
</script>

<style scoped>

a{
  color:white
}
.header{
  text-align: left;
  display: flex;
}

.heading{
  padding:25px;
}

.review{
  border-radius: 5px;
  background-color: rgb(25,25,25,.5);

}
</style>
