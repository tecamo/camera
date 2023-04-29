# camera-app2

# HowTos
## Deploy
1. ```cd``` to ./build-scripts
1. run ```sh deploy-to-gh-pages.sh```

## Skapa ny länk när den gamla slutat fungera (förnya våra tokens)
1. Gå till https://developers.google.com/oauthplayground/
1. Välj Google Drive API under "Select & authorize APIs"
1. Klicka på kugghjulet (inställningar):
    1. Kryssa i "Use your own OAuth creds.."
    1. Fyll i Client ID and Secret vilket du hämtar från: https://console.cloud.google.com/apis/credentials?authuser=2&project=fotaframkalla
1. Klicka på "Authorize API"
1. Under "Step 2": Klicka på "Exchange authorization code for tokens"
1. Nu kan query-strängen skapas likt: ```?client_id=&client_secret=&refresh_token=```
1. Lägg på denna på grund-url:en
1. Alla med länken kan nu skicka bilder till driven
1. Skicka till specifik mapp på drive?
   1. Gå till vår google drive
   1. Gå till mappen du vill skapa länk för
   1. Kolla på url:en och klipp ut id:et som är efter ```/folders/\<här-är-mapp-id>```
   1. lägg till i query-sträng: ```?client_id=&client_secret=&refresh_token=&folder_id=```
1. Skapa en QR-kod av url:n (känslig info så använd följande som skapar qr koden offline):
   1. firefox: https://addons.mozilla.org/en-US/firefox/addon/offline-qr-code-generator/
   1. chrome: https://chrome.google.com/webstore/detail/offline-qr-code-generator/fehmldbcmhbdkofkiaedfejkalnidchm/related

# Nå dev versionen från telefonen
1. kör ```npm run dev```
1. Öppna "Network:"-länken i datorns browser 
1. Lägg manuellt till query-strängen
1. Högerklicka och ta fram QR-kod
1. Scanna med mobilen
1. Om ingen access till kamera: 
   1. gå till ```chrome://flags```
   1. Sök på "Insecure origins treated as secure" eller "#unsafely-treat-insecure-origin-as-secure"
   1. Lägg till url och relaunch Chrome

# Links
Inspiration for getting camera to work in web browser:
https://stackoverflow.com/questions/73147462/binding-a-media-feed-stream-to-video-element-vue-3-composition-api 

How to save image from the video feed:
https://developer.mozilla.org/en-US/docs/Web/API/Media_Capture_and_Streams_API/Taking_still_photos#demo

To publish to github pages:
https://learnvue.co/tutorials/deploy-vue-to-github-pages  
or  
https://dev.to/github/how-to-use-github-pages-to-host-your-website-even-with-multiple-repos-27k2

Discussion about getting best resolution:
https://stackoverflow.com/questions/27420581/get-maximum-video-resolution-with-getusermedia/27444179#27444179

How to be able to choose which camera is used:
https://www.twilio.com/blog/2018/04/choosing-cameras-javascript-mediadevices-api.html

Some info:
https://web.dev/media-capturing-images/
https://web.dev/getusermedia-intro/

Upload to google drive programmatically:
https://www.youtube.com/watch?v=1y0-IfRW114

## Recommended IDE Setup

[VSCode](https://code.visualstudio.com/) + [Volar](https://marketplace.visualstudio.com/items?itemName=Vue.volar) (and disable Vetur) + [TypeScript Vue Plugin (Volar)](https://marketplace.visualstudio.com/items?itemName=Vue.vscode-typescript-vue-plugin).

## Customize configuration

See [Vite Configuration Reference](https://vitejs.dev/config/).

## Project Setup

```sh
npm install
```

### Compile and Hot-Reload for Development

```sh
npm run dev
```

### Compile and Minify for Production

```sh
npm run build
```

### Lint with [ESLint](https://eslint.org/)

```sh
npm run lint
```
