import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import {_navigate} from '../services/navigationService';
import colors from '../themes/colors';
import IconION from 'react-native-vector-icons/Ionicons';
import IconMaterial from 'react-native-vector-icons/MaterialIcons';
import AddRecipe from '../view/AddRecipe';
import RecipeList from '../view/RecipeList';
import Setting from '../view/Setting';
import { createStackNavigator } from '@react-navigation/stack';
import RecipeDetail from '../view/RecipeDetail';
import { TouchableOpacity } from 'react-native';
import Login from '../view/Login';
import Register from '../view/Register';
import VerifyOTP from '../view/VerifyOTP';

const tabStack = createBottomTabNavigator();
function TabStack() {
  return (
    <tabStack.Navigator
      initialRouteName="RecipeList"
      screenOptions={{
        tabBarHideOnKeyboard:true,
        headerTitleAlign: 'center',
        tabBarShowLabel: false,
        tabBarActiveTintColor: colors.theme,
        tabBarStyle: {height: 60},
      }}>
      <tabStack.Screen
        name="RecipeList"
        component={RecipeList}
        options={{
          headerShown: true,
          headerTintColor: colors.theme,
          title: 'RecipeList',
          tabBarIcon: ({color}) => (
            <IconION name="home-outline" color={color} size={25} />
          ),
        }}
      />
      <tabStack.Screen
        name="AddRecipeButton"
        component={RecipeList} // Dummy component to avoid rendering a screen
        options={{
          tabBarIcon: ({ color }) => (
            <IconMaterial name="format-list-bulleted-add" color={color} size={25} />
          ),
          tabBarButton: (props) => (
            <TouchableOpacity
              {...props}
              onPress={() => _navigate('General', { screen: 'AddRecipe' })}
            />
          ),
        }}
      />
      <tabStack.Screen
        name="Setting"
        component={Setting}
        options={{
          headerShown: false,
          title: 'Setting',
          headerTintColor: colors.theme,
          tabBarIcon: ({color}) => (
            <IconION name="settings-outline" color={color} size={25} />
          ),
        }}
      />
    </tabStack.Navigator>

    
  );
}

const generalStack = createStackNavigator();
function GeneralStack (){
  return (
    <generalStack.Navigator
      screenOptions={{
        headerTitleAlign: 'center',
        tabBarShowLabel: false,
      }}>
      <generalStack.Screen
        name="RecipeDetail"
        component={RecipeDetail}
        options={{title: 'Recipe Detail',headerShown:true,headerTintColor: colors.theme,}}
      />
      <generalStack.Screen
        name="AddRecipe"
        component={AddRecipe}
        options={{
          title: 'Add Recipe',
          headerShown: true,
          headerTintColor: colors.theme,
        }}
      />
    </generalStack.Navigator>
  );
}

const authStack = createStackNavigator();
function AuthStack (){
  return (
    <authStack.Navigator
      screenOptions={{
        headerTitleAlign: 'center',
        tabBarShowLabel: false,
      }}>
      <authStack.Screen
        name="Login"
        component={Login}
        options={{title: 'Login',headerShown:true,headerTintColor: colors.theme,}}
      />
      <authStack.Screen
        name="Register"
        component={Register}
        options={{title: 'Register',headerShown:true,headerTintColor: colors.theme,}}
      />
      <authStack.Screen
        name="VerifyOTP"
        component={VerifyOTP}
        options={{title: 'Verify OTP',headerShown:true,headerTintColor: colors.theme,}}
      />
    </authStack.Navigator>
  );
}

const appStack = createStackNavigator();
function AppStack (){
  return (
    <appStack.Navigator
      screenOptions={{
        headerTitleAlign: 'center',
        tabBarShowLabel: false,
      }}>
        <appStack.Screen
        name="Auth"
        component={AuthStack}
        options={{
          headerShown: false,
        }}
      />
      <appStack.Screen
        name="Tab"
        component={TabStack}
        options={{
          headerShown: false,
        }}
      />
      <appStack.Screen
        name="General"
        component={GeneralStack}
        options={{
          headerShown: false,
        }}
      />
    </appStack.Navigator>
  );
}

export default AppStack;