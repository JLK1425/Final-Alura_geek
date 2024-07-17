import { servicesProducts } from "../services/product_services.js";

// Obtener los contenedores de datos
const productContainer = document.querySelector("[data-lista]"); // Selecciona el contenedor de los productos
const form = document.querySelector("[data-form]");

// Crea la tarjeta para el producto
function createCard(nombre, precio, imagen, id) {
    const card = document.createElement("div"); // Crea el div
    card.classList.add("product"); // Le agrega la clase products al div
    card.innerHTML = `
    <img class="remove-bg" src="${imagen}" alt="${nombre}">
    <div class="product_info">
        <div class="description">
            <h3>${nombre}</h3>
            <h4>$ DOP ${precio} </h4>
        </div>
        <img class="delete_button" src="assets/delete_icon.svg" alt="Eliminar">
    </div>
    `;

    // Añadimos el evento de eliminar un producto a través del icono 
    const deleteButton = card.querySelector(".delete_button");
    deleteButton.addEventListener("click", () => {
        servicesProducts.deleteProduct(id)
            .then(() => {
                card.remove();
            })
            .catch(err => console.log(err));
    });

    productContainer.appendChild(card);
    return card;
}

// Lista los productos en la página 
const render = async () => {
    try {
        const listProducts = await servicesProducts.fetchProductList();
        listProducts.forEach(products => {
            productContainer.appendChild(
                createCard(
                    products.nombre,
                    products.precio,
                    products.imagen,
                    products.id
                )
            );
        });
    } catch (error) {
        console.log(error);
    }
};

// Añadimos el evento de enviar datos de un nuevo producto
form.addEventListener("submit", (event) => {
    event.preventDefault();

    const name = document.querySelector("[data-nombre]").value;
    const price = document.querySelector("[data-precio]").value;
    const image = document.querySelector("[data-image]").value;

    servicesProducts.createProducts(nombre, precio, image)
        .then((res) => {
            console.log(res);
        })
        .catch((err) => console.log(err));
});

render();
