export function infos(err, result){
    if (err) {
      console.error(err);
      // Handle the error here
    } else {
      console.log(result);
      // Handle the successful result here
    }
  }
  export function notice_id(arr){
    let newarr = [];
    arr.forEach(e => {
      newarr.push(e.goods_id)
    })
    return newarr
  }
export function mainpage_id(arr){
  for(let i = 0; i <= arr.length - 1; i++){
    if(arr[i].main){
      return arr[i]
    }
  }
  return false
}

export function searchtext(str) {
  let caregories = ["ayollar", "erkaklar", "bolalar"];
  for(let i = 0; i <= 2; i++){
    if (str.includes(caregories[i])) {
      return caregories[i];
    }
  }
      return "all"; // yoki qaytariyadigan qanday bo'lishi kerak bo'lsa uni qaytaring
}

// export function ifany(arr){
//   for(let i = 0; i <= arr.length - 1; i++){
//     if(arr[i].main){
//       return true
//     }
//   }
//   return false
// }