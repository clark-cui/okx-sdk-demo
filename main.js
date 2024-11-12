import './style.css'

import {OKXUniversalProvider} from "@okxconnect/universal-provider";



document.querySelector('#app').innerHTML = `
  <div>
  <button class="connect-btn">connect wallet</button>
  </div>
`
const initFunc = async()=>{
    const okxUniversalProvider = await OKXUniversalProvider.init({
        dappMetaData: {
            name: "application name",
            icon: "application icon url"
        },
    })
    console.log(okxUniversalProvider,'okxUniversalProvider')
}
initFunc();

const btn = document.querySelector('.connect-btn');
btn.addEventListener('click', async() => {
    const session = await okxUniversalProvider.connect({
        namespaces: {
            eip155: {
                // 请按需组合需要的链id传入，多条链就传入多个
                chains: ["eip155:1"],
                rpcMap: {
                    1: "https://eth.blockrazor.xyz", // 和上面的chain一一对应，只需写数字链id
                },
                defaultChain: "1"
            }
        },
        optionalNamespaces: {
            eip155: {
                chains: ["eip155:1"]
            }
        },
        sessionConfig: {
            redirect: "tg://resolve"
        }
    })
    console.log(session,'session')
})

