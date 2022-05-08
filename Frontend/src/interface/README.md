# Typescript

- React는 Javascript로 짜여져 있어 Typescript가 들어있는 파일에선 eslint 오류가 난다. 그 이유로 eslint는 typescript관련된 parser로 설정되어있지 않기 때문으로 예상이 된다. 그래서 프로젝트의 root eslint config 파일에선 Javascript parser로 eslint 체킹을 했고 typescript가 들어있는 폴더에서 따로 eslint config 파일을 만들어 Typescript parser로 설정해 에러를 해결했다.
- 만약 javascript와 typescript 파일이 같이 들어있는 폴더가 있을 경우 eslint config 설정을 어떻게 해야하는가...?

```tsx
namespace Example {
 export type ChartDataInfo = {
  axisX: Array<string></string>
  datasets: { legendName: string; series: Array<number> }
 }
 type HistoryInfo = {
  price: number
  date: string
 }
 export type History = {
  history?: Array<HistoryInfo>
 }
 export type StockInfo = {
  id: number
  name: string
  price: number
  ratio: { bad: number; good: number; veryBad: number; veryGood: number }
  beforePrice: number
  description: string
 }
 export type DynamicStockInfo = {
  [key: string]: {
   cnt: number
   totalPrice: number
  }
 }
}

export type { Example }
```

```jsx
/**
 * @param {import('../interface/Example').Example.ChartDataInfo} chartData
 * @returns {boolean | String}
 */
const example = (chartData) => {
 /** coding.... */
 return isTrue ? true : 'ohMyGod'
}
```
