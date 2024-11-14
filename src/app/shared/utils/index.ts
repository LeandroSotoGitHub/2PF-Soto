let existingIds: number[] = [];

export function generateUniqueId(): number {
  let newId = Math.floor(Math.random() * 9000) + 1000;

  // Sigue generando un nuevo ID mientras ya exista en el array
  while (existingIds.includes(newId)) {
    newId = Math.floor(Math.random() * 9000) + 1000;
  }

  // Almacena el ID una vez que es único
  existingIds.push(newId);
  return newId;
}


export function generateToken(length: number = 16): string {
  const characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
  let token = '';
  for (let i = 0; i < length; i++) {
    token += characters.charAt(Math.floor(Math.random() * characters.length));
  }
  return token;
}