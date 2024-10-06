import { Dimensions, StyleSheet } from "react-native";
import colors from "../../themes/colors";

export default StyleSheet.create({
    recipeContainer:{
        backgroundColor:'white',
        elevation:5,
        width:(Dimensions.get('screen').width/2)-20, 
        marginVertical:10,
        borderRadius:10,
        padding:15,
        alignItems:'center'
    },
    recipeImage:{
        width:'100%',
        height:150
    },
    recipeNameText:{
        fontSize:16,
        fontWeight:'bold',
        color:colors.theme,
        marginVertical:5
    },
    recipeTypeText:{
        fontSize:14, 
        color:colors.theme
    },
    pageContainer:{
        
    },
    recipeTypePickerContainer:{
        alignSelf:'flex-end',
        marginBottom:10,
        marginTop:20,
        height:30,
        width:200,
        justifyContent:'center',
        backgroundColor:'white',
        borderColor:'black',
        borderWidth:1,
        borderRadius:20,
        padding:5
    },
    emptyComponentContainer:{ 
        alignItems: 'center', 
        marginTop: 20,
    },
    emptyComponentText:{ 
        fontSize: 16, 
        color: colors.theme,
    },
})