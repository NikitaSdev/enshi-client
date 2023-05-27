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
				<link
					rel="apple-touch-icon"
					sizes="76x76"
					href="/apple-touch-icon.png"
				/>
				<link
					rel="icon"
					type="image/png"
					sizes="32x32"
					href="/favicon-32x32.png"
				/>
				<link
					rel="icon"
					type="image/png"
					sizes="16x16"
					href="/favicon-16x16.png"
				/>
				<link rel="manifest" href="/site.webmanifest" />
				<link rel="mask-icon" href="/safari-pinned-tab.svg" color="#5bbad5" />
				<meta name="msapplication-TileColor" content="#2b5797" />
				<link rel="manifest" href="/site.webmanifest"></link>
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
				<script src="/serviceWorkerRegister.js" defer></script>
				<script src="../../components/screens/singleMovie/kodikscript.js"></script>
			</Head>
			{children}
		</>
	)
}

export default HeadProvider
