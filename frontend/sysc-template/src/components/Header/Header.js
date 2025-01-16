import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import Container from 'react-bootstrap/Container';
import Navbar from 'react-bootstrap/Navbar';
import Nav from 'react-bootstrap/Nav';
import Button from 'react-bootstrap/Button';
import Dropdown from 'react-bootstrap/Dropdown';
import NotificationToast from '../NotificationToast/NotificationToast';
import useNotifications from '../../hooks/useNotification';
import LanguageSwitcher from '../LanguageSwitcher/LanguageSwitcher';
import { useTranslation } from 'react-i18next';
import { FaBars } from 'react-icons/fa'; // Importa o ícone de hambúrguer
// import { useAuth } from '../../contexts/AuthContext'; // Importe o hook do contexto de autenticação



import './Header.css';

const Header = () => {
  const { t } = useTranslation();
  const { notifications } = useNotifications();
  // const { isAuthenticated, handleLogout } = useAuth(); // Use o contexto de autenticação
  const [isMobile, setIsMobile] = useState(window.innerWidth < 1000);
  // const navigate = useNavigate(); // Para navegar após o logout

  // Atualizar o estado de `isMobile` com base na largura da tela
  useEffect(() => {
    const handleResize = () => setIsMobile(window.innerWidth < 1000);
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  // const logout = () => {
  //   handleLogout(); // Chama a função de logout do contexto
  //   navigate('/login'); // Redireciona para a página de login
  // };

  return (
    <>
      <Navbar className="bg-body-tertiary">
        <Container>
          <Navbar.Brand href="/">
            <img
              alt=""
              src={`${process.env.PUBLIC_URL}/images/logo-empresa.png`}
              height="30"
              className="d-inline-block align-top"
            />
            {!isMobile && <span className="ms-2 project-title">{t('header.projectTitle')}</span>}
          </Navbar.Brand>
          <Nav className="ms-auto">
            {isMobile ? (
              <Dropdown align="end">
                <Dropdown.Toggle as={Button} variant="link" className="dropdown-button">
                  <FaBars size={40} className="navbar-toggler" /> {/* Alinha o ícone corretamente */}
                </Dropdown.Toggle>
                <Dropdown.Menu>
                  {/* {isAuthenticated && <Dropdown.Item as={Link} to="/dashboard">{t('header.dashboard')}</Dropdown.Item>} */}
                  {<Dropdown.Item as={Link} to="/itens">{t('header.itens')}</Dropdown.Item>}
                  {/* {isAuthenticated && <Dropdown.Item as={Link} to="/graph">{t('header.graph')}</Dropdown.Item>}
                  {!isAuthenticated && <Dropdown.Item as={Link} to="/login">{t('header.login')}</Dropdown.Item>}
                  {isAuthenticated && <Dropdown.Item onClick={logout}>{t('header.logout')}</Dropdown.Item>} */}
                </Dropdown.Menu>
              </Dropdown>
            ) : (
              <>
                {/* {isAuthenticated && <Link to="/dashboard" className="nav-link">{t('header.dashboard')}</Link>} */}
                {<Link to="/itens" className="nav-link">{t('header.itens')}</Link>}
                {/* {isAuthenticated && <Link to="/graph" className="nav-link">{t('header.graph')}</Link>}
                {!isAuthenticated && <Link to="/login" className="nav-link">{t('header.login')}</Link>}
                {isAuthenticated && <Button variant="link" className="nav-link" onClick={logout}>{t('header.logout')}</Button>} */}
              </>
            )}
            <NotificationToast notifications={notifications} />
            <LanguageSwitcher />
          </Nav>
        </Container>
      </Navbar>
    </>
  );
};

export default Header;
