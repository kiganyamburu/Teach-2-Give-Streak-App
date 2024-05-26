const addHabitBtn: HTMLButtonElement | null =
  document.querySelector("#addHabitBtn");
const hero: HTMLElement | null = document.querySelector("#hero");
const addHabitForm: HTMLElement | null =
  document.querySelector("#addHabitForm");
const habitList: HTMLDivElement | null = document.querySelector("#habitList");

interface Habit {
  name: string;
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
  const labelName: HTMLLabelElement = document.createElement("label");
  const inputName: HTMLInputElement = document.createElement("input");
  const labelStart: HTMLLabelElement = document.createElement("label");
  const inputStart: HTMLInputElement = document.createElement("input");
  const labelImageUrl: HTMLLabelElement = document.createElement("label");
  const inputImageUrl: HTMLInputElement = document.createElement("input");
  const submitBtn: HTMLButtonElement = document.createElement("button");

  addHabitForm?.style.height = "100vh";
  habitForm.setAttribute("id", "habitForm");
  labelName.setAttribute("for", "habitName");
  inputName.setAttribute("type", "text");
  inputName.setAttribute("id", "habitName");
  inputName.setAttribute("name", "habitName");
  inputName.setAttribute("required", "true");
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
  ("How will achieving your goal impact your life?");
  labelStart.textContent = "Start | Stop Date*";
  labelImageUrl.textContent = "Image URL*";
  inputImageUrl.placeholder = "Enter path to image";
  submitBtn.textContent = "Add Habit";

  habitForm.addEventListener("submit", (e) => {
    e.preventDefault();
    const habit: Habit = {
      name: inputName.value,
      start: inputStart.value,
      imagePath: inputImageUrl.value,
    };
    addHabit(habit);
    // habitForm.reset();
  });

  habitForm.appendChild(labelName);
  habitForm.appendChild(inputName);
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
