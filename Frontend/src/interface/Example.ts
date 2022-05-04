namespace Example {
	export type ChartDataInfo = {
		axisX: Array<string>
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
