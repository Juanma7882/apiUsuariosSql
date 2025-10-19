import Usuario from '../../entities/Usuario.js';

class ServicesUsuario {

    async crearUsuario(usuario) {
        try {
            // pasar el objeto de usuario directamente a create
            const nuevoUsuario = await Usuario.create(usuario);
            return nuevoUsuario.toJSON();
        } catch (error) {
            console.error("Error creando usuario:", error);
            throw error;
        }
    }

    // nombre compatible con el controller: listarUsuarios
    async listarUsuarios() {
        try {
            const usuarios = await Usuario.findAll();
            return usuarios.map(u => u.toJSON());

        } catch (error) {
            console.error("Error obteniendo usuarios:", error);
            throw error;
        }
    }

    async obtenerUsuarioPorId(id) {
        try {
            const usuario = await Usuario.findByPk(id);
            if (!usuario) return null;

            return usuario.toJSON();
        } catch (error) {
            console.error("Error buscando usuario:", error);
            throw error;
        }
    }

    // recibir id y los datos a actualizar
    async actualizarUsuario(id, usuario) {
        try {
            const usr = await Usuario.findByPk(id);
            if (!usr) return null;

            usr.nombre = usuario.nombre;
            usr.apellido = usuario.apellido;
            usr.correo = usuario.correo;
            usr.celular = usuario.celular;
            await usr.save();

            return usr.toJSON();
        } catch (error) {
            console.error("Error actualizando usuario:", error);
            throw error;
        }
    }

    async eliminarUsuario(id) {
        try {
            const usuario = await this.obtenerUsuarioPorId(id);
            if (!usuario) return null;

            await Usuario.destroy({ where: { id } });
            return usuario;

        } catch (error) {
            console.error("Error eliminando usuario:", error);
            throw error;
        }
    }
}

// exportar una instancia para que el controller pueda usar sus métodos directamente
export default new ServicesUsuario();
