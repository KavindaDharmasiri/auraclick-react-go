import config from '../config/config';

const API_BASE_URL = config.API_BASE_URL;

class GearService {
  async getAllGear() {
    const response = await fetch(`${API_BASE_URL}/gear`, {
      headers: {
        'Authorization': `Bearer ${localStorage.getItem('token')}`
      }
    });
    if (!response.ok) throw new Error('Failed to fetch gear');
    return response.json();
  }

  async createGear(gearData, images) {
    const formData = new FormData();
    
    // Add gear data
    Object.keys(gearData).forEach(key => {
      if (gearData[key] !== null && gearData[key] !== '') {
        formData.append(key, gearData[key]);
      }
    });

    // Add images
    if (images && images.length > 0) {
      images.forEach(image => {
        formData.append('images', image);
      });
    }

    const response = await fetch(`${API_BASE_URL}/gear`, {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${localStorage.getItem('token')}`
      },
      body: formData
    });

    if (!response.ok) {
      const error = await response.text();
      throw new Error(error);
    }
    return response.json();
  }

  async updateGear(id, gearData) {
    const response = await fetch(`${API_BASE_URL}/gear/${id}`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${localStorage.getItem('token')}`
      },
      body: JSON.stringify(gearData)
    });

    if (!response.ok) throw new Error('Failed to update gear');
    return response.json();
  }

  async deleteGear(id) {
    const response = await fetch(`${API_BASE_URL}/gear/${id}`, {
      method: 'DELETE',
      headers: {
        'Authorization': `Bearer ${localStorage.getItem('token')}`
      }
    });

    if (!response.ok) throw new Error('Failed to delete gear');
    return response.ok;
  }

  async searchGear(query) {
    const response = await fetch(`${API_BASE_URL}/gear/search?query=${encodeURIComponent(query)}`, {
      headers: {
        'Authorization': `Bearer ${localStorage.getItem('token')}`
      }
    });
    if (!response.ok) throw new Error('Failed to search gear');
    return response.json();
  }

  async getGearByCategory(category) {
    const response = await fetch(`${API_BASE_URL}/gear/category/${category}`, {
      headers: {
        'Authorization': `Bearer ${localStorage.getItem('token')}`
      }
    });
    if (!response.ok) throw new Error('Failed to fetch gear by category');
    return response.json();
  }
}

export default new GearService();