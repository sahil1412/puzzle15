// Game.js
import { useEffect, useRef, useState } from "react";
import shuffleArray from "./shufflefunction";
import Puzzle from "./Puzzle";
import solve from "./solve";
import Timer from './timer';
export default function Game() {
const [moves, setMoves] = useState(0);
const [time, setTime] = useState(0);
  const [timerActive, setTimerActive] = useState(false);
const [win, setWin] = useState(false);
const flag=useRef(true)
const [solvable,setsolve]=useState(true);
const [shuffledArray, setShuffledArray] = useState(()=>shuffleArray(setSolvable));
const [lastmove,setlastmove]=useState([-1,-2])
const [loading,setloading]=useState(false)

useEffect(() => {
	let won = true;
	if (moves === 1) setTimerActive(true);
	for (let i = 0; i < shuffledArray.length - 1; i++) {
	const value = shuffledArray[i];
	if ((value===0 && i===16) || (value!==0 && i+1===value)) continue;
	else {
		won = false;
		break;
	}
	}
	if (won) {
	setWin(true);
	setTimerActive(false);
	}
	return;
}, [moves]);
useEffect(()=>{
 setsolve(flag.current)
},[flag.current])

function setSolvable(value){
    flag.current=value
  }

const newGame = () => {
	setMoves(0);
	setTimerActive(false);
    setTime(0);
	setShuffledArray(shuffleArray(setSolvable));
	setWin(false);
};

const dragStart = (e) => e.dataTransfer.setData("tile", e.target.id);

const dragOver = (e) => e.preventDefault();

const dropped = (e) => {
	e.preventDefault();
	const tile = e.dataTransfer.getData("tile");
	const oldPlace = Number(document.getElementById(tile).parentElement.id.slice(6)) - 1;
	const newPlace = Number(e.target.id.slice(6)) - 1;

	if (!(Math.abs(oldPlace - newPlace) == 4 || Math.abs(oldPlace - newPlace) == 1)) return;

	const [i, j] = [Math.min(oldPlace, newPlace), Math.max(oldPlace, newPlace)];
	setShuffledArray([
	...shuffledArray.slice(0, i),
	shuffledArray[j],
	...shuffledArray.slice(i + 1, j),
	shuffledArray[i],
	...shuffledArray.slice(j + 1),
	]);
    setlastmove([i,j])
	setMoves(moves + 1);
};

return (
	<div className="h-screen flex text-gray-300 bg-gray-950">
	<div className="mx-auto mt-8">
		{win && (
		<div className="rounded-md border-l-4 border-green-500 bg-green-100 p-2 mb-2">
			<div className="flex items-center justify-center space-x-4">
			<p className="font-medium text-green-600">
				HURRAY!! You have won the game 
			</p>
			</div>
		</div>
		)}
{!solvable && (
		<div className="rounded-md border-l-4 border-green-500 bg-green-100 p-2 mb-2">
			<div className="flex items-center justify-center space-x-4">
			<p className="font-medium text-red-600">
				puzzle is not solvable
			</p>
			</div>
		</div>
		)}
		<h3 className="text-xl font-bold text-center bg-clip-text text-transparent bg-gradient-to-r from-indigo-500 from-10% via-sky-500 via-30% to-emerald-500 to-90%">
		15 Puzzle Game
		</h3>
		<div className="flex justify-between px-6 mt-2">
		<p>Moves: {moves}</p>
		<Timer time={time} timerActive={timerActive} setTime={setTime} />
		</div>
		<Puzzle shuffledArray={shuffledArray} dragStart={dragStart} dragOver={dragOver} dropped={dropped}/>
		<div className="px-6 mt-4 space-x-1 flex">
		<button
			onClick={newGame}
			className="text-black font-bold block bg-gray-900 p-2 rounded w-full h-full bg-gradient-to-r from-indigo-500 from-10% via-sky-500 via-30% to-emerald-500 to-90%"
		>
			New Game
		</button>
        <button
			onClick={()=>{if(!win && !loading &&  solvable){solve(shuffledArray,setShuffledArray,setloading,setMoves)}}}
			className="text-black font-bold block bg-gray-900 p-2 rounded w-full h-full bg-gradient-to-r from-indigo-500 from-10% via-sky-500 via-30% to-emerald-500 to-90%"
		>
			{loading?'calculating...':'help me'}
		</button>
		</div>
	</div>
	</div>
);
}
