import { useState, useEffect } from 'react';

/**
 * Hook para realizar operações CRUD (Criar, Ler, Atualizar, Deletar) genéricas em um conjunto de dados.
 * 
 * Este hook foi projetado para ser reutilizável com diferentes tipos de "itens" ou "modelos" de dados. 
 * O objetivo é que com um único hook, você consiga realizar operações CRUD para diferentes "tabelas" ou "modelos" de dados.
 * 
 * Recomenda-se que as APIs sigam o padrão de URL no formato:
 * 
 *  `host:port/{itemType}`
 * 
 * Onde `{itemType}` é o item que está sendo manipulado (ex: `item`, `tipo2`, 'salas', 'sensor', etc.).
 *
 * @param {string} itemType Tipo de item que será manipulado (ex: 'item', 'tipo2'). Valor padrão é 'item'.
 * 
 * @returns {Object} Objeto contendo os dados e funções de CRUD.
 */

const useCRUDData = (itemType = "item") => {
  const [data, setData] = useState([]);

  // Simulação de dados iniciais, dependendo do tipo de item
  useEffect(() => {
    // Aqui, você pode simular dados locais conforme o tipo de item
    const initialData = itemType === "item"
    ? [
        { id: 1, name: 'Item 1' },
        { id: 2, name: 'Item 2' },
        { id: 3, name: 'Item 3' }
      ]
    : [
        { id: 1, name: 'Tipo 2 - Item A', status: 'Ativo' },
        { id: 2, name: 'Tipo 2 - Item B', status: 'Inativo' }
      ];

    setData(initialData);

    // Exemplo de como carregar dados de uma API externa
    /*
    const fetchData = async () => {
      try {
        const response = await fetch(`https://api.exemplo.com/${itemType}`);
        const result = await response.json();
        setData(result);
      } catch (error) {
        console.error('Erro ao buscar dados:', error);
      }
    };
    fetchData();
    */
  }, [itemType]);

  // Função para criar um item localmente
  const createItem = (item) => {
    const newItem = { ...item, id: Date.now() };
    setData((prevData) => [...prevData, newItem]);

    // Exemplo de como enviar dados para uma API externa
    /*
    const createItemAPI = async (item) => {
      try {
        const response = await fetch(`https://api.exemplo.com/${itemType}`, {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(item),
        });
        const newItem = await response.json();
        setData((prevData) => [...prevData, newItem]);
      } catch (error) {
        console.error('Erro ao criar item:', error);
      }
    };
    createItemAPI(item);
    */
  };

  // Função para atualizar um item localmente
  const updateItem = (updatedItem) => {
    setData((prevData) =>
      prevData.map((item) => (item.id === updatedItem.id ? updatedItem : item))
    );

    // Exemplo de como atualizar item em uma API externa
    /*
    const updateItemAPI = async (updatedItem) => {
      try {
        await fetch(`https://api.exemplo.com/${itemType}/${updatedItem.id}`, {
          method: 'PUT',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(updatedItem),
        });
        setData((prevData) =>
          prevData.map((item) => (item.id === updatedItem.id ? updatedItem : item))
        );
      } catch (error) {
        console.error('Erro ao atualizar item:', error);
      }
    };
    updateItemAPI(updatedItem);
    */
  };

  // Função para deletar um item localmente
  const deleteItem = (id) => {
    setData((prevData) => prevData.filter((item) => item.id !== id));

    // Exemplo de como deletar item de uma API externa
    /*
    const deleteItemAPI = async (id) => {
      try {
        await fetch(`https://api.exemplo.com/${itemType}/${id}`, {
          method: 'DELETE',
        });
        setData((prevData) => prevData.filter((item) => item.id !== id));
      } catch (error) {
        console.error('Erro ao deletar item:', error);
      }
    };
    deleteItemAPI(id);
    */
  };

  return {
    data,
    createItem,
    updateItem,
    deleteItem,
  };
};

export default useCRUDData;
