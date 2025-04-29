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

    document.querySelectorAll('.book-result').forEach(bookCard => {
        bookCard.addEventListener('click', () => {
          const bookId = bookCard.getAttribute('data-id');
          window.open(`bookDetails.html?bookId=${bookId}`, '_parent');
        });
      });
    }
  
  document.addEventListener('click', (event) => {
      const searchBox = document.getElementById('search-box');
      const resultContainer = document.getElementById('result-container');
      if (!searchBox.contains(event.target) && !resultContainer.contains(event.target)) {
        resultContainer.style.display = 'none'; 
      } else {
        resultContainer.style.display = 'block'; 
      }
    });
    document.addEventListener('click', (event) => {
        const searchBox = document.getElementById('search-box');
        const resultContainer = document.getElementById('result-container');
        if (!searchBox.contains(event.target) && !resultContainer.contains(event.target)) {
          resultContainer.style.display = 'none'; 
        } else {
          resultContainer.style.display = 'block'; 
        }
      });
      
      function getBookName(button) {
        const box = button.closest(".box"); 
            const bookNameElement = box.querySelector(".book-name");
        const searchBox = document.getElementById("search-box");
        
        if (bookNameElement && searchBox) {
            const bookNameText = bookNameElement.textContent || bookNameElement.innerText;
    
            searchBox.value = bookNameText;
    
            const inputEvent = new Event("input", { bubbles: true });
            searchBox.dispatchEvent(inputEvent);
        } else {
            console.error("Book name or search box not found.");
        }
    }
    
    const cartIconBtn = document.querySelector(".cartIcon-btn");
    const cartItemsContainer = document.querySelector('#cart-items tbody');
    const cartCountDisplay = document.querySelector('.cart-count');
    const totalAmountDisplay = document.getElementById('total-amount');
    const closeCartButton = document.getElementById('close-cart');
    const checkoutButton = document.getElementById('checkout');
    const shoppingCart = document.querySelector('.shopping-cart');
    const cartIcon = document.getElementById('cart-icon');
    
    let cartCount = 0;
    let totalAmount = 0;
    
    cartIconBtn.addEventListener('click', () => {
        openCart();
    });
    
    cartIcon.addEventListener('click', () => {
        openCart();
    });
    