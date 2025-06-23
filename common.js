document.addEventListener('DOMContentLoaded', () => {
    // --- 1. あなたのLIFF IDに書き換えてください ---
    const liffId = "2006999900-AaL1OXwn";

    const customShortcutButton = document.getElementById('customShortcutButton');
    let liffObject = null;

    async function initializeLiff() {
        try {
            // LIFF SDKを動的に読み込み
            const script = document.createElement('script');
            script.src = 'https://static.line-scdn.net/liff/edge/2/sdk.js';
            script.onload = async () => {
                try {
                    await liff.init({ liffId });
                    liffObject = liff;
                    if (!liff.isLoggedIn()) {
                        liff.login();
                    }
                } catch (e) {
                    console.error('LIFF Initialization failed', e);
                    alert('LIFFの初期化に失敗しました。LIFF IDが正しく設定されているか確認してください。');
                }
            };
            document.head.appendChild(script);
        } catch (e) {
            console.error('Script loading failed', e);
        }
    }

    // カスタムショートカットボタンの処理
    customShortcutButton.addEventListener('click', async () => {
        if (!liffObject) {
            alert('LIFFが初期化されていません。');
            return;
        }
        try {
            await liffObject.createShortcutOnHomeScreen();
            alert('カスタムショートカットの作成をリクエストしました。');
        } catch (err) {
            console.error('カスタムショートカットの作成に失敗しました:', err);
            alert(`カスタムショートカットの作成に失敗しました: ${err.message}`);
        }
    });

    initializeLiff();
});