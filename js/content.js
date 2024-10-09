const url = window.location.search.split("=").at(-1)
console.log(url);


fetch(`https://6704e06b031fd46a830dbb27.mockapi.io/oxuaz/${url}`)
    .then(res => res.json())
    .then(data => {
        showCard(data)

    })

const content = document.getElementById('content')

function showCard(item) {
    const content = document.getElementById('content');
    if (content) {
        content.innerHTML = `
           <div rel="noopener noreferrer"
                  aria-label="Te nulla oportere reprimique his dolorum">
                  <img  src="${item.img}" class="object-cover w-full h-full alt="img">
              </div>
              <div class="flex px-5 flex-col flex-1 py-6">
                 <div class="flex justify-between">
                    <div class="text-[#051d39] font-semibold">
                    <a href="">Ana sehife /  </a>
                    <a href="">Siyaset</a>
                    </div>
                     <div
                      class="item-meta h-[24px] text-[12px] lg:text-[16px]  tracking-[.96px] text-[#777777] mb-[20px] uppercase flex items-center">
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
                 </div>
                  <h3 class="flex-1 py-2 text-lg text-[#051d39] font-semibold leading-snug">${item.title}</h3>
                  <div
                      class="flex flex-wrap pt-3 space-x-2 text-xs lg:text-[16px] dark:text-gray-600">
                      <div>
                          <button class="mr-2">
                              <i class="fa-regular fa-thumbs-up"></i>
                              <span>81</span>
                          </button>
                          <button>
                              <i class="fa-regular fa-thumbs-down"></i>
                              <span>20</span>
                          </button>
                      </div>
                  </div>

                  <div class="mt-[20px]">
                    <p>${item.description}</p>
                  </div>

                 </div> 
        `;
    }
}