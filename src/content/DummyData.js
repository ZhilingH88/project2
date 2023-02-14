export const DummyData = [
  { code: "20OFF", value: 20 },
  { code: "10OFF", value: 10 },
  { code: "5OFF", value: 5 },
];

export const getDiscountValue = (code) => {
  const data = DummyData.filter((item) => item.code === code);
  return data;
};
