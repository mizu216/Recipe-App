import { StyleSheet } from "react-native";
import colors from "../../themes/colors";

export default StyleSheet.create({
    pageContainer:{
        flex:1,
        backgroundColor:'white'
    },
    descriptionContainer:{
        flexDirection:'row',
        alignItems:'center',
        justifyContent:'center',
        marginTop:20
    },
    descriptionText:{
        fontSize:15,
        fontWeight:'bold',
        color:colors.theme
    },
    descriptionText2:{
        fontSize:15,
        fontWeight:'bold',
        color:colors.theme
    },
})