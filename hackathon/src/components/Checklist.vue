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

export default ({
  import json from '../../api/better_camp_equipment.json'
  data () {
    return {
      score: null,
      categories: []
    }
  },

  mounted () {
    this.getScore()
  },

  methods: {
    getScore () {
      this.score = localStorage.getItem('score')
    },

    async toSurvey (camp) {
      await this.$router.push({
        name: 'Survey'
      })
    }

    async sortToCategories{

    }
  }
})
</script>

<style>
.survey-remind{
  text-align: left;
}
</style>
