import { observer } from 'mobx-react';
import React, { useState } from 'react';
import { View, Text, ScrollView, StyleSheet, TouchableOpacity, Image, Alert } from 'react-native';
import images from '../../themes/images';
import styles from "./style";
import { TextInput } from 'react-native-paper';
import { postSendOTP } from './service';

const ForgotPassword = observer(({ navigation }) => {
    const [email, setEmail] = useState('');
    
    const validateEmail = (email) => {
        const regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        return regex.test(email);
    };

    const handleSubmit = () => {
        if (!validateEmail(email)) {
            Alert.alert("Invalid Email Format","Please enter an existed email.")
        }
        else{
            postSendOTP(email,navigation)
        }
    };
    return (
        <View style={styles.pageContainer}>
            <Image source={images.loginImage} style={styles.loginImage} resizeMode='contain' />
            <Text style={styles.descriptionText}>Please Enter Your Email to Reset Password</Text>
            <TextInput
                label="Email"
                value={email}
                onChangeText={text => setEmail(text)}
                mode="outlined" // Use 'flat' to disable the outline
                style={{marginHorizontal:20,marginTop:10}}
                underlineColor="transparent" // Optional: Removes the underline color
                outlineColor='black'
                activeOutlineColor='black'
                left={
                    <TextInput.Icon icon="email-outline"/>
                }
            />
            <View style={styles.nextButtonContainer}>
                <TouchableOpacity style={styles.nextButton} onPress={handleSubmit}>
                    <Text style={styles.nextButtonText}>Next</Text>
                </TouchableOpacity> 
            </View>
        </View>
    );
});

export default ForgotPassword;