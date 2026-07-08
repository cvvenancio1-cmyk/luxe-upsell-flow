// Reverse proxy: makes venancioenterprises.com/ofertaupsellcocina/ serve the
// luxe-upsell-flow Cloudflare Worker, without changing the public URL.
// Only requests matching the routes configured in wrangler.json reach this
// worker; every other path on venancioenterprises.com keeps working exactly
// as before (untouched, still served by the original WordPress origin or by
// the other already-migrated apps).

const TARGET_HOST = "cvvenancio1-cmyk-luxe-upsell-flow.cvvenancio1.workers.dev";
const PREFIX = "/ofertaupsellcocina";
// This app's static files (js/css) are built with a unique base path so they
// don't collide with cocinafitness's own /assets/* route on the same domain.
// The files themselves still live at /assets/... inside this app's own
// Worker, so we strip only the extra "-assets" prefix before forwarding.
const ASSET_PREFIX = "/ofertaupsellcocina-assets";

export default {
  async fetch(request) {
    const url = new URL(request.url);
    let path = url.pathname;

    if (path === ASSET_PREFIX || path.startsWith(ASSET_PREFIX + "/")) {
      path = path.slice(ASSET_PREFIX.length) || "/";
    } else if (path === PREFIX || path === PREFIX + "/") {
      path = "/";
    } else if (path.startsWith(PREFIX + "/")) {
      path = path.slice(PREFIX.length);
    }
    // Any other path is forwarded unchanged.

    const targetUrl = new URL(path + url.search, `https://${TARGET_HOST}`);

    const proxyRequest = new Request(targetUrl, request);
    proxyRequest.headers.set("Host", TARGET_HOST);

    const response = await fetch(proxyRequest, { redirect: "manual" });
    return new Response(response.body, response);
  },
};
