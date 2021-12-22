
export const Constants = {
    IRT_CURRENCY_ID: 12,
    USDT_CURRENCY_ID: 14,
    radialChartCount: 9,
    BASE_URL: "https://hi-exchange.com",
    REFERRAL_BASE: "http://www.panel.hi-exchange.com/signup?referral=",
    get_symbol: function(sym){
        sym =sym? sym.toUpperCase():"BTC"
        if(sym==="USDT") return "POLONIEX:ETHUSDT"
        return `BINANCE:${sym}USDT`
    }
    
    
}