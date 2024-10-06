import SQLite from 'react-native-sqlite-storage';

// Open a database
const db = SQLite.openDatabase(
    {
        name: 'recipes.db',
        location: 'default',
    },
    () => { console.log('Database opened'); },
    error => { console.error('Error opening database: ', error); }
);

export const deleteRecipe = (id) => {
    return new Promise((resolve, reject) => {
        db.transaction(tx => {
        tx.executeSql(
            'DELETE FROM Recipes WHERE id = ?',
            [id],
            (tx, results) => {
            if (results.rowsAffected > 0) {
                console.log('Item deleted successfully!');
                resolve('Item deleted successfully!'); // Resolve the promise on successful deletion
            } else {
                console.log('No item found with the given id.');
                resolve('No item found with the given id.'); // Resolve with a message if no item was found
            }
            },
            error => {
            console.error('Error deleting item: ', error);
            reject('Error deleting item: ' + error.message); // Reject the promise on error
            }
        );
        });
    });
};

export const editRecipe = (imagePath, name, type, ingredients, steps,id) => {
    return new Promise((resolve, reject) => {
      db.transaction(tx => {
        tx.executeSql(
          'UPDATE Recipes SET imagePath=?, name = ?, type = ?, ingredients = ?, steps = ? WHERE id = ?',
          [imagePath, name, type, ingredients, steps,id],
          (tx, results) => {
            if (results.rowsAffected > 0) {
              console.log('Item updated successfully!');
              resolve('Item updated successfully!');
            } else {
              console.log('No item found with the given id.');
              resolve('No item found with the given id.');
            }
          },
          error => {
            console.error('Error updating item: ', error);
            reject('Error updating item: ' + error.message);
          }
        );
      });
    });
  };
  