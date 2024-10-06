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

export const getRecipes = async () => {
    return new Promise((resolve, reject) => {
        db.transaction(tx => {
            tx.executeSql(
                'SELECT * FROM Recipes',
                [],
                (tx, results) => {
                    const recipes = [];
                    for (let i = 0; i < results.rows.length; i++) {
                        recipes.push(results.rows.item(i));
                    }
                    console.log('Fetched recipes:', recipes);
                    resolve(recipes);  // Resolve with fetched recipes
                },
                error => {
                    console.error('Error fetching recipes: ', error);
                    reject(error);  // Reject in case of an error
                }
            );
        });
    });
};