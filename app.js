var express = require("express");

                                                  //mongoose
const mongoose =require("mongoose");

const {v4:uuidv4}=require("uuid");
const app = express();

app.use(express.json());     //middleware  ,to instruct the app to use this json


mongoose.connect("mongodb+srv://mkaviyarasu068:USER@cluster0.nefr26o.mongodb.net/expense").then(()=>{
    console.log("connected to data base!");
});


const expenseSchema=new mongoose.Schema({
    id:{type:String ,required:true,unique:true},
    title:{type: String,required: true},
    amount:{type:Number,required: true},

});

const Expense =mongoose.model("Expenses",expenseSchema);

app.post("/api/expenses", async (req, res) => {                               //post
    try {
        const { title, amount } = req.body;

        const newExpense = new Expense({
            id: uuidv4(),
            title,
            amount,
        });
        const savedExpense = await newExpense.save();
        res.status(200).json(savedExpense);
    } catch (error) {
        console.error("Error saving expense:", error);
        res.status(500).json({ error: "Failed to save expense" });
    }
});

app.get("/api/expenses",async (req,res)=>{
    try{
    const expense=await Expense.find();
    res.status(200).json(expense);
    }catch(error){
        console.error("error",error);

    }

});

app.get("/api/expenses/:id",async(req,res)=>{
    try{
        const {id}=req.params
        const expense =await Expense.findOne({id});
        if(!expense){
            return res.status(404).json({message :"expenses not  found"});
        }
        res.status(200).json(expense);
    }
    catch(error){
        res.status(500).json({message:"not found"});
    }

});


app.put("/api/expenses/:id", async (req, res) => {
    try {
        const { id } = req.params;
        const { title, amount } = req.body;

        const updatedExpense = await Expense.findOneAndUpdate(
            { id },
            { title, amount:3000 },
            { new: true } 
        );

        if (!updatedExpense) {
            return res.status(404).json({ message: "Expense not found" });
        }

        res.status(200).json(updatedExpense);
    } catch (error) {
        console.error("Error updating expense:", error);
        res.status(500).json({ error: "Failed to update expense" });
    }
});


app.delete("/api/expenses/:id", async (req, res) => {
    try {
        const { id } = req.params;

        const deletedExpense = await Expense.findOneAndDelete({ id });

        if (!deletedExpense) {
            return res.status(404).json({ message: "Expense not found" });
        }

        res.status(200).json({ message: "Expense deleted successfully", deletedExpense });
    } catch (error) {
        console.error("Error deleting expense:", error);
        res.status(500).json({ error: "Failed to delete expense" });
    }
});


app.listen(3000, () => {
    console.log("It's running bro");
});




















/* app.get("/api/sayhello", (req, res) => {
    res.send("Hello, bro student!");
    res.end();
});


app.get("/api/students", (req, res) => {
    res.status(200).json(students);
});


app.get("/api/students/:rollno", (req, res) => {
    const { rollno } = req.params;
    console.log("Roll Number:", rollno);

    
    const student = students.find(student => student.roll === parseInt(rollno));

    if (!student) {
        
        return res.status(404).json({ error: "Student not found" });
    }

    
    res.status(200).json(student);
});


app.listen(3000, () => {
    console.log("It's running bro: http://localhost:3000!");
});   */
