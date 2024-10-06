import { StyleSheet } from "react-native";
import colors from "../../themes/colors";
import { TextInput } from "react-native-paper";

export default StyleSheet.create({
    pageContainer:{
        flex:1,
        paddingVertical:60,
    },
    TextInputConTainer:{
        flex:1,
    },
    confirmButtonContainer:{
        marginHorizontal:30
    },
    confirmButton:{
        backgroundColor:colors.theme,
        elevation:5,
        borderRadius:50,
        paddingVertical:10
    },
    confirmButtonText:{
        color:'white',
        fontSize:16,
        textAlign:'center'
    },
})