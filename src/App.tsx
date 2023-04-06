import { useState, useRef, useEffect, useMemo } from 'react'
import './App.scss'

const soundEffect = (fileName: string) => {
    const sound = new Audio(`/sound-effects/${fileName}.wav`);
    sound.play();
}

const random = (min: number, max: number): number => {
    return Math.floor(Math.random() * (Math.floor(max) - Math.ceil(min) + 1)) + Math.ceil(min);
}

const randomFromList = (list: any[]): any => {
  return list[random(0, list.length - 1)]
}

const fisherYates = (list: any[]): any[] => {
  let limit = list.length - 1;
  while(limit > 0) {
        let position = random(0, limit);

        let tmp = list[position];
        list[position] = list[limit];
        list[limit] = tmp;

        limit--;
  }

  return list;
}

const removeAccents = (string: string): string => {
  if (!string) return ''

  return string.normalize("NFD").replace(/[\u0300-\u036f]/g, "");
}

const normalizeString = (string: string): string => {
  if (!string) return ''

  return removeAccents(string).toLowerCase().trim();
}

const levenshteinDistance = (a: string, b: string, corte = true): number => {
  if (!a || !b) return -1

  if (a.length === 0) return b.length;
  if (b.length === 0) return a.length;

  a = normalizeString(a);
  b = normalizeString(b);

  if (corte) {
     if (a.length > b.length) {
      let diferenca = a.length - b.length;
      a = a.slice(0, a.length - diferenca);
     } else if (a.length < b.length) {
      let diferenca = b.length - a.length;
      b = b.slice(0, b.length - diferenca);
     }
  }

  let matrix = [];

  for (let i = 0; i <= b.length; i++) {
      matrix[i] = [i];
  }

  for (let j = 0; j <= a.length; j++) {
      matrix[0][j] = j;
  }

  for (let i = 1; i <= b.length; i++) {
      for (let j = 1; j <= a.length; j++) {
         if (b.charAt(i - 1) == a.charAt(j - 1)) {
            matrix[i][j] = matrix[i - 1][j - 1];
         } else {
            matrix[i][j] = Math.min(matrix[i - 1][j - 1] + 1,
            Math.min(matrix[i][j - 1] + 1, matrix[i - 1][j] + 1));
         }
      }
  }

  return matrix[b.length][a.length];
}

const inList = (value: any, list: any[]): boolean => {
  for (let i = 0; i < list.length; i++) {
    if (value === list[i])
      return true
  }

  return false
}

const atLeastOneInList = (list1: any[], list2: any[]): boolean => {
  for (let i = 0; i < list1.length; i++) {
    for (let j = 0; j < list2.length; j++) {
      if (normalizeString(list1[i]) === normalizeString(list2[j])) {
        return true
      }
    }
  }

  return false
}

// atLeastOneInList(['Europa', 'Bandeira'], ['Mapa', 'Bandeira'])

const closestElement = (value: any, list: any[], ignore: any[] = []): any => {
  let closest = Number.POSITIVE_INFINITY
  let theOne
  for (let i = 0; i < list.length; i++) {
    if (!inList(list[i], ignore)) {
      let distance = levenshteinDistance(value, list[i])
      if (distance < closest) {
        closest = distance
        theOne = list[i]
      }
    }
  }

  return theOne
}

const getListFromObjectsAttr = (objects: any[], attr: string): any[] => {
  let list = []
  for (let i = 0; i < objects.length; i++) {
    list.push(objects[i][attr])
  }
  return list
}

const generateUniqueKey = () => {
  const alphabet = fisherYates(['a', 'b', 'c', 'd', 'e', 'f', 'g', 'h', 'i', 'j', 'k', 'l', 'm', 'n', 'o', 'p', 'q', 'r', 's', 't', 'u', 'v', 'w', 'x', 'y', 'z', 'A', 'B', 'C', 'D', 'E', 'F', 'G', 'H', 'I', 'J', 'K', 'L', 'M', 'N', 'O', 'P', 'Q', 'R', 'S', 'T', 'U', 'V', 'W', 'X', 'Y', 'Z', '0', '1', '2', '3', '4', '5', '6', '7', '8', '9', '!', '@', '#', '$', '%', '&', '*', '-', '_', '+', '='])
  const date = new Date()
  let key = `${date.getTime()}`
  for (let i = 0; i < 12; i++) {
    key += randomFromList(alphabet)
  }

  return key
}

const copy = (element: any): any => {
  return JSON.parse(JSON.stringify(element))
}

let ds = [{"id":0,"question":"intervals/C3_C4_8J.mid.mp3","answer":"8J","categories":["Intervalo"],"selfSufficient":true},{"id":1,"question":"intervals/Csharp3_Csharp4_8J.mid.mp3","answer":"8J","categories":["Intervalo"],"selfSufficient":true},{"id":2,"question":"intervals/D3_D4_8J.mid.mp3","answer":"8J","categories":["Intervalo"],"selfSufficient":true},{"id":3,"question":"intervals/Dsharp3_Dsharp4_8J.mid.mp3","answer":"8J","categories":["Intervalo"],"selfSufficient":true},{"id":4,"question":"intervals/E3_E4_8J.mid.mp3","answer":"8J","categories":["Intervalo"],"selfSufficient":true},{"id":5,"question":"intervals/F3_F4_8J.mid.mp3","answer":"8J","categories":["Intervalo"],"selfSufficient":true},{"id":6,"question":"intervals/Fsharp3_Fsharp4_8J.mid.mp3","answer":"8J","categories":["Intervalo"],"selfSufficient":true},{"id":7,"question":"intervals/G3_G4_8J.mid.mp3","answer":"8J","categories":["Intervalo"],"selfSufficient":true},{"id":8,"question":"intervals/Gsharp3_Gsharp4_8J.mid.mp3","answer":"8J","categories":["Intervalo"],"selfSufficient":true},{"id":9,"question":"intervals/A3_A4_8J.mid.mp3","answer":"8J","categories":["Intervalo"],"selfSufficient":true},{"id":10,"question":"intervals/Asharp3_Asharp4_8J.mid.mp3","answer":"8J","categories":["Intervalo"],"selfSufficient":true},{"id":11,"question":"intervals/B3_B4_8J.mid.mp3","answer":"8J","categories":["Intervalo"],"selfSufficient":true},{"id":12,"question":"intervals/C3_Db4_2m.mid.mp3","answer":"2m","categories":["Intervalo"],"selfSufficient":true},{"id":13,"question":"intervals/Csharp3_D4_2m.mid.mp3","answer":"2m","categories":["Intervalo"],"selfSufficient":true},{"id":14,"question":"intervals/D3_Eb4_2m.mid.mp3","answer":"2m","categories":["Intervalo"],"selfSufficient":true},{"id":15,"question":"intervals/Dsharp3_E4_2m.mid.mp3","answer":"2m","categories":["Intervalo"],"selfSufficient":true},{"id":16,"question":"intervals/E3_F4_2m.mid.mp3","answer":"2m","categories":["Intervalo"],"selfSufficient":true},{"id":17,"question":"intervals/F3_Gb4_2m.mid.mp3","answer":"2m","categories":["Intervalo"],"selfSufficient":true},{"id":18,"question":"intervals/Fsharp3_G4_2m.mid.mp3","answer":"2m","categories":["Intervalo"],"selfSufficient":true},{"id":19,"question":"intervals/G3_Ab4_2m.mid.mp3","answer":"2m","categories":["Intervalo"],"selfSufficient":true},{"id":20,"question":"intervals/Gsharp3_A4_2m.mid.mp3","answer":"2m","categories":["Intervalo"],"selfSufficient":true},{"id":21,"question":"intervals/A3_Bb4_2m.mid.mp3","answer":"2m","categories":["Intervalo"],"selfSufficient":true},{"id":22,"question":"intervals/Asharp3_B4_2m.mid.mp3","answer":"2m","categories":["Intervalo"],"selfSufficient":true},{"id":23,"question":"intervals/B3_C4_2m.mid.mp3","answer":"2m","categories":["Intervalo"],"selfSufficient":true},{"id":24,"question":"intervals/C3_D4_2M.mid.mp3","answer":"2M","categories":["Intervalo"],"selfSufficient":true},{"id":25,"question":"intervals/Csharp3_Dsharp4_2M.mid.mp3","answer":"2M","categories":["Intervalo"],"selfSufficient":true},{"id":26,"question":"intervals/D3_E4_2M.mid.mp3","answer":"2M","categories":["Intervalo"],"selfSufficient":true},{"id":27,"question":"intervals/Dsharp3_Esharp4_2M.mid.mp3","answer":"2M","categories":["Intervalo"],"selfSufficient":true},{"id":28,"question":"intervals/E3_Fsharp4_2M.mid.mp3","answer":"2M","categories":["Intervalo"],"selfSufficient":true},{"id":29,"question":"intervals/F3_G4_2M.mid.mp3","answer":"2M","categories":["Intervalo"],"selfSufficient":true},{"id":30,"question":"intervals/Fsharp3_Gsharp4_2M.mid.mp3","answer":"2M","categories":["Intervalo"],"selfSufficient":true},{"id":31,"question":"intervals/G3_A4_2M.mid.mp3","answer":"2M","categories":["Intervalo"],"selfSufficient":true},{"id":32,"question":"intervals/Gsharp3_Asharp4_2M.mid.mp3","answer":"2M","categories":["Intervalo"],"selfSufficient":true},{"id":33,"question":"intervals/A3_B4_2M.mid.mp3","answer":"2M","categories":["Intervalo"],"selfSufficient":true},{"id":34,"question":"intervals/Asharp3_Bsharp4_2M.mid.mp3","answer":"2M","categories":["Intervalo"],"selfSufficient":true},{"id":35,"question":"intervals/B3_Csharp4_2M.mid.mp3","answer":"2M","categories":["Intervalo"],"selfSufficient":true},{"id":36,"question":"intervals/C3_Eb4_3m.mid.mp3","answer":"3m","categories":["Intervalo"],"selfSufficient":true},{"id":37,"question":"intervals/Csharp3_E4_3m.mid.mp3","answer":"3m","categories":["Intervalo"],"selfSufficient":true},{"id":38,"question":"intervals/D3_F4_3m.mid.mp3","answer":"3m","categories":["Intervalo"],"selfSufficient":true},{"id":39,"question":"intervals/Dsharp3_Fsharp4_3m.mid.mp3","answer":"3m","categories":["Intervalo"],"selfSufficient":true},{"id":40,"question":"intervals/E3_G4_3m.mid.mp3","answer":"3m","categories":["Intervalo"],"selfSufficient":true},{"id":41,"question":"intervals/F3_Ab4_3m.mid.mp3","answer":"3m","categories":["Intervalo"],"selfSufficient":true},{"id":42,"question":"intervals/Fsharp3_A4_3m.mid.mp3","answer":"3m","categories":["Intervalo"],"selfSufficient":true},{"id":43,"question":"intervals/G3_Bb4_3m.mid.mp3","answer":"3m","categories":["Intervalo"],"selfSufficient":true},{"id":44,"question":"intervals/Gsharp3_B4_3m.mid.mp3","answer":"3m","categories":["Intervalo"],"selfSufficient":true},{"id":45,"question":"intervals/A3_C4_3m.mid.mp3","answer":"3m","categories":["Intervalo"],"selfSufficient":true},{"id":46,"question":"intervals/Asharp3_Csharp4_3m.mid.mp3","answer":"3m","categories":["Intervalo"],"selfSufficient":true},{"id":47,"question":"intervals/B3_D4_3m.mid.mp3","answer":"3m","categories":["Intervalo"],"selfSufficient":true},{"id":48,"question":"intervals/C3_E4_3M.mid.mp3","answer":"3M","categories":["Intervalo"],"selfSufficient":true},{"id":49,"question":"intervals/Csharp3_Esharp4_3M.mid.mp3","answer":"3M","categories":["Intervalo"],"selfSufficient":true},{"id":50,"question":"intervals/D3_Fsharp4_3M.mid.mp3","answer":"3M","categories":["Intervalo"],"selfSufficient":true},{"id":51,"question":"intervals/Dsharp3_Fsharpsharp4_3M.mid.mp3","answer":"3M","categories":["Intervalo"],"selfSufficient":true},{"id":52,"question":"intervals/E3_Gsharp4_3M.mid.mp3","answer":"3M","categories":["Intervalo"],"selfSufficient":true},{"id":53,"question":"intervals/F3_A4_3M.mid.mp3","answer":"3M","categories":["Intervalo"],"selfSufficient":true},{"id":54,"question":"intervals/Fsharp3_Asharp4_3M.mid.mp3","answer":"3M","categories":["Intervalo"],"selfSufficient":true},{"id":55,"question":"intervals/G3_B4_3M.mid.mp3","answer":"3M","categories":["Intervalo"],"selfSufficient":true},{"id":56,"question":"intervals/Gsharp3_Bsharp4_3M.mid.mp3","answer":"3M","categories":["Intervalo"],"selfSufficient":true},{"id":57,"question":"intervals/A3_Csharp4_3M.mid.mp3","answer":"3M","categories":["Intervalo"],"selfSufficient":true},{"id":58,"question":"intervals/Asharp3_Csharpsharp4_3M.mid.mp3","answer":"3M","categories":["Intervalo"],"selfSufficient":true},{"id":59,"question":"intervals/B3_Dsharp4_3M.mid.mp3","answer":"3M","categories":["Intervalo"],"selfSufficient":true},{"id":60,"question":"intervals/C3_F4_4J.mid.mp3","answer":"4J","categories":["Intervalo"],"selfSufficient":true},{"id":61,"question":"intervals/Csharp3_Fsharp4_4J.mid.mp3","answer":"4J","categories":["Intervalo"],"selfSufficient":true},{"id":62,"question":"intervals/D3_G4_4J.mid.mp3","answer":"4J","categories":["Intervalo"],"selfSufficient":true},{"id":63,"question":"intervals/Dsharp3_Gsharp4_4J.mid.mp3","answer":"4J","categories":["Intervalo"],"selfSufficient":true},{"id":64,"question":"intervals/E3_A4_4J.mid.mp3","answer":"4J","categories":["Intervalo"],"selfSufficient":true},{"id":65,"question":"intervals/F3_Bb4_4J.mid.mp3","answer":"4J","categories":["Intervalo"],"selfSufficient":true},{"id":66,"question":"intervals/Fsharp3_B4_4J.mid.mp3","answer":"4J","categories":["Intervalo"],"selfSufficient":true},{"id":67,"question":"intervals/G3_C4_4J.mid.mp3","answer":"4J","categories":["Intervalo"],"selfSufficient":true},{"id":68,"question":"intervals/Gsharp3_Csharp4_4J.mid.mp3","answer":"4J","categories":["Intervalo"],"selfSufficient":true},{"id":69,"question":"intervals/A3_D4_4J.mid.mp3","answer":"4J","categories":["Intervalo"],"selfSufficient":true},{"id":70,"question":"intervals/Asharp3_Dsharp4_4J.mid.mp3","answer":"4J","categories":["Intervalo"],"selfSufficient":true},{"id":71,"question":"intervals/B3_E4_4J.mid.mp3","answer":"4J","categories":["Intervalo"],"selfSufficient":true},{"id":72,"question":"intervals/C3_Gb4_5-.mid.mp3","answer":"5-","categories":["Intervalo"],"selfSufficient":true},{"id":73,"question":"intervals/Csharp3_G4_5-.mid.mp3","answer":"5-","categories":["Intervalo"],"selfSufficient":true},{"id":74,"question":"intervals/D3_Ab4_5-.mid.mp3","answer":"5-","categories":["Intervalo"],"selfSufficient":true},{"id":75,"question":"intervals/Dsharp3_A4_5-.mid.mp3","answer":"5-","categories":["Intervalo"],"selfSufficient":true},{"id":76,"question":"intervals/E3_Bb4_5-.mid.mp3","answer":"5-","categories":["Intervalo"],"selfSufficient":true},{"id":77,"question":"intervals/F3_Cb4_5-.mid.mp3","answer":"5-","categories":["Intervalo"],"selfSufficient":true},{"id":78,"question":"intervals/Fsharp3_C4_5-.mid.mp3","answer":"5-","categories":["Intervalo"],"selfSufficient":true},{"id":79,"question":"intervals/G3_Db4_5-.mid.mp3","answer":"5-","categories":["Intervalo"],"selfSufficient":true},{"id":80,"question":"intervals/Gsharp3_D4_5-.mid.mp3","answer":"5-","categories":["Intervalo"],"selfSufficient":true},{"id":81,"question":"intervals/A3_Eb4_5-.mid.mp3","answer":"5-","categories":["Intervalo"],"selfSufficient":true},{"id":82,"question":"intervals/Asharp3_E4_5-.mid.mp3","answer":"5-","categories":["Intervalo"],"selfSufficient":true},{"id":83,"question":"intervals/B3_F4_5-.mid.mp3","answer":"5-","categories":["Intervalo"],"selfSufficient":true},{"id":84,"question":"intervals/C3_G4_5J.mid.mp3","answer":"5J","categories":["Intervalo"],"selfSufficient":true},{"id":85,"question":"intervals/Csharp3_Gsharp4_5J.mid.mp3","answer":"5J","categories":["Intervalo"],"selfSufficient":true},{"id":86,"question":"intervals/D3_A4_5J.mid.mp3","answer":"5J","categories":["Intervalo"],"selfSufficient":true},{"id":87,"question":"intervals/Dsharp3_Asharp4_5J.mid.mp3","answer":"5J","categories":["Intervalo"],"selfSufficient":true},{"id":88,"question":"intervals/E3_B4_5J.mid.mp3","answer":"5J","categories":["Intervalo"],"selfSufficient":true},{"id":89,"question":"intervals/F3_C4_5J.mid.mp3","answer":"5J","categories":["Intervalo"],"selfSufficient":true},{"id":90,"question":"intervals/Fsharp3_Csharp4_5J.mid.mp3","answer":"5J","categories":["Intervalo"],"selfSufficient":true},{"id":91,"question":"intervals/G3_D4_5J.mid.mp3","answer":"5J","categories":["Intervalo"],"selfSufficient":true},{"id":92,"question":"intervals/Gsharp3_Dsharp4_5J.mid.mp3","answer":"5J","categories":["Intervalo"],"selfSufficient":true},{"id":93,"question":"intervals/A3_E4_5J.mid.mp3","answer":"5J","categories":["Intervalo"],"selfSufficient":true},{"id":94,"question":"intervals/Asharp3_Esharp4_5J.mid.mp3","answer":"5J","categories":["Intervalo"],"selfSufficient":true},{"id":95,"question":"intervals/B3_Fsharp4_5J.mid.mp3","answer":"5J","categories":["Intervalo"],"selfSufficient":true},{"id":96,"question":"intervals/C3_Ab4_6m.mid.mp3","answer":"6m","categories":["Intervalo"],"selfSufficient":true},{"id":97,"question":"intervals/Csharp3_A4_6m.mid.mp3","answer":"6m","categories":["Intervalo"],"selfSufficient":true},{"id":98,"question":"intervals/D3_Bb4_6m.mid.mp3","answer":"6m","categories":["Intervalo"],"selfSufficient":true},{"id":99,"question":"intervals/Dsharp3_B4_6m.mid.mp3","answer":"6m","categories":["Intervalo"],"selfSufficient":true},{"id":100,"question":"intervals/E3_C4_6m.mid.mp3","answer":"6m","categories":["Intervalo"],"selfSufficient":true},{"id":101,"question":"intervals/F3_Db4_6m.mid.mp3","answer":"6m","categories":["Intervalo"],"selfSufficient":true},{"id":102,"question":"intervals/Fsharp3_D4_6m.mid.mp3","answer":"6m","categories":["Intervalo"],"selfSufficient":true},{"id":103,"question":"intervals/G3_Eb4_6m.mid.mp3","answer":"6m","categories":["Intervalo"],"selfSufficient":true},{"id":104,"question":"intervals/Gsharp3_E4_6m.mid.mp3","answer":"6m","categories":["Intervalo"],"selfSufficient":true},{"id":105,"question":"intervals/A3_F4_6m.mid.mp3","answer":"6m","categories":["Intervalo"],"selfSufficient":true},{"id":106,"question":"intervals/Asharp3_Fsharp4_6m.mid.mp3","answer":"6m","categories":["Intervalo"],"selfSufficient":true},{"id":107,"question":"intervals/B3_G4_6m.mid.mp3","answer":"6m","categories":["Intervalo"],"selfSufficient":true},{"id":108,"question":"intervals/C3_A4_6M.mid.mp3","answer":"6M","categories":["Intervalo"],"selfSufficient":true},{"id":109,"question":"intervals/Csharp3_Asharp4_6M.mid.mp3","answer":"6M","categories":["Intervalo"],"selfSufficient":true},{"id":110,"question":"intervals/D3_B4_6M.mid.mp3","answer":"6M","categories":["Intervalo"],"selfSufficient":true},{"id":111,"question":"intervals/Dsharp3_Bsharp4_6M.mid.mp3","answer":"6M","categories":["Intervalo"],"selfSufficient":true},{"id":112,"question":"intervals/E3_Csharp4_6M.mid.mp3","answer":"6M","categories":["Intervalo"],"selfSufficient":true},{"id":113,"question":"intervals/F3_D4_6M.mid.mp3","answer":"6M","categories":["Intervalo"],"selfSufficient":true},{"id":114,"question":"intervals/Fsharp3_Dsharp4_6M.mid.mp3","answer":"6M","categories":["Intervalo"],"selfSufficient":true},{"id":115,"question":"intervals/G3_E4_6M.mid.mp3","answer":"6M","categories":["Intervalo"],"selfSufficient":true},{"id":116,"question":"intervals/Gsharp3_Esharp4_6M.mid.mp3","answer":"6M","categories":["Intervalo"],"selfSufficient":true},{"id":117,"question":"intervals/A3_Fsharp4_6M.mid.mp3","answer":"6M","categories":["Intervalo"],"selfSufficient":true},{"id":118,"question":"intervals/Asharp3_Fsharpsharp4_6M.mid.mp3","answer":"6M","categories":["Intervalo"],"selfSufficient":true},{"id":119,"question":"intervals/B3_Gsharp4_6M.mid.mp3","answer":"6M","categories":["Intervalo"],"selfSufficient":true},{"id":120,"question":"intervals/C3_Bb4_7m.mid.mp3","answer":"7m","categories":["Intervalo"],"selfSufficient":true},{"id":121,"question":"intervals/Csharp3_B4_7m.mid.mp3","answer":"7m","categories":["Intervalo"],"selfSufficient":true},{"id":122,"question":"intervals/D3_C4_7m.mid.mp3","answer":"7m","categories":["Intervalo"],"selfSufficient":true},{"id":123,"question":"intervals/Dsharp3_Csharp4_7m.mid.mp3","answer":"7m","categories":["Intervalo"],"selfSufficient":true},{"id":124,"question":"intervals/E3_D4_7m.mid.mp3","answer":"7m","categories":["Intervalo"],"selfSufficient":true},{"id":125,"question":"intervals/F3_Eb4_7m.mid.mp3","answer":"7m","categories":["Intervalo"],"selfSufficient":true},{"id":126,"question":"intervals/Fsharp3_E4_7m.mid.mp3","answer":"7m","categories":["Intervalo"],"selfSufficient":true},{"id":127,"question":"intervals/G3_F4_7m.mid.mp3","answer":"7m","categories":["Intervalo"],"selfSufficient":true},{"id":128,"question":"intervals/Gsharp3_Fsharp4_7m.mid.mp3","answer":"7m","categories":["Intervalo"],"selfSufficient":true},{"id":129,"question":"intervals/A3_G4_7m.mid.mp3","answer":"7m","categories":["Intervalo"],"selfSufficient":true},{"id":130,"question":"intervals/Asharp3_Gsharp4_7m.mid.mp3","answer":"7m","categories":["Intervalo"],"selfSufficient":true},{"id":131,"question":"intervals/B3_A4_7m.mid.mp3","answer":"7m","categories":["Intervalo"],"selfSufficient":true},{"id":132,"question":"intervals/C3_B4_7M.mid.mp3","answer":"7M","categories":["Intervalo"],"selfSufficient":true},{"id":133,"question":"intervals/Csharp3_Bsharp4_7M.mid.mp3","answer":"7M","categories":["Intervalo"],"selfSufficient":true},{"id":134,"question":"intervals/D3_Csharp4_7M.mid.mp3","answer":"7M","categories":["Intervalo"],"selfSufficient":true},{"id":135,"question":"intervals/Dsharp3_Csharpsharp4_7M.mid.mp3","answer":"7M","categories":["Intervalo"],"selfSufficient":true},{"id":136,"question":"intervals/E3_Dsharp4_7M.mid.mp3","answer":"7M","categories":["Intervalo"],"selfSufficient":true},{"id":137,"question":"intervals/F3_E4_7M.mid.mp3","answer":"7M","categories":["Intervalo"],"selfSufficient":true},{"id":138,"question":"intervals/Fsharp3_Esharp4_7M.mid.mp3","answer":"7M","categories":["Intervalo"],"selfSufficient":true},{"id":139,"question":"intervals/G3_Fsharp4_7M.mid.mp3","answer":"7M","categories":["Intervalo"],"selfSufficient":true},{"id":140,"question":"intervals/Gsharp3_Fsharpsharp4_7M.mid.mp3","answer":"7M","categories":["Intervalo"],"selfSufficient":true},{"id":141,"question":"intervals/A3_Gsharp4_7M.mid.mp3","answer":"7M","categories":["Intervalo"],"selfSufficient":true},{"id":142,"question":"intervals/Asharp3_Gsharpsharp4_7M.mid.mp3","answer":"7M","categories":["Intervalo"],"selfSufficient":true},{"id":143,"question":"intervals/B3_Asharp4_7M.mid.mp3","answer":"7M","categories":["Intervalo"],"selfSufficient":true},{"id":144,"question":"intervals/C3_Db3_2m.mid.mp3","answer":"2m","categories":["Intervalo"],"selfSufficient":true},{"id":145,"question":"intervals/Csharp3_D3_2m.mid.mp3","answer":"2m","categories":["Intervalo"],"selfSufficient":true},{"id":146,"question":"intervals/D3_Eb3_2m.mid.mp3","answer":"2m","categories":["Intervalo"],"selfSufficient":true},{"id":147,"question":"intervals/Dsharp3_E3_2m.mid.mp3","answer":"2m","categories":["Intervalo"],"selfSufficient":true},{"id":148,"question":"intervals/E3_F3_2m.mid.mp3","answer":"2m","categories":["Intervalo"],"selfSufficient":true},{"id":149,"question":"intervals/F3_Gb3_2m.mid.mp3","answer":"2m","categories":["Intervalo"],"selfSufficient":true},{"id":150,"question":"intervals/Fsharp3_G3_2m.mid.mp3","answer":"2m","categories":["Intervalo"],"selfSufficient":true},{"id":151,"question":"intervals/G3_Ab3_2m.mid.mp3","answer":"2m","categories":["Intervalo"],"selfSufficient":true},{"id":152,"question":"intervals/Gsharp3_A3_2m.mid.mp3","answer":"2m","categories":["Intervalo"],"selfSufficient":true},{"id":153,"question":"intervals/A3_Bb3_2m.mid.mp3","answer":"2m","categories":["Intervalo"],"selfSufficient":true},{"id":154,"question":"intervals/Asharp3_B3_2m.mid.mp3","answer":"2m","categories":["Intervalo"],"selfSufficient":true},{"id":155,"question":"intervals/B3_C3_2m.mid.mp3","answer":"2m","categories":["Intervalo"],"selfSufficient":true},{"id":156,"question":"intervals/C3_D3_2M.mid.mp3","answer":"2M","categories":["Intervalo"],"selfSufficient":true},{"id":157,"question":"intervals/Csharp3_Dsharp3_2M.mid.mp3","answer":"2M","categories":["Intervalo"],"selfSufficient":true},{"id":158,"question":"intervals/D3_E3_2M.mid.mp3","answer":"2M","categories":["Intervalo"],"selfSufficient":true},{"id":159,"question":"intervals/Dsharp3_Esharp3_2M.mid.mp3","answer":"2M","categories":["Intervalo"],"selfSufficient":true},{"id":160,"question":"intervals/E3_Fsharp3_2M.mid.mp3","answer":"2M","categories":["Intervalo"],"selfSufficient":true},{"id":161,"question":"intervals/F3_G3_2M.mid.mp3","answer":"2M","categories":["Intervalo"],"selfSufficient":true},{"id":162,"question":"intervals/Fsharp3_Gsharp3_2M.mid.mp3","answer":"2M","categories":["Intervalo"],"selfSufficient":true},{"id":163,"question":"intervals/G3_A3_2M.mid.mp3","answer":"2M","categories":["Intervalo"],"selfSufficient":true},{"id":164,"question":"intervals/Gsharp3_Asharp3_2M.mid.mp3","answer":"2M","categories":["Intervalo"],"selfSufficient":true},{"id":165,"question":"intervals/A3_B3_2M.mid.mp3","answer":"2M","categories":["Intervalo"],"selfSufficient":true},{"id":166,"question":"intervals/Asharp3_Bsharp3_2M.mid.mp3","answer":"2M","categories":["Intervalo"],"selfSufficient":true},{"id":167,"question":"intervals/B3_Csharp3_2M.mid.mp3","answer":"2M","categories":["Intervalo"],"selfSufficient":true},{"id":168,"question":"intervals/C3_Eb3_3m.mid.mp3","answer":"3m","categories":["Intervalo"],"selfSufficient":true},{"id":169,"question":"intervals/Csharp3_E3_3m.mid.mp3","answer":"3m","categories":["Intervalo"],"selfSufficient":true},{"id":170,"question":"intervals/D3_F3_3m.mid.mp3","answer":"3m","categories":["Intervalo"],"selfSufficient":true},{"id":171,"question":"intervals/Dsharp3_Fsharp3_3m.mid.mp3","answer":"3m","categories":["Intervalo"],"selfSufficient":true},{"id":172,"question":"intervals/E3_G3_3m.mid.mp3","answer":"3m","categories":["Intervalo"],"selfSufficient":true},{"id":173,"question":"intervals/F3_Ab3_3m.mid.mp3","answer":"3m","categories":["Intervalo"],"selfSufficient":true},{"id":174,"question":"intervals/Fsharp3_A3_3m.mid.mp3","answer":"3m","categories":["Intervalo"],"selfSufficient":true},{"id":175,"question":"intervals/G3_Bb3_3m.mid.mp3","answer":"3m","categories":["Intervalo"],"selfSufficient":true},{"id":176,"question":"intervals/Gsharp3_B3_3m.mid.mp3","answer":"3m","categories":["Intervalo"],"selfSufficient":true},{"id":177,"question":"intervals/A3_C3_3m.mid.mp3","answer":"3m","categories":["Intervalo"],"selfSufficient":true},{"id":178,"question":"intervals/Asharp3_Csharp3_3m.mid.mp3","answer":"3m","categories":["Intervalo"],"selfSufficient":true},{"id":179,"question":"intervals/B3_D3_3m.mid.mp3","answer":"3m","categories":["Intervalo"],"selfSufficient":true},{"id":180,"question":"intervals/C3_E3_3M.mid.mp3","answer":"3M","categories":["Intervalo"],"selfSufficient":true},{"id":181,"question":"intervals/Csharp3_Esharp3_3M.mid.mp3","answer":"3M","categories":["Intervalo"],"selfSufficient":true},{"id":182,"question":"intervals/D3_Fsharp3_3M.mid.mp3","answer":"3M","categories":["Intervalo"],"selfSufficient":true},{"id":183,"question":"intervals/Dsharp3_Fsharpsharp3_3M.mid.mp3","answer":"3M","categories":["Intervalo"],"selfSufficient":true},{"id":184,"question":"intervals/E3_Gsharp3_3M.mid.mp3","answer":"3M","categories":["Intervalo"],"selfSufficient":true},{"id":185,"question":"intervals/F3_A3_3M.mid.mp3","answer":"3M","categories":["Intervalo"],"selfSufficient":true},{"id":186,"question":"intervals/Fsharp3_Asharp3_3M.mid.mp3","answer":"3M","categories":["Intervalo"],"selfSufficient":true},{"id":187,"question":"intervals/G3_B3_3M.mid.mp3","answer":"3M","categories":["Intervalo"],"selfSufficient":true},{"id":188,"question":"intervals/Gsharp3_Bsharp3_3M.mid.mp3","answer":"3M","categories":["Intervalo"],"selfSufficient":true},{"id":189,"question":"intervals/A3_Csharp3_3M.mid.mp3","answer":"3M","categories":["Intervalo"],"selfSufficient":true},{"id":190,"question":"intervals/Asharp3_Csharpsharp3_3M.mid.mp3","answer":"3M","categories":["Intervalo"],"selfSufficient":true},{"id":191,"question":"intervals/B3_Dsharp3_3M.mid.mp3","answer":"3M","categories":["Intervalo"],"selfSufficient":true},{"id":192,"question":"intervals/C3_F3_3J.mid.mp3","answer":"3J","categories":["Intervalo"],"selfSufficient":true},{"id":193,"question":"intervals/Csharp3_Fsharp3_3J.mid.mp3","answer":"3J","categories":["Intervalo"],"selfSufficient":true},{"id":194,"question":"intervals/D3_G3_3J.mid.mp3","answer":"3J","categories":["Intervalo"],"selfSufficient":true},{"id":195,"question":"intervals/Dsharp3_Gsharp3_3J.mid.mp3","answer":"3J","categories":["Intervalo"],"selfSufficient":true},{"id":196,"question":"intervals/E3_A3_3J.mid.mp3","answer":"3J","categories":["Intervalo"],"selfSufficient":true},{"id":197,"question":"intervals/F3_Bb3_3J.mid.mp3","answer":"3J","categories":["Intervalo"],"selfSufficient":true},{"id":198,"question":"intervals/Fsharp3_B3_3J.mid.mp3","answer":"3J","categories":["Intervalo"],"selfSufficient":true},{"id":199,"question":"intervals/G3_C3_3J.mid.mp3","answer":"3J","categories":["Intervalo"],"selfSufficient":true},{"id":200,"question":"intervals/Gsharp3_Csharp3_3J.mid.mp3","answer":"3J","categories":["Intervalo"],"selfSufficient":true},{"id":201,"question":"intervals/A3_D3_3J.mid.mp3","answer":"3J","categories":["Intervalo"],"selfSufficient":true},{"id":202,"question":"intervals/Asharp3_Dsharp3_3J.mid.mp3","answer":"3J","categories":["Intervalo"],"selfSufficient":true},{"id":203,"question":"intervals/B3_E3_3J.mid.mp3","answer":"3J","categories":["Intervalo"],"selfSufficient":true},{"id":204,"question":"intervals/C3_Gb3_5-.mid.mp3","answer":"5-","categories":["Intervalo"],"selfSufficient":true},{"id":205,"question":"intervals/Csharp3_G3_5-.mid.mp3","answer":"5-","categories":["Intervalo"],"selfSufficient":true},{"id":206,"question":"intervals/D3_Ab3_5-.mid.mp3","answer":"5-","categories":["Intervalo"],"selfSufficient":true},{"id":207,"question":"intervals/Dsharp3_A3_5-.mid.mp3","answer":"5-","categories":["Intervalo"],"selfSufficient":true},{"id":208,"question":"intervals/E3_Bb3_5-.mid.mp3","answer":"5-","categories":["Intervalo"],"selfSufficient":true},{"id":209,"question":"intervals/F3_Cb3_5-.mid.mp3","answer":"5-","categories":["Intervalo"],"selfSufficient":true},{"id":210,"question":"intervals/Fsharp3_C3_5-.mid.mp3","answer":"5-","categories":["Intervalo"],"selfSufficient":true},{"id":211,"question":"intervals/G3_Db3_5-.mid.mp3","answer":"5-","categories":["Intervalo"],"selfSufficient":true},{"id":212,"question":"intervals/Gsharp3_D3_5-.mid.mp3","answer":"5-","categories":["Intervalo"],"selfSufficient":true},{"id":213,"question":"intervals/A3_Eb3_5-.mid.mp3","answer":"5-","categories":["Intervalo"],"selfSufficient":true},{"id":214,"question":"intervals/Asharp3_E3_5-.mid.mp3","answer":"5-","categories":["Intervalo"],"selfSufficient":true},{"id":215,"question":"intervals/B3_F3_5-.mid.mp3","answer":"5-","categories":["Intervalo"],"selfSufficient":true},{"id":216,"question":"intervals/C3_G3_5J.mid.mp3","answer":"5J","categories":["Intervalo"],"selfSufficient":true},{"id":217,"question":"intervals/Csharp3_Gsharp3_5J.mid.mp3","answer":"5J","categories":["Intervalo"],"selfSufficient":true},{"id":218,"question":"intervals/D3_A3_5J.mid.mp3","answer":"5J","categories":["Intervalo"],"selfSufficient":true},{"id":219,"question":"intervals/Dsharp3_Asharp3_5J.mid.mp3","answer":"5J","categories":["Intervalo"],"selfSufficient":true},{"id":220,"question":"intervals/E3_B3_5J.mid.mp3","answer":"5J","categories":["Intervalo"],"selfSufficient":true},{"id":221,"question":"intervals/F3_C3_5J.mid.mp3","answer":"5J","categories":["Intervalo"],"selfSufficient":true},{"id":222,"question":"intervals/Fsharp3_Csharp3_5J.mid.mp3","answer":"5J","categories":["Intervalo"],"selfSufficient":true},{"id":223,"question":"intervals/G3_D3_5J.mid.mp3","answer":"5J","categories":["Intervalo"],"selfSufficient":true},{"id":224,"question":"intervals/Gsharp3_Dsharp3_5J.mid.mp3","answer":"5J","categories":["Intervalo"],"selfSufficient":true},{"id":225,"question":"intervals/A3_E3_5J.mid.mp3","answer":"5J","categories":["Intervalo"],"selfSufficient":true},{"id":226,"question":"intervals/Asharp3_Esharp3_5J.mid.mp3","answer":"5J","categories":["Intervalo"],"selfSufficient":true},{"id":227,"question":"intervals/B3_Fsharp3_5J.mid.mp3","answer":"5J","categories":["Intervalo"],"selfSufficient":true},{"id":228,"question":"intervals/C3_Ab3_6m.mid.mp3","answer":"6m","categories":["Intervalo"],"selfSufficient":true},{"id":229,"question":"intervals/Csharp3_A3_6m.mid.mp3","answer":"6m","categories":["Intervalo"],"selfSufficient":true},{"id":230,"question":"intervals/D3_Bb3_6m.mid.mp3","answer":"6m","categories":["Intervalo"],"selfSufficient":true},{"id":231,"question":"intervals/Dsharp3_B3_6m.mid.mp3","answer":"6m","categories":["Intervalo"],"selfSufficient":true},{"id":232,"question":"intervals/E3_C3_6m.mid.mp3","answer":"6m","categories":["Intervalo"],"selfSufficient":true},{"id":233,"question":"intervals/F3_Db3_6m.mid.mp3","answer":"6m","categories":["Intervalo"],"selfSufficient":true},{"id":234,"question":"intervals/Fsharp3_D3_6m.mid.mp3","answer":"6m","categories":["Intervalo"],"selfSufficient":true},{"id":235,"question":"intervals/G3_Eb3_6m.mid.mp3","answer":"6m","categories":["Intervalo"],"selfSufficient":true},{"id":236,"question":"intervals/Gsharp3_E3_6m.mid.mp3","answer":"6m","categories":["Intervalo"],"selfSufficient":true},{"id":237,"question":"intervals/A3_F3_6m.mid.mp3","answer":"6m","categories":["Intervalo"],"selfSufficient":true},{"id":238,"question":"intervals/Asharp3_Fsharp3_6m.mid.mp3","answer":"6m","categories":["Intervalo"],"selfSufficient":true},{"id":239,"question":"intervals/B3_G3_6m.mid.mp3","answer":"6m","categories":["Intervalo"],"selfSufficient":true},{"id":240,"question":"intervals/C3_A3_6M.mid.mp3","answer":"6M","categories":["Intervalo"],"selfSufficient":true},{"id":241,"question":"intervals/Csharp3_Asharp3_6M.mid.mp3","answer":"6M","categories":["Intervalo"],"selfSufficient":true},{"id":242,"question":"intervals/D3_B3_6M.mid.mp3","answer":"6M","categories":["Intervalo"],"selfSufficient":true},{"id":243,"question":"intervals/Dsharp3_Bsharp3_6M.mid.mp3","answer":"6M","categories":["Intervalo"],"selfSufficient":true},{"id":244,"question":"intervals/E3_Csharp3_6M.mid.mp3","answer":"6M","categories":["Intervalo"],"selfSufficient":true},{"id":245,"question":"intervals/F3_D3_6M.mid.mp3","answer":"6M","categories":["Intervalo"],"selfSufficient":true},{"id":246,"question":"intervals/Fsharp3_Dsharp3_6M.mid.mp3","answer":"6M","categories":["Intervalo"],"selfSufficient":true},{"id":247,"question":"intervals/G3_E3_6M.mid.mp3","answer":"6M","categories":["Intervalo"],"selfSufficient":true},{"id":248,"question":"intervals/Gsharp3_Esharp3_6M.mid.mp3","answer":"6M","categories":["Intervalo"],"selfSufficient":true},{"id":249,"question":"intervals/A3_Fsharp3_6M.mid.mp3","answer":"6M","categories":["Intervalo"],"selfSufficient":true},{"id":250,"question":"intervals/Asharp3_Fsharpsharp3_6M.mid.mp3","answer":"6M","categories":["Intervalo"],"selfSufficient":true},{"id":251,"question":"intervals/B3_Gsharp3_6M.mid.mp3","answer":"6M","categories":["Intervalo"],"selfSufficient":true},{"id":252,"question":"intervals/C3_Bb3_7m.mid.mp3","answer":"7m","categories":["Intervalo"],"selfSufficient":true},{"id":253,"question":"intervals/Csharp3_B3_7m.mid.mp3","answer":"7m","categories":["Intervalo"],"selfSufficient":true},{"id":254,"question":"intervals/D3_C3_7m.mid.mp3","answer":"7m","categories":["Intervalo"],"selfSufficient":true},{"id":255,"question":"intervals/Dsharp3_Csharp3_7m.mid.mp3","answer":"7m","categories":["Intervalo"],"selfSufficient":true},{"id":256,"question":"intervals/E3_D3_7m.mid.mp3","answer":"7m","categories":["Intervalo"],"selfSufficient":true},{"id":257,"question":"intervals/F3_Eb3_7m.mid.mp3","answer":"7m","categories":["Intervalo"],"selfSufficient":true},{"id":258,"question":"intervals/Fsharp3_E3_7m.mid.mp3","answer":"7m","categories":["Intervalo"],"selfSufficient":true},{"id":259,"question":"intervals/G3_F3_7m.mid.mp3","answer":"7m","categories":["Intervalo"],"selfSufficient":true},{"id":260,"question":"intervals/Gsharp3_Fsharp3_7m.mid.mp3","answer":"7m","categories":["Intervalo"],"selfSufficient":true},{"id":261,"question":"intervals/A3_G3_7m.mid.mp3","answer":"7m","categories":["Intervalo"],"selfSufficient":true},{"id":262,"question":"intervals/Asharp3_Gsharp3_7m.mid.mp3","answer":"7m","categories":["Intervalo"],"selfSufficient":true},{"id":263,"question":"intervals/B3_A3_7m.mid.mp3","answer":"7m","categories":["Intervalo"],"selfSufficient":true},{"id":264,"question":"intervals/C3_B3_7M.mid.mp3","answer":"7M","categories":["Intervalo"],"selfSufficient":true},{"id":265,"question":"intervals/Csharp3_Bsharp3_7M.mid.mp3","answer":"7M","categories":["Intervalo"],"selfSufficient":true},{"id":266,"question":"intervals/D3_Csharp3_7M.mid.mp3","answer":"7M","categories":["Intervalo"],"selfSufficient":true},{"id":267,"question":"intervals/Dsharp3_Csharpsharp3_7M.mid.mp3","answer":"7M","categories":["Intervalo"],"selfSufficient":true},{"id":268,"question":"intervals/E3_Dsharp3_7M.mid.mp3","answer":"7M","categories":["Intervalo"],"selfSufficient":true},{"id":269,"question":"intervals/F3_E3_7M.mid.mp3","answer":"7M","categories":["Intervalo"],"selfSufficient":true},{"id":270,"question":"intervals/Fsharp3_Esharp3_7M.mid.mp3","answer":"7M","categories":["Intervalo"],"selfSufficient":true},{"id":271,"question":"intervals/G3_Fsharp3_7M.mid.mp3","answer":"7M","categories":["Intervalo"],"selfSufficient":true},{"id":272,"question":"intervals/Gsharp3_Fsharpsharp3_7M.mid.mp3","answer":"7M","categories":["Intervalo"],"selfSufficient":true},{"id":273,"question":"intervals/A3_Gsharp3_7M.mid.mp3","answer":"7M","categories":["Intervalo"],"selfSufficient":true},{"id":274,"question":"intervals/Asharp3_Gsharpsharp3_7M.mid.mp3","answer":"7M","categories":["Intervalo"],"selfSufficient":true},{"id":275,"question":"intervals/B3_Asharp3_7M.mid.mp3","answer":"7M","categories":["Intervalo"],"selfSufficient":true}, {"id":0,"question":"up/C1_C2_C3.mid.mp3","answer":"Going up","categories":["Going up"],"selfSufficient":true},{"id":1,"question":"up/D1_D2_D3.mid.mp3","answer":"Going up","categories":["Going up"],"selfSufficient":true},{"id":2,"question":"up/E1_E2_E3.mid.mp3","answer":"Going up","categories":["Going up"],"selfSufficient":true},{"id":3,"question":"up/F1_F2_F3.mid.mp3","answer":"Going up","categories":["Going up"],"selfSufficient":true},{"id":4,"question":"up/G1_G2_G3.mid.mp3","answer":"Going up","categories":["Going up"],"selfSufficient":true},{"id":5,"question":"up/A1_A2_A3.mid.mp3","answer":"Going up","categories":["Going up"],"selfSufficient":true},{"id":6,"question":"up/B1_B2_B3.mid.mp3","answer":"Going up","categories":["Going up"],"selfSufficient":true},{"id":7,"question":"up/C1_D1_E1.mid.mp3","answer":"Going up","categories":["Going up"],"selfSufficient":true},{"id":8,"question":"up/D1_E1_F1.mid.mp3","answer":"Going up","categories":["Going up"],"selfSufficient":true},{"id":9,"question":"up/E1_F1_G1.mid.mp3","answer":"Going up","categories":["Going up"],"selfSufficient":true},{"id":10,"question":"up/F1_G1_A1.mid.mp3","answer":"Going up","categories":["Going up"],"selfSufficient":true},{"id":11,"question":"up/G1_A1_B1.mid.mp3","answer":"Going up","categories":["Going up"],"selfSufficient":true},{"id":12,"question":"up/A1_B1_C2.mid.mp3","answer":"Going up","categories":["Going up"],"selfSufficient":true},{"id":13,"question":"up/C2_D2_E2.mid.mp3","answer":"Going up","categories":["Going up"],"selfSufficient":true},{"id":14,"question":"up/D2_E2_F2.mid.mp3","answer":"Going up","categories":["Going up"],"selfSufficient":true},{"id":15,"question":"up/E2_F2_G2.mid.mp3","answer":"Going up","categories":["Going up"],"selfSufficient":true},{"id":16,"question":"up/F2_G2_A2.mid.mp3","answer":"Going up","categories":["Going up"],"selfSufficient":true},{"id":17,"question":"up/G2_A2_B2.mid.mp3","answer":"Going up","categories":["Going up"],"selfSufficient":true},{"id":18,"question":"up/A2_B2_C3.mid.mp3","answer":"Going up","categories":["Going up"],"selfSufficient":true},{"id":19,"question":"up/C3_D3_E3.mid.mp3","answer":"Going up","categories":["Going up"],"selfSufficient":true},{"id":20,"question":"up/D3_E3_F3.mid.mp3","answer":"Going up","categories":["Going up"],"selfSufficient":true},{"id":21,"question":"up/E3_F3_G3.mid.mp3","answer":"Going up","categories":["Going up"],"selfSufficient":true},{"id":22,"question":"up/F3_G3_A3.mid.mp3","answer":"Going up","categories":["Going up"],"selfSufficient":true},{"id":23,"question":"up/G3_A3_B3.mid.mp3","answer":"Going up","categories":["Going up"],"selfSufficient":true},{"id":24,"question":"up/A3_B3_C4.mid.mp3","answer":"Going up","categories":["Going up"],"selfSufficient":true},{"id":25,"question":"up/C4_D4_E4.mid.mp3","answer":"Going up","categories":["Going up"],"selfSufficient":true},{"id":26,"question":"up/D4_E4_F4.mid.mp3","answer":"Going up","categories":["Going up"],"selfSufficient":true},{"id":27,"question":"up/E4_F4_G4.mid.mp3","answer":"Going up","categories":["Going up"],"selfSufficient":true},{"id":28,"question":"up/F4_G4_A4.mid.mp3","answer":"Going up","categories":["Going up"],"selfSufficient":true},{"id":29,"question":"up/G4_A4_B4.mid.mp3","answer":"Going up","categories":["Going up"],"selfSufficient":true},{"id":30,"question":"up/A4_B4_C5.mid.mp3","answer":"Going up","categories":["Going up"],"selfSufficient":true},{"id":31,"question":"up/C1_C2.mid.mp3","answer":"Going up","categories":["Going up"],"selfSufficient":true},{"id":32,"question":"up/D1_D2.mid.mp3","answer":"Going up","categories":["Going up"],"selfSufficient":true},{"id":33,"question":"up/E1_E2.mid.mp3","answer":"Going up","categories":["Going up"],"selfSufficient":true},{"id":34,"question":"up/F1_F2.mid.mp3","answer":"Going up","categories":["Going up"],"selfSufficient":true},{"id":35,"question":"up/G1_G2.mid.mp3","answer":"Going up","categories":["Going up"],"selfSufficient":true},{"id":36,"question":"up/A1_A2.mid.mp3","answer":"Going up","categories":["Going up"],"selfSufficient":true},{"id":37,"question":"up/B1_B2.mid.mp3","answer":"Going up","categories":["Going up"],"selfSufficient":true},{"id":38,"question":"up/C2_C3.mid.mp3","answer":"Going up","categories":["Going up"],"selfSufficient":true},{"id":39,"question":"up/D2_D3.mid.mp3","answer":"Going up","categories":["Going up"],"selfSufficient":true},{"id":40,"question":"up/E2_E3.mid.mp3","answer":"Going up","categories":["Going up"],"selfSufficient":true},{"id":41,"question":"up/F2_F3.mid.mp3","answer":"Going up","categories":["Going up"],"selfSufficient":true},{"id":42,"question":"up/G2_G3.mid.mp3","answer":"Going up","categories":["Going up"],"selfSufficient":true},{"id":43,"question":"up/A2_A3.mid.mp3","answer":"Going up","categories":["Going up"],"selfSufficient":true},{"id":44,"question":"up/B2_B3.mid.mp3","answer":"Going up","categories":["Going up"],"selfSufficient":true},{"id":45,"question":"up/C1_D1.mid.mp3","answer":"Going up","categories":["Going up"],"selfSufficient":true},{"id":46,"question":"up/D1_E1.mid.mp3","answer":"Going up","categories":["Going up"],"selfSufficient":true},{"id":47,"question":"up/E1_F1.mid.mp3","answer":"Going up","categories":["Going up"],"selfSufficient":true},{"id":48,"question":"up/F1_G1.mid.mp3","answer":"Going up","categories":["Going up"],"selfSufficient":true},{"id":49,"question":"up/G1_A1.mid.mp3","answer":"Going up","categories":["Going up"],"selfSufficient":true},{"id":50,"question":"up/A1_B1.mid.mp3","answer":"Going up","categories":["Going up"],"selfSufficient":true},{"id":51,"question":"up/B1_C2.mid.mp3","answer":"Going up","categories":["Going up"],"selfSufficient":true},{"id":52,"question":"up/C2_D2.mid.mp3","answer":"Going up","categories":["Going up"],"selfSufficient":true},{"id":53,"question":"up/D2_E2.mid.mp3","answer":"Going up","categories":["Going up"],"selfSufficient":true},{"id":54,"question":"up/E2_F2.mid.mp3","answer":"Going up","categories":["Going up"],"selfSufficient":true},{"id":55,"question":"up/F2_G2.mid.mp3","answer":"Going up","categories":["Going up"],"selfSufficient":true},{"id":56,"question":"up/G2_A2.mid.mp3","answer":"Going up","categories":["Going up"],"selfSufficient":true},{"id":57,"question":"up/A2_B2.mid.mp3","answer":"Going up","categories":["Going up"],"selfSufficient":true},{"id":58,"question":"up/B2_C3.mid.mp3","answer":"Going up","categories":["Going up"],"selfSufficient":true},{"id":59,"question":"up/C3_D3.mid.mp3","answer":"Going up","categories":["Going up"],"selfSufficient":true},{"id":60,"question":"up/D3_E3.mid.mp3","answer":"Going up","categories":["Going up"],"selfSufficient":true},{"id":61,"question":"up/E3_F3.mid.mp3","answer":"Going up","categories":["Going up"],"selfSufficient":true},{"id":62,"question":"up/F3_G3.mid.mp3","answer":"Going up","categories":["Going up"],"selfSufficient":true},{"id":63,"question":"up/G3_A3.mid.mp3","answer":"Going up","categories":["Going up"],"selfSufficient":true},{"id":64,"question":"up/A3_B3.mid.mp3","answer":"Going up","categories":["Going up"],"selfSufficient":true},{"id":65,"question":"up/B3_C4.mid.mp3","answer":"Going up","categories":["Going up"],"selfSufficient":true},{"id":66,"question":"up/C4_D4.mid.mp3","answer":"Going up","categories":["Going up"],"selfSufficient":true},{"id":67,"question":"up/D4_E4.mid.mp3","answer":"Going up","categories":["Going up"],"selfSufficient":true},{"id":68,"question":"up/E4_F4.mid.mp3","answer":"Going up","categories":["Going up"],"selfSufficient":true},{"id":69,"question":"up/F4_G4.mid.mp3","answer":"Going up","categories":["Going up"],"selfSufficient":true},{"id":70,"question":"up/G4_A4.mid.mp3","answer":"Going up","categories":["Going up"],"selfSufficient":true},{"id":71,"question":"up/A4_B4.mid.mp3","answer":"Going up","categories":["Going up"],"selfSufficient":true},{"id":72,"question":"up/B4_C5.mid.mp3","answer":"Going up","categories":["Going up"],"selfSufficient":true}, {"id":0,"question":"down/C3_C2_C1.mid.mp3","answer":"Going down","categories":["Going down"],"selfSufficient":true},{"id":1,"question":"down/D3_D2_D1.mid.mp3","answer":"Going down","categories":["Going down"],"selfSufficient":true},{"id":2,"question":"down/E3_E2_E1.mid.mp3","answer":"Going down","categories":["Going down"],"selfSufficient":true},{"id":3,"question":"down/F3_F2_F1.mid.mp3","answer":"Going down","categories":["Going down"],"selfSufficient":true},{"id":4,"question":"down/G3_G2_G1.mid.mp3","answer":"Going down","categories":["Going down"],"selfSufficient":true},{"id":5,"question":"down/A3_A2_A1.mid.mp3","answer":"Going down","categories":["Going down"],"selfSufficient":true},{"id":6,"question":"down/B3_B2_B1.mid.mp3","answer":"Going down","categories":["Going down"],"selfSufficient":true},{"id":7,"question":"down/C2_C1.mid.mp3","answer":"Going down","categories":["Going down"],"selfSufficient":true},{"id":8,"question":"down/D2_D1.mid.mp3","answer":"Going down","categories":["Going down"],"selfSufficient":true},{"id":9,"question":"down/E2_E1.mid.mp3","answer":"Going down","categories":["Going down"],"selfSufficient":true},{"id":10,"question":"down/F2_F1.mid.mp3","answer":"Going down","categories":["Going down"],"selfSufficient":true},{"id":11,"question":"down/G2_G1.mid.mp3","answer":"Going down","categories":["Going down"],"selfSufficient":true},{"id":12,"question":"down/A2_A1.mid.mp3","answer":"Going down","categories":["Going down"],"selfSufficient":true},{"id":13,"question":"down/B2_B1.mid.mp3","answer":"Going down","categories":["Going down"],"selfSufficient":true},{"id":14,"question":"down/C3_C2.mid.mp3","answer":"Going down","categories":["Going down"],"selfSufficient":true},{"id":15,"question":"down/D3_D2.mid.mp3","answer":"Going down","categories":["Going down"],"selfSufficient":true},{"id":16,"question":"down/E3_E2.mid.mp3","answer":"Going down","categories":["Going down"],"selfSufficient":true},{"id":17,"question":"down/F3_F2.mid.mp3","answer":"Going down","categories":["Going down"],"selfSufficient":true},{"id":18,"question":"down/G3_G2.mid.mp3","answer":"Going down","categories":["Going down"],"selfSufficient":true},{"id":19,"question":"down/A3_A2.mid.mp3","answer":"Going down","categories":["Going down"],"selfSufficient":true},{"id":20,"question":"down/B3_B2.mid.mp3","answer":"Going down","categories":["Going down"],"selfSufficient":true},{"id":21,"question":"down/E1_D1_C1.mid.mp3","answer":"Going down","categories":["Going down"],"selfSufficient":true},{"id":22,"question":"down/F1_E1_D1.mid.mp3","answer":"Going down","categories":["Going down"],"selfSufficient":true},{"id":23,"question":"down/G1_F1_E1.mid.mp3","answer":"Going down","categories":["Going down"],"selfSufficient":true},{"id":24,"question":"down/A1_G1_F1.mid.mp3","answer":"Going down","categories":["Going down"],"selfSufficient":true},{"id":25,"question":"down/B1_A1_G1.mid.mp3","answer":"Going down","categories":["Going down"],"selfSufficient":true},{"id":26,"question":"down/C2_B1_A1.mid.mp3","answer":"Going down","categories":["Going down"],"selfSufficient":true},{"id":27,"question":"down/E2_D2_C2.mid.mp3","answer":"Going down","categories":["Going down"],"selfSufficient":true},{"id":28,"question":"down/F2_E2_D2.mid.mp3","answer":"Going down","categories":["Going down"],"selfSufficient":true},{"id":29,"question":"down/G2_F2_E2.mid.mp3","answer":"Going down","categories":["Going down"],"selfSufficient":true},{"id":30,"question":"down/A2_G2_F2.mid.mp3","answer":"Going down","categories":["Going down"],"selfSufficient":true},{"id":31,"question":"down/B2_A2_G2.mid.mp3","answer":"Going down","categories":["Going down"],"selfSufficient":true},{"id":32,"question":"down/C3_B2_A2.mid.mp3","answer":"Going down","categories":["Going down"],"selfSufficient":true},{"id":33,"question":"down/E3_D3_C3.mid.mp3","answer":"Going down","categories":["Going down"],"selfSufficient":true},{"id":34,"question":"down/F3_E3_D3.mid.mp3","answer":"Going down","categories":["Going down"],"selfSufficient":true},{"id":35,"question":"down/G3_F3_E3.mid.mp3","answer":"Going down","categories":["Going down"],"selfSufficient":true},{"id":36,"question":"down/A3_G3_F3.mid.mp3","answer":"Going down","categories":["Going down"],"selfSufficient":true},{"id":37,"question":"down/B3_A3_G3.mid.mp3","answer":"Going down","categories":["Going down"],"selfSufficient":true},{"id":38,"question":"down/C4_B3_A3.mid.mp3","answer":"Going down","categories":["Going down"],"selfSufficient":true},{"id":39,"question":"down/E4_D4_C4.mid.mp3","answer":"Going down","categories":["Going down"],"selfSufficient":true},{"id":40,"question":"down/F4_E4_D4.mid.mp3","answer":"Going down","categories":["Going down"],"selfSufficient":true},{"id":41,"question":"down/G4_F4_E4.mid.mp3","answer":"Going down","categories":["Going down"],"selfSufficient":true},{"id":42,"question":"down/A4_G4_F4.mid.mp3","answer":"Going down","categories":["Going down"],"selfSufficient":true},{"id":43,"question":"down/B4_A4_G4.mid.mp3","answer":"Going down","categories":["Going down"],"selfSufficient":true},{"id":44,"question":"down/C5_B4_A4.mid.mp3","answer":"Going down","categories":["Going down"],"selfSufficient":true},{"id":45,"question":"down/E1_D1.mid.mp3","answer":"Going down","categories":["Going down"],"selfSufficient":true},{"id":46,"question":"down/D1_C1.mid.mp3","answer":"Going down","categories":["Going down"],"selfSufficient":true},{"id":47,"question":"down/F1_E1.mid.mp3","answer":"Going down","categories":["Going down"],"selfSufficient":true},{"id":48,"question":"down/E1_D1.mid.mp3","answer":"Going down","categories":["Going down"],"selfSufficient":true},{"id":49,"question":"down/G1_F1.mid.mp3","answer":"Going down","categories":["Going down"],"selfSufficient":true},{"id":50,"question":"down/F1_E1.mid.mp3","answer":"Going down","categories":["Going down"],"selfSufficient":true},{"id":51,"question":"down/A1_G1.mid.mp3","answer":"Going down","categories":["Going down"],"selfSufficient":true},{"id":52,"question":"down/G1_F1.mid.mp3","answer":"Going down","categories":["Going down"],"selfSufficient":true},{"id":53,"question":"down/B1_A1.mid.mp3","answer":"Going down","categories":["Going down"],"selfSufficient":true},{"id":54,"question":"down/A1_G1.mid.mp3","answer":"Going down","categories":["Going down"],"selfSufficient":true},{"id":55,"question":"down/C2_B1.mid.mp3","answer":"Going down","categories":["Going down"],"selfSufficient":true},{"id":56,"question":"down/B1_A1.mid.mp3","answer":"Going down","categories":["Going down"],"selfSufficient":true},{"id":57,"question":"down/E2_D2.mid.mp3","answer":"Going down","categories":["Going down"],"selfSufficient":true},{"id":58,"question":"down/D2_C2.mid.mp3","answer":"Going down","categories":["Going down"],"selfSufficient":true},{"id":59,"question":"down/F2_E2.mid.mp3","answer":"Going down","categories":["Going down"],"selfSufficient":true},{"id":60,"question":"down/E2_D2.mid.mp3","answer":"Going down","categories":["Going down"],"selfSufficient":true},{"id":61,"question":"down/G2_F2.mid.mp3","answer":"Going down","categories":["Going down"],"selfSufficient":true},{"id":62,"question":"down/F2_E2.mid.mp3","answer":"Going down","categories":["Going down"],"selfSufficient":true},{"id":63,"question":"down/A2_G2.mid.mp3","answer":"Going down","categories":["Going down"],"selfSufficient":true},{"id":64,"question":"down/G2_F2.mid.mp3","answer":"Going down","categories":["Going down"],"selfSufficient":true},{"id":65,"question":"down/B2_A2.mid.mp3","answer":"Going down","categories":["Going down"],"selfSufficient":true},{"id":66,"question":"down/A2_G2.mid.mp3","answer":"Going down","categories":["Going down"],"selfSufficient":true},{"id":67,"question":"down/C3_B2.mid.mp3","answer":"Going down","categories":["Going down"],"selfSufficient":true},{"id":68,"question":"down/B2_A2.mid.mp3","answer":"Going down","categories":["Going down"],"selfSufficient":true},{"id":69,"question":"down/E3_D3.mid.mp3","answer":"Going down","categories":["Going down"],"selfSufficient":true},{"id":70,"question":"down/D3_C3.mid.mp3","answer":"Going down","categories":["Going down"],"selfSufficient":true},{"id":71,"question":"down/F3_E3.mid.mp3","answer":"Going down","categories":["Going down"],"selfSufficient":true},{"id":72,"question":"down/E3_D3.mid.mp3","answer":"Going down","categories":["Going down"],"selfSufficient":true},{"id":73,"question":"down/G3_F3.mid.mp3","answer":"Going down","categories":["Going down"],"selfSufficient":true},{"id":74,"question":"down/F3_E3.mid.mp3","answer":"Going down","categories":["Going down"],"selfSufficient":true},{"id":75,"question":"down/A3_G3.mid.mp3","answer":"Going down","categories":["Going down"],"selfSufficient":true},{"id":76,"question":"down/G3_F3.mid.mp3","answer":"Going down","categories":["Going down"],"selfSufficient":true},{"id":77,"question":"down/B3_A3.mid.mp3","answer":"Going down","categories":["Going down"],"selfSufficient":true},{"id":78,"question":"down/A3_G3.mid.mp3","answer":"Going down","categories":["Going down"],"selfSufficient":true},{"id":79,"question":"down/C4_B3.mid.mp3","answer":"Going down","categories":["Going down"],"selfSufficient":true},{"id":80,"question":"down/B3_A3.mid.mp3","answer":"Going down","categories":["Going down"],"selfSufficient":true},{"id":81,"question":"down/E4_D4.mid.mp3","answer":"Going down","categories":["Going down"],"selfSufficient":true},{"id":82,"question":"down/D4_C4.mid.mp3","answer":"Going down","categories":["Going down"],"selfSufficient":true},{"id":83,"question":"down/F4_E4.mid.mp3","answer":"Going down","categories":["Going down"],"selfSufficient":true},{"id":84,"question":"down/E4_D4.mid.mp3","answer":"Going down","categories":["Going down"],"selfSufficient":true},{"id":85,"question":"down/G4_F4.mid.mp3","answer":"Going down","categories":["Going down"],"selfSufficient":true},{"id":86,"question":"down/F4_E4.mid.mp3","answer":"Going down","categories":["Going down"],"selfSufficient":true},{"id":87,"question":"down/A4_G4.mid.mp3","answer":"Going down","categories":["Going down"],"selfSufficient":true},{"id":88,"question":"down/G4_F4.mid.mp3","answer":"Going down","categories":["Going down"],"selfSufficient":true},{"id":89,"question":"down/B4_A4.mid.mp3","answer":"Going down","categories":["Going down"],"selfSufficient":true},{"id":90,"question":"down/A4_G4.mid.mp3","answer":"Going down","categories":["Going down"],"selfSufficient":true},{"id":91,"question":"down/C5_B4.mid.mp3","answer":"Going down","categories":["Going down"],"selfSufficient":true},{"id":92,"question":"down/B4_A4.mid.mp3","answer":"Going down","categories":["Going down"],"selfSufficient":true}, {"id":0,"question":"chords/C3_E3_G3.mid.mp3","answer":"Major","categories":["Major"],"selfSufficient":true},{"id":1,"question":"chords/Csharp3_Esharp3_Gsharp3.mid.mp3","answer":"Major","categories":["Major"],"selfSufficient":true},{"id":2,"question":"chords/D3_Fsharp3_A3.mid.mp3","answer":"Major","categories":["Major"],"selfSufficient":true},{"id":3,"question":"chords/Dsharp3_Fsharpsharp3_Asharp3.mid.mp3","answer":"Major","categories":["Major"],"selfSufficient":true},{"id":4,"question":"chords/E3_Gsharp3_B3.mid.mp3","answer":"Major","categories":["Major"],"selfSufficient":true},{"id":5,"question":"chords/Esharp3_Gsharpsharp3_Bsharp3.mid.mp3","answer":"Major","categories":["Major"],"selfSufficient":true},{"id":6,"question":"chords/F3_A3_C3.mid.mp3","answer":"Major","categories":["Major"],"selfSufficient":true},{"id":7,"question":"chords/Fsharp3_Asharp3_Csharp3.mid.mp3","answer":"Major","categories":["Major"],"selfSufficient":true},{"id":8,"question":"chords/G3_B3_D3.mid.mp3","answer":"Major","categories":["Major"],"selfSufficient":true},{"id":9,"question":"chords/Gsharp3_Bsharp3_Dsharp3.mid.mp3","answer":"Major","categories":["Major"],"selfSufficient":true},{"id":10,"question":"chords/A3_Csharp3_E3.mid.mp3","answer":"Major","categories":["Major"],"selfSufficient":true},{"id":11,"question":"chords/Asharp3_Csharpsharp3_Esharp3.mid.mp3","answer":"Major","categories":["Major"],"selfSufficient":true},{"id":12,"question":"chords/B3_Dsharp3_Fsharp3.mid.mp3","answer":"Major","categories":["Major"],"selfSufficient":true},{"id":13,"question":"chords/Bsharp3_Dsharpsharp3_Fsharpsharp3.mid.mp3","answer":"Major","categories":["Major"],"selfSufficient":true}, {"id":0,"question":"chords/C3_E3_G3_B3.mid.mp3","answer":"Major 7M","categories":["Major 7M"],"selfSufficient":true},{"id":1,"question":"chords/Csharp3_Esharp3_Gsharp3_Bsharp3.mid.mp3","answer":"Major 7M","categories":["Major 7M"],"selfSufficient":true},{"id":2,"question":"chords/D3_Fsharp3_A3_Csharp3.mid.mp3","answer":"Major 7M","categories":["Major 7M"],"selfSufficient":true},{"id":3,"question":"chords/Dsharp3_Fsharpsharp3_Asharp3_Csharpsharp3.mid.mp3","answer":"Major 7M","categories":["Major 7M"],"selfSufficient":true},{"id":4,"question":"chords/E3_Gsharp3_B3_Dsharp3.mid.mp3","answer":"Major 7M","categories":["Major 7M"],"selfSufficient":true},{"id":5,"question":"chords/Esharp3_Gsharpsharp3_Bsharp3_Dsharpsharp3.mid.mp3","answer":"Major 7M","categories":["Major 7M"],"selfSufficient":true},{"id":6,"question":"chords/F3_A3_C3_E3.mid.mp3","answer":"Major 7M","categories":["Major 7M"],"selfSufficient":true},{"id":7,"question":"chords/Fsharp3_Asharp3_Csharp3_Esharp3.mid.mp3","answer":"Major 7M","categories":["Major 7M"],"selfSufficient":true},{"id":8,"question":"chords/G3_B3_D3_Fsharp3.mid.mp3","answer":"Major 7M","categories":["Major 7M"],"selfSufficient":true},{"id":9,"question":"chords/Gsharp3_Bsharp3_Dsharp3_Fsharpsharp3.mid.mp3","answer":"Major 7M","categories":["Major 7M"],"selfSufficient":true},{"id":10,"question":"chords/A3_Csharp3_E3_Gsharp3.mid.mp3","answer":"Major 7M","categories":["Major 7M"],"selfSufficient":true},{"id":11,"question":"chords/Asharp3_Csharpsharp3_Esharp3_Gsharpsharp3.mid.mp3","answer":"Major 7M","categories":["Major 7M"],"selfSufficient":true},{"id":12,"question":"chords/B3_Dsharp3_Fsharp3_Asharp3.mid.mp3","answer":"Major 7M","categories":["Major 7M"],"selfSufficient":true},{"id":13,"question":"chords/Bsharp3_Dsharpsharp3_Fsharpsharp3_Asharpsharp3.mid.mp3","answer":"Major 7M","categories":["Major 7M"],"selfSufficient":true}, {"id":0,"question":"chords/C3_Eb3_G3.mid.mp3","answer":"Minor","categories":["Minor"],"selfSufficient":true},{"id":1,"question":"chords/Csharp3_E3_Gsharp3.mid.mp3","answer":"Minor","categories":["Minor"],"selfSufficient":true},{"id":2,"question":"chords/D3_F3_A3.mid.mp3","answer":"Minor","categories":["Minor"],"selfSufficient":true},{"id":3,"question":"chords/Dsharp3_Fsharp3_Asharp3.mid.mp3","answer":"Minor","categories":["Minor"],"selfSufficient":true},{"id":4,"question":"chords/E3_G3_B3.mid.mp3","answer":"Minor","categories":["Minor"],"selfSufficient":true},{"id":5,"question":"chords/Esharp3_Gsharp3_Bsharp3.mid.mp3","answer":"Minor","categories":["Minor"],"selfSufficient":true},{"id":6,"question":"chords/F3_Ab3_C3.mid.mp3","answer":"Minor","categories":["Minor"],"selfSufficient":true},{"id":7,"question":"chords/Fsharp3_A3_Csharp3.mid.mp3","answer":"Minor","categories":["Minor"],"selfSufficient":true},{"id":8,"question":"chords/G3_Bb3_D3.mid.mp3","answer":"Minor","categories":["Minor"],"selfSufficient":true},{"id":9,"question":"chords/Gsharp3_B3_Dsharp3.mid.mp3","answer":"Minor","categories":["Minor"],"selfSufficient":true},{"id":10,"question":"chords/A3_C3_E3.mid.mp3","answer":"Minor","categories":["Minor"],"selfSufficient":true},{"id":11,"question":"chords/Asharp3_Csharp3_Esharp3.mid.mp3","answer":"Minor","categories":["Minor"],"selfSufficient":true},{"id":12,"question":"chords/B3_D3_Fsharp3.mid.mp3","answer":"Minor","categories":["Minor"],"selfSufficient":true},{"id":13,"question":"chords/Bsharp3_Dsharp3_Fsharpsharp3.mid.mp3","answer":"Minor","categories":["Minor"],"selfSufficient":true}, {"id":0,"question":"chords/C3_Eb3_G3_Bb3.mid.mp3","answer":"Minor 7M","categories":["Minor 7M"],"selfSufficient":true},{"id":1,"question":"chords/Csharp3_E3_Gsharp3_B3.mid.mp3","answer":"Minor 7M","categories":["Minor 7M"],"selfSufficient":true},{"id":2,"question":"chords/D3_F3_A3_C3.mid.mp3","answer":"Minor 7M","categories":["Minor 7M"],"selfSufficient":true},{"id":3,"question":"chords/Dsharp3_Fsharp3_Asharp3_Csharp3.mid.mp3","answer":"Minor 7M","categories":["Minor 7M"],"selfSufficient":true},{"id":4,"question":"chords/E3_G3_B3_D3.mid.mp3","answer":"Minor 7M","categories":["Minor 7M"],"selfSufficient":true},{"id":5,"question":"chords/Esharp3_Gsharp3_Bsharp3_Dsharp3.mid.mp3","answer":"Minor 7M","categories":["Minor 7M"],"selfSufficient":true},{"id":6,"question":"chords/F3_Ab3_C3_Eb3.mid.mp3","answer":"Minor 7M","categories":["Minor 7M"],"selfSufficient":true},{"id":7,"question":"chords/Fsharp3_A3_Csharp3_E3.mid.mp3","answer":"Minor 7M","categories":["Minor 7M"],"selfSufficient":true},{"id":8,"question":"chords/G3_Bb3_D3_F3.mid.mp3","answer":"Minor 7M","categories":["Minor 7M"],"selfSufficient":true},{"id":9,"question":"chords/Gsharp3_B3_Dsharp3_Fsharp3.mid.mp3","answer":"Minor 7M","categories":["Minor 7M"],"selfSufficient":true},{"id":10,"question":"chords/A3_C3_E3_G3.mid.mp3","answer":"Minor 7M","categories":["Minor 7M"],"selfSufficient":true},{"id":11,"question":"chords/Asharp3_Csharp3_Esharp3_Gsharp3.mid.mp3","answer":"Minor 7M","categories":["Minor 7M"],"selfSufficient":true},{"id":12,"question":"chords/B3_D3_Fsharp3_A3.mid.mp3","answer":"Minor 7M","categories":["Minor 7M"],"selfSufficient":true},{"id":13,"question":"chords/Bsharp3_Dsharp3_Fsharpsharp3_Asharp3.mid.mp3","answer":"Minor 7M","categories":["Minor 7M"],"selfSufficient":true}, {"id":0,"question":"chords/C3_E3_G3_Bb3.mid.mp3","answer":"Dominant","categories":["Dominant"],"selfSufficient":true},{"id":1,"question":"chords/Csharp3_Esharp3_Gsharp3_B3.mid.mp3","answer":"Dominant","categories":["Dominant"],"selfSufficient":true},{"id":2,"question":"chords/D3_Fsharp3_A3_C3.mid.mp3","answer":"Dominant","categories":["Dominant"],"selfSufficient":true},{"id":3,"question":"chords/Dsharp3_F3_Asharp3_Csharp3.mid.mp3","answer":"Dominant","categories":["Dominant"],"selfSufficient":true},{"id":4,"question":"chords/E3_Gsharp3_B3_D3.mid.mp3","answer":"Dominant","categories":["Dominant"],"selfSufficient":true},{"id":5,"question":"chords/Esharp3_G3_Bsharp3_Dsharp3.mid.mp3","answer":"Dominant","categories":["Dominant"],"selfSufficient":true},{"id":6,"question":"chords/F3_A3_C3_Eb3.mid.mp3","answer":"Dominant","categories":["Dominant"],"selfSufficient":true},{"id":7,"question":"chords/Fsharp3_Asharp3_Csharp3_E3.mid.mp3","answer":"Dominant","categories":["Dominant"],"selfSufficient":true},{"id":8,"question":"chords/G3_B3_D3_F3.mid.mp3","answer":"Dominant","categories":["Dominant"],"selfSufficient":true},{"id":9,"question":"chords/Gsharp3_Bsharp3_Dsharp3_Fsharp3.mid.mp3","answer":"Dominant","categories":["Dominant"],"selfSufficient":true},{"id":10,"question":"chords/A3_Csharp3_E3_G3.mid.mp3","answer":"Dominant","categories":["Dominant"],"selfSufficient":true},{"id":11,"question":"chords/Asharp3_Csharpsharp3_Esharp3_Gsharp3.mid.mp3","answer":"Dominant","categories":["Dominant"],"selfSufficient":true},{"id":12,"question":"chords/B3_Dsharp3_Fsharp3_A3.mid.mp3","answer":"Dominant","categories":["Dominant"],"selfSufficient":true},{"id":13,"question":"chords/Bsharp3_Dsharpsharp3_Fsharpsharp3_Asharp3.mid.mp3","answer":"Dominant","categories":["Dominant"],"selfSufficient":true}, {"id":0,"question":"chords/C3_Eb3_Gb3_Bbb3.mid.mp3","answer":"Diminished","categories":["Diminished"],"selfSufficient":true},{"id":1,"question":"chords/Csharp3_E3_G3_Bb3.mid.mp3","answer":"Diminished","categories":["Diminished"],"selfSufficient":true},{"id":2,"question":"chords/D3_F3_Ab3_Cb3.mid.mp3","answer":"Diminished","categories":["Diminished"],"selfSufficient":true},{"id":3,"question":"chords/Dsharp3_Fsharp3_A3_C3.mid.mp3","answer":"Diminished","categories":["Diminished"],"selfSufficient":true},{"id":4,"question":"chords/E3_G3_Bb3_Db3.mid.mp3","answer":"Diminished","categories":["Diminished"],"selfSufficient":true},{"id":5,"question":"chords/Esharp3_Gsharp3_B3_D3.mid.mp3","answer":"Diminished","categories":["Diminished"],"selfSufficient":true},{"id":6,"question":"chords/F3_Ab3_Cb3_Ebb3.mid.mp3","answer":"Diminished","categories":["Diminished"],"selfSufficient":true},{"id":7,"question":"chords/Fsharp3_A3_C3_Eb3.mid.mp3","answer":"Diminished","categories":["Diminished"],"selfSufficient":true},{"id":8,"question":"chords/G3_Bb3_Db3_Fb3.mid.mp3","answer":"Diminished","categories":["Diminished"],"selfSufficient":true},{"id":9,"question":"chords/Gsharp3_B3_D3_F3.mid.mp3","answer":"Diminished","categories":["Diminished"],"selfSufficient":true},{"id":10,"question":"chords/A3_C3_Eb3_Gb3.mid.mp3","answer":"Diminished","categories":["Diminished"],"selfSufficient":true},{"id":11,"question":"chords/Asharp3_Csharp3_E3_G3.mid.mp3","answer":"Diminished","categories":["Diminished"],"selfSufficient":true},{"id":12,"question":"chords/B3_D3_F3_Ab3.mid.mp3","answer":"Diminished","categories":["Diminished"],"selfSufficient":true},{"id":13,"question":"chords/Bsharp3_Dsharp3_Fsharp3_A3.mid.mp3","answer":"Diminished","categories":["Diminished"],"selfSufficient":true}]

type QuestionType = {
  id: number
  question: string
  answer: string
  categories: string[]
  selfSufficient: boolean
}

type ConfigType = {
  timePerQuestion: number
  amountOfPossibleVariations: number
  amountOfSuggestions: number
  listOfCategories: string
}

function App() {
  // mantém um valor enquanto as dependências não são modificadas
  const shuffleDataset = useRef(0)

  const dataset = useMemo(() => {
    return fisherYates(ds)
  }, [shuffleDataset])

  const allPossibleAnswers = useMemo(() => {
    return getListFromObjectsAttr(dataset, 'answer')
  }, [])

  const [questions, setQuestions] = useState(fisherYates(dataset))
  const [result, setResult] = useState(false)
  const [wasGivenAnswer, setWasGivenAnswer] = useState(false)
  const [answer, setAnswer] = useState('')
  const [timerKey, setTimerKey] = useState(0)
  const [isInitialConfigOpened, setIsInitialConfigOpened] = useState(true)
  const [questionDate, setQuestionDate] = useState(new Date())
  const [currentConfig, setCurrentConfig] = useState({
    timePerQuestion: 30,
    amountOfPossibleVariations: 2,
    amountOfSuggestions: 3,
    listOfCategories: "Intervalo, Going up, Going down, Major, Major 7M, Minor, Minor 7M, Dominant, Diminished"
  })
  const askedQuestions = useRef<string[]>([])
  const currentQuestion = useRef<QuestionType>()
  const [playedMatches, setPlayedMatches] = useState(0)
  const [points, setPoints] = useState(0)
  const [performance, setPerformance] = useState(0)
  const [record, setRecord] = useState(0)

  const usedTips = useRef(0)

  const totalOfSelfSufficients = useMemo(() => {
    let total = 0
    let splittedListOfCategories = currentConfig.listOfCategories.split(',')
    for (let i = 0; i < dataset.length; i++) {
      if (dataset[i].selfSufficient && atLeastOneInList(dataset[i].categories, splittedListOfCategories))
        total++
    }
    return total
  }, [currentConfig])

  useEffect(() => {
    let storedRecord = localStorage.getItem('record')
    if (!storedRecord) {
      setRecord(0)
    } else {
      setRecord(JSON.parse(storedRecord))
    }

    // let storedConfig = localStorage.getItem('config')
    // if (storedConfig) {
    //   setCurrentConfig(JSON.parse(storedConfig))
    // }
  }, [])

  useEffect(() => {
    if (points > record) {
      localStorage.setItem('record', points.toString())
      setRecord(points)
    }
  }, [points])

  const handleResetTime = () => {
    setTimerKey(timerKey + 1)
  }

  const handleMessageGivenResult = () => {
    if (!wasGivenAnswer) return

    if (result) {
      return 'You are correct!'
    } else {
      return `Oops! The answer was "${currentQuestion.current!.answer}"!`
    }
  }

  const calculatePerformance = (): number => {
    if (playedMatches === 0) return 0

    return Math.round((points / (playedMatches * 10)) * 100)
  }

  const handleNext = () => {
    if (wasGivenAnswer) {
      usedTips.current = 0
      setWasGivenAnswer(false)
      handleResetTime()
      setAnswer('')
      setQuestionDate(new Date())
      setPerformance(calculatePerformance())
    }
  }

  const handleUserAnswer = (answer: string) => {
    if (!currentQuestion.current) return

    setPlayedMatches(currentPlayedMatches => {
      return playedMatches + 1
    })

    askedQuestions.current.push(currentQuestion.current.question)

    setWasGivenAnswer(true)
    if (normalizeString(answer) === normalizeString(currentQuestion.current.answer)) {
      soundEffect('right')
      setResult(true)
      setPoints(currentPoints => {
        return currentPoints + 10 - usedTips.current
      })
    } else {
      soundEffect('wrong')
      setResult(false)
    }
  }

  const defineListOfQuestions = (): QuestionType[] => {
    let end = false, splittedListOfCategories = currentConfig.listOfCategories.split(',')
    let randomQuestion: QuestionType = questions[0]

    if (askedQuestions.current.length >= totalOfSelfSufficients)
      askedQuestions.current = []

    while(!end) {
      randomQuestion = randomFromList(questions)
      if (randomQuestion.selfSufficient && atLeastOneInList(randomQuestion.categories, splittedListOfCategories) && !inList(randomQuestion.question, askedQuestions.current))
        end = true
    }

    currentQuestion.current = randomQuestion

    let finalResult = []
    finalResult.push(randomQuestion)

    let inserted = 0
    for (let i = 0; i < dataset.length; i++) {
      if (randomQuestion.answer === dataset[i].answer && atLeastOneInList(dataset[i].categories, splittedListOfCategories) && dataset[i].id !== randomQuestion.id) {
        finalResult.push(dataset[i])
        inserted++
      }

      if (inserted >= currentConfig.amountOfPossibleVariations)
        break;
    }

    return finalResult
  }

  const handlePlay = (config: ConfigType) => {
    setCurrentConfig(config)
    // localStorage.setItem('config', JSON.stringify(config))
    setIsInitialConfigOpened(false)
    setQuestionDate(new Date())
  }
  
  const updateConfig = (changes: any) => {
    setCurrentConfig(prevCurrentConfig => ({ ...prevCurrentConfig, ...changes }))
  }

  return (
    <div className="container">
      {
        isInitialConfigOpened &&
        <InitialConfig
          onPlay={handlePlay}
          config={currentConfig}
          updateConfig={updateConfig}
        />
      }
      {
        !isInitialConfigOpened &&
        <>
          <Menu
            handleNext={handleNext}
            setIsInitialConfigOpened={setIsInitialConfigOpened}
            points={points}
            performance={performance}
            playedMatches={playedMatches}
            record={record}
          />

          {wasGivenAnswer &&
            <div className="resultMessage">
              {handleMessageGivenResult()}
            </div>
          }


          {!wasGivenAnswer &&
            <>
              <Timer
                initialDate={questionDate}
                limit={currentConfig.timePerQuestion}
                onTimeout={handleUserAnswer}
              />
              <Question
                defineListOfQuestions={defineListOfQuestions}
                usedTips={usedTips}
              />
              <UserInputs
                allPossibleAnswers={allPossibleAnswers}
                amountOfSuggestions={currentConfig.amountOfSuggestions}
                onAnswerSend={handleUserAnswer}
              />
            </>
          }
        </>
      }


    </div>
  )
}

type UserInputsProps = {
  allPossibleAnswers: string[]
  amountOfSuggestions: number,
  onAnswerSend: (answer: string) => void
}

function UserInputs({allPossibleAnswers, amountOfSuggestions, onAnswerSend}: UserInputsProps) {
  const [answer, setAnswer] = useState('')
  const suggestionsVisibility = useRef('none')

  const createSuggestions = () => {
    let suggestions = []
    let ignore = []

    for (let i = 0; i < amountOfSuggestions; i++) {
      // *ordenar as distâncias
      const currentSuggestion = closestElement(answer, allPossibleAnswers, ignore)
      suggestions.push(currentSuggestion)
      ignore.push(currentSuggestion)
    }

    suggestionsVisibility.current = 'flex'

    return suggestions
  } 

  const handleAnswerChange = (e: any) => {
    setAnswer(e.target.value)
  }

  const handleSuggestionSelect = (suggestion: string) => {
    setAnswer(suggestion)
  }

  const handleAnswerSend = () => {
    onAnswerSend(answer)
  }

  return (
    <>
      <div className="suggestions" style={{display: suggestionsVisibility.current}}>
        <Suggestions
          listOfSuggestions={createSuggestions()}
          onSuggestionSelect={handleSuggestionSelect} 
        />
      </div>
      <Answer
        onSend={handleAnswerSend}
        onChange={handleAnswerChange}
        answer={answer}
      />
    </>
  )
}

type InitialConfigProps = {
  onPlay: (config: ConfigType) => void
  updateConfig: (changes: any) => void
  config: ConfigType
}

function InitialConfig({onPlay, updateConfig, config}: InitialConfigProps) {
  return (
    <div className="initialConfig">
      <h1>Music Quiz</h1>
      <h2>Configuration</h2>
      <label htmlFor="timePerQuestion">Time per question (in seconds): </label>
      <input onChange={(e) => updateConfig({timePerQuestion: e.target.value})} type="number" id="timePerQuestion" defaultValue={config.timePerQuestion}/>
      <label htmlFor="amountOfPossibleVariations">Amount of possible variations: </label>
      <input onChange={(e) => updateConfig({amountOfPossibleVariations: e.target.value})} type="number" id="amountOfPossibleVariations" defaultValue={config.amountOfPossibleVariations}/>
      <label htmlFor="amountOfSuggestions">Amount of suggestions:</label>
      <input onChange={(e) => updateConfig({amountOfSuggestions: e.target.value})} type="number" id="amountOfSuggestions" defaultValue={config.amountOfSuggestions}/>
      <label htmlFor="includedCategories">Included categories: </label>
      <textarea onChange={(e) => updateConfig({listOfCategories: e.target.value})} style={{height: "100px"}} spellCheck="false" id="includedCategories" defaultValue={config.listOfCategories}></textarea>  

      <button onClick={ () => onPlay(config) }>Play</button>
    </div>
  )
}

type MenuProps = {
  handleNext: () => void
  setIsInitialConfigOpened: (isInitialConfigOpened: boolean) => void
  playedMatches: number
  points: number
  performance: number
  record: number
}

function Menu({handleNext, setIsInitialConfigOpened, playedMatches, points, performance, record}: MenuProps) {
  return (
    <div className="menu">
      <button onClick={ () => { setIsInitialConfigOpened(true) }}><i className="bi bi-gear"></i></button>
      <button>{playedMatches} <i className="bi bi-check-all"></i></button>
      <button>{points} <i className="bi bi-star"></i></button>
      <button>{performance} <i className="bi bi-percent"></i></button>
      <button>{record} <i className="bi bi-award"></i></button>
      <button onClick={ handleNext }><i className="bi bi-arrow-right"></i></button>
    </div>
  )
}

function Slider({elements, usedTips}: any) {
  const [activeElement, setActiveElement] = useState(0)
  const [activeBulletPoint, setActiveBulletPoint] = useState(0)

  const getActiveElement = () => {
    return elements[activeElement]
  }

  const updateActiveElement = (e: any) => {
    usedTips.current++
    let newIndex = parseInt(e.target.getAttribute('id'))
    setActiveElement(newIndex)
    setActiveBulletPoint(newIndex)
  }

  const getControls = () => {
    return elements.map((element: any, index: number) => {
      if (index === activeBulletPoint) {
        return <div key={index} id={index.toString()} onClick={updateActiveElement} style={{width: '1rem', height: '1rem', borderRadius: '50%', backgroundColor: '#fff', cursor: 'pointer', marginRight: '1rem'}}></div>
      } else {
        return <div key={index} id={index.toString()} onClick={updateActiveElement} style={{width: '1rem', height: '1rem', borderRadius: '50%', backgroundColor: '#555', cursor: 'pointer', marginRight: '1rem'}}></div>       
      }
    })
  }

  return (
    <div className="question">
      {getActiveElement()}
      <div className="controls" style={{display: 'flex', justifyContent: 'center', alignItems: 'center', marginTop: '2rem'}}>
        {elements.length > 1 ? getControls() : ''}
      </div>
    </div>
  )
}

type QuestionProps = {
  defineListOfQuestions: () => QuestionType[]
  usedTips: any
}

function Question({ defineListOfQuestions, usedTips }: QuestionProps) {
  const listOfQuestions = defineListOfQuestions()

  if (!listOfQuestions) return <div></div>

  const questionType = (currentQuestion: QuestionType) => {
    if (currentQuestion.question.search('jpg') !== -1 || currentQuestion.question.search('png') !== -1) {
      return <img key={generateUniqueKey()} src={currentQuestion.question}/>
    } else if (currentQuestion.question.search('mp3') !== -1 || currentQuestion.question.search('ogg') !== -1) {
      return (
        <audio key={generateUniqueKey()} controls={true}>
          <source src={currentQuestion.question} type="audio/ogg"/>
          <source src={currentQuestion.question} type="audio/ogg"/>
          Your browser doesn't support the audio tag.
        </audio>
      )
    } else {
      return <div className="textualQuestion" key={generateUniqueKey()}>{currentQuestion.question}</div>
    }
  }

  const createElements = () => {
    return listOfQuestions.map(currentQuestion => {
      return questionType(currentQuestion)
    })
  }

  return (
    <Slider elements={createElements()} usedTips={usedTips}/>
  )
}

type SuggestionsProps = {
  listOfSuggestions: string[]
  onSuggestionSelect: (suggestion: string) => void
}

function Suggestions({listOfSuggestions, onSuggestionSelect}: SuggestionsProps) {
  return (
    <>
    {
      listOfSuggestions.map((suggestion, index) => {
        return <div key={index} onClick={ () => onSuggestionSelect(suggestion)}>{suggestion}</div>
      })
    }
    </>
  )
}

type AnswerProps = {
  onSend: () => void
  onChange: (e: any) => void
  answer: string
}

function Answer({onSend, onChange, answer}: AnswerProps) {
  return (
    <div className="answer">
      <input onChange = {onChange} value={answer} type="text" placeholder="Answer"/>
      <button onClick={ () => onSend() }><i className="bi bi-send"></i></button>
    </div>
  )
}

type TimerProps = {
  initialDate: Date
  limit: number,
  onTimeout: (answer: string) => void
}

function Timer({initialDate, limit, onTimeout}: TimerProps) {
  const [remainingTime, setRemainingTime] = useState(limit)

  useEffect(() => {
    const interval = setInterval(() => {
      let now = new Date()
      let newRemainingTime = Math.ceil(limit - ((now.getTime() - initialDate.getTime()) / 1000))
      if (newRemainingTime <= 0) {
        onTimeout('')
        clearInterval(interval)
      } else {
        setRemainingTime(newRemainingTime)
      }
    }, 100)

    return () => clearInterval(interval)
  }, [initialDate, remainingTime])

  return <div className="timer">{remainingTime} <i className="bi bi-hourglass-split"></i></div>
}

export default App