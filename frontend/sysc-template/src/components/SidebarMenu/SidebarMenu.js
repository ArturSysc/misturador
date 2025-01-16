import React, { useState } from 'react';
import { FaBox, FaCogs } from 'react-icons/fa';
import './SidebarMenu.css';

const SidebarMenu = ({ onSelectItemType }) => {
    const [selectedItem, setSelectedItem] = useState("item"); // Armazena o item selecionado

    const handleSelectItem = (itemType) => {
        setSelectedItem(itemType); // Atualiza o item selecionado
        onSelectItemType(itemType); // Chama a função de callback do pai
    };

    return (
        <div className="sidebar-menu">
            <button 
                onClick={() => handleSelectItem("item")} 
                className={`sidebar-button ${selectedItem === "item" ? "selected" : ""}`}
            >
                <FaBox className="me-2" />
                <span>Item</span>
            </button>
            <button 
                onClick={() => handleSelectItem("item 2")} 
                className={`sidebar-button ${selectedItem === "item 2" ? "selected" : ""}`}
            >
                <FaCogs className="me-2" />
                <span>Item 2</span>
            </button>
        </div>
    );
};

export default SidebarMenu;
