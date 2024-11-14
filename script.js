//Letra Home
const text = 'inovA';
const h1 = document.getElementById('text');
const cursor = document.getElementById('cursor');
let index = 0;

function type() {
    if (index < text.length) {
        h1.innerHTML += text.charAt(index);
        index++;
        setTimeout(type, 600);
    }
}
type();

//Chat-BOt
function toggleChat() {
    const chatbot = document.getElementById('chatbot');
    if (chatbot.classList.contains('open')) {
        chatbot.classList.remove('open');
        setTimeout(() => {
            chatbot.style.display = 'none';
        }, 250);
    } else {
        chatbot.style.display = 'block';
        setTimeout(() => {
            chatbot.classList.add('open');
        }, 10);
    }
}

function showResponse(option) {
    const responseDiv = document.getElementById('response');
    const loadingDiv = document.getElementById('loading');
    responseDiv.classList.remove('show');
    loadingDiv.style.display = 'flex';
    responseDiv.innerText = '';
    setTimeout(() => {
        loadingDiv.style.display = 'none';
        let response;
        switch (option) {
            case 'Como funciona?':
                response = 'Nosso serviço funciona através de uma plataforma online que conecta você aos nossos colaboradores. ';
                break;
            case 'Quais os serviços oferecidos?':
                response = 'Oferecemos diversos cursos online como: \n • IA Adaptation; \n • Data Science; \n • Team Management; \n além de nossa Inteligencia Artificial altamente focada e treinada para responder qualquer resposta relacionada a tecnologia';
                break;
            case 'Qual o horário de atendimento?':
                response = 'Nossos cursos são totalmente online e gravados então nosso horario de funcionamento é de 24h';
                break;
            case 'Como posso entrar em contato?':
                response = 'Você pode entrar em contato conosco pelo e-mail contato@empresa.com ou preenchendo o formulario mais abaixo';
                break;
            case 'Tem alguma promoção?':
                response = 'Com a primeira assinatura você terá um desconto de 10% independente da escolha de seu plano';
                break;
            case 'Fale sobre a empresa.':
                response = 'Somos uma empresa dedicada a oferecer soluções inovadoras e desenvolver profissionais para o mercado de trabalho.';
                break;
            case 'o que é Bcorp':
                response = 'B-corp é uma certificação concedida às empresas comerciais que atendem a requisitos sociais e ambientais, governança e transparência em relação o público.';
                break;
            case 'Porque somos uma B-corp':
                response = 'Nós desempenhamos um grande desempenho social, doando 15% de nossos lucros para a comunidade, alêm de compensarmos a emissão de carbono gerada por cada acesso do site.';
                break;
            default:
                response = 'Desculpe, não entendi a sua pergunta.';
        }
        responseDiv.innerText = response;
        responseDiv.classList.add('show');
    }, 2000);
}

//DropDowns
const areas = document.querySelectorAll('.area');
const centralCard = document.querySelector('.area-central');

areas.forEach(area => {
    area.addEventListener('click', () => {
        if (!area.classList.contains('area-central')) {
            let tempContent = centralCard.querySelector('h3').textContent;
            centralCard.querySelector('h3').textContent = area.querySelector('h3').textContent;
            area.querySelector('h3').textContent = tempContent;
        }
    });
});
const questions = document.querySelectorAll('.question');

questions.forEach(question => {
    question.addEventListener('click', () => {
        const answer = question.nextElementSibling;


        if (answer.classList.contains('show')) {
            answer.classList.remove('show');
        } else {
            answer.classList.add('show');
        }

        const icon = question.querySelector('.icon');
        if (answer.classList.contains('show')) {
            icon.textContent = 'x';
            question.classList.add('open');
        } else {
            icon.textContent = '+';
            question.classList.remove('open');
        }
    });
});

//PodCast
const videos = document.querySelectorAll('.video-wrapper');
const dots = document.querySelectorAll('.bolinhas');
let currentIndex = 0;
let interval;

function showVideo(index) {
    videos.forEach((video, i) => {
        video.classList.remove('active');
        dots[i].classList.remove('active');
        if (i === index) {
            video.classList.add('active');
            dots[i].classList.add('active');
        }
    });
}

function nextVideo() {
    currentIndex = (currentIndex + 1) % videos.length;
    showVideo(currentIndex);
}

function startInterval() {
    interval = setInterval(nextVideo, 4000);
}

function stopInterval() {
    clearInterval(interval);
}

videos.forEach(video => {
    video.addEventListener('mouseover', stopInterval);
    video.addEventListener('mouseout', startInterval);
});

dots.forEach(dot => {
    dot.addEventListener('click', () => {
        currentIndex = parseInt(dot.getAttribute('data-index'));
        showVideo(currentIndex);
        stopInterval();
        startInterval();
    });
});

startInterval();


//Account
function toggleMenu() {
    const menu = document.getElementById('menu');
    menu.classList.toggle('active');
}

// CARROSSEL INSTITUTO
const images = ["/assets/image1.jpg", "/assets/image2.jpg"]; // Somente duas imagens
let nextIndex = 1; // Posição do próximo índice
let direction = 'left'; // Direção inicial da animação (da esquerda para a direita)

const photoElement = document.getElementById("photo");
const imageWrapper = document.querySelector(".image-wrapper");

function changeImage() {
    // Atualiza o índice da imagem atual e do próximo
    currentIndex = nextIndex;
    nextIndex = (nextIndex + 1) % images.length; // Alterna entre 0 e 1

    // Verifica a direção da animação
    if (direction === 'left') {
        imageWrapper.style.transform = "translateX(100%)"; // Move para a esquerda
        direction = 'right'; // Troca a direção para direita
    } else {
        imageWrapper.style.transform = "translateX(-100%)"; // Move para a direita
        direction = 'left'; // Troca a direção para esquerda
    }

    // Troca a imagem após a animação
    setTimeout(() => {
        photoElement.src = images[currentIndex]; // Atualiza a imagem
        imageWrapper.style.transition = 'none'; // Remove a transição enquanto a imagem é trocada
        imageWrapper.style.transform = "translateX(0)"; // Reseta a posição para o início da animação
        setTimeout(() => {
            imageWrapper.style.transition = 'transform 1s ease-in-out'; // Retorna a transição
        }, 50); // Pequeno delay para garantir que o reset de transição aconteça após a atualização da imagem
    }, 1000); // Tempo de espera para a animação da troca da imagem
}

// Troca de foto a cada 4 segundos
let imageInterval = setInterval(changeImage, 4000);

// Interrompe a troca de imagens quando o mouse passar sobre a imagem
imageWrapper.addEventListener('mouseenter', () => {
    clearInterval(imageInterval);
});

// Retoma a troca de imagens quando o mouse sair da imagem
imageWrapper.addEventListener('mouseleave', () => {
    imageInterval = setInterval(changeImage, 4000);
});
