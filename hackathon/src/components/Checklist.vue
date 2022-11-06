<template>
<div class="container">
  <div v-if="score === null" class="survey-remind mb-5">
    <h1>Hold on!</h1>
    <h4 > You haven't taken our recommendation survey yet! </h4>
    <button class="btn btn-primary" @click="toSurvey"> Take our Survey</button>

    <!-- TODO: Preview recomendations -->

    <div class="checklist">
      <div>

      </div>
    </div>
  </div>

</div>
</template>

<script>
import items from '../../api/better_camp_equipment.js'

export default ({
  data () {
    return {
      score: null,
      items: null,
      categories: {}
    }
  },

  mounted () {
    this.getScore()
    this.items = items.items
    this.sortItems()
  },

  methods: {
    getScore () {
      this.score = localStorage.getItem('score')
    },

    async toSurvey (camp) {
      await this.$router.push({
        name: 'Survey'
      })
    },

    async sortItems () {
      // console.log(items)
      this.items.forEach((item) => {
        console.log(item)
        if (this.score && item['Necessity Level'] > this.score) { return }
        if (!Object.keys(this.categories).includes(item.Category)) {
          this.categories[item.Category] = []
        }
        this.categories[item.Category].push(item)
      })
    }
  }
})
</script>

<style>
.survey-remind{
  text-align: left;
}
</style>
