// Page Navigation
function navigateTo(pageId) {
  const pages = document.querySelectorAll('.page');
  pages.forEach(page => page.classList.remove('active'));
  
  const targetPage = document.getElementById(pageId);
  if (targetPage) {
    targetPage.classList.add('active');
    targetPage.classList.add('fade-in');
    window.scrollTo(0, 0);
  }

  updateNavigation(pageId);
  
  if (pageId === 'dashboard-page') {
    document.getElementById('bottom-nav').style.display = 'flex';
  }
}

function updateNavigation(pageId) {
  const navItems = document.querySelectorAll('.nav-item');
  navItems.forEach(item => item.classList.remove('active'));

  const pageNavMap = {
    'dashboard-page': 0,
    'sensor-page': 1,
    'crop-page': 2,
    'pest-page': 3,
    'weather-page': 4
  };

  const index = pageNavMap[pageId];
  if (index !== undefined && navItems[index]) {
    navItems[index].classList.add('active');
  }
}

// Login
function login(event) {
  event.preventDefault();
  const phone = document.getElementById('phone').value;
  const password = document.getElementById('password').value;
  
  if (phone && password) {
    navigateTo('splash-page');
    setTimeout(() => {
      navigateTo('dashboard-page');
    }, 2000);
  }
}

// Toggle Password Visibility
function togglePassword() {
  const passwordInput = document.getElementById('password');
  const type = passwordInput.getAttribute('type') === 'password' ? 'text' : 'password';
  passwordInput.setAttribute('type', type);
}

// Sensor Data
function refreshSensorData() {
  const moistureValue = Math.floor(Math.random() * 40) + 50;
  const tempValue = Math.floor(Math.random() * 10) + 24;
  const humidityValue = Math.floor(Math.random() * 30) + 60;

  document.getElementById('moisture-value').textContent = moistureValue + '%';
  document.getElementById('temp-value').textContent = tempValue + '°C';
  document.getElementById('humidity-value').textContent = humidityValue + '%';

  document.getElementById('moisture-bar').style.width = moistureValue + '%';
  document.getElementById('temp-bar').style.width = (tempValue / 50 * 100) + '%';
  document.getElementById('humidity-bar').style.width = humidityValue + '%';

  updateSensorStatus('moisture', moistureValue);
  updateSensorStatus('temp', tempValue);
  updateSensorStatus('humidity', humidityValue);

  const now = new Date();
  document.getElementById('sensor-time').textContent = now.toLocaleTimeString();

  const btn = document.querySelector('.btn-refresh');
  btn.style.transform = 'rotate(360deg)';
  setTimeout(() => {
    btn.style.transform = 'rotate(0deg)';
  }, 500);
}

function updateSensorStatus(type, value) {
  let status = 'Good';
  let className = 'status-success';
  let barClass = 'progress-success';

  if (type === 'moisture') {
    if (value < 40) {
      status = 'Critical';
      className = 'status-error';
      barClass = 'progress-error';
    } else if (value < 60) {
      status = 'Moderate';
      className = 'status-warning';
      barClass = 'progress-warning';
    }
  } else if (type === 'temp') {
    if (value < 20 || value > 35) {
      status = 'Critical';
      className = 'status-error';
      barClass = 'progress-error';
    } else if (value < 24 || value > 32) {
      status = 'Moderate';
      className = 'status-warning';
      barClass = 'progress-warning';
    } else {
      status = 'Optimal';
    }
  } else if (type === 'humidity') {
    if (value < 50 || value > 85) {
      status = 'Critical';
      className = 'status-error';
      barClass = 'progress-error';
    } else if (value < 60 || value > 80) {
      status = 'Moderate';
      className = 'status-warning';
      barClass = 'progress-warning';
    }
  }

  const statusElements = document.querySelectorAll('.sensor-status');
  const barElements = document.querySelectorAll('.progress-fill');
  
  if (type === 'moisture') {
    statusElements[0].textContent = status;
    statusElements[0].className = 'sensor-status ' + className;
    barElements[0].className = 'progress-fill ' + barClass;
  } else if (type === 'temp') {
    statusElements[1].textContent = status;
    statusElements[1].className = 'sensor-status ' + className;
    barElements[1].className = 'progress-fill ' + barClass;
  } else if (type === 'humidity') {
    statusElements[2].textContent = status;
    statusElements[2].className = 'sensor-status ' + className;
    barElements[2].className = 'progress-fill ' + barClass;
  }
}

// Voice Assistant
let isListening = false;

function toggleVoice() {
  const voiceBtn = document.querySelector('.voice-btn');
  isListening = !isListening;
  
  if (isListening) {
    voiceBtn.classList.add('listening');
    console.log('Voice assistant activated');
  } else {
    voiceBtn.classList.remove('listening');
    console.log('Voice assistant deactivated');
  }
}

// Initialize
document.addEventListener('DOMContentLoaded', function() {
  navigateTo('login-page');
  
  const now = new Date();
  const timeElement = document.getElementById('sensor-time');
  if (timeElement) {
    timeElement.textContent = now.toLocaleTimeString();
  }

  setInterval(() => {
    const currentTime = new Date();
    const timeEl = document.getElementById('sensor-time');
    if (timeEl) {
      timeEl.textContent = currentTime.toLocaleTimeString();
    }
  }, 1000);
});

// Handle browser back button
window.addEventListener('popstate', function() {
  const currentPage = document.querySelector('.page.active');
  if (currentPage && currentPage.id !== 'login-page') {
    navigateTo('dashboard-page');
  }
});

// Add smooth scroll behavior
document.documentElement.style.scrollBehavior = 'smooth';

// Prevent form submission on enter key except for login
document.addEventListener('keypress', function(e) {
  if (e.key === 'Enter' && e.target.tagName !== 'TEXTAREA') {
    const activeForm = document.querySelector('.page.active form');
    if (activeForm && activeForm.classList.contains('login-form')) {
      return;
    }
    e.preventDefault();
  }
});

