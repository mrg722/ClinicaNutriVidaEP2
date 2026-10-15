import bioimpedanciometria from "../../assets/img/bioimpedanciometria.jpg";
import habitosAlimentarios from "../../assets/img/habitos-alimentarios.jpg";
import analisisExamenes from "../../assets/img/analisis-examenes.jpg";
import alimentacionSaludable from "../../assets/img/alimentacion-saludable.jpg";
import cocinaNutritiva from "../../assets/img/cocina-nutritiva.jpg";
import nutricionDeportiva from "../../assets/img/nutricion-deportiva.jpg";

export const productosIniciales = [
  {
    id: "EV002",
    nombre: "Bioimpedanciometría",
    categoria: "Evaluación",
    descripcion: "Evaluación de composición corporal.",
    precio: 12000,
    imagen: bioimpedanciometria,
  },
  {
    id: "EV003",
    nombre: "Encuesta de hábitos alimentarios",
    categoria: "Evaluación",
    descripcion: "Análisis de hábitos y patrón alimentario.",
    precio: 10000,
    imagen: habitosAlimentarios,
  },
  {
    id: "EV004",
    nombre: "Análisis de exámenes",
    categoria: "Evaluación",
    descripcion: "Interpretación nutricional de exámenes.",
    precio: 15000,
    imagen: analisisExamenes,
  },
  {
    id: "TG001",
    nombre: "Taller de alimentación saludable",
    categoria: "Taller",
    descripcion: "Taller sobre alimentación equilibrada.",
    precio: 15000,
    imagen: alimentacionSaludable,
  },
  {
    id: "TG002",
    nombre: "Taller de cocina nutritiva",
    categoria: "Taller",
    descripcion: "Preparación de recetas saludables.",
    precio: 20000,
    imagen: cocinaNutritiva,
  },
  {
    id: "TG003",
    nombre: "Taller de nutrición para deportistas",
    categoria: "Taller",
    descripcion: "Alimentación e hidratación para deportistas.",
    precio: 18000,
    imagen: nutricionDeportiva,
  },
];