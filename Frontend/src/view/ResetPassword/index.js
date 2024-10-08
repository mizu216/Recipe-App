import { observer } from 'mobx-react';
import React, { useState } from 'react';
import { View, Text, ScrollView, StyleSheet, TouchableOpacity, Alert } from 'react-native';
import { TextInput } from 'react-native-paper';
import styles from "./style";
import { postPasswordReset } from './service';

const ResetPassword = observer(({ navigation, route}) => {
    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const [secureTextEntry1, setSecureTextEntry1] = useState(true);
    const [secureTextEntry2, setSecureTextEntry2] = useState(true);
    const user = route.params;
    console.log(route.params);
    const handleSubmit = () => {
        if (password.length<8)
        {
            Alert.alert("Invalid Password Format","Please make sure your password length is more than 8.")
        }
        else if(password!==confirmPassword){
            Alert.alert("Invalid Confirm Password","Please make sure your password same with confirm password.")
        }
        else{
            postPasswordReset(navigation,password,user.email)
        }
    };

    return (
        <View style={styles.pageContainer}>
            <View style={styles.textInputContainer}>
                <TextInput
                    label="Password"
                    value={password}
                    onChangeText={text => setPassword(text)}
                    mode="outlined"
                    style={{ marginHorizontal: 20, marginTop: 20}}
                    underlineColor="transparent"
                    outlineColor='black'
                    activeOutlineColor='black'
                    right={
                    <TextInput.Icon
                        icon={secureTextEntry1 ? "eye-off" : "eye"}
                        onPress={() => setSecureTextEntry1(!secureTextEntry1)}
                    />
                    }
                    left={
                        <TextInput.Icon icon="lock-outline"/>
                    }
                    secureTextEntry={secureTextEntry1}
                />
                <TextInput
                    label="Confirm Password"
                    value={confirmPassword}
                    onChangeText={text => setConfirmPassword(text)}
                    mode="outlined"
                    style={{ marginHorizontal: 20, marginTop: 20}}
                    underlineColor="transparent"
                    outlineColor='black'
                    activeOutlineColor='black'
                    right={
                    <TextInput.Icon
                        icon={secureTextEntry2 ? "eye-off" : "eye"}
                        onPress={() => setSecureTextEntry2(!secureTextEntry2)}
                    />
                    }
                    left={
                        <TextInput.Icon icon="lock-outline"/>
                    }
                    secureTextEntry={secureTextEntry2}
                />
            </View>
            <View style={styles.nextButtonContainer}>
                <TouchableOpacity style={styles.nextButton} onPress={handleSubmit}>
                    <Text style={styles.nextButtonText}>Next</Text>
                </TouchableOpacity> 
            </View>
        </View>
    );
});

export default ResetPassword;