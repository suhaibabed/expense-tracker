import React, { useState } from 'react';
import Expense from '../types';
import '../App.css';

interface ExpenseFormProps {
  onSubmit: (expense: Expense) => void;
  categories: string[];
}

const ExpenseForm: React.FC<ExpenseFormProps> = ({ onSubmit, categories }) => {
  const [description, setDescription] = useState('');
  const [amount, setAmount] = useState(0);
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);

  const toggleDropdown = () => {
    setIsDropdownOpen(!isDropdownOpen);
  };

  const handleCategorySelect = (category: string) => {
    setSelectedCategory(category);
    setIsDropdownOpen(false); // Close the dropdown after selecting a category
  };

  const handleSubmit = () => {
    const expense: Expense = {
      id: Math.random(),
      description,
      amount,
      category: selectedCategory || '',
    };
    onSubmit(expense);
    setDescription('');
    setAmount(0);
    setSelectedCategory(null);
  };

  return (
    <div>
      <input type="text" placeholder="Description" value={description} onChange={(e) => setDescription(e.target.value)} />
      <input type="number" placeholder="Amount" value={amount} onChange={(e) => setAmount(Number(e.target.value))} />
      <div className="dropdown">
        <button className="dropdown-button" onClick={toggleDropdown}>
          {selectedCategory === null ? 'Select Category' : selectedCategory}
        </button>
        {isDropdownOpen && (
          <ul className="dropdown-list">
            <li onClick={() => handleCategorySelect('personal')}>personal</li>
            <li onClick={() => handleCategorySelect('social')}>social</li>
            <li onClick={() => handleCategorySelect('work')}>work</li>
            {categories.map((cat) => (
              <li key={cat} onClick={() => handleCategorySelect(cat)}>
                {cat}
              </li>
            ))}
          </ul>
        )}
      </div>
      <button onClick={handleSubmit}>Submit</button>
    </div>
  );
};

export default ExpenseForm;
