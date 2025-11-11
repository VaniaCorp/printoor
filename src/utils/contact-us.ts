export const handleContactUs = () => {
  const phone = "2349167633186";
  const message = encodeURIComponent(
    "Hello Printoor, I'm ready to place an order for branded T-shirts. Please share pricing and delivery details."
  );

  const url = `https://api.whatsapp.com/send?phone=${phone}&text=${message}`;

  window.open(url, "_blank");
};
