import React from 'react';

const Footer = () => {
  return (
    <footer style={footerStyle}>
      <div style={contentStyle}>
        <p>&copy; {new Date().getFullYear()} Aamir Khan. All rights reserved.</p>
      </div>
    </footer>
  );
};

const footerStyle = {
  backgroundColor: '#333',
  color: '#fff',
  textAlign: 'center',
  padding: '1rem 0',
  width: '100%',
  marginTop: 'auto',
};

const contentStyle = {
  maxWidth: '1200px',
  margin: '0 auto',
};

export default Footer;
