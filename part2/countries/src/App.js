import axios from "axios";
import { useState, useEffect } from "react";
import Countries from "./Countries";
import Countrie from "./Countrie";
function App() {
	const [nameCountrie, setNameCountrie] = useState("");
	const [countries, setCountries] = useState([]);
	const urlAPI =
		nameCountrie.length === 0
			? "https://restcountries.com/v2/all"
			: "https://restcountries.com/v2/name/" + nameCountrie;
	const promeise = axios.get(urlAPI);
	useEffect(() => {
		promeise.then((response) => {
			setCountries(response.data);
		});
	}, [urlAPI]);

	const handleChange = (event) => {
		setNameCountrie(event.target.value);
	};

	return (
		<div>
			<form>
				find countries
				<input value={nameCountrie} onChange={handleChange} />
			</form>
			{countries.length > 10 ? (
				<p>Too many matches, specefy another filter</p>
			) : countries.length === 1 ? (
				<Countrie countrie={countries} />
			) : (
				<Countries countries={countries} />
			)}
		</div>
	);
}

export default App;
