const socketClient = io();

// const productsList = document.getElementById("productsList");
// const productForm = document.getElementById("productForm");


// Boton Eliminar
// const deleteProduct = (id) => {
// 	socketClient.emit("deleteProduct", id);
// };

// Esucha evento de eliminar producto
// socketClient.on("deletedProduct", (id) => {
// 	window.location.reload()
// 	const fila = document.getElementById(`product${id}`);
// 	productsList.removeChild(fila);
// });

// Evento del formulario - Agregar producto
// productForm.addEventListener("submit", async (e) => {
// 	e.preventDefault();

// 	const title = document.getElementById("title").value;
// 	const description = document.getElementById("description").value;
// 	const code = document.getElementById("code").value;
// 	const category = document.getElementById("category").value;
// 	const stock = document.getElementById("stock").value;
// 	const price = document.getElementById("price").value;

// 	const product = {
// 		title,
// 		description,
// 		code,
// 		price,
// 		stock,
// 		category,
// 	};

// 	// Emite evento de nuevo producto
// 	socketClient.emit("newProduct", product);

// 	productForm.reset();
// });


// Escucha evento de nuevo producto
socketClient.on("addedProduct", () => {
	window.location.reload()

});