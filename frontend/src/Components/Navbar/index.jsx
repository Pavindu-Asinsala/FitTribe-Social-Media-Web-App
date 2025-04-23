import React, { useState, useEffect } from "react";

// Placeholder image for demonstration - replace with your actual images
const placeholderLogo = "/api/placeholder/85/60";
const placeholderUser = "/api/placeholder/40/40";

const Navbar = () => {
  // These would be connected to your Redux in the real implementation
  const [user, setUser] = useState({
    loginStatus: true,
    user: { username: "TasteBuddy", profileImage: null }
  });
  const [modalIsOpen, setModalIsOpen] = useState(false);
  const [searchActive, setSearchActive] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const openModal = () => setModalIsOpen(true);
  const closeModal = () => setModalIsOpen(false);
  
  const handleLogout = () => {
    console.log("Logging out");
    // This would dispatch your logout action
  };

  const toggleSearch = () => {
    setSearchActive(!searchActive);
    if (searchActive) {
      setSearchQuery("");
    }
  };

  const toggleMobileMenu = () => {
    setMobileMenuOpen(!mobileMenuOpen);
  };

  
  const styles = {
    navbar: {
      background: 'linear-gradient(to right, #f8f9fa, #e9ecef)',
      padding: '0.5rem 1rem',
      boxShadow: '0 2px 10px rgba(0, 0, 0, 0.1)',
      position: 'sticky',
      top: 0,
      zIndex: 1000
    },
    navContainer: {
      display: 'flex',
      justifyContent: 'space-between',
      alignItems: 'center',
      width: '100%',
      maxWidth: '1200px',
      margin: '0 auto'
    },
    logoContainer: {
      display: 'flex',
      alignItems: 'center'
    },
    logo: {
      height: '60px',
      width: '85px',
      objectFit: 'contain',
      transition: 'transform 0.3s ease',
      cursor: 'pointer'
    },
    searchContainer: {
      display: 'flex',
      alignItems: 'center',
      position: 'relative',
      flex: '0 1 400px',
      marginLeft: '1rem',
      marginRight: '1rem'
    },
    searchActiveContainer: {
      flex: '1 1 auto',
      transition: 'all 0.3s ease'
    },
    searchInput: {
      width: '100%',
      padding: '0.5rem 2.5rem 0.5rem 1rem',
      borderRadius: '20px',
      border: '1px solid #dee2e6',
      outline: 'none',
      backgroundColor: '#f8f9fa',
      transition: 'all 0.3s ease',
      boxShadow: '0 2px 5px rgba(0,0,0,0.05)'
    },
    searchButton: {
      position: 'absolute',
      right: '10px',
      top: '50%',
      transform: 'translateY(-50%)',
      border: 'none',
      background: 'transparent',
      cursor: 'pointer'
    },
    navLinks: {
      display: 'flex',
      alignItems: 'center',
      gap: '1rem'
    },
    navLink: {
      color: '#495057',
      textDecoration: 'none',
      fontWeight: '500',
      padding: '0.5rem 0.75rem',
      borderRadius: '4px',
      transition: 'all 0.2s ease',
      display: 'flex',
      alignItems: 'center'
    },
    activeNavLink: {
      color: '#0d6efd',
      backgroundColor: 'rgba(13,110,253,0.1)'
    },
    userProfile: {
      display: 'flex',
      alignItems: 'center',
      gap: '0.5rem',
      padding: '0.25rem 0.75rem',
      borderRadius: '20px',
      border: '1px solid #dee2e6',
      cursor: 'pointer',
      transition: 'all 0.2s ease',
      backgroundColor: 'white'
    },
    profileImage: {
      width: '32px',
      height: '32px',
      borderRadius: '50%',
      objectFit: 'cover'
    },
    username: {
      fontWeight: '600',
      fontSize: '0.9rem'
    },
    logoutButton: {
      padding: '0.4rem 1rem',
      borderRadius: '20px',
      border: '1px solid #dc3545',
      backgroundColor: 'transparent',
      color: '#dc3545',
      fontWeight: '500',
      cursor: 'pointer',
      transition: 'all 0.2s ease'
    },
    mobileMenuButton: {
      display: 'none',
      background: 'none',
      border: 'none',
      fontSize: '1.5rem',
      cursor: 'pointer',
      padding: '0.5rem'
    },
    mobileMenu: {
      display: 'none',
      position: 'fixed',
      top: '60px',
      left: 0,
      right: 0,
      backgroundColor: 'white',
      boxShadow: '0 5px 10px rgba(0,0,0,0.1)',
      padding: '1rem',
      flexDirection: 'column',
      gap: '1rem'
    },
    mobileMenuActive: {
      display: 'flex'
    },
    notificationBadge: {
      position: 'relative',
      padding: '0.5rem',
      cursor: 'pointer'
    },
    badge: {
      position: 'absolute',
      top: 0,
      right: 0,
      backgroundColor: '#dc3545',
      color: 'white',
      borderRadius: '50%',
      width: '18px',
      height: '18px',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      fontSize: '0.75rem',
      fontWeight: 'bold'
    },
    '@media (max-width: 992px)': {
      navLinks: {
        display: 'none'
      },
      mobileMenuButton: {
        display: 'block'
      }
    }
  };

  return (
    <div style={styles.navbar}>
      <div style={styles.navContainer}>
        {/* Logo */}
        <div style={styles.logoContainer}>
          <a href="/" style={{ textDecoration: 'none' }}>
            <img
              src={placeholderLogo}
              alt="TasteBuds Logo"
              style={styles.logo}
            />
          </a>
        </div>

        {/* Search Bar */}
        <div style={{
          ...styles.searchContainer,
          ...(searchActive ? styles.searchActiveContainer : {})
        }}>
          <input
            type="text"
            placeholder="Search for flavors, recipes, or users..."
            style={styles.searchInput}
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            onFocus={() => setSearchActive(true)}
            onBlur={() => setTimeout(() => setSearchActive(false), 200)}
          />
          <button style={styles.searchButton} onClick={toggleSearch}>
            <svg width="16" height="16" fill="currentColor" viewBox="0 0 16 16">
              <path d="M11.742 10.344a6.5 6.5 0 1 0-1.397 1.398h-.001c.03.04.062.078.098.115l3.85 3.85a1 1 0 0 0 1.415-1.414l-3.85-3.85a1.007 1.007 0 0 0-.115-.1zM12 6.5a5.5 5.5 0 1 1-11 0 5.5 5.5 0 0 1 11 0z"/>
            </svg>
          </button>
        </div>

        {/* Navigation Links for Desktop */}
        <div style={styles.navLinks} className="d-none d-lg-flex">
          {user.loginStatus ? (
            <>
              <a href="/" style={styles.navLink}>
                <svg width="16" height="16" fill="currentColor" viewBox="0 0 16 16" style={{ marginRight: '0.25rem' }}>
                  <path d="M2 2a2 2 0 0 1 2-2h8a2 2 0 0 1 2 2v13.5a.5.5 0 0 1-.777.416L8 13.101l-5.223 2.815A.5.5 0 0 1 2 15.5V2zm2-1a1 1 0 0 0-1 1v12.566l4.723-2.482a.5.5 0 0 1 .554 0L13 14.566V2a1 1 0 0 0-1-1H4z"/>
                </svg>
                Feed
              </a>
              <a href="/user" style={styles.navLink}>
                <svg width="16" height="16" fill="currentColor" viewBox="0 0 16 16" style={{ marginRight: '0.25rem' }}>
                  <path d="M8 8a3 3 0 1 0 0-6 3 3 0 0 0 0 6zm2-3a2 2 0 1 1-4 0 2 2 0 0 1 4 0zm4 8c0 1-1 1-1 1H3s-1 0-1-1 1-4 6-4 6 3 6 4zm-1-.004c-.001-.246-.154-.986-.832-1.664C11.516 10.68 10.289 10 8 10c-2.29 0-3.516.68-4.168 1.332-.678.678-.83 1.418-.832 1.664h10z"/>
                </svg>
                Profile
              </a>
              
              {/* Notification Bell */}
              <div style={styles.notificationBadge}>
                <svg width="20" height="20" fill="currentColor" viewBox="0 0 16 16">
                  <path d="M8 16a2 2 0 0 0 2-2H6a2 2 0 0 0 2 2zm.995-14.901a1 1 0 1 0-1.99 0A5.002 5.002 0 0 0 3 6c0 1.098-.5 6-2 7h14c-1.5-1-2-5.902-2-7 0-2.42-1.72-4.44-4.005-4.901z"/>
                </svg>
                <span style={styles.badge}>3</span>
              </div>
              
              {/* User Profile */}
              <div style={styles.userProfile} onClick={openModal}>
                <img 
                  src={user.user.profileImage || placeholderUser}
                  alt="User Profile"
                  style={styles.profileImage}
                />
                <span style={styles.username}>{user.user.username}</span>
              </div>
              
              {/* Logout Button */}
              <button style={styles.logoutButton} onClick={handleLogout}>
                Logout
              </button>
            </>
          ) : (
            <>
              <a href="/login" style={{
                ...styles.navLink, 
                border: '1px solid #0d6efd',
                color: '#0d6efd'
              }}>
                Login
              </a>
              <a href="/signup" style={{
                ...styles.navLink,
                backgroundColor: '#0d6efd',
                color: 'white'
              }}>
                Sign Up
              </a>
            </>
          )}
        </div>

        {/* Mobile Menu Button */}
        <button 
          style={styles.mobileMenuButton} 
          onClick={toggleMobileMenu}
          className="d-lg-none"
        >
          {mobileMenuOpen ? (
            <svg width="24" height="24" fill="currentColor" viewBox="0 0 16 16">
              <path d="M4.646 4.646a.5.5 0 0 1 .708 0L8 7.293l2.646-2.647a.5.5 0 0 1 .708.708L8.707 8l2.647 2.646a.5.5 0 0 1-.708.708L8 8.707l-2.646 2.647a.5.5 0 0 1-.708-.708L7.293 8 4.646 5.354a.5.5 0 0 1 0-.708z"/>
            </svg>
          ) : (
            <svg width="24" height="24" fill="currentColor" viewBox="0 0 16 16">
              <path fillRule="evenodd" d="M2.5 12a.5.5 0 0 1 .5-.5h10a.5.5 0 0 1 0 1H3a.5.5 0 0 1-.5-.5zm0-4a.5.5 0 0 1 .5-.5h10a.5.5 0 0 1 0 1H3a.5.5 0 0 1-.5-.5zm0-4a.5.5 0 0 1 .5-.5h10a.5.5 0 0 1 0 1H3a.5.5 0 0 1-.5-.5z"/>
            </svg>
          )}
        </button>
      </div>

      {/* Mobile Menu */}
      <div style={{
        ...styles.mobileMenu,
        ...(mobileMenuOpen ? styles.mobileMenuActive : {})
      }} className="d-lg-none">
        {user.loginStatus ? (
          <>
            <div style={{...styles.userProfile, width: 'fit-content'}}>
              <img 
                src={user.user.profileImage || placeholderUser}
                alt="User Profile"
                style={styles.profileImage}
              />
              <span style={styles.username}>{user.user.username}</span>
            </div>
            <a href="/" style={styles.navLink}>Feed</a>
            <a href="/user" style={styles.navLink}>Profile</a>
            <a href="/notifications" style={styles.navLink}>Notifications</a>
            <button style={{...styles.logoutButton, width: 'fit-content'}} onClick={handleLogout}>
              Logout
            </button>
          </>
        ) : (
          <>
            <a href="/login" style={{
              ...styles.navLink, 
              border: '1px solid #0d6efd',
              color: '#0d6efd',
              width: 'fit-content'
            }}>
              Login
            </a>
            <a href="/signup" style={{
              ...styles.navLink,
              backgroundColor: '#0d6efd',
              color: 'white',
              width: 'fit-content'
            }}>
              Sign Up
            </a>
          </>
        )}
      </div>

      {/* This is where your Modal component would be used */}
      {modalIsOpen && (
        <div style={{
          position: 'fixed',
          top: 0,
          left: 0,
          right: 0,
          bottom: 0,
          backgroundColor: 'rgba(0,0,0,0.5)',
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
          zIndex: 1001
        }}>
          <div style={{
            backgroundColor: 'white',
            padding: '2rem',
            borderRadius: '8px',
            maxWidth: '90%',
            width: '500px'
          }}>
            <div style={{display: 'flex', justifyContent: 'flex-end'}}>
              <button onClick={closeModal} style={{background: 'none', border: 'none', fontSize: '1.5rem', cursor: 'pointer'}}>
                ×
              </button>
            </div>
            <div>
              <h2>User Profile</h2>
              <p>Profile content would go here</p>
              {/* Your Profile component would be rendered here */}
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Navbar;