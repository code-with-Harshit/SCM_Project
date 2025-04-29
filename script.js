document.getElementById('search-box').addEventListener('input', async (e) => {
	const query = e.target.value.trim();
	if (query.length > 2) {
	  try {
		const response = await fetch(`https://www.googleapis.com/books/v1/volumes?q=${encodeURIComponent(query)}`);
		const data = await response.json();
		displayResults(data.items || []);
	  } catch (error) {
		console.error("Error fetching data:", error);
	  }
	}
  });
  function displayResults(books) {
	const resultContainer = document.getElementById('result-container');
	resultContainer.innerHTML = books.map(book => {
	  const title = book.volumeInfo.title || "No Title";
	  const authors = book.volumeInfo.authors ? book.volumeInfo.authors.join(', ') : "No Authors";
	  const thumbnail = book.volumeInfo.imageLinks?.thumbnail || "https://via.placeholder.com/150";
	  const bookId = book.id;

	  return `
		<div class="book-result" data-id="${bookId}">
		  <img src="${thumbnail}" alt="${title}">
		  <h3>${title}</h3>
		  <p>${authors}</p>
		</div>`;
	}).join('');
