// random number 생성
// 유저가 번호를 입력 → 시작 버튼 누름
// 유저가 랜덤번호를 맞추면 '맞췄습니다!'
// 랜덤번호 < 유저번호 Down!
// 랜덤번호 > 유저번호 Up!
// Reset버튼 누르면 게임 리셋
// 5번 기회를 다쓰면 게임 종료(버튼 비활성화)
// 유저입력 번호는 1~100, 범위 밖 숫자 입력 시 알림메세지, 기회 유지
// 이미 입력한 숫자 재 입력 시 알림메세지, 기회 유지

let randomNum = 0
let button = document.querySelector('.button')
let userInput = document.querySelector('.input')
let result = document.querySelector('.print')
let resetButton = document.querySelector('.reset')
let chance = 5
let gameover = false
let chanceViewer = document.querySelector('.chance')
let history = []

button.addEventListener('click', play)
resetButton.addEventListener('click', reset)
userInput.addEventListener('focus', function(){
  userInput.value = ''
})
chanceViewer.innerHTML = '남은기회 : ' + chance + '회'

function makeRandomNum(){
  randomNum = Math.floor(Math.random() * 100) + 1
  console.log('정답',randomNum)
}

function play(){
  let userNum = userInput.value

  if(userNum>100 || userNum<1){
    result.textContent = '1~100 사이의 숫자를 입력하세요'  // 유효성 검사
    return
  }

  if(history.includes(userNum)){
    result.textContent = '이미 입력한 숫자입니다.'  // 유효성 검사
    return
  }

  chance --
  chanceViewer.textContent = '남은기회 : ' + chance + '회'

  if(chance == 0){
    chanceViewer.textContent = '기회를 모두 소진했습니다.'
  }


  if(userNum < randomNum){
    result.textContent = 'Up!' // textContent:기존 문구 변경
  }else if(userNum > randomNum){
    result.textContent = 'Down!'
  } else{
    result.textContent = '정답~'
  }

  history.push(userNum)

  if(userNum == randomNum){
    button.disabled = true
  }
  
  if(chance < 1){
    gameover = true
  }

  if(gameover == true){
    button.disabled = true
  } 
}

function reset(){
  userInput.value = ''
  makeRandomNum()
}

makeRandomNum()