import React, { useState } from "react";
import ReactDOM from "react-dom";
import { Anecdote } from "./Anecdote";

const App = (props) => {
	const [selected, setSelected] = useState(0);
	const [points, setPoints] = useState({ ...new Uint8Array(6) });
	const [bestAnecdote, setBestAnecdote] = useState(0);
	const nextAnecdote = () => {
		setSelected(Math.floor(Math.random() * 6));
	};
	const voteAnecdote = () => {
		const copy = { ...points };
		copy[selected] += 1;
		checkBestAnecdote(copy);
		setPoints(copy);
	};
	const checkBestAnecdote = (points) => {
		const arrayOfPoints = Object.values(points);
		const maxVotes = Math.max(...arrayOfPoints);
		setBestAnecdote(arrayOfPoints.indexOf(maxVotes));
		return 0;
	};

	return (
		<div>
			<Anecdote
				title="Anecdote of the day"
				anecdote={props.anecdotes[selected]}
				votes={points[selected]}
			></Anecdote>

			<button onClick={voteAnecdote}>vote</button>
			<button onClick={nextAnecdote}>next anecdote</button>
			<Anecdote
				title="Anecdote with most votes"
				anecdote={props.anecdotes[bestAnecdote]}
				votes={points[bestAnecdote]}
			></Anecdote>
		</div>
	);
};

const anecdotes = [
	"If it hurts, do it more often",
	"Adding manpower to a late software project makes it later!",
	"The first 90 percent of the code accounts for the first 90 percent of the development time...The remaining 10 percent of the code accounts for the other 90 percent of the development time.",
	"Any fool can write code that a computer can understand. Good programmers write code that humans can understand.",
	"Premature optimization is the root of all evil.",
	"Debugging is twice as hard as writing the code in the first place. Therefore, if you write the code as cleverly as possible, you are, by definition, not smart enough to debug it.",
];

ReactDOM.render(<App anecdotes={anecdotes} />, document.getElementById("root"));
