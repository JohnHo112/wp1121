/* global axios */
const diaryTemplate = document.querySelector("#diary-template");
const diaryList = document.querySelector("#diaries");

const instance = axios.create({
  baseURL: "http://localhost:8000/api",
});

const diaries = [
  {
    "date": "2023.01.01 (wed)",
    "label": "relation",
    "feeling": "happy",
    "content": "I am a happy boy",
    "id": "650ea03540e88704ebae796e"
  },
  {
    "date": "2023.01.05 (sun)",
    "label": "societies",
    "feeling": "angry",
    "content": "I am a angry boy",
    "id": "650ea03540e88704ebae796a"
  }
]

async function main() {
  
  // get datas from backend
  try {
    // const todos = await getTodos();
    // console.log(todos)
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
  //console.log(section)
  const redirectToDiaries = section.querySelectorAll(".diary-item");
  //console.log(redirectToDiaries)
  redirectToDiaries.forEach((redirectToDiary) => {
    // const parameters = {
    //   date: redirectToDiary.querySelector(".diary-date").textContent,
    //   label: redirectToDiary.querySelector(".diary-label").textContent,
    //   feeling: redirectToDiary.querySelector(".diary-feeling").textContent,
    //   content:  redirectToDiary.querySelector(".diary-content").textContent,
    // }
    const date = redirectToDiary.querySelector(".diary-date").textContent
    const label = redirectToDiary.querySelector(".diary-label").textContent
    const feeling = redirectToDiary.querySelector(".diary-feeling").textContent
    const content = redirectToDiary.querySelector(".diary-content").textContent
    redirectToDiary.addEventListener("dblclick", function () {
    var url = "diary.html?date=" + encodeURIComponent(date)
    + "&label=" + encodeURIComponent(label) 
    + "&feeling=" + encodeURIComponent(feeling) 
    + "&content=" + encodeURIComponent(content);
    window.location.href = url;
    });
  })
//   redirectToDiaryButton.addEventListener("dblclick", function () {
//     var url = "diary.html?parameter=" + encodeURIComponent(parameterValue);
//     window.location.href = url;
// });
}

function renderDiary(diary) {
  // console.log(diary)
  const item = createDiaryElement(diary);
  diaryList.appendChild(item);
}

function createDiaryElement(diary) {
  const item = diaryTemplate.content.cloneNode(true);  // copy dom node
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

main();
