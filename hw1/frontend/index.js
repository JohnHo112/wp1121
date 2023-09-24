/* global axios */
const diaryTemplate = document.querySelector("#diary-template");
const diaryList = document.querySelector("#diaries");

const instance = axios.create({
  baseURL: "http://localhost:8000/api",
});

async function main() {
  // get datas from backend
  try {
    const diaries = await getDiaries();
    console.log(diaries)
    diaries.forEach((diary) => renderDiary(diary));
  } catch (error) {
    console.log(error)
    alert("Failed to load diary!");
  }
  // dynamic change
  setupEventListeners();
}

function setupEventListeners() {
  const section = document.querySelector("section")
  const redirectToDiaries = section.querySelectorAll(".diary-item");
  redirectToDiaries.forEach((redirectToDiary) => {
    const date = redirectToDiary.querySelector(".diary-date").textContent
    const label = redirectToDiary.querySelector(".diary-label").textContent
    const feeling = redirectToDiary.querySelector(".diary-feeling").textContent
    const content = redirectToDiary.querySelector(".diary-content").textContent
    const id = redirectToDiary.id
    redirectToDiary.addEventListener("dblclick", function () {
    var url = "diary.html?date=" + encodeURIComponent(date)
    + "&label=" + encodeURIComponent(label) 
    + "&feeling=" + encodeURIComponent(feeling) 
    + "&content=" + encodeURIComponent(content)
    + "&id=" + encodeURIComponent(id);
    window.location.href = url;
    });
  })
}

function renderDiary(diary) {
  const item = createDiaryElement(diary);
  diaryList.appendChild(item);
}

function createDiaryElement(diary) {
  const item = diaryTemplate.content.cloneNode(true);
  const container = item.querySelector(".diary-item");
  container.id = diary.id;
  const date = item.querySelector(".diary-date");
  date.innerText = diary.date;
  const label = item.querySelector(".diary-label");
  label.innerText = diary.label;
  const feeling = item.querySelector(".diary-feeling");
  feeling.innerText = diary.feeling;
  const content = item.querySelector(".diary-content")
  content.innerText = diary.content;
  return item;
}

async function getDiaries() {
  const response = await instance.get("/diaries");
  return response.data;
}



main();
