import { useEffect, useState } from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import Navegacion from "./components/Navegacion";
import PiePagina from "./components/PiePagina";
import { productosIniciales } from "./data/productos";
import Acceso from "./pages/Acceso";
import Administracion from "./pages/Administracion";
import Carrito from "./pages/Carrito";
import Contacto from "./pages/Contacto";
import DetalleProducto from "./pages/DetalleProducto";
import Inicio from "./pages/Inicio";
import NoEncontrada from "./pages/NoEncontrada";
import Productos from "./pages/Productos";
import Reserva from "./pages/Reserva";
import Servicios from "./pages/Servicios";
import { guardarJSON, leerJSON } from "./utils/persistencia";

function cargarProductos() {
  const guardados = leerJSON("nutrivida-productos", null);
  return Array.isArray(guardados) ? guardados : productosIniciales;
}

function cargarCarrito() {
  const guardados = leerJSON("carrito", []);
  if (!Array.isArray(guardados)) return [];

  return guardados
    .filter(
      (item) =>
        item &&
        typeof item === "object" &&
        item.id &&
        Number.isFinite(Number(item.precio)) &&
        Number(item.precio) >= 0,
    )
    .map((item) => ({
      ...item,
      precio: Number(item.precio),
      cantidad: Math.max(1, Number(item.cantidad) || 1),
    }));
}

function Aplicacion() {
  const [productos, setProductos] = useState(cargarProductos);
  const [carrito, setCarrito] = useState(cargarCarrito);

  useEffect(() => {
    guardarJSON("nutrivida-productos", productos);
  }, [productos]);

  useEffect(() => {
    guardarJSON("carrito", carrito);
  }, [carrito]);

  function agregarAlCarrito(producto) {
    setCarrito((actual) => {
      const existente = actual.find((item) => item.id === producto.id);
      if (existente) {
        return actual.map((item) =>
          item.id === producto.id
            ? { ...item, cantidad: item.cantidad + 1 }
            : item,
        );
      }

      return [...actual, { ...producto, cantidad: 1 }];
    });
  }

  function cambiarCantidad(id, delta) {
    setCarrito((actual) =>
      actual.flatMap((item) => {
        if (item.id !== id) return [item];
        const cantidad = item.cantidad + delta;
        return cantidad < 1 ? [] : [{ ...item, cantidad }];
      }),
    );
  }

  function eliminarDelCarrito(id) {
    setCarrito((actual) => actual.filter((item) => item.id !== id));
  }

  function vaciarCarrito() {
    setCarrito([]);
  }

  function crearProducto(producto) {
    setProductos((actual) => [...actual, producto]);
  }

  function eliminarProducto(id) {
    setProductos((actual) => actual.filter((producto) => producto.id !== id));
    setCarrito((actual) => actual.filter((item) => item.id !== id));
  }

  const cantidadCarrito = carrito.reduce((suma, item) => suma + item.cantidad, 0);

  return (
    <>
      <Navegacion cantidadCarrito={cantidadCarrito} />
      <Routes>
        <Route path="/" element={<Inicio />} />
        <Route path="/servicios" element={<Servicios />} />
        <Route
          path="/productos"
          element={<Productos productos={productos} onAgregar={agregarAlCarrito} />}
        />
        <Route
          path="/productos/:id"
          element={<DetalleProducto productos={productos} onAgregar={agregarAlCarrito} />}
        />
        <Route
          path="/carrito"
          element={
            <Carrito
              carrito={carrito}
              onCambiarCantidad={cambiarCantidad}
              onEliminar={eliminarDelCarrito}
              onVaciar={vaciarCarrito}
            />
          }
        />
        <Route path="/reserva" element={<Reserva productos={productos} />} />
        <Route path="/contacto" element={<Contacto />} />
        <Route
          path="/admin/*"
          element={
            <Administracion
              productos={productos}
              onCrearProducto={crearProducto}
              onEliminarProducto={eliminarProducto}
            />
          }
        />
        <Route path="/login" element={<Acceso />} />
        <Route path="/registro" element={<Acceso modo="registro" />} />
        <Route path="*" element={<NoEncontrada />} />
      </Routes>
      <PiePagina />
    </>
  );
}

export default function App() {
  return (
    <BrowserRouter>
      <Aplicacion />
    </BrowserRouter>
  );
}
