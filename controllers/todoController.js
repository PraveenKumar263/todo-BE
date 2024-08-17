const Todo = require('../models/todo');

const todoController = {
    createTodo: async (req, res) => {
        try {
            // get the description from the request body
            const { description } = req.body;

            // create a new todo
            const newTodo = new Todo({
                description
            });

            // save the todo to the database
            const savedTodo = await newTodo.save();

            // send the saved todo as a response
            res.send({ message: 'Todo created successfully', todo: savedTodo });
        } catch (error) {
            res.status(500).send({ message: error.message });
        }
    },
    getTodos: async (req, res) => {
        try {
            const todos = await Todo.find({}, { __v: 0 });

            res.status(200).send({ message: 'Todos fetched successfully', todos });
        } catch (error) {
            res.status(500).send({ message: error.message });
        }
    }
}

module.exports = todoController;