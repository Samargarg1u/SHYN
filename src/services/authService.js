// src/services/authService.js

const USERS_DB_KEY = 'shyn_users_database';
const LEGACY_CUSTOMER_KEY = 'shyn_registered_customer';

export const ADMIN_CREDENTIALS = {
  email: 'admin@shyn.atelier',
  password: 'admin@shyn2026',
  name: 'Store Administrator',
  isAdmin: true,
  role: 'admin'
};

/**
 * Validate real email format:
 * RFC 5322 compliant, requires @ and a valid domain with a minimum 2-letter TLD.
 */
export function isValidEmail(email) {
  if (!email || typeof email !== 'string') return false;
  const trimmed = email.trim();
  const emailRegex = /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?(?:\.[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?)+$/;
  if (!emailRegex.test(trimmed)) return false;

  const parts = trimmed.split('@');
  if (parts.length !== 2) return false;
  const domain = parts[1];
  const domainParts = domain.split('.');
  if (domainParts.length < 2) return false;
  const tld = domainParts[domainParts.length - 1];
  if (tld.length < 2) return false;

  return true;
}

/**
 * Validate password requirements for registration:
 * 1. At least 12 characters long
 * 2. At least 1 uppercase letter (A-Z)
 */
export function validatePasswordRequirements(password) {
  const p = (password || '').trim();
  const hasLength = p.length >= 12;
  const hasUppercase = /[A-Z]/.test(p);

  return {
    isValid: hasLength && hasUppercase,
    hasLength,
    hasUppercase
  };
}

/**
 * Retrieve all registered customer accounts from localStorage
 */
export function getRegisteredUsers() {
  let list = [];
  try {
    const raw = localStorage.getItem(USERS_DB_KEY);
    if (raw) {
      const parsed = JSON.parse(raw);
      if (Array.isArray(parsed)) {
        list = parsed;
      }
    }
  } catch (err) {
    console.warn('Error reading users database:', err);
  }

  // Check legacy single-customer record to migrate seamlessly
  try {
    const legacyRaw = localStorage.getItem(LEGACY_CUSTOMER_KEY);
    if (legacyRaw) {
      const legacy = JSON.parse(legacyRaw);
      if (legacy && legacy.email) {
        const alreadyExists = list.some(u => u.email.toLowerCase() === legacy.email.trim().toLowerCase());
        if (!alreadyExists) {
          list.push({
            id: 'legacy_' + Date.now(),
            name: legacy.name || 'Valued Customer',
            email: legacy.email.trim(),
            password: legacy.password || '123456',
            createdAt: new Date().toISOString()
          });
        }
      }
    }
  } catch (err) {
    // fallback
  }

  return list;
}

/**
 * Persist users array to localStorage
 */
function saveUsers(users) {
  try {
    localStorage.setItem(USERS_DB_KEY, JSON.stringify(users));
  } catch (err) {
    console.warn('Error saving users database:', err);
  }
}

/**
 * Authenticate user during Sign In
 * Validates against admin credentials or registered customer database.
 */
export function authenticateUser(email, password) {
  const trimmedEmail = (email || '').trim().toLowerCase();
  const trimmedPassword = (password || '').trim();

  if (!trimmedEmail || !trimmedPassword) {
    return { success: false, error: 'Please enter both email and password.' };
  }

  if (!isValidEmail(trimmedEmail)) {
    return { success: false, error: 'Please enter a valid email address.' };
  }

  // 1. Check Store Administrator Credentials
  if (trimmedEmail === ADMIN_CREDENTIALS.email.toLowerCase()) {
    if (trimmedPassword !== ADMIN_CREDENTIALS.password) {
      return {
        success: false,
        error: 'Invalid admin credentials. Incorrect password for Store Administrator.'
      };
    }
    return {
      success: true,
      user: {
        email: ADMIN_CREDENTIALS.email,
        name: ADMIN_CREDENTIALS.name,
        isAdmin: true,
        role: 'admin'
      }
    };
  }

  // 2. Search Registered Customers Database
  const users = getRegisteredUsers();
  const foundUser = users.find(u => u.email.toLowerCase() === trimmedEmail);

  if (!foundUser) {
    return {
      success: false,
      error: 'No account found with this email. Please click "Create Account" to register first.'
    };
  }

  // 3. Verify Customer Password
  if (foundUser.password !== trimmedPassword) {
    return {
      success: false,
      error: 'Incorrect password. Please enter the password you registered with.'
    };
  }

  // Keep legacy record updated for checkout autofill
  try {
    localStorage.setItem(LEGACY_CUSTOMER_KEY, JSON.stringify({
      name: foundUser.name,
      email: foundUser.email,
      password: foundUser.password
    }));
  } catch (err) {}

  return {
    success: true,
    user: {
      email: foundUser.email,
      name: foundUser.name,
      isAdmin: false,
      role: 'customer'
    }
  };
}

/**
 * Register a new customer account
 * Enforces real email validation, at least 12 characters, and at least 1 uppercase letter.
 */
export function registerUser(name, email, password) {
  const trimmedName = (name || '').trim();
  const trimmedEmail = (email || '').trim().toLowerCase();
  const trimmedPassword = (password || '').trim();

  if (!trimmedName) {
    return { success: false, error: 'Please enter your full name to create an account.' };
  }
  if (!trimmedEmail || !isValidEmail(trimmedEmail)) {
    return { success: false, error: 'Please enter a valid real email address (e.g. name@gmail.com).' };
  }

  // Validate Password Requirements: 12+ chars and at least 1 uppercase letter
  const pwdCheck = validatePasswordRequirements(trimmedPassword);
  if (!pwdCheck.hasLength && !pwdCheck.hasUppercase) {
    return {
      success: false,
      error: 'Password must be at least 12 characters long and contain at least 1 uppercase letter (A-Z).'
    };
  }
  if (!pwdCheck.hasLength) {
    return {
      success: false,
      error: 'Password must be at least 12 characters long.'
    };
  }
  if (!pwdCheck.hasUppercase) {
    return {
      success: false,
      error: 'Password must contain at least 1 uppercase letter (A-Z).'
    };
  }

  // Cannot register using the protected admin email
  if (trimmedEmail === ADMIN_CREDENTIALS.email.toLowerCase()) {
    return {
      success: false,
      error: 'This email is reserved for Store Administration. Please Sign In with the admin password.'
    };
  }

  const users = getRegisteredUsers();
  const exists = users.some(u => u.email.toLowerCase() === trimmedEmail);

  if (exists) {
    return {
      success: false,
      error: 'An account with this email already exists! Please switch to "Sign In" to enter.'
    };
  }

  const newUser = {
    id: 'user_' + Date.now(),
    name: trimmedName,
    email: (email || '').trim(),
    password: trimmedPassword,
    createdAt: new Date().toISOString()
  };

  users.push(newUser);
  saveUsers(users);

  // Keep legacy record updated for checkout
  try {
    localStorage.setItem(LEGACY_CUSTOMER_KEY, JSON.stringify({
      name: newUser.name,
      email: newUser.email,
      password: newUser.password
    }));
  } catch (err) {}

  return {
    success: true,
    user: {
      email: newUser.email,
      name: newUser.name,
      isAdmin: false,
      role: 'customer'
    }
  };
}
