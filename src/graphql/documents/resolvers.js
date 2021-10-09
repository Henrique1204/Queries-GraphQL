const documents = () => ({ RG: '12.345.678-9', CPF: '987.654.321-0' });

const documentsResolvers = {
  Query: { documents },
};

export default documentsResolvers;
