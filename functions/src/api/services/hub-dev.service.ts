const axios = require('axios');

class HubDevService {

  private headers = {
    'Content-Type': 'application/json'
  }
  private url = 'https://ws.hubdodesenvolvedor.com.br/v2/';
  private token = '110137360XUlSykxbdq198849664';

  async cnpj(cnpj: string): Promise<any> {
    return axios.get(`${this.url}cnpj?cnpj=${cnpj}&token=${this.token}`, {headers: this.headers}).then((res: {data: any}) => { return res.data.result });
  }
}

export default new HubDevService();
