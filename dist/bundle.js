/*
 * ATTENTION: The "eval" devtool has been used (maybe by default in mode: "development").
 * This devtool is neither made for production nor for readable output files.
 * It uses "eval()" calls to create a separate source file in the browser devtools.
 * If you are trying to read the output file, select a different devtool (https://webpack.js.org/configuration/devtool/)
 * or disable the default devtool with "devtool: false".
 * If you are looking for production-ready output files, see mode: "production" (https://webpack.js.org/configuration/mode/).
 */
/******/ var __webpack_modules__ = ({

/***/ "./src/index.js":
/*!**********************!*\
  !*** ./src/index.js ***!
  \**********************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   \"default\": () => (__WEBPACK_DEFAULT_EXPORT__)\n/* harmony export */ });\n/* harmony import */ var _instructionSet_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./instructionSet.js */ \"./src/instructionSet.js\");\n\r\n\r\n\r\nconst RESULT = Object.freeze({\r\n  I_OK: 0,\r\n  I_NG: 1,\r\n  I_END: 2,\r\n  I_ERR: -1\r\n})\r\n\r\n/**\r\n * StringCell クラスは、かな文字と対応するローマ字を管理します。\r\n * 各セルは入力する文字の特性や入力済みのローマ字を保持します。\r\n * \r\n * Typeの文字特性は /src/instructionSet.js のコメントを参照\r\n */\r\nclass StringCell {\r\n  constructor(kana,romaji,type) {\r\n    this.Fixation = false //現在のローマ字以外の入力を許さないフラグ\r\n    this.Kana = kana //かな文字\r\n    this.Romaji = romaji //ローマ字\r\n    this.Type = type //タイプ情報\r\n    this.EnteredRomaji = \"\" //入力済みのローマ字\r\n  }\r\n  setFixationRomaji(romaji) { \r\n    this.Fixation = true\r\n    this.Romaji = romaji\r\n  }\r\n  setKana(kana){\r\n    this.Kana = structuredClone(kana)\r\n  }\r\n  setRomaji(romajiList){\r\n    let uniqueArray = romajiList.filter((item, index) => romajiList.indexOf(item) === index);//重複をまず除去\r\n    this.Romaji = structuredClone(uniqueArray)\r\n  }\r\n  setType(type){\r\n    this.Type = structuredClone(type)\r\n  }\r\n  setEnteredRomaji(enteredRomaji){\r\n    this.EnteredRomaji = enteredRomaji\r\n  }\r\n  deleteRomaji(romajiList){\r\n    let filteredList = this.Romaji.filter(item => {\r\n      return romajiList.some(char => !item.indexOf(char));\r\n    });\r\n    this.Romaji = filteredList\r\n  }\r\n  bringToFrontRomaji(romaji){\r\n    let filtered = this.Romaji.filter(word => !word.indexOf(romaji))\r\n    let rest = this.Romaji.filter(word => word.indexOf(romaji))\r\n    this.Romaji = filtered.concat(rest)\r\n  }\r\n}\r\n\r\n/**\r\n * StringContainer クラスは、StringCellのリストを管理します。\r\n * またStringCellを操作するためのメソッドを提供します。\r\n */\r\nclass StringContainer {\r\n  constructor(){\r\n    this.StringCellList = []\r\n    this.CurrentlyCellNum = 0 //今どのセルを入力中か\r\n    this.CurrentlyRomajiNum = 0 //セルの中の何番目のローマ字を入力中か\r\n    this.EnteredCellRomaji = \"\" //セルの中で入力済みの文字\r\n    this.EnteredRomaji = \"\" //すべての入力済みの文字\r\n  }\r\n  addStringCell(stringCell){\r\n    this.StringCellList.push(stringCell)\r\n  }\r\n  isStringCellListEnd(){ //最後のセルを過ぎたかどうかをチェックする\r\n    if(this.CurrentlyCellNum +1 > this.StringCellList.length){\r\n      return true\r\n    }\r\n    return false\r\n  }\r\n  getStringCells_Romaji(){\r\n    return this.StringCellList.map( (e) => {\r\n      return e.Romaji[0]\r\n    })\r\n  }\r\n  getInputRomajiString(){\r\n    let output = \"\"\r\n    let i = 0\r\n    //すでに入力済みのセルを取得\r\n    for(i=0 ; i < this.CurrentlyCellNum ; i++){\r\n      output += this.StringCellList[i].EnteredRomaji\r\n    }\r\n    //未入力のセルを取得\r\n    for(; i < this.StringCellList.length ; i++){\r\n      output += this.StringCellList[i].Romaji[0]\r\n    }\r\n    return output\r\n  }\r\n  getStringCells_EnteredRomaji(){\r\n    return this.StringCellList.map( (e) => {\r\n      return e.EnteredRomaji\r\n    })\r\n  }\r\n  getStringCells_EnteredKana(){\r\n    let output = []\r\n    //すでに入力済みのセルを取得\r\n    for(let i=0 ; i < this.CurrentlyCellNum ; i++){\r\n      output.push(this.StringCellList[i].Kana)\r\n    }\r\n    return output\r\n  }\r\n  getStringCells_Kana(){\r\n    return this.StringCellList.map( (e) => {\r\n      return e.Kana\r\n    })\r\n  }\r\n  setCurrentlyStringCell_Romaji(romajiList){\r\n    this.StringCellList[this.CurrentlyCellNum].Romaji = structuredClone(romajiList)\r\n  }\r\n  getCurrentlyStringCell(){\r\n    if(this.isStringCellListEnd()){\r\n      return null\r\n    }\r\n    return this.StringCellList[this.CurrentlyCellNum]\r\n  }\r\n  getCurrentlyStringCell_Romaji(){\r\n    let cell = this.getCurrentlyStringCell()\r\n    if(this.CurrentlyRomajiNum > cell.Romaji.length){\r\n      return null\r\n    }\r\n    let tmp = cell.Romaji.substring(this.CurrentlyRomajiNum,this.CurrentlyRomajiNum + 1)\r\n    return tmp\r\n  }\r\n  getNextStringCell(){\r\n    if(this.CurrentlyCellNum +1 > this.StringCellList.length){\r\n      return null\r\n    }\r\n    return this.StringCellList[this.CurrentlyCellNum + 1]\r\n  }\r\n  overwriteCurrentlyStringCell(kana,romaji,type,entered){\r\n    this.StringCellList[this.CurrentlyCellNum] = new StringCell(kana,romaji,type)\r\n    this.StringCellList[this.CurrentlyCellNum].EnteredRomaji = entered\r\n  }\r\n  overwriteNextStringCell(num,kana,romaji,type,entered){\r\n    this.StringCellList[this.CurrentlyCellNum+num] = new StringCell(kana,romaji,type)\r\n    this.StringCellList[this.CurrentlyCellNum+num].EnteredRomaji = entered\r\n  }\r\n  insertStringCell(kana,romaji,type){\r\n    this.StringCellList.splice(this.CurrentlyCellNum+1,0,new StringCell(kana,romaji,type))\r\n  }\r\n  insertNextStringCell(num,kana,romaji,type){\r\n    this.StringCellList.splice(this.CurrentlyCellNum+num,0,new StringCell(kana,romaji,type))\r\n  }\r\n  proceedNextStringCell(){\r\n    this.CurrentlyRomajiNum = 0\r\n    this.CurrentlyCellNum += 1\r\n    this.EnteredCellRomaji = \"\"\r\n  }\r\n\r\n}\r\n\r\n/**\r\n * Firis クラスはタイピングのメイン処理を行うクラスです。\r\n */\r\nclass Firis {\r\n  constructor(){\r\n    this.InstructionMaster = []\r\n    this.StringContainerList = []\r\n    this.#readInstructions() //インストラクションを読み込む\r\n  }\r\n  /**\r\n   * かなとローマ字の変換パターンを読み込み、リストを作成\r\n   */\r\n  #readInstructions(){\r\n    //リストをハッシュ化する {kana: ,type: ,romaji:[]}\r\n    this.InstructionMaster = _instructionSet_js__WEBPACK_IMPORTED_MODULE_0__.instructionSet.map((inst) => {\r\n      //romajiリストを作成\r\n      let tmpRomaji = []\r\n      for(let i=2;i<inst.length;++i){\r\n        tmpRomaji.push(inst[i])\r\n      }\r\n      //typeをビットから連想配列に変換\r\n      let tmpType = parseInt(inst[1],10)\r\n      let setType = {t1:false,t2:false,t3:false,t4:false,t5:false,t6:false}\r\n\r\n      //各ビットを抽出 typeの意味は /src/instructionSet.js のコメントを参照\r\n      if ((tmpType & 0b000001) != 0){ //1bit\r\n        setType.t1 = true\r\n      }\r\n      if ((tmpType & 0b000010) != 0){ //2bit\r\n        setType.t2 = true\r\n      }\r\n      if ((tmpType & 0b000100) != 0){ //3bit\r\n        setType.t3 = true\r\n      }\r\n      if ((tmpType & 0b001000) != 0){ //4bit\r\n        setType.t4 = true\r\n      }\r\n      if ((tmpType & 0b010000) != 0){ //5bit\r\n        setType.t5 = true\r\n      }\r\n      if ((tmpType & 0b100000) != 0){ //6bit\r\n        setType.t6 = true\r\n      }\r\n\r\n      return {Kana: inst[0],Type: setType,Romaji: tmpRomaji}\r\n    })\r\n  }\r\n  /**\r\n   * 文字に対応するハッシュを返却する\r\n   * @param {*} searchStr \r\n   * @returns \r\n   */\r\n  #searchInstruction(searchStr){\r\n    let result = this.InstructionMaster.find((instruction) => instruction.Kana === searchStr)\r\n    return result\r\n  }\r\n  /**\r\n   * str2のリストの中にstr1のリストの１文字目が含まれているかチェック\r\n   * @param {*} str1 \r\n   * @param {*} str2 \r\n   * @returns \r\n   */\r\n  #searchStrInStr(str1 , str2){\r\n    let ret = false\r\n    str2.forEach( e1 => {\r\n      str1.forEach( e2 => {\r\n        if (e1.includes(e2.substring(0,1))){\r\n          ret = true\r\n        }\r\n      })\r\n    })\r\n    return ret\r\n  }\r\n  /**\r\n   * 文字コンテナを作成\r\n   * すでに作成済みの場合は初期化して再作成\r\n   * @param {*} inputStr \r\n   * @returns true:成功 false:失敗\r\n   */\r\n  createStringContainer(inputStr){\r\n\r\n    //初期化 配列を空にする\r\n    this.StringContainerList = []\r\n\r\n    let inputStrList = inputStr.split(\"\")\r\n    let stringContainer = new StringContainer()\r\n\r\n    for (let index=0 ; index < inputStrList.length ; ++index){\r\n      let str = inputStrList[index]\r\n      let instruction = this.#searchInstruction(str)\r\n      \r\n      if(instruction == undefined){ //見つからなかった場合\r\n        console.error(\"指定された文字列に対応するローマ字が見つかりませんでした。\")\r\n        return false\r\n      }\r\n\r\n      let stringCell = new StringCell(instruction.Kana,instruction.Romaji,instruction.Type)\r\n      \r\n      //特殊パターンをチェック\r\n      if(index !== inputStrList.length){ //末尾でない場合\r\n\r\n        if(instruction.Type.t1){ //後ろに小さい文字がつく可能性をチェック\r\n          let mergeStr =  instruction.Kana + inputStrList[index+1] //次の字と今の文字を結合\r\n\r\n          //再探索\r\n          const mergeResult = this.#searchInstruction(mergeStr)\r\n          if(mergeResult != undefined){ //結合文字が見つかった\r\n\r\n            instruction = mergeResult //結果を上書き\r\n            stringCell.setKana(instruction.Kana)\r\n            stringCell.setRomaji(instruction.Romaji)\r\n            \r\n            index++ //２文字処理したのですすめる\r\n          }     \r\n\r\n        } else if (instruction.Type.t3){ //小さい「っ」チェック\r\n          \r\n          const instructionSmall_tsu = this.#searchInstruction(\"っ\")\r\n          const baseSmall_tsu = instructionSmall_tsu.Romaji\r\n\r\n          if(index+1 !== inputStrList.length){ //末尾でない場合\r\n\r\n            //次の文字を読み込み\r\n            let nextStr = inputStrList[index+1]\r\n            const nextInstruction = this.#searchInstruction(nextStr)\r\n\r\n            if(nextInstruction.Type.t3){ //次の文字がまた「っ」だった場合\r\n              // xtuで確定 なんもしない\r\n            }\r\n            else if(nextInstruction.Type.t1){ //次の文字が後ろに小さい文字がつく文字の場合\r\n\r\n              if (index+2 !== inputStrList.length){ //2文字先が末尾でない場合\r\n                //次の次の文字を読み込み\r\n                let nextnextStr = inputStrList[index+2]\r\n                \r\n                if(nextInstruction.Type.t1){ //次の文字について後ろに小さい文字がつく可能性をチェック\r\n                  let mergeStr =  nextInstruction.Kana + nextnextStr //次の次の字と次の文字を結合\r\n                  const mergeResult2 = this.#searchInstruction(mergeStr)   \r\n                  if(mergeResult2 != undefined){ //結合文字が見つかった\r\n\r\n                    let add = mergeResult2.Romaji.map(w => w.substring(0,1))\r\n                    stringCell.setRomaji(add.concat(baseSmall_tsu))\r\n\r\n                  }else { //見つからなかったので１文字目の頭文字で作成\r\n\r\n                    if(!nextInstruction.Type.t4 && !nextInstruction.Type.t5){\r\n                      //次の文字が連打禁止または記号でない場合\r\n                      let add = nextInstruction.Romaji.map(w => w.substring(0,1))\r\n                      stringCell.setRomaji(add.concat(baseSmall_tsu))\r\n                    }\r\n                  }\r\n                }       \r\n\r\n              }else{ \r\n                if(!nextInstruction.Type.t4 && !nextInstruction.Type.t5){\r\n                  //次の文字が連打禁止または記号でない場合\r\n                  let add = nextInstruction.Romaji.map(w => w.substring(0,1))\r\n                  stringCell.setRomaji(add.concat(baseSmall_tsu))\r\n                }\r\n              }\r\n            }\r\n            else if(!nextInstruction.Type.t4 && !nextInstruction.Type.t5){\r\n              //次の文字が連打禁止または記号でない場合\r\n              let add = nextInstruction.Romaji.map(w => w.substring(0,1))\r\n              stringCell.setRomaji(add.concat(baseSmall_tsu))\r\n            }\r\n          }\r\n        }\r\n      }\r\n      stringContainer.addStringCell(stringCell)\r\n    }\r\n    this.StringContainerList.push(stringContainer)\r\n\r\n    return true\r\n  }\r\n  /**\r\n   * タイピングのメイン処理関数\r\n   * @param {*} input \r\n   * @param {*} stringContainer \r\n   * @returns \r\n   */\r\n  #processTyping(input,stringContainer){\r\n    \r\n    if (stringContainer.isStringCellListEnd()){ //すでに末尾\r\n      return RESULT.I_END\r\n    }\r\n\r\n    let result = RESULT.I_NG\r\n\r\n    while(true){\r\n      \r\n      //入力済み文字を組み立てて前方一致で検索\r\n      let check = stringContainer.EnteredCellRomaji + input      \r\n      let stringCell = stringContainer.getCurrentlyStringCell()\r\n      let first_match = stringCell.Romaji.filter( e => !e.indexOf(check))\r\n\r\n      if(first_match.length > 0){ //結果がいずれかの入力に一致した\r\n\r\n        result = RESULT.I_OK\r\n\r\n        //マッチしなかったローマ字はStringCellから削除する\r\n        stringCell.deleteRomaji(first_match)\r\n\r\n        stringContainer.EnteredCellRomaji += input     \r\n        stringContainer.EnteredRomaji += input\r\n        stringCell.setEnteredRomaji(stringContainer.EnteredCellRomaji)\r\n\r\n        if(stringCell.Type.t3){ //小さい「っ」のセルだった場合は次を固定\r\n          \r\n          let nextStringCell = stringContainer.getNextStringCell()\r\n\r\n          //次の文字の頭と入力した文字が一致しているかチェック\r\n          let fixationRomaji = nextStringCell.Romaji.filter( e => !e.indexOf(check))\r\n\r\n          //「x」or「l」入力 かつ 次が小さい文字でない場合に次の文字を固定化\r\n          if (fixationRomaji.length > 0){\r\n\r\n            //気を利かせる\r\n            if(nextStringCell.Type.t2){\r\n              nextStringCell.bringToFrontRomaji(fixationRomaji)  \r\n            }\r\n            if(!nextStringCell.Type.t2 && !nextStringCell.Type.t3\r\n              && !nextStringCell.Type.t4 && !nextStringCell.Type.t5\r\n            ){\r\n              nextStringCell.setFixationRomaji(fixationRomaji)   \r\n            }\r\n          }\r\n        }\r\n        if(first_match.length == 1 \r\n          && first_match[0].length == stringContainer.EnteredCellRomaji.length){\r\n          stringContainer.proceedNextStringCell() //次のセルへ\r\n        }\r\n\r\n      }else{ //通常の入力パターンでは見つからなかった\r\n\r\n        //「しゃ」とかの２文字構成だった場合\r\n        if(stringCell.Type.t1){\r\n\r\n          //最初の１文字（「しゃ」の場合は「し」）を切り取って１文字で一致するかチェック\r\n          let word = stringCell.Kana.substring(0,1)\r\n          const firstCharInstruction = this.#searchInstruction(word)\r\n          let second_match = firstCharInstruction.Romaji.filter( e => !e.indexOf(check))\r\n\r\n          if(second_match.length > 0 ){ //他のパターンが見つかった\r\n\r\n            if(stringCell.Fixation \r\n              && !this.#searchStrInStr(stringCell.Romaji,second_match)){ \r\n                //入力文字制限のため入力NG「っちゃ」などで起きる\r\n            } else {\r\n              \r\n              result = RESULT.I_OK\r\n\r\n              //今のinstructionを上書き\r\n              stringContainer.overwriteCurrentlyStringCell(firstCharInstruction.Kana,firstCharInstruction.Romaji,firstCharInstruction.Type,check)\r\n\r\n              //マッチしなかったローマ字はStringCellから削除する\r\n              stringContainer.getCurrentlyStringCell().deleteRomaji([check])\r\n\r\n              //次の位置にinstructionを追加\r\n              let word2 = stringCell.Kana.substring(1,2) //２文字目を切り取り\r\n              const secondCharInstruction = this.#searchInstruction(word2)\r\n\r\n              stringContainer.insertStringCell(secondCharInstruction.Kana,secondCharInstruction.Romaji,secondCharInstruction.Type,)\r\n\r\n              //入力済み文字そセット\r\n              stringContainer.EnteredCellRomaji += input     \r\n              stringContainer.EnteredRomaji += input\r\n              stringCell.setEnteredRomaji(stringContainer.EnteredCellRomaji)\r\n\r\n              if(second_match.length == 1 \r\n                && second_match[0].length == stringContainer.EnteredCellRomaji.length){\r\n        \r\n                stringContainer.proceedNextStringCell() //次のセルへ\r\n        \r\n              }\r\n            }\r\n\r\n          } \r\n\r\n        } else if (stringCell.Type.t3) { //小さな「っ」処理\r\n\r\n          //次のセルを取得\r\n          let nextStringCell = stringContainer.getNextStringCell()\r\n          if (nextStringCell != null \r\n            && !nextStringCell.Type.t4 && !nextStringCell.Type.t5 && !nextStringCell.Type.t6){ //次のセルがあるとき\r\n\r\n            //次のセルの頭と一致するか検索\r\n            let xtu_match = nextStringCell.Romaji.filter( e => !e.indexOf(check))\r\n            \r\n            if(xtu_match.length > 0){ //次の文字の別パターンで「っ」を打った\r\n\r\n              result = RESULT.I_OK\r\n\r\n              //ローマ字を上書き\r\n              stringCell.setRomaji([check])\r\n\r\n              //入力済み文字そセット\r\n              stringContainer.EnteredCellRomaji += input     \r\n              stringContainer.EnteredRomaji += input\r\n              stringCell.setEnteredRomaji(stringContainer.EnteredCellRomaji)\r\n\r\n              //次のセルを固定化\r\n              nextStringCell.setFixationRomaji(xtu_match)\r\n\r\n              stringContainer.proceedNextStringCell() //次のセルへ\r\n\r\n            } else if (nextStringCell.Type.t2){\r\n              //次のセルが小さな文字の場合は「xx」と入力された場合に次セルへ飛ぶ\r\n              if(check === \"xx\" || check === \"ll\"){\r\n                \r\n                //現在のセルにxかlをつめる\r\n                stringContainer.setCurrentlyStringCell_Romaji([check.substring(0,1)])\r\n\r\n                stringContainer.proceedNextStringCell() //次のセルへ\r\n                input = check.charAt(check.length - 1) //最後の１文字を取得\r\n\r\n                continue //もう一度処理を走らせる\r\n              }\r\n\r\n            } else if (nextStringCell.Type.t1){\r\n\r\n              // っふぁ のパターンで、hhuxa で打てるようにするための処理\r\n              // 次の文字の１文字目を切り取って一致しているかをチェック\r\n              let word = nextStringCell.Kana.substring(0,1)\r\n              const firstCharInstruction = this.#searchInstruction(word)\r\n              let match = firstCharInstruction.Romaji.filter( e => !e.indexOf(check))\r\n\r\n              if(match.length > 0 ){ \r\n\r\n                // ローマ字を上書き\r\n                stringCell.setRomaji([check])\r\n\r\n                //つぎのセルを「ふ」と「ぁ」に分けて、「ふ」は固定化する\r\n                stringContainer.overwriteNextStringCell(1,firstCharInstruction.Kana,match,firstCharInstruction.Type,\"\")\r\n\r\n                word = nextStringCell.Kana.substring(1,2) //「ぁ」を取得\r\n                const secondCharInstruction = this.#searchInstruction(word)\r\n                \r\n                //「ぁ」を次の次のセルに挿入\r\n                stringContainer.insertNextStringCell(2,secondCharInstruction.Kana,secondCharInstruction.Romaji,secondCharInstruction.Type,\"\")\r\n\r\n                continue\r\n\r\n              }\r\n\r\n            }\r\n\r\n          }\r\n          \r\n        } else if (stringCell.Type.t6) { //「ん」をn一つで打ち終えたい場合\r\n\r\n          if(!check.indexOf(\"n\")){ //nで始まる入力をしている\r\n            \r\n            //次のセルを取得\r\n            let nextStringCell = stringContainer.getNextStringCell()\r\n            if (nextStringCell != null){ //次のセルがあるとき\r\n              \r\n              if (!nextStringCell.Type.t4 && !nextStringCell.Type.t5 && !nextStringCell.Type.t6 ){ \r\n\r\n                let tail = check.charAt(check.length - 1) //最後の１文字を取得\r\n\r\n                //次の文字の頭と一致しているかチェック\r\n                let headCheck = nextStringCell.Romaji.filter( e => !e.indexOf(tail))\r\n\r\n                if(headCheck.length > 0){ //次の文字の頭と一致している\r\n\r\n                  //現在のセルにnをつめる\r\n                  stringContainer.setCurrentlyStringCell_Romaji([\"n\"])\r\n\r\n                  input = tail\r\n                  stringContainer.proceedNextStringCell() //次のセルへ\r\n\r\n                  continue //もう一度処理を走らせる\r\n                }\r\n              }\r\n            }\r\n          }\r\n        }\r\n      }\r\n\r\n      break\r\n    }\r\n\r\n    //末尾まで入力した\r\n    if (stringContainer.isStringCellListEnd()){\r\n      result = RESULT.I_END\r\n    }\r\n    return result\r\n\r\n  }\r\n\r\n  /**\r\n   * 文字コンテナが存在するかどうかを返却\r\n   * @returns \r\n   */\r\n  isAvailable(){\r\n    if (this.StringContainerList.length > 0) return true\r\n    return false\r\n  }\r\n\r\n  /**\r\n   * 文字コンテナからローマ字の文字リストを取得\r\n   * @returns 文字リスト　例：[\"a\", \"i\", \"u\", \"e\", \"o\"]\r\n   */\r\n  getRomaji(){\r\n    if (!this.isAvailable()) return \"\"\r\n    return this.StringContainerList[0].getStringCells_Romaji()\r\n  }\r\n\r\n  /**\r\n   * 文字コンテナからかな文字取得\r\n   * @returns 文字リスト　例：[\"あ\", \"い\", \"う\", \"え\", \"お\"]\r\n   */\r\n  getKana(){\r\n    if (!this.isAvailable()) return \"\"\r\n    return this.StringContainerList[0].getStringCells_Kana()\r\n  }\r\n\r\n  /**\r\n   * 文字コンテナから入力済みのローマ字を取得\r\n   * @returns 文字リスト　例：[\"a\", \"i\", \"u\"]\r\n   */\r\n  getEnteredRomaji() {\r\n    if (!this.isAvailable()) return \"\"\r\n    let array = this.StringContainerList[0].getStringCells_EnteredRomaji() \r\n    // そのままだと空要素が入り、「x,,」のようになるので空要素を削除\r\n    let filteredArray = array.filter(item => item !== '' && item !== null && item !== undefined)\r\n    return filteredArray\r\n  }\r\n\r\n  /**\r\n   * 文字コンテナから入力済みのかな文字を取得\r\n   * @returns 文字リスト　例：[\"あ\", \"い\", \"う\"]\r\n   */\r\n  getEnteredKana() {\r\n    if (!this.isAvailable()) return \"\"\r\n    let array = this.StringContainerList[0].getStringCells_EnteredKana() \r\n    // そのままだと空要素が入り、「x,,」のようになるので空要素を削除\r\n    let filteredArray = array.filter(item => item !== '' && item !== null && item !== undefined)\r\n    return filteredArray\r\n  }\r\n\r\n  /**\r\n   * 文字コンテナをクリア\r\n   * @returns \r\n   */\r\n  clearStringContainer() {\r\n    this.StringContainerList = []\r\n    return true\r\n  }\r\n\r\n  /**\r\n   * 入力した英数字を１文字渡してタイピング処理を実行\r\n   * @param {string} input \r\n   * @returns 0:入力成功 1:入力失敗（タイプミス）2:文章の最後まで入力成功 -1:エラー\r\n   */\r\n  inputKey(input) {\r\n    //2文字以上だったら不正なのでエラー\r\n    if (input.length != 1 ){\r\n      console.error(\"inputKeyに渡す値は１文字である必要があります\")\r\n      return RESULT.I_ERR\r\n    } \r\n    //StringContainerが空の場合はエラー\r\n    if (!this.isAvailable()){\r\n      console.error(\"inputKeyを呼び出す前にcreateStringcontainerで入力文字列を設定してください\")\r\n      return RESULT.I_ERR\r\n    } \r\n    \r\n    return this.#processTyping (input,this.StringContainerList[0])\r\n  }\r\n\r\n}\r\n\r\n/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (Firis);\r\n\n\n//# sourceURL=webpack://@satodai42/firis/./src/index.js?");

/***/ }),

/***/ "./src/instructionSet.js":
/*!*******************************!*\
  !*** ./src/instructionSet.js ***!
  \*******************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   instructionSet: () => (/* binding */ instructionSet)\n/* harmony export */ });\n/**\r\n * かなとローマ字の対応表\r\n * 1文字目: かな\r\n * 2文字目: かなの文字特性を表す値\r\n * 3文字目以降: かなに対応するローマ字入力。先のものがデフォルトでの変換として利用される\r\n * \r\n * かなの文字特性について\r\n * 1bit目  後ろに小さい文字がつく可能性がある　例：「し」は「しゃ」という入力があるのでフラグが立つ\r\n * 2bit目  小さい文字　例：「ぁ」「ゃ」「ゅ」「ょ」\r\n * 3bit目  小さい「っ」\r\n * 4bit目  小さい「っ」を入力する際に次文字の頭での入力を許さない文字　母音と「な」行が対象\r\n * 5bit目  記号　★基本的に本ファイルへの追加が必要な状況は記号の追加なので、その場合このビットを立てること\r\n * 6bit目  「ん」\r\n * 上記のビット列を10進数に変換したものがinstructionSetの2番目の要素になる\r\n */\r\nconst instructionSet = [\r\n[\"あ\",8,\"a\"],\r\n[\"い\",9,\"i\"],\r\n[\"う\",9,\"u\",\"wu\",\"whu\"],\r\n[\"え\",8,\"e\",\"ye\"],\r\n[\"お\",8,\"o\"],\r\n[\"か\",0,\"ka\",\"ca\"],\r\n[\"き\",1,\"ki\"],\r\n[\"く\",1,\"ku\",\"cu\",\"qu\"],\r\n[\"け\",0,\"ke\"],\r\n[\"こ\",0,\"ko\",\"co\"],\r\n[\"さ\",0,\"sa\"],\r\n[\"し\",1,\"si\",\"shi\",\"ci\"],\r\n[\"す\",1,\"su\"],\r\n[\"せ\",0,\"se\",\"ce\"],\r\n[\"そ\",0,\"so\"],\r\n[\"た\",0,\"ta\"],\r\n[\"ち\",1,\"ti\",\"chi\"],\r\n[\"つ\",1,\"tu\",\"tsu\"],\r\n[\"て\",1,\"te\"],\r\n[\"と\",1,\"to\"],\r\n[\"な\",8,\"na\"],\r\n[\"に\",9,\"ni\"],\r\n[\"ぬ\",8,\"nu\"],\r\n[\"ね\",8,\"ne\"],\r\n[\"の\",8,\"no\"],\r\n[\"は\",0,\"ha\"],\r\n[\"ひ\",1,\"hi\"],\r\n[\"ふ\",1,\"hu\",\"fu\"],\r\n[\"へ\",0,\"he\"],\r\n[\"ほ\",0,\"ho\"],\r\n[\"ま\",0,\"ma\"],\r\n[\"み\",1,\"mi\"],\r\n[\"む\",0,\"mu\"],\r\n[\"め\",0,\"me\"],\r\n[\"も\",0,\"mo\"],\r\n[\"や\",0,\"ya\"],\r\n[\"ゆ\",0,\"yu\"],\r\n[\"よ\",0,\"yo\"],\r\n[\"ら\",0,\"ra\"],\r\n[\"り\",1,\"ri\"],\r\n[\"る\",0,\"ru\"],\r\n[\"れ\",0,\"re\"],\r\n[\"ろ\",0,\"ro\"],\r\n[\"わ\",0,\"wa\"],\r\n[\"を\",0,\"wo\"],\r\n[\"ん\",4,\"nn\"],\r\n[\"ー\",0,\"-\"],\r\n[\"が\",0,\"ga\"],\r\n[\"ぎ\",1,\"gi\"],\r\n[\"ぐ\",1,\"gu\"],\r\n[\"げ\",0,\"ge\"],\r\n[\"ご\",0,\"go\"],\r\n[\"ざ\",0,\"za\"],\r\n[\"じ\",1,\"zi\",\"ji\"],\r\n[\"ず\",0,\"zu\"],\r\n[\"ぜ\",0,\"ze\"],\r\n[\"ぞ\",0,\"zo\"],\r\n[\"だ\",0,\"da\"],\r\n[\"ぢ\",1,\"di\"],\r\n[\"づ\",0,\"du\"],\r\n[\"で\",1,\"de\"],\r\n[\"ど\",0,\"do\"],\r\n[\"ば\",0,\"ba\"],\r\n[\"び\",1,\"bi\"],\r\n[\"ぶ\",0,\"bu\"],\r\n[\"べ\",0,\"be\"],\r\n[\"ぼ\",0,\"bo\"],\r\n[\"ぱ\",0,\"pa\"],\r\n[\"ぴ\",1,\"pi\"],\r\n[\"ぷ\",0,\"pu\"],\r\n[\"ぺ\",0,\"pe\"],\r\n[\"ぽ\",0,\"po\"],\r\n[\"きゃ\",0,\"kya\"],\r\n[\"きぃ\",0,\"kyi\"],\r\n[\"きゅ\",0,\"kyu\"],\r\n[\"きぇ\",0,\"kye\"],\r\n[\"きょ\",0,\"kyo\"],\r\n[\"しゃ\",0,\"sya\",\"sha\"],\r\n[\"しぃ\",0,\"syi\"],\r\n[\"しゅ\",0,\"syu\",\"shu\"],\r\n[\"しぇ\",0,\"sye\",\"she\"],\r\n[\"しょ\",0,\"syo\",\"sho\"],\r\n[\"ちゃ\",0,\"tya\",\"cha\",\"cya\"],\r\n[\"ちぃ\",0,\"tyi\",\"tyi\",\"cyi\"],\r\n[\"ちゅ\",0,\"tyu\",\"chu\",\"cyu\"],\r\n[\"ちぇ\",0,\"tye\",\"che\",\"cye\"],\r\n[\"ちょ\",0,\"tyo\",\"cho\",\"cyo\"],\r\n[\"にゃ\",8,\"nya\"],\r\n[\"にぃ\",8,\"nyi\"],\r\n[\"にゅ\",8,\"nyu\"],\r\n[\"にぇ\",8,\"nye\"],\r\n[\"にょ\",8,\"nyo\"],\r\n[\"ひゃ\",0,\"hya\"],\r\n[\"ひぃ\",0,\"hyi\"],\r\n[\"ひゅ\",0,\"hyu\"],\r\n[\"ひぇ\",0,\"hye\"],\r\n[\"ひょ\",0,\"hyo\"],\r\n[\"みゃ\",0,\"mya\"],\r\n[\"みぃ\",0,\"myi\"],\r\n[\"みゅ\",0,\"myu\"],\r\n[\"みぇ\",0,\"mye\"],\r\n[\"みょ\",0,\"myo\"],\r\n[\"りゃ\",0,\"rya\"],\r\n[\"りぃ\",0,\"ryi\"],\r\n[\"りゅ\",0,\"ryu\"],\r\n[\"りぇ\",0,\"rye\"],\r\n[\"りょ\",0,\"ryo\"],\r\n[\"ぎゃ\",0,\"gya\"],\r\n[\"ぎぃ\",0,\"gyi\"],\r\n[\"ぎゅ\",0,\"gyu\"],\r\n[\"ぎぇ\",0,\"gye\"],\r\n[\"ぎょ\",0,\"gyo\"],\r\n[\"じゃ\",0,\"zya\",\"ja\",\"jya\"],\r\n[\"じぃ\",0,\"zyi\",\"zyi\",\"jyi\"],\r\n[\"じゅ\",0,\"zyu\",\"ju\",\"jyu\"],\r\n[\"じぇ\",0,\"zye\",\"je\",\"jye\"],\r\n[\"じょ\",0,\"zyo\",\"jo\",\"jyo\"],\r\n[\"ぢゃ\",0,\"dya\"],\r\n[\"ぢぃ\",0,\"dyi\"],\r\n[\"ぢゅ\",0,\"dyu\"],\r\n[\"ぢぇ\",0,\"dye\"],\r\n[\"ぢょ\",0,\"dyo\"],\r\n[\"びゃ\",0,\"bya\"],\r\n[\"びぃ\",0,\"byi\"],\r\n[\"びゅ\",0,\"byu\"],\r\n[\"びぇ\",0,\"bye\"],\r\n[\"びょ\",0,\"byo\"],\r\n[\"ぴゃ\",0,\"pya\"],\r\n[\"ぴぃ\",0,\"pyi\"],\r\n[\"ぴゅ\",0,\"pyu\"],\r\n[\"ぴぇ\",0,\"pye\"],\r\n[\"ぴょ\",0,\"pyo\"],\r\n[\"ふぁ\",0,\"fa\",\"fwa\"],\r\n[\"ふぃ\",0,\"fi\",\"fwi\",\"fyi\"],\r\n[\"ふぇ\",0,\"fe\",\"fwu\"],\r\n[\"ふぉ\",0,\"fo\",\"fwe\",\"fye\"],\r\n[\"ふゅ\",0,\"fyu\",\"fwo\"],\r\n[\"てゃ\",0,\"tha\"],\r\n[\"てぃ\",0,\"thi\"],\r\n[\"てゅ\",0,\"thu\"],\r\n[\"てぇ\",0,\"the\"],\r\n[\"てょ\",0,\"tho\"],\r\n[\"とぁ\",0,\"tha\"],\r\n[\"とぃ\",0,\"thi\"],\r\n[\"とぅ\",0,\"thu\"],\r\n[\"とぇ\",0,\"the\"],\r\n[\"とぉ\",0,\"tho\"],\r\n[\"でゃ\",0,\"dha\"],\r\n[\"でぃ\",0,\"dhi\"],\r\n[\"でゅ\",0,\"dhu\"],\r\n[\"でぇ\",0,\"dhe\"],\r\n[\"でょ\",0,\"dho\"],\r\n[\"どぁ\",0,\"dwa\"],\r\n[\"どぃ\",0,\"dwi\"],\r\n[\"どぅ\",0,\"dwu\"],\r\n[\"どぇ\",0,\"dwe\"],\r\n[\"どぉ\",0,\"dwo\"],\r\n[\"いぇ\",0,\"ye\"],\r\n[\"うぁ\",0,\"wha\"],\r\n[\"うぃ\",0,\"wi\",\"whi\"],\r\n[\"うぇ\",0,\"we\",\"whe\"],\r\n[\"うぉ\",0,\"who\"],\r\n[\"くぁ\",0,\"qa\",\"kwa\",\"qwa\"],\r\n[\"くぃ\",0,\"qi\",\"kwi\",\"qwi\"],\r\n[\"くぅ\",0,\"qwu\"],\r\n[\"くぇ\",0,\"qe\",\"kwe\",\"qwe\"],\r\n[\"くぉ\",0,\"qo\",\"kwo\",\"qwo\"],\r\n[\"くゃ\",0,\"qya\"],\r\n[\"くゅ\",0,\"qyu\"],\r\n[\"くょ\",0,\"qyo\"],\r\n[\"すぁ\",0,\"swa\"],\r\n[\"すぃ\",0,\"swi\"],\r\n[\"すぅ\",0,\"swu\"],\r\n[\"すぇ\",0,\"swe\"],\r\n[\"すぉ\",0,\"swo\"],\r\n[\"つぁ\",0,\"tsa\"],\r\n[\"つぃ\",0,\"tsi\"],\r\n[\"つぇ\",0,\"tse\"],\r\n[\"つぉ\",0,\"tso\"],\r\n[\"ふゃ\",0,\"fya\"],\r\n[\"ふゅ\",0,\"fyu\"],\r\n[\"ふょ\",0,\"fyo\"],\r\n[\"ぐぁ\",0,\"gwa\"],\r\n[\"ぐぃ\",0,\"gwi\"],\r\n[\"ぐぅ\",0,\"gwu\"],\r\n[\"ぐぇ\",0,\"gwe\"],\r\n[\"ぐぉ\",0,\"gwo\"],\r\n[\"ヴぁ\",0,\"va\"],\r\n[\"ヴぃ\",0,\"vi\"],\r\n[\"ヴ\",1,\"vu\"],\r\n[\"ヴぇ\",0,\"ve\"],\r\n[\"ヴぉ\",0,\"vo\"],\r\n[\"ヴゃ\",0,\"vya\"],\r\n[\"ヴゅ\",0,\"vyu\"],\r\n[\"ヴょ\",0,\"vyo\"],\r\n[\"っ\",4,\"xtu\",\"ltu\",\"xtsu\",\"ltsu\"],\r\n[\"ぁ\",2,\"xa\",\"la\"],\r\n[\"ぃ\",2,\"xi\",\"li\",\"xyi\",\"lyi\"],\r\n[\"ぅ\",2,\"xu\",\"lu\"],\r\n[\"ぇ\",2,\"xe\",\"le\",\"xye\",\"lye\"],\r\n[\"ぉ\",2,\"xo\",\"lo\"],\r\n[\"ゃ\",2,\"xya\",\"lya\"],\r\n[\"ゅ\",2,\"xyu\",\"lyu\"],\r\n[\"ょ\",2,\"xyo\",\"lyo\"],\r\n[\"A\",16,\"A\"],\r\n[\"B\",16,\"B\"],\r\n[\"C\",16,\"C\"],\r\n[\"D\",16,\"D\"],\r\n[\"E\",16,\"E\"],\r\n[\"F\",16,\"F\"],\r\n[\"G\",16,\"G\"],\r\n[\"H\",16,\"H\"],\r\n[\"I\",16,\"I\"],\r\n[\"J\",16,\"J\"],\r\n[\"K\",16,\"K\"],\r\n[\"L\",16,\"L\"],\r\n[\"M\",16,\"M\"],\r\n[\"N\",16,\"N\"],\r\n[\"O\",16,\"O\"],\r\n[\"P\",16,\"P\"],\r\n[\"Q\",16,\"Q\"],\r\n[\"R\",16,\"R\"],\r\n[\"S\",16,\"S\"],\r\n[\"T\",16,\"T\"],\r\n[\"U\",16,\"U\"],\r\n[\"V\",16,\"V\"],\r\n[\"W\",16,\"W\"],\r\n[\"X\",16,\"X\"],\r\n[\"Y\",16,\"Y\"],\r\n[\"Z\",16,\"Z\"],\r\n[\"a\",16,\"a\"],\r\n[\"b\",16,\"b\"],\r\n[\"c\",16,\"c\"],\r\n[\"d\",16,\"d\"],\r\n[\"e\",16,\"e\"],\r\n[\"f\",16,\"f\"],\r\n[\"g\",16,\"g\"],\r\n[\"h\",16,\"h\"],\r\n[\"i\",16,\"i\"],\r\n[\"j\",16,\"j\"],\r\n[\"k\",16,\"k\"],\r\n[\"l\",16,\"l\"],\r\n[\"m\",16,\"m\"],\r\n[\"n\",16,\"n\"],\r\n[\"o\",16,\"o\"],\r\n[\"p\",16,\"p\"],\r\n[\"q\",16,\"q\"],\r\n[\"r\",16,\"r\"],\r\n[\"s\",16,\"s\"],\r\n[\"t\",16,\"t\"],\r\n[\"u\",16,\"u\"],\r\n[\"v\",16,\"v\"],\r\n[\"w\",16,\"w\"],\r\n[\"x\",16,\"x\"],\r\n[\"y\",16,\"y\"],\r\n[\"z\",16,\"z\"],\r\n[\"0\",16,\"0\"],\r\n[\"1\",16,\"1\"],\r\n[\"2\",16,\"2\"],\r\n[\"3\",16,\"3\"],\r\n[\"4\",16,\"4\"],\r\n[\"5\",16,\"5\"],\r\n[\"6\",16,\"6\"],\r\n[\"7\",16,\"7\"],\r\n[\"8\",16,\"8\"],\r\n[\"9\",16,\"9\"],\r\n[\"「\",16,\"[\"],\r\n[\"」\",16,\"]\"],\r\n[\"！\",16,\"!\"],\r\n[\"？\",16,\"?\"],\r\n[\"、\",16,\"\",\"\"],\r\n[\"。\",16,\".\"],\r\n[\"～\",16,\"~\"],\r\n[\"・\",16,\"/\"],\r\n[\"　\",16,\"_\"],\r\n[\"[\",16,\"[\"],\r\n[\"]\",16,\"]\"],\r\n[\"!\",16,\"!\"],\r\n[\"?\",16,\"?\"],\r\n[\".\",16,\".\"],\r\n[\"~\",16,\"~\"],\r\n[\" \",16,\"_\"]\r\n]\r\n\r\n\n\n//# sourceURL=webpack://@satodai42/firis/./src/instructionSet.js?");

/***/ })

/******/ });
/************************************************************************/
/******/ // The module cache
/******/ var __webpack_module_cache__ = {};
/******/ 
/******/ // The require function
/******/ function __webpack_require__(moduleId) {
/******/ 	// Check if module is in cache
/******/ 	var cachedModule = __webpack_module_cache__[moduleId];
/******/ 	if (cachedModule !== undefined) {
/******/ 		return cachedModule.exports;
/******/ 	}
/******/ 	// Create a new module (and put it into the cache)
/******/ 	var module = __webpack_module_cache__[moduleId] = {
/******/ 		// no module.id needed
/******/ 		// no module.loaded needed
/******/ 		exports: {}
/******/ 	};
/******/ 
/******/ 	// Execute the module function
/******/ 	__webpack_modules__[moduleId](module, module.exports, __webpack_require__);
/******/ 
/******/ 	// Return the exports of the module
/******/ 	return module.exports;
/******/ }
/******/ 
/************************************************************************/
/******/ /* webpack/runtime/define property getters */
/******/ (() => {
/******/ 	// define getter functions for harmony exports
/******/ 	__webpack_require__.d = (exports, definition) => {
/******/ 		for(var key in definition) {
/******/ 			if(__webpack_require__.o(definition, key) && !__webpack_require__.o(exports, key)) {
/******/ 				Object.defineProperty(exports, key, { enumerable: true, get: definition[key] });
/******/ 			}
/******/ 		}
/******/ 	};
/******/ })();
/******/ 
/******/ /* webpack/runtime/hasOwnProperty shorthand */
/******/ (() => {
/******/ 	__webpack_require__.o = (obj, prop) => (Object.prototype.hasOwnProperty.call(obj, prop))
/******/ })();
/******/ 
/******/ /* webpack/runtime/make namespace object */
/******/ (() => {
/******/ 	// define __esModule on exports
/******/ 	__webpack_require__.r = (exports) => {
/******/ 		if(typeof Symbol !== 'undefined' && Symbol.toStringTag) {
/******/ 			Object.defineProperty(exports, Symbol.toStringTag, { value: 'Module' });
/******/ 		}
/******/ 		Object.defineProperty(exports, '__esModule', { value: true });
/******/ 	};
/******/ })();
/******/ 
/************************************************************************/
/******/ 
/******/ // startup
/******/ // Load entry module and return exports
/******/ // This entry module can't be inlined because the eval devtool is used.
/******/ var __webpack_exports__ = __webpack_require__("./src/index.js");
/******/ var __webpack_exports__default = __webpack_exports__["default"];
/******/ export { __webpack_exports__default as default };
/******/ 
