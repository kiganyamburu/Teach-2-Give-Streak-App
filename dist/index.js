"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
const addHabitBtn = document.querySelector("#addHabitBtn");
const hero = document.querySelector("#hero");
const addHabitForm = document.querySelector("#addHabitForm");
const habitList = document.querySelector("#habitList");
const createHabitCard = (habit) => {
    const habitCard = document.createElement("div");
    const habitImage = document.createElement("img");
    const habitName = document.createElement("h3");
    const habitCurrentStreak = document.createElement("p");
    const habitLongestStreak = document.createElement("p");
    habitCard.classList.add("habit-card");
    habitImage.setAttribute("src", habit.imagePath);
    habitImage.setAttribute("alt", habit.name);
    const today = new Date();
    const startDate = new Date(habit.start);
    habitName.textContent = habit.name;
    habitCurrentStreak.textContent =
        "Current Streak: " + calculateStreak(habit.start);
    habitLongestStreak.textContent =
        "Longest Streak: " + calculateStreak(habit.start);
    habitCard.appendChild(habitImage);
    habitCard.appendChild(habitName);
    habitCard.appendChild(habitCurrentStreak);
    habitCard.appendChild(habitLongestStreak);
    return habitCard;
};
const displayHabits = () => __awaiter(void 0, void 0, void 0, function* () {
    while (habitList === null || habitList === void 0 ? void 0 : habitList.firstElementChild) {
        habitList.removeChild(habitList.firstElementChild);
    }
    const response = yield fetch("http://localhost:3000/habits");
    const habits = yield response.json();
    habits.forEach((habit) => {
        const habitCard = createHabitCard(habit);
        habitList === null || habitList === void 0 ? void 0 : habitList.appendChild(habitCard);
    });
});
displayHabits();
const addHabit = (habit) => __awaiter(void 0, void 0, void 0, function* () {
    const response = yield fetch("http://localhost:3000/habits", {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify(habit),
    });
    const data = yield response.json();
});
const showAddHabitForm = () => {
    const habitForm = document.createElement("form");
    const closeBtn = document.createElement("button");
    const closeImage = document.createElement("img");
    const labelName = document.createElement("label");
    const inputName = document.createElement("input");
    const labelType = document.createElement("label");
    const inputType = document.createElement("select");
    const optionPositive = document.createElement("option");
    const optionNegative = document.createElement("option");
    const labelFrequency = document.createElement("label");
    const inputFrequency = document.createElement("input");
    const labelGoal = document.createElement("label");
    const inputGoal = document.createElement("input");
    const labelPriority = document.createElement("label");
    const inputPriority = document.createElement("select");
    const optionLow = document.createElement("option");
    const optionMedium = document.createElement("option");
    const optionHigh = document.createElement("option");
    const labelHabitImpact = document.createElement("label");
    const inputHabitImpact = document.createElement("textarea");
    const labelGoalImpact = document.createElement("label");
    const inputGoalImpact = document.createElement("textarea");
    const labelStart = document.createElement("label");
    const inputStart = document.createElement("input");
    const labelImageUrl = document.createElement("label");
    const inputImageUrl = document.createElement("input");
    const submitBtn = document.createElement("button");
    addHabitForm === null || addHabitForm === void 0 ? void 0 : addHabitForm.style.height = "100vh";
    habitForm.setAttribute("id", "habitForm");
    closeBtn.setAttribute("type", "button");
    closeBtn.setAttribute("id", "closeBtn");
    closeImage.setAttribute("src", "./assets/close.svg");
    closeImage.setAttribute("alt", "Close");
    labelName.setAttribute("for", "habitName");
    inputName.setAttribute("type", "text");
    inputName.setAttribute("id", "habitName");
    inputName.setAttribute("name", "habitName");
    inputName.setAttribute("required", "true");
    labelType.setAttribute("for", "type");
    inputType.setAttribute("id", "type");
    inputType.setAttribute("name", "type");
    optionPositive.setAttribute("value", "positive");
    optionPositive.textContent = "Positive";
    optionNegative.setAttribute("value", "negative");
    optionNegative.textContent = "Negative";
    labelFrequency.setAttribute("for", "frequency");
    inputFrequency.setAttribute("id", "frequency");
    inputFrequency.setAttribute("name", "frequency");
    inputFrequency.setAttribute("type", "text");
    inputFrequency.setAttribute("required", "true");
    labelGoal.setAttribute("for", "goal");
    inputGoal.setAttribute("id", "goal");
    inputGoal.setAttribute("name", "goal");
    inputGoal.setAttribute("required", "true");
    labelPriority.setAttribute("for", "priority");
    inputPriority.setAttribute("id", "priority");
    inputPriority.setAttribute("name", "priority");
    optionLow.setAttribute("value", "low");
    optionLow.textContent = "Low";
    optionMedium.setAttribute("value", "medium");
    optionMedium.textContent = "Medium";
    optionHigh.setAttribute("value", "high");
    optionHigh.textContent = "High";
    labelHabitImpact.setAttribute("for", "habitImpact");
    inputHabitImpact.setAttribute("id", "habitImpact");
    inputHabitImpact.setAttribute("required", "true");
    labelGoalImpact.setAttribute("for", "goalImpact");
    inputGoalImpact.setAttribute("id", "goalImpact");
    inputGoalImpact.setAttribute("required", "true");
    labelStart.setAttribute("for", "start");
    inputStart.setAttribute("id", "start");
    inputStart.setAttribute("name", "start");
    inputStart.setAttribute("type", "date");
    inputStart.setAttribute("required", "true");
    labelImageUrl.setAttribute("for", "imageUrl");
    inputImageUrl.setAttribute("id", "imageUrl");
    inputImageUrl.setAttribute("type", "text");
    inputImageUrl.setAttribute("required", "true");
    submitBtn.setAttribute("type", "submit");
    labelName.textContent = "Habit Name*";
    inputName.placeholder = "Habit Name";
    labelType.textContent = "Type*";
    labelFrequency.textContent = "Frequency*";
    inputFrequency.placeholder = "How often in a day?";
    labelGoal.textContent = "Goal*";
    inputGoal.placeholder = "What is your goal?";
    labelPriority.textContent = "Priority*";
    labelHabitImpact.textContent = "Habit Impact*";
    inputHabitImpact.placeholder = "How does this habit affect your life?";
    labelGoalImpact.textContent = "Goal Impact*";
    inputGoalImpact.placeholder =
        "How will achieving your goal impact your life?";
    labelStart.textContent = "Start | Stop Date*";
    labelImageUrl.textContent = "Image URL*";
    inputImageUrl.placeholder = "Enter path to image";
    submitBtn.textContent = "Add Habit";
    habitForm.addEventListener("submit", (e) => {
        e.preventDefault();
        const habit = {
            name: inputName.value,
            type: inputType.value,
            frequency: inputFrequency.value,
            goal: inputGoal.value,
            priority: inputPriority.value,
            habitImpact: inputHabitImpact.value,
            goalImpact: inputGoalImpact.value,
            start: inputStart.value,
            imagePath: inputImageUrl.value,
        };
        addHabit(habit);
        // habitForm.reset();
    });
    closeBtn.addEventListener("click", () => {
        addHabitForm === null || addHabitForm === void 0 ? void 0 : addHabitForm.removeChild(habitForm);
        addHabitForm === null || addHabitForm === void 0 ? void 0 : addHabitForm.style.height = "0";
    });
    closeBtn.appendChild(closeImage);
    inputType.appendChild(optionPositive);
    inputType.appendChild(optionNegative);
    inputPriority.appendChild(optionLow);
    inputPriority.appendChild(optionMedium);
    inputPriority.appendChild(optionHigh);
    habitForm.appendChild(closeBtn);
    habitForm.appendChild(labelName);
    habitForm.appendChild(inputName);
    habitForm.appendChild(labelType);
    habitForm.appendChild(inputType);
    habitForm.appendChild(labelFrequency);
    habitForm.appendChild(inputFrequency);
    habitForm.appendChild(labelGoal);
    habitForm.appendChild(inputGoal);
    habitForm.appendChild(labelPriority);
    habitForm.appendChild(inputPriority);
    habitForm.appendChild(labelHabitImpact);
    habitForm.appendChild(inputHabitImpact);
    habitForm.appendChild(labelGoalImpact);
    habitForm.appendChild(inputGoalImpact);
    habitForm.appendChild(labelStart);
    habitForm.appendChild(inputStart);
    habitForm.appendChild(labelImageUrl);
    habitForm.appendChild(inputImageUrl);
    habitForm.appendChild(submitBtn);
    addHabitForm === null || addHabitForm === void 0 ? void 0 : addHabitForm.appendChild(habitForm);
};
addHabitBtn === null || addHabitBtn === void 0 ? void 0 : addHabitBtn.addEventListener("click", showAddHabitForm);
function calculateStreak(startDate) {
    const today = new Date();
    const start = new Date(startDate);
    let days = 0;
    let months = 0;
    let years = 0;
    let diffMiliseconds = today.getTime() - start.getTime();
    let timeDiff = "";
    while (diffMiliseconds > 365 * 24 * 60 * 60 * 1000) {
        diffMiliseconds -= 365 * 24 * 60 * 60 * 1000;
        years++;
    }
    while (diffMiliseconds > 30 * 24 * 60 * 60 * 1000) {
        diffMiliseconds -= 30 * 24 * 60 * 60 * 1000;
        months++;
    }
    while (diffMiliseconds > 24 * 60 * 60 * 1000) {
        diffMiliseconds -= 24 * 60 * 60 * 1000;
        days++;
    }
    if (years > 0) {
        timeDiff += years + (years > 1 ? " years " : " year ");
    }
    if (months > 0) {
        timeDiff += months + (months > 1 ? " months " : " month ");
    }
    timeDiff += days + (days < 1 ? " days " : days > 1 ? " days " : " day ");
    return timeDiff;
}
