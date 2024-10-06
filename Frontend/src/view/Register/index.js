import { observer } from 'mobx-react';
import React, { useState } from 'react';
import { View, Text, ScrollView, StyleSheet, TouchableOpacity, Image, Alert } from 'react-native';
import { TextInput } from 'react-native-paper';
import colors from '../../themes/colors';
import images from '../../themes/images';
import { postSendOTP } from './service';
import styles from "./style";

const Register = observer(({ navigation }) => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const [secureTextEntry1, setSecureTextEntry1] = useState(true);
    const [secureTextEntry2, setSecureTextEntry2] = useState(true);

    const validateEmail = (email) => {
        const regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        return regex.test(email);
    };



    const handleSubmit = () => {
        if (!validateEmail(email)) {
            Alert.alert("Invalid Email Format","Please enter an existed email.")
        } 
        else if (password.length<8)
        {
            Alert.alert("Invalid Password Format","Please make sure your password length is more than 8.")
        }
        else if(password!==confirmPassword){
            Alert.alert("Invalid Confirm Password","Please make sure your password same with confirm password.")
        }
        else{
            postSendOTP(email,navigation,password);
        }
    };


    return (
        <View style={styles.pageContainer}>
            <Image source={images.loginImage} style={styles.registerImage} resizeMode='contain' />
            <TextInput
                label="Email"
                value={email}
                onChangeText={text => setEmail(text)}
                mode="outlined" // Use 'flat' to disable the outline
                style={{marginHorizontal:20,marginTop:20}}
                underlineColor="transparent" // Optional: Removes the underline color
                outlineColor='black'
                activeOutlineColor='black'
                left={
                    <TextInput.Icon icon="email-outline"/>
                }
            />
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
            <View style={styles.registerButtonContainer}>
                <TouchableOpacity style={styles.registerButton} onPress={handleSubmit}>
                    <Text style={styles.registerButtonText}>Register</Text>
                </TouchableOpacity> 
            </View>
            <View style={styles.haveAccountContainer}>
                <Text>
                    Already have an account?
                </Text>
                <TouchableOpacity onPress={()=>{navigation.replace('Login')}}>
                    <Text style={styles.haveAccountText}> Sign In</Text>
                </TouchableOpacity>
            </View>
        </View>
    );
});

export default Register;