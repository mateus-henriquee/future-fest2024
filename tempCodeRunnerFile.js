const express = require('express');
const { MongoClient } = require('mongodb');
const bcrypt = require('bcrypt');
const path = require('path');
const session = require('express-session');
const app = express();
const port = 3001;

// Configurações do Express
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(session({
    secret: 'crypt',
    resave: false,
    saveUninitialized: true,
}));

// Configuração para servir arquivos estáticos
app.use(express.static(path.join(__dirname)));
app.use('/login', express.static(path.join(__dirname, 'login')));

// Configurações do MongoDB
const url = 'mongodb://localhost:27017';
const dbName = 'Accounts';
const collectionName = 'Usuarios';

// Função para proteger rotas
function protegerRota(req, res, next) {
    if (req.session.email) {
        next();
    } else {
        // Armazena a URL que o usuário estava tentando acessar
        req.session.redirectTo = req.originalUrl;
        res.redirect('/login/conta.html'); // Redireciona para a página de login
    }
}

// Rota principal para servir o index.html
app.get('/', protegerRota, (req, res) => {
    res.sendFile(path.join(__dirname, 'index.html'));
});


app.get('/pagina', protegerRota, (req, res) => {
    res.sendFile(path.join(__dirname, 'login', 'pagina.html'));
});

app.get('/', protegerRota, (req, res) => {
    res.sendFile(path.join(__dirname, 'login', 'pagina.html'));
});




app.get('/begginer', protegerRota, (req, res) => {
    res.sendFile(path.join(__dirname, 'assinaturas', 'assinatura-basic', 'index.html'));
});


app.get('/medium', protegerRota, (req, res) => {
    res.sendFile(path.join(__dirname, 'assinaturas', 'assinatura-medium', 'index.html'));
});


app.get('/dev', protegerRota, (req, res) => {
    res.sendFile(path.join(__dirname, 'assinaturas', 'assinatura-dev', 'index.html'));
});

app.get('/usuario', (req, res) => {
    if (req.session.nomeUsuario) {
        res.json({ nome: req.session.nomeUsuario });
    } else {
        res.status(401).json({ erro: 'Usuário não autenticado' });
    }
});




// Rota para login
app.post('/login', async (req, res) => {
    const cliente = new MongoClient(url, { useUnifiedTopology: true });

    try {
        await cliente.connect();
        const db = cliente.db(dbName);
        const collection = db.collection(collectionName);

        const usuario = await collection.findOne({ email: req.body.email });

        if (usuario && await bcrypt.compare(req.body.password, usuario.senha)) {
            req.session.email = req.body.email;
            req.session.nomeUsuario = usuario.usuario

            // Redireciona para a rota que o usuário estava tentando acessar ou para uma rota padrão
            const redirectTo = req.session.redirectTo || '/'; // Ajuste a rota padrão conforme necessário
            delete req.session.redirectTo; // Limpa a rota armazenada
            res.redirect(redirectTo);
        } else {
            res.redirect('/login/error.html'); // Página de erro
        }
    } catch (erro) {
        console.error('Erro ao realizar login:', erro);
        res.send('Erro ao realizar login.');
    } finally {
        cliente.close();
    }
});

// Rota para cadastro de usuários
app.post('/adicionar', async (req, res) => {
    const cliente = new MongoClient(url, { useUnifiedTopology: true });

    try {
        if (!req.body.password) {
            return res.send('Erro: A senha não pode estar vazia.');
        }

        await cliente.connect();
        const db = cliente.db(dbName);
        const collection = db.collection(collectionName);

        const usuarioExistente = await collection.findOne({ email: req.body.email });
        if (usuarioExistente) {
            res.redirect('/login/error2.html');
        } else {
            const senhaCriptografada = await bcrypt.hash(req.body.password, 10);
            await collection.insertOne({
                usuario: req.body.username,
                email: req.body.email,
                senha: senhaCriptografada,
            });
            res.redirect('/login/sucess.html');;
        }
    } catch (erro) {
        console.error('Erro ao registrar o usuário:', erro);
        res.send('Erro ao registrar o usuário.');
    } finally {
        cliente.close();
    }
});

// Rota para logout
app.get('/sair', (req, res) => {
    req.session.destroy((err) => {
        if (err) {
            return res.send('Erro ao sair!');
        }
        res.redirect('/'); // Redireciona para a tela de login após logout
    });
});

// Iniciar o servidor
app.listen(port, () => {
    console.log(`Servidor rodando em http://localhost:${port}`);
});
