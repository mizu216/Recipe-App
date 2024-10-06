import { StyleSheet } from "react-native";
import colors from "../../themes/colors";

export default StyleSheet.create({
    pageContainer:{
        paddingVertical:10,
        flex:1
    },
    tabContainer:{
       flex:1 
    },
    tabItemContainer:{
        borderBottomWidth:1,
        margin:10,
        borderColor:colors.theme,
        flexDirection:'row',
        justifyContent:'space-between',
        paddingHorizontal:5
    },
    tabItemText:{
        fontSize:18,marginBottom:5,color:colors.theme
    },
    logoutButtonContainer:{
        marginTop:80,
        marginBottom:20,
        marginHorizontal:30
    },
    logoutButton:{
        backgroundColor:colors.theme,
        elevation:5,borderRadius:50,
        paddingVertical:10
    },
    logoutButtonText:{
        color:'white',
        fontSize:16,
        textAlign:'center'
    },
})