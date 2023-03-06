import Weather from "./Weather";
const Countries = ({ countrie }) => {
	console.log(countrie[0]);
	const countrieSelected = countrie[0];
	return (
		<div>
			<h1>{countrieSelected.name}</h1>
			<h3>capital {countrieSelected.capital} </h3>
			<h3>populaton {countrieSelected.population} </h3>
			<h2>Lenguages</h2>
			<ul>
				{countrieSelected.languages.map((lenguage) => (
					<li key={lenguage.name}>{lenguage.name} </li>
				))}
			</ul>
			<img src={countrieSelected.flag} alt="flag" />
			<Weather countrieName={countrieSelected.name} />
		</div>
	);
};
export default Countries;
