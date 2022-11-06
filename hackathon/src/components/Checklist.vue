<template>
<div class="container">
  <div v-if="score === null && categories.length === 0" class="survey-remind my-5">
    <h1>Hold on!</h1>
    <h4 > You haven't taken our recommendation survey yet! </h4>
    <button class="btn btn-primary" @click="toSurvey"> Take our Survey</button>
  </div>

  <!-- TODO: Preview recomendations -->

    <div class="checklist my-5">
      <div>
        <h1> Some Recommendations</h1>
      </div>
      <div v-for="cat in Object.keys(categories)" :key="cat" class="checklist-cat mb-5">
        <div class="checklist-heading">{{cat}}<div>
        <div v-for="item in categories[cat]" :key="item.ID" class="flex">
          <input :checked="item.selected" @click="handleCheckBoxState(cat,item.ID)" type="checkbox"></input>
          <div class="checklist-item">{{item['Obj Name']}}</div>
        </div>
      </div>
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
      if (localStorage.getItem('listState') === null) {
        this.items.forEach((item) => {
          console.log(item)
          if (this.score && item['Necessity Level'] > this.score) { return }
          if (!Object.keys(this.categories).includes(item.Category)) {
            this.categories[item.Category] = []
          }
          item.selected = false
          this.categories[item.Category].push(item)
        })
        localStorage.setItem('listState', JSON.stringify(this.categories))
      } else {
        this.categories = JSON.parse(localStorage.getItem('listState'))
        console.log(this.categories)
      }
    },

    // grab local storage
    // update fetched
    // store fetched
    async handleCheckBoxState (cat, itemID) {
      let fetched = JSON.parse(localStorage.getItem('listState'))

      const catNames = Object.keys(fetched)
      console.log('catNames', catNames)

      let categoryFocus = fetched[cat].map((item) => {
        console.log(item.ID, itemID)
        // return (parseInt(item.ID) === parseInt(itemId)) ? {selected: !item.selected, ...item} : item
        if (parseInt(item.ID) === parseInt(itemID)) {
          console.log('Targeted', item['Obj Name'])
          let tempItem = item
          tempItem.selected = !tempItem.selected
          return tempItem
        } else {
          return item
        }
      })

      let listOut = Object.keys(fetched).map((category) => {
        if (cat === category) {
          return categoryFocus
        } else {
          return fetched[category]
        }
      })

      let output = {}
      for (let i = 0; i < Object.keys(fetched).length; i++) {
        output[catNames[i]] = listOut[i]
      }

      localStorage.setItem('listState', JSON.stringify(output))
      console.log('should have updated?')
    }
  }
})

</script>

<style>
.survey-remind{
  text-align: left;
}

.flex{
  display: flex;
}

.flex input{
  margin-right: 10px;
}

.checklist-cat{
  text-align: left;
}

.checklist-heading{
  font-size: 1.3em;
}

.checklist-item{
  font-size:1em;
}
</style>
