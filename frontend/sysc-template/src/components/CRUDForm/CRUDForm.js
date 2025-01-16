import React, { useState, useEffect } from 'react';
import { Form, Button } from 'react-bootstrap';
import { FiCheck, FiX } from 'react-icons/fi'; // Ícones de Check e X

const CRUDForm = ({ onSubmit, itemToEdit, onCancel }) => {
  // Inicializando os dados do formulário
  const [formData, setFormData] = useState({});

  // Quando o item a ser editado muda, ajusta os dados do formulário
  useEffect(() => {
    if (itemToEdit) {
      setFormData(itemToEdit);
    } else {
      // Ao criar um novo item, o formulário começa vazio
      setFormData({});
    }
  }, [itemToEdit]);

  // Função para atualizar o estado conforme o usuário digita
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  // Função para submeter o formulário
  const handleSubmit = (e) => {
    e.preventDefault();

    // Se o itemToEdit estiver presente, estamos atualizando, senão, criando um novo
    if (itemToEdit && itemToEdit.id) {
      // Atualização
      onSubmit(formData);
    } else {
      // Criação
      onSubmit(formData);
    }

    // Limpa o formulário após envio
    setFormData({});
  };

  // Função para renderizar os campos dinamicamente
  const renderFormFields = () => {
    return Object.keys(formData).map((key) => (
      key !== 'id' && ( // Não renderiza o campo 'id', ele é geralmente gerado automaticamente
        <Form.Group controlId={`form${key}`} className="mb-3" key={key}>
          <Form.Label>{key.charAt(0).toUpperCase() + key.slice(1)}</Form.Label>
          <Form.Control
            type="text"
            name={key}
            value={formData[key] || ''}  // Garantir que o campo seja preenchido com string vazia
            onChange={handleChange}
            required
            placeholder={`Digite o ${key}`}
            style={{ backgroundColor: '#e9ecef' }}
          />
        </Form.Group>
      )
    ));
  };

  return (
    <Form onSubmit={handleSubmit} className="p-3" style={{ backgroundColor: '#f8f9fa', borderRadius: '8px' }}>
      {renderFormFields()}

      <div className="d-flex justify-content-start">
        <Button variant="link" size="sm" onClick={handleSubmit}>
          <FiCheck size={20} color="black"/>
        </Button>{' '}
        {itemToEdit && (
          <Button variant="link" size="sm" onClick={onCancel}>
            <FiX size={20} color="red"/>
          </Button>
        )}
      </div>
    </Form>
  );
};

export default CRUDForm;
