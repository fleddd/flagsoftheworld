const list = document.querySelector('[data-list]')
const sortList = document.querySelectorAll('.header__nav-item')
const search = document.querySelector('[data-search]')
const APIKEY = '3hGxmuwG4fsxoxsvGwjcixmwLWrC7xOYfPY8FYAv'
let listOfItems = [];
 //gets data from api
async function getData(url){
  fetch(url)
    .then(response => response.json())
    .then(data =>{
      renderData(data)
    })
    .catch(err => console.error(err))
}
getData(`https://countryapi.io/api/all?apikey=${APIKEY}`);
//nav bar
sortList.forEach(el => {
  el.addEventListener('click', (e)=> {
    sortList.forEach(el => {
      el.classList.remove('active')
    })
    e.target.classList.add('active')
    const option = e.target.textContent
    filterData(option)
  })
})
// renders data from api
function renderData(allCountry){
    const countryKeys = Object.keys(allCountry)        
    countryKeys.forEach(el => {
      console.log(allCountry[el].subregion);
      const newItem = document.createElement('div')
      newItem.classList.add('list__item')

      const newItemImage = document.createElement('div')
      newItemImage.classList.add('list__item-img')
      const image = document.createElement('img')
      image.src = allCountry[el].name === 'Russia' ? "./dist/img/poop.png" : `${allCountry[el].flag.medium}`
      image.alt = "Image didn't load"
      newItemImage.appendChild(image)

      const newItemName = document.createElement('div')
      newItemName.classList.add('list__item-name')
      newItemName.textContent = allCountry[el].name === 'Russia' ? allCountry[el].name.toLowerCase() : allCountry[el].name

      const newItemRegion = document.createElement('div')
      newItemRegion.classList.add('list__item-region')
      newItemRegion.textContent = allCountry[el].region

      newItem.appendChild(newItemImage)
      newItem.appendChild(newItemName)
      newItem.appendChild(newItemRegion)
      list.appendChild(newItem)
      listOfItems.push(newItem)
  })
}
//filter by regions
function filterData(sortedBy){
  for(const el of listOfItems) el.lastChild.textContent === sortedBy ? el.style.display = '' : el.style.display = 'none'
}
//search input
search.addEventListener('input', (e) =>{
  const searchTerm = e.target.value.toLowerCase().trim()
  for(const el of listOfItems) el.children[1].textContent.toLowerCase().includes(searchTerm) ? el.style.display = '' : el.style.display = 'none'
})