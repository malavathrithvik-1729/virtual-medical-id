/* auth.js - animated step navigator + toast utility */

// step manager: show/hide step nodes with animation
function showStep(idToShow){
  document.querySelectorAll('.step').forEach(s => {
    if(s.id === idToShow){
      s.classList.remove('hidden');
      s.classList.add('active');
      s.classList.contains('card') && s.classList.add('tilt');
      // small focus on first input inside shown step
      setTimeout(()=> {
        const f = s.querySelector('input, button, select, textarea');
        if(f) f.focus();
      }, 260);
    } else {
      s.classList.add('hidden');
      s.classList.remove('active');
      s.classList.remove('tilt');
    }
  });
}

// toast helper
function toast(msg, ms=2200){
  const t = document.getElementById('appToast') || createToast();
  t.textContent = msg;
  t.style.display = 'block';
  clearTimeout(t._hide);
  t._hide = setTimeout(()=> t.style.display='none', ms);
}
function createToast(){
  const d = document.createElement('div');
  d.id = 'appToast';
  d.className = 'toast';
  document.body.appendChild(d);
  return d;
}

/* ----- Role selection logic ----- */
let selectedRole = null;
function selectRole(role, el){
  selectedRole = role;
  document.querySelectorAll('.role-card').forEach(c => c.classList.remove('selected'));
  if(el) el.classList.add('selected');
  toast(`Role selected: ${role}`, 1200);
}

/* called by "Continue" on role page */
function goNext(){
  if(!selectedRole){ toast('Please select a role first'); return; }
  // show method step
  showStep('methodStep');
}

/* navigation to login form (role preserved in local storage for later) */
function gotoLogin(){
  localStorage.setItem('vmed_role', selectedRole || '');
  showStep('loginStep');
}

/* navigation to signup form - route to specific role signup */
function gotoSignup(){
  localStorage.setItem('vmed_role', selectedRole || '');
  if(selectedRole === 'patient') showStep('patientSignupStep');
  else if(selectedRole === 'doctor') showStep('doctorSignupStep');
  else showStep('govSignupStep');
}

/* form "send OTP" for login */
function sendLoginOtp(){
  const u = document.getElementById('loginUser').value.trim();
  const p = document.getElementById('loginPass').value.trim();
  if(!u || !p){ toast('Enter user id and password'); return; }
  // fake send
  toast('OTP sent (demo)');
  setTimeout(()=> showStep('otpStep'), 420);
}

/* send otp for signup */
function sendSignupOtp(formPrefix){
  // gather and validate minimally
  const inputs = document.querySelectorAll(`#${formPrefix} .input`);
  for(const ip of inputs){
    if(ip.required && !ip.value.trim()){
      toast('Please fill required fields');
      return;
    }
  }
  toast('OTP sent (demo)');
  setTimeout(()=> showStep('otpStep'), 420);
}

/* verify otp (accept anything now) */
function verifyOtpAndContinue(){
  const otp = document.getElementById('otpInput').value.trim();
  if(!otp){ toast('Enter the OTP'); return; }
  toast('Verified — logging in', 1000);
  // simulate routing by role
  const role = localStorage.getItem('vmed_role') || selectedRole;
  setTimeout(()=> {
    if(role === 'doctor') window.location.href = '../doctor_dashboard/index.html';
    else if(role === 'government') window.location.href = '../gov_dashboard/index.html';
    else window.location.href = '../patient_dashboard/index.html';
  }, 700);
}

/* small helper to wire up keyboard Enter to next actions */
document.addEventListener('keydown', (e) => {
  if(e.key === 'Enter'){
    const visible = document.querySelector('.step:not(.hidden)');
    if(!visible) return;
    const btn = visible.querySelector('.btn');
    if(btn) btn.click();
  }
});

/* initialize default step when login page loads */
document.addEventListener('DOMContentLoaded', ()=> {
  // If login page contains element with id roleStep then show it, else fallback
  if(document.getElementById('roleStep')) showStep('roleStep');
});
