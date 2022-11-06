<template>
  <div class="campsites container my-5">
    <div
      style="background-color:rgba(25,25,25,.4);border-radius: 25px;"
      class="margin-auto p-5 pb-2"
    >
      <div class="container">
        <div class="heading thisFont text-left">
          <h1>Before We Started...</h1>
          <div>Can you answer a few questions for us?</div>
        </div>
      </div>

      <div class="mt-5 question-box">
        <div class="question">
          {{ questions[current.questionIndex].question }}
        </div>
        <div class="row">
          <!-- <button
          @click="processAnswer(answer)"
          class="col answer"
          v-for="answer in questions[current.questionIndex].options"
          :key="answer">
            {{ answer }}
        </button> -->

          <button
            v-for="answer in questions[current.questionIndex].options"
            :key="answer"
            @click="processAnswer(answer)"
            class="btn btn-outline-light col ans m-2"
            style="font-size:1.2em;  margin-left: auto; order: 2;"
            type="button"
          >
            {{ answer }}
          </button>
        </div>
        <br />
        <img style="min-width:400px; max-width:500px; :1" :src="currentImage" />
      </div>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      questions: [
        // conditions (expect wet/cold)
        //
        {
          question: "Have you ever been camping before?", // experience?
          options: ["Yes", "No"],
          scoreDelta: [0, 1],
          answer: -1,
          img: "genericcamp-removebg.png"
        },
        {
          trigger: 0,
          question: "How seasoned of a camper are you?",
          options: ["Not Very", "Casual", "Expert"],
          scoreDelta: [1, 0.25, 0],
          answer: -1,
          img: "experience-removebg.png"
        },
        {
          question: "How long do you plan to stay?", // length?
          options: ["A day", "A weekend", "A week or more"],
          scoreDelta: [0, 0.5, 1],
          answer: -1,
          img: "howlong-removebg.png"
        },
        {
          question: "Are you bringing a dog?", // dog?
          options: ["Yes", "No"],
          special: [true, false],
          recommend: "dog",
          answer: -1,
          img: "dog-removebg.png"
        },
        {
          question: "Do you forsee wet/cold conditions?", // dog?
          options: ["Yes", "Maybe", "No"],
          special: [true, true, false],
          recommend: "cold",
          answer: -1,
          img: "cold-removebg.png"
        },
        {
          question: "Are you on a budget?", // budget?
          options: ["Yes", "No"],
          special: [true, false],
          scoreDelta: [-0.5, 0],
          answer: -1,
          img: "budget-removebg.png"
        }
      ],
      current: {
        questionIndex: 0,
        subQuestionIndex: -1,
        score: 2,
        extra: ""
      }
    };
  },
  methods: {
    async processAnswer(ans) {
      // question option index
      const currentQuestion = this.questions[this.current.questionIndex];
      const index = currentQuestion.options.indexOf(ans);

      if (Object.keys(currentQuestion).includes("scoreDelta")) {
        console.log("ah");
        const scoreDelta = currentQuestion.scoreDelta[index];
        this.current.score += scoreDelta;
      }

      if (
        Object.keys(currentQuestion).includes("special") &&
        currentQuestion.special[index]
      ) {
        this.current.extra += currentQuestion.recommend + " ";
      }

      this.questions[this.current.questionIndex].answer = ans;

      if (this.current.questionIndex < this.questions.length - 1) {
        this.current.questionIndex += 1;
      } else {
        localStorage.removeItem("score");
        localStorage.removeItem("extra");
        localStorage.removeItem("listState");

        localStorage.setItem("score", this.current.score);
        localStorage.setItem("extra", this.current.extra);
        console.log("current score", this.current.score);
        await this.nextRouter();
      }
    },

    async nextRouter() {
      console.log(this.$router);
      await this.$router.push({
        name: "Checklist",
        params: {
          score: this.current.score,
          recommend: this.current.extra
        }
      });
    }
  },
  computed: {
    currentImage: {
      get() {
        return require("../assets/" +
          this.questions[this.current.questionIndex].img);
      }
    }
  }
};
</script>

<style>
.question-box {
  margin: auto;
  width: 500px;
  min-height: 60vh;
}

.answer {
  border-radius: 5px;
  border-style: solid;
  border-color: black;
  padding: 5px;
  margin: 5px;
}

.question {
  font-size: 1.5em;
  margin-bottom: 5px;
}
</style>
