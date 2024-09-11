// import axios from "axios";
import {
    BASEURL,
    GETCITY,
    GETCOLLEGELIST,
    GETDISTRICT,
    GETMEDICALSPECIALITY,
    GETSTATE,
    GETVILLAGES,
    LOGIN,
    LOGOUT,
    SENDOTP,
    UPDATEADDRESSDETAIL,
    VERIFYOTP,
    FORGETPASSWORD,
    VERIFYFORGOTPASSWORDOTP,
    UPDATEPASSWORD,
    GETALLOCATEDTESTTOHEAD,
    GETUSERREQUEST,
    UPDATEUSERTESTREQUEST,
    APPLYFORTEST,
    GETTESTQUESTIONDETAIL,
    SUBMITTESTQUESTION
  } from "./api";
  import origin from "axios";
  export const axios = origin.create({
    baseURL: BASEURL,
  });
  
  console.log(BASEURL)
  export const loginAxios = async (params) => {
    const res = await axios.post(LOGIN, params);
    return res;
  };
  

  export const sendOtp =async(params)=>{
    try {
      const res=await axios.post(SENDOTP,params);
      console.log(res)   
      return res;
    } catch (error) {
      console.log('error',error)
    }
  }

  export const verifyOTP =async(params)=>{
    try {
      const res=await axios.post(VERIFYOTP,params);
      console.log(res)   
      return res;
    } catch (error) {
      console.log('error',error)
    }
  }
  export const updateAddressDetail =async(params)=>{
    try {
      const res=await axios.post(UPDATEADDRESSDETAIL,params);
      console.log(res)   
      return res;
    } catch (error) {
      console.log('error',error)
    }
  }
  export const forgetPassword =async(params)=>{
    try {
      const res=await axios.post(FORGETPASSWORD,params);
      console.log(res)   
      return res;
    } catch (error) {
      console.log('error',error)
    }
  }
  export const updatePassword =async(params)=>{
    try {
      const res=await axios.post(UPDATEPASSWORD,params);
      console.log(res)   
      return res;
    } catch (error) {
      console.log('error',error)
    }
  }
  export const verifyForgotPasswordOtp =async(params)=>{
    try {
      const res=await axios.post(VERIFYFORGOTPASSWORDOTP,params);
      console.log(res)   
      return res;
    } catch (error) {
      console.log('error',error)
    }
  }

  export const getState =async()=>{
    try {
      const res=await axios.get(GETSTATE);
      return res;
    } catch (error) {
      console.log('error',error)
    }
  }
  
  export const getDistrict =async(state_id)=>{
    try {
      const res=await axios.get(GETDISTRICT+'/'+state_id);
      console.log(res,'resss getDistrict')   
      return res;
    } catch (error) {
      console.log('error',error)
    }
  }
  export const getCity =async(district_id)=>{
    try {
      const res=await axios.get(GETCITY+'/'+district_id);
      console.log(res,'resss getCity')   
      return res;
    } catch (error) {
      console.log('error',error)
    }
  }
  export const getVillages =async(city_id)=>{
    try {
      const res=await axios.get(GETVILLAGES+'/'+city_id);
      console.log(res,'resss getVillages')   
      return res;
    } catch (error) {
      console.log('error',error)
    }
  }
  export const getMedicalSpeciality =async()=>{
    try {
      const res=await axios.get(GETMEDICALSPECIALITY);
      console.log(res,'resss getMedicalSpeciality')   
      return res;
    } catch (error) {
      console.log('error',error)
    }
  }
  export const getCollegeList = async (cityId, medicalSpecialtyId) => {
    try {
      const res = await axios.post(GETCOLLEGELIST, { city_id: cityId, medical_speciality_id: medicalSpecialtyId });
      console.log(res, 'resss getCollegeList');
      return res;
    } catch (error) {
      console.log('Error fetching college list:', error);
      throw error; 
    }
  };
  

  export const getAllocatedTestToHead =async()=>{
    try {
      const res=await axios.get(GETALLOCATEDTESTTOHEAD);
      console.log(res,'resss getAllocatedTestToHead')   
      return res;
    } catch (error) {
      console.log('error',error)
    }
  }
  export const getUserRequest =async(params)=>{
    try {
      const res=await axios.post(GETUSERREQUEST,params);
      console.log(res)   
      return res;
    } catch (error) {
      console.log('error',error)
    }
  }
  export const updateUserTestRequestStatus =async(params)=>{
    try {
      const res=await axios.post(UPDATEUSERTESTREQUEST,params);
      console.log(res)   
      return res;
    } catch (error) {
      console.log('error',error)
    }
  }
  export const applyForTest =async(params)=>{
    try {
      const res=await axios.post(APPLYFORTEST,params);
      console.log(res)   
      return res;
    } catch (error) {
      console.log('error',error)
    }
  }
  export const getTestQuestionDetail =async(params)=>{
    try {
      const res=await axios.post(GETTESTQUESTIONDETAIL,params);
      console.log(res)   
      return res;
    } catch (error) {
      console.log('error',error)
    }
  }
  export const submitTestQuestion =async(params)=>{
    try {
      const res=await axios.post(SUBMITTESTQUESTION,params);
      console.log(res)   
      return res;
    } catch (error) {
      console.log('error',error)
    }
  }
 
  
  export const logout =async(params)=>{
    try {
      const res=await axios.get(LOGOUT,params);
      console.log(res)   
      return res;
    } catch (error) {
      console.log('error',error)
    }
  }
  
  axios.interceptors.request.use(
    async (config) => {
     
      const user = await localStorage.getItem("userDetails");
      if (user !== null) {
        const token = JSON.parse(user).token;
        if (token) {
          config.headers["Authorization"] = "Bearer " + token;
        }
      }
  
      return config;
    }
    // async (error) => {
    //     Promise.reject(error);
    //     await store.dispatch(stoploading());
    //     await store.dispatch(
    //         setSnackbar({
    //             open: false,
    //             msg: "something went wrong",
    //             sevarity: "error",
    //         })
    //     );
    // }
  );
  export default axios;
  