import { createBrowserHistory } from 'history';

export default createBrowserHistory( createBrowserHistory({
    basename: '/cheerio-react/'
  }));