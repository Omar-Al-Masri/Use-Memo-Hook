import { useMemo, useState } from "react";

function Form() {
  const [name, setName] = useState("");
  const [amount, setAmount] = useState("");
  const [expenses, setExpenses] = useState([]);
  const [category, setCategory] = useState("Food");
  const [filter, setFilter] = useState("All");

  // Update the displayed list only when expenses or the filter changes.
  const filteredExpenses = useMemo(() => {
    if (filter === "All") return expenses;
    return expenses.filter((expense) => expense.category === filter);
  }, [expenses, filter]);

  // Calculate the total for the expenses currently displayed.
  const total = useMemo(() => {
    return filteredExpenses.reduce((sum, expense) => sum + expense.amount, 0);
  }, [filteredExpenses]);

  function handleSubmit(event) {
    event.preventDefault();
    const value = Number(amount);

    const newExpense = {
      id: crypto.randomUUID(),
      name: name,
      amount: value,
      category: category,
    };
    setExpenses([...expenses, newExpense]);
    setName("");
    setAmount("");
  }

  function removeExpense(id) {
    setExpenses(expenses.filter((expense) => expense.id !== id));
  }

  return (
    <main className="expense-tracker">
      <h1>Expense Tracker</h1>
      <p>Add your expenses and keep track of your total.</p>
      <form onSubmit={handleSubmit} className="expense-form">
        <label htmlFor="expense-name">Expense name</label>
        <input
          id="expense-name"
          value={name}
          onChange={(event) => setName(event.target.value)}
          placeholder="e.g. Groceries"
        />
        <label htmlFor="expense-amount">Amount ($)</label>
        <input
          id="expense-amount"
          type="number"
          step="any"
          value={amount}
          onChange={(event) => setAmount(event.target.value)}
          placeholder="e.g. 25.00"
        />
        <label htmlFor="expense-category">Category</label>
        <select id="expense-category" value={category}
          onChange={(event) => setCategory(event.target.value)}>
          <option>Food</option>
          <option>Transport</option>
          <option>Shopping</option>
          <option>Other</option>
        </select>
        <button type="submit">Add expense</button>
      </form>
      <label htmlFor="category-filter">Show category</label>
      <select id="category-filter" value={filter}
        onChange={(event) => setFilter(event.target.value)}>
        <option>All</option>
        <option>Food</option>
        <option>Transport</option>
        <option>Shopping</option>
        <option>Other</option>
      </select>
      <h2>Displayed total: ${total.toFixed(2)}</h2>
      <p>Expenses shown: {filteredExpenses.length}</p>
      <p className="memo-note">
        useMemo remembers the filtered list and its total while you type.
        They update when expenses or the category filter changes.
      </p>
      {filteredExpenses.length === 0 ? (
        <p>No expenses to show. Add an expense or choose another category.</p>
      ) : (
        <ul className="expense-list">
          {filteredExpenses.map((expense) => (
            <li key={expense.id}>
              <span>{expense.name} <small>({expense.category})</small></span>
              <strong>${expense.amount.toFixed(2)}</strong>
              <button
                type="button"
                onClick={() => removeExpense(expense.id)}
              >
                Remove
              </button>
            </li>
          ))}
        </ul>
      )}
    </main>
  );
}

export default Form;
