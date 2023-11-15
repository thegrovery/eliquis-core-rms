const SessionManager = {
  setItem: function(key, value) {
    if (typeof value === 'object') {
      sessionStorage.setItem(key, JSON.stringify(value));
    } else {
      sessionStorage.setItem(key, value);
    }
  },
  getItem: function(key) {
    const value = sessionStorage.getItem(key);
    try {
      return JSON.parse(value);
    } catch (e) {
      return value;
    }
  },
  removeItem: function(key) {
    sessionStorage.removeItem(key);
  },
  clearAll: function() {
    sessionStorage.clear();
  }
};

// Usage Examples
// Store a string
//SessionManager.setItem('name', 'John');

// Store an object
//SessionManager.setItem('user', { id: 1, name: 'John' });

// Retrieve an item
//const name = SessionManager.getItem('name');
//const user = SessionManager.getItem('user');

//console.log('Name:', name);  // Output: 'Name: John'
//console.log('User:', user);  // Output: 'User: { id: 1, name: 'John' }'

// Remove an item
//SessionManager.removeItem('name');

// Clear all items
//SessionManager.clearAll();
