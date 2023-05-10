import type { AppProps } from "next/app"
import Script from "next/script"
import React, { useEffect } from "react"

import { TypeComponentAuthFields } from "@/shared/types/auth.types"

import "@/assets/styles/react-select.scss"

import "../assets/styles/globals.scss"
import MainProvider from "../providers/MainProvider"

type TypeAppProps = AppProps & TypeComponentAuthFields
export default function App({ Component, pageProps }: TypeAppProps) {
	return (
		<MainProvider Component={Component}>
			<Component {...pageProps} />
		</MainProvider>
	)
}
