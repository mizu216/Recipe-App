import AsyncStorage from "@react-native-async-storage/async-storage";
import axios from "axios";
import { Alert } from "react-native";

export const postRegister = async (email,password,otp,navigation) => {
    const userData={
      email:email,
      password:password,
      otp:otp,
    };
    const response = await axios.post('https://recipe-app-tlv5.onrender.com/register',userData);
    try{
      if (response.data.status==="ok"){
        AsyncStorage.setItem('@userToken',JSON.stringify(email));
        navigation.replace('Tab', {
            screen: 'RecipeList',
        })
      }
      else if (response.data.status==="invalid"){
        Alert.alert('Error', response.data.data);
      }
      else if (response.data.status==="error"){
        Alert.alert('Server Error', response.data.data);
      }
    }
    catch(error){
      Alert.alert('Error', error);
    }
};

export const postVerifyReset = async (email,otp,navigation) => {
  const userData={
    email:email,
    otp:otp,
  };
  const response = await axios.post('https://recipe-app-tlv5.onrender.com/verify-reset',userData);
  try{
    if (response.data.status==="ok"){
      navigation.navigate('ResetPassword', { email }); 
    }
    else if (response.data.status==="invalid"){
      Alert.alert('Error', response.data.data);
    }
    else if (response.data.status==="error"){
      Alert.alert('Server Error', response.data.data);
    }
  }
  catch(error){
    Alert.alert('Error', error);
  }
};

export const postSendOTP = async (email,mode) => {
    const userData={
      email:email,
      mode:mode
    };
    const response = await axios.post('https://recipe-app-tlv5.onrender.com/send-otp',userData)
      try{
        if (response.data.status==="ok"){
            Alert.alert('Sucess', 'OTP has resend');
        }
        else if (response.data.status==="exist"){
          Alert.alert('Error', response.data.data);
        }
        else if (response.data.status==="error"){
          Alert.alert('Server Error', response.data.data);
        }
      }
      catch(error){
        Alert.alert('Error', error);
      }
  };