import { Outlet } from 'react-router-dom';
import Navbar from './Navbar';
import Footer from './Footer';

export default function Layout() {
  return (
    <div className="layout">
      <div className="bg-shapes" aria-hidden="true">
        <span className="bg-shape bg-shape--1"></span>
        <span className="bg-shape bg-shape--2"></span>
        <span className="bg-shape bg-shape--3"></span>
        <span className="bg-shape bg-shape--4"></span>
        <span className="bg-shape bg-shape--5"></span>
        <span className="bg-shape bg-shape--6"></span>
      </div>
      <Navbar />
      <main className="layout__main">
        <Outlet />
      </main>
      <Footer />
    </div>
  );
}
