import axios from "axios";
import { Alert } from "react-native";

export const postRegister = async (email,password,otp,navigation) => {
    const userData={
      email:email,
      password:password,
      otp:otp,
    };
    const response = await axios.post('http://192.168.0.102:5001/register',userData);
    try{
      if (response.data.status==="ok"){
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

export const postSendOTP = async (email,mode) => {
    const userData={
      email:email,
      mode:mode
    };
    const response = await axios.post('http://192.168.0.102:5001/send-otp',userData)
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