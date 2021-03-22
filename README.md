# spotify-share-chrome-extension

## Setup

1. Spotify for Developers からアプリを作成
2. Client ID と Client Secret を`.env`に追加

   `REACT_APP_CLIENT_ID=Client ID`  
   `REACT_APP_CLIENT_SECRET=Client Secret`

3. `yarn`
4. `yarn build-react`
5. `yarn build-others`
6. `dist`を chrome の拡張機能に追加
7. 拡張機能 ID を確認し、`.env`を`REACT_APP_REDIRECT_URIS=chrome-extension://拡張機能ID/popup.html`を追加
8. Spotify for Developers の`Redirect URIs`に`chrome-extension://拡張機能ID/popup.html`を追加
9. `yarn build-react`
10. `yarn build-others`

## Usage

You can control the music playing on Spotify from a chrome extension.

![image](https://user-images.githubusercontent.com/53547520/111936078-36c7e000-8b08-11eb-9c67-6671fc30a07b.png)
