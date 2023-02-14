const paginate = (itemsPerPage, data) => {
  const numberOfPages = Math.ceil(data.length / itemsPerPage);

  const newData = Array.from({ length: numberOfPages }, (_, index) => {
    const start = index * itemsPerPage;
    return data.slice(start, start + itemsPerPage);
  });
  return newData;
};

export default paginate;
