export const getCoordinates = (str) => {
  const firstCoord = [ ...str ].findIndex((i) => i === '(');
  const coordinates = [ ...str ]
    .slice(firstCoord)
    .join('')
    .replaceAll(' ', '')
    .split(')(')
    .map((i) => i.replaceAll('(', '').replaceAll(')', '').split(','));

  return coordinates;
};
