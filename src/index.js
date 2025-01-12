
import { instructionSet } from "./instructionSet.js";

const RESULT = Object.freeze({
  I_OK: 0,
  I_NG: 1,
  I_END: 2,
  I_ERR: -1
})

/**
 * StringCell クラスは、かな文字と対応するローマ字を管理します。
 * 各セルは入力する文字の特性や入力済みのローマ字を保持します。
 * 
 * Typeの文字特性は /src/instructionSet.js のコメントを参照
 */
class StringCell {
  constructor(kana,romaji,type) {
    this.Fixation = false //現在のローマ字以外の入力を許さないフラグ
    this.Kana = kana //かな文字
    this.Romaji = romaji //ローマ字
    this.Type = type //タイプ情報
    this.EnteredRomaji = "" //入力済みのローマ字
  }
  setFixationRomaji(romaji) { 
    this.Fixation = true
    this.Romaji = romaji
  }
  setKana(kana){
    this.Kana = structuredClone(kana)
  }
  setRomaji(romajiList){
    let uniqueArray = romajiList.filter((item, index) => romajiList.indexOf(item) === index);//重複をまず除去
    this.Romaji = structuredClone(uniqueArray)
  }
  setType(type){
    this.Type = structuredClone(type)
  }
  setEnteredRomaji(enteredRomaji){
    this.EnteredRomaji = enteredRomaji
  }
  deleteRomaji(romajiList){
    let filteredList = this.Romaji.filter(item => {
      return romajiList.some(char => !item.indexOf(char));
    });
    this.Romaji = filteredList
  }
  bringToFrontRomaji(romaji){
    let filtered = this.Romaji.filter(word => !word.indexOf(romaji))
    let rest = this.Romaji.filter(word => word.indexOf(romaji))
    this.Romaji = filtered.concat(rest)
  }
}

/**
 * StringContainer クラスは、StringCellのリストを管理します。
 * またStringCellを操作するためのメソッドを提供します。
 */
class StringContainer {
  constructor(){
    this.StringCellList = []
    this.CurrentlyCellNum = 0 //今どのセルを入力中か
    this.CurrentlyRomajiNum = 0 //セルの中の何番目のローマ字を入力中か
    this.EnteredCellRomaji = "" //セルの中で入力済みの文字
    this.EnteredRomaji = "" //すべての入力済みの文字
  }
  addStringCell(stringCell){
    this.StringCellList.push(stringCell)
  }
  isStringCellListEnd(){ //最後のセルを過ぎたかどうかをチェックする
    if(this.CurrentlyCellNum +1 > this.StringCellList.length){
      return true
    }
    return false
  }
  getStringCells_Romaji(){
    return this.StringCellList.map( (e) => {
      return e.Romaji[0]
    })
  }
  getInputRomajiString(){
    let output = ""
    let i = 0
    //すでに入力済みのセルを取得
    for(i=0 ; i < this.CurrentlyCellNum ; i++){
      output += this.StringCellList[i].EnteredRomaji
    }
    //未入力のセルを取得
    for(; i < this.StringCellList.length ; i++){
      output += this.StringCellList[i].Romaji[0]
    }
    return output
  }
  getStringCells_EnteredRomaji(){
    return this.StringCellList.map( (e) => {
      return e.EnteredRomaji
    })
  }
  getStringCells_EnteredKana(){
    let output = []
    //すでに入力済みのセルを取得
    for(let i=0 ; i < this.CurrentlyCellNum ; i++){
      output.push(this.StringCellList[i].Kana)
    }
    return output
  }
  getStringCells_Kana(){
    return this.StringCellList.map( (e) => {
      return e.Kana
    })
  }
  setCurrentlyStringCell_Romaji(romajiList){
    this.StringCellList[this.CurrentlyCellNum].Romaji = structuredClone(romajiList)
  }
  getCurrentlyStringCell(){
    if(this.isStringCellListEnd()){
      return null
    }
    return this.StringCellList[this.CurrentlyCellNum]
  }
  getCurrentlyStringCell_Romaji(){
    let cell = this.getCurrentlyStringCell()
    if(this.CurrentlyRomajiNum > cell.Romaji.length){
      return null
    }
    let tmp = cell.Romaji.substring(this.CurrentlyRomajiNum,this.CurrentlyRomajiNum + 1)
    return tmp
  }
  getNextStringCell(){
    if(this.CurrentlyCellNum +1 > this.StringCellList.length){
      return null
    }
    return this.StringCellList[this.CurrentlyCellNum + 1]
  }
  overwriteCurrentlyStringCell(kana,romaji,type,entered){
    this.StringCellList[this.CurrentlyCellNum] = new StringCell(kana,romaji,type)
    this.StringCellList[this.CurrentlyCellNum].EnteredRomaji = entered
  }
  overwriteNextStringCell(num,kana,romaji,type,entered){
    this.StringCellList[this.CurrentlyCellNum+num] = new StringCell(kana,romaji,type)
    this.StringCellList[this.CurrentlyCellNum+num].EnteredRomaji = entered
  }
  insertStringCell(kana,romaji,type){
    this.StringCellList.splice(this.CurrentlyCellNum+1,0,new StringCell(kana,romaji,type))
  }
  insertNextStringCell(num,kana,romaji,type){
    this.StringCellList.splice(this.CurrentlyCellNum+num,0,new StringCell(kana,romaji,type))
  }
  proceedNextStringCell(){
    this.CurrentlyRomajiNum = 0
    this.CurrentlyCellNum += 1
    this.EnteredCellRomaji = ""
  }

}

/**
 * Firis クラスはタイピングのメイン処理を行うクラスです。
 */
class Firis {
  constructor(){
    this.InstructionMaster = []
    this.StringContainerList = []
    this.#readInstructions() //インストラクションを読み込む
  }
  /**
   * かなとローマ字の変換パターンを読み込み、リストを作成
   */
  #readInstructions(){
    //リストをハッシュ化する {kana: ,type: ,romaji:[]}
    this.InstructionMaster = instructionSet.map((inst) => {
      //romajiリストを作成
      let tmpRomaji = []
      for(let i=2;i<inst.length;++i){
        tmpRomaji.push(inst[i])
      }
      //typeをビットから連想配列に変換
      let tmpType = parseInt(inst[1],10)
      let setType = {t1:false,t2:false,t3:false,t4:false,t5:false,t6:false}

      //各ビットを抽出 typeの意味は /src/instructionSet.js のコメントを参照
      if ((tmpType & 0b000001) != 0){ //1bit
        setType.t1 = true
      }
      if ((tmpType & 0b000010) != 0){ //2bit
        setType.t2 = true
      }
      if ((tmpType & 0b000100) != 0){ //3bit
        setType.t3 = true
      }
      if ((tmpType & 0b001000) != 0){ //4bit
        setType.t4 = true
      }
      if ((tmpType & 0b010000) != 0){ //5bit
        setType.t5 = true
      }
      if ((tmpType & 0b100000) != 0){ //6bit
        setType.t6 = true
      }

      return {Kana: inst[0],Type: setType,Romaji: tmpRomaji}
    })
  }
  /**
   * 文字に対応するハッシュを返却する
   * @param {*} searchStr 
   * @returns 
   */
  #searchInstruction(searchStr){
    let result = this.InstructionMaster.find((instruction) => instruction.Kana === searchStr)
    return result
  }
  /**
   * str2のリストの中にstr1のリストの１文字目が含まれているかチェック
   * @param {*} str1 
   * @param {*} str2 
   * @returns 
   */
  #searchStrInStr(str1 , str2){
    let ret = false
    str2.forEach( e1 => {
      str1.forEach( e2 => {
        if (e1.includes(e2.substring(0,1))){
          ret = true
        }
      })
    })
    return ret
  }
  /**
   * 文字コンテナを作成
   * すでに作成済みの場合は初期化して再作成
   * @param {*} inputStr 
   * @returns true:成功 false:失敗
   */
  createStringContainer(inputStr){

    //初期化 配列を空にする
    this.StringContainerList = []

    let inputStrList = inputStr.split("")
    let stringContainer = new StringContainer()

    for (let index=0 ; index < inputStrList.length ; ++index){
      let str = inputStrList[index]
      let instruction = this.#searchInstruction(str)
      
      if(instruction == undefined){ //見つからなかった場合
        console.error("指定された文字列に対応するローマ字が見つかりませんでした。")
        return false
      }

      let stringCell = new StringCell(instruction.Kana,instruction.Romaji,instruction.Type)
      
      //特殊パターンをチェック
      if(index !== inputStrList.length){ //末尾でない場合

        if(instruction.Type.t1){ //後ろに小さい文字がつく可能性をチェック
          let mergeStr =  instruction.Kana + inputStrList[index+1] //次の字と今の文字を結合

          //再探索
          const mergeResult = this.#searchInstruction(mergeStr)
          if(mergeResult != undefined){ //結合文字が見つかった

            instruction = mergeResult //結果を上書き
            stringCell.setKana(instruction.Kana)
            stringCell.setRomaji(instruction.Romaji)
            
            index++ //２文字処理したのですすめる
          }     

        } else if (instruction.Type.t3){ //小さい「っ」チェック
          
          const instructionSmall_tsu = this.#searchInstruction("っ")
          const baseSmall_tsu = instructionSmall_tsu.Romaji

          if(index+1 !== inputStrList.length){ //末尾でない場合

            //次の文字を読み込み
            let nextStr = inputStrList[index+1]
            const nextInstruction = this.#searchInstruction(nextStr)

            if(nextInstruction.Type.t3){ //次の文字がまた「っ」だった場合
              // xtuで確定 なんもしない
            }
            else if(nextInstruction.Type.t1){ //次の文字が後ろに小さい文字がつく文字の場合

              if (index+2 !== inputStrList.length){ //2文字先が末尾でない場合
                //次の次の文字を読み込み
                let nextnextStr = inputStrList[index+2]
                
                if(nextInstruction.Type.t1){ //次の文字について後ろに小さい文字がつく可能性をチェック
                  let mergeStr =  nextInstruction.Kana + nextnextStr //次の次の字と次の文字を結合
                  const mergeResult2 = this.#searchInstruction(mergeStr)   
                  if(mergeResult2 != undefined){ //結合文字が見つかった

                    let add = mergeResult2.Romaji.map(w => w.substring(0,1))
                    stringCell.setRomaji(add.concat(baseSmall_tsu))

                  }else { //見つからなかったので１文字目の頭文字で作成

                    if(!nextInstruction.Type.t4 && !nextInstruction.Type.t5){
                      //次の文字が連打禁止または記号でない場合
                      let add = nextInstruction.Romaji.map(w => w.substring(0,1))
                      stringCell.setRomaji(add.concat(baseSmall_tsu))
                    }
                  }
                }       

              }else{ 
                if(!nextInstruction.Type.t4 && !nextInstruction.Type.t5){
                  //次の文字が連打禁止または記号でない場合
                  let add = nextInstruction.Romaji.map(w => w.substring(0,1))
                  stringCell.setRomaji(add.concat(baseSmall_tsu))
                }
              }
            }
            else if(!nextInstruction.Type.t4 && !nextInstruction.Type.t5){
              //次の文字が連打禁止または記号でない場合
              let add = nextInstruction.Romaji.map(w => w.substring(0,1))
              stringCell.setRomaji(add.concat(baseSmall_tsu))
            }
          }
        }
      }
      stringContainer.addStringCell(stringCell)
    }
    this.StringContainerList.push(stringContainer)

    return true
  }
  /**
   * タイピングのメイン処理関数
   * @param {*} input 
   * @param {*} stringContainer 
   * @returns 
   */
  #processTyping(input,stringContainer){
    
    if (stringContainer.isStringCellListEnd()){ //すでに末尾
      return RESULT.I_END
    }

    let result = RESULT.I_NG

    while(true){
      
      //入力済み文字を組み立てて前方一致で検索
      let check = stringContainer.EnteredCellRomaji + input      
      let stringCell = stringContainer.getCurrentlyStringCell()
      let first_match = stringCell.Romaji.filter( e => !e.indexOf(check))

      if(first_match.length > 0){ //結果がいずれかの入力に一致した

        result = RESULT.I_OK

        //マッチしなかったローマ字はStringCellから削除する
        stringCell.deleteRomaji(first_match)

        stringContainer.EnteredCellRomaji += input     
        stringContainer.EnteredRomaji += input
        stringCell.setEnteredRomaji(stringContainer.EnteredCellRomaji)

        if(stringCell.Type.t3){ //小さい「っ」のセルだった場合は次を固定
          
          let nextStringCell = stringContainer.getNextStringCell()

          //次の文字の頭と入力した文字が一致しているかチェック
          let fixationRomaji = nextStringCell.Romaji.filter( e => !e.indexOf(check))

          //「x」or「l」入力 かつ 次が小さい文字でない場合に次の文字を固定化
          if (fixationRomaji.length > 0){

            //気を利かせる
            if(nextStringCell.Type.t2){
              nextStringCell.bringToFrontRomaji(fixationRomaji)  
            }
            if(!nextStringCell.Type.t2 && !nextStringCell.Type.t3
              && !nextStringCell.Type.t4 && !nextStringCell.Type.t5
            ){
              nextStringCell.setFixationRomaji(fixationRomaji)   
            }
          }
        }
        if(first_match.length == 1 
          && first_match[0].length == stringContainer.EnteredCellRomaji.length){
          stringContainer.proceedNextStringCell() //次のセルへ
        }

      }else{ //通常の入力パターンでは見つからなかった

        //「しゃ」とかの２文字構成だった場合
        if(stringCell.Type.t1){

          //最初の１文字（「しゃ」の場合は「し」）を切り取って１文字で一致するかチェック
          let word = stringCell.Kana.substring(0,1)
          const firstCharInstruction = this.#searchInstruction(word)
          let second_match = firstCharInstruction.Romaji.filter( e => !e.indexOf(check))

          if(second_match.length > 0 ){ //他のパターンが見つかった

            if(stringCell.Fixation 
              && !this.#searchStrInStr(stringCell.Romaji,second_match)){ 
                //入力文字制限のため入力NG「っちゃ」などで起きる
            } else {
              
              result = RESULT.I_OK

              //今のinstructionを上書き
              stringContainer.overwriteCurrentlyStringCell(firstCharInstruction.Kana,firstCharInstruction.Romaji,firstCharInstruction.Type,check)

              //マッチしなかったローマ字はStringCellから削除する
              stringContainer.getCurrentlyStringCell().deleteRomaji([check])

              //次の位置にinstructionを追加
              let word2 = stringCell.Kana.substring(1,2) //２文字目を切り取り
              const secondCharInstruction = this.#searchInstruction(word2)

              stringContainer.insertStringCell(secondCharInstruction.Kana,secondCharInstruction.Romaji,secondCharInstruction.Type,)

              //入力済み文字そセット
              stringContainer.EnteredCellRomaji += input     
              stringContainer.EnteredRomaji += input
              stringCell.setEnteredRomaji(stringContainer.EnteredCellRomaji)

              if(second_match.length == 1 
                && second_match[0].length == stringContainer.EnteredCellRomaji.length){
        
                stringContainer.proceedNextStringCell() //次のセルへ
        
              }
            }

          } 

        } else if (stringCell.Type.t3) { //小さな「っ」処理

          //次のセルを取得
          let nextStringCell = stringContainer.getNextStringCell()
          if (nextStringCell != null 
            && !nextStringCell.Type.t4 && !nextStringCell.Type.t5 && !nextStringCell.Type.t6){ //次のセルがあるとき

            //次のセルの頭と一致するか検索
            let xtu_match = nextStringCell.Romaji.filter( e => !e.indexOf(check))
            
            if(xtu_match.length > 0){ //次の文字の別パターンで「っ」を打った

              result = RESULT.I_OK

              //ローマ字を上書き
              stringCell.setRomaji([check])

              //入力済み文字そセット
              stringContainer.EnteredCellRomaji += input     
              stringContainer.EnteredRomaji += input
              stringCell.setEnteredRomaji(stringContainer.EnteredCellRomaji)

              //次のセルを固定化
              nextStringCell.setFixationRomaji(xtu_match)

              stringContainer.proceedNextStringCell() //次のセルへ

            } else if (nextStringCell.Type.t2){
              //次のセルが小さな文字の場合は「xx」と入力された場合に次セルへ飛ぶ
              if(check === "xx" || check === "ll"){
                
                //現在のセルにxかlをつめる
                stringContainer.setCurrentlyStringCell_Romaji([check.substring(0,1)])

                stringContainer.proceedNextStringCell() //次のセルへ
                input = check.charAt(check.length - 1) //最後の１文字を取得

                continue //もう一度処理を走らせる
              }

            } else if (nextStringCell.Type.t1){

              // っふぁ のパターンで、hhuxa で打てるようにするための処理
              // 次の文字の１文字目を切り取って一致しているかをチェック
              let word = nextStringCell.Kana.substring(0,1)
              const firstCharInstruction = this.#searchInstruction(word)
              let match = firstCharInstruction.Romaji.filter( e => !e.indexOf(check))

              if(match.length > 0 ){ 

                // ローマ字を上書き
                stringCell.setRomaji([check])

                //つぎのセルを「ふ」と「ぁ」に分けて、「ふ」は固定化する
                stringContainer.overwriteNextStringCell(1,firstCharInstruction.Kana,match,firstCharInstruction.Type,"")

                word = nextStringCell.Kana.substring(1,2) //「ぁ」を取得
                const secondCharInstruction = this.#searchInstruction(word)
                
                //「ぁ」を次の次のセルに挿入
                stringContainer.insertNextStringCell(2,secondCharInstruction.Kana,secondCharInstruction.Romaji,secondCharInstruction.Type,"")

                continue

              }

            }

          }
          
        } else if (stringCell.Type.t6) { //「ん」をn一つで打ち終えたい場合

          if(!check.indexOf("n")){ //nで始まる入力をしている
            
            //次のセルを取得
            let nextStringCell = stringContainer.getNextStringCell()
            if (nextStringCell != null){ //次のセルがあるとき
              
              if (!nextStringCell.Type.t4 && !nextStringCell.Type.t5 && !nextStringCell.Type.t6 ){ 

                let tail = check.charAt(check.length - 1) //最後の１文字を取得

                //次の文字の頭と一致しているかチェック
                let headCheck = nextStringCell.Romaji.filter( e => !e.indexOf(tail))

                if(headCheck.length > 0){ //次の文字の頭と一致している

                  //現在のセルにnをつめる
                  stringContainer.setCurrentlyStringCell_Romaji(["n"])

                  input = tail
                  stringContainer.proceedNextStringCell() //次のセルへ

                  continue //もう一度処理を走らせる
                }
              }
            }
          }
        }
      }

      break
    }

    //末尾まで入力した
    if (stringContainer.isStringCellListEnd()){
      result = RESULT.I_END
    }
    return result

  }

  /**
   * 文字コンテナが存在するかどうかを返却
   * @returns 
   */
  isAvailable(){
    if (this.StringContainerList.length > 0) return true
    return false
  }

  /**
   * 文字コンテナからローマ字の文字リストを取得
   * @returns 文字リスト　例：["a", "i", "u", "e", "o"]
   */
  getRomaji(){
    if (!this.isAvailable()) return ""
    return this.StringContainerList[0].getStringCells_Romaji()
  }

  /**
   * 文字コンテナからかな文字取得
   * @returns 文字リスト　例：["あ", "い", "う", "え", "お"]
   */
  getKana(){
    if (!this.isAvailable()) return ""
    return this.StringContainerList[0].getStringCells_Kana()
  }

  /**
   * 文字コンテナから入力済みのローマ字を取得
   * @returns 文字リスト　例：["a", "i", "u"]
   */
  getEnteredRomaji() {
    if (!this.isAvailable()) return ""
    let array = this.StringContainerList[0].getStringCells_EnteredRomaji() 
    // そのままだと空要素が入り、「x,,」のようになるので空要素を削除
    let filteredArray = array.filter(item => item !== '' && item !== null && item !== undefined)
    return filteredArray
  }

  /**
   * 文字コンテナから入力済みのかな文字を取得
   * @returns 文字リスト　例：["あ", "い", "う"]
   */
  getEnteredKana() {
    if (!this.isAvailable()) return ""
    let array = this.StringContainerList[0].getStringCells_EnteredKana() 
    // そのままだと空要素が入り、「x,,」のようになるので空要素を削除
    let filteredArray = array.filter(item => item !== '' && item !== null && item !== undefined)
    return filteredArray
  }

  /**
   * 文字コンテナをクリア
   * @returns 
   */
  clearStringContainer() {
    this.StringContainerList = []
    return true
  }

  /**
   * 入力した英数字を１文字渡してタイピング処理を実行
   * @param {string} input 
   * @returns 0:入力成功 1:入力失敗（タイプミス）2:文章の最後まで入力成功 -1:エラー
   */
  inputKey(input) {
    //2文字以上だったら不正なのでエラー
    if (input.length != 1 ){
      console.error("inputKeyに渡す値は１文字である必要があります")
      return RESULT.I_ERR
    } 
    //StringContainerが空の場合はエラー
    if (!this.isAvailable()){
      console.error("inputKeyを呼び出す前にcreateStringcontainerで入力文字列を設定してください")
      return RESULT.I_ERR
    } 
    
    return this.#processTyping (input,this.StringContainerList[0])
  }

}

export default Firis
