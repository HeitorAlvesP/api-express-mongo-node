const express = require('express');
const mongoose = require('mongoose');

const app = express();
app.use(express.json());
const port = 3000;

const Filme = mongoose.model('Filme', {
    titulo: String,
    descricao: String,
    image_url: String, 
    trailer_url: String,
});

app.get('/', async (req, res) => {
    const filmes = await Filme.find()
    return res.send(filmes);
});

app.put('/:id', async (req, res) => {
    const filme = await Filme.findByIdAndUpdate(req.params.id, {
        titulo: req.body.titulo,
        descricao: req.body.descricao,
        image_url: req.body.image_url, 
        trailer_url: req.body.trailer_url,
    }, { new: true });

    return res.send(filme)
});

app.delete('/:id', async (req, res) => {
    const filme = await Filme.findByIdAndDelete(req.params.id)
    res.send(filme)
})

app.post('/', async (req, res) => {
    const filme = new Filme({
        titulo: req.body.titulo,
        descricao: req.body.descricao,
        image_url: req.body.image_url, 
        trailer_url: req.body.trailer_url,
    });
    await filme.save();
    return res.send(filme);
})

app.listen(port, () => {
    mongoose.connect('mongodb+srv://heitor_pinto:Torhei1327@cluster0.jh3oco7.mongodb.net/?retryWrites=true&w=majority');
    console.log('Funciona pelo amor de Deus, n aguento mais');
})