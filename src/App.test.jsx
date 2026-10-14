
import { describe, it, expect, vi, beforeEach } from 'vitest';
import { render, screen, fireEvent, cleanup } from '@testing-library/react';
import App from './App';

beforeEach(() => {
  cleanup();
  localStorage.clear();
  window.history.pushState({}, '', '/');
});

describe('Pruebas de NutriVida', () => {
  it('muestra el título principal', () => {
    render(<App />);

    expect(
      screen.getByRole('heading', {
        name: /cuida tu alimentación, mejora tu vida/i,
      })
    ).toBeInTheDocument();
  });

  it('muestra los tres servicios', () => {
    render(<App />);

    expect(screen.getByText('Consulta nutricional')).toBeInTheDocument();
    expect(screen.getByText('Planes de alimentación')).toBeInTheDocument();
    expect(screen.getByText('Seguimiento nutricional')).toBeInTheDocument();
  });

  it('permite guardar un servicio', () => {
    render(<App />);

    fireEvent.click(
      screen.getAllByRole('button', { name: 'Guardar servicio' })[0]
    );

    expect(
      screen.getByRole('button', { name: 'Guardado ✓' })
    ).toBeInTheDocument();
  });

  it('guarda el servicio en localStorage', () => {
    const espia = vi.spyOn(Storage.prototype, 'setItem');

    render(<App />);

    fireEvent.click(
      screen.getAllByRole('button', { name: 'Guardar servicio' })[0]
    );

    expect(espia).toHaveBeenCalledWith(
      'nutrivida-guardados',
      JSON.stringify(['Consulta nutricional'])
    );

    espia.mockRestore();
  });

  it('permite quitar un servicio guardado', () => {
    render(<App />);

    fireEvent.click(
      screen.getAllByRole('button', { name: 'Guardar servicio' })[0]
    );

    fireEvent.click(screen.getByRole('button', { name: 'Guardado ✓' }));

    expect(
      screen.getAllByRole('button', { name: 'Guardar servicio' })
    ).toHaveLength(3);
  });

  it('muestra la página de servicios', () => {
    window.history.pushState({}, '', '/servicios');

    render(<App />);

    expect(
      screen.getByText(/opciones de atención nutricional/i)
    ).toBeInTheDocument();
  });

  it('muestra la página no encontrada para una ruta incorrecta', () => {
    window.history.pushState({}, '', '/ruta-inexistente');

    render(<App />);

    expect(
      screen.getByRole('heading', { name: 'Página no encontrada' })
    ).toBeInTheDocument();
  });

  it('muestra los enlaces de navegación', () => {
    render(<App />);

    expect(
      screen.getByRole('link', { name: /inicio/i })
    ).toHaveAttribute('href', '/');

    expect(
      screen.getByRole('link', { name: 'Servicios' })
    ).toHaveAttribute('href', '/servicios');
  });

  it('muestra el pie de página', () => {
    render(<App />);

    expect(
      screen.getByText(/tu bienestar comienza con buenos hábitos/i)
    ).toBeInTheDocument();
  });

  it('navega a servicios desde el botón principal', () => {
    render(<App />);

    fireEvent.click(
      screen.getByRole('button', {
        name: /conoce nuestros servicios/i,
      })
    );

    expect(
      screen.getByText(/opciones de atención nutricional/i)
    ).toBeInTheDocument();
  });
});
