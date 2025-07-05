export const validarCNPJ = (cnpj) => {
  if (!cnpj) return false;

  const cleaned = cnpj.replace(/\D/g, "");
  if (cleaned.length !== 14) return false;
  if (/^(\d)\1+$/.test(cleaned)) return false;

  return true;
};

export const validarEmail = (email) => {
  if (!email) return false;

  const regex = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/i;
  return regex.test(email);
};

export const validarCPF = (cpf) => {
  if (!cpf) return false;

  const cleaned = cpf.replace(/\D/g, "");
  return cleaned.length === 11;
};

export const validarTelefone = (telefone) => {
  if (!telefone) return false;

  const cleaned = telefone.replace(/\D/g, "");
  return cleaned.length >= 10 && cleaned.length <= 11;
};

export const validarNome = (nome) => {
  if (!nome) return false;

  return nome.trim().length > 0;
};

export const validarRazaoSocial = (razaoSocial) => {
  if (!razaoSocial) return false;

  return razaoSocial.trim().length > 0;
};

export const validarSenha = (senha) => {
  if (!senha) return false;

  return senha.length >= 8;
};

export const validarDataNascimento = (dataDigitada) => {
  if (!dataDigitada)
    return {
      valido: false,
      mensagem: "Data de Nascimento é um campo obrigatório",
    };

  const regex = /^(\d{2})\/(\d{2})\/(\d{4})$/;
  const match = dataDigitada.match(regex);

  if (!match) {
    return { valido: false, mensagem: "Formato inválido. Use dd/mm/aaaa" };
  }

  const dia = parseInt(match[1], 10);
  const mes = parseInt(match[2], 10) - 1;
  const ano = parseInt(match[3], 10);

  const data = new Date(ano, mes, dia);

  if (
    data.getFullYear() !== ano ||
    data.getMonth() !== mes ||
    data.getDate() !== dia
  ) {
    return { valido: false, mensagem: "Data inválida" };
  }

  const hoje = new Date();

  let idade = hoje.getFullYear() - data.getFullYear();
  const mesAtualMenosData = hoje.getMonth() - data.getMonth();
  const diaAtualMenosData = hoje.getDate() - data.getDate();

  if (
    mesAtualMenosData < 0 ||
    (mesAtualMenosData === 0 && diaAtualMenosData < 0)
  ) {
    idade--;
  }

  if (idade < 16 || idade > 90) {
    return { valido: false, mensagem: "Idade deve estar entre 16 e 90 anos" };
  }

  return { valido: true, mensagem: "" };
};

export const validarDataAbertura = (data) => {
  if (!data) return false;

  const regex = /^(\d{2})\/(\d{2})\/(\d{4})$/;
  const match = data.match(regex);

  if (!match) return false;

  const dia = parseInt(match[1], 10);
  const mes = parseInt(match[2], 10) - 1;
  const ano = parseInt(match[3], 10);

  const dataObj = new Date(ano, mes, dia);

  if (
    dataObj.getFullYear() !== ano ||
    dataObj.getMonth() !== mes ||
    dataObj.getDate() !== dia
  ) {
    return false;
  }

  return true;
};
