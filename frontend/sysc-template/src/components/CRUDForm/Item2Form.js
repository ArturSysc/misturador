import React, { useState, useEffect } from 'react';
import { Form, Button } from 'react-bootstrap';
import { FiCheck, FiX } from 'react-icons/fi';
import { useTranslation } from 'react-i18next'; // Importando o hook useTranslation

const Item2Form = ({ onSubmit, itemToEdit, onCancel }) => {
    const [formData, setFormData] = useState({ id: '', name: '', status: '' });
    const { t } = useTranslation(); // Usando o hook useTranslation

    useEffect(() => {
        if (itemToEdit) {
            setFormData(itemToEdit);
        } else {
            setFormData({ id: '', name: '', status: '' });
        }
    }, [itemToEdit]);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData((prev) => ({ ...prev, [name]: value }));
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        onSubmit(formData);
        setFormData({ id: '', name: '', status: '' });
    };

    return (
        <Form onSubmit={handleSubmit} className="p-3" style={{ backgroundColor: '#f8f9fa', borderRadius: '8px' }}>
            <Form.Group controlId="formName" className="mb-3">
                <Form.Label>{t('tipo2Form.name')}</Form.Label>
                <Form.Control
                    type="text"
                    name="name"
                    value={formData.name}
                    onChange={handleChange}
                    required
                    placeholder={t('tipo2Form.enterName')}
                />
            </Form.Group>

            <Form.Group controlId="formStatus" className="mb-3">
                <Form.Label>{t('tipo2Form.status')}</Form.Label>
                <Form.Control
                    type="text"
                    name="status"
                    value={formData.status}
                    onChange={handleChange}
                    required
                    placeholder={t('tipo2Form.enterStatus')}
                />
            </Form.Group>

            <div className="d-flex justify-content-start">
                <Button
                    variant="link"
                    size="sm"
                    type="submit"
                    className="me-2"
                    style={{ color: 'black'}}
                >
                    <FiCheck size={20} color="black" /> {itemToEdit ? t('tipo2Form.update') : t('tipo2Form.create')}
                </Button>
                {itemToEdit && (
                    <Button
                        variant="link"
                        size="sm"
                        onClick={onCancel}
                        style={{ color: 'red', textDecoration: 'none' }}
                    >
                        <FiX size={20} color="red" /> {t('tipo2Form.cancel')}
                    </Button>
                )}

            </div>
        </Form>
    );
};

export default Item2Form;
