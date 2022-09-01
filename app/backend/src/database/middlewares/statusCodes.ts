const statusByErrorJoi: { [name: string]: number } = {
  'any.required': 400,
  'string.empty': 400,
  'string.min': 400,
  'number.min': 400,
  'string.email': 400,
};

export default statusByErrorJoi;
