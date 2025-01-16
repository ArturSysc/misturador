// src/components/AlertBox.js
import React from 'react';
import './AlertBox.css'; // Importa o CSS para o AlertBox

const AlertBox = ({ alerts }) => (
  <div className="alert-box">
    {alerts.map((alert, index) => (
      <div key={index} className={`alert alert-${alert.type}`}>
        <span className="alert-timestamp">{alert.timestamp}</span>
        <span className="alert-type">{alert.type.toUpperCase()}: </span>
        <span className="alert-message">{alert.message}</span>
      </div>
    ))}
  </div>
);

export default AlertBox;
