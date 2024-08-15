// import React, { useState } from "react";
// import ItemForm from "./ItemForm";
// import Filter from "./Filter";
// import Item from "./Item";

// function ShoppingList() {
//   const [selectedCategory, setSelectedCategory] = useState("All");
//   const [items, setItems] = useState([]);

//   function handleCategoryChange(category) {
//     setSelectedCategory(category);
//   }

//   const itemsToDisplay = items.filter((item) => {
//     if (selectedCategory === "All") return true;

//     return item.category === selectedCategory;
//   });

//   return (
//     <div className="ShoppingList">
//       <ItemForm />
//       <Filter
//         category={selectedCategory}
//         onCategoryChange={handleCategoryChange}
//       />
//       <ul className="Items">
//         {itemsToDisplay.map((item) => (
//           <Item key={item.id} item={item} />
//         ))}
//       </ul>
//     </div>
//   );
// }

// export default ShoppingList;
// import React, { useState, useEffect } from 'react';
// import ItemForm from './ItemForm';

// const ShoppingList = () => {
//   const [items, setItems] = useState([]);

//   useEffect(() => {
//     fetchItems();
//   }, []);

//   const fetchItems = async () => {
//     const response = await fetch('http://localhost:4000/items');
//     const data = await response.json();
//     setItems(data);
//   };

//   const addItem = async (newItem) => {
//     const response = await fetch('http://localhost:4000/items', {
//       method: 'POST',
//       headers: {
//         'Content-Type': 'application/json',
//       },
//       body: JSON.stringify(newItem),
//     });
//     const addedItem = await response.json();
//     setItems([...items, addedItem]);
//   };

//   const toggleInCart = async (item) => {
//     const updatedItem = { ...item, isInCart: !item.isInCart };
//     const response = await fetch(`http://localhost:4000/items/${item.id}`, {
//       method: 'PATCH',
//       headers: {
//         'Content-Type': 'application/json',
//       },
//       body: JSON.stringify(updatedItem),
//     });
//     const updatedItemFromServer = await response.json();
//     setItems(items.map(i => i.id === item.id ? updatedItemFromServer : i));
//   };

//   const deleteItem = async (id) => {
//     await fetch(`http://localhost:4000/items/${id}`, {
//       method: 'DELETE',
//     });
//     setItems(items.filter(item => item.id !== id));
//   };

//   return (
//     <div>
//       <ItemForm onAddItem={addItem} />
//       <ul>
//         {items.map(item => (
//           <li key={item.id}>
//             {item.name} - {item.category}
//             <button onClick={() => toggleInCart(item)}>
//               {item.isInCart ? 'Remove From Cart' : 'Add to Cart'}
//             </button>
//             <button onClick={() => deleteItem(item.id)}>Delete</button>
//           </li>
//         ))}
//       </ul>
//     </div>
//   );
// };

// export default ShoppingList;
import React, { useState, useEffect } from 'react';
import ItemForm from './ItemForm';

const ShoppingList = () => {
  const [items, setItems] = useState([]);

  useEffect(() => {
    fetchItems();
  }, []);

  const fetchItems = async () => {
    const response = await fetch('http://localhost:4000/items');
    const data = await response.json();
    setItems(data);
  };

  const addItem = async (newItem) => {
    const response = await fetch('http://localhost:4000/items', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(newItem),
    });
    const addedItem = await response.json();
    setItems(prevItems => [...prevItems, addedItem]); // Use previous state for consistency
  };

  const toggleInCart = async (item) => {
    const updatedItem = { ...item, isInCart: !item.isInCart };
    const response = await fetch(`http://localhost:4000/items/${item.id}`, {
      method: 'PATCH',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(updatedItem),
    });
    const updatedItemFromServer = await response.json();
    setItems(items.map(i => i.id === item.id ? updatedItemFromServer : i));
  };

  const deleteItem = async (id) => {
    await fetch(`http://localhost:4000/items/${id}`, {
      method: 'DELETE',
    });
    setItems(items.filter(item => item.id !== id));
  };

  return (
    <div>
      <ItemForm onAddItem={addItem} />
      <ul>
        {items.map(item => (
          <li key={item.id}>
            {item.name} - {item.category}
            <button onClick={() => toggleInCart(item)}>
              {item.isInCart ? 'Remove From Cart' : 'Add to Cart'}
            </button>
            <button onClick={() => deleteItem(item.id)}>Delete</button>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default ShoppingList;
