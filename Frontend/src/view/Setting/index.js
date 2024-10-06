import { observer } from 'mobx-react';
import React from 'react';
import { View, Text, ScrollView, StyleSheet, TouchableOpacity } from 'react-native';
import colors from '../../themes/colors';
import IconMaterialCom from 'react-native-vector-icons/MaterialCommunityIcons';
import styles from "./style";
import AsyncStorage from '@react-native-async-storage/async-storage';

const Setting = observer(({ navigation }) => {
    const handleLogout = async() =>{
        try {
            await AsyncStorage.removeItem('@userToken')
            navigation.replace('Auth', {screen: 'Login',});
          } catch (e) {
            console.log(e);
          }
    }
    return (
        <View style={styles.pageContainer}>
            <View style={styles.tabContainer}>
                <TouchableOpacity style={styles.tabItemContainer} onPress={()=>{navigation.navigate('General', {screen: 'ChangePassword',});}}>
                    <Text style={styles.tabItemText}>
                        Change Password
                    </Text>
                    <IconMaterialCom name="chevron-right" color={colors.theme} size={25} />
                </TouchableOpacity>
            </View>
            <View style={styles.logoutButtonContainer}>
                <TouchableOpacity 
                    style={styles.logoutButton} 
                    onPress={handleLogout}
                >
                    <Text style={styles.logoutButtonText}>Logout</Text>
                </TouchableOpacity> 
            </View>
        </View>
    );
});

export default Setting;