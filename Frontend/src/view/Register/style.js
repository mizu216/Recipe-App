import { StyleSheet } from "react-native";
import colors from "../../themes/colors";

export default StyleSheet.create({
    pageContainer:{
        flex:1,
        paddingTop:60,
        backgroundColor:'white'
    },
    registerImage:{
        width:'auto',
        height:200,
        marginBottom:20
    },
    registerButtonContainer:{
        marginTop:80,
        marginBottom:20,
        marginHorizontal:30
    },
    registerButton:{
        backgroundColor:colors.theme,
        elevation:5,
        borderRadius:50,
        paddingVertical:10
    },
    registerButtonText:{
        color:'white',
        fontSize:16,
        textAlign:'center'
    },
    haveAccountContainer:{
        flexDirection:'row',
        alignItems:'center',
        justifyContent:'center'
    },
    haveAccountText:{
        color:colors.theme,
        fontWeight:'bold'
    },
})