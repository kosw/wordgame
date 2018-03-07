  var failCnt = 0;
  var successCnt = 0;
  var speed = 2000;
  var infinite = 1;

  var wordlist = ["banana","coffee","friends","sun","star","apple",
  "meat","strawberry","weather","mike","juice","desktop",
  "piano","guitar","donus","org","game","tokyo","america","christmas",
  "spring","winter","summer","fall","france"];

  function startGame(){
    var rn = randomNumber(wordlist.length);
    var word = wordlist[rn];
    if(infinite === 1){
      insertWords(word);
      moveWords();
      downWords();
      setTimeout(startGame,speed);
    }
    document.getElementById("startButton").disabled = true;
  }
  function stopGame(){
    infinite = 0;
    alert("점수 : "+successCnt+"점 입니다.");
    //location.reload();
  }
  function downWords(){ //단어 아래로 이동하게 하는 함수
    len = document.getElementsByTagName("span").length;
    var next = 0;
    for(var i=1;i<len;i++){
          var curr = document.getElementsByTagName("span")[i].style.paddingTop;
          if(curr === "") {
            next = 0; 
          }else { 
            next = parseInt(curr)+30;
          }
            if(next >= 381){ //height over했을때 삭제
              failCnt++;
              document.getElementsByTagName("span")[i].innerHTML = "";
              document.getElementById("screen").removeChild(document.getElementsByTagName("span")[i]);
              document.getElementById("fail").innerHTML = "실패 : "+failCnt.toString()+" / 20";
            } 

            if(document.getElementsByTagName("span")[i]){ //삭제되지 않은 노드에 한해서 next값 만큼 조정
              document.getElementsByTagName("span")[i].style.paddingTop = next.toString()+"px";
            }
          }
          if(failCnt == 20){
            setTimeout(stopGame,speed);
          }
        }
      function moveWords(){ //단어 좌우로 이동하게 하는 함수
        var len = document.getElementsByTagName("span").length;
        for(var i=1;i<len;i++){
          var left = randomNumber(400).toString() +"px";
          document.getElementsByTagName("span")[i].style.paddingLeft = left;
        }
      }

      function insertWords(words){ //노드 생성하고 #screen에 첫번째 자식으로 삽입
        var pos = document.getElementById("screen");
        var node = createNode(words);
        if(pos.children[0]){ //isChildren
          document.getElementById("screen").insertBefore(node, document.getElementById("screen").children[0]);
        } else{
          document.getElementById("screen").appendChild(node);
        }
      }
      function createNode(words){ //단어를 담을 span 태그 노드 생성
        var node = document.createElement("span");
        node.innerHTML = words;
        return node;
      }
      function randomNumber(p){ //최대 p 보다 작은 난수 생성
        var rn = Math.floor(Math.random()*p);
        return rn;
      }
      function compareWord(){ //screen 상에 뿌려지는 단어들과 비교하고 삭제
        var input = document.getElementById("wordInput").value;
        var len = document.getElementsByTagName("span").length;
        for(var i=len-1; i>=1;i--){
          if(document.getElementsByTagName("span")[i].innerHTML == input){
            funfun();
            successCnt++;
            document.getElementsByTagName("span")[i].innerHTML = "";
            document.getElementById("screen").removeChild(document.getElementsByTagName("span")[i]);
            document.getElementById("success").innerHTML = "성공 : "+successCnt.toString();
            break;
          }
        }
        document.getElementById("wordInput").value = "";
      }
      function funfun(){ //재미 요소
        var rn = randomNumber(100);
        var len = document.getElementsByTagName("span").length;
        console.log(rn);
        if(rn > 45 && rn <= 58){ // 잘 안보이는 컬러
          for(var i=1; i<len; i++){
            if(document.getElementsByTagName("span")[i]){
              document.getElementsByTagName("span")[i].style.color = "yellow";
            }
          }
        }else{ 
          for(var i=1; i<len; i++){ //색상 원래대로
            if(document.getElementsByTagName("span")[i]){
              document.getElementsByTagName("span")[i].style.color = "black";
            }
          }
          if(rn > 23 && rn <= 40){ //속도 2배
            speed = 1000;
            document.getElementById("level").innerHTML = "Level : Normal"
          } 
          else if(rn >= 10 && rn < 20){ //속도 4배
            speed = 500;
            document.getElementById("level").innerHTML = "Level : Hard"
          }
          else if(rn == 71 || rn == 72){ //커피 쿠폰
            document.getElementById("cc").src = "coffee.png";
          }
        }
      }