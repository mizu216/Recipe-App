import axios from "axios";
import { Alert } from "react-native";

export const postSendOTP = async (email,navigation) => {
  const userData={
    email:email,
    mode:'reset'
  };
  const response = await axios.post('http://192.168.0.102:5001/send-otp',userData)
    try{
      if (response.data.status==="ok"){
        navigation.navigate('VerifyOTP', { email, mode:'reset'}); 
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