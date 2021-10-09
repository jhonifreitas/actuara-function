import axios from 'axios';
import { License } from '../../interfaces/ima';

class ImaService {

  private url = 'https://consultas.ima.sc.gov.br/consulta/consultar';

  async licenses(cnpj: string): Promise<License[]> {
    const formData = `consultar=1&cnpj=${cnpj}`

    return axios.post(this.url, formData).then(res => {
      return Array.isArray(res.data) ? res.data : [];
    });
  }
}

export default new ImaService();
