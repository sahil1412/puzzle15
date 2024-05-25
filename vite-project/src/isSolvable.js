

function isSolvable(board) {
    // Flatten the board
    let flattenedBoard = board.reduce((acc, row) => acc.concat(row.map(value => +value)), []);

    // Find the position of the blank tile
    let positionOfBlank = board.findIndex(row => row.indexOf(0) !== -1) + 1;

    // Count inversions
    let inversionCount= flattenedBoard.map((value, i) => flattenedBoard.slice(i).filter(x => x && x < value).length).reduce((a, b) => a + b);
  
    console.log(positionOfBlank)
    // Check if the puzzle is solvable
    let flag=!((inversionCount + positionOfBlank) % 2)
    return flag;
}

const N=4

export default function checkSolvable(puzzle){
    let darr=[];
    let ind=0;
    for(let i=0;i<N;i++){
      let arr=[];
      for(let j=0;j<N;j++)
     {
      arr.push(parseInt(puzzle[ind]));
      ind++;
     }
     darr.push(arr)
    }
  //  console.log(darr)
    let fl=isSolvable(darr)
    console.log(fl,darr)
    return fl
}



