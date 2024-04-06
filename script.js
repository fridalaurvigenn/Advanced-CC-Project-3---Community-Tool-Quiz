document.addEventListener("DOMContentLoaded", function () {
  const modal = document.getElementById("myModal");
  const btn = document.getElementById("startQuiz");
  const span = document.getElementsByClassName("close")[0];
  const questionContainer = document.getElementById("question-container");
  const resultContainer = document.getElementById("result-container");
  const submitButton = document.getElementById("submit-btn");

  let userAnswers = getUserAnswersFromLocalStorage(); // Load user answers from local storage

  modal.style.display = "block";

  btn.onclick = function () {
    modal.style.display = "none";
    showQuestions();
    submitButton.style.display = "block"; // Show the submit button
  };

  span.onclick = function () {
    modal.style.display = "none";
  };

  window.onclick = function (event) {
    if (event.target == modal) {
      modal.style.display = "none";
    }
  };

  // Function to show questions
  function showQuestions() {
    questionContainer.innerHTML = "";
    // Gender selection question
    const genderQuestionDiv = document.createElement("div");
    genderQuestionDiv.classList.add("question");
    genderQuestionDiv.style.marginBottom = "60px"; // Add margin bottom for spacing
    genderQuestionDiv.innerHTML = `<p> Before you begin answering any questions, please take
        a moment to select the gender identity that best represents you. </p>
        <p>By selecting your gender identity, you help ensure that the quiz results accurately reflecting the diversity of 
        experiences within, and outside, the AFAB community.):</p>
            <select id="genderSelect" required>
                <option value="" disabled selected>Select your gender identity</option>
                <option value="cis-woman">Cisgender Woman</option>
                <option value="cis-man">Cisgender Man</option>
                <option value="trans-woman">Transgender Woman</option>
                <option value="trans-man">Transgender Man</option>
                <option value="non-binary">Non-Binary</option>
                <option value="other">Other/Not Cisgender Man</option>
            </select>`;
    questionContainer.appendChild(genderQuestionDiv);

    // Actual questions
    questions.forEach((q, index) => {
      const questionDiv = document.createElement("div");
      questionDiv.classList.add("question");
      questionDiv.innerHTML = `<p>${index + 1}. ${q.question}</p>`;
      const optionsDiv = document.createElement("div");
      q.options.forEach((option, i) => {
        const optionInput = document.createElement("input");
        optionInput.type = "radio";
        optionInput.name = `question-${index}`;
        optionInput.value = option;
        optionInput.id = `option-${index}-${i}`;
        const optionLabel = document.createElement("label");
        optionLabel.setAttribute("for", `option-${index}-${i}`);
        optionLabel.textContent = option;
        optionsDiv.appendChild(optionInput);
        optionsDiv.appendChild(optionLabel);
        optionsDiv.appendChild(document.createElement("br"));
      });
      questionDiv.appendChild(optionsDiv);
      questionContainer.appendChild(questionDiv);
    });
  }

  // Function to get user answers
  function getUserAnswers() {
    userAnswers = [];
    questions.forEach((q, index) => {
      const selectedOption = document.querySelector(
        `input[name="question-${index}"]:checked`
      );
      if (selectedOption) {
        userAnswers.push(selectedOption.value);
      } else {
        userAnswers.push(null);
      }
    });
  }

  // Function to save user answers in local storage
  function saveUserAnswersToLocalStorage(answers) {
    localStorage.setItem("userAnswers", JSON.stringify(answers));
  }

  // Function to retrieve user answers from local storage
  function getUserAnswersFromLocalStorage() {
    const storedAnswers = localStorage.getItem("userAnswers");
    return storedAnswers ? JSON.parse(storedAnswers) : [];
  }

  // Event listener for submit button
  submitButton.addEventListener("click", function () {
    getUserAnswers(); // Get user answers

    // Check if gender question is answered
    const genderSelect = document.getElementById("genderSelect");
    if (genderSelect.value === "") {
      alert(
        "Please select your gender identity before proceeding (It is key to the results accurately reflecting the diversity of experiences)."
      );
      return; // Exit the function early if gender question is not answered
    }

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

  // Function to show results
  function showResults() {
    resultContainer.innerHTML = "";
    questions.forEach((q, index) => {
      const resultDiv = document.createElement("div");
      resultDiv.innerHTML = `<p>Your answer for question ${index + 1}: ${
        userAnswers[index] || "No answer provided"
      }</p>`;
      resultContainer.appendChild(resultDiv);
    });
  }

  // Define your questions array here
  const questions = [
    {
      question:
        "On a scale of 1 to 5, how safe do you feel when walking alone at night in your neighborhood?",
      options: ["Very Unsafe", "Unsafe", "Neutral", "Safe", "Very Safe"],
    },
    {
      question:
        "Have you ever experienced harassment or catcalling while in public spaces?",
      options: ["Yes", "No", "Unsure"],
    },
    {
      question:
        "How often do you experience street harassment (e.g., unwanted comments, gestures, or advances) in public spaces?",
      options: ["Very Often", "Occasionally", "Rarely", "Never"],
    },
    {
      question:
        "Do you feel safe using public transportation alone, especially during off-peak hours?",
      options: ["Yes", "No"],
    },
    {
      question:
        "Do you believe that your experiences of safety in public spaces are influenced by your gender, race, sexuality, or gender expression?",
      options: ["Yes", "No", "Unsure"],
    },
    {
      question:
        "How accessible do you find public amenities such as restrooms, seating areas, and lighting in your local area?",
      options: [
        "Very Inaccessible",
        "Inaccessible",
        "Neutral",
        "Accessible",
        "Very Accessible",
      ],
    },
    {
      question:
        "Have you ever felt pressure to conform to certain gender norms or stereotypes regarding appearance or behavior when in public spaces?",
      options: ["Yes", "No", "Unsure"],
    },
    {
      question:
        "Do you ever feel judged or scrutinized by others when in public spaces, particularly based on your gender?",
      options: ["Yes", "No", "Sometimes?"],
    },
    {
      question:
        "How welcomed and included do you feel in public spaces compared to other demographics?",
      options: [
        "Not Welcome at All",
        "Somewhat Welcome",
        "Neutral",
        "Welcomed",
        "Very Welcomed",
      ],
    },
    {
      question:
        "How often do you witness discrimination or harassment directed at individuals based on their gender identity in public spaces?",
      options: ["Frequently", "Occasionally", "Rarely", "Never"],
    },
    {
      question:
        "Have you ever faced employment discrimination due to your gender identity?",
      options: ["Yes", "No", "Unsure"],
    },
    {
      question:
        "How satisfied are you with the support available to you from your friends and family regarding your gender identity?",
      options: [
        "Very Dissatisfied",
        "Dissatisfied",
        "Neutral",
        "Satisfied",
        "Very Satisfied",
      ],
    },
  ];

  // Show questions when the page loads
  showQuestions();
});
