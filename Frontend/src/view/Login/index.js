import { observer } from 'mobx-react';
import React, { useState } from 'react';
import { View, Text, ScrollView, StyleSheet, TouchableOpacity, Image } from 'react-native';
import { TextInput } from 'react-native-paper';
import colors from '../../themes/colors';
import images from '../../themes/images';
import { postLoginUser } from './service';

const Login = observer(({ navigation }) => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [secureTextEntry, setSecureTextEntry] = useState(true);


    return (
        <View style={{flex:1,paddingTop:60,backgroundColor:'white'}}>
            <Image source={images.loginImage} style={{width:'auto',height:200,marginBottom:20}} resizeMode='contain' />
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
            <TouchableOpacity style={{alignSelf:'flex-end',marginHorizontal:20,marginTop:5}}>
                <Text>Forgot Your Password?</Text>
            </TouchableOpacity>
            <View style={{marginTop:80,marginBottom:20,marginHorizontal:30}}>
                <TouchableOpacity style={{backgroundColor:colors.theme,elevation:5,borderRadius:50,paddingVertical:10}} onPress={()=>{postLoginUser(email,password,navigation)}}>
                    <Text style={{color:'white',fontSize:16,textAlign:'center'}}>Login</Text>
                </TouchableOpacity> 
            </View>
            <View style={{flexDirection:'row',alignItems:'center',justifyContent:'center'}}>
                <Text>
                    Don't have an account?
                </Text>
                <TouchableOpacity onPress={()=>{navigation.replace('Register')}}>
                    <Text style={{color:colors.theme,fontWeight:'bold'}}> Sign Up</Text>
                </TouchableOpacity>
            </View>
        </View>
    );
});

export default Login;