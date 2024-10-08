import { StyleSheet } from "react-native";
import colors from "../../themes/colors";

export default StyleSheet.create({
    pageContainer:{
        flex:1,
        paddingTop:60,
        backgroundColor:'white'
    },
    loginImage:{
        width:'auto',
        height:200,
        marginBottom:20
    },
    forgotPasswordButton:{
        alignSelf:'flex-end',
        marginHorizontal:20,
        marginTop:5
    },
    loginButtonContainer:{
        marginTop:80,
        marginBottom:20,
        marginHorizontal:30
    },
    loginButton:{
        backgroundColor:colors.theme,
        elevation:5,borderRadius:50,
        paddingVertical:10
    },
    loginButtonText:{
        color:'white',
        fontSize:16,
        textAlign:'center'
    },
    noAccountContainer:{
        flexDirection:'row',
        alignItems:'center',
        justifyContent:'center'
    },
    noAccountText:{
        color:colors.theme,
        fontWeight:'bold'
    },
})