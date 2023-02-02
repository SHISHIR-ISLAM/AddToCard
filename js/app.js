const buttons = document.querySelectorAll('.btn')
const URL = '../data.json'
var allArray = []

// Fetch The Data
fetch(URL)
  .then((res) => res.json())
  .then((data) => {
    renderData(data)
    pagination(data)

    allArray.push(data)
  })
  .catch((error) => console.log(error))

// Pagination Variable
let page = 0
let pageLimit = 6

// GetAllDataToBrowser
function renderData(array) {
  // createANewArrayUsingPagination
  let startIndex = page * pageLimit
  let endIndex = (page + 1) * pageLimit
  let paginationArray = array.slice(startIndex, endIndex)

  // StylingButtonFunction
  stylingButton()

  const pageContent =  paginationArray
    .map((item, idx) => {
      const { image, title, price } = item
      console.log(item)
      return `<div class="card">
        <header class="card-header">
          <img
            src="${image}"
            onclick=renderCard(${idx})
          />
        </header>
        <div class="card-body">
          <h2 class="card-title">${title.slice(0, 15)}</h2>
          <h2 class="card-title">$${price}</h2>
          <p>
            Lorem ipsum dolor sit amet consectetur, adipisicing elit.
            Blanditiis, maxime.
          </p>

        </div>
        <button class="card-btn" onclick=addItem(${idx})><i class="fa-solid fa-bag-shopping card-box fa-2x"></i></button>
      </div>`
    })
    .join('')

    document.querySelector('.main .container').innerHTML = pageContent
}

// pagination button
function pagination(array) {
  buttons[0].style.backgroundColor = "red";
  buttons[0].style.color = '#fff'
  buttons.forEach((btn, index) => {
    btn.addEventListener('click', (e) => {
      page = index
      renderData(array)
      const pageButton = document.querySelector(`.page${index}`)
      pageButton.style.backgroundColor = 'red'
      pageButton.style.color = '#fff'
    })
  })
}

// renderCardShowOverly
function renderCard(idx) {
  const item = allArray[0][idx]
  const { image, title, price, category, description } = item
  const cardInner = document.querySelector('.card-inner-overly')
  cardInner.classList.add('active')

  // InsideTheCardPushTheHtml
  document.querySelector(
    '.card-inner-body'
  ).innerHTML = ` <div class="container">
  <div class="button" onclick=removeCard()><i class="fa-solid fa-chevron-left"></i> Back To All Plans</div>
  <div class="card-inner-body-content">
   <img src="${image}" alt="card-images">
   <div>
     <h1>${title.slice(0, 21)}</h1>
     <p class="lead">${category}</p>

     <h2 class="card-price">$${price}</h2>
   <p class="des">${description}</p>

   <button class="add-to-card" onclick=addItem(${idx})>Add To Card</button>
   </div>
 </div>
</div>`
}

// removeCardByBackButton
function removeCard() {
  const cardInner = document.querySelector('.card-inner-overly')
  cardInner.classList.remove('active')
}

// CardBoxAddButton
const cardBox = document.querySelector('.card-box')
const root = document.querySelector('.root')
const times = document.querySelector('.times')

// AddActive
cardBox.onclick = () => {
  root.classList.add('active')
}
// RemoveActive
times.onclick = () => {
  root.classList.remove('active')
}

// searchProduct using Input
const searchInput = document.querySelector('.search')
searchInput.addEventListener('keyup', searchProduct)

// KeyUpFunction
function searchProduct(e) {
  const filter = e.target.value.toUpperCase()
  const cardTitle = document.querySelectorAll('.card')

  for (let i = 0; i < cardTitle.length; i++) {
    const title = cardTitle[i].querySelector('.card-title').innerHTML
    if (title.toUpperCase().indexOf(filter) > -1) {
      cardTitle[i].style.display = ''
    } else {
      cardTitle[i].style.display = 'none'
    }
  }
}

// AddToCardClickBtn
var card = []

// PushItemInsideCard
function addItem(idx) {
  card.push(allArray[0][idx])
  console.log(displayCard())
}

// DisplayTheCardOnTheSideBar
function displayCard() {
  document.querySelector('.count').innerHTML = card.length
  let total = 0

  // CardArrayMapping
  if (card.length === 0) {
    document.querySelector('.total').innerHTML = 'Total: $' + 0
    document.querySelector('.bag-box').innerHTML =
      '<h1 class="heading">Your Card is empty</h1>'
  } else {
    const r = (document.querySelector('.bag-box').innerHTML = card
      .map((item, idx) => {
        const { image, price } = item
        total += price
        document.querySelector('.total').innerHTML =
          'Total: $' + total.toFixed(1)

        return `
        <div class="card-inner"><img src="${image}">
        <h3 class="price">$${price}</h3>
        <button class="remove" onclick=deleteCardItem(${idx})>
            <i class="fa-solid fa-trash card-remove"></i>
        </button></div>`
      })
      .join(''))
    console.log(card)
  }
}

// deleteItemOnTheCard
function deleteCardItem(index) {
  card.splice(index, 1)
  displayCard()
}

// styleLingAllButton
function stylingButton() {
  buttons.forEach((item) => {
    item.style.backgroundColor = '#fff'
    item.style.color = '#000'
  })
}
