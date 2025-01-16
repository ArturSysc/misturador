import React from 'react';
import { Table, Button } from 'react-bootstrap';
import { FiEdit, FiTrash2 } from 'react-icons/fi';

const CRUDTable = ({ data, onEdit, onDelete }) => {
  // Extrai as colunas dinamicamente com base nas chaves do primeiro objeto de `data`
  const columns = data.length > 0 ? Object.keys(data[0]) : [];

  return (
    <Table striped bordered hover responsive style={{ borderRadius: '8px', border: '1px solid #ddd' }}>
      <thead>
        <tr>
          {columns.map((col) => (
            <th key={col} style={{ textAlign: 'center' }}>
              {col.charAt(0).toUpperCase() + col.slice(1)}
            </th>
          ))}
          <th style={{ textAlign: 'center' }}>Ações</th>
        </tr>
      </thead>
      <tbody>
        {data.map((item) => (
          <tr key={item.id}>
            {columns.map((col) => (
              <td key={col} style={{ textAlign: 'center' }}>
                {item[col]}
              </td>
            ))}
            <td style={{ textAlign: 'center' }}>
              <Button variant="link" size="sm" onClick={() => onEdit(item)} className="me-2">
                <FiEdit size={18} color="black" />
              </Button>
              <Button variant="link" size="sm" onClick={() => onDelete(item.id)}>
                <FiTrash2 size={18} color="red" />
              </Button>
            </td>
          </tr>
        ))}
      </tbody>
    </Table>
  );
};

export default CRUDTable;
