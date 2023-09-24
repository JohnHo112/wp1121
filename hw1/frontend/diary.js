const instance = axios.create({
    baseURL: "http://localhost:8000/api",
});

var mode = true  // false is edit mode, true is view mode

// get the parameters from home page
const id = getParameterByName("id")
const date = getParameterByName("date")
const label = getParameterByName("label")
const feeling = getParameterByName("feeling")
const content = getParameterByName("content")

// edit mode buttons
const editButton = document.querySelector("#edit-button")
const saveButton = document.querySelector("#save-button")
const cancelButton = document.querySelector("#cancel-button")

// all inputs
const container = document.querySelector(".diary-contaioner")
const dateNode = container.querySelector(".diary-date")
const labelNode = container.querySelector(".diary-label")
const feelingNode = container.querySelector(".diary-feeling")
const contentNode = document.querySelector(".diary-content")

async function main() {
    await enterPage()
    setupEventListener()
}

function setupEventListener(){
    editButton.addEventListener("click", () => {
        mode = false
        changeMode(mode)
    })
    saveButton.addEventListener("click", () => {
        mode = true
        saveDiary()
        changeMode(mode)
    })
    cancelButton.addEventListener("click", () => {
        mode = true
        cancelSave()
        changeMode(mode)
    })
}

function changeMode(mode){
    editButton.disabled = !mode
    dateNode.disabled = mode
    labelNode.disabled = mode
    feelingNode.disabled = mode
    contentNode.disabled = mode
    saveButton.disabled = mode
    cancelButton.disabled = mode
}

function saveDiary(){
    const data = getInputData()
    console.log(data)
    console.log(id)
    if (id === null){
        createDiary(data)
        console.log("create new diary")
    } else {
        updateTodoStatus(id, data)
        console.log("update diary")
    }
}

async function createDiary(data) {
    const response = await instance.post("/diaries", data);
    return response.data;
  }
  
async function updateTodoStatus(id, data) {
const response = await instance.put(`/diaries/${id}`, data);
return response.data;
}

function cancelSave(){
    dateNode.value = date
    labelNode.value = label
    feelingNode.value = feeling
    contentNode.value = content
    console.log("cancel saving")
}

function getInputData(){
    const date = dateNode.value
    const label = labelNode.value
    const feeling = feelingNode.value
    const content = contentNode.value

    const data = {
            "date": date,
            "label": label,
            "feeling": feeling,
            "content": content,
        }
    return data
}

function getParameterByName(name) {
    var url = new URL(window.location.href);
    return url.searchParams.get(name);
}

function enterPage(){
    if (date === null && label === null && feeling === null && content === null && id === null) {
        mode = false
    } else {
        mode = true
    }
    renderTheDiary(date, label, feeling, content, mode)
}

function renderTheDiary(date, label, feeling, content, mode){
    container.id = id
    dateNode.value = date
    labelNode.value = label
    feelingNode.value = feeling
    contentNode.value = content
    changeMode(mode)
}  

main()