import { observer } from 'mobx-react';
import React, { useState } from 'react';
import { View, Text, ScrollView, StyleSheet, TouchableOpacity, Image, Alert } from 'react-native';
import { TextInput } from 'react-native-paper';
import colors from '../../themes/colors';
import images from '../../themes/images';
import { postChangePassword, postSendOTP } from './service';
import styles from "./style";

const ChangePassword = observer(({ navigation }) => {
    const [oldPass, setOldPass] = useState('');
    const [newPass, setNewPass] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const [secureTextEntry1, setSecureTextEntry1] = useState(true);
    const [secureTextEntry2, setSecureTextEntry2] = useState(true);
    const [secureTextEntry3, setSecureTextEntry3] = useState(true);

    const handleSubmit = () => {
        if (newPass.length<8)
        {
            Alert.alert("Invalid Password Format","Please make sure your password length is more than 8.")
        }
        else if(newPass!==confirmPassword){
            Alert.alert("Invalid Confirm Password","Please make sure your password same with confirm password.")
        }
        else{
            postChangePassword(oldPass,newPass,navigation);
        }
    };


    return (
        <View style={styles.pageContainer}>
            <View style={styles.TextInputConTainer}>
                <TextInput
                    label="Old Password"
                    value={oldPass}
                    onChangeText={text => setOldPass(text)}
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
                    label="New Password"
                    value={newPass}
                    onChangeText={text => setNewPass(text)}
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
                        icon={secureTextEntry3 ? "eye-off" : "eye"}
                        onPress={() => setSecureTextEntry3(!secureTextEntry3)}
                    />
                    }
                    left={
                        <TextInput.Icon icon="lock-outline"/>
                    }
                    secureTextEntry={secureTextEntry3}
                />
            </View>
            <View style={styles.confirmButtonContainer}>
                <TouchableOpacity style={styles.confirmButton} onPress={handleSubmit}>
                    <Text style={styles.confirmButtonText}>Confirm</Text>
                </TouchableOpacity> 
            </View>
        </View>
    );
});

export default ChangePassword;