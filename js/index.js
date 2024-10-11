const mobSidebar = document.querySelector(".mobSidebar")
const deskSidebar = document.querySelector(".deskSidebar")

function sidebar() {
  mobSidebar.classList.toggle('hidden')
  deskSidebar.classList.toggle('top-[-100%]')
}
const popup = document.getElementById("popup");

function handlePopup() {
  popup.classList.toggle("!flex");
}

function preventClick(e) {
  e.stopPropagation();
}
const title = document.getElementById('title')
const file = document.getElementById('file')
const view = document.getElementById('view')
const date = document.getElementById('date')
const description = document.getElementById('description')
let XEBER = []


function handleSubmit(event) {
  const titleVal = title.value
  const fileVal = file.value
  const descVal = description.value
  const viewVal = view.value
  const dateVal = date.value
  event.preventDefault()

  if (titleVal.trim().length < 5) return alert('Min 5, max 64 soz olmalidir')
  const obj = {
    "title": titleVal,
    "img": fileVal,
    "view": viewVal,
    "date": dateVal,
    "description": descVal,
  }
  fetch('https://6704e06b031fd46a830dbb27.mockapi.io/oxuaz', {
      method: 'POST',
      body: JSON.stringify(obj),
      headers: {
        'Content-type': 'application/json; charset=UTF-8',
      },
    })
    .then((response) => response.json())
    .then((json) => {
      console.log(json)
      XEBER.length = 0
      getAllData()
      clearForm()
    })
  handlePopup()
}

function getAllData() {
  fetch('https://6704e06b031fd46a830dbb27.mockapi.io/oxuaz')
    .then(res => res.json())
    .then(data => {
      XEBER.push(...data)
      handleTable()
      handleCard()
    })
}
getAllData()

function deleteNews(id) {
  fetch(`https://6704e06b031fd46a830dbb27.mockapi.io/oxuaz/${id}`, {
      method: "DELETE"
    })
    .then(res => res.json())
    .then(data => {
      console.log(data)
      XEBER = XEBER.filter(item => item.id != id)
      handleTable()
    })
}
const elanlar = document.getElementById("elanlar")

function handleTable() {
  if (elanlar) {
    elanlar.innerHTML = ''
    XEBER.map(item => {
      elanlar.innerHTML += `
            <tr>
              <td class="py-2 sm:px-4 border-b text-gray-800">${item.title}</td>
              <td class="py-2 sm:px-4 border-b">
                <img src="${item.img}" alt="Image" class="w-16 h-16 object-cover">
              </td>
              <td class="py-2 sm:px-4 border-b text-gray-800">${item.view}</td>
              <td class="py-2 sm:px-4 border-b text-gray-800">${item.date}</td>
              <td class="py-2 sm:px-4 border-b text-gray-800">${item.description}</td>
              <td class="py-2 sm:px-4 border-b text-gray-800">
                <i class="text-red-600 fa-solid fa-trash font-bold" onclick="deleteNews(${item.id})"></i>
              </td>
              <td class="py-2 sm:px-4 border-b text-gray-800">
                <i class="text-black fa-solid fa-edit font-bold" onclick="editNews(${item.id})"></i>
              </td>
            </tr>
    `
    })
  }
}

const cards = document.getElementById('cards')

function handleCard() {
  if (cards) {
    cards.innerHTML = ''
    XEBER.map(item => {
      cards.innerHTML += `
      <article class="card flex flex-col dark:bg-gray-50 rounded-md overflow-hidden">
              <a rel="noopener noreferrer" href="pages/content.htm?id=${item.id}"
                  aria-label="Te nulla oportere reprimique his dolorum">
                  <img  src="${item.img}" class="object-cover w-full h-52 dark:bg-gray-500" alt="img">
              </a>
              <div class="flex flex-col flex-1 p-6">
                  <div
                      class="item-meta h-[24px] text-[12px] tracking-[.96px] text-[#777777] mb-[20px] uppercase flex items-center">
                      <div class="item-left flex ">
                          <span class="flex items-center mr-[14px]">
                              <i class="fa fa-calendar mr-[5px]" aria-hidden="true"></i>
                              07 OKT, 2024 / 00:00
                          </span>
                          <span>
                              <i class="fa fa-eye" aria-hidden="true"></i>
                              <span>${item.view}</span>
                          </span>
                      </div>
                      <div class="item-right"></div>
                  </div>
                  <h3 class="flex-1 py-2 text-lg font-semibold leading-snug">${item.title}</h3>
                  <div
                      class="flex flex-wrap justify-between pt-3 space-x-2 text-xs dark:text-gray-600">
                      <a class="mr-[14px] font-bold uppercase text-[#1894a0]" href="/">Dunya</a>
                      <div>
                          <button class="mr-2">
                              <i class="fa-regular fa-thumbs-up"></i>
                              <span>1</span>
                          </button>
                          <button>
                              <i class="fa-regular fa-thumbs-down"></i>
                              <span>2</span>
                          </button>
                      </div>
                  </div>
              </div>
        </article>
      
      `
    })
  }
}

const form = document.getElementById("form")

function editNews(id) {
  const {
    title: ad,
    img,
    description: desc,
    view: baxis,
    date: tarix
  } = XEBER.find(item => item.id == id)

  handlePopup()
  title.value = ad
  file.value = img
  description.value = desc
  view.value = baxis
  date.value = tarix

  form.onsubmit = (event) => {
    event.preventDefault()
    editEle(id)
    form.onsubmit = handleSubmit
  }
}

function editEle(id) {
  const titleVal = title.value
  const fileVal = file.value
  const descVal = description.value
  const viewVal = view.value
  const dateVal = date.value
  const obj = {
    "title": titleVal,
    "img": fileVal,
    "view": +viewVal,
    "date": dateVal,
    "description": descVal,
  }
  console.log("edit eledm");
  
  fetch(`https://6704e06b031fd46a830dbb27.mockapi.io/oxuaz/${id}`, {
      method: 'PUT',
      body: JSON.stringify(obj),
      headers: {
        'Content-type': 'application/json; charset=UTF-8',
      },
    })
    .then((response) => response.json())
    .then((data) => {
      console.log(data)
      XEBER.length = 0
      getAllData()
      clearForm()
    })
    handlePopup()

}

function clearForm(){
  title.value = '';
  file.value = '';
  description.value = '';
  view.value = '';
  date.value = '';
}