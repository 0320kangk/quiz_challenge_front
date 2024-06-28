const state = {
    quizType : ["CHOICE_5", "OX"],
    oxMap: { 0: "O", 1: "X" },
}
const getters = {
    getChoice_5(state) {
      return state.quizType[0];
    },
    getOX(state) {
        return state.quizType[1];
    },
    getOXAnswer: (state) => (key) => {
        return state.oxMap[key];
      }

}
export default {
    state,
    getters,
}