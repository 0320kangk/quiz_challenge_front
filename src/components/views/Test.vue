<template>
  <div>
    <h1>Quiz Question</h1>
    <p>{{ question }}</p>
    <button
      v-for="(option, index) in options"
      :key="index"
      @click="checkAnswer(index)"
    >
      {{ option }}
    </button>
    <svg v-if="isCorrect" viewBox="0 0 100 100" class="circle-animation">
      <circle
        cx="50"
        cy="50"
        r="45"
        stroke="red"
        stroke-width="4"
        fill="none"
      />
    </svg>
  </div>
</template>

<script>
export default {
  name: "test_vue",
  data() {
    return {
      question: "What is the capital of France?",
      options: ["Berlin", "Madrid", "Paris", "Rome"],
      correctAnswer: 2, // Index of the correct answer
      isCorrect: false, // To trigger the animation
    };
  },
  methods: {
    checkAnswer(index) {
      if (index === this.correctAnswer) {
        this.isCorrect = true;
        setTimeout(() => {
          this.isCorrect = false; // Reset the animation state after 1.5 seconds
        }, 1000);
      } else {
        // Handle incorrect answer
        alert("Wrong answer, try again!");
      }
    },
  },
};
</script>

<style scoped>
.circle-animation {
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  width: 100px;
  height: 100px;
}

circle {
  stroke-dasharray: 283;
  stroke-dashoffset: 283;
  animation: drawCircle 1.5s linear forwards;
}

@keyframes drawCircle {
  to {
    stroke-dashoffset: 0;
  }
}
</style>
