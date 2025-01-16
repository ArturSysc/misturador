import React from 'react';
import { Table, Button } from 'react-bootstrap';
import { useTranslation } from 'react-i18next'; // Importando o hook useTranslation
import { FiEdit, FiTrash2} from 'react-icons/fi';

const ItemTable = ({ data, onEdit, onDelete, onActivate }) => {
  const { t } = useTranslation(); // Usando o hook useTranslation para acessar as traduções

  return (
    <Table striped bordered hover responsive>
      <thead>
        <tr>
          <th style={{ textAlign: 'center' }}>ID</th>
          <th style={{ textAlign: 'center' }}>{t('tipo1Form.name')}</th> {/* Tradução para nome */}
          <th style={{ textAlign: 'center' }}>{t('actions')}</th> {/* Tradução para ações */}
        </tr>
      </thead>
      <tbody>
        {data.map((item) => (
          <tr key={item.id}>
            <td style={{ textAlign: 'center' }}>{item.id}</td>
            <td style={{ textAlign: 'center' }}>{item.name}</td>
            <td>
              <Button variant="link" onClick={() => onEdit(item)} style={{ color: 'black' }}>
                <FiEdit size={18} />
              </Button>
              <Button variant="link" onClick={() => onDelete(item.id)} style={{ color: 'red' }}>
                <FiTrash2 size={18} />
              </Button>
            </td>
          </tr>
        ))}
      </tbody>
    </Table>
  );
};

export default ItemTable;
