const mobSidebar = document.querySelector(".mobSidebar")
const deskSidebar = document.querySelector(".deskSidebar")

function sidebar() {
  mobSidebar.classList.toggle('hidden')
  deskSidebar.classList.toggle('top-[-100%]')
}

const title = document.getElementById('title')
const file = document.getElementById('file')
const view = document.getElementById('view')
const description = document.getElementById('description')

function handleSubmit(event) {
  const titleVal = title.value
  const fileVal = file.value
  const viewVal = view.value
  const descVal = description.value
  event.preventDefault()

  if (titleVal.trim().length < 5) return alert('Min 5, max 64 soz olmalidir')
  const obj = {
    "title": titleVal,
    "img": fileVal,
    "view": viewVal,
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
    .then((json) => console.log(json));
  getAllData()
}
let XEBER = []

function getAllData() {
  fetch('https://6704e06b031fd46a830dbb27.mockapi.io/oxuaz')
    .then(res => res.json())
    .then(data => {
      XEBER.push(...data)
      show()
      handleCard()
    })
}
getAllData()

function deleteElan(id) {
  fetch(`https://6704e06b031fd46a830dbb27.mockapi.io/oxuaz/${id}`, {
      method: "DELETE"
    })
    .then(res => res.json())
    .then(data => console.log(data))

  XEBER = XEBER.filter(item => item.id != id)
  show()

}
const elanlar = document.getElementById("elanlar")

function show() {
  if (elanlar) {
    elanlar.innerHTML = ''
    XEBER.map(item => {
      elanlar.innerHTML += `
            <tr>
              <td class="py-2 sm:px-4 border-b text-gray-800">${item.title}</td>
              <td class="py-2 sm:px-4 border-b">
                <img src="${item.img}" alt="Image" class="w-16 h-16 object-cover">
              </td>
              <td class="py-2 sm:px-4 border-b text-gray-800">250</td>
              <td class="py-2 sm:px-4 border-b text-gray-800">${item.description}</td>
              <td class="py-2 sm:px-4 border-b text-gray-800">
                <button class="text-red-600 font-bold" onclick="deleteElan(${item.id})">X</button>
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