const langBtns = document.querySelectorAll('.lang-toggle button');
const els = document.querySelectorAll('[data-en]');
const mobileMenuBtn = document.querySelector('.mobile-menu-btn');
const navMenu = document.querySelector('nav ul');

// Multi-language system (EN/ML)
let currentLang = 'en';

langBtns.forEach(btn => {
  btn.addEventListener('click', (e) => {
    // Remove active class
    langBtns.forEach(b => b.classList.remove('active'));
    // Set active class
    e.target.classList.add('active');
    
    // Switch language
    currentLang = e.target.getAttribute('data-lang');
    updateLanguage();
  });
});

function updateLanguage() {
  els.forEach(el => {
    const text = el.getAttribute(`data-${currentLang}`);
    if (text) {
      if (el.tagName === 'INPUT' || el.tagName === 'TEXTAREA') {
        el.placeholder = text;
      } else {
        el.textContent = text;
      }
    }
  });
}

// Mobile Menu Toggle
mobileMenuBtn.addEventListener('click', () => {
  navMenu.classList.toggle('active');
  const icon = mobileMenuBtn.querySelector('i');
  if (navMenu.classList.contains('active')) {
    icon.classList.replace('fa-bars', 'fa-times');
  } else {
    icon.classList.replace('fa-times', 'fa-bars');
  }
});

// Close menu when clicking outside
document.addEventListener('click', (e) => {
  if (!navMenu.contains(e.target) && !mobileMenuBtn.contains(e.target) && navMenu.classList.contains('active')) {
    navMenu.classList.remove('active');
    mobileMenuBtn.querySelector('i').classList.replace('fa-times', 'fa-bars');
  }
});

// Chatbot UI Toggle
function toggleChat() {
  const chatWindow = document.getElementById('chat-window');
  if(chatWindow.style.display === 'none' || chatWindow.style.display === '') {
    chatWindow.style.display = 'block';
  } else {
    chatWindow.style.display = 'none';
  }
}

function sendMsg() {
  const input = document.getElementById('chat-input');
  if(input.value.trim() === '') return;
  
  const msgs = document.getElementById('chat-messages');
  
  // User message
  msgs.innerHTML += `<div style="text-align: right; margin-bottom: 10px;"><span style="background: var(--primary); color: white; padding: 5px 10px; border-radius: 10px; display: inline-block;">${input.value}</span></div>`;
  
  const oldVal = input.value;
  input.value = '';
  
  // Simulated AI response
  setTimeout(() => {
    let response = "Thank you for contacting LIFELINE. Our agent will assist you shortly.";
    if(oldVal.toLowerCase().includes('appointment')) response = "You can book an appointment by clicking the 'Book Appointment' button in the navigation bar or dialing 073069 19121.";
    if(oldVal.toLowerCase().includes('diabetes')) response = "We specialize in comprehensive Diabetes Care. Please visit our Diabetic Centre or call 073069 19121 for more details.";
    if(oldVal.toLowerCase().includes('time') || oldVal.toLowerCase().includes('hours')) response = "We are open 24 Hours, 7 days a week.";
    
    msgs.innerHTML += `<div style="text-align: left; margin-bottom: 10px;"><span style="background: #e9ecef; color: var(--text-main); padding: 5px 10px; border-radius: 10px; display: inline-block;">${response}</span></div>`;
    msgs.scrollTop = msgs.scrollHeight;
  }, 1000);
}
