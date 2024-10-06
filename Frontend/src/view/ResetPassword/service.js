import axios from 'axios';
import { Alert } from 'react-native';

export const postPasswordReset = async (navigation,newPassword,email) => {
    try {
        const response = await axios.post('https://recipe-app-tlv5.onrender.com/resetPassword', {
            email,
            newPassword,
        });

        if (response.data.status === 'ok') {
            Alert.alert("Success", response.data.data, [
                { text: 'OK', onPress: () => {navigation.navigate('Login')} },
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