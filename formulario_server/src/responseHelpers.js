function badRequest(res, message = "Requisição inválida.") {
  return res.status(400).json({
    success: false,
    message,
  });
}

function created(res, message = "Cadastro realizado com sucesso.") {
  return res.status(201).json({
    success: true,
    status: 201,
    message,
  });
}

module.exports = {
  badRequest,
  created,
};
