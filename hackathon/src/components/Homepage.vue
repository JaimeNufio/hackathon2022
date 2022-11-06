<template>
  <div class="container mt-5" style="height:40vh">
    <div style="margin-bottom:15vh">
    <h1 style="text-align:left; font-size: 3em;">FyreStartr</h1>
    <h2 style="text-align:left; font-size: 1.2em;">Your first stop towards making your camping trip awesome.</h2>
    </div>
    <div class="">
      <div class="row align-items-md-stretch" style="margin-top:5vh">
        <div class="col-md-6"></div>
        <div class="col-md-6">
          <div class="h-100 p-3 text-bg-dark rounded-3 d-flex">
            <div class="flex-1" s></div>
            <!-- <img src="../assets/campfire.jpg" alt="Campfire" style="width:350px" > -->
           <button href="/survey" class="btn btn-outline-light float-right" style="font-size:1.2em;  margin-left: auto; order: 2;" type="button">
             Let's Get Started
            </button>
          </div>
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
      msg: 'Start your camping experience with Fyrestart',
      navy: `What the fuck did you just fucking say about me, you little bitch? I'll have you know I graduated top of my class in the Navy Seals, and I've been involved in numerous secret raids on Al-Quaeda, and I have over 300 confirmed kills. I am trained in gorilla warfare and I'm the top sniper in the entire US armed forces. You are nothing to me but just another target. I will wipe you the fuck out with precision the likes of which has never been seen before on this Earth, mark my fucking words. You think you can get away with saying that shit to me over the Internet? Think again, fucker. As we speak I am contacting my secret network of spies across the USA and your IP is being traced right now so you better prepare for the storm, maggot. The storm that wipes out the pathetic little thing you call your life. You're fucking dead, kid. I can be anywhere, anytime, and I can kill you in over seven hundred ways, and that's just with my bare hands. Not only am I extensively trained in unarmed combat, but I have access to the entire arsenal of the United States Marine Corps and I will use it to its full extent to wipe your miserable ass off the face of the continent, you little shit. If only you could have known what unholy retribution your little "clever" comment was about to bring down upon you, maybe you would have held your fucking tongue. But you couldn't, you didn't, and now you're paying the price, you goddamn idiot. I will shit fury all over you and you will drown in it. You're fucking dead, kiddo.`,
      lorem: 'Praesent sed lobortis mi. Suspendisse vel placerat ligula. Vivamus ac sem lacus. Ut vehicula rhoncus elementum. Etiam quis tristique lectus. Aliquam in arcu eget velit pulvinar dictum vel in justo.'
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

</style>
