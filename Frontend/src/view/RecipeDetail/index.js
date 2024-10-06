import { observer } from 'mobx-react';
import React, { useEffect, useState } from 'react';
import { View, Text, ScrollView,TouchableOpacity, Image, Alert } from 'react-native';
import * as ImagePicker from 'react-native-image-picker';
import IconION from 'react-native-vector-icons/Ionicons';
import colors from '../../themes/colors';
import {TextInput } from 'react-native-paper';
import recipeData from '../../assets/json/recipe_types.json'; // Adjust the path according to your folder structure
import { Picker } from '@react-native-picker/picker';
import RNFS from 'react-native-fs'; // Import react-native-fs for file operations
import { deleteRecipe, editRecipe, saveRecipe } from './service';
import styles from "./style";

const RecipeDetail = observer(({ navigation,route}) => {
    const [imageUri, setImageUri] = useState(null);
    const [recipeName, setRecipeName] = useState('');
    const [recipeSelectTypes, setRecipeSelectTypes] = useState('');
    const [ingredients, setIngredients] = useState([]);
    const [steps, setSteps] = useState([]);
    const [editable, setEditable] = useState(false);
    const recipeTypes = recipeData.recipeTypes;
    const recipe = route.params;
    
    useEffect(() => {
        setImageUri(`file://${recipe.imagePath}`);
        setRecipeName(recipe.name);
        setRecipeSelectTypes(recipe.type);
        setIngredients(JSON.parse(recipe.ingredients));
        setSteps(JSON.parse(recipe.steps))
    }, [editable]);

    const confirmDelete = (id) => {
        Alert.alert(
            "Confirm Delete",
            "Are you sure you want to delete this recipe?",
            [
                {
                    text: "Cancel",
                },
                {
                    text: "Delete",
                    onPress: () => {
                    deleteRecipe(id)
                        .then(message => {
                            navigation.replace('Tab', {
                                screen: 'RecipeList',
                            })
                        })
                        .catch(error => {
                        console.error(error); // Handle error
                        });
                    },
                }
            ],
            { cancelable: true }
        );
    };

    const handleChoosePhoto = () => {
        ImagePicker.launchImageLibrary({ mediaType: 'photo' }, (response) => {
            if (response.assets && response.assets.length > 0) {
                setImageUri(response.assets[0].uri);
            }
        });
    };

    const addIngredient = () => {
        const newIngredient = { id: ingredients.length + 1, name: '' };
        setIngredients([...ingredients, newIngredient]);
      };
    
      // Update an ingredient's name
      const updateIngredient = (id, newName) => {
        const updatedIngredients = ingredients.map((ingredient) =>
          ingredient.id === id ? { ...ingredient, name: newName } : ingredient
        );
        setIngredients(updatedIngredients);
      };

      const deleteLastIngredient = () => {
        if (ingredients.length > 1) { // Ensure at least one ingredient remains
            const updatedIngredients = ingredients.slice(0, -1);
            setIngredients(updatedIngredients);
        }
    };

    const addSteps = () => {
        const newStep = { id: steps.length + 1, name: '' };
        setSteps([...steps, newStep]);
      };
    
      // Update an ingredient's name
      const updateSteps = (id, newName) => {
        const updatedSteps = steps.map((step) =>
          step.id === id ? { ...step, name: newName } : step
        );
        setSteps(updatedSteps);
      };

      const deleteLastStep = () => {
        if (steps.length > 1) { // Ensure at least one ingredient remains
            const updatedSteps = steps.slice(0, -1);
            setSteps(updatedSteps);
        }
    };

    const saveImageToLocalStorage = async (uri) => {
        // Create a unique filename using the current timestamp
        const timestamp = Date.now();
        const fileExtension = uri.split('.').pop(); // Get the file extension (e.g., jpg, png)
        const fileName = `recipe_image_${timestamp}.${fileExtension}`; // Create a filename
      
        // Set the path where to save the image
        const path = `${RNFS.DocumentDirectoryPath}/${fileName}`;
      
        try {
          // Copy the file from the original URI to the new path
          await RNFS.copyFile(uri, path);
          console.log('Image saved to:', path);
          return path; // Return the new path of the saved image
        } catch (error) {
          console.error('Error saving image:', error);
          return null; // Return null if there was an error
        }
    };

    const updateRecipe = async () => {
        // Check if recipe name and type are filled
        if (recipeName ==='') {
            Alert.alert('Error', 'Please enter a recipe name.')
            return; // Exit if validation fails
        }
    
        if (recipeSelectTypes==="" || recipeSelectTypes === "0") {
            Alert.alert('Error','Please select a recipe type.'); // Alert if recipe type is not selected
            return; // Exit if validation fails
        }
    
        try {
            let newPath = '';
            if (imageUri!==null){
                newPath = await saveImageToLocalStorage(imageUri);
            }
            await editRecipe(newPath, recipeName, recipeSelectTypes, JSON.stringify(ingredients), JSON.stringify(steps),recipe.id);
            navigation.replace('Tab', {
                screen: 'RecipeList',
            });
        } catch (error) {
            console.error('Error update recipe:', error);
        }
    };

    return (
        <ScrollView>
            {imageUri==="file://"?
                <View style={styles.imageContainer}>
                    <IconION name="camera-outline" color={colors.theme} size={50} />
                </View>
                :<Image source={{ uri: imageUri }} style={styles.image} resizeMode='contain' />
            }
            {editable===false&&
                <View style={styles.buttonContainer}>
                    <TouchableOpacity style={styles.editButton} onPress={()=>{setEditable(true)}}>
                        <Text style={styles.editButtonText}>Edit Recipe</Text>
                    </TouchableOpacity> 
                </View>
            }
            {editable===false&&
                <View style={styles.buttonContainer}>
                    <TouchableOpacity style={styles.deleteButton} onPress={()=>{confirmDelete(recipe.id)}}>
                        <Text style={styles.deleteButtonText}>Delete Recipe</Text>
                    </TouchableOpacity> 
                </View>
            }
            {editable===true&&
                <View style={styles.buttonContainer}>
                    <TouchableOpacity style={styles.uploadButton} onPress={handleChoosePhoto}>
                        <Text style={styles.uploadButtonText}>Upload Photo</Text>
                    </TouchableOpacity> 
                </View>  
            }
            <Text style={styles.recipeComponentTitle}>
                Recipe Name
            </Text>
            <TextInput
                label="Recipe Name"
                value={recipeName}
                onChangeText={text => setRecipeName(text)}
                mode="outlined" // Use 'flat' to disable the outline
                style={{marginHorizontal:20,marginTop:5,height:40}}
                underlineColor="transparent" // Optional: Removes the underline color
                outlineColor='black'
                activeOutlineColor='black'
                editable={editable} 
            />
            <Text style={styles.recipeComponentTitle}>
                Recipe Type
            </Text>
            {editable===false&&<TextInput
                label="Recipe Type"
                value={recipeSelectTypes}
                mode="outlined" // Use 'flat' to disable the outline
                style={{marginHorizontal:20,marginTop:5,height:40}}
                underlineColor="transparent" // Optional: Removes the underline color
                outlineColor='black'
                activeOutlineColor='black'
                editable={editable} 
            />
            }
            {editable===true&&
                <View style={styles.recipeTypePickerContainer}>
                    <Picker
                        selectedValue={recipeSelectTypes}
                        onValueChange={(itemValue, itemIndex) => setRecipeSelectTypes(itemValue)}
                    >
                        <Picker.Item label="Select Type" value="0" />
                        {recipeTypes.map((recipe) => (
                            <Picker.Item key={recipe.id} label={recipe.type} value={recipe.type} />
                        ))}
                    </Picker>
                </View>
            }
            <Text style={styles.recipeComponentTitle}>
                Ingredient List
            </Text>
            {ingredients.map((item, index) => (
                <View key={item.id}>
                    <TextInput
                        label={"Ingredient " + item.id}
                        value={item.name}
                        onChangeText={(text) => updateIngredient(item.id, text)}
                        mode="outlined" // Use 'flat' to disable the outline
                        style={{marginHorizontal:20,marginTop:5,height:40}}
                        underlineColor="transparent" // Optional: Removes the underline color
                        outlineColor='black'
                        activeOutlineColor='black'
                        editable={editable} 
                    />
                </View>
            ))}
            {editable===true&&
                <View style={styles.amountControllerContainer}>
                    <TouchableOpacity onPress={deleteLastIngredient}>
                        <Text>
                            Remove Ingredient
                        </Text>
                    </TouchableOpacity>
                    <TouchableOpacity onPress={addIngredient}>
                        <Text>
                            Add Ingredient
                        </Text>
                    </TouchableOpacity>
                </View>
            }
            <Text style={styles.recipeComponentTitle}>
                Procedure
            </Text>
            {steps.map((item, index) => (
                <View key={item.id}>
                    <TextInput
                        label={"Steps " + item.id}
                        value={item.name}
                        onChangeText={(text) => updateSteps(item.id, text)}
                        mode="outlined" // Use 'flat' to disable the outline
                        style={{marginHorizontal:20,marginTop:5,height:80}}
                        underlineColor="transparent" // Optional: Removes the underline color
                        outlineColor='black'
                        activeOutlineColor='black'
                        multiline
                        textAlignVertical='top'
                        numberOfLines={4}
                        editable={editable} 
                    />
                </View>
            ))}
            {editable===true&&
                <View style={styles.amountControllerContainer}>
                    <TouchableOpacity onPress={deleteLastStep}>
                        <Text>
                            Remove Step
                        </Text>
                    </TouchableOpacity>
                    <TouchableOpacity onPress={addSteps}>
                        <Text>
                            Add New Step
                        </Text>
                    </TouchableOpacity>
                </View>
            }
            {editable===true&&
                <View style={styles.confirmButtonContainer}>
                    <TouchableOpacity style={styles.confirmButton} onPress={updateRecipe}>
                        <Text style={styles.confirmButtonText}>Confirm</Text>
                    </TouchableOpacity> 
                </View>
            }
            {editable===true&&
                <View style={styles.cancelButtonContainer}>
                    <TouchableOpacity style={styles.cancelButton} onPress={()=>{setEditable(false)}}>
                        <Text style={styles.cancelButtonText}>Cancel</Text>
                    </TouchableOpacity> 
                </View>
            }
        </ScrollView>
    );
});

export default RecipeDetail;