// Debug script - run this in browser console
console.log('=== DEBUG INFO ===');
console.log('Token:', localStorage.getItem('token'));
console.log('User:', localStorage.getItem('user'));
console.log('UserType:', localStorage.getItem('userType'));
console.log('RefreshToken:', localStorage.getItem('refreshToken'));

// Clear all auth data
localStorage.removeItem('token');
localStorage.removeItem('user');
localStorage.removeItem('userType');
localStorage.removeItem('refreshToken');

console.log('=== CLEARED STORAGE ===');
console.log('Now reload the page');