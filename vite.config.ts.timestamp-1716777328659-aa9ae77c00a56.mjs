// vite.config.ts
import react from "file:///F:/Chrome%20Extension/vite-web-extension/node_modules/@vitejs/plugin-react-swc/index.mjs";
import { resolve as resolve3 } from "path";
import { defineConfig } from "file:///F:/Chrome%20Extension/vite-web-extension/node_modules/vite/dist/node/index.js";

// utils/plugins/make-manifest.ts
import * as fs from "fs";
import * as path from "path";

// utils/log.ts
function colorLog(message, type) {
  let color = type || COLORS.FgBlack;
  switch (type) {
    case "success":
      color = COLORS.FgGreen;
      break;
    case "info":
      color = COLORS.FgBlue;
      break;
    case "error":
      color = COLORS.FgRed;
      break;
    case "warning":
      color = COLORS.FgYellow;
      break;
  }
  console.log(color, message);
}
var COLORS = {
  Reset: "\x1B[0m",
  Bright: "\x1B[1m",
  Dim: "\x1B[2m",
  Underscore: "\x1B[4m",
  Blink: "\x1B[5m",
  Reverse: "\x1B[7m",
  Hidden: "\x1B[8m",
  FgBlack: "\x1B[30m",
  FgRed: "\x1B[31m",
  FgGreen: "\x1B[32m",
  FgYellow: "\x1B[33m",
  FgBlue: "\x1B[34m",
  FgMagenta: "\x1B[35m",
  FgCyan: "\x1B[36m",
  FgWhite: "\x1B[37m",
  BgBlack: "\x1B[40m",
  BgRed: "\x1B[41m",
  BgGreen: "\x1B[42m",
  BgYellow: "\x1B[43m",
  BgBlue: "\x1B[44m",
  BgMagenta: "\x1B[45m",
  BgCyan: "\x1B[46m",
  BgWhite: "\x1B[47m"
};

// package.json
var package_default = {
  name: "vite-web-extension",
  displayName: "Web Extension Boilerplate",
  version: "1.1.0",
  description: "A simple chrome extension template with Vite, React, TypeScript and Tailwind CSS.",
  license: "MIT",
  repository: {
    type: "git",
    url: "https://github.com/JohnBra/web-extension.git"
  },
  scripts: {
    build: "vite build",
    dev: "nodemon"
  },
  type: "module",
  dependencies: {
    react: "^18.2.0",
    "react-audio-voice-recorder": "^2.2.0",
    "react-dom": "^18.2.0",
    "vite-plugin-css-injected-by-js": "^3.1.1",
    "webextension-polyfill": "^0.10.0"
  },
  devDependencies: {
    "@types/chrome": "^0.0.237",
    "@types/node": "^18.11.18",
    "@types/react": "^18.0.27",
    "@types/react-dom": "^18.0.10",
    "@types/webextension-polyfill": "^0.10.0",
    "@typescript-eslint/eslint-plugin": "^5.49.0",
    "@typescript-eslint/parser": "^5.49.0",
    "@vitejs/plugin-react-swc": "^3.0.1",
    autoprefixer: "^10.4.13",
    eslint: "^8.32.0",
    "eslint-config-prettier": "^8.6.0",
    "eslint-plugin-import": "^2.27.5",
    "eslint-plugin-jsx-a11y": "^6.7.1",
    "eslint-plugin-react": "^7.32.1",
    "eslint-plugin-react-hooks": "^4.3.0",
    "fs-extra": "^11.1.0",
    nodemon: "^2.0.20",
    postcss: "^8.4.21",
    tailwindcss: "^3.2.4",
    "ts-node": "^10.9.1",
    typescript: "^4.9.4",
    vite: "^4.0.4"
  }
};

// src/manifest.ts
var manifest = {
  manifest_version: 3,
  name: package_default.displayName,
  version: package_default.version,
  description: package_default.description,
  options_ui: {
    page: "src/pages/options/index.html"
  },
  background: {
    service_worker: "src/pages/background/index.js",
    type: "module"
  },
  action: {
    default_popup: "src/pages/popup/index.html",
    default_icon: "icon-34.png"
  },
  chrome_url_overrides: {
    newtab: "src/pages/newtab/index.html"
  },
  icons: {
    "128": "icon-128.png"
  },
  permissions: [
    "activeTab",
    "tabCapture",
    "downloads",
    "storage"
  ],
  content_scripts: [
    {
      matches: ["http://*/*", "https://*/*", "<all_urls>"],
      js: ["src/pages/content/index.js"],
      css: ["contentStyle.css"]
    }
  ],
  devtools_page: "src/pages/devtools/index.html",
  web_accessible_resources: [
    {
      resources: ["contentStyle.css", "icon-128.png", "icon-34.png"],
      matches: []
    }
  ]
};
var manifest_default = manifest;

// utils/plugins/make-manifest.ts
var __vite_injected_original_dirname = "F:\\Chrome Extension\\vite-web-extension\\utils\\plugins";
var { resolve } = path;
var outDir = resolve(__vite_injected_original_dirname, "..", "..", "public");
function makeManifest() {
  return {
    name: "make-manifest",
    buildEnd() {
      if (!fs.existsSync(outDir)) {
        fs.mkdirSync(outDir);
      }
      const manifestPath = resolve(outDir, "manifest.json");
      fs.writeFileSync(manifestPath, JSON.stringify(manifest_default, null, 2));
      colorLog(`Manifest file copy complete: ${manifestPath}`, "success");
    }
  };
}

// utils/plugins/build-content-script.ts
import { build } from "file:///F:/Chrome%20Extension/vite-web-extension/node_modules/vite/dist/node/index.js";
import { resolve as resolve2 } from "path";

// utils/constants.ts
var outputFolderName = "dist";

// utils/plugins/build-content-script.ts
import cssInjectedByJsPlugin from "file:///F:/Chrome%20Extension/vite-web-extension/node_modules/vite-plugin-css-injected-by-js/dist/esm/index.js";
var __vite_injected_original_dirname2 = "F:\\Chrome Extension\\vite-web-extension\\utils\\plugins";
var packages = [
  {
    content: resolve2(__vite_injected_original_dirname2, "../../", "src/pages/content/index.tsx")
  }
];
var outDir2 = resolve2(__vite_injected_original_dirname2, "../../", outputFolderName);
function buildContentScript() {
  return {
    name: "build-content",
    async buildEnd() {
      for (const _package of packages) {
        await build({
          publicDir: false,
          plugins: [cssInjectedByJsPlugin()],
          build: {
            outDir: outDir2,
            sourcemap: process.env.__DEV__ === "true",
            emptyOutDir: false,
            rollupOptions: {
              input: _package,
              output: {
                entryFileNames: (chunk) => {
                  return `src/pages/${chunk.name}/index.js`;
                }
              }
            }
          },
          configFile: false
        });
      }
      colorLog("Content code build sucessfully", "success");
    }
  };
}

// vite.config.ts
var __vite_injected_original_dirname3 = "F:\\Chrome Extension\\vite-web-extension";
var root = resolve3(__vite_injected_original_dirname3, "src");
var pagesDir = resolve3(root, "pages");
var assetsDir = resolve3(root, "assets");
var outDir3 = resolve3(__vite_injected_original_dirname3, outputFolderName);
var publicDir = resolve3(__vite_injected_original_dirname3, "public");
var vite_config_default = defineConfig({
  resolve: {
    alias: {
      "@src": root,
      "@assets": assetsDir,
      "@pages": pagesDir
    }
  },
  plugins: [react(), makeManifest(), buildContentScript()],
  publicDir,
  build: {
    outDir: outDir3,
    sourcemap: process.env.__DEV__ === "true",
    emptyOutDir: false,
    rollupOptions: {
      input: {
        devtools: resolve3(pagesDir, "devtools", "index.html"),
        panel: resolve3(pagesDir, "panel", "index.html"),
        background: resolve3(pagesDir, "background", "index.ts"),
        popup: resolve3(pagesDir, "popup", "index.html"),
        newtab: resolve3(pagesDir, "newtab", "index.html"),
        options: resolve3(pagesDir, "options", "index.html")
      },
      output: {
        entryFileNames: (chunk) => `src/pages/${chunk.name}/index.js`
      }
    }
  }
});
export {
  vite_config_default as default
};
//# sourceMappingURL=data:application/json;base64,ewogICJ2ZXJzaW9uIjogMywKICAic291cmNlcyI6IFsidml0ZS5jb25maWcudHMiLCAidXRpbHMvcGx1Z2lucy9tYWtlLW1hbmlmZXN0LnRzIiwgInV0aWxzL2xvZy50cyIsICJwYWNrYWdlLmpzb24iLCAic3JjL21hbmlmZXN0LnRzIiwgInV0aWxzL3BsdWdpbnMvYnVpbGQtY29udGVudC1zY3JpcHQudHMiLCAidXRpbHMvY29uc3RhbnRzLnRzIl0sCiAgInNvdXJjZXNDb250ZW50IjogWyJjb25zdCBfX3ZpdGVfaW5qZWN0ZWRfb3JpZ2luYWxfZGlybmFtZSA9IFwiRjpcXFxcQ2hyb21lIEV4dGVuc2lvblxcXFx2aXRlLXdlYi1leHRlbnNpb25cIjtjb25zdCBfX3ZpdGVfaW5qZWN0ZWRfb3JpZ2luYWxfZmlsZW5hbWUgPSBcIkY6XFxcXENocm9tZSBFeHRlbnNpb25cXFxcdml0ZS13ZWItZXh0ZW5zaW9uXFxcXHZpdGUuY29uZmlnLnRzXCI7Y29uc3QgX192aXRlX2luamVjdGVkX29yaWdpbmFsX2ltcG9ydF9tZXRhX3VybCA9IFwiZmlsZTovLy9GOi9DaHJvbWUlMjBFeHRlbnNpb24vdml0ZS13ZWItZXh0ZW5zaW9uL3ZpdGUuY29uZmlnLnRzXCI7aW1wb3J0IHJlYWN0IGZyb20gJ0B2aXRlanMvcGx1Z2luLXJlYWN0LXN3Yyc7XHJcbmltcG9ydCB7IHJlc29sdmUgfSBmcm9tICdwYXRoJztcclxuaW1wb3J0IHsgZGVmaW5lQ29uZmlnIH0gZnJvbSAndml0ZSc7XHJcbmltcG9ydCBtYWtlTWFuaWZlc3QgZnJvbSAnLi91dGlscy9wbHVnaW5zL21ha2UtbWFuaWZlc3QnO1xyXG5pbXBvcnQgYnVpbGRDb250ZW50U2NyaXB0IGZyb20gJy4vdXRpbHMvcGx1Z2lucy9idWlsZC1jb250ZW50LXNjcmlwdCc7XHJcbmltcG9ydCB7IG91dHB1dEZvbGRlck5hbWUgfSBmcm9tICcuL3V0aWxzL2NvbnN0YW50cyc7XHJcbiBcclxuY29uc3Qgcm9vdCA9IHJlc29sdmUoX19kaXJuYW1lLCAnc3JjJyk7XHJcbmNvbnN0IHBhZ2VzRGlyID0gcmVzb2x2ZShyb290LCAncGFnZXMnKTtcclxuY29uc3QgYXNzZXRzRGlyID0gcmVzb2x2ZShyb290LCAnYXNzZXRzJyk7XHJcbmNvbnN0IG91dERpciA9IHJlc29sdmUoX19kaXJuYW1lLCBvdXRwdXRGb2xkZXJOYW1lKTtcclxuY29uc3QgcHVibGljRGlyID0gcmVzb2x2ZShfX2Rpcm5hbWUsICdwdWJsaWMnKTtcclxuXHJcbmV4cG9ydCBkZWZhdWx0IGRlZmluZUNvbmZpZyh7XHJcbiAgcmVzb2x2ZToge1xyXG4gICAgYWxpYXM6IHtcclxuICAgICAgJ0BzcmMnOiByb290LFxyXG4gICAgICAnQGFzc2V0cyc6IGFzc2V0c0RpcixcclxuICAgICAgJ0BwYWdlcyc6IHBhZ2VzRGlyLFxyXG4gICAgfSxcclxuICB9LFxyXG4gIHBsdWdpbnM6IFtyZWFjdCgpLCBtYWtlTWFuaWZlc3QoKSwgYnVpbGRDb250ZW50U2NyaXB0KCldLFxyXG4gIHB1YmxpY0RpcixcclxuICBidWlsZDoge1xyXG4gICAgb3V0RGlyLFxyXG4gICAgc291cmNlbWFwOiBwcm9jZXNzLmVudi5fX0RFVl9fID09PSAndHJ1ZScsXHJcbiAgICBlbXB0eU91dERpcjogZmFsc2UsXHJcbiAgICByb2xsdXBPcHRpb25zOiB7XHJcbiAgICAgIGlucHV0OiB7XHJcbiAgICAgICAgZGV2dG9vbHM6IHJlc29sdmUocGFnZXNEaXIsICdkZXZ0b29scycsICdpbmRleC5odG1sJyksXHJcbiAgICAgICAgcGFuZWw6IHJlc29sdmUocGFnZXNEaXIsICdwYW5lbCcsICdpbmRleC5odG1sJyksXHJcbiAgICAgICAgYmFja2dyb3VuZDogcmVzb2x2ZShwYWdlc0RpciwgJ2JhY2tncm91bmQnLCAnaW5kZXgudHMnKSxcclxuICAgICAgICBwb3B1cDogcmVzb2x2ZShwYWdlc0RpciwgJ3BvcHVwJywgJ2luZGV4Lmh0bWwnKSxcclxuICAgICAgICBuZXd0YWI6IHJlc29sdmUocGFnZXNEaXIsICduZXd0YWInLCAnaW5kZXguaHRtbCcpLFxyXG4gICAgICAgIG9wdGlvbnM6IHJlc29sdmUocGFnZXNEaXIsICdvcHRpb25zJywgJ2luZGV4Lmh0bWwnKSxcclxuICAgICAgfSxcclxuICAgICAgb3V0cHV0OiB7XHJcbiAgICAgICAgZW50cnlGaWxlTmFtZXM6IChjaHVuaykgPT4gYHNyYy9wYWdlcy8ke2NodW5rLm5hbWV9L2luZGV4LmpzYCxcclxuICAgICAgfSxcclxuICAgIH0sXHJcbiAgfSxcclxufSk7XHJcbiIsICJjb25zdCBfX3ZpdGVfaW5qZWN0ZWRfb3JpZ2luYWxfZGlybmFtZSA9IFwiRjpcXFxcQ2hyb21lIEV4dGVuc2lvblxcXFx2aXRlLXdlYi1leHRlbnNpb25cXFxcdXRpbHNcXFxccGx1Z2luc1wiO2NvbnN0IF9fdml0ZV9pbmplY3RlZF9vcmlnaW5hbF9maWxlbmFtZSA9IFwiRjpcXFxcQ2hyb21lIEV4dGVuc2lvblxcXFx2aXRlLXdlYi1leHRlbnNpb25cXFxcdXRpbHNcXFxccGx1Z2luc1xcXFxtYWtlLW1hbmlmZXN0LnRzXCI7Y29uc3QgX192aXRlX2luamVjdGVkX29yaWdpbmFsX2ltcG9ydF9tZXRhX3VybCA9IFwiZmlsZTovLy9GOi9DaHJvbWUlMjBFeHRlbnNpb24vdml0ZS13ZWItZXh0ZW5zaW9uL3V0aWxzL3BsdWdpbnMvbWFrZS1tYW5pZmVzdC50c1wiO2ltcG9ydCAqIGFzIGZzIGZyb20gJ2ZzJztcclxuaW1wb3J0ICogYXMgcGF0aCBmcm9tICdwYXRoJztcclxuaW1wb3J0IGNvbG9yTG9nIGZyb20gJy4uL2xvZyc7XHJcbmltcG9ydCBtYW5pZmVzdCBmcm9tICcuLi8uLi9zcmMvbWFuaWZlc3QnO1xyXG5pbXBvcnQgeyBQbHVnaW5PcHRpb24gfSBmcm9tICd2aXRlJztcclxuXHJcbmNvbnN0IHsgcmVzb2x2ZSB9ID0gcGF0aDtcclxuXHJcbmNvbnN0IG91dERpciA9IHJlc29sdmUoX19kaXJuYW1lLCAnLi4nLCAnLi4nLCAncHVibGljJyk7XHJcblxyXG5leHBvcnQgZGVmYXVsdCBmdW5jdGlvbiBtYWtlTWFuaWZlc3QoKTogUGx1Z2luT3B0aW9uIHtcclxuICByZXR1cm4ge1xyXG4gICAgbmFtZTogJ21ha2UtbWFuaWZlc3QnLFxyXG4gICAgYnVpbGRFbmQoKSB7XHJcbiAgICAgIGlmICghZnMuZXhpc3RzU3luYyhvdXREaXIpKSB7XHJcbiAgICAgICAgZnMubWtkaXJTeW5jKG91dERpcik7XHJcbiAgICAgIH1cclxuXHJcbiAgICAgIGNvbnN0IG1hbmlmZXN0UGF0aCA9IHJlc29sdmUob3V0RGlyLCAnbWFuaWZlc3QuanNvbicpO1xyXG5cclxuICAgICAgZnMud3JpdGVGaWxlU3luYyhtYW5pZmVzdFBhdGgsIEpTT04uc3RyaW5naWZ5KG1hbmlmZXN0LCBudWxsLCAyKSk7XHJcblxyXG4gICAgICBjb2xvckxvZyhgTWFuaWZlc3QgZmlsZSBjb3B5IGNvbXBsZXRlOiAke21hbmlmZXN0UGF0aH1gLCAnc3VjY2VzcycpO1xyXG4gICAgfSxcclxuICB9O1xyXG59XHJcbiIsICJjb25zdCBfX3ZpdGVfaW5qZWN0ZWRfb3JpZ2luYWxfZGlybmFtZSA9IFwiRjpcXFxcQ2hyb21lIEV4dGVuc2lvblxcXFx2aXRlLXdlYi1leHRlbnNpb25cXFxcdXRpbHNcIjtjb25zdCBfX3ZpdGVfaW5qZWN0ZWRfb3JpZ2luYWxfZmlsZW5hbWUgPSBcIkY6XFxcXENocm9tZSBFeHRlbnNpb25cXFxcdml0ZS13ZWItZXh0ZW5zaW9uXFxcXHV0aWxzXFxcXGxvZy50c1wiO2NvbnN0IF9fdml0ZV9pbmplY3RlZF9vcmlnaW5hbF9pbXBvcnRfbWV0YV91cmwgPSBcImZpbGU6Ly8vRjovQ2hyb21lJTIwRXh0ZW5zaW9uL3ZpdGUtd2ViLWV4dGVuc2lvbi91dGlscy9sb2cudHNcIjt0eXBlIENvbG9yVHlwZSA9ICdzdWNjZXNzJyB8ICdpbmZvJyB8ICdlcnJvcicgfCAnd2FybmluZycgfCBrZXlvZiB0eXBlb2YgQ09MT1JTO1xyXG5cclxuZXhwb3J0IGRlZmF1bHQgZnVuY3Rpb24gY29sb3JMb2cobWVzc2FnZTogc3RyaW5nLCB0eXBlPzogQ29sb3JUeXBlKSB7XHJcbiAgbGV0IGNvbG9yOiBzdHJpbmcgPSB0eXBlIHx8IENPTE9SUy5GZ0JsYWNrO1xyXG5cclxuICBzd2l0Y2ggKHR5cGUpIHtcclxuICAgIGNhc2UgJ3N1Y2Nlc3MnOlxyXG4gICAgICBjb2xvciA9IENPTE9SUy5GZ0dyZWVuO1xyXG4gICAgICBicmVhaztcclxuICAgIGNhc2UgJ2luZm8nOlxyXG4gICAgICBjb2xvciA9IENPTE9SUy5GZ0JsdWU7XHJcbiAgICAgIGJyZWFrO1xyXG4gICAgY2FzZSAnZXJyb3InOlxyXG4gICAgICBjb2xvciA9IENPTE9SUy5GZ1JlZDtcclxuICAgICAgYnJlYWs7XHJcbiAgICBjYXNlICd3YXJuaW5nJzpcclxuICAgICAgY29sb3IgPSBDT0xPUlMuRmdZZWxsb3c7XHJcbiAgICAgIGJyZWFrO1xyXG4gIH1cclxuXHJcbiAgY29uc29sZS5sb2coY29sb3IsIG1lc3NhZ2UpO1xyXG59XHJcblxyXG5jb25zdCBDT0xPUlMgPSB7XHJcbiAgUmVzZXQ6ICdcXHgxYlswbScsXHJcbiAgQnJpZ2h0OiAnXFx4MWJbMW0nLFxyXG4gIERpbTogJ1xceDFiWzJtJyxcclxuICBVbmRlcnNjb3JlOiAnXFx4MWJbNG0nLFxyXG4gIEJsaW5rOiAnXFx4MWJbNW0nLFxyXG4gIFJldmVyc2U6ICdcXHgxYls3bScsXHJcbiAgSGlkZGVuOiAnXFx4MWJbOG0nLFxyXG4gIEZnQmxhY2s6ICdcXHgxYlszMG0nLFxyXG4gIEZnUmVkOiAnXFx4MWJbMzFtJyxcclxuICBGZ0dyZWVuOiAnXFx4MWJbMzJtJyxcclxuICBGZ1llbGxvdzogJ1xceDFiWzMzbScsXHJcbiAgRmdCbHVlOiAnXFx4MWJbMzRtJyxcclxuICBGZ01hZ2VudGE6ICdcXHgxYlszNW0nLFxyXG4gIEZnQ3lhbjogJ1xceDFiWzM2bScsXHJcbiAgRmdXaGl0ZTogJ1xceDFiWzM3bScsXHJcbiAgQmdCbGFjazogJ1xceDFiWzQwbScsXHJcbiAgQmdSZWQ6ICdcXHgxYls0MW0nLFxyXG4gIEJnR3JlZW46ICdcXHgxYls0Mm0nLFxyXG4gIEJnWWVsbG93OiAnXFx4MWJbNDNtJyxcclxuICBCZ0JsdWU6ICdcXHgxYls0NG0nLFxyXG4gIEJnTWFnZW50YTogJ1xceDFiWzQ1bScsXHJcbiAgQmdDeWFuOiAnXFx4MWJbNDZtJyxcclxuICBCZ1doaXRlOiAnXFx4MWJbNDdtJyxcclxufSBhcyBjb25zdDtcclxuIiwgIntcclxuICBcIm5hbWVcIjogXCJ2aXRlLXdlYi1leHRlbnNpb25cIixcclxuICBcImRpc3BsYXlOYW1lXCI6IFwiV2ViIEV4dGVuc2lvbiBCb2lsZXJwbGF0ZVwiLFxyXG4gIFwidmVyc2lvblwiOiBcIjEuMS4wXCIsXHJcbiAgXCJkZXNjcmlwdGlvblwiOiBcIkEgc2ltcGxlIGNocm9tZSBleHRlbnNpb24gdGVtcGxhdGUgd2l0aCBWaXRlLCBSZWFjdCwgVHlwZVNjcmlwdCBhbmQgVGFpbHdpbmQgQ1NTLlwiLFxyXG4gIFwibGljZW5zZVwiOiBcIk1JVFwiLFxyXG4gIFwicmVwb3NpdG9yeVwiOiB7XHJcbiAgICBcInR5cGVcIjogXCJnaXRcIixcclxuICAgIFwidXJsXCI6IFwiaHR0cHM6Ly9naXRodWIuY29tL0pvaG5CcmEvd2ViLWV4dGVuc2lvbi5naXRcIlxyXG4gIH0sXHJcbiAgXCJzY3JpcHRzXCI6IHtcclxuICAgIFwiYnVpbGRcIjogXCJ2aXRlIGJ1aWxkXCIsXHJcbiAgICBcImRldlwiOiBcIm5vZGVtb25cIlxyXG4gIH0sXHJcbiAgXCJ0eXBlXCI6IFwibW9kdWxlXCIsXHJcbiAgXCJkZXBlbmRlbmNpZXNcIjoge1xyXG4gICAgXCJyZWFjdFwiOiBcIl4xOC4yLjBcIixcclxuICAgIFwicmVhY3QtYXVkaW8tdm9pY2UtcmVjb3JkZXJcIjogXCJeMi4yLjBcIixcclxuICAgIFwicmVhY3QtZG9tXCI6IFwiXjE4LjIuMFwiLFxyXG4gICAgXCJ2aXRlLXBsdWdpbi1jc3MtaW5qZWN0ZWQtYnktanNcIjogXCJeMy4xLjFcIixcclxuICAgIFwid2ViZXh0ZW5zaW9uLXBvbHlmaWxsXCI6IFwiXjAuMTAuMFwiXHJcbiAgfSxcclxuICBcImRldkRlcGVuZGVuY2llc1wiOiB7XHJcbiAgICBcIkB0eXBlcy9jaHJvbWVcIjogXCJeMC4wLjIzN1wiLFxyXG4gICAgXCJAdHlwZXMvbm9kZVwiOiBcIl4xOC4xMS4xOFwiLFxyXG4gICAgXCJAdHlwZXMvcmVhY3RcIjogXCJeMTguMC4yN1wiLFxyXG4gICAgXCJAdHlwZXMvcmVhY3QtZG9tXCI6IFwiXjE4LjAuMTBcIixcclxuICAgIFwiQHR5cGVzL3dlYmV4dGVuc2lvbi1wb2x5ZmlsbFwiOiBcIl4wLjEwLjBcIixcclxuICAgIFwiQHR5cGVzY3JpcHQtZXNsaW50L2VzbGludC1wbHVnaW5cIjogXCJeNS40OS4wXCIsXHJcbiAgICBcIkB0eXBlc2NyaXB0LWVzbGludC9wYXJzZXJcIjogXCJeNS40OS4wXCIsXHJcbiAgICBcIkB2aXRlanMvcGx1Z2luLXJlYWN0LXN3Y1wiOiBcIl4zLjAuMVwiLFxyXG4gICAgXCJhdXRvcHJlZml4ZXJcIjogXCJeMTAuNC4xM1wiLFxyXG4gICAgXCJlc2xpbnRcIjogXCJeOC4zMi4wXCIsXHJcbiAgICBcImVzbGludC1jb25maWctcHJldHRpZXJcIjogXCJeOC42LjBcIixcclxuICAgIFwiZXNsaW50LXBsdWdpbi1pbXBvcnRcIjogXCJeMi4yNy41XCIsXHJcbiAgICBcImVzbGludC1wbHVnaW4tanN4LWExMXlcIjogXCJeNi43LjFcIixcclxuICAgIFwiZXNsaW50LXBsdWdpbi1yZWFjdFwiOiBcIl43LjMyLjFcIixcclxuICAgIFwiZXNsaW50LXBsdWdpbi1yZWFjdC1ob29rc1wiOiBcIl40LjMuMFwiLFxyXG4gICAgXCJmcy1leHRyYVwiOiBcIl4xMS4xLjBcIixcclxuICAgIFwibm9kZW1vblwiOiBcIl4yLjAuMjBcIixcclxuICAgIFwicG9zdGNzc1wiOiBcIl44LjQuMjFcIixcclxuICAgIFwidGFpbHdpbmRjc3NcIjogXCJeMy4yLjRcIixcclxuICAgIFwidHMtbm9kZVwiOiBcIl4xMC45LjFcIixcclxuICAgIFwidHlwZXNjcmlwdFwiOiBcIl40LjkuNFwiLFxyXG4gICAgXCJ2aXRlXCI6IFwiXjQuMC40XCJcclxuICB9XHJcbn1cclxuIiwgImNvbnN0IF9fdml0ZV9pbmplY3RlZF9vcmlnaW5hbF9kaXJuYW1lID0gXCJGOlxcXFxDaHJvbWUgRXh0ZW5zaW9uXFxcXHZpdGUtd2ViLWV4dGVuc2lvblxcXFxzcmNcIjtjb25zdCBfX3ZpdGVfaW5qZWN0ZWRfb3JpZ2luYWxfZmlsZW5hbWUgPSBcIkY6XFxcXENocm9tZSBFeHRlbnNpb25cXFxcdml0ZS13ZWItZXh0ZW5zaW9uXFxcXHNyY1xcXFxtYW5pZmVzdC50c1wiO2NvbnN0IF9fdml0ZV9pbmplY3RlZF9vcmlnaW5hbF9pbXBvcnRfbWV0YV91cmwgPSBcImZpbGU6Ly8vRjovQ2hyb21lJTIwRXh0ZW5zaW9uL3ZpdGUtd2ViLWV4dGVuc2lvbi9zcmMvbWFuaWZlc3QudHNcIjtpbXBvcnQgdHlwZSB7IE1hbmlmZXN0IH0gZnJvbSAnd2ViZXh0ZW5zaW9uLXBvbHlmaWxsJztcclxuaW1wb3J0IHBrZyBmcm9tICcuLi9wYWNrYWdlLmpzb24nO1xyXG5cclxuY29uc3QgbWFuaWZlc3Q6IE1hbmlmZXN0LldlYkV4dGVuc2lvbk1hbmlmZXN0ID0ge1xyXG4gIG1hbmlmZXN0X3ZlcnNpb246IDMsXHJcbiAgbmFtZTogcGtnLmRpc3BsYXlOYW1lLFxyXG4gIHZlcnNpb246IHBrZy52ZXJzaW9uLFxyXG4gIGRlc2NyaXB0aW9uOiBwa2cuZGVzY3JpcHRpb24sXHJcbiAgb3B0aW9uc191aToge1xyXG4gICAgcGFnZTogJ3NyYy9wYWdlcy9vcHRpb25zL2luZGV4Lmh0bWwnLFxyXG4gIH0sXHJcbiAgYmFja2dyb3VuZDoge1xyXG4gICAgc2VydmljZV93b3JrZXI6ICdzcmMvcGFnZXMvYmFja2dyb3VuZC9pbmRleC5qcycsXHJcbiAgICB0eXBlOiAnbW9kdWxlJyxcclxuICB9LFxyXG4gIGFjdGlvbjoge1xyXG4gICAgZGVmYXVsdF9wb3B1cDogJ3NyYy9wYWdlcy9wb3B1cC9pbmRleC5odG1sJyxcclxuICAgIGRlZmF1bHRfaWNvbjogJ2ljb24tMzQucG5nJyxcclxuICB9LFxyXG4gIGNocm9tZV91cmxfb3ZlcnJpZGVzOiB7XHJcbiAgICBuZXd0YWI6ICdzcmMvcGFnZXMvbmV3dGFiL2luZGV4Lmh0bWwnLFxyXG4gIH0sXHJcbiAgaWNvbnM6IHtcclxuICAgICcxMjgnOiAnaWNvbi0xMjgucG5nJyxcclxuICB9LFxyXG4gIHBlcm1pc3Npb25zOiBbXCJhY3RpdmVUYWJcIiwgIFwidGFiQ2FwdHVyZVwiLFxyXG4gIFwiZG93bmxvYWRzXCIsXHJcbiAgXCJzdG9yYWdlXCJdLFxyXG4gIGNvbnRlbnRfc2NyaXB0czogW1xyXG4gICAge1xyXG4gICAgICBtYXRjaGVzOiBbJ2h0dHA6Ly8qLyonLCAnaHR0cHM6Ly8qLyonLCAnPGFsbF91cmxzPiddLFxyXG4gICAgICBqczogWydzcmMvcGFnZXMvY29udGVudC9pbmRleC5qcyddLFxyXG4gICAgICBjc3M6IFsnY29udGVudFN0eWxlLmNzcyddLFxyXG4gICAgfSxcclxuICBdLFxyXG4gIGRldnRvb2xzX3BhZ2U6ICdzcmMvcGFnZXMvZGV2dG9vbHMvaW5kZXguaHRtbCcsXHJcbiAgd2ViX2FjY2Vzc2libGVfcmVzb3VyY2VzOiBbXHJcbiAgICB7XHJcbiAgICAgIHJlc291cmNlczogWydjb250ZW50U3R5bGUuY3NzJywgJ2ljb24tMTI4LnBuZycsICdpY29uLTM0LnBuZyddLFxyXG4gICAgICBtYXRjaGVzOiBbXSxcclxuICAgIH0sXHJcbiAgXSxcclxufTtcclxuXHJcbmV4cG9ydCBkZWZhdWx0IG1hbmlmZXN0O1xyXG4iLCAiY29uc3QgX192aXRlX2luamVjdGVkX29yaWdpbmFsX2Rpcm5hbWUgPSBcIkY6XFxcXENocm9tZSBFeHRlbnNpb25cXFxcdml0ZS13ZWItZXh0ZW5zaW9uXFxcXHV0aWxzXFxcXHBsdWdpbnNcIjtjb25zdCBfX3ZpdGVfaW5qZWN0ZWRfb3JpZ2luYWxfZmlsZW5hbWUgPSBcIkY6XFxcXENocm9tZSBFeHRlbnNpb25cXFxcdml0ZS13ZWItZXh0ZW5zaW9uXFxcXHV0aWxzXFxcXHBsdWdpbnNcXFxcYnVpbGQtY29udGVudC1zY3JpcHQudHNcIjtjb25zdCBfX3ZpdGVfaW5qZWN0ZWRfb3JpZ2luYWxfaW1wb3J0X21ldGFfdXJsID0gXCJmaWxlOi8vL0Y6L0Nocm9tZSUyMEV4dGVuc2lvbi92aXRlLXdlYi1leHRlbnNpb24vdXRpbHMvcGx1Z2lucy9idWlsZC1jb250ZW50LXNjcmlwdC50c1wiO2ltcG9ydCBjb2xvckxvZyBmcm9tICcuLi9sb2cnO1xyXG5pbXBvcnQgeyBQbHVnaW5PcHRpb24sIGJ1aWxkIH0gZnJvbSAndml0ZSc7IFxyXG5pbXBvcnQgeyByZXNvbHZlIH0gZnJvbSAncGF0aCc7XHJcbmltcG9ydCB7IG91dHB1dEZvbGRlck5hbWUgfSBmcm9tICcuLi9jb25zdGFudHMnO1xyXG5pbXBvcnQgY3NzSW5qZWN0ZWRCeUpzUGx1Z2luIGZyb20gJ3ZpdGUtcGx1Z2luLWNzcy1pbmplY3RlZC1ieS1qcydcclxuXHJcbmNvbnN0IHBhY2thZ2VzID0gW1xyXG4gIHtcclxuICAgIGNvbnRlbnQ6ICByZXNvbHZlKF9fZGlybmFtZSwgJy4uLy4uLycsICdzcmMvcGFnZXMvY29udGVudC9pbmRleC50c3gnKVxyXG4gIH0sXHJcbl07XHJcblxyXG5jb25zdCBvdXREaXIgPSByZXNvbHZlKF9fZGlybmFtZSwgJy4uLy4uLycsICBvdXRwdXRGb2xkZXJOYW1lKTsgXHJcblxyXG5leHBvcnQgZGVmYXVsdCBmdW5jdGlvbiBidWlsZENvbnRlbnRTY3JpcHQoKTogUGx1Z2luT3B0aW9uIHtcclxuICByZXR1cm4ge1xyXG4gICAgbmFtZTogJ2J1aWxkLWNvbnRlbnQnLFxyXG4gICAgYXN5bmMgYnVpbGRFbmQoKSB7XHJcbiAgICAgIGZvciAoY29uc3QgX3BhY2thZ2Ugb2YgcGFja2FnZXMpIHtcclxuICAgICAgICBhd2FpdCBidWlsZCh7XHJcbiAgICAgICAgICBwdWJsaWNEaXI6IGZhbHNlLFxyXG4gICAgICAgICAgcGx1Z2luczogWyBjc3NJbmplY3RlZEJ5SnNQbHVnaW4oKSBdLFxyXG4gICAgICAgICAgYnVpbGQ6IHtcclxuICAgICAgICAgICAgb3V0RGlyLFxyXG4gICAgICAgICAgICBzb3VyY2VtYXA6IHByb2Nlc3MuZW52Ll9fREVWX18gPT09ICd0cnVlJyxcclxuICAgICAgICAgICAgZW1wdHlPdXREaXI6IGZhbHNlLFxyXG4gICAgICAgICAgICByb2xsdXBPcHRpb25zOiB7XHJcbiAgICAgICAgICAgICAgaW5wdXQ6IF9wYWNrYWdlLFxyXG4gICAgICAgICAgICAgIG91dHB1dDoge1xyXG4gICAgICAgICAgICAgICAgZW50cnlGaWxlTmFtZXM6IChjaHVuaykgPT4ge1xyXG4gICAgICAgICAgICAgICAgICByZXR1cm4gYHNyYy9wYWdlcy8ke2NodW5rLm5hbWV9L2luZGV4LmpzYDtcclxuICAgICAgICAgICAgICAgIH0sXHJcbiAgICAgICAgICAgICAgfSxcclxuICAgICAgICAgICAgfSxcclxuICAgICAgICAgIH0sXHJcbiAgICAgICAgICBjb25maWdGaWxlOiBmYWxzZSxcclxuICAgICAgICB9KTtcclxuICAgICAgfVxyXG4gICAgICBjb2xvckxvZygnQ29udGVudCBjb2RlIGJ1aWxkIHN1Y2Vzc2Z1bGx5JywgJ3N1Y2Nlc3MnKTtcclxuICAgIH0sXHJcbiAgfTtcclxufVxyXG4iLCAiY29uc3QgX192aXRlX2luamVjdGVkX29yaWdpbmFsX2Rpcm5hbWUgPSBcIkY6XFxcXENocm9tZSBFeHRlbnNpb25cXFxcdml0ZS13ZWItZXh0ZW5zaW9uXFxcXHV0aWxzXCI7Y29uc3QgX192aXRlX2luamVjdGVkX29yaWdpbmFsX2ZpbGVuYW1lID0gXCJGOlxcXFxDaHJvbWUgRXh0ZW5zaW9uXFxcXHZpdGUtd2ViLWV4dGVuc2lvblxcXFx1dGlsc1xcXFxjb25zdGFudHMudHNcIjtjb25zdCBfX3ZpdGVfaW5qZWN0ZWRfb3JpZ2luYWxfaW1wb3J0X21ldGFfdXJsID0gXCJmaWxlOi8vL0Y6L0Nocm9tZSUyMEV4dGVuc2lvbi92aXRlLXdlYi1leHRlbnNpb24vdXRpbHMvY29uc3RhbnRzLnRzXCI7ZXhwb3J0IGNvbnN0IG91dHB1dEZvbGRlck5hbWUgPSAnZGlzdCc7XHJcbiJdLAogICJtYXBwaW5ncyI6ICI7QUFBNFMsT0FBTyxXQUFXO0FBQzlULFNBQVMsV0FBQUEsZ0JBQWU7QUFDeEIsU0FBUyxvQkFBb0I7OztBQ0ZpVSxZQUFZLFFBQVE7QUFDbFgsWUFBWSxVQUFVOzs7QUNDUCxTQUFSLFNBQTBCLFNBQWlCLE1BQWtCO0FBQ2xFLE1BQUksUUFBZ0IsUUFBUSxPQUFPO0FBRW5DLFVBQVEsTUFBTTtBQUFBLElBQ1osS0FBSztBQUNILGNBQVEsT0FBTztBQUNmO0FBQUEsSUFDRixLQUFLO0FBQ0gsY0FBUSxPQUFPO0FBQ2Y7QUFBQSxJQUNGLEtBQUs7QUFDSCxjQUFRLE9BQU87QUFDZjtBQUFBLElBQ0YsS0FBSztBQUNILGNBQVEsT0FBTztBQUNmO0FBQUEsRUFDSjtBQUVBLFVBQVEsSUFBSSxPQUFPLE9BQU87QUFDNUI7QUFFQSxJQUFNLFNBQVM7QUFBQSxFQUNiLE9BQU87QUFBQSxFQUNQLFFBQVE7QUFBQSxFQUNSLEtBQUs7QUFBQSxFQUNMLFlBQVk7QUFBQSxFQUNaLE9BQU87QUFBQSxFQUNQLFNBQVM7QUFBQSxFQUNULFFBQVE7QUFBQSxFQUNSLFNBQVM7QUFBQSxFQUNULE9BQU87QUFBQSxFQUNQLFNBQVM7QUFBQSxFQUNULFVBQVU7QUFBQSxFQUNWLFFBQVE7QUFBQSxFQUNSLFdBQVc7QUFBQSxFQUNYLFFBQVE7QUFBQSxFQUNSLFNBQVM7QUFBQSxFQUNULFNBQVM7QUFBQSxFQUNULE9BQU87QUFBQSxFQUNQLFNBQVM7QUFBQSxFQUNULFVBQVU7QUFBQSxFQUNWLFFBQVE7QUFBQSxFQUNSLFdBQVc7QUFBQSxFQUNYLFFBQVE7QUFBQSxFQUNSLFNBQVM7QUFDWDs7O0FDL0NBO0FBQUEsRUFDRSxNQUFRO0FBQUEsRUFDUixhQUFlO0FBQUEsRUFDZixTQUFXO0FBQUEsRUFDWCxhQUFlO0FB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YSxHQUFHLG1CQUFtQixDQUFDO0FBQUEsRUFDdkQ7QUFBQSxFQUNBLE9BQU87QUFBQSxJQUNMLFFBQUFDO0FBQUEsSUFDQSxXQUFXLFFBQVEsSUFBSSxZQUFZO0FBQUEsSUFDbkMsYUFBYTtBQUFBLElBQ2IsZUFBZTtBQUFBLE1BQ2IsT0FBTztBQUFBLFFBQ0wsVUFBVUYsU0FBUSxVQUFVLFlBQVksWUFBWTtBQUFBLFFBQ3BELE9BQU9BLFNBQVEsVUFBVSxTQUFTLFlBQVk7QUFBQSxRQUM5QyxZQUFZQSxTQUFRLFVBQVUsY0FBYyxVQUFVO0FBQUEsUUFDdEQsT0FBT0EsU0FBUSxVQUFVLFNBQVMsWUFBWTtBQUFBLFFBQzlDLFFBQVFBLFNBQVEsVUFBVSxVQUFVLFlBQVk7QUFBQSxRQUNoRCxTQUFTQSxTQUFRLFVBQVUsV0FBVyxZQUFZO0FBQUEsTUFDcEQ7QUFBQSxNQUNBLFFBQVE7QUFBQSxRQUNOLGdCQUFnQixDQUFDLFVBQVUsYUFBYSxNQUFNO0FBQUEsTUFDaEQ7QUFBQSxJQUNGO0FBQUEsRUFDRjtBQUNGLENBQUM7IiwKICAibmFtZXMiOiBbInJlc29sdmUiLCAicmVzb2x2ZSIsICJfX3ZpdGVfaW5qZWN0ZWRfb3JpZ2luYWxfZGlybmFtZSIsICJyZXNvbHZlIiwgIl9fdml0ZV9pbmplY3RlZF9vcmlnaW5hbF9kaXJuYW1lIiwgIm91dERpciIsICJfX3ZpdGVfaW5qZWN0ZWRfb3JpZ2luYWxfZGlybmFtZSIsICJyZXNvbHZlIiwgIl9fdml0ZV9pbmplY3RlZF9vcmlnaW5hbF9kaXJuYW1lIiwgIm91dERpciJdCn0K
