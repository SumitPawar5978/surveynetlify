import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  count: 0,
  selectedLanguage: null,
  userDetails: null,
  formData: {},
  userId: null,
  isHead:false,
  isRegistration: false,
  selectedHeadCode:null,
  questionCollection:{},
  requestData:{}
};

const reducer = createSlice({
  name: 'reducer',
  initialState,
  reducers: {
    setCount: (state, action) => {
      state.count = action.payload;
    },
    setSelectedLanguage: (state, action) => {
      state.selectedLanguage = action.payload;
    },
    setUserDetails: (state, action) => {
      state.userDetails = action.payload;
    },
    setRegistrationData: (state, action) => {
      state.formData = action.payload;
    },
    setUserId: (state, action) => {
      state.userId = action.payload;
    },
    setIsHead: (state, action) => {
      state.isHead = action.payload;
    },
    setIsRegistration: (state, action) => {
      state.isRegistration = action.payload;
    },
    setSelectedHeadCode: (state, action) => {
      state.selectedHeadCode = action.payload;
    },
    setQuestionCollection: (state, action) => {
      state.questionCollection = action.payload;
    },
    setRequestData: (state, action) => {
      state.requestData = action.payload;
    },
  },
});

export const { setCount, setSelectedLanguage, setUserDetails, setRegistrationData, setUserId, setIsHead, setIsRegistration, setSelectedHeadCode,setQuestionCollection, setRequestData } = reducer.actions;
export default reducer.reducer;
