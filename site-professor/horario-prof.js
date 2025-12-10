function normalizarHora(h) {
  return h.replace(/\s+/g, '').padStart(5, '0');
}

function montarQuadroHorarios(csvText) {
  const linhas = csvText.split(/\r?\n/).filter(l => l.trim() !== '');

  for (const linha of linhas) {
    const partes = linha.split(';');
    if (partes.length < 5) continue;

    const dia        = partes[0].trim();
    const turma      = partes[1].trim();
    const disciplina = partes[2].trim();
    const inicio     = normalizarHora(partes[3].trim());
    const fim        = normalizarHora(partes[4].trim());

    if (!dia || (!turma && !disciplina && !inicio && !fim)) continue;

    const intervalo = `${inicio}-${fim}`;

    const tr = document.querySelector(
      `#quadro-horarios tbody tr[data-intervalo="${intervalo}"]`
    );
    if (!tr) continue;

    const td = tr.querySelector(`td[data-dia="${dia}"]`);
    if (!td) continue;

    td.innerHTML = `
      <div>${disciplina}</div>
      <div><strong>${turma}</strong></div>
    `;
  }
}

fetch('../assets/horario/horarios.csv')
  .then(r => r.text())
  .then(text => montarQuadroHorarios(text))
  .catch(err => console.error('Erro ao carregar CSV', err));
