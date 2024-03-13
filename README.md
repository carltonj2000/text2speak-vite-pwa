# Text To Speech

Use vite with vanilla typescript.

| Script  | type  | Port |
| ------- | ----- | ---- |
| dev     | http  | 5173 |
| preview | http  | 4173 |
| serve   | https | 2173 |

# To Do

Prompt to update site to new version via implementing the following:

- https://youtu.be/BwVoh4ZB50U?si=A5mnwnuAw_itqia4

# Code History

The code in the repository is based on:

- https://youtu.be/2tP4tMCoSV0?si=jIU1hgzW_W3GbjX9
- https://vite-pwa-org.netlify.app/guide/
- https://vite-pwa-org.netlify.app/guide/pwa-minimal-requirements.html

# Creation History

```bash
npm create vite@latest
cd text2speak-vite-pwa/
npm i
npm i @vite-pwa/assets-generator -D
npm i vite-plugin-pwa -D
npm i https-localhost -D
sudo apt install libnss3-tools # needed for https
```
