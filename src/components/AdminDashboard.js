import React, { useState, useEffect } from 'react';

const AdminDashboard = () => {
  const [inventory, setInventory] = useState([]);
  const [newItem, setNewItem] = useState({ name: '', quantity: 0 });
  const [reports, setReports] = useState([]);
  const [kitRequests, setKitRequests] = useState([]);
  const [contributions, setContributions] = useState([]);
  const [totalFunds, setTotalFunds] = useState(0);

  useEffect(() => {
    const storedInventory = JSON.parse(localStorage.getItem('inventory')) || [];
    const storedReports = JSON.parse(localStorage.getItem('reports')) || [];
    const storedRequests = JSON.parse(localStorage.getItem('kitRequests')) || [];
    const storedContributions = JSON.parse(localStorage.getItem('contributions')) || [];
    const storedTotalFunds = Number(localStorage.getItem('totalFunds')) || 0;
    setInventory(storedInventory);
    setReports(storedReports);
    setKitRequests(storedRequests);
    setContributions(storedContributions);
    setTotalFunds(storedTotalFunds);
  }, []);

  const addItem = () => {
    if (newItem.name && newItem.quantity > 0) {
      const updatedInventory = [...inventory, { id: Date.now(), ...newItem }];
      setInventory(updatedInventory);
      localStorage.setItem('inventory', JSON.stringify(updatedInventory));
      setNewItem({ name: '', quantity: 0 });
    }
  };

  const updateItem = (id, quantity) => {
    const updatedInventory = inventory.map(item =>
      item.id === id ? { ...item, quantity } : item
    );
    setInventory(updatedInventory);
    localStorage.setItem('inventory', JSON.stringify(updatedInventory));
  };

  const deleteItem = (id) => {
    const updatedInventory = inventory.filter(item => item.id !== id);
    setInventory(updatedInventory);
    localStorage.setItem('inventory', JSON.stringify(updatedInventory));
  };

  return (
    <div className="min-h-screen bg-[url('/images/admin-bg.jpg')] bg-cover bg-center py-8">
      <div className="container mx-auto p-4">
        <h2 className="text-4xl font-bold mb-8 text-center text-white drop-shadow-lg">Admin Dashboard</h2>
        <div className="card p-6 mb-8">
          <h3 className="text-2xl font-semibold mb-4 text-blue-800">Total Funds Raised</h3>
          <p className="text-lg font-medium text-gray-700">Total: ${totalFunds.toFixed(2)}</p>
        </div>
        <div className="card p-6 mb-8">
          <h3 className="text-2xl font-semibold mb-4 text-blue-800">Contributions</h3>
          <ul className="space-y-4">
            {contributions.map(contribution => (
              <li key={contribution.id} className="p-4 bg-white rounded-lg shadow">
                <p className="font-semibold">Name: {contribution.name}</p>
                <p>Amount: ${contribution.amount.toFixed(2)}</p>
              </li>
            ))}
          </ul>
        </div>
        <div className="card p-6 mb-8">
          <h3 className="text-2xl font-semibold mb-4 text-blue-800">Manage Inventory</h3>
          <div className="flex flex-col md:flex-row gap-4 mb-6">
            <input
              type="text"
              placeholder="Item Name (e.g., Health Kit)"
              value={newItem.name}
              onChange={(e) => setNewItem({ ...newItem, name: e.target.value })}
              className="p-3 border rounded-lg flex-1 focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
            <input
              type="number"
              placeholder="Quantity"
              value={newItem.quantity}
              onChange={(e) => setNewItem({ ...newItem, quantity: Number(e.target.value) })}
              className="p-3 border rounded-lg w-full md:w-32 focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
            <button onClick={addItem} className="btn-primary">Add Item</button>
          </div>
          <ul className="space-y-4">
            {inventory.map(item => (
              <li key={item.id} className="flex justify-between items-center p-4 bg-white rounded-lg shadow">
                <span className="text-lg font-medium">{item.name}: {item.quantity}</span>
                <div className="space-x-2">
                  <button
                    onClick={() => updateItem(item.id, item.quantity + 1)}
                    className="btn-secondary px-3 py-1"
                  >
                    +
                  </button>
                  <button
                    onClick={() => updateItem(item.id, Math.max(0, item.quantity - 1))}
                    className="btn-secondary px-3 py-1"
                  >
                    -
                  </button>
                  <button
                    onClick={() => deleteItem(item.id)}
                    className="bg-red-600 text-white px-3 py-1 rounded-lg hover:bg-red-700"
                  >
                    Delete
                  </button>
                </div>
              </li>
            ))}
          </ul>
        </div>
        <div className="card p-6 mb-8">
          <h3 className="text-2xl font-semibold mb-4 text-blue-800">Supply Requests</h3>
          <ul className="space-y-4">
            {kitRequests.map(request => (
              <li key={request.id} className="p-4 bg-white rounded-lg shadow">
                <p className="font-semibold">Name: {request.name}</p>
                <p>Age: {request.age}</p>
                <p>Item: {request.item}</p>
                <p>Quantity: {request.kits}</p>
              </li>
            ))}
          </ul>
        </div>
        <div className="card p-6">
          <h3 className="text-2xl font-semibold mb-4 text-blue-800">User Reports</h3>
          <ul className="space-y-4">
            {reports.map(report => (
              <li key={report.id} className="p-4 bg-white rounded-lg shadow">
                <p className="font-semibold"><strong>Location:</strong> {report.location}</p>
                <p><strong>Description:</strong> {report.description}</p>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </div>
  );
};

export default AdminDashboard;