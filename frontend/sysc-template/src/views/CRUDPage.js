import React, { useState, useEffect } from 'react';
import SidebarMenu from '../components/SidebarMenu/SidebarMenu';
import ItemTable from '../components/CRUDTable/ItemTable';
import ItemForm from '../components/CRUDForm/ItemForm';
import Item2Table from '../components/CRUDTable/Item2Table';
import Item2Form from '../components/CRUDForm/Item2Form';
import useCRUDData from '../hooks/useCRUDData'; // Usando o hook
import { Container, Row, Col, Tabs, Tab } from 'react-bootstrap';

const CRUDView = () => {
  const [itemType, setItemType] = useState("item"); // Define o tipo de item a ser gerenciado
  const { data, createItem, updateItem, deleteItem, activateItem } = useCRUDData(itemType); // Usa o hook genérico o parametro deve ser o nome da "tabela" ou "classe" no banco de dados
  const [itemToEdit, setItemToEdit] = useState(null);
  const [isSidebarVisible, setIsSidebarVisible] = useState(true); // Controle de visibilidade do Sidebar

  // Detectando o tamanho da tela para alternar entre o Sidebar e os botões
  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth < 900) {
        setIsSidebarVisible(false);
      } else {
        setIsSidebarVisible(true);
      }
    };

    window.addEventListener('resize', handleResize);
    handleResize(); // Executa no início

    return () => window.removeEventListener('resize', handleResize);
  }, []);

  const handleCreateOrUpdate = (item) => {
    if (item.id) {
      updateItem(item);
    } else {
      createItem(item);
    }
    setItemToEdit(null);
  };

  const handleEdit = (item) => {
    setItemToEdit(item);
  };

  const handleDelete = (id) => {
    deleteItem(id);
  };

  const handleCancelEdit = () => {
    setItemToEdit(null);
  };

  const handleActivate = (id) => {
    activateItem(id); // Ação de "acionar"
  };

  const handleItemTypeChange = (newType) => {
    setItemType(newType);
    setItemToEdit(null); // Reseta o item em edição ao mudar de tipo
  };

  return (
    <Container fluid >
      <Row>
        <Col md={3} style={{ display: isSidebarVisible ? 'block' : 'none' }}>
          <SidebarMenu onSelectItemType={handleItemTypeChange} />
        </Col>
        <Col md={isSidebarVisible ? 9 : 12} style={{ backgroundColor: 'white', padding: '20px' }}>
          {/* Exibe Tabs apenas quando o Sidebar não está visível */}
          {isSidebarVisible ? null : (
            <div style={{ marginBottom: '20px' }}>
              <Tabs
                defaultActiveKey={itemType}
                id="crud-tabs"
                onSelect={(key) => handleItemTypeChange(key)}
                className="mb-3"
                justify
              >
                <Tab eventKey="item" title="Item">
                  {/* Exibe conteúdo relacionado a "Item" */}
                  <ItemForm onSubmit={handleCreateOrUpdate} itemToEdit={itemToEdit} onCancel={handleCancelEdit} />
                  <ItemTable data={data} onEdit={handleEdit} onDelete={handleDelete} />
                </Tab>
                <Tab eventKey="item2" title="Item 2">
                  {/* Exibe conteúdo relacionado a "Item 2" */}
                  <Item2Form onSubmit={handleCreateOrUpdate} itemToEdit={itemToEdit} onCancel={handleCancelEdit} />
                  <Item2Table data={data} onEdit={handleEdit} onDelete={handleDelete} onActivate={handleActivate} />
                </Tab>
              </Tabs>
            </div>
          )}

          {/* Exibe conteúdo principal apenas quando o Sidebar está visível */}
          {isSidebarVisible && (
            <>
              <h1 style={{ textAlign: 'center', fontWeight: 'lighter' }}>
                {itemType.charAt(0).toUpperCase() + itemType.slice(1)}
              </h1>
              {itemType === 'item' ? (
                <>
                  <ItemForm onSubmit={handleCreateOrUpdate} itemToEdit={itemToEdit} onCancel={handleCancelEdit} />
                  <ItemTable data={data} onEdit={handleEdit} onDelete={handleDelete} />
                </>
              ) : (
                <>
                  <Item2Form onSubmit={handleCreateOrUpdate} itemToEdit={itemToEdit} onCancel={handleCancelEdit} />
                  <Item2Table data={data} onEdit={handleEdit} onDelete={handleDelete} onActivate={handleActivate} />
                </>
              )}
            </>
          )}
        </Col>
      </Row>
    </Container>
  );
};

export default CRUDView;
