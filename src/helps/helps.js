export function findObjectById(arr, id) {
  for (let i = 0; i < arr.length; i++) {
    if (arr[i]._id == id) {
      return i
    }
  }
  return false; // Agar obyekt topilmagan bo'lsa false qaytariladi
}

export function updateObjectAtIndex(arr, index, newObj) {
  if (index >= 0 && index < arr.length) {
    arr[index] = newObj;
  }
  return arr;
}

export function removeObjectAtIndex(arr, index) {
  if (index >= 0 && index < arr.length) {
    arr.splice(index, 1);
  }
  return arr;
}



export function paginateArray(n, arr) {
    var result = [];
    var i = 0;
  
    while (i < arr.length) {
      result.push(arr.slice(i, i + n));
      i += n;
    }
  
    return result;
  }
  
 export function generateArray(n) {
    var result = [];
    for (var i = 1; i <= n; i++) {
      result.push(i);
    }
    return result;
  }

export function getNumsFromString(str) {
  if (str === "all") {
    return { $gt: 0, $lt: 1000 }
  } else {
    let nums = str.split("-");
    let num1 = parseInt(nums[0]);
    let num2 = parseInt(nums[1]);
    return { $gt:num1, $lt:num2 };
  }
}
// const result = stringToNumbers("123", "456");
// console.log(result); // { num1: 123, num2: 456 }
export function gender(_gender){
  if(_gender == "all"){
      return ["ayollar", "erkaklar", "bolalar"]
  }else{
      return [_gender]
  }
}

export  function size(_size){
  if(_size == "all"){
    return ["katta", "ortacha", "kichik"]
  }else{
    return [_size]
  }
}

export function type(_type){
  if(_type == "all"){
    return ["accessories",
    "shoes_clothes",
    "bags",
    "underwear",
    'loincloths',
    "headwear",
    "outerwear",
    "all_my_clothes",
    "total_formal_wear",
    "total_sportswear",
    "total_style_clothes",
    "total_household_clothes",
    "total_work_clothes"]
  }else{
    return [_type]
  }
}


