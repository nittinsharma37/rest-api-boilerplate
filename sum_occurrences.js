
function sum(a, b){
  return new Promise((resolve, reject)=>{
    if(typeof a === "number" && typeof b === "number"){
      resolve(a + b);
    }else{
      reject(new Error("both the parameters are not numbers"));
    }
  });
}

sum(2, 7).then((result)=> console.log("sum is : ", result)).catch((error)=>{
  console.error("error occurred : ", error);
});


const array = [10, 20, 30, 30, 70, 30, 30, 20, 30, 40];


function countOccurrences(arr){
  const occurrences = {};
  arr.forEach((num)=> {
    occurrences[num] = (occurrences[num] || 0) + 1;
  });

  return occurrences;

}

let  occurrencesResult = countOccurrences(array);

console.log("occurrences : ", occurrencesResult);

function removeDuplicates(arr){
  return [...new Set(arr)];
}

let removedDuplicates = removeDuplicates(array);

console.log("Removed duplicates : ", removedDuplicates)
