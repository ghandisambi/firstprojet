
export function getFoodFromApiWithSearchedText (text,page) {
  const url  ='https://api.nutritionix.com/v1_1/search/'+text+'?appId=6ffc2ecb&appKey=438c9eaca701cfda865c4d35a8482bd4'
  
  const url2="https://world.openfoodfacts.org/cgi/search.pl?search_terms="+text+"&search_simple=1&action=process&json=1"

  var requestOptions = {
  method: 'GET',
  redirect: 'follow'
 };

  
  
  return (fetch(url2,requestOptions)
    .then((response) => response.json())
    .catch((error) => console.error(error)));
}


export function getImageFromApi(name){
  
  const api='https://d2eawub7utcl6.cloudfront.net/images/nix-apple-grey.png'
    return api+name;
}


export function getImage(){
  const api='https://d2eawub7utcl6.cloudfront.net/images/nix-apple-grey.png'
    return api;
}


