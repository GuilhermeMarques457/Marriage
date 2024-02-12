export function formatarData(data) {
  const dataObj = new Date(data);

  // Verifique se a data é válida antes de formatar
  if (isNaN(dataObj.getTime())) {
    console.error('Data inválida!');
    return null; // Ou você pode lançar uma exceção ou retornar um valor padrão, dependendo da sua lógica
  }

  const ano = dataObj.getFullYear();
  const mes = String(dataObj.getMonth() + 1).padStart(2, '0');
  const dia = String(dataObj.getDate()).padStart(2, '0');

  return `${ano}-${mes}-${dia}`;
}
