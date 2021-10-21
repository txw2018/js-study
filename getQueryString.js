const url = 'https://www.baidu.com/s?id=123&name=why&phone=123456789';

function getQueryString(name){
  let strs = ''
  const index = url.indexOf('?')
  
  if(index === -1) return undefined

  strs = url.substring(index+1).split('&')

  for (let i = 0; i < strs.length; i++) {
    const splitItem = strs[i].split('=');
    if(splitItem[0] = name) return splitItem[1]
  }
}