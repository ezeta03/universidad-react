import React, { useState, useEffect } from 'react';
import axios from 'axios';
import styles from './form.scss'; // Asegúrate de que la ruta sea correcta

function Form() {
    const [formData, setFormData] = useState({
        nombre: '',
        edad: '',
        fechaNacimiento: '',
        profesion: '',
        motivoConsulta: ''
    });

    const [atenciones, setAtenciones] = useState([]);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData({
            ...formData,
            [name]: value
        });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const response = await axios.post('http://localhost:5000/api/atenciones', formData);
            console.log('Datos enviados:', response.data);
            fetchAtenciones(); // Actualiza la lista de atenciones después de enviar el formulario
            setFormData({
                nombre: '',
                edad: '',
                fechaNacimiento: '',
                profesion: '',
                motivoConsulta: ''
            }); // Limpia el formulario después de enviar
        } catch (error) {
            console.error('Error al enviar los datos:', error);
        }
    };

    const fetchAtenciones = async () => {
        try {
            const response = await axios.get('http://localhost:5000/api/atenciones');
            setAtenciones(response.data);
        } catch (error) {
            console.error('Error al obtener los datos:', error);
        }
    };

    useEffect(() => {
        fetchAtenciones();
    }, []);

    return (
        <div>
            <form onSubmit={handleSubmit}>
                <div>
                    <label>Nombre:</label>
                    <input
                        type="text"
                        name="nombre"
                        value={formData.nombre}
                        onChange={handleChange}
                        required
                    />
                </div>
                <div>
                    <label>Edad:</label>
                    <input
                        type="number"
                        name="edad"
                        value={formData.edad}
                        onChange={handleChange}
                        required
                    />
                </div>
                <div>
                    <label>Fecha de Nacimiento:</label>
                    <input
                        type="date"
                        name="fechaNacimiento"
                        value={formData.fechaNacimiento}
                        onChange={handleChange}
                        required
                    />
                </div>
                <div>
                    <label>Profesión:</label>
                    <input
                        type="text"
                        name="profesion"
                        value={formData.profesion}
                        onChange={handleChange}
                        required
                    />
                </div>
                <div>
                    <label>Motivo de Consulta:</label>
                    <textarea
                        name="motivoConsulta"
                        value={formData.motivoConsulta}
                        onChange={handleChange}
                        required
                    />
                </div>
                <button type="submit">Enviar</button>
            </form>

            <h2>Atenciones Registradas</h2>
            <ul>
                {atenciones.map((atencion) => (
                    <li key={atencion._id}>
                        {atencion.nombre} - {atencion.edad} años - {atencion.profesion} - {new Date(atencion.fechaNacimiento).toLocaleDateString()} - {atencion.motivoConsulta}
                    </li>
                ))}
            </ul>
        </div>
    );
}

export default Form;