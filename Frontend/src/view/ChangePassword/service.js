import AsyncStorage from "@react-native-async-storage/async-storage";
import axios from "axios";
import { Alert } from "react-native";

export const postChangePassword = async (currentPassword,newPassword,navigation) => {
    const newToken = await AsyncStorage.getItem('@userToken');
    const parseToken = JSON.parse(newToken);
    try {
        const response = await axios.post('http://192.168.0.102:5001/changePassword', {
            email: parseToken,
            currentPassword,
            newPassword
        });

        if (response.data.status === 'ok') {
            Alert.alert("Success", response.data.data, [
                { text: 'OK', onPress: () => {navigation.goBack();} },
              ]);
        } 
        else if (response.data.status === 'invalid') {
            Alert.alert("Invalid Credential", response.data.data);
        }
        else if (response.data.status === 'error'){
            Alert.alert("Server Error", response.data.data);
        }
    } 
    catch (error) {
        Alert.alert("Error", error);
    }
};