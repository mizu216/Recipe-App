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

// Function to create the recipes table
export const createTable = () => {
    return new Promise((resolve, reject) => {
        db.transaction(tx => {
            tx.executeSql(
                'CREATE TABLE IF NOT EXISTS Recipes (id INTEGER PRIMARY KEY AUTOINCREMENT, imagePath TEXT, name TEXT, type TEXT, ingredients TEXT, steps TEXT)',
                [],
                () => {
                    console.log('Table created successfully');
                    resolve();  // Resolve if table creation is successful
                },
                error => {
                    console.error('Error creating table: ', error);
                    reject(error);  // Reject if there is an error
                }
            );
        });
    });
};


export const saveRecipe = (imagePath, name, type, ingredients, steps) => {
    return new Promise(async (resolve, reject) => {
        try {
            await createTable();  // Ensure the table exists before inserting the recipe
            db.transaction(tx => {
                tx.executeSql(
                    'INSERT INTO Recipes (imagePath, name, type, ingredients, steps) VALUES (?, ?, ?, ?, ?)',
                    [imagePath, name, type, ingredients, steps],
                    (tx, results) => {
                        console.log('Recipe saved successfully:', results.insertId);
                        resolve(results.insertId);  // Resolve with the inserted record ID
                    },
                    error => {
                        console.error('Error saving recipe: ', error);
                        reject(error);  // Reject the promise if there's an error
                    }
                );
            });
        } catch (error) {
            reject(error);  // Reject if there is an error creating the table
        }
    });
};
