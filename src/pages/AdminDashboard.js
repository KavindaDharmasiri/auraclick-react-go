import React, { useState, useEffect, useRef } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { createPortal } from 'react-dom';
import authService from '../services/authService';
import gearService from '../services/gearService';
import toast from 'react-hot-toast';

// Mock data
const mockBookings = [
  {
    id: 1,
    date: 'Oct 28, 2023',
    time: '10:00 AM',
    client: 'Emma Thompson',
    avatar: 'https://lh3.googleusercontent.com/aida-public/AB6AXuBJupf6t7LuxNm1-MfHxnpX02unGIVnJNREkjV9C4cA6MBI9vJ5t_u5aOpXX-63UWjmQqdEZWS-YOzhEczKh-KompkvU4QrI54nwqseKnUO9G02ZCf7Nw6xcftKlXuDKN2rkMBjXO6pTbgxZEY15Rik2rQi3Q7bflGMSi1RZA4bD2IQbDf_11I7NsucweIM0jRIxOSKEQoROJA89xxYJ8ELYOwuawKEi-KSLVnl_ne5CeXqu9UVkBpKQg6TYB57yslKrl_pUraMM8fj',
    service: 'Outdoor Portrait',
    icon: 'camera',
    status: 'CONFIRMED',
    statusColor: 'bg-[#0bda5b]/10 text-[#0bda5b] border-[#0bda5b]/20',
    payment: 'Paid',
    paymentIcon: 'check_circle',
    paymentColor: 'text-green-500'
  },
  {
    id: 2,
    date: 'Oct 30, 2023',
    time: '2:00 PM',
    client: 'David Chen',
    avatar: 'https://lh3.googleusercontent.com/aida-public/AB6AXuBDsq171ZkD2msuEdHM0FitP0llMqKtEo3VfRRfXRJEib0-JDLkFp3kxU64V67fNKiSt8jjCfPcX6Ld7nlYOzLiZUORaxogLGYfHXKTarzIY1Y7Qf-7O5xGUTou-3TSgOZq-IAYB--dZAisFsnGDKdG7by1hpaK0mJ6PuHg3XVARLw33tCeoJWg2p8sg9znDB4vVabVGVSnCyINgBTS2SEGhfjv56-M-8D1465E1QxrcMuVZVfrnRr6RHZOFLTGuDMPIlCJjlFBl6GE',
    service: 'Studio Session',
    icon: 'flash_on',
    status: 'PENDING',
    statusColor: 'bg-[#fa6238]/10 text-[#fa6238] border-[#fa6238]/20',
    payment: 'Partial',
    paymentIcon: 'error',
    paymentColor: 'text-amber-500'
  },
  {
    id: 3,
    date: 'Nov 04, 2023',
    time: '12:00 PM',
    client: 'The Millers',
    avatar: 'https://lh3.googleusercontent.com/aida-public/AB6AXuDE2VrjwG5nmeNaV66klEDxo-fEMoqZDBWEICeVXLl5E31_XU-JiFoP7B6DKG9uLldTE-iOtnWPLktk9UyFy9yOJ9IIdRF13iR8OMq86V6tFkeQtMnMo0r2ekFM5PCK4QdEOTvxyJqGGpf_wV5j0Y2EGrMH_-7rrzoKZVZ_kd7MFedo44FaxSxEwjEm2CwKOmbv5MZsGiPLJTBycQBFe0Ip6BXJEokHFO4rgTClCM7NRweuU1R6cNBuafbG2EdhUKdUKkE0f7AIrh7V',
    service: 'Wedding Package',
    icon: 'favorite',
    status: 'CONFIRMED',
    statusColor: 'bg-[#0bda5b]/10 text-[#0bda5b] border-[#0bda5b]/20',
    payment: 'Paid',
    paymentIcon: 'check_circle',
    paymentColor: 'text-green-500'
  },
  {
    id: 4,
    date: 'Oct 25, 2023',
    time: '4:30 PM',
    client: 'Marcus James',
    avatar: 'https://lh3.googleusercontent.com/aida-public/AB6AXuCWg8BscTH66cnwHcvqgWLhaBJDZvkIGq6-kD-p_mGM4-v_h7HzC4PWIu6aVQN1CzKFlZ1In0bO4LyRXQP9an0ohoAnpq-4q1_5bBxCLUo9UoI7WByz8CQpY4HpL0T769FA7Hp3yZLu3iCVvG6sPG3xFoXfol62HByc8foqxhPzWdylSGX64D61idrWO4ztDilKt98cOEBozLkHfUuRH2bYc9mLVdc3nOwuFGIsIVs23d6LF1eU2hM0BdvtAGMIpIfrMg1RWzzIIQkX',
    service: 'Street Photography',
    icon: 'camera',
    status: 'COMPLETED',
    statusColor: 'bg-slate-500/10 text-slate-500 border-slate-500/20',
    payment: 'Paid',
    paymentIcon: 'check_circle',
    paymentColor: 'text-green-500'
  }
];

const AdminDashboard = () => {
  const [userType, setUserType] = useState('customer');
  const [isDark, setIsDark] = useState(false);
  const [showAddGearModal, setShowAddGearModal] = useState(false);
  const [showEditGearModal, setShowEditGearModal] = useState(false);
  const [editingGear, setEditingGear] = useState(null);
  const [gearList, setGearList] = useState([]);
  const [user, setUser] = useState(null);
  const [currentPage, setCurrentPage] = useState(0);
  const [totalPages, setTotalPages] = useState(0);
  const [totalElements, setTotalElements] = useState(0);
  const [pageSize] = useState(10);
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('');
  const [selectedStatus, setSelectedStatus] = useState('');
  const [categories, setCategories] = useState([]);
  const [statuses, setStatuses] = useState([]);
  const [brands, setBrands] = useState([]);
  const [showCategoryDropdown, setShowCategoryDropdown] = useState(false);
  const [showStatusDropdown, setShowStatusDropdown] = useState(false);
  const categoryButtonRef = useRef(null);
  const statusButtonRef = useRef(null);
  const [dropdownPosition, setDropdownPosition] = useState({ top: 0, left: 0 });
  const [showAddBrandModal, setShowAddBrandModal] = useState(false);
  const [newBrand, setNewBrand] = useState({ name: '', categoryId: '' });
  const [showAddCategoryModal, setShowAddCategoryModal] = useState(false);
  const [showAddStatusModal, setShowAddStatusModal] = useState(false);
  const [newCategory, setNewCategory] = useState('');
  const [newStatus, setNewStatus] = useState('');
  const [newGear, setNewGear] = useState({
    name: '',
    parentSku: '', // Master SKU for product family
    variantSku: '', // Child SKU for specific variant
    upc: '',
    ean: '',
    category: '',
    subcategory: '',
    stock: '',
    totalStock: '',
    rentalPrice: '',
    status: 'In Stock',
    description: '',
    brand: '',
    model: '',
    serialNumber: '',
    condition: 'Excellent',
    image: [],
    attributes: {}, // Color, Size, Version etc.
    location: '', // Warehouse location
    supplier: '',
    costPrice: ''
  });
  const location = useLocation();

  const handleEditGear = (gear) => {
    console.log('Editing gear:', gear); // Debug log
    console.log('Current gear status:', gear.status); // Debug log
    console.log('Available statuses:', statuses); // Debug log
    
    setEditingGear(gear);
    setNewGear({
      name: gear.name || '',
      sku: gear.sku || '',
      category: gear.category || '',
      stock: gear.stock ? gear.stock.toString() : '',
      totalStock: gear.totalStock ? gear.totalStock.toString() : '',
      rentalPrice: gear.rentalPrice ? gear.rentalPrice.toString() : '',
      status: gear.status || 'In Stock',
      description: gear.description || '',
      brand: gear.brand || '',
      model: gear.model || '',
      serialNumber: gear.serialNumber || '',
      condition: gear.condition || 'Excellent',
      image: []
    });
    
    console.log('Set newGear status to:', gear.status || 'In Stock'); // Debug log
    setShowEditGearModal(true);
  };

  const handleUpdateGear = async (e) => {
    e.preventDefault();
    try {
      const gearData = {
        name: newGear.name,
        brand: newGear.brand,
        model: newGear.model,
        serialNumber: newGear.serialNumber,
        category: newGear.category,
        description: newGear.description,
        stock: parseInt(newGear.stock),
        totalStock: parseInt(newGear.totalStock),
        rentalPrice: parseFloat(newGear.rentalPrice),
        status: newGear.status,
        condition: newGear.condition
      };

      console.log('Updating gear with data:', gearData);
      console.log('Updating gear with status:', newGear.status);
      console.log('Available statuses:', statuses);
      
      await gearService.updateGear(editingGear.id, gearData);
      toast.success('Gear updated successfully!');
      
      // Reset form
      setNewGear({ name: '', sku: '', category: '', stock: '', totalStock: '', rentalPrice: '', status: 'In Stock', description: '', brand: '', model: '', serialNumber: '', condition: 'Excellent', image: [] });
      setShowEditGearModal(false);
      setEditingGear(null);
      
      // Force reload with current filters
      await loadGear(currentPage, searchTerm, selectedCategory, selectedStatus);
    } catch (error) {
      console.error('Update error:', error);
      toast.error(error.message || 'Failed to update gear');
    }
  };

  const handleToggleAvailability = async (gear) => {
    try {
      const newStatus = gear.status === 'In Stock' ? 'Unavailable' : 'In Stock';
      await gearService.updateGear(gear.id, { ...gear, status: newStatus });
      toast.success(`Gear marked as ${newStatus.toLowerCase()}`);
      
      // Force reload with current filters
      await loadGear(currentPage, searchTerm, selectedCategory, selectedStatus);
    } catch (error) {
      toast.error('Failed to update gear status');
    }
  };

  const generateParentSKU = (category, brand) => {
    const catCode = getCategoryCode(category);
    const brandCode = getBrandCode(brand);
    const sequence = String(Date.now()).slice(-4);
    return `${catCode}${brandCode}${sequence}`;
  };

  const generateVariantSKU = (parentSku, attributes) => {
    const colorCode = attributes.color ? attributes.color.substring(0, 2).toUpperCase() : '';
    const sizeCode = attributes.size ? attributes.size.substring(0, 2).toUpperCase() : '';
    const versionCode = attributes.version ? attributes.version.substring(0, 2).toUpperCase() : '';
    return `${parentSku}-${colorCode}${sizeCode}${versionCode}`;
  };

  const getCategoryCode = (category) => {
    const codes = {
      'Cameras': 'CAM',
      'Lenses': 'LNS', 
      'Lighting': 'LGT',
      'Accessories': 'ACC',
      'Audio': 'AUD',
      'Tripods': 'TRP'
    };
    return codes[category] || 'GEN';
  };

  const getBrandCode = (brand) => {
    const codes = {
      'Sony': 'SNY',
      'Canon': 'CAN',
      'Nikon': 'NIK',
      'Fujifilm': 'FUJ',
      'Panasonic': 'PAN',
      'Olympus': 'OLY',
      'Aputure': 'APU',
      'Godox': 'GDX'
    };
    return codes[brand] || brand.substring(0, 3).toUpperCase();
  };

  const validateSKU = (sku) => {
    // Enterprise SKU validation rules
    const skuPattern = /^[A-Z]{3}[A-Z]{3}\d{4}(-[A-Z0-9]{2,6})?$/;
    return skuPattern.test(sku);
  };

  const handleAddGear = async (e) => {
    e.preventDefault();
    try {
      const gearData = {
        name: newGear.name,
        sku: newGear.parentSku,
        brand: newGear.brand,
        model: newGear.model,
        serialNumber: newGear.serialNumber || '',
        category: newGear.category,
        description: newGear.description || '',
        stock: parseInt(newGear.stock) || 0,
        totalStock: parseInt(newGear.totalStock) || 0,
        rentalPrice: parseFloat(newGear.rentalPrice) || 0,
        status: newGear.status,
        condition: newGear.condition
      };

      await gearService.createGear(gearData, newGear.image);
      toast.success('Gear added successfully!');
      setNewGear({ name: '', sku: '', category: '', stock: '', totalStock: '', rentalPrice: '', status: 'In Stock', description: '', brand: '', model: '', serialNumber: '', condition: 'Excellent', image: [] });
      setShowAddGearModal(false);
      loadGear();
    } catch (error) {
      toast.error(error.message || 'Failed to add gear');
    }
  };

  useEffect(() => {
    const type = localStorage.getItem('userType') || 'customer';
    setUserType(type);
    
    const theme = localStorage.getItem('theme');
    if (theme === 'dark') {
      setIsDark(true);
      document.documentElement.classList.add('dark');
    }

    // Get user info from localStorage
    const userInfo = localStorage.getItem('user');
    if (userInfo) {
      setUser(JSON.parse(userInfo));
    }

    // Load gear data
    if (type === 'admin') {
      loadGear();
      loadCategories();
      loadStatuses();
      loadBrands();
    }

    // Close dropdowns when clicking outside
    const handleClickOutside = (event) => {
      if (!event.target.closest('.relative')) {
        setShowCategoryDropdown(false);
        setShowStatusDropdown(false);
      }
    };

    document.addEventListener('click', handleClickOutside);
    return () => {
      document.removeEventListener('click', handleClickOutside);
    };
  }, []);

  const loadGear = async (page = 0, search = '', category = '', status = '') => {
    try {
      const params = new URLSearchParams({
        page: page.toString(),
        size: pageSize.toString()
      });
      
      if (search) params.append('search', search);
      if (category) params.append('category', category);
      if (status) params.append('status', status);
      
      const response = await fetch(`http://localhost:5555/api/gear?${params}`);
      const data = await response.json();
      
      setGearList(data.content);
      setTotalPages(data.totalPages);
      setTotalElements(data.totalElements);
      setCurrentPage(data.currentPage);
    } catch (error) {
      toast.error('Failed to load gear inventory');
    }
  };

  const loadCategories = async () => {
    try {
      const response = await fetch('http://localhost:5555/api/settings/categories');
      if (response.ok) {
        const data = await response.json();
        setCategories(data.map(cat => cat.name));
      } else {
        console.error('Failed to load categories:', response.status);
        // Set default categories if API fails
        setCategories(['Cameras', 'Lenses', 'Lighting', 'Accessories', 'Audio', 'Tripods']);
      }
    } catch (error) {
      console.error('Failed to load categories:', error);
      // Set default categories if API fails
      setCategories(['Cameras', 'Lenses', 'Lighting', 'Accessories', 'Audio', 'Tripods']);
    }
  };

  const loadStatuses = async () => {
    try {
      const response = await fetch('http://localhost:5555/api/settings/statuses');
      if (response.ok) {
        const data = await response.json();
        console.log('Loaded statuses from API:', data);
        setStatuses(data.map(status => status.name));
      } else {
        console.error('Failed to load statuses:', response.status);
        // Set default statuses if API fails - including 'Maintain'
        setStatuses(['In Stock', 'Out on Rent', 'Maintenance', 'Maintain', 'Unavailable', 'Pending']);
      }
    } catch (error) {
      console.error('Failed to load statuses:', error);
      // Set default statuses if API fails - including 'Maintain'
      setStatuses(['In Stock', 'Out on Rent', 'Maintenance', 'Maintain', 'Unavailable', 'Pending']);
    }
  };

  const addCategory = async (name) => {
    try {
      const response = await fetch('http://localhost:5555/api/settings/categories', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ name })
      });
      if (response.ok) {
        loadCategories();
        return true;
      }
      return false;
    } catch (error) {
      return false;
    }
  };

  const deleteCategory = async (index) => {
    try {
      const response = await fetch('http://localhost:5555/api/settings/categories');
      const data = await response.json();
      const categoryId = data[index]?.id;
      
      if (categoryId) {
        const deleteResponse = await fetch(`http://localhost:5555/api/settings/categories/${categoryId}`, {
          method: 'DELETE'
        });
        if (deleteResponse.ok) {
          loadCategories();
        }
      }
    } catch (error) {
      console.error('Failed to delete category');
    }
  };

  const addStatus = async (name) => {
    try {
      const response = await fetch('http://localhost:5555/api/settings/statuses', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ name })
      });
      if (response.ok) {
        loadStatuses();
        return true;
      }
      return false;
    } catch (error) {
      return false;
    }
  };

  const deleteStatus = async (index) => {
    try {
      const response = await fetch('http://localhost:5555/api/settings/statuses');
      const data = await response.json();
      const statusId = data[index]?.id;
      
      if (statusId) {
        const deleteResponse = await fetch(`http://localhost:5555/api/settings/statuses/${statusId}`, {
          method: 'DELETE'
        });
        if (deleteResponse.ok) {
          loadStatuses();
        }
      }
    } catch (error) {
      console.error('Failed to delete status');
    }
  };

  const loadBrands = async () => {
    try {
      const response = await fetch('http://localhost:5555/api/settings/brands');
      if (response.ok) {
        const data = await response.json();
        const brandsWithCategory = data.map(brand => ({
          id: brand.id,
          name: brand.name,
          categoryName: brand.category?.name || 'Unknown'
        }));
        setBrands(brandsWithCategory);
      }
    } catch (error) {
      console.error('Failed to load brands:', error);
    }
  };

  const deleteBrand = async (brandId) => {
    try {
      const response = await fetch(`http://localhost:5555/api/settings/brands/${brandId}`, {
        method: 'DELETE'
      });
      if (response.ok) {
        loadBrands();
      }
    } catch (error) {
      console.error('Failed to delete brand');
    }
  };

  const toggleTheme = () => {
    if (isDark) {
      setIsDark(false);
      localStorage.setItem('theme', 'light');
      document.documentElement.classList.remove('dark');
    } else {
      setIsDark(true);
      localStorage.setItem('theme', 'dark');
      document.documentElement.classList.add('dark');
    }
  };

  if (userType !== 'admin') {
    return (
      <div className="bg-background-dark text-slate-900 dark:text-white min-h-screen flex items-center justify-center">
        <div className="text-center">
          <div className="size-20 bg-primary/20 rounded-full flex items-center justify-center mx-auto mb-6">
            <span className="material-symbols-outlined text-4xl text-primary">admin_panel_settings</span>
          </div>
          <h2 className="text-2xl font-bold mb-4">Admin Access Required</h2>
          <p className="text-gray-600 dark:text-slate-400 mb-8">Please sign in with administrator credentials.</p>
          <button 
            onClick={() => {
              localStorage.setItem('userType', 'admin');
              setUserType('admin');
              window.location.reload();
            }}
            className="bg-primary hover:bg-primary/90 text-white px-6 py-3 rounded-xl font-bold mr-4"
          >
            Switch to Admin
          </button>
          <button 
            onClick={() => {
              localStorage.setItem('userType', 'customer');
              setUserType('customer');
              window.location.reload();
            }}
            className="border border-slate-600 hover:bg-slate-700 text-slate-900 dark:text-white px-6 py-3 rounded-xl font-bold"
          >
            Stay as Customer
          </button>
        </div>
      </div>
    );
  }

  const renderContent = () => {
    if (location.pathname === '/admin/bookings') {
      return (
        <div className="p-8 flex flex-col gap-6">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="bg-white dark:bg-[#111418] border border-slate-200 dark:border-[#3b4754] p-6 rounded-xl flex flex-col gap-1">
              <p className="text-slate-500 dark:text-slate-400 text-xs font-semibold uppercase tracking-wider">Total Bookings (Month)</p>
              <div className="flex items-end justify-between">
                <h3 className="text-3xl font-bold">128</h3>
                <span className="text-[#0bda5b] text-sm font-medium flex items-center gap-1">
                  <span className="material-symbols-outlined text-sm">trending_up</span> +12%
                </span>
              </div>
            </div>
            <div className="bg-white dark:bg-[#111418] border border-slate-200 dark:border-[#3b4754] p-6 rounded-xl flex flex-col gap-1">
              <p className="text-slate-500 dark:text-slate-400 text-xs font-semibold uppercase tracking-wider">Pending Confirmations</p>
              <div className="flex items-end justify-between">
                <h3 className="text-3xl font-bold">14</h3>
                <span className="text-[#fa6238] text-sm font-medium flex items-center gap-1">
                  <span className="material-symbols-outlined text-sm">trending_down</span> -5%
                </span>
              </div>
            </div>
            <div className="bg-white dark:bg-[#111418] border border-slate-200 dark:border-[#3b4754] p-6 rounded-xl flex flex-col gap-1">
              <p className="text-slate-500 dark:text-slate-400 text-xs font-semibold uppercase tracking-wider">Monthly Revenue</p>
              <div className="flex items-end justify-between">
                <h3 className="text-3xl font-bold">$12,450</h3>
                <span className="text-[#0bda5b] text-sm font-medium flex items-center gap-1">
                  <span className="material-symbols-outlined text-sm">trending_up</span> +8%
                </span>
              </div>
            </div>
          </div>
          <div className="flex flex-col md:flex-row items-center justify-between gap-4">
            <div className="flex items-center gap-3 overflow-x-auto w-full md:w-auto">
              <button className="flex items-center gap-2 px-4 py-2 bg-primary text-white rounded-lg text-sm font-medium">
                <span className="material-symbols-outlined text-lg">list</span>
                All Bookings
              </button>
              <button className="flex items-center gap-2 px-4 py-2 bg-slate-100 dark:bg-[#283039] hover:bg-slate-200 dark:hover:bg-[#3b4754] text-slate-700 dark:text-white rounded-lg text-sm font-medium transition-colors">
                <span className="material-symbols-outlined text-lg">camera</span>
                Photoshoots
              </button>
              <button className="flex items-center gap-2 px-4 py-2 bg-slate-100 dark:bg-[#283039] hover:bg-slate-200 dark:hover:bg-[#3b4754] text-slate-700 dark:text-white rounded-lg text-sm font-medium transition-colors">
                <span className="material-symbols-outlined text-lg">flash_on</span>
                Studio
              </button>
              <button className="flex items-center gap-2 px-4 py-2 bg-slate-100 dark:bg-[#283039] hover:bg-slate-200 dark:hover:bg-[#3b4754] text-slate-700 dark:text-white rounded-lg text-sm font-medium transition-colors">
                <span className="material-symbols-outlined text-lg">favorite</span>
                Weddings
              </button>
            </div>
            <div className="flex items-center gap-3 w-full md:w-auto">
              <button className="flex items-center gap-2 px-3 py-2 border border-slate-200 dark:border-[#3b4754] rounded-lg text-sm font-medium">
                <span className="material-symbols-outlined text-lg">calendar_month</span>
                Oct 1 - Oct 31, 2023
                <span className="material-symbols-outlined text-lg">arrow_drop_down</span>
              </button>
              <button className="flex items-center gap-2 px-3 py-2 border border-slate-200 dark:border-[#3b4754] rounded-lg text-sm font-medium">
                <span className="material-symbols-outlined text-lg">filter_list</span>
                Status
              </button>
            </div>
          </div>
          <div className="bg-white dark:bg-[#111418] border border-slate-200 dark:border-slate-800 rounded-xl overflow-hidden shadow-sm">
            <table className="w-full text-left border-collapse">
              <thead>
                <tr className="bg-slate-50 dark:bg-[#1a1f26] border-b border-slate-200 dark:border-slate-800">
                  <th className="px-6 py-4 text-xs font-bold uppercase tracking-wider text-slate-500">Date & Time</th>
                  <th className="px-6 py-4 text-xs font-bold uppercase tracking-wider text-slate-500">Client Name</th>
                  <th className="px-6 py-4 text-xs font-bold uppercase tracking-wider text-slate-500">Service Type</th>
                  <th className="px-6 py-4 text-xs font-bold uppercase tracking-wider text-slate-500">Status</th>
                  <th className="px-6 py-4 text-xs font-bold uppercase tracking-wider text-slate-500">Payment</th>
                  <th className="px-6 py-4 text-xs font-bold uppercase tracking-wider text-slate-500 text-right">Action</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100 dark:divide-[#283039]">
                {mockBookings.map((booking) => (
                  <tr key={booking.id} className="hover:bg-slate-50 dark:hover:bg-[#283039]/20 transition-colors">
                    <td className="px-6 py-4">
                      <div className="flex flex-col">
                        <span className="text-sm font-semibold">{booking.date}</span>
                        <span className="text-xs text-slate-500">{booking.time}</span>
                      </div>
                    </td>
                    <td className="px-6 py-4">
                      <div className="flex items-center gap-3">
                        <div className="size-8 rounded-full bg-slate-200 dark:bg-slate-700 overflow-hidden flex-shrink-0">
                          <img className="w-full h-full object-cover" src={booking.avatar} alt={`${booking.client} profile`} />
                        </div>
                        <span className="text-sm font-medium">{booking.client}</span>
                      </div>
                    </td>
                    <td className="px-6 py-4">
                      <div className="flex items-center gap-2 text-slate-600 dark:text-slate-300">
                        <span className="material-symbols-outlined text-lg text-primary">{booking.icon}</span>
                        <span className="text-sm">{booking.service}</span>
                      </div>
                    </td>
                    <td className="px-6 py-4">
                      <span className={`px-2.5 py-1 rounded-full text-[11px] font-bold border ${booking.statusColor}`}>{booking.status}</span>
                    </td>
                    <td className="px-6 py-4">
                      <div className="flex items-center gap-1.5 text-sm">
                        <span className={`material-symbols-outlined text-base ${booking.paymentColor}`}>{booking.paymentIcon}</span>
                        <span>{booking.payment}</span>
                      </div>
                    </td>
                    <td className="px-6 py-4 text-right">
                      <button className="text-primary hover:bg-primary/10 px-3 py-1 rounded-lg text-sm font-semibold">
                        {booking.status === 'COMPLETED' ? 'View' : 'Edit'}
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
            <div className="px-6 py-4 flex items-center justify-between border-t border-slate-100 dark:divide-[#283039] bg-slate-50 dark:bg-[#1a1f26]">
              <p className="text-sm text-slate-500">Showing 1 to 4 of 128 bookings</p>
              <div className="flex items-center gap-2">
                <button className="p-2 rounded-lg border border-slate-200 dark:border-[#3b4754] disabled:opacity-50">
                  <span className="material-symbols-outlined">chevron_left</span>
                </button>
                <button className="size-9 rounded-lg bg-primary text-white text-sm font-bold">1</button>
                <button className="size-9 rounded-lg border border-slate-200 dark:border-[#3b4754] text-sm hover:bg-slate-100 dark:hover:bg-[#283039]">2</button>
                <button className="size-9 rounded-lg border border-slate-200 dark:border-[#3b4754] text-sm hover:bg-slate-100 dark:hover:bg-[#283039]">3</button>
                <button className="p-2 rounded-lg border border-slate-200 dark:border-[#3b4754]">
                  <span className="material-symbols-outlined">chevron_right</span>
                </button>
              </div>
            </div>
          </div>
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            <div className="lg:col-span-2 bg-white dark:bg-[#111418] border border-slate-200 dark:border-slate-800 rounded-xl p-6">
              <div className="flex items-center justify-between mb-6">
                <h3 className="font-bold">Recent Client Activity</h3>
                <button className="text-primary text-sm font-semibold">View All</button>
              </div>
              <div className="space-y-4">
                <div className="flex items-center gap-4">
                  <div className="size-2 rounded-full bg-primary"></div>
                  <p className="text-sm flex-1">Emma Thompson updated the location for her <span className="font-semibold text-primary">Outdoor Portrait</span> session.</p>
                  <span className="text-xs text-slate-500 italic">2 mins ago</span>
                </div>
                <div className="flex items-center gap-4">
                  <div className="size-2 rounded-full bg-amber-500"></div>
                  <p className="text-sm flex-1">Payment received from <span className="font-semibold text-primary">David Chen</span> for Invoice #4492.</p>
                  <span className="text-xs text-slate-500 italic">45 mins ago</span>
                </div>
                <div className="flex items-center gap-4">
                  <div className="size-2 rounded-full bg-green-500"></div>
                  <p className="text-sm flex-1">Booking request confirmed for <span className="font-semibold text-primary">The Millers</span> Wedding Package.</p>
                  <span className="text-xs text-slate-500 italic">2 hours ago</span>
                </div>
              </div>
            </div>
            <div className="bg-white dark:bg-[#111418] border border-slate-200 dark:border-slate-800 rounded-xl p-4">
              <div className="flex items-center justify-between mb-4">
                <button className="size-8 flex items-center justify-center hover:bg-slate-100 dark:hover:bg-[#283039] rounded-lg">
                  <span className="material-symbols-outlined text-base">chevron_left</span>
                </button>
                <p className="text-sm font-bold">October 2023</p>
                <button className="size-8 flex items-center justify-center hover:bg-slate-100 dark:hover:bg-[#283039] rounded-lg">
                  <span className="material-symbols-outlined text-base">chevron_right</span>
                </button>
              </div>
              <div className="grid grid-cols-7 text-center text-[11px] font-bold text-slate-600 dark:text-slate-400 mb-2">
                <span>S</span><span>M</span><span>T</span><span>W</span><span>T</span><span>F</span><span>S</span>
              </div>
              <div className="grid grid-cols-7 gap-1">
                <div></div><div></div><div></div><div></div><div></div>
                <button className="h-8 flex items-center justify-center text-xs hover:bg-slate-100 dark:hover:bg-[#283039] rounded-lg">1</button>
                <button className="h-8 flex items-center justify-center text-xs hover:bg-slate-100 dark:hover:bg-[#283039] rounded-lg">2</button>
                <button className="h-8 flex items-center justify-center text-xs hover:bg-slate-100 dark:hover:bg-[#283039] rounded-lg">3</button>
                <button className="h-8 flex items-center justify-center text-xs hover:bg-slate-100 dark:hover:bg-[#283039] rounded-lg">4</button>
                <button className="h-8 flex items-center justify-center text-xs bg-primary text-white rounded-lg">5</button>
                <button className="h-8 flex items-center justify-center text-xs hover:bg-slate-100 dark:hover:bg-[#283039] rounded-lg font-bold border border-primary/20">6</button>
                <button className="h-8 flex items-center justify-center text-xs hover:bg-slate-100 dark:hover:bg-[#283039] rounded-lg">7</button>
                <button className="h-8 flex items-center justify-center text-xs hover:bg-slate-100 dark:hover:bg-[#283039] rounded-lg">8</button>
                <button className="h-8 flex items-center justify-center text-xs hover:bg-slate-100 dark:hover:bg-[#283039] rounded-lg">9</button>
                <button className="h-8 flex items-center justify-center text-xs hover:bg-slate-100 dark:hover:bg-[#283039] rounded-lg">10</button>
                <button className="h-8 flex items-center justify-center text-xs hover:bg-slate-100 dark:hover:bg-[#283039] rounded-lg">11</button>
                <button className="h-8 flex items-center justify-center text-xs hover:bg-slate-100 dark:hover:bg-[#283039] rounded-lg font-bold border border-primary/20">12</button>
                <button className="h-8 flex items-center justify-center text-xs hover:bg-slate-100 dark:hover:bg-[#283039] rounded-lg">13</button>
                <button className="h-8 flex items-center justify-center text-xs hover:bg-slate-100 dark:hover:bg-[#283039] rounded-lg">14</button>
                <button className="h-8 flex items-center justify-center text-xs hover:bg-slate-100 dark:hover:bg-[#283039] rounded-lg">15</button>
                <button className="h-8 flex items-center justify-center text-xs hover:bg-slate-100 dark:hover:bg-[#283039] rounded-lg">16</button>
                <button className="h-8 flex items-center justify-center text-xs hover:bg-slate-100 dark:hover:bg-[#283039] rounded-lg">17</button>
                <button className="h-8 flex items-center justify-center text-xs bg-primary/20 text-primary font-bold rounded-lg">18</button>
                <button className="h-8 flex items-center justify-center text-xs hover:bg-slate-100 dark:hover:bg-[#283039] rounded-lg">19</button>
                <button className="h-8 flex items-center justify-center text-xs hover:bg-slate-100 dark:hover:bg-[#283039] rounded-lg">20</button>
                <button className="h-8 flex items-center justify-center text-xs hover:bg-slate-100 dark:hover:bg-[#283039] rounded-lg">21</button>
                <button className="h-8 flex items-center justify-center text-xs hover:bg-slate-100 dark:hover:bg-[#283039] rounded-lg">22</button>
                <button className="h-8 flex items-center justify-center text-xs hover:bg-slate-100 dark:hover:bg-[#283039] rounded-lg">23</button>
                <button className="h-8 flex items-center justify-center text-xs hover:bg-slate-100 dark:hover:bg-[#283039] rounded-lg">24</button>
                <button className="h-8 flex items-center justify-center text-xs hover:bg-slate-100 dark:hover:bg-[#283039] rounded-lg font-bold border border-primary/20">25</button>
                <button className="h-8 flex items-center justify-center text-xs hover:bg-slate-100 dark:hover:bg-[#283039] rounded-lg">26</button>
                <button className="h-8 flex items-center justify-center text-xs hover:bg-slate-100 dark:hover:bg-[#283039] rounded-lg">27</button>
                <button className="h-8 flex items-center justify-center text-xs hover:bg-slate-100 dark:hover:bg-[#283039] rounded-lg">28</button>
              </div>
            </div>
          </div>
        </div>
      );
    }

    if (location.pathname === '/admin/inventory') {
      return (
        <div className="flex flex-col h-full">
          <div className="p-8 pb-4 flex flex-wrap justify-between items-end gap-4">
            <div className="flex flex-col gap-1">
              <h2 className="text-slate-900 dark:text-white text-4xl font-black leading-tight tracking-tight">Gear Inventory</h2>
              <p className="text-slate-500 dark:text-[#a19db9] text-base">Manage and track {totalElements} professional photography assets</p>
            </div>
            <button 
              onClick={() => setShowAddGearModal(true)}
              className="flex items-center gap-2 px-6 h-12 bg-primary text-white rounded-xl font-bold hover:opacity-90 transition-all shadow-lg shadow-primary/25"
            >
              <span className="material-symbols-outlined">add</span>
              <span>Add New Item</span>
            </button>
          </div>
          <div className="px-8 py-4">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <div className="flex flex-col gap-2 rounded-2xl p-6 border border-slate-200 dark:border-[#3f3b54] bg-white dark:bg-[#1b1929]">
                <div className="flex items-center justify-between">
                  <p className="text-slate-500 dark:text-[#a19db9] text-sm font-medium">Total Assets</p>
                  <span className="material-symbols-outlined text-slate-600 dark:text-slate-400">inventory</span>
                </div>
                <p className="text-slate-900 dark:text-white text-3xl font-bold">{totalElements}</p>
              </div>
              <div className="flex flex-col gap-2 rounded-2xl p-6 border border-slate-200 dark:border-[#3f3b54] bg-white dark:bg-[#1b1929]">
                <div className="flex items-center justify-between">
                  <p className="text-slate-500 dark:text-[#a19db9] text-sm font-medium">Currently Rented</p>
                  <span className="material-symbols-outlined text-primary">shopping_cart_checkout</span>
                </div>
                <p className="text-slate-900 dark:text-white text-3xl font-bold">{gearList?.filter(g => g.status === 'Out on Rent').length || 0}</p>
              </div>
              <div className="flex flex-col gap-2 rounded-2xl p-6 border border-slate-200 dark:border-[#3f3b54] bg-white dark:bg-[#1b1929]">
                <div className="flex items-center justify-between">
                  <p className="text-slate-500 dark:text-[#a19db9] text-sm font-medium">In Maintenance</p>
                  <span className="material-symbols-outlined text-red-500">build</span>
                </div>
                <p className="text-slate-900 dark:text-white text-3xl font-bold">{gearList?.filter(g => g.status === 'Maintenance' || g.status === 'Under Maintenance' || g.status === 'Needs Repair').length || 0}</p>
              </div>
            </div>
          </div>
          <div className="px-8 py-4 flex flex-col md:flex-row gap-4">
            <div className="flex-1">
              <div className="relative group">
                <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none text-slate-600 dark:text-slate-400 group-focus-within:text-primary transition-colors">
                  <span className="material-symbols-outlined">search</span>
                </div>
                <input 
                  className="block w-full pl-12 pr-4 h-12 bg-white dark:bg-[#2b2839] border-none rounded-xl text-slate-900 dark:text-white placeholder:text-slate-500 dark:placeholder:text-[#a19db9] focus:ring-2 focus:ring-primary transition-all" 
                  placeholder="Search by equipment name, SKU, or serial number..." 
                  type="text"
                  value={searchTerm}
                  onChange={(e) => {
                    setSearchTerm(e.target.value);
                    loadGear(0, e.target.value, selectedCategory, selectedStatus);
                  }}
                />
              </div>
            </div>
            <div className="flex gap-3 overflow-x-auto pb-2 md:pb-0">
              <div className="relative">
                <button 
                  ref={categoryButtonRef}
                  className="flex h-12 shrink-0 items-center justify-center gap-x-2 rounded-xl bg-white dark:bg-[#2b2839] px-5 border border-slate-200 dark:border-transparent text-slate-700 dark:text-white hover:bg-slate-50 dark:hover:bg-[#353147]"
                  onClick={() => {
                    if (categoryButtonRef.current) {
                      const rect = categoryButtonRef.current.getBoundingClientRect();
                      setDropdownPosition({
                        top: rect.bottom + window.scrollY + 4,
                        left: rect.left + window.scrollX
                      });
                    }
                    setShowCategoryDropdown(!showCategoryDropdown);
                    setShowStatusDropdown(false);
                  }}
                >
                  <span className="text-sm font-semibold">{selectedCategory || 'All Categories'}</span>
                  <span className="material-symbols-outlined text-sm">keyboard_arrow_down</span>
                </button>
              </div>
              <div className="relative">
                <button 
                  ref={statusButtonRef}
                  className="flex h-12 shrink-0 items-center justify-center gap-x-2 rounded-xl bg-white dark:bg-[#2b2839] px-5 border border-slate-200 dark:border-transparent text-slate-700 dark:text-white hover:bg-slate-50 dark:hover:bg-[#353147]"
                  onClick={() => {
                    if (statusButtonRef.current) {
                      const rect = statusButtonRef.current.getBoundingClientRect();
                      setDropdownPosition({
                        top: rect.bottom + window.scrollY + 4,
                        left: rect.left + window.scrollX
                      });
                    }
                    setShowStatusDropdown(!showStatusDropdown);
                    setShowCategoryDropdown(false);
                  }}
                >
                  <span className="text-sm font-semibold">{selectedStatus || 'All Statuses'}</span>
                  <span className="material-symbols-outlined text-sm">keyboard_arrow_down</span>
                </button>
              </div>
              <button className="flex h-12 w-12 shrink-0 items-center justify-center rounded-xl bg-white dark:bg-[#2b2839] border border-slate-200 dark:border-transparent text-slate-700 dark:text-white hover:bg-slate-50 dark:hover:bg-[#353147]">
                <span className="material-symbols-outlined">tune</span>
              </button>
            </div>
          </div>
          <div className="px-8 py-4 flex-1 relative">
            <div className="bg-white dark:bg-[#1b1929] border border-slate-200 dark:border-[#3f3b54] rounded-2xl overflow-visible">
              <table className="w-full text-left border-collapse">
                <thead>
                  <tr className="border-b border-slate-200 dark:border-[#3f3b54] text-slate-500 dark:text-[#a19db9] text-xs uppercase tracking-wider bg-slate-50/50 dark:bg-[#232036]">
                    <th className="px-6 py-4 font-bold">Item & SKU</th>
                    <th className="px-6 py-4 font-bold">Category</th>
                    <th className="px-6 py-4 font-bold">Stock</th>
                    <th className="px-6 py-4 font-bold">Rental Price</th>
                    <th className="px-6 py-4 font-bold">Status</th>
                    <th className="px-6 py-4 font-bold text-right">Actions</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-200 dark:divide-[#3f3b54]">
                  {(gearList?.length === 0 || !gearList) ? (
                    <tr>
                      <td colSpan="6" className="px-6 py-12 text-center">
                        <div className="flex flex-col items-center gap-4">
                          <span className="material-symbols-outlined text-6xl text-slate-300 dark:text-slate-600">inventory</span>
                          <div>
                            <h3 className="text-lg font-semibold text-slate-900 dark:text-white mb-2">No gear items yet</h3>
                            <p className="text-slate-500 dark:text-slate-400 mb-4">Start building your inventory by adding your first gear item.</p>
                            <button 
                              onClick={() => setShowAddGearModal(true)}
                              className="bg-primary text-white px-6 py-2 rounded-lg font-semibold hover:opacity-90 transition-all"
                            >
                              Add First Item
                            </button>
                          </div>
                        </div>
                      </td>
                    </tr>
                  ) : (
                    (gearList || []).map((gear) => (
                      <tr key={gear.id} className="hover:bg-slate-50 dark:hover:bg-[#232036] transition-colors group">
                        <td className="px-6 py-4">
                          <div className="flex items-center gap-4">
                            <div className="size-12 rounded-lg bg-slate-100 dark:bg-slate-700 flex items-center justify-center overflow-hidden">
                              {gear.images && gear.images.length > 0 ? (
                                <img src={`http://localhost:5555${gear.images[0]}`} alt={gear.name} className="w-full h-full object-cover" />
                              ) : (
                                <span className="material-symbols-outlined text-primary">photo_camera</span>
                              )}
                            </div>
                            <div className="flex flex-col">
                              <p className="text-sm font-bold text-slate-900 dark:text-white">{gear.name}</p>
                              <p className="text-xs text-slate-500 dark:text-[#a19db9]">SKU: {gear.sku}</p>
                            </div>
                          </div>
                        </td>
                        <td className="px-6 py-4">
                          <span className="px-3 py-1 rounded-full text-xs font-semibold bg-primary/10 text-primary border border-primary/20">{gear.category}</span>
                        </td>
                        <td className="px-6 py-4 text-sm font-medium">{gear.stock} / {gear.totalStock}</td>
                        <td className="px-6 py-4 text-sm font-bold">${gear.rentalPrice}<span className="text-slate-500 font-normal">/day</span></td>
                        <td className="px-6 py-4">
                          <div className="flex items-center gap-2">
                            <div className={`size-2 rounded-full ${gear.status === 'In Stock' ? 'bg-emerald-500' : gear.status === 'Out on Rent' ? 'bg-orange-500' : 'bg-red-500'}`}></div>
                            <span className={`text-sm font-medium ${gear.status === 'In Stock' ? 'text-emerald-500' : gear.status === 'Out on Rent' ? 'text-orange-500' : 'text-red-500'}`}>{gear.status}</span>
                          </div>
                        </td>
                        <td className="px-6 py-4 text-right">
                          <div className="flex items-center gap-2 justify-end">
                            <button 
                              onClick={() => handleEditGear(gear)}
                              className="text-blue-600 hover:text-blue-800 p-1 rounded"
                              title="Edit"
                            >
                              <span className="material-symbols-outlined text-lg">edit</span>
                            </button>
                            <button 
                              onClick={() => handleToggleAvailability(gear)}
                              className={`p-1 rounded ${
                                gear.status === 'In Stock' 
                                  ? 'text-orange-600 hover:text-orange-800' 
                                  : 'text-green-600 hover:text-green-800'
                              }`}
                              title={gear.status === 'In Stock' ? 'Make Unavailable' : 'Make Available'}
                            >
                              <span className="material-symbols-outlined text-lg">
                                {gear.status === 'In Stock' ? 'visibility_off' : 'visibility'}
                              </span>
                            </button>
                          </div>
                        </td>
                      </tr>
                    ))
                  )}
                </tbody>
              </table>
            </div>
            
            {/* Pagination */}
            {totalPages > 1 && (
              <div className="px-6 py-4 flex items-center justify-between border-t border-slate-200 dark:border-[#3f3b54] bg-slate-50/50 dark:bg-[#232036]">
                <p className="text-sm text-slate-500 dark:text-[#a19db9]">Showing {currentPage * pageSize + 1} to {Math.min((currentPage + 1) * pageSize, totalElements)} of {totalElements} items</p>
                <div className="flex items-center gap-2">
                  <button 
                    onClick={() => {
                      if (currentPage > 0) {
                        loadGear(currentPage - 1, searchTerm, selectedCategory, selectedStatus);
                      }
                    }}
                    disabled={currentPage === 0}
                    className="p-2 rounded-lg border border-slate-200 dark:border-[#3f3b54] disabled:opacity-50 hover:bg-slate-100 dark:hover:bg-[#353147]"
                  >
                    <span className="material-symbols-outlined">chevron_left</span>
                  </button>
                  
                  {Array.from({ length: Math.min(5, totalPages) }, (_, i) => {
                    const pageNum = Math.max(0, Math.min(totalPages - 5, currentPage - 2)) + i;
                    return (
                      <button
                        key={pageNum}
                        onClick={() => loadGear(pageNum, searchTerm, selectedCategory, selectedStatus)}
                        className={`size-9 rounded-lg text-sm font-bold ${
                          pageNum === currentPage 
                            ? 'bg-primary text-white' 
                            : 'border border-slate-200 dark:border-[#3f3b54] hover:bg-slate-100 dark:hover:bg-[#353147]'
                        }`}
                      >
                        {pageNum + 1}
                      </button>
                    );
                  })}
                  
                  <button 
                    onClick={() => {
                      if (currentPage < totalPages - 1) {
                        loadGear(currentPage + 1, searchTerm, selectedCategory, selectedStatus);
                      }
                    }}
                    disabled={currentPage >= totalPages - 1}
                    className="p-2 rounded-lg border border-slate-200 dark:border-[#3f3b54] disabled:opacity-50 hover:bg-slate-100 dark:hover:bg-[#353147]"
                  >
                    <span className="material-symbols-outlined">chevron_right</span>
                  </button>
                </div>
              </div>
            )}
          </div>

          {/* Add Gear Modal */}
          {showAddGearModal && (
            <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
              <div className="bg-white dark:bg-[#1b1929] rounded-2xl p-8 w-full max-w-md mx-4">
                <div className="flex items-center justify-between mb-6">
                  <h3 className="text-xl font-bold dark:text-white">Add New Gear</h3>
                  <button 
                    onClick={() => setShowAddGearModal(false)}
                    className="text-slate-400 hover:text-slate-600 dark:hover:text-slate-300"
                  >
                    <span className="material-symbols-outlined">close</span>
                  </button>
                </div>
                <form onSubmit={handleAddGear} className="space-y-4">
                  <div className="space-y-4">
                    <div className="bg-slate-50 dark:bg-slate-800 p-4 rounded-xl">
                      <h4 className="font-semibold mb-3 text-sm dark:text-white">Product SKU</h4>
                      <div>
                        <label className="block text-xs font-semibold mb-2 dark:text-white">SKU (Auto-generated)</label>
                        <div className="flex gap-2">
                          <input 
                            type="text" 
                            value={newGear.parentSku}
                            readOnly
                            className="flex-1 px-3 py-2 rounded-lg bg-slate-100 dark:bg-slate-600 border text-sm font-mono text-slate-500 dark:text-slate-400"
                            placeholder="Auto-generated when category & brand selected"
                          />
                          <button 
                            type="button"
                            onClick={() => {
                              if (newGear.category && newGear.brand) {
                                const parentSku = generateParentSKU(newGear.category, newGear.brand);
                                const upc = Math.floor(Math.random() * 900000000000) + 100000000000;
                                const ean = Math.floor(Math.random() * 9000000000000) + 1000000000000;
                                setNewGear({...newGear, parentSku, upc: upc.toString(), ean: ean.toString()});
                              }
                            }}
                            className="px-3 py-2 bg-blue-500 text-white rounded-lg text-xs hover:bg-blue-600"
                            title="Generate SKU"
                          >
                            <span className="material-symbols-outlined text-sm">auto_awesome</span>
                          </button>
                        </div>
                      </div>
                      <div className="grid grid-cols-2 gap-4 mt-3">
                        <div>
                          <label className="block text-xs font-semibold mb-2 dark:text-white">UPC Barcode</label>
                          <input 
                            type="text" 
                            value={newGear.upc}
                            readOnly
                            className="w-full px-3 py-2 rounded-lg bg-slate-100 dark:bg-slate-600 border text-sm font-mono text-slate-500 dark:text-slate-400"
                            placeholder="Auto-generated"
                          />
                        </div>
                        <div>
                          <label className="block text-xs font-semibold mb-2 dark:text-white">EAN Code</label>
                          <input 
                            type="text" 
                            value={newGear.ean}
                            readOnly
                            className="w-full px-3 py-2 rounded-lg bg-slate-100 dark:bg-slate-600 border text-sm font-mono text-slate-500 dark:text-slate-400"
                            placeholder="Auto-generated"
                          />
                        </div>
                      </div>
                      <div className="mt-3 p-3 bg-blue-50 dark:bg-blue-900/20 rounded-lg border border-blue-200 dark:border-blue-800">
                        <div className="flex items-center gap-2 mb-2">
                          <span className="material-symbols-outlined text-blue-600 text-sm">info</span>
                          <span className="text-xs font-semibold text-blue-800 dark:text-blue-300">SKU Format</span>
                        </div>
                        <p className="text-xs text-blue-700 dark:text-blue-400">
                          Format: {getCategoryCode(newGear.category || 'Category')}{getBrandCode(newGear.brand || 'Brand')}XXXX
                          {newGear.parentSku && validateSKU(newGear.parentSku) ? 
                            <span className="text-green-600 ml-2">✓ Valid</span> : 
                            newGear.parentSku ? <span className="text-red-600 ml-2">✗ Invalid</span> : null
                          }
                        </p>
                      </div>
                    </div>
                    
                    <div className="bg-slate-50 dark:bg-slate-800 p-4 rounded-xl">
                      <h4 className="font-semibold mb-3 text-sm dark:text-white">Product Information</h4>
                      <div className="grid grid-cols-2 gap-4">
                        <div>
                          <label className="block text-xs font-semibold mb-2 dark:text-white">Category</label>
                          <select 
                            value={newGear.category}
                            onChange={(e) => {
                              const category = e.target.value;
                              if (category && newGear.brand) {
                                const parentSku = generateParentSKU(category, newGear.brand);
                                const upc = Math.floor(Math.random() * 900000000000) + 100000000000;
                                const ean = Math.floor(Math.random() * 9000000000000) + 1000000000000;
                                setNewGear({...newGear, category, parentSku, upc: upc.toString(), ean: ean.toString()});
                              } else {
                                setNewGear({...newGear, category});
                              }
                            }}
                            className="w-full px-3 py-2 rounded-lg bg-white dark:bg-slate-700 border text-sm text-gray-900 dark:text-white"
                            required
                          >
                            <option value="">Select Category</option>
                            {categories.map((category, index) => (
                              <option key={index} value={category.name || category}>{category.name || category}</option>
                            ))}
                          </select>
                        </div>
                        <div>
                          <label className="block text-xs font-semibold mb-2 dark:text-white">Brand</label>
                          <select 
                            value={newGear.brand}
                            onChange={(e) => {
                              const brand = e.target.value;
                              if (newGear.category && brand) {
                                const parentSku = generateParentSKU(newGear.category, brand);
                                const upc = Math.floor(Math.random() * 900000000000) + 100000000000;
                                const ean = Math.floor(Math.random() * 9000000000000) + 1000000000000;
                                setNewGear({...newGear, brand, parentSku, upc: upc.toString(), ean: ean.toString()});
                              } else {
                                setNewGear({...newGear, brand});
                              }
                            }}
                            className="w-full px-3 py-2 rounded-lg bg-white dark:bg-slate-700 border text-sm text-gray-900 dark:text-white"
                            required
                          >
                            <option value="">Select Brand</option>
                            {brands.filter(b => !newGear.category || b.categoryName === newGear.category).map((brand, index) => (
                              <option key={index} value={brand.name}>{brand.name}</option>
                            ))}
                          </select>
                        </div>
                      </div>
                      <div className="mt-3">
                        <label className="block text-xs font-semibold mb-2 dark:text-white">Model</label>
                        <input 
                          type="text" 
                          value={newGear.model}
                          onChange={(e) => {
                            const model = e.target.value;
                            const name = newGear.brand && model ? `${newGear.brand} ${model}` : '';
                            const variantSku = newGear.parentSku && model ? `${newGear.parentSku}-${model.replace(/\s+/g, '').substring(0, 4).toUpperCase()}` : '';
                            setNewGear({...newGear, model, name, variantSku});
                          }}
                          className="w-full px-3 py-2 rounded-lg bg-white dark:bg-slate-700 border text-sm text-gray-900 dark:text-white"
                          placeholder="Alpha A7 IV"
                          required
                        />
                      </div>
                      <div className="mt-3">
                        <label className="block text-xs font-semibold mb-2 dark:text-white">Product Name (Auto-generated)</label>
                        <input 
                          type="text" 
                          value={newGear.name}
                          onChange={(e) => setNewGear({...newGear, name: e.target.value})}
                          className="w-full px-3 py-2 rounded-lg bg-slate-100 dark:bg-slate-600 border text-sm text-gray-900 dark:text-white"
                          placeholder="Auto-filled from brand + model"
                        />
                      </div>
                      <div className="mt-3">
                        <label className="block text-xs font-semibold mb-2 dark:text-white">Product Image</label>
                        <input 
                          type="file" 
                          accept="image/*"
                          multiple
                          onChange={(e) => setNewGear({...newGear, image: Array.from(e.target.files)})}
                          className="w-full px-3 py-2 rounded-lg bg-white dark:bg-slate-700 border text-sm dark:text-white file:mr-4 file:py-2 file:px-4 file:rounded-lg file:border-0 file:text-sm file:font-semibold file:bg-primary file:text-white hover:file:bg-primary/90"
                        />
                      </div>
                    </div>
                    
                    <div className="bg-slate-50 dark:bg-slate-800 p-4 rounded-xl">
                      <h4 className="font-semibold mb-3 text-sm dark:text-white">Inventory Details</h4>
                      <div className="grid grid-cols-2 gap-4">
                        <div>
                          <label className="block text-xs font-semibold mb-2 dark:text-white">Warehouse Location</label>
                          <input 
                            type="text" 
                            value={newGear.location}
                            onChange={(e) => setNewGear({...newGear, location: e.target.value})}
                            className="w-full px-3 py-2 rounded-lg bg-white dark:bg-slate-700 border text-sm"
                            placeholder="A1-B2-C3"
                          />
                        </div>
                        <div>
                          <label className="block text-xs font-semibold mb-2 dark:text-white">Supplier</label>
                          <input 
                            type="text" 
                            value={newGear.supplier}
                            onChange={(e) => setNewGear({...newGear, supplier: e.target.value})}
                            className="w-full px-3 py-2 rounded-lg bg-white dark:bg-slate-700 border text-sm"
                            placeholder="Supplier name"
                          />
                        </div>
                      </div>
                      <div className="grid grid-cols-3 gap-4 mt-3">
                        <div>
                          <label className="block text-xs font-semibold mb-2 dark:text-white">Cost Price</label>
                          <input 
                            type="number" 
                            step="0.01"
                            value={newGear.costPrice}
                            onChange={(e) => setNewGear({...newGear, costPrice: e.target.value})}
                            className="w-full px-3 py-2 rounded-lg bg-white dark:bg-slate-700 border text-sm"
                            placeholder="0.00"
                          />
                        </div>
                        <div>
                          <label className="block text-xs font-semibold mb-2 dark:text-white">Available</label>
                          <input 
                            type="number" 
                            value={newGear.stock}
                            onChange={(e) => setNewGear({...newGear, stock: e.target.value})}
                            className="w-full px-3 py-2 rounded-lg bg-white dark:bg-slate-700 border text-sm"
                            required
                          />
                        </div>
                        <div>
                          <label className="block text-xs font-semibold mb-2 dark:text-white">Rental Price/Day</label>
                          <input 
                            type="number" 
                            step="0.01"
                            value={newGear.rentalPrice}
                            onChange={(e) => setNewGear({...newGear, rentalPrice: e.target.value})}
                            className="w-full px-3 py-2 rounded-lg bg-white dark:bg-slate-700 border text-sm"
                            required
                          />
                        </div>
                      </div>
                    </div>
                  </div>
                  <div className="flex gap-3 pt-4">
                    <button 
                      type="button"
                      onClick={() => setShowAddGearModal(false)}
                      className="flex-1 px-4 py-3 rounded-xl border border-slate-200 dark:border-slate-600 font-semibold hover:bg-slate-50 dark:hover:bg-slate-800"
                    >
                      Cancel
                    </button>
                    <button 
                      type="submit"
                      className="flex-1 px-4 py-3 rounded-xl bg-primary text-white font-semibold hover:opacity-90"
                    >
                      Add Gear
                    </button>
                  </div>
                </form>
              </div>
            </div>
          )}

          {/* Edit Gear Modal */}
          {showEditGearModal && (
            <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
              <div className="bg-white dark:bg-[#1b1929] rounded-2xl p-8 w-full max-w-md mx-4">
                <div className="flex items-center justify-between mb-6">
                  <h3 className="text-xl font-bold dark:text-white">Edit Gear</h3>
                  <button 
                    onClick={() => {
                      setShowEditGearModal(false);
                      setEditingGear(null);
                    }}
                    className="text-slate-400 hover:text-slate-600 dark:hover:text-slate-300"
                  >
                    <span className="material-symbols-outlined">close</span>
                  </button>
                </div>
                <form onSubmit={handleUpdateGear} className="space-y-4">
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <label className="block text-sm font-semibold mb-2 dark:text-white">Brand</label>
                      <input 
                        type="text" 
                        value={newGear.brand}
                        onChange={(e) => setNewGear({...newGear, brand: e.target.value})}
                        className="w-full px-4 py-3 rounded-xl bg-slate-100 dark:bg-[#2b2839] border-none focus:ring-2 focus:ring-primary"
                        required
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-semibold mb-2 dark:text-white">Model</label>
                      <input 
                        type="text" 
                        value={newGear.model}
                        onChange={(e) => setNewGear({...newGear, model: e.target.value})}
                        className="w-full px-4 py-3 rounded-xl bg-slate-100 dark:bg-[#2b2839] border-none focus:ring-2 focus:ring-primary"
                        required
                      />
                    </div>
                  </div>
                  <div>
                    <label className="block text-sm font-semibold mb-2 dark:text-white">Item Name</label>
                    <input 
                      type="text" 
                      value={newGear.name}
                      onChange={(e) => setNewGear({...newGear, name: e.target.value})}
                      className="w-full px-4 py-3 rounded-xl bg-slate-100 dark:bg-[#2b2839] border-none focus:ring-2 focus:ring-primary"
                      required
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-semibold mb-2 dark:text-white">SKU</label>
                    <input 
                      type="text" 
                      value={newGear.sku}
                      disabled
                      className="w-full px-4 py-3 rounded-xl bg-slate-200 dark:bg-slate-700 border-none text-slate-500"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-semibold mb-2 dark:text-white">Category</label>
                    <select 
                      value={newGear.category}
                      onChange={(e) => setNewGear({...newGear, category: e.target.value})}
                      className="w-full px-4 py-3 rounded-xl bg-slate-100 dark:bg-[#2b2839] border-none focus:ring-2 focus:ring-primary"
                      required
                    >
                      {categories.map((category, index) => (
                        <option key={index} value={category.name || category}>{category.name || category}</option>
                      ))}
                    </select>
                  </div>
                  <div className="grid grid-cols-3 gap-4">
                    <div>
                      <label className="block text-sm font-semibold mb-2 dark:text-white">Available</label>
                      <input 
                        type="number" 
                        value={newGear.stock}
                        onChange={(e) => setNewGear({...newGear, stock: e.target.value})}
                        className="w-full px-4 py-3 rounded-xl bg-slate-100 dark:bg-[#2b2839] border-none focus:ring-2 focus:ring-primary"
                        required
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-semibold mb-2 dark:text-white">Total</label>
                      <input 
                        type="number" 
                        value={newGear.totalStock}
                        onChange={(e) => setNewGear({...newGear, totalStock: e.target.value})}
                        className="w-full px-4 py-3 rounded-xl bg-slate-100 dark:bg-[#2b2839] border-none focus:ring-2 focus:ring-primary"
                        required
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-semibold mb-2 dark:text-white">Price/Day</label>
                      <input 
                        type="number" 
                        step="0.01"
                        value={newGear.rentalPrice}
                        onChange={(e) => setNewGear({...newGear, rentalPrice: e.target.value})}
                        className="w-full px-4 py-3 rounded-xl bg-slate-100 dark:bg-[#2b2839] border-none focus:ring-2 focus:ring-primary"
                        required
                      />
                    </div>
                  </div>
                  <div>
                    <label className="block text-sm font-semibold mb-2 dark:text-white">Status</label>
                    <select 
                      value={newGear.status}
                      onChange={(e) => setNewGear({...newGear, status: e.target.value})}
                      className="w-full px-4 py-3 rounded-xl bg-slate-100 dark:bg-[#2b2839] border-none focus:ring-2 focus:ring-primary"
                      required
                    >
                      {statuses.map((status, index) => (
                        <option key={index} value={status.name || status}>{status.name || status}</option>
                      ))}
                    </select>
                  </div>
                  <div>
                    <label className="block text-sm font-semibold mb-2 dark:text-white">Condition</label>
                    <select 
                      value={newGear.condition}
                      onChange={(e) => setNewGear({...newGear, condition: e.target.value})}
                      className="w-full px-4 py-3 rounded-xl bg-slate-100 dark:bg-[#2b2839] border-none focus:ring-2 focus:ring-primary"
                      required
                    >
                      <option value="Excellent">Excellent</option>
                      <option value="Good">Good</option>
                      <option value="Fair">Fair</option>
                      <option value="Needs Repair">Needs Repair</option>
                    </select>
                  </div>
                  <div className="flex gap-3 pt-4">
                    <button 
                      type="button"
                      onClick={() => {
                        setShowEditGearModal(false);
                        setEditingGear(null);
                      }}
                      className="flex-1 px-4 py-3 rounded-xl border border-slate-200 dark:border-slate-600 font-semibold hover:bg-slate-50 dark:hover:bg-slate-800"
                    >
                      Cancel
                    </button>
                    <button 
                      type="submit"
                      className="flex-1 px-4 py-3 rounded-xl bg-primary text-white font-semibold hover:opacity-90"
                    >
                      Update Gear
                    </button>
                  </div>
                </form>
              </div>
            </div>
          )}
        </div>
      );
    }

    if (location.pathname === '/admin/settings') {
      return (
        <div className="p-8 flex flex-col gap-6">
          <div className="flex flex-col gap-1 mb-6">
            <h2 className="text-slate-900 dark:text-white text-4xl font-black leading-tight tracking-tight">System Settings</h2>
            <p className="text-slate-500 dark:text-[#a19db9] text-base">Manage categories and statuses for your inventory system</p>
            <div className="mt-4">
              <button 
                onClick={async () => {
                  try {
                    const response = await fetch('http://localhost:5555/api/settings/initialize', {
                      method: 'POST',
                      headers: { 'Content-Type': 'application/json' }
                    });
                    if (response.ok) {
                      toast.success('Default data initialized successfully!');
                      loadCategories();
                      loadStatuses();
                    } else {
                      toast.error('Failed to initialize data');
                    }
                  } catch (error) {
                    toast.error('Failed to initialize data');
                  }
                }}
                className="bg-blue-500 text-white px-4 py-2 rounded-lg text-sm font-semibold hover:bg-blue-600 flex items-center gap-2"
              >
                <span className="material-symbols-outlined text-sm">refresh</span>
                Initialize Default Data
              </button>
            </div>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            <div className="bg-white dark:bg-[#1b1929] border border-slate-200 dark:border-[#3f3b54] rounded-2xl p-6">
              <div className="flex items-center justify-between mb-6">
                <h3 className="text-xl font-bold dark:text-white">Gear Categories</h3>
                <button 
                  onClick={() => setShowAddCategoryModal(true)}
                  className="bg-primary text-white px-4 py-2 rounded-lg text-sm font-semibold hover:opacity-90 flex items-center gap-2"
                >
                  <span className="material-symbols-outlined text-sm">add</span>
                  Add Category
                </button>
              </div>
              <div className="space-y-3">
                {categories.map((category, index) => (
                  <div key={index} className="flex items-center justify-between p-3 bg-slate-50 dark:bg-[#232036] rounded-lg">
                    <span className="font-medium dark:text-white">{category}</span>
                    <button 
                      onClick={() => deleteCategory(index)}
                      className="text-red-500 hover:text-red-700 p-1"
                    >
                      <span className="material-symbols-outlined text-sm">delete</span>
                    </button>
                  </div>
                ))}
              </div>
            </div>

            <div className="bg-white dark:bg-[#1b1929] border border-slate-200 dark:border-[#3f3b54] rounded-2xl p-6">
              <div className="flex items-center justify-between mb-6">
                <h3 className="text-xl font-bold dark:text-white">Brands</h3>
                <button 
                  onClick={() => setShowAddBrandModal(true)}
                  className="bg-primary text-white px-4 py-2 rounded-lg text-sm font-semibold hover:opacity-90 flex items-center gap-2"
                >
                  <span className="material-symbols-outlined text-sm">add</span>
                  Add Brand
                </button>
              </div>
              <div className="space-y-3 max-h-96 overflow-y-auto">
                {brands.map((brand, index) => (
                  <div key={index} className="flex items-center justify-between p-3 bg-slate-50 dark:bg-[#232036] rounded-lg">
                    <div>
                      <span className="font-medium dark:text-white block">{brand.name}</span>
                      <span className="text-xs text-slate-500 dark:text-slate-400">{brand.categoryName}</span>
                    </div>
                    <button 
                      onClick={() => deleteBrand(brand.id)}
                      className="text-red-500 hover:text-red-700 p-1"
                    >
                      <span className="material-symbols-outlined text-sm">delete</span>
                    </button>
                  </div>
                ))}
              </div>
            </div>

            <div className="bg-white dark:bg-[#1b1929] border border-slate-200 dark:border-[#3f3b54] rounded-2xl p-6">
              <div className="flex items-center justify-between mb-6">
                <h3 className="text-xl font-bold dark:text-white">Gear Statuses</h3>
                <button 
                  onClick={() => setShowAddStatusModal(true)}
                  className="bg-primary text-white px-4 py-2 rounded-lg text-sm font-semibold hover:opacity-90 flex items-center gap-2"
                >
                  <span className="material-symbols-outlined text-sm">add</span>
                  Add Status
                </button>
              </div>
              <div className="space-y-3">
                {statuses.map((status, index) => (
                  <div key={index} className="flex items-center justify-between p-3 bg-slate-50 dark:bg-[#232036] rounded-lg">
                    <div className="flex items-center gap-3">
                      <div className={`size-3 rounded-full ${
                        status === 'In Stock' ? 'bg-emerald-500' :
                        status === 'Out on Rent' ? 'bg-orange-500' :
                        status === 'Maintenance' ? 'bg-red-500' : 'bg-slate-500'
                      }`}></div>
                      <span className="font-medium dark:text-white">{status}</span>
                    </div>
                    <button 
                      onClick={() => deleteStatus(index)}
                      className="text-red-500 hover:text-red-700 p-1"
                    >
                      <span className="material-symbols-outlined text-sm">delete</span>
                    </button>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {showAddCategoryModal && (
            <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
              <div className="bg-white dark:bg-[#1b1929] rounded-2xl p-6 w-full max-w-md mx-4">
                <h3 className="text-xl font-bold mb-4 dark:text-white">Add New Category</h3>
                <input 
                  type="text" 
                  value={newCategory}
                  onChange={(e) => setNewCategory(e.target.value)}
                  placeholder="Enter category name"
                  className="w-full px-4 py-3 rounded-xl bg-slate-100 dark:bg-[#2b2839] border-none focus:ring-2 focus:ring-primary mb-4"
                />
                <div className="flex gap-3">
                  <button 
                    onClick={() => {
                      setShowAddCategoryModal(false);
                      setNewCategory('');
                    }}
                    className="flex-1 px-4 py-3 rounded-xl border border-slate-200 dark:border-slate-600 font-semibold hover:bg-slate-50 dark:hover:bg-slate-800"
                  >
                    Cancel
                  </button>
                  <button 
                    onClick={async () => {
                      if (newCategory.trim()) {
                        const success = await addCategory(newCategory.trim());
                        if (success) {
                          setNewCategory('');
                          setShowAddCategoryModal(false);
                        }
                      }
                    }}
                    className="flex-1 px-4 py-3 rounded-xl bg-primary text-white font-semibold hover:opacity-90"
                  >
                    Add
                  </button>
                </div>
              </div>
            </div>
          )}

          {showAddStatusModal && (
            <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
              <div className="bg-white dark:bg-[#1b1929] rounded-2xl p-6 w-full max-w-md mx-4">
                <h3 className="text-xl font-bold mb-4 dark:text-white">Add New Status</h3>
                <input 
                  type="text" 
                  value={newStatus}
                  onChange={(e) => setNewStatus(e.target.value)}
                  placeholder="Enter status name"
                  className="w-full px-4 py-3 rounded-xl bg-slate-100 dark:bg-[#2b2839] border-none focus:ring-2 focus:ring-primary mb-4"
                />
                <div className="flex gap-3">
                  <button 
                    onClick={() => {
                      setShowAddStatusModal(false);
                      setNewStatus('');
                    }}
                    className="flex-1 px-4 py-3 rounded-xl border border-slate-200 dark:border-slate-600 font-semibold hover:bg-slate-50 dark:hover:bg-slate-800"
                  >
                    Cancel
                  </button>
                  <button 
                    onClick={async () => {
                      if (newStatus.trim()) {
                        const success = await addStatus(newStatus.trim());
                        if (success) {
                          setNewStatus('');
                          setShowAddStatusModal(false);
                        }
                      }
                    }}
                    className="flex-1 px-4 py-3 rounded-xl bg-primary text-white font-semibold hover:opacity-90"
                  >
                    Add
                  </button>
                </div>
              </div>
            </div>
          )}
        </div>
      );
    }
    
    // Default dashboard content
    return (
      <div className="p-8 flex flex-col gap-8 max-w-7xl mx-auto w-full">
        {/* Stats Row */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="bg-white dark:bg-surface-dark p-6 rounded-xl border border-slate-200 dark:border-border-dark shadow-sm">
            <div className="flex justify-between items-start mb-4">
              <span className="text-muted-text font-medium text-sm">Total Revenue</span>
              <span className="text-emerald-500 bg-emerald-500/10 px-2 py-1 rounded text-xs font-bold">+12.5%</span>
            </div>
            <h3 className="text-3xl font-bold">$12,450.00</h3>
            <p className="text-xs text-muted-text mt-2">vs. $11,020 last month</p>
          </div>
          <div className="bg-white dark:bg-surface-dark p-6 rounded-xl border border-slate-200 dark:border-border-dark shadow-sm">
            <div className="flex justify-between items-start mb-4">
              <span className="text-muted-text font-medium text-sm">Pending Bookings</span>
              <span className="material-symbols-outlined text-amber-500">pending_actions</span>
            </div>
            <h3 className="text-3xl font-bold">18</h3>
            <p className="text-xs text-muted-text mt-2">6 require immediate action</p>
          </div>
          <div className="bg-white dark:bg-surface-dark p-6 rounded-xl border border-slate-200 dark:border-border-dark shadow-sm">
            <div className="flex justify-between items-start mb-4">
              <span className="text-muted-text font-medium text-sm">Gear Out on Rent</span>
              <span className="material-symbols-outlined text-primary">shopping_bag</span>
            </div>
            <h3 className="text-3xl font-bold">24 <span className="text-lg font-normal text-muted-text">items</span></h3>
            <p className="text-xs text-muted-text mt-2">82% of total inventory</p>
          </div>
        </div>
        
        {/* Chart & Activity */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          <div className="lg:col-span-2 bg-white dark:bg-surface-dark p-6 rounded-xl border border-slate-200 dark:border-border-dark">
            <div className="flex justify-between items-center mb-6">
              <div>
                <h3 className="text-lg font-bold">Booking Trends</h3>
                <p className="text-sm text-muted-text">Monthly volume visualization</p>
              </div>
              <div className="flex gap-2">
                <button className="px-3 py-1 rounded-lg bg-slate-100 dark:bg-border-dark text-xs font-medium">Monthly</button>
                <button className="px-3 py-1 rounded-lg text-xs font-medium text-muted-text">Weekly</button>
              </div>
            </div>
            <div className="flex flex-col gap-4">
              <div className="flex items-baseline gap-2">
                <p className="text-4xl font-bold">245</p>
                <p className="text-emerald-500 text-sm font-semibold">+5.2%</p>
              </div>
              <div className="relative h-64 w-full mt-4">
                <svg className="w-full h-full" preserveAspectRatio="none" viewBox="0 0 500 150">
                  <defs>
                    <linearGradient id="gradient" x1="0%" x2="0%" y1="0%" y2="100%">
                      <stop offset="0%" stopColor="#3211d4" stopOpacity="0.3"></stop>
                      <stop offset="100%" stopColor="#3211d4" stopOpacity="0"></stop>
                    </linearGradient>
                  </defs>
                  <path d="M0 120 C 50 110, 80 40, 120 50 S 180 130, 240 100 S 320 20, 400 60 S 460 30, 500 10 V 150 H 0 Z" fill="url(#gradient)"></path>
                  <path d="M0 120 C 50 110, 80 40, 120 50 S 180 130, 240 100 S 320 20, 400 60 S 460 30, 500 10" fill="none" stroke="#3211d4" strokeWidth="3"></path>
                </svg>
                <div className="flex justify-between mt-4 px-2">
                  <span className="text-xs text-muted-text font-bold">JAN</span>
                  <span className="text-xs text-muted-text font-bold">FEB</span>
                  <span className="text-xs text-muted-text font-bold">MAR</span>
                  <span className="text-xs text-muted-text font-bold">APR</span>
                  <span className="text-xs text-muted-text font-bold">MAY</span>
                  <span className="text-xs text-muted-text font-bold">JUN</span>
                  <span className="text-xs text-muted-text font-bold">JUL</span>
                </div>
              </div>
            </div>
          </div>
          <div className="bg-white dark:bg-surface-dark p-6 rounded-xl border border-slate-200 dark:border-border-dark flex flex-col h-full">
            <h3 className="text-lg font-bold mb-6">Recent Activity</h3>
            <div className="flex flex-col gap-6 overflow-y-auto pr-2">
              <div className="flex gap-4">
                <div className="size-10 rounded-full bg-emerald-500/10 flex items-center justify-center text-emerald-500 shrink-0">
                  <span className="material-symbols-outlined text-lg">check_circle</span>
                </div>
                <div>
                  <p className="text-sm font-semibold">Booking Confirmed</p>
                  <p className="text-xs text-muted-text">Sarah Jenkins paid deposit for Wedding Package.</p>
                  <p className="text-[10px] text-muted-text mt-1 uppercase font-bold tracking-wider">2 mins ago</p>
                </div>
              </div>
              <div className="flex gap-4">
                <div className="size-10 rounded-full bg-primary/10 flex items-center justify-center text-primary shrink-0">
                  <span className="material-symbols-outlined text-lg">sync_alt</span>
                </div>
                <div>
                  <p className="text-sm font-semibold">Gear Returned</p>
                  <p className="text-xs text-muted-text">Sony A7R IV returned by Mark Thompson. Insp. passed.</p>
                  <p className="text-[10px] text-muted-text mt-1 uppercase font-bold tracking-wider">45 mins ago</p>
                </div>
              </div>
              <div className="flex gap-4">
                <div className="size-10 rounded-full bg-amber-500/10 flex items-center justify-center text-amber-500 shrink-0">
                  <span className="material-symbols-outlined text-lg">warning</span>
                </div>
                <div>
                  <p className="text-sm font-semibold">Low Inventory</p>
                  <p className="text-xs text-muted-text">Only 2 SD Cards (128GB) remaining in stock.</p>
                  <p className="text-[10px] text-muted-text mt-1 uppercase font-bold tracking-wider">2 hours ago</p>
                </div>
              </div>
              <div className="flex gap-4">
                <div className="size-10 rounded-full bg-blue-500/10 flex items-center justify-center text-blue-500 shrink-0">
                  <span className="material-symbols-outlined text-lg">person_add</span>
                </div>
                <div>
                  <p className="text-sm font-semibold">New Customer</p>
                  <p className="text-xs text-muted-text">David Miller created a professional account.</p>
                  <p className="text-[10px] text-muted-text mt-1 uppercase font-bold tracking-wider">5 hours ago</p>
                </div>
              </div>
            </div>
            <button className="mt-8 text-primary text-xs font-bold hover:underline self-center">View All Activity</button>
          </div>
        </div>
        
        {/* Bottom Section */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-8">
          <div className="bg-white dark:bg-surface-dark p-6 rounded-xl border border-slate-200 dark:border-border-dark">
            <div className="flex justify-between items-center mb-4">
              <h3 className="text-base font-bold">Upcoming Sessions</h3>
              <button className="text-xs text-primary font-semibold">View Calendar</button>
            </div>
            <div className="space-y-4">
              <div className="flex items-center justify-between p-3 rounded-lg bg-slate-50 dark:bg-border-dark/30">
                <div className="flex items-center gap-3">
                  <div className="text-center bg-white dark:bg-surface-dark rounded-lg p-2 min-w-[50px] border border-slate-200 dark:border-border-dark">
                    <p className="text-[10px] font-bold text-muted-text">OCT</p>
                    <p className="text-lg font-bold leading-none">14</p>
                  </div>
                  <div>
                    <p className="text-sm font-semibold">Product Launch Shoot</p>
                    <p className="text-xs text-muted-text">Studio A • 09:00 AM</p>
                  </div>
                </div>
                <span className="material-symbols-outlined text-muted-text cursor-pointer">more_vert</span>
              </div>
              <div className="flex items-center justify-between p-3 rounded-lg bg-slate-50 dark:bg-border-dark/30">
                <div className="flex items-center gap-3">
                  <div className="text-center bg-white dark:bg-surface-dark rounded-lg p-2 min-w-[50px] border border-slate-200 dark:border-border-dark">
                    <p className="text-[10px] font-bold text-muted-text">OCT</p>
                    <p className="text-lg font-bold leading-none">16</p>
                  </div>
                  <div>
                    <p className="text-sm font-semibold">Family Portrait Session</p>
                    <p className="text-xs text-muted-text">Central Park • 03:30 PM</p>
                  </div>
                </div>
                <span className="material-symbols-outlined text-muted-text cursor-pointer">more_vert</span>
              </div>
            </div>
          </div>
          <div className="bg-primary rounded-xl p-8 relative overflow-hidden group">
            <div className="relative z-10">
              <h3 className="text-xl font-bold text-white mb-2">Upgrade Equipment</h3>
              <p className="text-white/90 text-sm max-w-[240px] mb-6">Explore the new rental marketplace and refresh your studio gear with member discounts.</p>
              <button className="bg-white text-primary px-6 py-2.5 rounded-xl font-bold text-sm shadow-xl hover:bg-slate-50 transition-colors">
                Browse Marketplace
              </button>
            </div>
            <div className="absolute -right-10 -bottom-10 size-48 bg-white/10 rounded-full blur-3xl group-hover:scale-110 transition-transform"></div>
            <div className="absolute top-0 right-10 size-24 bg-primary-light/20 border-gray-300 dark:border-white/10 border-4 rounded-full -mt-8"></div>
          </div>
        </div>
      </div>
    );
  };

  return (
    <div className="bg-background-light dark:bg-background-dark text-slate-900 dark:text-white min-h-screen">
      <div className="flex h-screen overflow-hidden">
        <aside className="w-64 bg-background-light dark:bg-surface-dark border-r border-slate-200 dark:border-border-dark flex flex-col justify-between p-6">
          <div className="flex flex-col gap-8">
            <div className="flex items-center gap-3">
              <div className="size-10 rounded-full bg-primary flex items-center justify-center text-white">
                <span className="material-symbols-outlined">auto_awesome</span>
              </div>
              <div className="flex flex-col">
                <h1 className="text-lg font-bold leading-tight">Aura Admin</h1>
                <p className="text-muted-text text-xs">Photography Business</p>
              </div>
            </div>
            <nav className="flex flex-col gap-2">
              <Link className={`flex items-center gap-3 px-3 py-2.5 rounded-lg transition-colors ${
                location.pathname === '/admin' ? 'sidebar-active text-white bg-border-dark border-l-4 border-primary' : 'text-slate-600 dark:text-muted-text hover:bg-slate-100 dark:hover:bg-border-dark'
              }`} to="/admin">
                <span className="material-symbols-outlined">dashboard</span>
                <span className="text-sm font-medium">Dashboard</span>
              </Link>
              <Link className={`flex items-center gap-3 px-3 py-2.5 rounded-lg transition-colors ${
                location.pathname === '/admin/bookings' ? 'sidebar-active text-white bg-border-dark border-l-4 border-primary' : 'text-slate-600 dark:text-muted-text hover:bg-slate-100 dark:hover:bg-border-dark'
              }`} to="/admin/bookings">
                <span className="material-symbols-outlined">calendar_today</span>
                <span className="text-sm font-medium">Bookings</span>
              </Link>
              <Link className={`flex items-center gap-3 px-3 py-2.5 rounded-lg transition-colors ${
                location.pathname === '/admin/inventory' ? 'sidebar-active text-white bg-border-dark border-l-4 border-primary' : 'text-slate-600 dark:text-muted-text hover:bg-slate-100 dark:hover:bg-border-dark'
              }`} to="/admin/inventory">
                <span className="material-symbols-outlined">inventory_2</span>
                <span className="text-sm font-medium">Gear Inventory</span>
              </Link>
              <Link className={`flex items-center gap-3 px-3 py-2.5 rounded-lg transition-colors ${
                location.pathname === '/admin/settings' ? 'sidebar-active text-white bg-border-dark border-l-4 border-primary' : 'text-slate-600 dark:text-muted-text hover:bg-slate-100 dark:hover:bg-border-dark'
              }`} to="/admin/settings">
                <span className="material-symbols-outlined">settings</span>
                <span className="text-sm font-medium">Settings</span>
              </Link>
            </nav>
          </div>
          <button className="w-full bg-primary hover:bg-primary/90 text-white py-3 rounded-xl font-bold text-sm shadow-lg shadow-primary/20 flex items-center justify-center gap-2 transition-all">
            <span className="material-symbols-outlined text-sm">add</span>
            <span>New Booking</span>
          </button>
        </aside>
        
        <main className="flex-1 flex flex-col overflow-y-auto">
          <header className="flex items-center justify-between px-8 py-4 border-b border-slate-200 dark:border-border-dark sticky top-0 bg-background-light dark:bg-background-dark/80 backdrop-blur-md z-10">
            <div className="flex items-center gap-6 flex-1">
              <h2 className="text-xl font-bold tracking-tight">
                {location.pathname === '/admin/bookings' ? 'Manage Bookings' : location.pathname === '/admin/inventory' ? 'Manage Gear Inventory' : location.pathname === '/admin/settings' ? 'System Settings' : 'Overview'}
              </h2>
              {(location.pathname === '/admin/bookings' || location.pathname === '/admin/inventory') && (
                <>
                  <div className="h-6 w-px bg-slate-200 dark:bg-slate-800 mx-2"></div>
                  <div className="flex items-center gap-2 text-slate-500 text-sm">
                    <span>{location.pathname === '/admin/bookings' ? 'Calendar View' : 'Grid View'}</span>
                    <span className="material-symbols-outlined text-base">arrow_drop_down</span>
                  </div>
                </>
              )}
              <div className="relative w-full max-w-md">
                <span className="material-symbols-outlined absolute left-3 top-1/2 -translate-y-1/2 text-muted-text text-xl">search</span>
                <input 
                  className="w-full bg-slate-100 dark:bg-border-dark border-none rounded-xl pl-10 pr-4 py-2 text-sm focus:ring-2 focus:ring-primary transition-all text-slate-900 dark:text-white" 
                  placeholder={location.pathname === '/admin/bookings' ? 'Search bookings...' : location.pathname === '/admin/inventory' ? 'Search inventory...' : 'Search bookings, gear, or clients...'} 
                  type="text"
                />
              </div>
            </div>
            <div className="flex items-center gap-4">
            <div className="flex items-center gap-4">
              <button 
                onClick={toggleTheme}
                className="p-2 rounded-xl bg-slate-100 dark:bg-border-dark text-slate-600 dark:text-white hover:bg-slate-200 dark:hover:bg-slate-700 transition-colors"
              >
                <span className="material-symbols-outlined">
                  {isDark ? 'light_mode' : 'dark_mode'}
                </span>
              </button>
              <button className="p-2 rounded-xl bg-slate-100 dark:bg-border-dark text-slate-600 dark:text-white hover:bg-slate-200 dark:hover:bg-slate-700 transition-colors">
                <span className="material-symbols-outlined">notifications</span>
              </button>
              <div className="h-8 w-[1px] bg-slate-200 dark:bg-border-dark mx-2"></div>
              <div className="flex items-center gap-3 cursor-pointer group">
                <div className="text-right hidden sm:block">
                  <p className="text-sm font-semibold leading-none">{user?.name || user?.email || 'Admin User'}</p>
                  <p className="text-xs text-muted-text mt-1">{user?.role || 'Administrator'}</p>
                </div>
                <button 
                  onClick={() => authService.logout()}
                  className="bg-red-500 hover:bg-red-600 text-white px-4 py-2 rounded-lg text-sm font-bold transition-all"
                >
                  Logout
                </button>
              </div>
            </div>
            </div>
          </header>
          {renderContent()}
        </main>
      </div>
      
      {/* Portal dropdowns */}
      {showCategoryDropdown && createPortal(
        <div 
          className={`fixed w-48 border rounded-xl shadow-lg z-[9999] ${
            isDark 
              ? 'bg-[#2b2839] border-slate-600 text-white' 
              : 'bg-white border-slate-200 text-slate-700'
          }`}
          style={{
            top: `${dropdownPosition.top}px`,
            left: `${dropdownPosition.left}px`
          }}
        >
          <button 
            className={`w-full px-4 py-2 text-left text-sm first:rounded-t-xl ${
              isDark 
                ? 'hover:bg-slate-700' 
                : 'hover:bg-slate-100'
            }`}
            onClick={() => {
              setSelectedCategory('');
              loadGear(0, searchTerm, '', selectedStatus);
              setShowCategoryDropdown(false);
            }}
          >
            All Categories
          </button>
          {categories.map((category, index) => (
            <button 
              key={index}
              className={`w-full px-4 py-2 text-left text-sm last:rounded-b-xl ${
                isDark 
                  ? 'hover:bg-slate-700' 
                  : 'hover:bg-slate-100'
              }`}
              onClick={() => {
                setSelectedCategory(category);
                loadGear(0, searchTerm, category, selectedStatus);
                setShowCategoryDropdown(false);
              }}
            >
              {category}
            </button>
          ))}
        </div>,
        document.body
      )}
      
      {showStatusDropdown && createPortal(
        <div 
          className={`fixed w-48 border rounded-xl shadow-lg z-[9999] ${
            isDark 
              ? 'bg-[#2b2839] border-slate-600 text-white' 
              : 'bg-white border-slate-200 text-slate-700'
          }`}
          style={{
            top: `${dropdownPosition.top}px`,
            left: `${dropdownPosition.left}px`
          }}
        >
          <button 
            className={`w-full px-4 py-2 text-left text-sm first:rounded-t-xl ${
              isDark 
                ? 'hover:bg-slate-700' 
                : 'hover:bg-slate-100'
            }`}
            onClick={() => {
              setSelectedStatus('');
              loadGear(0, searchTerm, selectedCategory, '');
              setShowStatusDropdown(false);
            }}
          >
            All Statuses
          </button>
          {statuses.map((status, index) => (
            <button 
              key={index}
              className={`w-full px-4 py-2 text-left text-sm last:rounded-b-xl ${
                isDark 
                  ? 'hover:bg-slate-700' 
                  : 'hover:bg-slate-100'
              }`}
              onClick={() => {
                setSelectedStatus(status);
                loadGear(0, searchTerm, selectedCategory, status);
                setShowStatusDropdown(false);
              }}
            >
              {status}
            </button>
          ))}
        </div>,
        document.body
      )}

      {showAddBrandModal && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
          <div className="bg-white dark:bg-[#1b1929] rounded-2xl p-6 w-full max-w-md mx-4">
            <h3 className="text-xl font-bold mb-4 dark:text-white">Add New Brand</h3>
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-semibold mb-2 dark:text-white">Category</label>
                <select 
                  value={newBrand.categoryId}
                  onChange={(e) => setNewBrand({...newBrand, categoryId: e.target.value})}
                  className="w-full px-4 py-3 rounded-xl bg-slate-100 dark:bg-[#2b2839] border-none focus:ring-2 focus:ring-primary text-gray-900 dark:text-white"
                  required
                >
                  <option value="">Select Category</option>
                  {categories.map((category, index) => (
                    <option key={index} value={category.id || index + 1}>{category.name || category}</option>
                  ))}
                </select>
              </div>
              <div>
                <label className="block text-sm font-semibold mb-2 dark:text-white">Brand Name</label>
                <input 
                  type="text" 
                  value={newBrand.name}
                  onChange={(e) => setNewBrand({...newBrand, name: e.target.value})}
                  placeholder="Enter brand name"
                  className="w-full px-4 py-3 rounded-xl bg-slate-100 dark:bg-[#2b2839] border-none focus:ring-2 focus:ring-primary text-gray-900 dark:text-white"
                  required
                />
              </div>
            </div>
            <div className="flex gap-3 mt-6">
              <button 
                onClick={() => {
                  setShowAddBrandModal(false);
                  setNewBrand({ name: '', categoryId: '' });
                }}
                className="flex-1 px-4 py-3 rounded-xl border border-slate-200 dark:border-slate-600 font-semibold hover:bg-slate-50 dark:hover:bg-slate-800"
              >
                Cancel
              </button>
              <button 
                onClick={async () => {
                  if (newBrand.name.trim() && newBrand.categoryId) {
                    try {
                      const response = await fetch('http://localhost:5555/api/settings/brands', {
                        method: 'POST',
                        headers: { 'Content-Type': 'application/json' },
                        body: JSON.stringify({
                          name: newBrand.name.trim(),
                          categoryId: newBrand.categoryId
                        })
                      });
                      if (response.ok) {
                        setNewBrand({ name: '', categoryId: '' });
                        setShowAddBrandModal(false);
                        loadBrands();
                      }
                    } catch (error) {
                      console.error('Failed to add brand');
                    }
                  }
                }}
                className="flex-1 px-4 py-3 rounded-xl bg-primary text-white font-semibold hover:opacity-90"
              >
                Add
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default AdminDashboard;
