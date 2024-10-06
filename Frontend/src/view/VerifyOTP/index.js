import { observer } from 'mobx-react';
import OTPTextView from "react-native-otp-textinput";
import React, { useEffect, useState } from 'react';
import { View, Text, ScrollView, StyleSheet, TouchableOpacity } from 'react-native';
import colors from '../../themes/colors';
import { postRegister, postSendOTP } from './service';

const VerifyOTP = observer(({ navigation,route}) => {
    const [otp, setOTP] = useState('');
    const user = route.params;
    console.log(route.params)
    
    useEffect(() => {
        if (otp.length === 3) { // assuming the OTP length is 3
          handleSubmit();
        }
      }, [otp]);

    const handleSubmit = () =>{
        if(user.mode='create'){
            postRegister(user.email,user.password,otp,navigation)
        }
        if(user.mode='reset'){
        }
    }

    return (
        <View style={{flex:1,backgroundColor:'white'}}>
            <OTPTextView 
                handleTextChange={setOTP} 
                inputCount={3} 
                tintColor={colors.theme}
                containerStyle={{justifyContent: 'space-around',marginTop: 30,marginBottom: 30,}}
            />
            <View style={{flexDirection:'row',alignItems:'center',justifyContent:'center',marginTop:20}}>
                <Text style={{fontSize:15,fontWeight:'bold',color:colors.theme}}>Enter the OTP sent to </Text>
                <Text style={{fontSize:15,fontWeight:'bold',color:colors.theme}}>{user.email}</Text>
            </View>
            <View style={{flexDirection:'row',alignItems:'center',justifyContent:'center',marginTop:20}}>
                <Text>Didn't receive email? </Text>
                <TouchableOpacity onPress={()=>{postSendOTP(user.email,user.mode)}}>
                    <Text>Resend OTP</Text>
                </TouchableOpacity>
            </View>
      </View>
    );
});

export default VerifyOTP;