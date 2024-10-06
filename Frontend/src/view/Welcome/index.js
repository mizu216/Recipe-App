  /* eslint-disable prettier/prettier */
  import React, { useEffect } from 'react';
  import {View, Dimensions,ActivityIndicator} from 'react-native';
  import {observer} from 'mobx-react';
  import AsyncStorage from '@react-native-async-storage/async-storage';
import colors from '../../themes/colors';
  
  const Welcome = observer(({navigation}) => {
      const checkUser = async () => {
          const newToken = await AsyncStorage.getItem('@userToken');
          const parseToken = JSON.parse(newToken);
          if (parseToken){
            navigation.replace("Tab");
          }
          else{
            navigation.replace("Auth");
          }
      };
  
    useEffect(()=>{
      checkUser();
    }, []);
  
    return (
      <View style={{alignItems:'center',justifyContent:'center',height:Dimensions.get('window').height}}>
        <ActivityIndicator size={'large'} color={colors.theme}/>
      </View>
    );
  });
  
  export default Welcome;