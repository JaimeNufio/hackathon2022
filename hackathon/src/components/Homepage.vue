<template>
  <div>
  <div class="p-5" style="height:50vh; ">
    <div style="margin-bottom:15vh">
    <h1 style="text-align:left; font-size: 3em;">FyreStartr</h1>
    <h2 style="text-align:left; font-size: 1.2em;">Your first stop towards making your camping trip awesome.</h2>
    </div>
    <div class="">
      <div class="row align-items-md-stretch" style="margin-top:5vh">
        <div class="col-md-6"></div>
        <div class="col-md-6 pr-5">
          <div class=" p-5 text-bg-dark rounded-3 d-flex ">
            <div class="flex-1"></div>
            <!-- <img src="../assets/campfire.jpg" alt="Campfire" style="width:350px" > -->
           <button href="/survey" class="btn btn-outline-light" style="font-size:1.2em;  margin-left: auto; order: 2;" type="button">
             Let's Get Started
            </button>
          </div>
        </div>
      </div>
    </div>
    </div>
    <div class="copy-parent" style="height:60vh;width: 100%;background-color: black;">
      <div class="p-5">
        <div class="d-flex">
          <div class="p-2"><img style=" max-width:400px;border-radius: 25px;" src="../assets/starycampfire.jpeg"/></div>
          <div class="p-3" style="flex:1; text-align: left; position: relative;">
            <div>
              <div style="font-size:1.5em">Find your ideal getaway faster.</div>
              <div style="font-size:1em">So you can start enjoying every monment sooner.</div>
            </div>
            <div style="font-size:1em;flex:1;  position: absolute; bottom: 0; left: 20px;">Get started with our easy camp ground browser ground browser.</div>
          </div>
        </div>
      </div>
    </div>
    <div class="copy-parent" style="height:60vh;width: 100%;background: linear-gradient(49deg, rgba(236,155,8,1) 0%, rgba(212,9,9,1) 53%, rgba(0,0,0,1) 100%);">
      <div class="p-5 ">
        <div class="d-flex">
          <div class="p-3" style="flex:1; text-align: left; position: relative;">
            <div>
              <div style="font-size:1.5em">Spend less time worrying about forgetting something important.</div>
              <div style="font-size:1em">We'll help you make a list of things so you won't forget something you need.</div>
            </div>
            <div style="font-size:1em;flex:1;  position: absolute; bottom: 0; left: 20px;">Our recommendation engine takes into consideration many factors.</div>
          </div>
          <div class="p-2"><img style=" max-width:400px;border-radius: 25px;" src="../assets/think.jpeg"/></div>
        </div>
      </div>
    </div>
    <div class="copy-parent" style="height:60vh;width: 100%;background-color: black;" >
      <div class="p-5 ">
        <div class="d-flex">
          <div class="p-2"><img style=" max-width:400px;border-radius: 25px;" src="../assets/autumn.jpeg"/></div>
          <div class="p-3" style="flex:1; text-align: left; position: relative;">
            <div>
              <div style="font-size:1.5em">Enjoy the season while its still here.</div>
              <div style="font-size:1em">Take advantage of these tools to leverage them into adventure.</div>
            </div>
            <div style="font-size:1em;flex:1;  position: absolute; bottom: 0; left: 20px;">There is no excuse to not take that trip you've been thinking about.</div>
          </div>
        </div>
      </div>
    </div>
    <div class="copy-parent" style="height:60vh;width: 100%;background: rgb(240,79,79);background: linear-gradient(149deg, rgba(240,79,79,1) 0%, rgba(97,36,108,1) 55%, rgba(0,0,0,1) 100%);">
      <div class="p-5 ">
        <div class="d-flex">
                  <div class="p-3" style=" text-align: left; position: relative;">
            <div>
              <div style="font-size:1.5em">Start seeing the world.</div>
              <div style="font-size:1em">You've only got one life. Why waste any moment?</div>
            </div>
            <div style="font-size:1em;flex:1;  position: absolute; bottom: 0; left: 20px;">Starting planning your next adventure today.</div>
          </div>
          <div class="p-2"><img style="flex:1; max-width:400px;border-radius: 25px;" src="../assets/steamhams.jpeg"/></div>

        </div>
      </div>

    </div>
  </div>
</template>

<script>
export default {
  name: 'Homepage',
  data () {
    return {
    }
  },
  created () {
    localStorage.removeItem('score')
    localStorage.removeItem('extra')
    localStorage.removeItem('listItems')
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
h1,
h2 {
  font-weight: normal;
}
ul {
  list-style-type: none;
  padding: 0;
}
li {
  display: inline-block;
  margin: 0 10px;
}

.roundEdge {
  border-radius: 25px;
  padding: 20px;
}

.copy-parent{
  display: flex !important;
  justify-content: center !important;
  align-items: center !important;
}

</style>
