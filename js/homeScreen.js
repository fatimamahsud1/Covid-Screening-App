function openPopup(popupId) {
    const openPopups = document.querySelectorAll('.popup');  //updated
    openPopups.forEach(popup => {
        popup.style.display = 'none';
    });

    const popup = document.getElementById(popupId);
    popup.style.display = 'block';
}


function closePopup(popupId) {
    const popup = document.getElementById(popupId);
    if (popup) {
        popup.style.display = 'none';
    }
}

let answers = {};

function openScreeningPopup() {
    nextQuestion(1);   //updated
    document.getElementById("screeningPopup").style.display = "flex";
    nextQuestion(1);
}

function closeScreeningPopup() {
    document.getElementById("screeningPopup").style.display = "none";
}

function closeResultPopup() {  //updated
    document.getElementById("resultPopup").style.display = "none";
    document.getElementById("screeningPopup").style.display = "none";
}

function nextQuestion(questionNumber) {
    const questionText = document.querySelector(".popup-content h2");
    const questionImage = document.querySelector(".popup-content img");

    switch (questionNumber) {
        case 1:
            questionText.textContent = "Do you have Fever above 101.4?";
            questionImage.src = "/images/fever.png";
            break;
        case 2:
            questionText.textContent = "Do you have Cough - (Dry Cough)?";
            questionImage.src = "/images/cough.png";
            break;
        case 3:
            questionText.textContent = "Do you have Cough - (Wet Cough)??";
            questionImage.src = "/images/cough.png";
            break;
        case 4:
            questionText.textContent = "Do you have Shortness of Breath?";
            questionImage.src = "/images/breath.png";
            break;
        case 5:
            questionText.textContent = "Do you have Flu?";
            questionImage.src = "/images/flu.png";
            break;
        case 6:
            questionText.textContent = "Have you travelled abroad in the last 15 days?";
            questionImage.src = "/images/plane.png";
            break;
        case 7:
            questionText.textContent = "Have you been in contact with any person who has recently travelled internationally?";
            questionImage.src = "/images/tourist.png";
            break;
        case 8:
            questionText.textContent = "Do you have chest infection?";
            questionImage.src = "/images/chest.png";
            break;
        case 9:
            questionText.textContent = "Is your age more than or equal to 60 years of age?";
            questionImage.src = "/images/age.png";
            break;
        case 10:
            questionText.textContent = "Due to Co-morbidities, do you take any medicine?";
            questionImage.src = "/images/medicine.png";
            break;
        default:
            displayResult();
            return;
    }

    answers.currentQuestion = questionNumber;
}

function answerQuestion(answer) {
    answers[`q${answers.currentQuestion}`] = answer;
    const nextQ = { 1: 2, 2: 3, 3: 4, 4: 5, 5: 6, 6: 7, 7: 8, 8: 9, 9: 10, 10: null }[answers.currentQuestion];
    if (nextQ) nextQuestion(nextQ);
    else displayResult();
}

function displayResult() {
    const result1 = answers.q1 && answers.q2 && answers.q4 && answers.q6 && answers.q8 && answers.q9;
    const result2 = answers.q1 && answers.q2 && answers.q4;
    const resultText = result1 ? "Result 1: High Probability of Corona!" : result2 ? "Result 2: Moderate Risk" : "Result 3: Low Risk";

    alert(resultText);
    closeScreeningPopup();
}

function displayResult() {
    const result1 = answers.q1 && answers.q2 && answers.q4 && answers.q6 && answers.q8 && answers.q9;
    const result2 = answers.q1 && answers.q2 && answers.q4;

    let resultText;

    if (result1) {
        resultText = `
        <div id='resultPopup'>
            <span class="close" onclick="closeResultPopup()">&times;</span> 
            <h1>Result 1: High Probability of Corona!</h1>
            <ol>
                <li>Isolate From Others</li>
                <li>Rest and Take Care</li>
                <li>Call Work Health Providers</li>
                <li>Monitor Symptoms</li>
                <li>Talk to Someone About Testing</li>
                <li>Follow Govt Instructions</li>
            </0l>
            <p>As of now, your answers suggest that you may need testing. If anything changes, take the questionnaire again.</p>
        </div>
        `;
    } else if (result2) {
        resultText = `
            <div id='resultPopup'>
            <span class="close" onclick="closeResultPopup()">&times;</span>
            <h1>Result 2: Suspected for Corona!</h1>
             <ol>
            <li>Isolate From Others</li>
            <li>Rest and Take Care</li>
            <li>Call Work Health Providers</li>
            <li>Monitor Symptoms</li>
            <li>Talk to Someone About Testing</li>
            <li>Follow Govt Instructions</li>
            </ol>
            <p>As of now, your answers suggest that you may need testing. If anything changes, take the questionnaire again.</p>
            </div>

        `;
    } else {
        resultText = `
            <div id='resultPopup'>
            <span class="close" onclick="closeResultPopup()">&times;</span>
            <h1>Result 3: You are all Good!</h1>
            <ol>
            <li>No Test Needed At This Time</li>
            <li>Maintain Social Distance</li>
            <li>Avoid groups of people and keep six feet apart from anyone who’s not part of the household. Especially avoid those showing symptoms.</li>
            </ol>
            <p>As of now, their answers suggest they do not need to get tested. If anything changes, take the questionnaire again.</p>
            </div>

        `;
    }

    const resultContainer = document.querySelector('.popup-content');
    if (resultContainer) {
        resultContainer.innerHTML = resultText;
    }
}
