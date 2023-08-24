import React, { useState } from 'react';
import ExpenseForm from './components/ExpenseForm';
import ExpenseList from './components/ExpenseList';
import Expense from './types'; 
import './App.css';
const App: React.FC = () => {
  const [expenses, setExpenses] = useState<Expense[]>([]);
  const [filteredCategory, setFilteredCategory] = useState<string | 'all'>('all');

  const handleExpenseSubmit = (expense: Expense) => {
    setExpenses([...expenses, expense]);
  };

  const handleExpenseDelete = (id: number) => {
    const updatedExpenses = expenses.filter((expense) => expense.id !== id);
    setExpenses(updatedExpenses);
  };

  const categories = [...new Set(expenses.map((expense) => expense.category))];

  const filteredExpenses = filteredCategory === 'all' ? expenses : expenses.filter((expense) => expense.category === filteredCategory);

  return (
    <div>
      <h1>Expense Tracker</h1>
      <ExpenseForm onSubmit={handleExpenseSubmit} categories={categories} />
      <ExpenseList expenses={filteredExpenses} onDelete={handleExpenseDelete} />
    </div>
  );
};

export default App;
