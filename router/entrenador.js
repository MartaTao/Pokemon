const express = require('express');
const router = express.Router();
const Entrenador = require('../models/entrenador');
router.get('/', async (req, res) => {
    try {
        const arrayEntrenadorDB = await Entrenador.find();
        console.log(arrayEntrenadorDB);
        res.render("entrenador", {
            arrayEntrenador: arrayEntrenadorDB
        })
    } catch (error) {
        console.error(error)
    }
})
//Crear entrenador
router.get('/crearEntrenador', (req, res) => {
    res.render('crearEntrenador'); 
})
router.post('/', async (req, res) => {
    const body = req.body;
    console.log(body) ;
    try {
        const entrenadorDB = new Entrenador(body) 
        await entrenadorDB.save() 
        res.redirect('/entrenador') 
    } catch (error) {
        console.log('error', error)
    }
})
//Buscar entrenador
router.get('/:id', async(req, res) => { 
    const id = req.params.id;
    try {
        const entrenadorDB = await Entrenador.findOne({ _id: id }) 
        console.log(entrenadorDB)
        res.render('infoEntrenador', { 
            entrenador: entrenadorDB,
            error: false
        })
    } catch (error) { 
        console.log('Se ha producido un error', error)
        res.render('detalle', { 
            error: true,
            mensaje: 'Entrenador no encontrado!'
        })
    }
})
//Borrar entrenador
router.delete('/:id', async (req, res) => {
    const id = req.params.id;
    console.log('id desde backend', id)
    try {
        const entrenadorDB = await Entrenador.findByIdAndDelete({ _id: id });
        console.log(entrenadorDB)
        if (!entrenadorDB) {
            res.json({ 
                estado: false,
                mensaje: 'No se puede eliminar el entrenador.'
            })
        } else {
            res.json({
                estado: true,
                mensaje: 'Entrenador eliminado.'
            })
        } 
    } catch (error) {
        console.log(error)
    }
})
//Modificar entrenador
router.put('/:id', async (req, res) => {
    const id = req.params.id;
    const body = req.body;
    console.log(id)
    console.log('body', body)
    try {
        const entrenadorDB = await Entrenador.findByIdAndUpdate(
            id, body, { useFindAndModify: false }
        )
        console.log(entrenadorDB)
        res.json({
            estado: true,
            mensaje: 'Entrenador editado'
        })
    } catch (error) {
        console.log(error)
        res.json({
            estado: false,
            mensaje: 'Problema al editar el entrenador'
        })
    }
})
module.exports = router;