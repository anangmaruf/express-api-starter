const checkIfExistWithStatus = (data, res, codeStatus, message) => {
  if (data) {
    res.status(codeStatus);
    throw new Error(message);
  }
};

const responseJson = (res, data) => {
  res.json({
    status: 200,
    data
  })
}

const responseJsonError = (res, statusCode, error) => {
  return res.status(statusCode)
            .json({ type: error.name, message: error.message });
}

module.exports = {
  checkIfExistWithStatus,
  responseJson,
  responseJsonError
};
