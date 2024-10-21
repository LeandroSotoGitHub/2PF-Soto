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