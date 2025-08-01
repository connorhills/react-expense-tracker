const xlsx = require('xlsx');
const Expense = require("../models/Expense");

// Add Expense Source  
exports.addExpense = async (req, res) => {
    const userId = req.user.id;

    try {
        const { icon, description, amount, date } = req.body;

        // Validation: Check for missing fields
        if (!description || !amount || !date) {
            return res.status(400).json({ message: "All fields are required" });
        }

        const newExpense = new Expense({
            userId,
            icon,
            description,
            amount,
            date: new Date(date)
        });

        await newExpense.save();
        res.status(200).json(newExpense);
    } catch (error) {
        res.status(500).json({ message: "Server Error" });
    }
};

// Get All Expense Source  
exports.getAllExpense = async (req, res) => {
    const userId = req.user.id;

    try {
        const expense = await Expense.find({ userId }).sort({ date: -1 });
        res.json(expense);
    } catch (error) {
        res.status(500).json({ message: "Server Error" });
    }
};

// Delete Expense Source  
exports.deleteExpense = async (req, res) => {
    try {
        await Expense.findByIdAndDelete(req.params.id);
        res.json({ message: "Income deleted successfully" });
    } catch (error) {
        res.status(500).json({ message: "Server Error" });
    }
}

// Download Excel   
exports.downloadExpenseExcel = async (req, res) => {
    const userId = req.user.id;

    try {
        const expense = await Expense.find({ userId }).sort({ date: -1 });

        // Prepare data for Excel
        const data = expense.map((item) => ({
            Description: item.description,
            Amount: item.amount,
            Date: item.date,
        }));

        const wb = xlsx.utils.book_new();
        const ws = xlsx.utils.json_to_sheet(data);

        // Set column widths in characters for xlsx
        ws['!cols'] = [
            { wch: 20 }, // Description 
            { wch: 10 }, // Amount 
            { wch: 15 }, // Date 
        ];

        xlsx.utils.book_append_sheet(wb, ws, "Expense");
        xlsx.writeFile(wb, 'expense.xlsx');
        res.download('expense.xlsx');
    } catch (error) {
        res.status(500).json({ message: "Server Error" });
    }
}

