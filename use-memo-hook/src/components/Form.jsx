import { useMemo, useState } from "react";

function Form() {
  const [name, setName] = useState("");
  const [amount, setAmount] = useState("");
  const [expenses, setExpenses] = useState([]);

  const total = useMemo(() => {
    return expenses.reduce((sum, expense) => sum + expense.amount, 0);
  }, [expenses]);

  function handleSubmit(event) {
    event.preventDefault();
    const value = Number(amount);

    const newExpense = {
      id: crypto.randomUUID(),
      name: name,
      amount: value,
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
        <button type="submit">Add expense</button>
      </form>
      <h2>Total spent: ${total.toFixed(2)}</h2>
      <p className="memo-note">
        useMemo caches the total while you type. Adding or removing an expense
        recalculates it.
      </p>
      {expenses.length === 0 ? (
        <p>No expenses yet. Add your first one above.</p>
      ) : (
        <ul className="expense-list">
          {expenses.map((expense) => (
            <li key={expense.id}>
              <span>{expense.name}</span>
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
