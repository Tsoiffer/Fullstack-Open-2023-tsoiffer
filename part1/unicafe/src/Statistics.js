export const Statistics = ({ good, neutral, bad }) => {
	const all = good + bad + neutral;
	const average = all === 0 ? 0 : (good - bad) / all;
	const positive = all === 0 ? 0 : (good / all) * 100;
	if (all === 0) {
		return (
			<>
				<h1>statics</h1>
				<p>No feedback given</p>
			</>
		);
	}
	return (
		<>
			<h1>statics</h1>
			<p>good {good}</p>
			<p>neutral {neutral}</p>
			<p>bad {bad}</p>
			<p>all {all}</p>
			<p>average {average}</p>
			<p>positive {positive}%</p>
		</>
	);
};
