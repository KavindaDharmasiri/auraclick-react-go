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
    // Convert images to base64 or upload them first
    const imageUrls = [];
    if (images && images.length > 0) {
      for (const image of images) {
        const base64 = await this.convertToBase64(image);
        imageUrls.push(base64);
      }
    }

    const payload = {
      ...gearData,
      imageUrls: imageUrls
    };

    const response = await fetch(`${API_BASE_URL}/gear/create`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${localStorage.getItem('token')}`
      },
      body: JSON.stringify(payload)
    });

    if (!response.ok) {
      const error = await response.text();
      throw new Error(error);
    }
    return response.json();
  }

  convertToBase64(file) {
    return new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.readAsDataURL(file);
      reader.onload = () => resolve(reader.result);
      reader.onerror = error => reject(error);
    });
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