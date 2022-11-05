<template>
    <div class="about">
        <h1>Browse Camp Ground</h1>
        <input class="text"></input>

        <div class="container">
          <div class="row mt-5">
            <div v-for="camp in campgrounds" :key="camp.id" class="card col-6">
              <img :src="camp.image_url"></img>
            </div>
        </div>
        </div>
    </div>
</template>

<script>
import axios from 'axios'
export default {
  name: 'Browse',
  data () {
    return {
      campgrounds: []
    }
  },
  created () {
    this.fetchCampGrounds()
  },

  methods: {
    async fetchCampGrounds () {
      this.campgrounds = (await axios.get('http://localhost:3030/CampGrounds')).data.businesses
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
</style>
