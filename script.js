const questions = [
    {
        question: "O que é um navegador da web?",
        answer: [
            { text: "Um software para editar imagens", correct: false},
            { text: " Um programa que permite acessar e visualizar páginas na internet", correct: true},
            { text: "Um sistema operacional para dispositivos móveis", correct: false},
            { text: "Um tipo de vírus de computador", correct: false},

        ]
    },
    {
        question: "Qual é o sistema operacional mais utilizado em computadores pessoais em todo o mundo?",
        answer: [
            { text: "Linux", correct: false},
            { text: "macOS", correct: false},
            { text: "Android", correct: false},
            { text: "Windows", correct: true},

        ] 
    },
    {
        question: "O que significa a sigla PDF?",
        answer: [
            { text: "Personal Document Format", correct: false},
            { text: "Portable Document Format", correct: true},
            { text: "Print Document Format", correct: false},
            { text: "Program Data File", correct: false},

        ] 
    },
    {
        question: "Qual destes dispositivos é usado para armazenar dados permanentemente em um computador?",
        answer: [
            { text: "RAM", correct: false},
            { text: "CPU", correct: false},
            { text: "Disco rígido (HD)", correct: true},
            { text: "Placa-mãe", correct: false},
        
        ]
    }
];

    const questionElement = document.getElementById("question");
    const placarElement = document.getElementById("placar");
    const answerButtons = document.getElementById("answer-buttons");
    const nextButton = document.getElementById("next-btn");

    let currentQuestionIndex = 0;
    let score = 0;

    function startQuiz(){
        currentQuestionIndex = 0;
        score = 0;
        nextButton.innerHTML = "Próximo";
        showQuestion();

}

function showQuestion(){ 
    resetState();
    let currentQuestion = questions[currentQuestionIndex]; 
    let questionNo = currentQuestionIndex + 1; 
    questionElement.innerHTML = questionNo + ". " + currentQuestion.
    question;

    currentQuestion.answer.forEach(answer => { 
        const button = document.createElement("button"); 
        button.innerHTML = answer.text; 
        button.classList.add("btn"); 
        answerButtons.appendChild(button);
        if(answer.correct){
            button.dataset.correct = answer.correct;
        }
        button.addEventListener("click", selectAnswer);
    
    });

}

function resetState(){
    nextButton.style.display = "none";
    while(answerButtons.firstChild){
        answerButtons.removeChild(answerButtons.firstChild);
    }
}

function selectAnswer(e){
    const selectedBtn = e.target;
    const IsCorrect = selectedBtn.dataset.correct === "true";
    if(IsCorrect){
        selectedBtn.classList.add("correct");
        score++;
    }else {
        selectedBtn.classList.add("incorrect");
    }

    Array.from(answerButtons.children).forEach(button =>{
        if(button.dataset.correct === "true"){
            button.classList.add("correct");
        }
        button.disabled = true;
    });
    nextButton.style.display = "block";
    placarElement.innerHTML = `Você acertou ${score} de ${questions.length} perguntas!`; 
}

function showScore(){
    resetState();
    questionElement.innerHTML = `Você acertou ${score} de ${questions.length} perguntas!`;  
    placarElement.innerHTML = '';   
    nextButton.innerHTML = "Reiniciar o Quiz";
    nextButton.style.display = "block";
}

function handleNextButton(){
    currentQuestionIndex++;
    if(currentQuestionIndex < questions.length){
        showQuestion();
    }else{
        showScore();
    }
}

nextButton.addEventListener("click", ()=>{
    if(currentQuestionIndex < questions.length){
        handleNextButton();
    }else{
        startQuiz();
    }
});

startQuiz();