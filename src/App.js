import "./App.css";
import { useState } from "react";

function App() {
	const [word, setWord] = useState();
	const [isLoading, setIsLoading] = useState(false);
	const [synonyms, setSynonyms] = useState([]);

	const BASE_URL = `https://api.datamuse.com/`;

	const fetchRequest = (word) => {
		setIsLoading(true);
		fetch(`${BASE_URL}words?rel_syn=${word}`)
			.then((Response) => Response.json())
			.then((synonyms) => {
				setSynonyms(synonyms);
			})
			.then(() => setIsLoading(false));
	};

	const handleFetchSynonym = (e) => {
		e.preventDefault();
		fetchRequest(word);
	};

	const handleSynonymClick = (newWord) => {
		fetchRequest(newWord);
		setWord(newWord);
	};

	return (
		<div className="App">
			<form className="App-header" onSubmit={handleFetchSynonym}>
				<label htmlFor="my-word">Find Synonyms</label>
				<input
					value={word}
					onChange={(e) => setWord(e.target.value)}
					id="my-word"
				></input>
				<button className="button">Submit</button>

				{isLoading ? (
					<div>Loading...</div>
				) : (
					<ul className="myUl">
						{synonyms.map((synonym) => (
							<li
								key={synonym.word}
								onClick={() => handleSynonymClick(synonym.word)}
							>
								{synonym.word}
							</li>
						))}
					</ul>
				)}
			</form>
		</div>
	);
}

export default App;
