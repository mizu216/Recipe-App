import axios from "axios";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { Alert } from "react-native";

export const postLoginUser = async (email,password,navigation) => {
    const userData={
      email:email,
      password:password
    };
    try{
      const response = await axios.post('https://recipe-app-tlv5.onrender.com/login',userData);
      if (response.data.status==="ok"){
        AsyncStorage.setItem('@userToken',JSON.stringify(email));
        navigation.replace('Tab', {
            screen: 'RecipeList',
        })
      }
      else if (response.data.status==="invalid"){
        Alert.alert('Invalid Credential', response.data.data);
      }
      else if (response.data.status==="error"){
        Alert.alert('Server Error', response.data.data);
      }
    }
    catch(error){
      Alert.alert('Error', error.message);
    }
  };