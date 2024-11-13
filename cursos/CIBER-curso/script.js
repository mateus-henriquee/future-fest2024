const fs = require('fs');
const path = require('path');
const express = require('express');

const app = express();
const port = 3000;

const commentPath = path.join(__dirname, 'comment.json');

// Middleware para analisar JSON e dados URL-encoded
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Servir arquivos estáticos da pasta atual (cursos/IA-curso)
app.use(express.static(__dirname));

// Carregar comentários do arquivo JSON
let commentData = fs.readFileSync(commentPath, 'utf-8');
let comment = JSON.parse(commentData);

app.get('/comments', (req, res) => {
    res.json(comment); // Enviar o array de comentários para o front-end
});
// Rota para receber comentários
app.post('/comment', (req, res) => {
    const newComment = req.body.comment; // Corrigi para newComment para evitar conflito

    if (!newComment) {
        return res.status(400).send('Comentário não pode ser vazio.');
    }

    comment.push(newComment); // Adiciona o novo comentário à lista existente

    // Salvar comentários atualizados no arquivo
    fs.writeFile(commentPath, JSON.stringify(comment, null, 2), (err) => {
        if (err) {
            console.error('Erro ao salvar o arquivo:', err);
            return res.status(500).send('Erro ao salvar o comentário.');
        }

        res.status(200).send('Comentário salvo com sucesso!');
    });
});

// Iniciar o servidor
app.listen(port, () => {
    console.log(`Servidor rodando em http://localhost:${port}`);
});

