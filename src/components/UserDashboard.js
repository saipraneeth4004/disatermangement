import React, { useState, useEffect } from 'react';

const UserDashboard = () => {
  const [inventory, setInventory] = useState([]);
  const [report, setReport] = useState({ location: '', description: '' });
  const [kitRequest, setKitRequest] = useState({ name: '', age: '', item: '', kits: 0 });
  const [requestError, setRequestError] = useState('');
  const [contribution, setContribution] = useState({ name: '', amount: 0 });
  const [contributionError, setContributionError] = useState('');
  const [totalFunds, setTotalFunds] = useState(0);

  useEffect(() => {
    const storedInventory = JSON.parse(localStorage.getItem('inventory')) || [];
    const storedTotalFunds = Number(localStorage.getItem('totalFunds')) || 0;
    setInventory(storedInventory);
    setTotalFunds(storedTotalFunds);
    if (storedInventory.length > 0) {
      setKitRequest(prev => ({ ...prev, item: storedInventory[0].name }));
    }
  }, []);

  const submitReport = () => {
    if (report.location && report.description) {
      const newReport = { id: Date.now(), ...report };
      const storedReports = JSON.parse(localStorage.getItem('reports')) || [];
      const updatedReports = [...storedReports, newReport];
      localStorage.setItem('reports', JSON.stringify(updatedReports));
      setReport({ location: '', description: '' });
      alert('Report submitted successfully!');
    }
  };

  const submitKitRequest = () => {
    if (!kitRequest.name || !kitRequest.age || !kitRequest.item || kitRequest.kits <= 0) {
      setRequestError('Please fill all fields and request at least 1 item.');
      return;
    }

    const storedInventory = JSON.parse(localStorage.getItem('inventory')) || [];
    const selectedItem = storedInventory.find(item => item.name === kitRequest.item);
    
    if (!selectedItem || selectedItem.quantity < kitRequest.kits) {
      setRequestError(`Not enough ${kitRequest.item}s available.`);
      return;
    }

    const updatedInventory = storedInventory.map(item =>
      item.name === kitRequest.item
        ? { ...item, quantity: item.quantity - kitRequest.kits }
        : item
    );
    localStorage.setItem('inventory', JSON.stringify(updatedInventory));
    setInventory(updatedInventory);

    const newRequest = { id: Date.now(), name: kitRequest.name, age: kitRequest.age, item: kitRequest.item, kits: kitRequest.kits };
    const storedRequests = JSON.parse(localStorage.getItem('kitRequests')) || [];
    const updatedRequests = [...storedRequests, newRequest];
    localStorage.setItem('kitRequests', JSON.stringify(updatedRequests));

    setKitRequest({ name: '', age: '', item: kitRequest.item, kits: 0 });
    setRequestError('');
    alert('Request submitted successfully!');
  };

  const submitContribution = () => {
    if (!contribution.name || contribution.amount <= 0) {
      setContributionError('Please enter your name and a valid amount.');
      return;
    }

    const newContribution = { id: Date.now(), name: contribution.name, amount: Number(contribution.amount) };
    const storedContributions = JSON.parse(localStorage.getItem('contributions')) || [];
    const updatedContributions = [...storedContributions, newContribution];
    localStorage.setItem('contributions', JSON.stringify(updatedContributions));

    const newTotalFunds = totalFunds + Number(contribution.amount);
    localStorage.setItem('totalFunds', newTotalFunds);
    setTotalFunds(newTotalFunds);

    setContribution({ name: '', amount: 0 });
    setContributionError('');
    alert('Contribution submitted successfully!');
  };

  const awarenessContent = [
    {
      img: '/images/first-aid.jpg',
      caption: 'Learn First Aid: Be prepared to help in emergencies.',
    },
    {
      img: '/images/evacuation-plan.jpg',
      caption: 'Create an Evacuation Plan: Know your escape routes.',
    },
    {
      img: '/images/emergency-kit.jpg',
      caption: 'Build an Emergency Kit: Include food, water, and medical supplies.',
    },
  ];

  return (
    <div className="min-h-screen bg-[url('/images/user-bg.jpg')] bg-cover bg-center py-8">
      <div className="container mx-auto p-4">
        <h2 className="text-4xl font-bold mb-8 text-center text-white drop-shadow-lg">User Dashboard</h2>
        <div className="card p-6 mb-8">
          <h3 className="text-2xl font-semibold mb-4 text-blue-800">Total Funds Raised</h3>
          <p className="text-lg font-medium text-gray-700">Total: ${totalFunds.toFixed(2)}</p>
        </div>
        <div className="card p-6 mb-8">
          <h3 className="text-2xl font-semibold mb-4 text-blue-800">Contribute Funds</h3>
          {contributionError && <p className="text-red-500 mb-4">{contributionError}</p>}
          <div className="space-y-4">
            <input
              type="text"
              placeholder="Your Name"
              value={contribution.name}
              onChange={(e) => setContribution({ ...contribution, name: e.target.value })}
              className="w-full p-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
            <input
              type="number"
              placeholder="Amount ($)"
              value={contribution.amount}
              onChange={(e) => setContribution({ ...contribution, amount: Number(e.target.value) })}
              className="w-full p-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
            <button
              onClick={submitContribution}
              className="btn-primary w-full"
            >
              Contribute
            </button>
          </div>
        </div>
        <div className="card p-6 mb-8">
          <h3 className="text-2xl font-semibold mb-4 text-blue-800">Available Inventory</h3>
          <ul className="space-y-4">
            {inventory.map(item => (
              <li key={item.id} className="p-4 bg-white rounded-lg shadow">
                {item.name}: {item.quantity}
              </li>
            ))}
          </ul>
        </div>
        <div className="card p-6 mb-8">
          <h3 className="text-2xl font-semibold mb-4 text-blue-800">Request Supplies</h3>
          {requestError && <p className="text-red-500 mb-4">{requestError}</p>}
          <div className="space-y-4">
            <input
              type="text"
              placeholder="Your Name"
              value={kitRequest.name}
              onChange={(e) => setKitRequest({ ...kitRequest, name: e.target.value })}
              className="w-full p-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
            <input
              type="number"
              placeholder="Your Age"
              value={kitRequest.age}
              onChange={(e) => setKitRequest({ ...kitRequest, age: Number(e.target.value) })}
              className="w-full p-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
            <select
              value={kitRequest.item}
              onChange={(e) => setKitRequest({ ...kitRequest, item: e.target.value })}
              className="w-full p-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            >
              {inventory.length > 0 ? (
                inventory.map(item => (
                  <option key={item.id} value={item.name}>{item.name}</option>
                ))
              ) : (
                <option value="">No items available</option>
              )}
            </select>
            <input
              type="number"
              placeholder="Quantity"
              value={kitRequest.kits}
              onChange={(e) => setKitRequest({ ...kitRequest, kits: Number(e.target.value) })}
              className="w-full p-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
            <button
              onClick={submitKitRequest}
              className="btn-primary w-full"
            >
              Request Supplies
            </button>
          </div>
        </div>
        <div className="card p-6 mb-8">
          <h3 className="text-2xl font-semibold mb-4 text-blue-800">Submit Disaster Report</h3>
          <div className="space-y-4">
            <input
              type="text"
              placeholder="Location (e.g., City, Area)"
              value={report.location}
              onChange={(e) => setReport({ ...report, location: e.target.value })}
              className="w-full p-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
            <textarea
              placeholder="Describe the situation..."
              value={report.description}
              onChange={(e) => setReport({ ...report, description: e.target.value })}
              className="w-full p-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              rows="4"
            />
            <button
              onClick={submitReport}
              className="btn-primary w-full"
            >
              Submit Report
            </button>
          </div>
        </div>
        <div className="card p-6">
          <h3 className="text-2xl font-semibold mb-4 text-blue-800">Disaster Preparedness Tips</h3>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {awarenessContent.map((item, index) => (
              <div key={index} className="text-center">
                <img
                  src={item.img}
                  alt={item.caption}
                  className="awareness-img w-full h-48 object-cover mb-4"
                />
                <p className="text-gray-700 font-medium">{item.caption}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default UserDashboard;