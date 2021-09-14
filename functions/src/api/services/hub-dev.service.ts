import axios from 'axios';
import AppError from '../../exceptions/app-error';

class HubDevService {

  private headers = {
    'Content-Type': 'application/json'
  }
  private url = 'https://ws.hubdodesenvolvedor.com.br/v2/';
  private token = '110137360XUlSykxbdq198849664';

  async cnpj(cnpj: string): Promise<any> {
    return axios.get(`${this.url}cnpj?cnpj=${cnpj}&token=${this.token}`, {headers: this.headers}).then(res => {
      if (!res.data.status) throw new AppError('hub-dev', res.data.message);
      return res.data.result;
    });
  }
}

export default new HubDevService();
