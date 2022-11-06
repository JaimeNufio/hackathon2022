<template>
  <div class="campsites">
    <div class="container ">
      <div class="heading thisFont text-left">
        <h1>Before We Started...</h1>
        <div>Can you answer a few questions for us?</div>
      </div>
    </div>

    <div class="mt-5 question-box">
      <div class="question">{{ questions[current.questionIndex].question}}</div>
      <div class="row">
        <button
          @click="processAnswer(answer)"
          class="col answer"
          v-for="answer in questions[current.questionIndex].options"
          :key="answer">
            {{ answer }}
        </button>
      </div>
    </div>
  </div>
</template>

<script>
export default{
  data () {
    return {
      questions: [
        // conditions (expect wet/cold)
        //
        {
          'question': 'Have you been camping before?', // experience?
          'options': ['Yes', 'No'],
          'scoreDelta': [0, 1],
          'answer': -1
        },
        {
          'trigger': 0,
          'question': 'How seasoned of a camper are you?',
          'options': ['Once', 'A few times', 'regularly'],
          'scoreDelta': [1, 0.25, 0],
          'answer': -1

        },
        {
          'question': 'How long do you plan to stay??', // length?
          'options': ['A day', 'A weekend', 'A week or more'],
          'scoreDelta': [0, 0.5, 1],
          'answer': -1
        },
        {
          'question': 'Are you bringing a dog?', // dog?
          'options': ['Yes', 'No'],
          'special': [true, false],
          'recommend': 'dog',
          'answer': -1
        },
        {
          'question': 'Do you forsee wet/cold conditions?', // dog?
          'options': ['Yes', 'Maybe', 'No'],
          'special': [true, true, false],
          'recommend': 'cold',
          'answer': -1
        },
        {
          'question': 'Are you on a budget?', // budget?
          'options': ['Yes', 'No'],
          'special': [true, false],
          'scoreDelta': [-0.5, 0],
          'answer': -1
        }
      ],
      current: {
        questionIndex: 0,
        subQuestionIndex: -1,
        score: 3,
        extra: ''
      }
    }
  },
  methods: {
    async processAnswer (ans) {
      // question option index
      const currentQuestion = this.questions[this.current.questionIndex]
      const index = currentQuestion.options.indexOf(ans)

      if (Object.keys(currentQuestion).includes('scoreDelta')) {
        console.log('ah')
        const scoreDelta = currentQuestion.scoreDelta[index]
        this.current.score += scoreDelta
      }

      if (Object.keys(currentQuestion).includes('special') && currentQuestion.special[index]) {
        this.current.extra += currentQuestion.recommend + ' '
      }

      this.questions[this.current.questionIndex].answer = ans

      if (this.current.questionIndex < this.questions.length - 1) {
        this.current.questionIndex += 1
      } else {
        localStorage.setItem('score', this.current.score)
        console.log('current score', this.current.score)
        await this.nextRouter()
      }
    },

    async nextRouter () {
      console.log(this.$router)
      await this.$router.push({
        name: 'Browse',
        params: {
          score: this.current.score,
          recommend: this.current.extra
        }
      })
    }
  }
}
</script>

<style>

.question-box{
  margin:auto;
  width:500px;
  height: 100px;
}

.answer{
  border-radius: 5px;
  border-style: solid;
  border-color: black;
  padding: 5px;
  margin:5px;
}

.question{
  font-size: 1.5em;
  margin-bottom:5px;
}

</style>
