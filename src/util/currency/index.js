const currency = () => {
  const input = (number) => {
    return new Intl.NumberFormat().format(number);
  };

  const currency = (number) => {
    return new Intl.NumberFormat("id-ID", {
      style: "currency",
      currency: "IDR",
      minimumFractionDigits: 0,
    }).format(number);
  };

  return { input, currency };
};

export default currency();
