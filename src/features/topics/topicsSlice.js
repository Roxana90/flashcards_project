import { createSlice } from "@reduxjs/toolkit";
import { addQuiz } from "../quizzes/quizzesSlice";

export const topicsSlice = createSlice({
  name: "topics",
  initialState: {
    topics: {}
  },
  reducers: {
    addTopic: (state, action) => {
      const { id, name, icon } = action.payload;
      state.topics[id] = {
        id: id,
        name: name,
        icon,
        quizIds: []
      };
    }
  },
 
  extraReducers: (builder) => {
    builder.addCase(addQuiz, (state, action) => {
      if (state.topics[action.payload.topicId] === undefined) {
        console.log(action.payload.topicId, 'no topic selected, no topic quizIds array updated');
        return;
      }
      const quizIdExists = state.topics[action.payload.topicId].quizIds.includes(action.payload.id);
      if (!quizIdExists) {
        state.topics[action.payload.topicId].quizIds.push(action.payload.id);
      } else {
        console.log('quiz id', action.payload.id, 'already exists');
      }
    })
  }
});

export const { addTopic, addQuizIdForTopic } = topicsSlice.actions;
export const selectTopics = (state) => state.topics.topics;
export default topicsSlice.reducer;
