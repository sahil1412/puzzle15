import checkSolvable from './isSolvable'
export default function shuffleArray(setSolvable) {
//let array= [ 1,2,3,4,5,6,7,8,9,10,11,12,13,14,0,15]
   let array = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15,0];
    for (let i = array.length - 1; i > 0; i--) {
        let j = Math.floor(Math.random() * (i + 1));
        [array[i], array[j]] = [array[j], array[i]];
    }
   if(!checkSolvable(array))
   setSolvable(false)
   else
   setSolvable(true)
    return array ;
    }
    