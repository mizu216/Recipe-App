import axios from "axios";
import { Alert } from "react-native";

export const postSendOTP = async (email,navigation,password) => {
  const userData={
    email:email,
    mode:'create'
  };
  const response = await axios.post('https://recipe-app-tlv5.onrender.com/send-otp',userData)
    try{
      if (response.data.status==="ok"){
        navigation.navigate('VerifyOTP', { email, password, mode:'create'}); 
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