/**
 * SkyVoyage — Shared Application Logic
 * Common functionality used across all pages:
 * - Navigation (mobile toggle)
 * - Toast notifications
 * - User session management
 * - Current page highlighting
 * 
 * Demonstrates: DOM manipulation, event handling, localStorage, closures
 */

import { $, $$, loadFromStorage, saveToStorage } from './utils.js';


// ============================================
// MOBILE NAVIGATION TOGGLE
// ============================================

/**
 * Initialize mobile hamburger menu toggle.
 * Demonstrates: DOM manipulation, classList, event handling
 */
export function initNavigation() {
  const toggle = $('.navbar-toggle');
  const links = $('.navbar-links');

  if (toggle && links) {
    toggle.addEventListener('click', () => {
      links.classList.toggle('mobile-open');
      // Animate hamburger icon
      toggle.classList.toggle('active');
    });

    // Close menu when clicking a link (mobile)
    $$('.navbar-links a').forEach(link => {
      link.addEventListener('click', () => {
        links.classList.remove('mobile-open');
        toggle.classList.remove('active');
      });
    });
  }
}

/**
 * Highlight the current page link in navigation.
 * Demonstrates: DOM manipulation, string comparison
 */
export function highlightCurrentPage() {
  const currentPage = window.location.pathname.split('/').pop() || 'index.html';
  
  $$('.navbar-links a').forEach(link => {
    const href = link.getAttribute('href');
    if (href === currentPage || (currentPage === 'index.html' && href === './')) {
      link.classList.add('active');
    } else {
      link.classList.remove('active');
    }
  });
}


// ============================================
// TOAST NOTIFICATION SYSTEM
// ============================================

/**
 * Show a toast notification.
 * Demonstrates: DOM manipulation, createElement, classList, setTimeout (closure)
 * 
 * @param {string} message - The notification message
 * @param {string} type - 'success' | 'error' | 'warning' | 'info'
 * @param {number} duration - Auto-dismiss time in ms (default: 4000)
 */
export function showToast(message, type = 'info', duration = 4000) {
  // Create or find the toast container
  let container = $('.toast-container');
  if (!container) {
    container = document.createElement('div');
    container.className = 'toast-container';
    document.body.appendChild(container);
  }

  // Icon map for different toast types
  const icons = {
    success: 'check_circle',
    error: 'error',
    warning: 'warning',
    info: 'info'
  };

  // Create toast element
  const toast = document.createElement('div');
  toast.className = `toast toast-${type}`;
  toast.innerHTML = `
    <span class="material-symbols-outlined icon-filled" style="color: var(--color-${type})">${icons[type]}</span>
    <span class="toast-message">${message}</span>
    <span class="material-symbols-outlined toast-close" onclick="this.parentElement.remove()">close</span>
  `;

  container.appendChild(toast);

  // Auto-dismiss after duration (closure keeps reference to this specific toast)
  setTimeout(() => {
    toast.style.animation = 'fadeOut 0.3s ease forwards';
    setTimeout(() => toast.remove(), 300);
  }, duration);
}


// ============================================
// USER SESSION MANAGEMENT
// ============================================

const USER_KEY = 'skyvoyage_user';

/**
 * Get the currently logged-in user from localStorage.
 * @returns {Object|null} User object or null
 */
export function getCurrentUser() {
  return loadFromStorage(USER_KEY);
}

/**
 * Save user session to localStorage.
 * @param {Object} user - User data to persist
 */
export function setCurrentUser(user) {
  saveToStorage(USER_KEY, user);
}

/**
 * Clear user session (logout).
 */
export function clearCurrentUser() {
  localStorage.removeItem(USER_KEY);
}

/**
 * Check if user is logged in.
 * @returns {boolean}
 */
export function isLoggedIn() {
  return getCurrentUser() !== null;
}

/**
 * Update navbar based on login state.
 * Shows "Sign In" or user name + dashboard link.
 * Demonstrates: Conditional DOM manipulation
 */
export function updateAuthUI() {
  const authContainer = $('.navbar-actions');
  const navLinks = $('.navbar-links');
  if (!authContainer) return;

  const user = getCurrentUser();

  // Remove existing dynamic admin link if any
  const existingAdminLink = $('.navbar-admin-link');
  if (existingAdminLink) {
    existingAdminLink.remove();
  }

  if (user) {
    const isAdmin = user.role === 'admin';
    if (isAdmin && navLinks) {
      const adminLink = document.createElement('a');
      adminLink.href = 'admin.html';
      adminLink.className = 'navbar-admin-link';
      adminLink.textContent = 'Admin';
      
      const helpLink = navLinks.querySelector('a[href="#"]');
      if (helpLink) {
        navLinks.insertBefore(adminLink, helpLink);
      } else {
        navLinks.appendChild(adminLink);
      }
      highlightCurrentPage();
    }

    authContainer.innerHTML = `
      ${isAdmin ? `
      <a href="admin.html" class="btn btn-ghost btn-sm">
        <span class="material-symbols-outlined icon-sm">admin_panel_settings</span>
        Admin
      </a>` : ''}
      <a href="dashboard.html" class="btn btn-ghost btn-sm">
        <span class="material-symbols-outlined icon-sm">dashboard</span>
        Dashboard
      </a>
      <div class="flex items-center gap-sm">
        <div style="width:36px;height:36px;border-radius:50%;background:var(--color-primary);color:white;display:flex;align-items:center;justify-content:center;font-weight:600;font-size:14px;">
          ${user.name?.charAt(0)?.toUpperCase() || 'U'}
        </div>
        <button class="btn btn-ghost btn-sm" id="logout-btn">Sign Out</button>
      </div>
    `;

    // Logout handler
    const logoutBtn = $('#logout-btn');
    if (logoutBtn) {
      logoutBtn.addEventListener('click', () => {
        clearCurrentUser();
        showToast('Successfully signed out', 'success');
        setTimeout(() => window.location.href = 'index.html', 1000);
      });
    }
  } else {
    authContainer.innerHTML = `
      <a href="login.html" class="btn btn-ghost">Sign In</a>
      <a href="register.html" class="btn btn-primary">Get Started</a>
    `;
  }
}


// ============================================
// PAGE INITIALIZATION
// Runs on every page load.
// ============================================

document.addEventListener('DOMContentLoaded', () => {
  initNavigation();
  highlightCurrentPage();
  updateAuthUI();
});
