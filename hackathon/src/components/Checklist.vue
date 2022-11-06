<template>
<div class="container" style="min-height:80vh">
  <div v-if="score === null" class="survey-remind my-5">
    <h1>Hold on!</h1>
    <h4 > You haven't taken our recommendation survey yet! </h4>
    <!-- <button class="btn btn-primary" @click="toSurvey"> Take our Survey</button> -->
    <button @click="goToSurvey" class="btn btn-outline-light mt-5" style="font-size:1.2em;  margin-left: auto; order: 2;" type="button">
             Let's Get Started
            </button>
  </div>

  <!-- TODO: Preview recomendations -->

    <div v-else class="checklist my-5 p-5">
      <div class="">
        <h1> Some Recommendations</h1>
        <hr></hr>
      </div>
      <div v-for="cat in Object.keys(categories)" :key="cat" class="checklist-cat mb-5">
        <div class="checklist-heading pb-5">{{cat}}<div>

          <div class="container-grid mt-3">

            <div v-for="item in categories[cat]" :key="item.ID"
              class="outer col-4 grid-column" style="background-color:rgb(36 177 66); border-radius: 25px; overflow: hidden;"
              @click="handleCheckBoxState(cat,item.ID)"
              :class=" item.selected ? 'p-1' : 'p-0'
              ">
              <div style="width:100%; height:100%; background:black; border-radius: 25px; overflow: hidden;">
                <img class="image-wrangle" :src="item.image">
              </div>
              <div></div>
              </div>

            </div>

        </div>

          <div class="mt-4">{{selectedOf(cat)}}</div>

        <hr></hr>
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
      let x = localStorage.getItem('extra')
      let hasDog = x.includes('dog')
      // let hasCold = x.includes('cold')

      if (localStorage.getItem('listState') === null) {
        this.items.forEach((item) => {
          if (item['Obj Name'].toLowerCase().includes('dog') && !hasDog) { return }
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

      this.categories = output

      localStorage.setItem('listState', JSON.stringify(output))
      console.log('should have updated?')
    },

    async goToSurvey () {
      await this.$router.push({path: '/survey'})
    },

    selectedOf (cat) {
      let have = []

      let catItems = this.categories[cat]

      catItems.map((item) => {
        if (item.selected) {
          have.push(item['Obj Name'])
        }
      })

      let cnt = have.length
      let outString = cnt ? 'So far you have: ' : ''
      for (let i = 0; i < cnt; i++) {
        outString += have.pop()

        outString += ', '
      }

      return outString.substring(0, outString.length - 2)
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

.checklist{
  background-color: rgba(25,25,25,.4);
  border-radius: 25px;
}

.container-grid{
  display: grid;
  grid-auto-rows: 1fr;
  grid-template-columns: repeat(6, 1fr);
  grid-column-gap: 20px;
  grid-row-gap: 20px;
}

.container-grid .grid-column {
  aspect-ratio: 1;
  width: 100%;
}

.image-wrangle{
  overflow: hidden;
  object-fit: cover;
  width: 100%;
  height: 100%;
}

.tooltip {
  position: relative;
  display: inline-block;
  border-bottom: 1px dotted black;
}

.tooltip .tooltiptext {
  visibility: hidden;
  width: 120px;
  background-color: black;
  color: #fff;
  text-align: center;
  border-radius: 6px;
  padding: 5px 0;
  position: absolute;
  z-index: 1;
  bottom: 150%;
  left: 50%;
  margin-left: -60px;
}

.tooltip .tooltiptext::after {
  content: "";
  position: absolute;
  top: 100%;
  left: 50%;
  margin-left: -5px;
  border-width: 5px;
  border-style: solid;
  border-color: black transparent transparent transparent;
}

.tooltip:hover .tooltiptext {
  visibility: visible;
}
</style>
