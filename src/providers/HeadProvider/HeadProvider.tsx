import Head from "next/head"
import NextProgressBar from "nextjs-progressbar"
import React, { FC } from "react"

import Favicons from "./Favicons"

const HeadProvider: FC = ({ children }) => {
	return (
		<>
			<NextProgressBar
				color={"#8b54fd"}
				startPosition={0.3}
				stopDelayMs={300}
				height={3}
			/>
			<Head>
				<link rel="manifest" href="/manifest.json" />
				<meta charSet={"UTF-8"} />
				<meta
					name={"viewport"}
					content={"width=device-width, initial-scale=1,maximum-scale=1.0"}
				/>
				<Favicons />
				<meta name={"theme-color"} content={"#8b54fd"} />
				<meta name={"msapplication-navbutton-color"} content={"#18b54fd"} />
				<meta
					name={"apple-mobile-web-app-status-bar-style"}
					content={"#8b54fd"}
				/>
			</Head>
			{children}
		</>
	)
}

export default HeadProvider
