import React from 'react';

const GearInventory = () => {
  const inventory = [
    { id: 1, name: 'Sony Alpha A7 IV', sku: 'CAM-SY-A74-001', category: 'Cameras', stock: '8 / 12', price: '$120/day', status: 'In Stock' },
    { id: 2, name: 'Canon RF 50mm f/1.2L USM', sku: 'LNS-CN-50F12-04', category: 'Lenses', stock: '0 / 4', price: '$45/day', status: 'Out on Rent' },
    { id: 3, name: 'Aputure Light Storm 600d Pro', sku: 'LGT-AP-600D-12', category: 'Lighting', stock: '1 / 2', price: '$95/day', status: 'Maintenance' },
    { id: 4, name: 'DJI RS 3 Gimbal Stabilizer', sku: 'GIM-DJ-RS3-08', category: 'Accessories', stock: '5 / 5', price: '$60/day', status: 'In Stock' }
  ];

  return (
    <div className="p-8">
      <div className="flex justify-between items-center mb-8">
        <div>
          <h1 className="text-2xl font-bold">Gear Inventory</h1>
          <p className="text-gray-600 dark:text-slate-400">Manage and track 124 professional photography assets</p>
        </div>
        <button className="bg-primary text-gray-900 dark:text-white px-6 py-3 rounded-xl font-bold flex items-center gap-2">
          <span className="material-symbols-outlined">add</span>
          Add New Item
        </button>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
        <div className="bg-slate-800 p-6 rounded-xl border border-slate-700">
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-sm text-gray-600 dark:text-slate-400">Total Assets</h3>
            <span className="material-symbols-outlined text-gray-600 dark:text-slate-400">inventory</span>
          </div>
          <span className="text-3xl font-bold">124</span>
        </div>
        <div className="bg-slate-800 p-6 rounded-xl border border-slate-700">
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-sm text-gray-600 dark:text-slate-400">Currently Rented</h3>
            <span className="material-symbols-outlined text-primary">shopping_cart_checkout</span>
          </div>
          <span className="text-3xl font-bold">32</span>
        </div>
        <div className="bg-slate-800 p-6 rounded-xl border border-slate-700">
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-sm text-gray-600 dark:text-slate-400">In Maintenance</h3>
            <span className="material-symbols-outlined text-red-500">build</span>
          </div>
          <span className="text-3xl font-bold">5</span>
        </div>
      </div>

      {/* Search and Filters */}
      <div className="flex gap-4 mb-6">
        <div className="flex-1 relative">
          <span className="material-symbols-outlined absolute left-3 top-1/2 -translate-y-1/2 text-gray-600 dark:text-slate-400">search</span>
          <input 
            type="text" 
            placeholder="Search by equipment name, SKU, or serial number..."
            className="w-full pl-10 pr-4 py-3 bg-slate-800 border border-slate-700 rounded-xl text-gray-900 dark:text-white placeholder-slate-400 focus:ring-2 focus:ring-primary"
          />
        </div>
        <button className="px-4 py-3 bg-slate-800 border border-slate-700 rounded-xl text-gray-900 dark:text-white hover:bg-slate-700 flex items-center gap-2">
          Category
          <span className="material-symbols-outlined">keyboard_arrow_down</span>
        </button>
        <button className="px-4 py-3 bg-slate-800 border border-slate-700 rounded-xl text-gray-900 dark:text-white hover:bg-slate-700 flex items-center gap-2">
          Status
          <span className="material-symbols-outlined">keyboard_arrow_down</span>
        </button>
      </div>

      {/* Inventory Table */}
      <div className="bg-slate-800 rounded-xl border border-slate-700 overflow-hidden">
        <table className="w-full">
          <thead className="bg-slate-900 border-b border-slate-700">
            <tr>
              <th className="px-6 py-4 text-left text-xs font-bold uppercase text-gray-600 dark:text-slate-400">Item & SKU</th>
              <th className="px-6 py-4 text-left text-xs font-bold uppercase text-gray-600 dark:text-slate-400">Category</th>
              <th className="px-6 py-4 text-left text-xs font-bold uppercase text-gray-600 dark:text-slate-400">Stock</th>
              <th className="px-6 py-4 text-left text-xs font-bold uppercase text-gray-600 dark:text-slate-400">Rental Price</th>
              <th className="px-6 py-4 text-left text-xs font-bold uppercase text-gray-600 dark:text-slate-400">Status</th>
              <th className="px-6 py-4 text-right text-xs font-bold uppercase text-gray-600 dark:text-slate-400">Actions</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-700">
            {inventory.map((item) => (
              <tr key={item.id} className="hover:bg-slate-700/50">
                <td className="px-6 py-4">
                  <div>
                    <div className="font-bold">{item.name}</div>
                    <div className="text-sm text-gray-600 dark:text-slate-400">{item.sku}</div>
                  </div>
                </td>
                <td className="px-6 py-4">
                  <span className="px-3 py-1 rounded-full text-xs font-semibold bg-primary/10 text-primary border border-primary/20">
                    {item.category}
                  </span>
                </td>
                <td className="px-6 py-4 font-medium">{item.stock}</td>
                <td className="px-6 py-4 font-bold">{item.price}</td>
                <td className="px-6 py-4">
                  <div className="flex items-center gap-2">
                    <div className={`w-2 h-2 rounded-full ${
                      item.status === 'In Stock' ? 'bg-green-500' :
                      item.status === 'Out on Rent' ? 'bg-orange-500' :
                      'bg-red-500'
                    }`}></div>
                    <span className={`text-sm font-medium ${
                      item.status === 'In Stock' ? 'text-green-400' :
                      item.status === 'Out on Rent' ? 'text-orange-400' :
                      'text-red-400'
                    }`}>
                      {item.status}
                    </span>
                  </div>
                </td>
                <td className="px-6 py-4 text-right">
                  <button className="text-gray-600 dark:text-slate-400 hover:text-primary">
                    <span className="material-symbols-outlined">more_vert</span>
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default GearInventory;
