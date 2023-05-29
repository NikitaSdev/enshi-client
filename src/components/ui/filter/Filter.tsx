import classNames from "classnames"
import { FC, useState } from "react"
import Select from "react-select"

import MaterialIcon from "@/ui/MaterialIcon"

import styles from "./Filter.module.scss"

interface IFilter {
	genreList: Array<{ value: string; label: string }> | undefined
	yearList: Array<{ value: number; label: number }> | undefined
	setGenres: any
	setYears: any
	statusOptions: Array<{ value: string; label: string }>
	setStatuses: any
	resetFilters: () => void
}
const Filter: FC<IFilter> = ({
	genreList,
	statusOptions,
	setStatuses,
	resetFilters,
	setGenres,
	yearList,
	setYears
}) => {
	const customStyles = {
		option: (provided: any, state: any) => ({
			...provided,
			padding: "10px 20px",
			backgroundColor: state.isFocused ? "#F2F2F2" : "white",
			":active": {
				backgroundColor: "#F2F2F2"
			}
		}),

		control: (provided: any) => ({
			...provided,
			minHeight: 75,
			borderRadius: 10,
			border: "none",
			maxWidth: 700,
			borderBottom: "none",
			boxShadow: "none",
			cursor: "pointer",
			paddingLeft: 30
		}),
		menu: (provided: any) => ({
			borderBottomRightRadius: 10,
			borderBottomLeftRadius: 10,
			marginTop: -6
		}),

		optionContent: {
			display: "flex",
			alignItems: "center",
			padding: "10px 20px",
			backgroundColor: "white",
			cursor: "pointer",
			height: 60,
			fontSize: 12
		}
	}
	const [genreValue, setGenreValue] = useState([])
	const [yearValue, setYearValue] = useState([])
	const [statusValue, setStatusValue] = useState([])

	const sliceList = (
		list: Array<{ value: string; label: string }> | undefined
	) => {
		return (
			list &&
			list
				.slice(0, 3)
				.map(
					(
						item:
							| { value: string; label: string }
							| { value: number; label: number },
						index
					) => {
						return index !== 2
							? item.label.toString().slice(0, 1).toUpperCase() +
									item.label.toString().slice(1) +
									", "
							: item.label.toString().slice(0, 1).toUpperCase() +
									item.label.toString().slice(1, 5) +
									"..."
					}
				)
		)
	}

	return (
		<section className={styles.filter}>
			<div className={styles.container}>
				<div className={styles.select}>
					<Select
						placeholder={
							<div
								style={{
									display: "flex",
									flexDirection: "column"
								}}
							>
								<span
									style={{ fontSize: 17, fontWeight: "bold", color: "#29282E" }}
								>
									Жанры
								</span>
								<span style={{ fontSize: 12, color: "#828282" }}>
									{sliceList(genreList)}
								</span>
							</div>
						}
						isSearchable={false}
						isClearable={false}
						isMulti
						value={genreValue}
						styles={customStyles}
						components={{
							IndicatorSeparator: () => null
						}}
						// @ts-ignore
						options={genreList}
						onChange={(e) => {
							setGenres(e)
							// @ts-ignore
							setGenreValue(e)
						}}
					/>
					<Select
						isSearchable={false}
						isClearable={false}
						isMulti
						styles={customStyles}
						components={{
							// @ts-ignore
							IndicatorSeparator: () => null
						}}
						// @ts-ignore
						options={statusOptions}
						value={statusValue}
						onChange={(e) => {
							setStatuses(e)
							// @ts-ignore
							setStatusValue(e)
						}}
						placeholder={
							<div
								style={{
									display: "flex",
									flexDirection: "column"
								}}
							>
								<span
									style={{ fontSize: 17, fontWeight: "bold", color: "#29282E" }}
								>
									Статус
								</span>
								<span style={{ fontSize: 12, color: "#828282" }}>
									{sliceList(statusOptions)}
								</span>
							</div>
						}
					/>
					<Select
						placeholder={
							<div
								style={{
									display: "flex",
									flexDirection: "column"
								}}
							>
								<span
									style={{ fontSize: 17, fontWeight: "bold", color: "#29282E" }}
								>
									Годы
								</span>
								<span style={{ fontSize: 12, color: "#828282" }}>
									{
										// @ts-ignore
										sliceList(yearList)
									}
								</span>
							</div>
						}
						isSearchable={false}
						isClearable={false}
						isMulti
						value={yearValue}
						styles={customStyles}
						components={{
							IndicatorSeparator: () => null
						}}
						// @ts-ignore
						options={yearList}
						onChange={(e) => {
							setYears(e)
							// @ts-ignore
							setYearValue(e)
						}}
					/>
				</div>
				<button
					onClick={() => {
						resetFilters()
						// @ts-ignore
						setGenreValue(null)
						// @ts-ignore
						setStatusValue(null)
						// @ts-ignore
						setYearValue(null)
					}}
					className={styles.button}
				>
					<p>
						<span>
							<MaterialIcon name={"MdClose"} />
						</span>
						Сбросить фильтры
					</p>
				</button>
			</div>
		</section>
	)
}

export default Filter
