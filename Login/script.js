// script.js
const ctx = document.getElementById('graficoCursos').getContext('2d');
const graficoCursos = new Chart(ctx, {
    type: 'line',
    data: {
        labels: ['Jan', 'Fev', 'Mar', 'Abr', 'Mai', 'Jun', 'Jul', 'Ago', 'Set', 'Out', 'Nov', 'Dez'],
        datasets: [{
            label: 'Cursos Completados',
            data: [3, 5, 2, 4, 6, 7, 3, 8, 9, 5, 4, 6], // Exemplo de cursos feitos por mês
            borderColor: '#1135FF',
            backgroundColor: 'rgba(76, 175, 80, 0.2)',
            fill: true,
            tension: 0.4
        }]
    },
    options: {
        responsive: true,
        plugins: {
            legend: {
                position: 'top',
            },
            tooltip: {
                enabled: true
            }
        },
        scales: {
            x: {
                title: {
                    display: true,
                    text: 'Meses'
                }
            },
            y: {
                title: {
                    display: true,
                    text: 'Número de Cursos'
                },
                beginAtZero: true
            }
        }
    }
});

function trocarFoto() {
    const inputFile = document.getElementById('fileInput');
    const file = inputFile.files[0];

    if (file) {
        const reader = new FileReader();

        reader.onloadend = function () {
            // Atualizando a imagem no perfil
            const img = document.getElementById('fotoPerfil');
            img.src = reader.result; // A nova imagem que foi carregada

            // Simulando o armazenamento da nova imagem em um arquivo JSON
            const userData = {
                nome: "João da Silva",
                email: "joao.silva@email.com",
                foto: reader.result // Aqui guardamos o base64 da imagem
            };

            // Salvando os dados do usuário no localStorage (simulando um arquivo JSON)
            localStorage.setItem('userData', JSON.stringify(userData));
        };

        reader.readAsDataURL(file); // Lê a imagem como uma URL base64
    }
}

// Função para carregar a foto do perfil ao carregar a página
window.onload = function () {
    const storedData = localStorage.getItem('userData');
    if (storedData) {
        const userData = JSON.parse(storedData);
        const img = document.getElementById('fotoPerfil');
        img.src = userData.foto; // Se existir um perfil salvo, carregamos a foto
    }
};







document.addEventListener('DOMContentLoaded', () => {
    // Fazendo a requisição para obter o nome do usuário
    fetch('/usuario')
        .then(response => response.json())
        .then(data => {
            if (data.nome) {
                // Se o nome for encontrado, atualiza o conteúdo do elemento #nomeUsuario
                document.getElementById('nomeUsuario').textContent = data.nome;
            } else {
                // Se não houver nome (usuário não autenticado)
                document.getElementById('nomeUsuario').textContent = 'Usuário não autenticado';
            }
        })
        .catch(error => {
            console.error('Erro ao carregar o nome do usuário:', error);
            document.getElementById('nomeUsuario').textContent = 'Erro ao carregar nome de usuário';
        });


    fetch('/email')
        .then(response => response.json())
        .then(data => {
            if (data.email) {
                // Se o email for encontrado, atualiza o conteúdo do elemento #emailUsuario
                document.getElementById('email').textContent = data.email;
            } else {
                // Se não houver email (usuário não autenticado)
                document.getElementById('email').textContent = 'Usuário não autenticado';
            }
        })
        .catch(error => {
            console.error('Erro ao carregar o email do usuário:', error);
            document.getElementById('email').textContent = 'Erro ao carregar email de usuário';
        });
});