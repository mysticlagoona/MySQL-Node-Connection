// This is the connector (also known as driver)
// that we can use to connect to a MySQL process
// and access its databases.
const mysql = require('mysql');

class TodoModel {
    constructor(dbConnection) {
        this.dbConnection = dbConnection;
    }

    // Loads all the TODOs in the database
    load(callback) {
        const selectTodoItems = "SELECT * FROM todo_items";
        this.dbConnection.query(selectTodoItems, function(err, results, fields) {
            if(err) {
                callback(err);
                return;
            }

            callback(null, results);
        });
    }

    create(description, callback) {
        const insertTags = "INSERT INTO tags (description) VALUES ?" ; 
        this.dbConnection.query(insertTags, [description], function(err, results, fields) {
            if(err) {
                callback(err);
                return;
            }

            callback(null, results);
        });
    }

    update(id, description, callback) {
        const update_Todo_items = "UPDATE todo_items SET text = ? WHERE id = " + id ; 
        this.dbConnection.query(update_Todo_items, [description], function(err, results, fields) {
            if(err) {
                callback(err);
                return;
            }

            callback(null, results);
        });
    }

    delete(id, callback) {
        this.id = id;
        const delete_Todo_items = "DELETE FROM todo_items WHERE id ?" ; 
        this.dbConnection.query(delete_Todo_items, [id], function(err, results, fields) {
            if(err) {
                callback(err);
                return;
            }

            callback(null, results);
        });
        // Write code and query to delete an existing TODO item
    }

    tagTodoItem(todoItemId, tagId, callback) {

        const insert_todo_item_tag = "INSERT INTO todo_item_tag (todo_item_id, tag_id) VALUES ?" ; 
        this.dbConnection.query(insert_todo_item_tag, [[[todoItemId, tagId]]], function(err, results, fields) {
            if(err) {
                callback(err);
                return;
            }

            callback(null, results);
        });
        // Write code and query add a tag to a TODO item
    }
        
    untagTodoItem(todoItemId, tagId, callback) {
        const insert_todo_item_tag = 
        "DELETE FROM todo_item_tag WHERE todo_item_id = " + todoItemId + 
        " AND tag_id = " + tagId; 
        this.dbConnection.query(insert_todo_item_tag, function(err, results, fields) {
            if(err) {
                callback(err);
                return;
            }

            callback(null, results);
        });
    }

    markCompleted(todoItemId, callback) {
        const update_Todo_items = "UPDATE todo_items SET is_completed = TRUE WHERE id = " + todoItemId; 
        this.dbConnection.query(update_Todo_items, function(err, results, fields) {
            if(err) {
                callback(err);
                return;
            }

            callback(null, results);
        });
    }
}

const dbConnection = mysql.createConnection({
    host     : 'localhost',
    user     : 'root',
    password : 'jhunu123',
    database : 'todo_app'
});

dbConnection.connect(function(err) {
    if (err != null) {
        console.error('error connecting: ' + err.stack);
        return;
    }

    console.log('connected as id ' + dbConnection.threadId);

    const todoModel = new TodoModel(dbConnection);
    /* todoModel.load(function(err, todoItems) {
        if(err) {
            console.log("error loading TODO items:", err);
        }

        console.log("existing todo items:", todoItems);
    }); */
    /* todoModel.create('fooschool',function(err, todoItems) {
        if(err) {
            console.log("error creating TODO items :", err);
        }

        console.log("1 row inserted");
    }); */
/*      todoModel.update( 44, 'teachatfooschool', function(err, todoItems) {
        if(err) {
            console.log("error creating TODO items :", err);
        }

        console.log("1 row updated");
    });  */
/*     todoModel.delete( 42,  function(err, todoItems) {
        if(err) {
            console.log("error creating TODO items :", err);
        }

        console.log("1 row deleted");
    }); */
    // todoModel.tagTodoItem( 44, 3, function(err, todoItems) {
    //     if(err) {
    //         console.log("error creating TODO items :", err);
    //     }

    //     console.log("1 row inserted");
    // });

    // todoModel.untagTodoItem(44, 3, function(err, todoItems) {
    //     if(err) {
    //         console.log("error creating TODO items :", err);
    //     }

    //     console.log("1 row inserted");
    // });

    
    todoModel.markCompleted(44, function(err, todoItems) {
        if(err) {
            console.log("error creating TODO items :", err);
        }

        console.log("1 row inserted");
    });
});