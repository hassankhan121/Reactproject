import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Route, Link, Switch } from 'react-router-dom';


const storageKey = 'inventoryItems';

function InventoryManagementSystem() {
  const [items, setItems] = useState([]);


  useEffect(() => {
    const storedItems = JSON.parse(localStorage.getItem(storageKey)) || [];
    setItems(storedItems);
  }, []);


  useEffect(() => {
    localStorage.setItem(storageKey, JSON.stringify(items));
  }, [items]);


  const addItem = (item) => {
    setItems([...items, item]);
  };

  const editItem = (itemId, updatedItem) => {
    const updatedItems = items.map((item) =>
      item.id === itemId ? { ...item, ...updatedItem } : item
    );
    setItems(updatedItems);
  };

  const deleteItem = (itemId) => {
    const updatedItems = items.filter((item) => item.id !== itemId);
    setItems(updatedItems);
  };

  const increaseQty = (itemId) => {
    const updatedItems = items.map((item) =>
      item.id === itemId ? { ...item, quantity: item.quantity + 1 } : item
    );
    setItems(updatedItems);
  };


  const decreaseQty = (itemId) => {
    const updatedItems = items.map((item) =>
      item.id === itemId && item.quantity > 0
        ? { ...item, quantity: item.quantity - 1 }
        : item
    );
    setItems(updatedItems);
  };

  return (
    <Router>
      <div>
        <h1>Inventory Management System</h1>
        <nav>
          <ul>
            <li>
              <Link to="/">Home</Link>
            </li>
            <li>
              <Link to="/add">Add Item</Link>
            </li>
          </ul>
        </nav>

        <Switch>
          <Route path="/" exact>
            {/* Display inventory list */}
            <h2>Inventory List</h2>
            <ol>
              {items.map((item) => (
                <li key={item.id}>
                  {item.name}  - Qty : {item.quantity}  - Unit :  {item.unit}
                  <button onClick={ () => increaseQty (item.id) } >   + </button>
                  <button onClick={ () => decreaseQty (item.id) } > - </button>
                  <Link to = {`/edit/${item.id}`}> Edit </Link>
                  <button onClick={ () => deleteItem (item.id) } > Delete </button>
                </li>
              ))}
            </ol>
          </Route>
          <Route path="/add">
            {/* Add item form */}
            <h2>Add Item</h2>
            <ItemForm onSubmit={addItem} />

          </Route>
          <Route path="/edit/:id">
            {/* Edit item form */}
            <h2>Edit Item</h2>
            <EditItemForm onSubmit= {editItem} />
          </Route>
        </Switch>
      </div>
    </Router>
  );
}

// Component for adding/editing an item
function ItemForm({ onSubmit }) {
  const [name, setName] = useState('');
  const [quantity, setQuantity] = useState(0);
  const [unit, setUnit] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    const newItem = { id: Date.now(), name, quantity , unit};
    onSubmit(newItem);
    setName('');
    setQuantity(0);
    setUnit('');

  };

  return (
    <form onSubmit={handleSubmit}>
      <div>
        <label>
          Name:
          <input
            type="text"
            value={name}
            onChange={(e) => setName(e.target.value)}
          />
        </label>
      </div>
      <div>
        <label>
          Quantity:
          <input
            type="number"
            value={quantity}
            onChange={(e) => setQuantity(parseInt(e.target.value))}
          />
        </label>
      </div>
      <div>
        <label>
          Unit:
          <input
            type="text"
            value={unit}
            onChange={(e) => setUnit(e.target.value)}
          />
        </label>
      </div>

      <div>
        <button type="submit">Save</button>
      </div>
    </form>
  );
}

// Component for editing an item
function EditItemForm({ onSubmit }) {
  const [name, setName] = useState('');
  const [quantity, setQuantity] = useState(0);
  const [unit, setUnit] = useState('');
  const handleSubmit = (e) => {
    e.preventDefault();
    const updatedItem = { name, quantity , unit};
    onSubmit( updatedItem);
  };

  return (
    <form onSubmit={handleSubmit}>
      <div>
        <label>
          Name:
          <input
            type="text"
            value={name}
            onChange={(e) => setName(e.target.value)}
          />
        </label>
      </div>
      <div>
        <label>
          Quantity:
          <input
            type="number"
            value={quantity}
            onChange={(e) => setQuantity(parseInt(e.target.value))}
          />
        </label>
      </div>
      <div>
        <label>
          Unit:
          <input
            type="text"
            value={unit}
            onChange = { (e) => setUnit ( e.target.value ) }
          />
        </label>
      </div>
      <div>
    
        <button type="submit"> Save </button>
      </div>
    </form>
  );
}

export default InventoryManagementSystem;
