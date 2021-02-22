export const constructQuery = type => {
  const tempArray = [];
  const selected = type.map(item => item.type);
  if (selected.length > 1) {
    selected.map(i => {
      tempArray.push('or');
      tempArray.push(`tipo = '${i}'`);
    }) 
  } else {
    selected.map(i => {
      tempArray.push(`tipo = '${i}'`);
    }) 
  }
  if (tempArray.length !== 0 ) {
    tempArray.unshift('where')
  }
  if (tempArray.length > 3) {
    const index = tempArray.indexOf('or');
    if (index > -1) {
      tempArray.splice(index, 1);
    }
  }
  return tempArray.join().replaceAll(',', ' ');
};

export const getPercentages = items => {
  const total = items.reduce((u, v) => u + v.numbers, 0);
  const percentages = items.map(i => {
    const toRound = (i.numbers / total) * 100;
    return Math.round(toRound * 100) / 100;
  });
  return percentages;
}

