import { observer } from 'mobx-react';
import React, { useEffect, useState } from 'react';
import { View, Text, ScrollView, StyleSheet, Dimensions, Image,FlatList, Touchable, TouchableOpacity } from 'react-native';
import { createTable, getRecipes } from './service';
import colors from '../../themes/colors';
import images from '../../themes/images';
import { Picker } from '@react-native-picker/picker';
import recipeData from '../../assets/json/recipe_types.json'; // Adjust the path according to your folder structure

const RecipeList = observer(({ navigation }) => {
    const [recipes, setRecipes] = useState([]);
    const [filteredRecipes, setFilteredRecipes] = useState([]);
    const recipeTypes = recipeData.recipeTypes;
    const [recipeSelectTypes, setRecipeSelectTypes] = useState('');
    
    useEffect(() => {
        const fetchData = async () => {
            await createTable();  // Create the table if it doesn't exist
            const fetchedRecipes = await getRecipes();  // Fetch recipes asynchronously
            setRecipes(fetchedRecipes);  // Set recipes after fetching
            setRecipeSelectTypes('0');
        };
        fetchData();  // Call the async function
    }, []);

    useEffect(() => {
        if (recipeSelectTypes==='0'){
            setFilteredRecipes(recipes);
        }
        else{
            setFilteredRecipes(recipes.filter(recipe => recipe.type === recipeSelectTypes));
        }
    }, [recipeSelectTypes]);

    const renderItem = ({ item }) => (
        <TouchableOpacity 
            style={{backgroundColor:'white',elevation:5,width:(Dimensions.get('screen').width/2)-20, marginVertical:10,borderRadius:10,padding:15,alignItems:'center'}} 
            onPress={()=>{navigation.navigate('General', {
                screen: 'RecipeDetail',
                params: item,
            });}}
        >
            <Image source={item.imagePath===''?images.defaultImage:{uri: `file://${item.imagePath}`}} style={{width:'100%',height:150}} resizeMode='cover' />
            <Text style={{fontSize:16,fontWeight:'bold',color:colors.theme,marginVertical:5}}>{item.name}</Text>
            <Text style={{fontSize:14, color:colors.theme}}>{item.type}</Text>
        </TouchableOpacity>
    );

    return (
        <View style={{paddingTop:20}}>
            <FlatList
                ListHeaderComponent={
                    <View style={{alignSelf:'flex-end',marginBottom:10,height:30,width:200,justifyContent:'center',backgroundColor:'white',borderColor:'black',borderWidth:1,borderRadius:20,padding:5}}>
                        <Picker
                            selectedValue={recipeSelectTypes}
                            onValueChange={(itemValue, itemIndex) => setRecipeSelectTypes(itemValue)}
                        >
                            <Picker.Item label="All Recipes Type" value="0" />
                            {recipeTypes.map((recipe) => (
                                <Picker.Item key={recipe.id} label={recipe.type} value={recipe.type} />
                            ))}
                        </Picker>
                    </View>
                }
                contentContainerStyle={{padding:10}}
                columnWrapperStyle={{justifyContent: 'space-between'}}
                data={filteredRecipes}
                renderItem={renderItem}
                keyExtractor={(item) => item.id}
                numColumns={2}
                ListEmptyComponent={
                    <View style={{ alignItems: 'center', marginTop: 20 }}>
                        <Text style={{ fontSize: 16, color: colors.theme }}>No recipes found for this type.</Text>
                    </View>
                }
            />
        </View>
    );
});

export default RecipeList;