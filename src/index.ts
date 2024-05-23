const addHabitBtn: HTMLButtonElement | null =
  document.querySelector("#addHabitBtn");
const hero: HTMLElement | null = document.querySelector("#hero");
const addHabitForm: HTMLElement | null =
  document.querySelector("#addHabitForm");
const habitList: HTMLDivElement | null = document.querySelector("#habitList");

interface Habit {
  name: string;
  type: "positive" | "negative";
  frequency: string;
  goal: string;
  priority: "low" | "medium" | "high";
  habitImpact: string;
  goalImpact: string;
  start: string;
  imagePath: string;
}

const createHabitCard = (habit: Habit): HTMLDivElement => {
  const habitCard: HTMLDivElement = document.createElement("div");
  const habitImage: HTMLImageElement = document.createElement("img");
  const habitName: HTMLHeadingElement = document.createElement("h3");
  const habitCurrentStreak: HTMLParagraphElement = document.createElement("p");
  const habitLongestStreak: HTMLParagraphElement = document.createElement("p");

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

const displayHabits = async () => {
  while (habitList?.firstElementChild) {
    habitList.removeChild(habitList.firstElementChild);
  }
  const response = await fetch("http://localhost:3000/habits");
  const habits = await response.json();
  habits.forEach((habit: Habit) => {
    const habitCard: HTMLDivElement = createHabitCard(habit);
    habitList?.appendChild(habitCard);
  });
};
displayHabits();

const addHabit = async (habit: Habit) => {
  const response = await fetch("http://localhost:3000/habits", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(habit),
  });
  const data = await response.json();
};

const showAddHabitForm = () => {
  const habitForm: HTMLFormElement = document.createElement("form");
  const closeBtn: HTMLButtonElement = document.createElement("button");
  const closeImage: HTMLImageElement = document.createElement("img");
  const labelName: HTMLLabelElement = document.createElement("label");
  const inputName: HTMLInputElement = document.createElement("input");
  const labelType: HTMLLabelElement = document.createElement("label");
  const inputType: HTMLSelectElement = document.createElement("select");
  const optionPositive: HTMLOptionElement = document.createElement("option");
  const optionNegative: HTMLOptionElement = document.createElement("option");
  const labelFrequency: HTMLLabelElement = document.createElement("label");
  const inputFrequency: HTMLInputElement = document.createElement("input");
  const labelGoal: HTMLLabelElement = document.createElement("label");
  const inputGoal: HTMLInputElement = document.createElement("input");
  const labelPriority: HTMLLabelElement = document.createElement("label");
  const inputPriority: HTMLSelectElement = document.createElement("select");
  const optionLow: HTMLOptionElement = document.createElement("option");
  const optionMedium: HTMLOptionElement = document.createElement("option");
  const optionHigh: HTMLOptionElement = document.createElement("option");
  const labelHabitImpact: HTMLLabelElement = document.createElement("label");
  const inputHabitImpact: HTMLTextAreaElement =
    document.createElement("textarea");
  const labelGoalImpact: HTMLLabelElement = document.createElement("label");
  const inputGoalImpact: HTMLTextAreaElement =
    document.createElement("textarea");
  const labelStart: HTMLLabelElement = document.createElement("label");
  const inputStart: HTMLInputElement = document.createElement("input");
  const labelImageUrl: HTMLLabelElement = document.createElement("label");
  const inputImageUrl: HTMLInputElement = document.createElement("input");
  const submitBtn: HTMLButtonElement = document.createElement("button");

  addHabitForm?.style.height = "100vh";
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
    const habit: Habit = {
      name: inputName.value,
      type: inputType.value as "positive" | "negative",
      frequency: inputFrequency.value,
      goal: inputGoal.value,
      priority: inputPriority.value as "low" | "medium" | "high",
      habitImpact: inputHabitImpact.value,
      goalImpact: inputGoalImpact.value,
      start: inputStart.value,
      imagePath: inputImageUrl.value,
    };
    addHabit(habit);
    // habitForm.reset();
  });
  closeBtn.addEventListener("click", () => {
    addHabitForm?.removeChild(habitForm);
    addHabitForm?.style.height = "0";
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
  addHabitForm?.appendChild(habitForm);
};

addHabitBtn?.addEventListener("click", showAddHabitForm);

function calculateStreak(startDate: string): string {
  const today = new Date();
  const start = new Date(startDate);
  let days: number = 0;
  let months: number = 0;
  let years: number = 0;
  let diffMiliseconds = today.getTime() - start.getTime();
  let timeDiff: string = "";

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
