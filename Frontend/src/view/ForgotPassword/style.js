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
    descriptionText:{
        marginLeft:20,
        fontSize:16,
        marginTop:30,
        color:colors.theme,
        fontWeight:'bold'
    },
    nextButtonContainer:{
        marginTop:150,
        marginBottom:20,
        marginHorizontal:30,
    },
    nextButton:{
        backgroundColor:colors.theme,
        elevation:5,borderRadius:50,
        paddingVertical:10
    },
    nextButtonText:{
        color:'white',
        fontSize:16,
        textAlign:'center'
    },
})