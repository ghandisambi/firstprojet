export function getFoodFromFoodFactWithSearchedText (text,page) {
  const url  ="https://world.openfoodfacts.org/cgi/search.pl?search_terms="+text+"&search_simple=1&action=process&json=1"

  const rechercheparcode='https://world.openfoodfacts.org/api/v0/product/3392460511200.json'

  var requestOptions = {
  method: 'GET',
  redirect: 'follow'
 };

  
  
  return (fetch(url,requestOptions)
    .then((response) => response.json())
    .catch((error) => console.error(error)));
}

export function getFoodDetailFromFoodFact(id) {
  const url  ="https://world.openfoodfacts.org/api/v0/product/"+id+".json"

  const rechercheparcode='https://world.openfoodfacts.org/api/v0/product/3392460511200.json'

  var requestOptions = {
  method: 'GET',
  redirect: 'follow'
 };

  
  return (fetch(url,requestOptions)
    .then((response) => response.json())
    .catch((error) => console.error(error)));
}

