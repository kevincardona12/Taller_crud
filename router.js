const express = require('express');
const router = express.Router();

const conexion = require('./database/db')

router.get('/', (req, res) =>{
    conexion.query('SELECT * FROM users',(error, results)=>{
    if(error){
        throw error;
    }else{
        res.render('index',{results: results});
    }
    
})
});
//Rutas
router.get('/create.ejs', (req, res)=>{
    res.render('create');
})

//rutas para editar
router.get('/edit/:id', (req,res)=>{
    const id = req.params.id;
    conexion.query('SELECT * FROM users WHERE id=?',[id],(error, results)=>{
        if(error){
            throw error;
        }else{
            res.render('edit',{user: results[0]});
        }
    })
});

//Ruta para eliminar
router.get('/delete/:id', (req,res)=>{
    const id =req.params.id;
    conexion.query('DELETE FROM users WHERE id=?',[id],(error, results)=>{
        if(error){
            throw error;
        }else{
            res.redirect('/');
        }
})
})

const crud = require('./controllers/crud');
const { query } = require('express');
router.post('/save', crud.save);
router.post('/update', crud.update);

module.exports = router;