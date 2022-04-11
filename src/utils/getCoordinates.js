export const getCoordinates = (str) => {
  const firstCoord = [ ...str ].findIndex((i) => i === '(');
  const coordinates = [ ...str ]
    .slice(firstCoord)
    .join('')
    .replace(/\s/g, '')
    .split(')(')
    .map((i) => i.replace(/\(/g, '').replace(/\)/g, '').split(','));

  return coordinates;
};
