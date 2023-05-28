export function numproducts(num, obj){
  let n 
  if(num > 0){
    return n = obj.elnumber + 1
  }else if(num < 0 && obj.elnumber > 0){
    return n = obj.elnumber - 1
  }else{
    return false
  }
}