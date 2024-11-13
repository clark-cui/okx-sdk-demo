import './style.css'

import {OKXUniversalProvider} from "@okxconnect/universal-provider";



document.querySelector('#app').innerHTML = `
  <div>
  <button class="connect-btn">connect wallet</button>
  <button class="chain-btn">change chain</button>
  </div>
`
let okxUniversalProvider= null;
const initFunc = async()=>{
     okxUniversalProvider = await OKXUniversalProvider.init({
        dappMetaData: {
            name: "application name",
            icon: "application icon url"
        },
    })
    console.log(okxUniversalProvider,'okxUniversalProvider')
  // 生成 universalLink  
okxUniversalProvider.on("display_uri", (uri) => {
    console.log(uri);
});
// session 信息变更（例如添加自定义链）会触发该事件；
okxUniversalProvider.on("session_update", (session) => {
    console.log(JSON.stringify(session));
});
// 断开连接会触发该事件；
okxUniversalProvider.on("session_delete", ({topic}) => {
    console.log(topic);
});
}
initFunc();

const btn = document.querySelector('.connect-btn');
btn.addEventListener('click', async() => {
    const session = await okxUniversalProvider.connect({
        namespaces: {
            eip155: {
                // 请按需组合需要的链id传入，多条链就传入多个
                chains: ["eip155:1","eip155:43114"],
                rpcMap: {
                    1: "https://eth.blockrazor.xyz", // 和上面的chain一一对应，只需写数字链id
                    43114:"https://eth.blockrazor.xyz",
                },
                defaultChain: "1"
            }
        },
        optionalNamespaces: {
            eip155: {
                chains: ["eip155:10"]
            }
        },
        sessionConfig: {
            redirect: "tg://resolve"
        }
    })
    console.log(session,'session')
})

const chainBtn =document.querySelector('.chain-btn');
btn.addEventListener('click', async() => {
okxUniversalProvider.request({
    "method": "wallet_switchEthereumChain",
    "params": [
        {
            chainId: "eip155:43114"
        }
    ],
});
});
