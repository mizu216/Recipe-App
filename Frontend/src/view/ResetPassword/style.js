import { StyleSheet } from "react-native";
import colors from "../../themes/colors";

export default StyleSheet.create({
    pageContainer:{
        flex:1,
        paddingVertical:20
    },
    textInputContainer:{
        flex:1
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