import { observer } from 'mobx-react';
import React, { useState } from 'react';
import { View, Text, ScrollView, StyleSheet, TouchableOpacity, Image } from 'react-native';
import { TextInput } from 'react-native-paper';
import colors from '../../themes/colors';
import images from '../../themes/images';
import { postLoginUser } from './service';
import styles from "./style";

const Login = observer(({ navigation }) => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [secureTextEntry, setSecureTextEntry] = useState(true);

    return (
        <View style={styles.pageContainer}>
            <Image source={images.loginImage} style={styles.loginImage} resizeMode='contain' />
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
                    icon={secureTextEntry ? "eye-off" : "eye"}
                    onPress={() => setSecureTextEntry(!secureTextEntry)}
                />
                }
                left={
                    <TextInput.Icon icon="lock-outline"/>
                }
                secureTextEntry={secureTextEntry}
            />
            <TouchableOpacity style={styles.forgotPasswordButton} onPress={()=>{navigation.navigate('ForgotPassword')}}>
                <Text>Forgot Your Password?</Text>
            </TouchableOpacity>
            <View style={styles.loginButtonContainer}>
                <TouchableOpacity style={styles.loginButton} onPress={()=>{postLoginUser(email,password,navigation)}}>
                    <Text style={styles.loginButtonText}>Login</Text>
                </TouchableOpacity> 
            </View>
            <View style={styles.noAccountContainer}>
                <Text>
                    Don't have an account?
                </Text>
                <TouchableOpacity onPress={()=>{navigation.replace('Register')}}>
                    <Text style={styles.noAccountText}> Sign Up</Text>
                </TouchableOpacity>
            </View>
        </View>
    );
});

export default Login;