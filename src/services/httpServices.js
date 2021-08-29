import axios from 'axios';

export async function getAll(url) {
  const { data } = await axios.get(url);
  return data;
}

export async function exclude(url) {
  console.log('deletando....', url);
  await axios.delete(url);
}

export async function create(url, object) {
  console.log('criando....', url, '    \n objeto: ', object);
  return await axios.post(url, object);
}

export async function edit(url, object) {
  console.log('editando....', url, '    \n objeto: ', object);
  return await axios.put(url, object);
}
