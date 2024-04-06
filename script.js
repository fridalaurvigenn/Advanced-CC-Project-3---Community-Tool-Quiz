document.addEventListener('DOMContentLoaded', function() {
    
    // Get the modal
    var modal = document.getElementById('myModal');

    // Get the button that opens the modal
    var btn = document.getElementById("startQuiz");

    // Get the <span> element that closes the modal
    var span = document.getElementsByClassName("close")[0];

    // When the page loads, show the modal
    modal.style.display = "block";

    // When the user clicks on the button, close the modal and start the quiz
    btn.onclick = function() {
        modal.style.display = "none";
        showQuestions();
        document.getElementById('submit-btn').style.display = 'block'; // Show the submit button
    }

    // When the user clicks on <span> (x), close the modal
    span.onclick = function() {
        modal.style.display = "none";
    }

    // When the user clicks anywhere outside of the modal, close it
    window.onclick = function(event) {
        if (event.target == modal) {
            modal.style.display = "none";
        }
    };
    
    const questions = [
        { question: "On a scale of 1 to 5, how safe do you feel when walking alone at night in your neighborhood?", options: ["Very Unsafe", "Unsafe", "Neutral", "Safe", "Very Safe"] },
        { question: "Have you ever experienced harassment or catcalling while in public spaces?", options: ["Yes", "No", "Unsure"] },
        { question: "How often do you experience street harassment (e.g., unwanted comments, gestures, or advances) in public spaces?", options: ["Very Often", "Occassionally", "Rarely", "Never"] },
        { question: "Do you feel safe using public transportation alone, especially during off-peak hours?", options: ["Yes", "No"] },
        { question: "Do you believe that your experiences of safety in public spaces are influenced by your gender, race, sexuality, or gender expression?", options: ["Yes", "No", "Unsure"] },
        { question: "How accessible do you find public amenities such as restrooms, seating areas, and lighting in your local area?", options: ["Very Inaccessible", "Inaccessible", "Neutral", "Accesible", "Very Accesible"] },
        { question:  "Have you ever felt pressure to conform to certain gender norms or stereotypes regarding appearance or behavior when in public spaces?", options: ["Yes", "No", "Unsure"] },
        { question:  "Do you ever feel judged or scrutinized by others when in public spaces, particularly based on your gender?", options: ["Yes", "No", "Sometimes?"] },
        { question:  "How welcomed and included do you feel in public spaces compared to other demographics?", options: ["Not Welcome at All", "Somewhat Welcome", "Neutral", "Welcomed", "Very Welcomed"] },
        
       
        // Add more questions here
    ];

    const questionContainer = document.getElementById('question-container');
    const resultContainer = document.getElementById('result-container');
    const submitButton = document.getElementById('submit-btn');

    let userAnswers = getUserAnswersFromLocalStorage(); // Load user answers from local storage

    function showQuestions() {
        questionContainer.innerHTML = '';
        questions.forEach((q, index) => {
            const questionDiv = document.createElement('div');
            questionDiv.classList.add('question');
            questionDiv.innerHTML = `<p>${index + 1}. ${q.question}</p>`;
            const optionsDiv = document.createElement('div');
            q.options.forEach((option, i) => {
                const optionInput = document.createElement('input');
                optionInput.type = 'radio';
                optionInput.name = `question-${index}`;
                optionInput.value = option;
                optionInput.id = `option-${index}-${i}`;
                const optionLabel = document.createElement('label');
                optionLabel.setAttribute('for', `option-${index}-${i}`);
                optionLabel.textContent = option;
                optionsDiv.appendChild(optionInput);
                optionsDiv.appendChild(optionLabel);
                optionsDiv.appendChild(document.createElement('br'));
            });
            questionDiv.appendChild(optionsDiv);
            questionContainer.appendChild(questionDiv);
        });
    }

    function getUserAnswers() {
        userAnswers = [];
        questions.forEach((q, index) => {
            const selectedOption = document.querySelector(`input[name="question-${index}"]:checked`);
            if (selectedOption) {
                userAnswers.push(selectedOption.value);
            } else {
                userAnswers.push(null);
            }
        });
    }

    function showResults() {
        resultContainer.innerHTML = '';
        questions.forEach((q, index) => {
            const resultDiv = document.createElement('div');
            resultDiv.innerHTML = `<p>Your answer for question ${index + 1}: ${userAnswers[index] || 'No answer provided'}</p>`;
            resultContainer.appendChild(resultDiv);
        });
    }

    // Function to save user answers in local storage
    function saveUserAnswersToLocalStorage(answers) {
        localStorage.setItem('userAnswers', JSON.stringify(answers));
    }

    // Function to retrieve user answers from local storage
    function getUserAnswersFromLocalStorage() {
        const storedAnswers = localStorage.getItem('userAnswers');
        return storedAnswers ? JSON.parse(storedAnswers) : [];
    }

    // Event listener for submit button
    submitButton.addEventListener('click', function() {
           // Get user answers
    getUserAnswers();
    
    // Check if all questions are answered
    if (userAnswers.includes(null)) {
        alert("Please answer all questions before submitting.");
        return; // Exit the function early if not all questions are answered
    }
    
    // Save answers to local storage
    saveUserAnswersToLocalStorage(userAnswers);
    
    // Show results
    showResults();
    });


    // Show questions when the page loads
    showQuestions();

});
