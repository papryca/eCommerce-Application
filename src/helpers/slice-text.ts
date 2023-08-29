const sliceText = (text: string, maxLength: number) => {
  if (text.length <= maxLength) return text;
  const slicedText = `${text.slice(0, maxLength - 3)}...`;
  return slicedText;
};

export default sliceText;
