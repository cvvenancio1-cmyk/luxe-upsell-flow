// Reverse proxy: makes venancioenterprises.com/ofertaupsellcocina/ serve the
// luxe-upsell-flow Cloudflare Worker, without changing the public URL.
// Only requests matching the routes configured in wrangler.json reach this
// worker; every other path on venancioenterprises.com keeps working exactly
// as before (untouched, still served by the original WordPress origin or by
// the other already-migrated apps).

const TARGET_HOST = "cvvenancio1-cmyk-luxe-upsell-flow.cvvenancio1.workers.dev";
// This app's static files (js/css) are built with a unique base path so they
// don't collide with cocinafitness's own /assets/* route on the same domain.
// The files themselves still live at /assets/... inside this app's own
// Worker, so we strip only the extra "-assets" prefix before forwarding.
const ASSET_PREFIX = "/upsellcocina-assets";

// A couple of images in this project are referenced with Lovable's own
// asset-CDN path (/__l5e/assets-v1/...). Those files are only served by
// Lovable's own hosting, not by our own Worker, so those specific requests
// need to go to the project's Lovable preview domain instead of TARGET_HOST.
const LOVABLE_ASSET_RE = /^\/__l5e\/assets-v1\//;
const LOVABLE_HOST = "luxe-upsell-flow.lovable.app";

export default {
  async fetch(request) {
    const url = new URL(request.url);
    let path = url.pathname;

    let targetHost = TARGET_HOST;

    if (path === ASSET_PREFIX || path.startsWith(ASSET_PREFIX + "/")) {
      path = path.slice(ASSET_PREFIX.length) || "/";
    } else if (LOVABLE_ASSET_RE.test(path)) {
      targetHost = LOVABLE_HOST;
    }
    // Page routes (e.g. /ofertaupsellcocina, /ofertaupsellcocina/algo) are
    // forwarded UNCHANGED. The app itself is built with router.basepath set
    // to "/ofertaupsellcocina", so it only recognizes and serves requests
    // that already include that prefix in the path. Stripping it here (as an
    // earlier version of this file did) made the app 307-redirect back to
    // the same public URL, causing an infinite redirect loop in the browser.

    const targetUrl = new URL(path + url.search, `https://${targetHost}`);

    const proxyRequest = new Request(targetUrl, request);
    proxyRequest.headers.set("Host", targetHost);

    const response = await fetch(proxyRequest, { redirect: "manual" });
    return new Response(response.body, response);
  },
};
