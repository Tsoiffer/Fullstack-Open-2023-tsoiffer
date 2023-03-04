const Countries = ({ countries }) => {
	return countries.map((countrie) => (
		<p key={countrie.name}>{countrie.name} </p>
	));
};
export default Countries;
