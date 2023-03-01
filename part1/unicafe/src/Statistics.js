import { Statistic } from "./Statistic";
export const Statistics = ({ good, neutral, bad }) => {
	const all = good + bad + neutral;
	const average = all === 0 ? 0 : (good - bad) / all;
	const positive = all === 0 ? 0 : (good / all) * 100 + "%";
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
			<Statistic text="good" value={good}></Statistic>
			<Statistic text="neutral" value={neutral}></Statistic>
			<Statistic text="bad" value={bad}></Statistic>
			<Statistic text="all" value={all}></Statistic>
			<Statistic text="average" value={average}></Statistic>
			<Statistic text="positive" value={positive}></Statistic>
		</>
	);
};
