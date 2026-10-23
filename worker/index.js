export default {
  async fetch(request) {
    const url = new URL(request.url);
    if (url.pathname === '/cuentos') {
      url.pathname = '/cuentos/';
      return Response.redirect(url, 308);
    }
    return fetch(request);
  },
};
