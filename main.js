let randomNum
let userInput = document.querySelector('.form-control')
let playButton = document.querySelector('.play-button')
let result = document.querySelector('.message')
let chance = 5
let chanceViewer = document.querySelector('.chance')
let history = []
let resetButton = document.querySelector('.reset-button')
let overlay = document.querySelector('.overlay')
let endButton = document.querySelector('.end-button')

playButton.addEventListener('click', play)
userInput.addEventListener('focus', function(){
  userInput.value = ''
})
resetButton.addEventListener('click', reset)
result.addEventListener('transitionend', sizeDown)
endButton.addEventListener('click', function(){
  window.location.reload()
})
userInput.addEventListener('keypress', function(e){
  if(e.key === 'Enter'){
    play()
  }
})


function makeRandomNum(){
  randomNum = Math.floor(Math.random() * 50) + 1
  console.log(randomNum);
}
makeRandomNum()

function play(){
  let userNum = userInput.value 

  sizeUp()
  
  if(userNum > 50 || userNum < 1){
    result.textContent = '올바른 숫자를 입력하세요'
    return
  }
  if(history.includes(userNum)){
    result.textContent = '이미 입력한 숫자입니다.'
    return
  }

  if(userNum < randomNum){
    result.textContent = 'UP!'
  }else if(userNum > randomNum){
    result.textContent = 'DOWN!'
  }else{
    result.textContent = '정답!'
    overlay.classList.add('is-success')
    endButton.classList.add('is-active')
    end()
  }

  chance --
  chanceViewer.textContent = `남은기회 : ${chance}`
  if(chance == 0){
    chanceViewer.textContent = '기회를 모두 소진했습니다.'
    overlay.classList.add('is-fail')
    endButton.classList.add('is-active')
    end()
  }

  history.push(userNum)

  if(userNum == randomNum || chance < 1){
    playButton.disabled = true
  }

  userInput.value = ''
}

function reset(){
  userInput.value = ''
  result.textContent = ''
  chance = 5
  playButton.disabled = false
  chanceViewer.textContent = `남은기회 : ${chance}`
  overlay.classList.remove('is-success', 'is-fail')
  endButton.classList.remove('is-active')
  makeRandomNum()
}

function sizeUp(){
  result.classList.add('is-active')
}

function sizeDown(){
  result.classList.remove('is-active')
}

function end(){
  userInput.addEventListener("keyup", e => { e.target.blur(); });
}