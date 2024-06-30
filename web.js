// Add event listener to each "Add to Cart" button
document.querySelectorAll(".products button").forEach((button) => {
  button.addEventListener("click", () => {
    // Simulate adding to cart functionality
    alert("Product added to cart!");
  });
});
