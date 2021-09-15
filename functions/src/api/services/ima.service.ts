import axios from 'axios';

class ImaService {

  private url = 'https://consultas.ima.sc.gov.br/consulta/consultar';

  async licenses(cnpj: string): Promise<any> {
    const formData = `consultar=1&cnpj=${cnpj}`

    return axios.post(this.url, formData).then(res => {
      console.log(res.config)
      return res.data;
    });
  }
}

export default new ImaService();
