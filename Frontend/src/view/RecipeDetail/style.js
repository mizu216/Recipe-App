import { Dimensions, StyleSheet } from "react-native";
import colors from "../../themes/colors";

export default StyleSheet.create({
    imageContainer: {
        height: 150,
        justifyContent: 'center',
        alignItems: 'center',
        marginHorizontal: 40,
        marginTop: 20,
        marginBottom: 20,
        borderRadius: 20,
        backgroundColor: 'white',
        elevation: 5,
        overflow: 'hidden',
    },
    image: {
        width: 'auto',
        height: 200,
        marginTop: 20,
        marginBottom: 20,
    },
    buttonContainer: {
        justifyContent: 'center',
        alignItems: 'center',
    },
    editButton: {
        backgroundColor:colors.theme,
        elevation:5,
        padding:10,
        width:250,
        borderRadius:50
    },
    editButtonText: {
        color: 'white',
        fontSize: 16,
        textAlign: 'center',
    },
    deleteButton: {
        backgroundColor: 'white',
        elevation: 5,
        padding: 10,
        width: 250,
        borderRadius: 50,
        marginTop: 15,
    },
    deleteButtonText: {
        color:colors.theme,
        fontSize:16,
        textAlign:'center'
    },
    uploadButton: {
        backgroundColor:colors.theme,
        elevation:5,
        padding:10,
        paddingHorizontal:70,
        borderRadius:50
    },
    uploadButtonText: {
        color:'white',
        fontSize:16,
        textAlign:'center'
    },
    recipeComponentTitle: {
        marginHorizontal: 10,
        marginTop: 20,
        fontSize: 16,
        color: colors.theme,
        fontWeight: 'bold',
    },
    recipeTypePickerContainer: {
        marginHorizontal: 20,
        marginTop: 5,
        height: 43,
        justifyContent: 'center',
        backgroundColor: 'white',
        borderColor: 'black',
        borderWidth: 1,
        borderRadius: 5,
        padding: 5,
    },
    amountControllerContainer: {
        marginHorizontal: 25,
        marginTop: 5,
        justifyContent: 'space-between',
        flexDirection: 'row',
    },
    confirmButtonContainer:{
        justifyContent:'center',
        alignItems:'center', 
        marginTop:30
    },
    confirmButton:{
        backgroundColor:colors.theme,
        elevation:5,
        padding:10,
        width:300,
        borderRadius:50
    },
    confirmButtonText:{
        color:'white',
        fontSize:16,
        textAlign:'center'
    },
    cancelButtonContainer:{
        justifyContent:'center',
        alignItems:'center', 
        marginVertical:20
    },
    cancelButton: {
        backgroundColor: 'white',
        elevation: 5,
        padding: 10,
        width: 300,
        borderRadius: 50,
        marginVertical: 20,
    },
    cancelButtonText:{
        color:colors.theme,
        fontSize:16,
        textAlign:'center'
    }
})