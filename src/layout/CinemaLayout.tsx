import { Outlet, NavLink } from 'react-router';
import { useState } from 'react';

const CinemaLayout = () => {
    const [sidebarVisible, setSidebarVisible] = useState(true);

    const toggleSidebar = () => {
        setSidebarVisible(!sidebarVisible);
    };
        
    const menuItems = [
    {
        label: 'Ahora en cines',
        icon: 'video',
        route: 'now-playing'
    },
    {
        label: 'Próximamente',
        icon: 'calendar',
        route: 'coming-soon'
    },
    {
        label: 'Tendencias',
        icon: 'trending',
        route: 'trending'
    },
    {
        label: 'Favoritos',
        icon: 'heart',
        route: 'favorites'
    },
    {
        label: 'Formulario',
        icon: 'heart',
        route: 'form'
    },
  ];



  return (
    <section className="flex min-h-screen flex-col">
        {/* Header fijo con botón toggle integrado y menú horizontal */}
        <header className="fixed top-0 left-0 right-0 h-16 bg-base-100 shadow-sm z-30">
            <div className="navbar px-4">
                <div className="navbar-start">
                    <div className="flex items-center gap-4">
                        {/* Botón toggle para sidebar */}
                        <button 
                            onClick={toggleSidebar}
                            className="btn btn-ghost btn-sm hover:bg-base-200 transition-all duration-200"
                            title={sidebarVisible ? 'Ocultar sidebar' : 'Mostrar sidebar'}
                        >
                            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                {sidebarVisible ? (
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11 19l-7-7 7-7m8 14l-7-7 7-7" />
                                ) : (
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h8m-8 6h16" />
                                )}
                            </svg>
                        </button>
                        

                    </div>
                </div>
                
                <div className="navbar-center hidden lg:flex">
                    <ul className="menu menu-horizontal px-1">
                        <li>
                            <NavLink 
                                to={'/counter'}
                                className={({ isActive }) => isActive ? 'active bg-primary text-primary-content' : ''}
                            >Contador</NavLink>
                        </li>
                        <li>
                            <NavLink 
                                to={'/task-manager'}
                                className={({ isActive }) => isActive ? 'active bg-primary text-primary-content' : ''}
                            >Task Manager</NavLink>
                        </li>
                        <li>
                            <NavLink 
                                to={'/cinema/now-playing'}
                                className={({ isActive }) => isActive ? 'active bg-primary text-primary-content' : ''}
                            >Cinema</NavLink>
                        </li>
                    </ul>
                </div>
                
                <div className="navbar-end">
                    {/* Espacio para elementos adicionales */}
                </div>
            </div>
        </header>
        
        {/* Contenedor principal con margen superior para el header */}
        <div className="flex min-h-screen pt-16">
            {/* Overlay de fondo cuando el sidebar está visible */}
            <div className={`fixed inset-0 top-16 bg-black transition-opacity duration-300 z-10 ${
                sidebarVisible ? 'opacity-50 pointer-events-auto' : 'opacity-0 pointer-events-none'
            }`} onClick={toggleSidebar}></div>

            {/* Sidebar fijo */}
            <div className={`fixed left-0 top-16 w-80 h-[calc(100vh-4rem)] bg-base-100 flex flex-col shadow-lg z-20 transition-transform duration-300 ${
                sidebarVisible ? 'translate-x-0' : '-translate-x-full'
            }`}>
            <div className="flex-1 p-6">
                 <div className="mb-6">
                     <h3 className="text-lg font-semibold text-base-content mb-2">Navegación</h3>
                     <div className="divider my-2"></div>
                 </div>

                 <ul className="menu bg-base-100 rounded-box w-full">
                    <li>
                        <NavLink 
                            to={'/cinema/now-playing'}
                            className={({ isActive }) => 
                                isActive ? 'active bg-primary text-primary-content' : 'hover:bg-base-300'
                            }
                        >
                            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 10l4.553-2.276A1 1 0 0121 8.618v6.764a1 1 0 01-1.447.894L15 14M5 18h8a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v8a2 2 0 002 2z" />
                            </svg>
                            En cines ahora
                        </NavLink>
                    </li>
                    <li>
                        <NavLink 
                            to={'/cinema/popular'}
                            className={({ isActive }) => 
                                isActive ? 'active bg-primary text-primary-content' : 'hover:bg-base-300'
                            }
                        >
                            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7h8m0 0v8m0-8l-8 8-4-4-6 6" />
                            </svg>
                            Tendencias
                        </NavLink>
                    </li>
                    <li>
                        <NavLink 
                            to={'/cinema/upcoming'}
                            className={({ isActive }) => 
                                isActive ? 'active bg-primary text-primary-content' : 'hover:bg-base-300'
                            }
                        >
                            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                            </svg>
                            Próximamente
                        </NavLink>
                    </li>
                    <li>
                        <NavLink 
                            to={'/cinema/form'}
                            className={({ isActive }) => 
                                isActive ? 'active bg-primary text-primary-content' : 'hover:bg-base-300'
                            }
                        >
                            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                            </svg>
                            Formulario
                        </NavLink>
                    </li>
                </ul>
            </div>
            
            {/* Footer del sidebar */}
            <div className="p-6 border-t border-base-300">
                <div className="text-sm text-base-content/70 text-center">
                    © 2024 Cinema App URBE
                </div>
            </div>
        </div>

            {/* Contenido principal sin margen dinámico - mantiene diseño responsivo */}
            <div className="flex-1">
                <Outlet />
            </div>
        </div>
    </section>
  )
}

export default CinemaLayout
