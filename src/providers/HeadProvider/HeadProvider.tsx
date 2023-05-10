import Head from "next/head"
import Script from "next/script"
import NextProgressBar from "nextjs-progressbar"
import React, { FC } from "react"

import { accentColor } from "../../config/constants"

import Favicons from "./Favicons"

const HeadProvider: FC = ({ children }) => {
	return (
		<>
			<NextProgressBar
				color={accentColor}
				startPosition={0.3}
				stopDelayMs={300}
				height={3}
			/>
			<Head>
				<meta charSet={"UTF-8"} />
				<meta
					name={"viewport"}
					content={"width=device-width, initial-scale=1,maximum-scale=1.0"}
				/>
				<Favicons />
				<meta name={"theme-color"} content={"#181B1e"} />
				<meta name={"msapplication-navbutton-color"} content={"#181B1e"} />
				<meta
					name={"apple-mobile-web-app-status-bar-style"}
					content={"#181B1e"}
				/>
			</Head>
			{children}
		</>
	)
}

export default HeadProvider
